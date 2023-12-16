import {
  Card,
  CardContent,
  CardMedia,
  Drawer,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import { Box, Stack } from "@mui/system";
import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
const steps = [
  { id: 0, label: "Ordered", description: `Carier picked up the package` },
  {
    id: 1,
    label: "Shipped",
    description: "Package has left an facility",
  },
  {
    id: 2,
    label: "Out for delivery",
    description: `package arrived near your location`,
  },
  {
    id: 3,
    label: "Arriving",
    description: "Delivered",
  },
];

const OrderList = () => {
  let authDetails = JSON.parse(localStorage.getItem("authDetails"));
  const [orderData, setOrder] = useState([]);
  const [orderId, setOrderId] = useState();
  const [toggleDrawer, setDrawer] = useState(false);
  const [statusId, setStausId] = useState(0);
  const [isData, setIsData] = useState(true);

  const getAllOrders = async () => {
    fetch(`http://localhost:5000/manager/getAllOrders`, {
      headers: {
        Authorization: `Bearer ${authDetails.token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.message == "no data yet") {
          setIsData(false);
        }
        setOrder(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const updateStatus = (id, val) => {
    setOrderId(id);
    setDrawer(val);
  };
  const handleSelectStatus = async (id) => {
    setStausId(id);

    fetch(`http://localhost:5000/manager/updateStatus/${orderId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authDetails.token}`,
      },
      body: JSON.stringify({ status: id }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("data", data);
        setDrawer(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  useEffect(() => {
    getAllOrders();
  }, []);
  return (
    <div>
      <Navbar />
      <Paper sx={{ marginY: 3 }}>
        {
            isData == false ? <Typography style={{ textAlign: "center" }}>No data</Typography> : 
            <Typography style={{ textAlign: "center" }}>Customer orders</Typography>
        }
        
      </Paper>

      <Grid container spacing={2} sx={{ marginY: 4 }}>
        <Grid container spacing={2} xs={10} sx={{ paddingX: 6 }}>
          {orderData.length > 0 &&
            orderData.map((item, i) => (
              <Grid item xs={2} sm={6} md={4} key={i}>
                <Card
                  sx={{ display: "flex", cursor: "pointer" }}
                  onClick={() => updateStatus(item._id, true)}
                >
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <CardContent sx={{ flex: "1 0 auto" }}>
                      <Typography component="div" variant="h5">
                        {item?.name}
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        color="text.secondary"
                        component="div"
                      >
                        <span style={{ fontWeight: "bold" }}>
                          Rs {item?.price}
                        </span>{" "}
                        / each
                      </Typography>
                      <Typography>
                        Total :{" "}
                        <span style={{ fontWeight: "bold" }}>
                          Rs {item?.price * item?.quantity}
                        </span>{" "}
                      </Typography>
                      <Typography>Qty : {item?.quantity}</Typography>
                    </CardContent>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        pl: 1,
                        pb: 1,
                      }}
                    >
                      <Typography>{item._id}</Typography>
                    </Box>
                  </Box>
                </Card>
              </Grid>
            ))}
        </Grid>
      </Grid>

      {/* // update order status // */}

      <Drawer
        anchor={"right"}
        open={toggleDrawer}
        onClose={() => updateStatus(orderId, false)}
      >
        <Box sx={{ width: "400px", padding: "5%" }}>
          <Typography sx={{ textAlign: "center", fontWeight: "bold" }}>
            Status update
          </Typography>
          <p>* Select as per status</p>
          <Stack spacing={2} style={{ marginTop: "20px" }}>
            {steps?.map((ele, i) => {
              return (
                <Paper
                  sx={{
                    paddingX: 3,
                    paddingY: 2,
                    cursor: "pointer",
                    backgroundColor: statusId == i ? "grey" : "",
                  }}
                  onClick={() => handleSelectStatus(i)}
                >
                  <span
                    style={{
                      width: "30px",
                      height: "30px",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "#4CAF50",
                      color: "white",
                      fontWeight: "bold",
                    }}
                  >
                    {ele.id}
                  </span>
                  <p style={{ fontWeight: "bold" }}>{ele.label}</p>
                  <p>{ele.description}</p>
                </Paper>
              );
            })}
          </Stack>
        </Box>
      </Drawer>
    </div>
  );
};

export default OrderList;
