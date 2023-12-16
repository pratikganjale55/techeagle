import {
  Box,
  Button,
  Paper,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
const steps = [
  {
    label: "Ordered",
    description: `Carier picked up the package`,
  },
  {
    label: "Shipped",
    description: "Package has left an facility",
  },
  {
    label: "Out for delivery",
    description: `package arrived near your location`,
  },
  {
    label: "Arriving",
    description: "Delivered",
  },
];
const Stepar = ({ singleItem }) => {
  // console.log("singleItem", singleItem)
  return (
    <div>
      <Typography style={{ textAlign: "center", fontWeight: "bold", padding : "2%" }}>
        {singleItem.name}
      </Typography>
      <Box sx={{ maxWidth: 400, marginX: 3 }}>
        <Stepper activeStep={singleItem.status} orientation="vertical">
          {steps.map((step, index) => (
            <Step key={step.label}>
              <StepLabel
                optional={
                  index === 3 ? (
                    <Typography variant="caption">Last step</Typography>
                  ) : null
                }
              >
                {step.label}
              </StepLabel>
              <StepContent>
                <Typography>{step.description}</Typography>
              </StepContent>
            </Step>
          ))}
        </Stepper>
      </Box>
    </div>
  );
};

export default Stepar;
