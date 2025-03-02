import { useState, useRef, useEffect } from "react"
import { useNavigate } from "react-router";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import Stack from "@mui/material/Stack";
import { DefaultEditor } from "react-simple-wysiwyg";
import axios from 'axios';  // Import axios
import {
    Box,
    Button,
    IconButton,
    MenuItem,
    TextField,
    Tooltip,
    CircularProgress
} from '@mui/material';
import { json } from "react-router";
export default function PrivatePage() {
    const [editorLoaded, setEditorLoaded] = useState(false);
    const [data, setData] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        setEditorLoaded(true);
    }, []);
    const aRef = useRef(null);
    const [image, setImage] = useState("");
    const [createObjectURL, setCreateObjectURL] = useState(null);
    const [serRes, setSerRes] = useState(null);
    const [open, setOpen] = useState(null);
    const [msg, setMsg] = useState(null);
    const [notify, setNotify] = useState(null);
    const [responseFromServer, setResponseFromServer] = useState(null);
    const [value, setValue] = useState('simple text');
    const [subValue, setSubValue] = useState('')
    const [buttonLoad, setButtonLoad] = useState(false);
    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setOpen(false);
    };
    const [inputField, setInputField] = useState({
        fname: "",
        lname: "",
        email: ""
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

    //   const router=useRouter();

    const uploadToServer = async (e) => {
        e.preventDefault();
        setButtonLoad(true);
        const formData = new FormData();
        formData.append('fname', inputField.fname);
        formData.append('lname', inputField.lname);
        formData.append('email', inputField.email);
        if (image) {
            formData.append('image', image);  // Append the image file
        }

        let message = "";

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/posts', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            if (response.status) {
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


    function onChange(e) {
        setValue(e.target.value);
    }
    function onChangeSubdetail(ev) {
        setSubValue(ev.target.value);
    }
    const resetInput = () => {
        aRef.current.value = null;
    };
    return (

        <>
            <section id="Post" className="relative">
                <div className="row d-flex justify-content-center m-0">
                    <div className="col-md-12 mb-md-0 mb-5 card border-0 p-5">
                        <form onSubmit={uploadToServer}>
                            <div className="d-flex gap-5">
                                <div className="form-group col-5 mb-2">
                                    <label for="title">First Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="title"
                                        placeholder="Enter fname"
                                        autoComplete="nope"
                                        name="fname"
                                        onChange={uploadToClient}
                                        required
                                        value={inputField.fname}
                                    />
                                </div>
                                <div className="form-group col-5  mb-2">
                                    <label for="title">Last Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="title"
                                        placeholder="Enter lname"
                                        autoComplete="nope"
                                        name="lname"
                                        onChange={uploadToClient}
                                        required
                                        value={inputField.lname}
                                    />
                                </div>

                            </div>
                            <div className="d-flex gap-5 mt-3">
                                <div className="form-group col-5   mb-2">
                                    <label for="title">Email</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="title"
                                        placeholder="Enter email"
                                        autoComplete="nope"
                                        name="email"
                                        onChange={uploadToClient}
                                        required
                                        value={inputField.email}
                                    />
                                </div>
                                <div className="form-group col-5 mb-2">
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
                                    <div className="mt-3">
                                        {createObjectURL ? (
                                            <img src={createObjectURL} fill width="100" height="100" />
                                        ) : (
                                            ""
                                        )}
                                    </div>
                                </div>

                            </div>

                            <div className="text-md-start">
                                <Button
                                    color="success"
                                    type="submit"
                                    variant="contained"
                                    disabled={buttonLoad} // Disable the button while setButtonLoad
                                    startIcon={buttonLoad ? <CircularProgress size={24} color="inherit" /> : null} // Show spinner when loading
                                >
                                    {serRes ? "Your form is submitted!" : "Submit"}
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
            </section>
        </>
    );
}
