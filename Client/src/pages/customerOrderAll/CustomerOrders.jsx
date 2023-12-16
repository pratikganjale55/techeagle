import { Button } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const CustomerOrders = () => {
    const navigate = useNavigate() ;
    const handleOpen = () => {
        navigate("/orderList")
    }
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
        Customer Orders
      </Button>
    </div>
  )
}

export default CustomerOrders
