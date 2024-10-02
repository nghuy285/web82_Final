import React, { useEffect, useState } from "react";
import { Form, Input, Button, message, Modal, Select } from "antd";
import axios from "axios";
import { useParams } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import NavbarHead from "../Navbar/NavbarHead";
import { useNavigate } from "react-router-dom";
const { Option } = Select;

const Profile = () => {
  const { id } = useParams(); // Lấy id từ URL
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]); // Danh sách người dùng
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(""); // ID của người dùng được chọn
  const navigate = useNavigate();
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/users/${id}`);
        setUserData(response.data);
        setLoading(false);
      } catch (error) {
        message.error("Error fetching user data");
        setLoading(false);
      }
    };
    fetchUserData();
  }, [id]);

  const onFinish = async (values) => {
    try {
      const response = await axios.put(
        `http://localhost:8080/users/${id}`,
        values
      );
      message.success("Profile updated successfully");
      setUserData(response.data);
    } catch (error) {
      message.error("Error updating profile");
    }
  };

  const showModal = async () => {
    try {
      const response = await axios.get("http://localhost:8080/users");
      setUsers(response.data);
      setIsModalVisible(true);
    } catch (error) {
      message.error("Error fetching user list");
    }
  };
  const theaterManager = () => {
    navigate("/theater");
  };
  const handleOk = async () => {
    if (!selectedUserId) {
      message.error("Please select a user");
      return;
    }

    try {
      await axios.put(`http://localhost:8080/users/${selectedUserId}`, {
        role: "Manager",
      });
      message.success("User promoted to Manager successfully");
      setIsModalVisible(false); // Đóng modal
    } catch (error) {
      message.error("Error updating user role");
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const moivesManager = () => {
    navigate("/moviesManager");
  };
  const renderAdminOptions = () => (
    <div style={{ marginTop: "20px", gap: "1.8rem" }}>
      <h3>Admin Panel</h3>
      <div style={{ display: "flex", gap: "1.8rem", flexWrap: "wrap" }}>
        <Button
          type="primary"
          style={{ marginBottom: "10px" }}
          onClick={showModal}
        >
          Add Manager
        </Button>
        <Button
          type="primary"
          onClick={theaterManager}
          style={{ marginBottom: "10px" }}
        >
          Manage Theaters
        </Button>
        <Button
          type="primary"
          onClick={moivesManager}
          style={{ marginBottom: "10px" }}
        >
          Manage Movies
        </Button>
      </div>
    </div>
  );

  const renderManagerOptions = () => (
    <div style={{ marginTop: "20px" }}>
      <h3>Manager Panel</h3>
      <div style={{ display: "flex", gap: "1.8rem" }}>
        <Button
          type="primary"
          onClick={theaterManager}
          style={{ marginBottom: "10px" }}
        >
          Manage Theaters
        </Button>
        <Button
          type="primary"
          onClick={moivesManager}
          style={{ marginBottom: "10px" }}
        >
          Manage Movies
        </Button>
      </div>
    </div>
  );

  return (
    <div>
      <div style={{ maxWidth: "600px", margin: "auto", padding: "20px" }}>
        <NavbarHead />
        <h2>Profile</h2>
        {!loading && (
          <Form initialValues={userData} onFinish={onFinish} layout="vertical">
            <Form.Item
              label="Username"
              name="userName"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Please input your email!" },
                { type: "email", message: "The input is not valid E-mail!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Save
              </Button>
            </Form.Item>
          </Form>
        )}

        {userData.role === "Admin" && renderAdminOptions()}
        {userData.role === "Manager" && renderManagerOptions()}

        <Modal
          title="Select a User to Promote to Manager"
          open={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <Select
            style={{ width: "100%" }}
            placeholder="Select a user"
            onChange={(value) => setSelectedUserId(value)}
          >
            {users.map((user) => (
              <Option key={user._id} value={user._id}>
                {user.userName} ({user.email})
              </Option>
            ))}
          </Select>
        </Modal>
        <Button
          block
          danger
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/login");
          }}
          style={{ display: "flex", bottom: "0" }}
        >
          Log out
        </Button>
      </div>
      <Navbar></Navbar>
    </div>
  );
};

export default Profile;
