import react, { useEffect ,useMemo} from "react";
import { useState } from "react";
import  MaterialReactTable  from "material-react-table";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import Stack from "@mui/material/Stack";
import {
    Box,
    Button,
    IconButton,
    Tooltip,
  } from '@mui/material';
import { Delete, Visibility } from '@mui/icons-material';
import {TextValidator,ValidatorForm} from "react-material-ui-form-validator";
import moment from "moment";
const HireList=(()=>{
    const getHire=async()=>{
        const isProd = process.env.NODE_ENV === "production";
        const API = isProd ? "https://techzarinfo.com/api" : "http://localhost:3001";
        const response = await fetch(`${API}/get-hire`,{
          headers:
          {'authorization':`${(localStorage.getItem("Auth"))}`
          }
        }
        );
        const  getHireData= await response.json();
        if(getHireData){
            setHireData(getHireData);
        }
    }

    useEffect(()=>{
        getHire();
    },[]);
    const [hireData,setHireData]=useState([]);
    const [confirmBox,setConfirmBox]=useState(false);
    const [deleteId,setDeleteId]=useState("");
    const [viewConfirm,setViewConfirm] = useState(false);
    const [responseFromServer, setResponseFromServer] = useState(null);
    const [open, setOpen] = useState(null);
    const [msg, setMsg] = useState(null);
    const [notify, setNotify] = useState(null);

    //react table column 
     const columns = useMemo(
        () => [
          { accessorKey: "name", header: 'Name'},
          { accessorKey: "email", header: 'Email'},
          { accessorKey: "phone", header: 'phone'},
          { accessorKey: "company", header: 'company'},
          { accessorKey: "createdAt", header: 'CreatedAt',
          Cell: ({ cell }) => (
            <span>{moment(cell.getValue()).format('DD-MM-YYYY HH:mm:SS')}</span>
          )
          }
      ]);
    //view contact   
    const handleView=((row)=>{
        setViewConfirm(true);
        setHireData(row.original);
    });
    const handleviewClose=(()=>{
        setViewConfirm(false);
        getHire();
      })
    //delete contact
    const handleDelete=((row)=>{
     setConfirmBox(true);
     setDeleteId(row.original._id);
    })
    const handleNo=(()=>{
     setConfirmBox(false);
    })

    const handleClose=(()=>{
        setOpen(true);
    })
    const handleRemoveClick=(()=>{
        deleteHire(deleteId);
    })
    const deleteHire=async(id)=>{
        const isProd = process.env.NODE_ENV === "production";
        const API = isProd ? "https://techzarinfo.com/api" : "http://localhost:3001";
        const response = await fetch(`${API}/delete-hire/${id}`,{
          headers:
          {'authorization':`${(localStorage.getItem("Auth"))}`
          }
        });
        const  deleteHireData= await response.json();
        let message="";
        if(deleteHireData){
            getHire();
            setOpen(false);
            message = deleteHireData.message;
            setNotify(true);
            setConfirmBox(false);
            setResponseFromServer(message);
        }
        else{
            setOpen(false);
            message = deleteHireData.message;
            setNotify(true);
            setConfirmBox(false);
            setResponseFromServer(message);
        }
    }

   
return (
    <>
      <div className="index_blog">
        <div className="p-5 ">
        <MaterialReactTable
              displayColumnDefOptions={{
                  'mrt-row-actions': {
                    muiTableHeadCellProps: {
                      align: 'left',
                    },
                    size: 120,
                  },
                }}
              columns={columns}
              data={hireData}
              enableColumnOrdering
              enableEditing
              positionActionsColumn="last"
              renderRowActions={({ row, table }) => (
                  <Box sx={{ display: 'flex'}}>
                    <Tooltip arrow placement="left" title="Edit">
                      <IconButton  onClick={()=>handleView(row)}>
                        <Visibility />
                      </IconButton>
                    </Tooltip>
                    <Tooltip arrow placement="right" title="Delete">
                      <IconButton color="error" onClick={()=>handleDelete(row)}>
                        <Delete />
                      </IconButton>
                    </Tooltip>
                  </Box>
                )}
            />
        </div>
      </div>

      {viewConfirm && hireData &&(
        <Dialog
          open={viewConfirm}
          onClose={handleviewClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
           fullWidth="true" maxWidth={"xl"}
        >
          <DialogTitle id="alert-dialog-title">
            {"View Hire A Developer"}
          </DialogTitle>
          <DialogContent>
          <div className="row d-flex justify-content-center m-0">
            <div className=" col-md-11 mb-md-0 mb-5 card border-0 p-5">
            <ValidatorForm>
                <div className="row">
                  <div className="col-md-6">
                    <div className="md-form mb-2">
                      <TextValidator
                        id="name"
                        label="Name"
                        name="name"
                        defaultValue={hireData.name}
                        variant="outlined"
                        InputProps={{
                          readOnly: true,
                        }}
                        sx={{ width: "100%" }}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="md-form mb-2">
                      <TextValidator
                        id="phone"
                        label="Phone Number"
                        name="phone"
                        defaultValue={hireData.phone}
                        variant="outlined"
                        InputProps={{
                          readOnly: true,
                        }}
                        sx={{ width: "100%" }}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="md-form mb-3">
                      <TextValidator
                        id="email"
                        label="Email Address"
                        className="ms-0"
                        name="email"
                        defaultValue={hireData.email}
                        variant="outlined"
                        InputProps={{
                          readOnly: true,
                        }}
                        sx={{ m: 1, width: "100%" }}
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="md-form mb-2">
                    <TextValidator
                        id="company"
                        label="company"
                        className="ms-0"
                        name="company"
                        defaultValue={hireData.company}
                        variant="outlined"
                        InputProps={{
                          readOnly: true,
                        }}
                        sx={{ m: 1, width: "100%" }}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                
                  <div className="col-md-12">
                    <TextValidator
                      id="message"
                      label="Your message"
                      multiline
                      rows={3}
                      variant="outlined"
                      name="message"
                      defaultValue={hireData.message}
                      InputProps={{
                        readOnly: true,
                      }}
                      sx={{ m: 1, width: "100%" }}
                      className="ms-0 message"
                    />
                  </div>
                </div>
            </ValidatorForm>
                {/* <div id='alert' className={this.state.show ? 'd-block' : 'd-none'} dangerouslySetInnerHTML={{ __html: this.state.responseFromServer }} /> */}
          

              <div className="status"></div>
            </div>
          </div>
          </DialogContent>
          <DialogActions>
            <Button
              color="primary"
              autoFocus
              onClick={()=>handleviewClose()}
            >
              Close
            </Button>
          </DialogActions>
        </Dialog>
      )
      }

      {confirmBox &&
          <div className="col-md-6">
        <Dialog
          open={confirmBox}
          onClose={handleNo}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle id="alert-dialog-title">
            {"Confirm Delete"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure to delete
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => handleRemoveClick()}
              color="primary"
              autoFocus
            >
              Yes
            </Button>
            <Button
              onClick={handleNo}
              color="primary"
              autoFocus
            >
              No
            </Button>
          </DialogActions>
        </Dialog>
          </div>
      }

    <Stack sx={{ width: "100%" }} spacing={2}>
        <Snackbar
          open={open}
          autoHideDuration={4000}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          onClose={handleClose}
        >
          {notify ? (
            <Alert
              sx={{ width: "100%" }}
              severity={notify ? "success" : "error"}
            >
              {responseFromServer}
            </Alert>
          ) : (
            <Alert
              sx={{ width: "100%" }}
              severity={notify ? "success" : "error"}
            >
              {responseFromServer}
            </Alert>
          )}
        </Snackbar>
    </Stack>
    </>
)
});

export default HireList;