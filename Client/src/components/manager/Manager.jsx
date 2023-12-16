import React, { useEffect, useState } from "react";
import Navbar from "../navbar/Navbar";
import Cards from "../../pages/Items/Cards";
import {
  Button,
  ButtonGroup,
  Card,
  CardActionArea,
  CardMedia,
  Drawer,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { Box, Stack } from "@mui/system";
import AddNewInventory from "../../pages/Items/AddNewInventory";
import CustomerOrders from "../../pages/customerOrderAll/CustomerOrders";
import prdImage from "../../assets/images/dumyImage.jpg";
const Manager = () => {
  const [items, setItems] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [seeProducts, setProducts] = useState();
  const [isOpen, setIsopen] = useState(false);
  const [editData, setEditData] = useState({});
  const [isData, setIsData] = useState(true);
  let authDetails = JSON.parse(localStorage.getItem("authDetails"));

  const toggleDrawer = (val) => {
    setToggle(val);
  };

  const getAllProducts = async () => {
    fetch("http://localhost:5000/manager/getInventory", {
      headers: {
        Authorization: `Bearer ${authDetails.token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setItems(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleSelectItem = async (item) => {
    setProducts(item);
    setIsopen(true);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEditData({
      ...editData,
      [name]: value,
    });
  };
  console.log("items", items);
  const handleEdit = async (e) => {
    e.preventDefault();
    // console.log(editData);
    fetch(`http://localhost:5000/manager/editItem/${seeProducts._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authDetails.token}`,
      },
      body: JSON.stringify(editData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("data", data);
        setToggle(false);
        setIsopen(false);
        getAllProducts();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleDeleteItem = async () => {
    console.log("delte");
    fetch(`http://localhost:5000/manager/deleteItem/${seeProducts._id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authDetails.token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("data", data);
        if (data.message == "no data yet") {
          setIsData(false);
        }
        getAllProducts();
      })
      .catch((error) => {
        console.error(error);
      });
  };
  useEffect(() => {
    getAllProducts();
  }, []);
  console.log(isData);
  return (
    <div>
      <Navbar />
      <div
        style={{
          width: "50%",
          margin: "2%",
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        <div style={{ width: "40%" }}>
          <AddNewInventory getAllProducts={getAllProducts} />
        </div>

        <div style={{ width: "40%" }}>
          <CustomerOrders />
        </div>
      </div>
      {isData == false && (
        <Paper>
          <Typography style={{ textAlign: "center" }}>No data</Typography>
        </Paper>
      )}
      <Grid container spacing={2} sx={{ marginY: 4 }}>
        <Grid container spacing={2} xs={8} sx={{ paddingX: 6 }}>
          {items.length > 0 &&
            items.map((item, i) => (
              <Grid
                item
                xs={2}
                sm={6}
                md={4}
                key={i}
                onClick={() => handleSelectItem(item)}
              >
                <Cards item={item} />
              </Grid>
            ))}
        </Grid>
        {isOpen && (
          <Grid
            container
            xs={4}
            style={{
              backgroundColor: "white",
              overflowY: "auto",
              position: "fixed",
              right: "20px",
              top: "15%",
              height: "500px",
              width: "100%",
            }}
          >
            <Grid item xs={6} md={8} style={{ padding: "8px" }}>
              <Card style={{ height: "auto", boxShadow: "none" }}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="100%"
                    image={prdImage}
                    alt="products image"
                    style={{
                      objectFit: "cover",
                      width: "100%",
                    }}
                  />
                </CardActionArea>
              </Card>
            </Grid>
            <Grid item xs={6} md={4} style={{ padding: "8px" }}>
              <Stack style={{ height: "100%" }}>
                <Card style={{ height: "30%", marginTop: 4 }}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="100%"
                      image={prdImage}
                      alt="products image"
                    />
                  </CardActionArea>
                </Card>
                <Card style={{ height: "30%", marginTop: 4 }}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="100%"
                      image={prdImage}
                      alt="products image"
                    />
                  </CardActionArea>
                </Card>
                <Card style={{ height: "30%", marginTop: 4 }}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="100%"
                      image={prdImage}
                      alt="products image"
                    />
                  </CardActionArea>
                </Card>
              </Stack>
            </Grid>
            <Grid item xs={8} md={12} style={{ padding: "8px" }}>
              <hr />
              <div>
                <h3>{seeProducts?.name}</h3>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div style={{ color: "grey" }}>
                    price :{" "}
                    <span style={{ color: "black", fontWeight: "bold" }}>
                      Rs {seeProducts?.price}{" "}
                    </span>
                    /each
                  </div>
                  <div>
                   Quantity : <span style={{ color: "black", fontWeight: "bold" }}>
                      {seeProducts?.quantity}{" "}
                    </span>
                  </div>
                  <div style={{ color: "grey" }}>
                    Weight :{" "}
                    <span style={{ color: "black", fontWeight: "bold" }}>
                      {seeProducts?.weight}{" "}
                    </span>
                    /gram
                  </div>
                </div>

                <p style={{ color: "grey" }}>{seeProducts?.description}</p>
              </div>

              <ButtonGroup
                disableElevation
                variant="contained"
                aria-label="Disabled elevation buttons"
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <Button
                  style={{
                    borderRadius: "8px",
                    color: "black",
                    width: "40%",
                    backgroundColor: "#F86F03",
                  }}
                  onClick={() => toggleDrawer(true)}
                >
                  Edit
                </Button>
                <Button
                  style={{
                    borderRadius: "8px",
                    color: "black",
                    width: "40%",
                    backgroundColor: "#FFA41B",
                  }}
                  onClick={handleDeleteItem}
                >
                  Delete
                </Button>
              </ButtonGroup>
            </Grid>
          </Grid>
        )}
      </Grid>
      
      <Box>
        <Drawer
          anchor={"left"}
          open={toggle}
          onClose={() => toggleDrawer(false)}
        >
          <Box
            component="form"
            onSubmit={handleEdit}
            noValidate
            sx={{
              mt: 1,
              padding: 3,
              width: "400px",
              border: "1px solid black",
            }}
          >
            <TextField
              margin="normal"
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoComplete="name"
              value={editData?.name || ""}
              onChange={handleChange}
              autoFocus
            />
            <TextField
              margin="normal"
              fullWidth
              id="description"
              label="Description"
              name="description"
              autoComplete="description"
              value={editData?.description || ""}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              id="quantity"
              label="Quantity"
              name="quantity"
              autoComplete="quantity"
              value={editData?.quantity || ""}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              id="weight"
              label="Weight"
              name="weight"
              autoComplete="weight"
              value={editData?.weight || ""}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              fullWidth
              name="price"
              label="Price"
              type="number"
              id="price"
              value={editData?.price}
              onChange={handleChange}
            />
            <Button
              type="submit"
              variant="contained"
              sx={{ mt: 3, mb: 2, backgroundColor: "#F86F03" }}
            >
              Edit
            </Button>
          </Box>
        </Drawer>
      </Box>
    </div>
  );
};

export default Manager;
