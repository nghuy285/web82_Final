import React from "react";
import Navbar from "../Navbar/Navbar";
import NavbarHead from "../Navbar/NavbarHead";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";
const BookingSuccess = () => {
  const navigate = useNavigate();
  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <NavbarHead></NavbarHead>
      <h2>Booking Successful!</h2>
      <p>Your seat has been booked successfully.</p>
      <Button
        onClick={() => {
          navigate("/home");
        }}
      >
        Back to home
      </Button>
    </div>
  );
};

export default BookingSuccess;
