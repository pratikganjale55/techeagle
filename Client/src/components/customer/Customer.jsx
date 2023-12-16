import React, { useContext, useEffect, useState } from "react";
import Navbar from "../navbar/Navbar";
import Cards from "../../pages/Items/Cards";
import {
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  Grid,
  Typography,
  ButtonGroup,
  Button,
  Alert,
  Paper,
} from "@mui/material";
import { Stack } from "@mui/system";
import { ProductsContext } from "../../context/ContextProvider";
import prdImg from "../../assets/images/dumyImage.jpg";

const Customer = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [product, setProduct] = useState();
  const [showDetails, setDetails] = useState(false);
  const [qty, setQty] = useState(1);
  const { addToCart, userCards, getUserCards } = useContext(ProductsContext);
  const [itemSelect, setItemSelect] = useState();
  let authDetails = JSON.parse(localStorage.getItem("authDetails"));
  const getAllProducts = async () => {
    fetch("http://localhost:5000/customer/getInventory", {
      headers: {
        Authorization: `Bearer ${authDetails.token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setAllProducts(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleSeeDetails = (item) => {
    setDetails(true);
    setProduct(item);
    setItemSelect(item._id);
  };
  const handleDecreQty = () => {
    setQty((prev) => prev - 1);
  };
  const handleIncreQty = () => {
    setQty((prev) => prev + 1);
  };
  useEffect(() => {
    getAllProducts();
    getUserCards();
  }, []);

  console.log("userCard", userCards)
  console.log("prducts", product)
  return (
    <div>
      <Navbar />

      <Paper sx={{ marginY: 2 }}>
        {allProducts.length == 0 ? (
          <Typography style={{ textAlign: "center" }}>No data</Typography>
        ) : (
          <Typography style={{ textAlign: "center" }}>Products</Typography>
        )}
      </Paper>

      <Grid container spacing={2} sx={{ marginY: 4 }}>
        <Grid container spacing={2} xs={8} sx={{ paddingX: 6 }}>
          {allProducts &&
            allProducts.map((item, i) => (
              <Grid
                item
                xs={2}
                sm={6}
                md={4}
                key={i}
                onClick={() => handleSeeDetails(item)}
              >
                <Cards item={item} />
                {/* <h2>hjnfnm</h2> */}
              </Grid>
            ))}
        </Grid>
        {showDetails && (
          <Grid
            container
            xs={4}
            style={{
              backgroundColor: "white",
              //   border: "1px solid black",
              position: "fixed",
              right: "20px",
              top: "20%",
              height: "500px",
              width: "100%",
              overflowY: "auto",
            }}
          >
            <Grid item xs={6} md={8} style={{ padding: "8px" }}>
              <Card style={{ height: "auto", boxShadow: "none" }}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="100%"
                    image={prdImg}
                    alt="product image"
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
                      image={prdImg}
                      alt="product image"
                    />
                  </CardActionArea>
                </Card>
                <Card style={{ height: "30%", marginTop: 4 }}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      //   height="100%"
                      image={prdImg}
                      alt="product image"
                    />
                  </CardActionArea>
                </Card>
                <Card style={{ height: "30%", marginTop: 4 }}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      //   height="100%"
                      image={prdImg}
                      alt="product image"
                    />
                  </CardActionArea>
                </Card>
              </Stack>
            </Grid>
            <Grid item xs={8} md={12} style={{ padding: "8px" }}>
              <hr />
              <div>
                <h3>{product?.name}</h3>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div style={{ color: "grey" }}>
                    price :{" "}
                    <span style={{ color: "black", fontWeight: "bold" }}>
                      Rs {product?.price}{" "}
                    </span>
                    /each
                  </div>
                  <div>
                    <ButtonGroup
                      disableElevation
                      variant="contained"
                      aria-label="Disabled elevation buttons"
                    >
                      <Button
                        style={{
                          backgroundColor: "#F86F03",
                          width: "30px",
                          height: "30px",
                        }}
                        onClick={handleDecreQty}
                        disabled={qty <= 1}
                      >
                        -
                      </Button>
                      <span
                        style={{
                          width: "30px",
                          height: "30px",

                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {qty}
                      </span>
                      <Button
                        style={{
                          backgroundColor: "#F86F03",
                          width: "30px",
                          height: "30px",
                        }}
                        onClick={handleIncreQty}
                      >
                        +
                      </Button>
                    </ButtonGroup>
                  </div>
                  <div style={{ color: "grey" }}>
                    Weight :{" "}
                    <span style={{ color: "black", fontWeight: "bold" }}>
                      {product?.weight}{" "}
                    </span>
                    /gram
                  </div>
                </div>

                <p style={{ color: "grey" }}>{product?.description}</p>
              </div>
              <ButtonGroup
                disableElevation
                variant="contained"
                aria-label="Disabled elevation buttons"
                style={{ display: "flex", justifyContent: "center" }}
              >
                <Button
                  style={{
                    borderRadius: "8px",
                    color: "black",
                    width: "40%",
                    backgroundColor: "#F86F03",
                  }}
                  onClick={() => addToCart(product, qty)}
                  disabled={userCards.some(
                    (item) =>
                      item.productId === product._id && item.userId === authDetails.id
                  )}
                >
                  {userCards.some(
                    (item) =>
                      item.productId === product._id && item.userId === authDetails.id
                  )
                    ? "Item in Cart"
                    : "Add to Cart"}
                </Button>
              </ButtonGroup>
            </Grid>
          </Grid>
        )}
      </Grid>
    </div>
  );
};

export default Customer;
