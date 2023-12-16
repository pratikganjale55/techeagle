import {
  Button,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Grid,
} from "@mui/material";
import React from "react";
import prdImg from "../../assets/images/dumyImage.jpg" ;

const Cards = ({item}) => {
  return (
    <>
      <Card>
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image={prdImg}
            alt="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {item?.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {item?.description}
            </Typography>
          </CardContent>
        </CardActionArea>
        
      </Card>
    </>
  );
};

export default Cards;
