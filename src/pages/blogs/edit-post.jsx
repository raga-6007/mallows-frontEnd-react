import { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import Stack from "@mui/material/Stack";
import { DefaultEditor } from "react-simple-wysiwyg";
import {
    Box,
    Button,
    IconButton,
    MenuItem,
    TextField,
    Tooltip,
    CircularProgress
} from '@mui/material';
import axios from 'axios';  // Import axios
import { title } from "process";
import { useNavigate } from "react-router-dom";
export default function Editblog(props) {
    const [editorLoaded, setEditorLoaded] = useState(false);
    const [data, setData] = useState("");
    const navigate=useNavigate();
    const [editData, setEditData] = useState([]);
    const [createObjectURL, setCreateObjectURL] = useState(null);
    const [image, setImage] = useState("");
    const [value, setValue] = useState('');
    const [inputField, setInputField] = useState({
        fname: "",
        lname: "",
        email: "",
        image:""
    });
    const { id } = useParams(); // Extract 'id' from the path
    console.log('Route Params:', useParams());
    console.log('Rid:', id);

   


    const apiEditblog = (async () => {
        console.log(id); // Check the value
        const isProd = process.env.NODE_ENV === "production";
        const API = "http://127.0.0.1:8000";
        const response = await axios.post(`http://127.0.0.1:8000/api/blog/edit/${id}`);
        if (response.status) {
            setInputField(response.data.message);
            setImage(response.data.message.image);
            setValue(response.data.message.detail)
        }
    })
    useEffect(() => {
        apiEditblog();
        setEditorLoaded(true);
    }, []);
    useEffect(()=>{
     
    },[inputField])
    const aRef = useRef(null);


    const [serRes, setSerRes] = useState(null);
    const [open, setOpen] = useState(null);
    const [msg, setMsg] = useState(null);
    const [notify, setNotify] = useState(null);
    const [responseFromServer, setResponseFromServer] = useState(null);
    const [buttonLoad,setButtonLoad]=useState(false);
    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setOpen(false);
    };

    const uploadToClient = (event) => {
        if (event.target.files && event.target.files[0]) {
            const i = event.target.files[0];
            setImage(i);
            setCreateObjectURL(URL.createObjectURL(i));
        } else {
            setInputField({ ...inputField, [event.target.name]: event.target.value });
        }
    };

    const uploadToServer = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        const isProd = process.env.NODE_ENV === "production";
        formData.append('fname', inputField.fname);
        formData.append('lname', inputField.lname);
        formData.append('email', inputField.email);
        setButtonLoad(true);

        if (image) {
            formData.append('image', image);  // Append the image file
        }

        let message = "";


        try {
            const response = await axios.post(`http://127.0.0.1:8000/api/blog/edit-post/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            if (response.status) {
                console.log(response);
                
                setNotify(true);
                message = response.message;
                setInputField({
                    fname: "",
                    lname: "",
                    email: ""
                });
                setImage(null);
                resetInput();
                setValue(null);
                setButtonLoad(false);
                navigate('/blogs');
            } else {
                setNotify(null);
                message = response.errors ? response.errors : [{ msg: response.message }];
                setButtonLoad(fales);
            }
            setImage(null);  // Reset the image state
            setCreateObjectURL(null);
            setResponseFromServer(message);
        } catch (error) {
            console.error("Error saving post:", error);
        }
    };
    const resetInput = () => {
        aRef.current.value = null;
    };
    const isProd1 = process.env.NODE_ENV === "production";
    const APIIMG = isProd1 ? "http://localhost:3001" : "http://localhost:3001";
    function onChange(e) {
        setValue(e.target.value);
    }
    return (
        <>
            {inputField && (<section id="Post" className="relative">
                <div className="row d-flex justify-content-center m-0">
                    <div className="col-md-12 mb-md-0 mb-5 card border-0 p-5">
                        <form onSubmit={uploadToServer}>
                            <div className="form-group mb-2">
                                <label for="title">First Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="title"
                                    placeholder="Enter title"
                                    autoComplete="nope"
                                    name="fname"
                                    onChange={uploadToClient}
                                    value={inputField.fname ? inputField.fname : ""}
                                    required
                                />
                            </div>
                            <div className="form-group mb-2">
                                <label for="title">Last Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="title"
                                    placeholder="Enter title"
                                    autoComplete="nope"
                                    name="lname"
                                    onChange={uploadToClient}
                                    value={inputField.lname ? inputField.lname : ""}
                                    required
                                />
                            </div>
                            <div className="form-group mb-2">
                                <label for="title">Email</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="title"
                                    placeholder="Enter title"
                                    autoComplete="nope"
                                    name="email"
                                    onChange={uploadToClient}
                                    value={inputField.email ? inputField.email : ""}
                                    required
                                />
                            </div>
                            {createObjectURL && createObjectURL !== null ? (
                                <img src={createObjectURL} fill width="100" height="100" />
                            ) : (<img src={`http://127.0.0.1:8000/${inputField.image}`} fill width="100" height="100" />)}

                            <div className="form-group mb-2">
                                <label for="image">Upload Image</label>
                                <input
                                    ref={aRef}
                                    type="file"
                                    className="form-control"
                                    id="image"
                                    name="image"
                                    onChange={uploadToClient}
                                />
                            </div>
                           
                            <div className="text-md-start">
                                <Button
                                    color="success"
                                    type="submit"
                                    variant="contained"
                                    disabled={buttonLoad} // Disable the button while setButtonLoad
                                    startIcon={buttonLoad ? <CircularProgress size={24} color="inherit" /> : null} // Show spinner when loading
                                >
                                    {serRes ? "Your form is submitted!" : "Update"}
                                </Button>
                            </div>
                        </form>
                        <div className="status"></div>
                    </div>
                </div>
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
                                {responseFromServer
                                    ? responseFromServer.map((s) => (
                                        <li className="image-type">{s.msg}</li>
                                    ))
                                    : ""}
                            </Alert>
                        )}
                    </Snackbar>
                </Stack>
            </section>)}</>
    );
}
