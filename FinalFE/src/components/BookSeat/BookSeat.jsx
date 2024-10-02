import React, { useEffect, useState } from "react";
import { Button, message, Modal } from "antd";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import NavbarHead from "../Navbar/NavbarHead";

const BookSeat = () => {
  const [theater, setTheater] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSeats, setSelectedSeats] = useState([]); // Chứa danh sách ghế đã chọn
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTheater = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/theaters/${id}`
        );
        setTheater(response.data);
      } catch (error) {
        console.error("Error fetching theater:", error);
        message.error("Failed to load theater information.");
      } finally {
        setLoading(false);
      }
    };

    fetchTheater();
  }, [id]);

  const handleSelectSeat = (seatNumber) => {
    if (selectedSeats.includes(seatNumber)) {
      setSelectedSeats(selectedSeats.filter((seat) => seat !== seatNumber));
    } else {
      setSelectedSeats([...selectedSeats, seatNumber]);
    }
  };

  const confirmBooking = async () => {
    try {
      await axios.post("http://localhost:8080/theaters/bookSeat", {
        theaterId: id,
        seatNumbers: selectedSeats,
      });
      message.success(`Seats ${selectedSeats.join(", ")} booked successfully!`);

      const updatedTheater = await axios.get(
        `http://localhost:8080/theaters/${id}`
      );
      setTheater(updatedTheater.data);

      navigate("/booking-success");
    } catch (error) {
      console.error("Error booking seats:", error);
      message.error("Failed to book seats.");
    } finally {
      setSelectedSeats([]);
    }
  };

  const cancelBooking = () => {
    setSelectedSeats([]);
  };

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <NavbarHead />
      <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
        <h2 style={{ textAlign: "center" }}>
          {theater.name} - {theater.location}
        </h2>
        <h3>Available Seats</h3>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {theater.seats.map((seat) => (
            <Button
              key={seat.number}
              type={seat.isBooked ? "dashed" : "primary"}
              style={{
                margin: "5px",
                width: "60px",
                backgroundColor: selectedSeats.includes(seat.number)
                  ? "red"
                  : "",
              }}
              onClick={() => !seat.isBooked && handleSelectSeat(seat.number)}
              disabled={seat.isBooked}
            >
              {seat.number}
            </Button>
          ))}
        </div>

        {selectedSeats.length > 0 && (
          <Modal
            title="Confirm Booking"
            open={true}
            onOk={confirmBooking}
            onCancel={cancelBooking}
            okText="Confirm"
            cancelText="Cancel"
          >
            <p>
              Are you sure you want to book these seats:{" "}
              {selectedSeats.join(", ")}?
            </p>
          </Modal>
        )}
      </div>
    </>
  );
};

export default BookSeat;
