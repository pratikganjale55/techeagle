import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddNewInventory = ({getAllProducts}) => {
  const [open, setOpen] = useState(false);
  const [addInvetory, setAddInventory] = useState({});
  let authDetails = JSON.parse(localStorage.getItem("authDetails"));

  const navigate = useNavigate();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setAddInventory({
      ...addInvetory,
      [name]: value,
    });
  };
  const handleSubmitInv = (e) => {
    e.preventDefault();
    // console.log(editData);
    fetch(`http://localhost:5000/manager/addInventory`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authDetails.token}`,
      },
      body: JSON.stringify(addInvetory),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("data", data);
        setOpen(false);
        getAllProducts() ;
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <div>
      <Button
        style={{
          borderRadius: "8px",
          color: "black",
          width: "100%",
          backgroundColor: "#FFA41B",
          margin: "5%",
        }}
        onClick={handleOpen}
      >
        Add new Inventoy
      </Button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          component="form"
          onSubmit={handleSubmitInv}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            backgroundColor: "white",

            boxShadow: 24,
            padding: 10,
          }}
        >
          <TextField
            margin="normal"
            fullWidth
            id="name"
            label="name"
            name="name"
            autoComplete="name"
            onChange={handleChange}
            autoFocus
          />
          <TextField
            margin="normal"
            fullWidth
            id="description"
            label="description"
            name="description"
            autoComplete="description"
            onChange={handleChange}
            autoFocus
          />
          <TextField
            margin="normal"
            id="quantity"
            label="quantity"
            name="quantity"
            autoComplete="quantity"
            onChange={handleChange}
            autoFocus
          />
          <TextField
            margin="normal"
            id="weight"
            label="weight"
            name="weight"
            autoComplete="weight"
            onChange={handleChange}
            autoFocus
          />
          <TextField
            margin="normal"
            fullWidth
            name="price"
            label="price"
            type="price"
            id="price"
            autoComplete="price"
            onChange={handleChange}
          />
          <Button
            type="submit"
            variant="contained"
            sx={{ mt: 3, mb: 2, backgroundColor: "#FFA41B", color: "black" }}
          >
            Add
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default AddNewInventory;
