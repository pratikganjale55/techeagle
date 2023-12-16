import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Stepper,
  Typography,
} from "@mui/material";

import React, { useContext, useEffect, useState } from "react";
import Stepar from "./Steppar";
import Navbar from "../../components/navbar/Navbar";
import { ProductsContext } from "../../context/ContextProvider";
import dumyPrdImg from "../../assets/images/dumyImage.jpg"

const MyOrder = () => {
  let authDetails = JSON.parse(localStorage.getItem("authDetails"));
  const [singleItem, setSingleItem] = useState();
  const { myOrders, getOrderDetails } = useContext(ProductsContext);
  const [isStatus, setIsStatus] = useState(false);

  const handleSeeStaus = (item) => {
    setIsStatus(true);
    setSingleItem(item);
  };
  useEffect(() => {
    getOrderDetails();
  }, []);
  return (
    <div>
      <Navbar />
      <Grid container spacing={2} sx={{ marginY: 4 }}>
        <Grid container spacing={2} xs={8} sx={{ paddingX: 6 }}>
          {myOrders.length > 0 &&
            myOrders.map((item, i) => (
              <Grid item xs={2} sm={6} md={4} key={i}>
                <Card
                  sx={{ display: "flex" }}
                  onClick={() => handleSeeStaus(item)}
                  style={{ cursor: "pointer" }}
                >
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <CardContent sx={{ flex: "1 0 auto" }}>
                      <Typography  variant="h5">
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
                        /per
                      </Typography>
                      <Typography>
                        Qty:
                        <span style={{ fontWeight: "bold" }}>
                         {" "}{item?.quantity}
                        </span>{" "}
                      </Typography>
                      <Typography>
                        Total:
                        <span style={{ fontWeight: "bold" }}>
                         {item?.price * item?.quantity}/-
                        </span>{" "}
                      </Typography>
                      
                    </CardContent>
                   
                  </Box>
                  <CardMedia
                    component="img"
                    sx={{ width: 141}}
                    image={dumyPrdImg}
                    alt="image"
                  />
                </Card>
              </Grid>
            ))}
        </Grid>
        {isStatus && (
          <Grid
            container
            xs={4}
            style={{
              backgroundColor: "white",
              // border: "1px solid black",
              position: "fixed",
              right: "20px",
              top: "15%",
              height: "80%",
              width: "100%",
            }}
          >
            <Stepar singleItem={singleItem} />
          </Grid>
        )}
      </Grid>
    </div>
  );
};

export default MyOrder;
