import React, { useState, useEffect, useMemo, useRef } from "react";
import { useNavigate } from "react-router";
import { MaterialReactTable } from 'material-react-table';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import Stack from "@mui/material/Stack";
import axios from 'axios';  // Import axios
// import { useRouter } from "next/router";
import moment from 'moment';
import {
  Box,
  Button,
  IconButton,
  MenuItem,
  TextField,
  Tooltip,
} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';


const IndexBlog = () => {
  const [showsave, setShowsave] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [EditConfirm, setEditConfirm] = useState(false);
  const [editorLoaded, setEditorLoaded] = useState(false);
  const [data, setData] = useState("");
  const [deleteid, setDeleteid] = useState("");
  const [editid, setEditid] = useState("");
  const [blogaData, setBlogData] = useState([]);

  const navigate = useNavigate();

  const getBlogs = async () => {
    const isProd = process.env.NODE_ENV === "production";
    const API = "http://127.0.0.1:8000/api/list/blog";
    const response = await fetch(`${API}`);

    // Check if the response was successful (status 200)
    if (response.ok) {
      // Parse the JSON response
      const data = await response.json();

      // Assuming the response has a 'status' and 'message' field
      if (data.status) {
        setBlogData(data.message); // Set the blog data if status is true
      } else {
        setBlogData([]); // Set empty array if status is false
      }
    } else {
      // Handle error if response is not OK (e.g., 404, 500)
      console.error("Failed to fetch data:", response.status);
      setBlogData([]); // Optionally set empty data on error
    }

  }
  useEffect(() => {
    getBlogs();
  }, []);

  const aRef = useRef(null);

  const [notify, setNotify] = useState(null);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };


  //react table column 
  const columns = useMemo(
    () => [
      { accessorKey: "id", header: 'Id', show: false },
      {
        accessorKey: "image",
        header: 'Image',
        Cell: ({ cell }) => (
          <img src={`http://127.0.0.1:8000/${cell.getValue()}`} alt="Preview" style={{ maxWidth: '100px', maxHeight: '100px' }} />
        )
      },
      { accessorKey: "email", header: 'Email' },
      { accessorKey: "fname", header: 'First Name' },
      {
        accessorKey: "lname", header: 'Last Name',  }
    ]);


  const handlesaveRow = (() => {
    // setShowsave(true);
    // setEditorLoaded(true);
    window.location.href = "/admin/blog/blog-post";
  })
  const handleDeleteRow = ((row) => {
    setDeleteid(row.original.id);
    setShowConfirm(true);
  })
  const handleEditRow = ((row) => {
    // setEditConfirm(true);
    setEditid(row.original.id);
    if (row.original.id) {
      navigate(`/admin/blog/edit-blog/${row.original.id}`)
      // router.push("/admin/blog/"+row.original._id);
    }
  });



  const handleNoEdit = ((row) => {
    setEditConfirm(false);
  })
  const handleNo = (() => {
    setShowConfirm(false);
  })
  const handleRemoveClick = (() => {
    deleteblogs(deleteid);
  })

  const deleteblogs = async (id) => {
        const isProd = process.env.NODE_ENV === "production";
        const API ="http://127.0.0.1:8000";
          const response = await axios.delete(`${API}/api/blog/delete/${id}`);
          let message = "";
          if (response.status) {
            getBlogs();
            setOpen(false);
            message = response.message;
            setNotify(true);
            setShowConfirm(false);
            setResponseFromServer(message);
      
          } else {
            setNotify(null);
            let message = response.message;
            setResponseFromServer(message);
          }

  }
  const [responseFromServer, setResponseFromServer] = useState(null);
  const [image, setImage] = useState("");
  const [createObjectURL, setCreateObjectURL] = useState(null);
  const [serRes, setSerRes] = useState(null);
  const [open, setOpen] = useState(null);
  const [msg, setMsg] = useState(null);
  const [inputField, setInputField] = useState({
    title: "",
    message: "",
  });
  const uploadToClient = (event) => {
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0];
      setImage(i);
      setCreateObjectURL(URL.createObjectURL(i));
    } else {
      setInputField({ ...inputField, [event.target.name]: event.target.value });
    }
  };


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
            data={blogaData}
            editingMode="modal" //default
            enableColumnOrdering
            enableEditing
            title="Blog"
            positionActionsColumn="last"
            renderRowActions={({ row, table }) => (
              <Box sx={{ display: 'flex', }}>
                <Tooltip arrow placement="left" title="Edit">
                  <IconButton onClick={() => handleEditRow(row)}>
                    <Edit />
                  </IconButton>
                </Tooltip>
                <Tooltip arrow placement="right" title="Delete">
                  <IconButton color="error" onClick={() => handleDeleteRow(row)}>
                    <Delete />
                  </IconButton>
                </Tooltip>
              </Box>
            )}
            renderTopToolbarCustomActions={() => (
              <Button
                color="primary"
                onClick={() => handlesaveRow()}
                variant="contained"
              >
                Add Users
              </Button>
            )}
          />
        </div>
      </div>
      {showConfirm && (
        <div className="col-md-6">
          <Dialog
            open={showConfirm}
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
      )}
      {EditConfirm && (
        <Dialog
          open={EditConfirm}
          onClose={handleNoEdit}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Edit Blog"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              color="primary"
              autoFocus
            >
              save
            </Button>
          </DialogActions>
        </Dialog>
      )
      }
      {showsave && (
        <Dialog
          open={showsave}
          onClose={() => handlesaveRow()}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          fullWidth={true} maxWidth={"xl"}
        >
          <DialogTitle id="alert-dialog-title">
            {"Create Blog"}
          </DialogTitle>
          <DialogContent>
            <div className="row d-flex justify-content-center m-0">
              <div className=" col-md-9 mb-md-0 mb-5 card border-0 p-5">
                <form>
                  <div className="form-group mb-2">
                    <label for="title">Title</label>
                    <input
                      type="text"
                      className="form-control"
                      id="title"
                      placeholder="Enter title"
                      autoComplete="nope"
                      name="title"
                      onChange={uploadToClient}
                      required
                      value={inputField.title}

                    />
                  </div>
                  {createObjectURL ? (
                    <img src={createObjectURL} width="100" height="100" />
                  ) : (
                    ""
                  )}
                  <div className="form-group mb-2">
                    <label for="image">Upload Image</label>
                    <input
                      ref={aRef}
                      type="file"
                      className="form-control"
                      id="image"
                      name="image"
                      onChange={uploadToClient}
                      required
                    />
                  </div>
                  <div className="form-group mb-2">
                    <label for="message">Post your comments</label>
                    {editorLoaded ? (
                      <Editor
                        cols="5"
                        className="form-control"
                        id="message"
                        name="message"
                        onChange={(data) => {
                          setData(data);
                        }}
                        editorLoaded={editorLoaded}
                      />) : (
                      <div>Editor loading</div>
                    )}
                  </div>
                  <div className="text-md-start">
                    <button
                      variant="contained"
                      type="submit"
                      className="btn btn-success request-consultation"
                    >
                      {serRes ? "Your form is submitted!" : "Submit"}
                    </button>
                  </div>
                </form>
                <div className="status"></div>
              </div>
            </div>
          </DialogContent>
          <DialogActions>
            <Button

              color="primary"
              autoFocus
            >
              save
            </Button>
          </DialogActions>
        </Dialog>
      )
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

}

export default IndexBlog;