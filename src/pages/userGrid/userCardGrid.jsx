import React, { useEffect, useState } from 'react';
import { Grid, Card, CardContent, Avatar, Typography, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';
import { getuserPage } from 'redux/actions/userPage/userPageAction';
import { useNavigate } from "react-router-dom";
import axios from 'axios';  // Import axios
const UserCardGrid = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getuserPage())
  }, []);
  const UserData = useSelector(state => state?.userPage);
  const [isHovered, setIsHovered] = useState(false);
  const [keyvalue, setKeyvalue] = useState(null);

  const handleMouseOver = (k) => {
    setIsHovered(true);
    setKeyvalue(k);
  };

  const handleMouseOut = (k) => {
    setIsHovered(false);
    setKeyvalue(k);
  };


  const handleEditRow = ((row) => {

    if (row?.id) {
      console.log(row);
      navigate(`/admin/blog/edit-blog/${row.id}`)
      // router.push("/admin/blog/"+row.original._id);
    }
  });
  const handleRemoveClick = ((deleteid) => {
    console.log(deleteid);
    deleteblogs(deleteid);
  })
  const deleteblogs = async (id) => {
    const isProd = process.env.NODE_ENV === "production";
    const API = "http://127.0.0.1:8000";
    const response = await axios.delete(`${API}/api/blog/delete/${id}`);
    let message = "";
    if (response.status) {
      dispatch(getuserPage())
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

  return (
    <Grid container spacing={2}>
      {UserData?.userData?.message?.map((user, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <Card variant="outlined"
            onMouseOver={() => handleMouseOver(index)}
            onMouseOut={() => handleMouseOut(index)}>
            <CardContent style={{ textAlign: 'center' }}>
              <Avatar alt={user.name} src={`http://127.0.0.1:8000/${user.image}`} style={{ width: 100, height: 100, margin: 'auto' }} />
              <Typography variant="h6">{user.fname} {user.lname}</Typography>
              <Typography variant="body2" color="textSecondary">{user.email}</Typography>
              <div style={{
                marginTop: '10px',
              }}>
                <IconButton onClick={() => handleEditRow(user)}>
                  <EditIcon color="primary" onClick={() => handleEditRow(user)} />
                </IconButton>
                <IconButton >
                  <DeleteIcon color="error" onClick={() => handleRemoveClick(user.id)} />
                </IconButton>
              </div>
            </CardContent>
          </Card>
        </Grid>
      ))}
      
    </Grid>
  );
};

export default UserCardGrid;