import React, { createContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const ProductsContext = createContext();

const ContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [userCards, setUserCards] = useState([]);
  let authDetails = JSON.parse(localStorage.getItem("authDetails"));
  const [addCard, setCard] = useState("");
  const [myOrders, setMyorders] = useState([]);
  const addToCart = async (item, qty) => {
    const cardData = {
      userId: authDetails.id,
      quantity: qty,
      description : item.description,
      name : item.name ,
      price : item.price ,
      weight : item.weight ,
      productId : item._id ,
    };
    console.log(item);
    fetch("http://localhost:5000/customer/card", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authDetails.token}`,
      },
      body: JSON.stringify(cardData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message == "Order place successfully") {
          setCard("success");
        }
        console.log(data)
      })
      .catch((error) => {
        console.error(error);
      });
  };
  // cards item //
  const getUserCards = async () => {
    fetch(`http://localhost:5000/customer/getCard/${authDetails.id}`, {
      headers: {
        Authorization: `Bearer ${authDetails.token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setUserCards(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // check user/manager

  const checkUser = () => {
    let authDetails = JSON.parse(localStorage.getItem("authDetails"));
    console.log("authDetails", authDetails.role);
    if (authDetails.role == "customer") {
      navigate("/customer");
    } else {
      navigate("/manager");
    }
  };

  // my order //
  const getOrderDetails = async () => {
    fetch(`http://localhost:5000/customer/getOrder/${authDetails.id}`, {
      headers: {
        Authorization: `Bearer ${authDetails.token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("data", data);
        setMyorders(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleLogout = () => {
    const logout = localStorage.removeItem("authDetails");
    navigate("/");
  };
  return (
    <ProductsContext.Provider
      value={{
        addToCart: addToCart,
        checkUser: checkUser,
        handleLogout: handleLogout,
        addCard: addCard,
        getUserCards: getUserCards,
        userCards: userCards,
        getOrderDetails: getOrderDetails,
        myOrders:myOrders,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export default ContextProvider;
