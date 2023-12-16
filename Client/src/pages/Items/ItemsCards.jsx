import React, { useContext, useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import {
  Button,
  ButtonGroup,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Modal,
  Paper,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { Box } from "@mui/system";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { ProductsContext } from "../../context/ContextProvider";
import prdDumyImg from"../../assets/images/dumyImage.jpg" ;

const ItemsCards = () => {
  let authDetails = JSON.parse(localStorage.getItem("authDetails"));
  const { userCards, getUserCards, getOrderDetails, myOrders } =
    useContext(ProductsContext);
  const [qty, setQty] = useState(1);
  const [isItemBuy, setIsItemBuy] = useState(false);

  console.log("userCards", userCards);

  const handleDecreQty = () => {
    setQty((prev) => prev - 1);
  };
  const handleIncreQty = () => {
    setQty((prev) => prev + 1);
  };

  const handleBuyProduct = (item, qty) => {
    const order = {
      ...item,
      quantity: qty,
    };
    fetch("http://localhost:5000/customer/postOrder", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authDetails.token}`,
      },
      body: JSON.stringify(order),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setIsItemBuy(true);
        getUserCards()
      })
      .catch((error) => {
        console.error(error);
      });
  };
  useEffect(() => {
    getUserCards();
    getOrderDetails();
  }, []);

  
  return (
    <>
      <Navbar />
      <Link to="/myorder">
        <Button
          style={{
            borderRadius: "8px",
            color: "black",
            width: "40%",
            backgroundColor: "#FFA41B",
            margin: "2%",
          }}
        >
          My Orders
        </Button>
      </Link>
      <Paper sx={{ marginY: 3 }}>
        {userCards.length == 0 ? (
          <Typography style={{ textAlign: "center" }}>No data</Typography>
        ) : (
          <Typography style={{ textAlign: "center" }}>My cards</Typography>
        )}
      </Paper>

      <Grid container spacing={2} xs={12} sx={{ paddingX: 6, paddingY: 6 }}>
        {userCards &&
          userCards.map((item, i) => (
            <Grid item xs={2} sm={6} md={4} key={i}>
              <Card>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="140"
                    image={prdDumyImg}
                    alt="green iguana"
                  />
                </CardActionArea>
                <Grid item xs={8} md={12} style={{ padding: "8px" }}>
                  <hr />
                  <div>
                    <h3 style={{}}>{item?.name}</h3>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <div style={{ color: "grey" }}>
                        price :{" "}
                        <span style={{ color: "black", fontWeight: "bold" }}>
                          Rs {item?.price}{" "}
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
                            }}
                            onClick={handleDecreQty}
                            disabled={qty <= 1}
                          >
                            -
                          </Button>
                          <span
                            style={{
                              width: "40px",
                              height: "40px",
                              border: "1px solid grey",
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
                          {item?.weight}{" "}
                        </span>
                        /Kg
                      </div>
                    </div>

                    <p style={{ color: "grey" }}>{item?.description}</p>
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
                        backgroundColor: "#FFA41B",
                      }}
                      onClick={() => handleBuyProduct(item, qty)}
                      disabled={myOrders.some(
                        (orderItem) =>
                          orderItem._id == item._id &&
                          orderItem.userId == authDetails.id
                      )}
                    >
                      {myOrders.some(
                        (orderItem) =>
                          orderItem._id == item._id &&
                          orderItem.userId == authDetails.id
                      )
                        ? "Order process"
                        : "Buy now"}
                    </Button>
                  </ButtonGroup>
                </Grid>
              </Card>
            </Grid>
          ))}
      </Grid>

      {/* // modal // */}
      <Modal
        open={isItemBuy}
        onClose={() => setIsItemBuy(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
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
          <div style={{ display: "flex" }}>
            <IconButton
              size="large"
              aria-label="show 4 new mails"
              sx={{ color: "#65B741" }}
            >
              <CheckCircleIcon />
            </IconButton>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Order placed Successfully,... Visit again
            </Typography>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default ItemsCards;
