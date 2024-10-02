import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Input, message } from "antd";
import axios from "axios";
import NavbarHead from "../Navbar/NavbarHead";

const MovieManager = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentMovie, setCurrentMovie] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const response = await axios.get("http://localhost:8080/movies");
      setMovies(response.data);
      setLoading(false);
    } catch (error) {
      message.error("Failed to fetch movies");
      setLoading(false);
    }
  };

  const showModal = (movie = null) => {
    setCurrentMovie(movie);
    if (movie) {
      form.setFieldsValue(movie);
    } else {
      form.resetFields();
    }
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    const values = await form.validateFields();
    const token = localStorage.getItem("token");
    const userInfo = JSON.parse(localStorage.getItem("User"));
    const role = userInfo.role;
    if (role !== "Admin" && role !== "Manager") {
      message.error("Bạn không có quyền thực hiện hành động này!");
      return;
    }
    try {
      if (currentMovie) {
        await axios.put(
          `http://localhost:8080/movies/${currentMovie._id}`,
          values,
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );
        message.success("Movie updated successfully");
      } else {
        await axios.post("http://localhost:8080/movies", values, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });
        message.success("Movie added successfully");
      }
      fetchMovies();
      setIsModalVisible(false);
    } catch (error) {
      console.error("Error while saving movie: ", error);
      message.error("Failed to save movie");
    }
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`http://localhost:8080/movies/${id}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      message.success("Movie deleted successfully");
      fetchMovies();
    } catch (error) {
      console.error("Error while deleting movie: ", error);
      message.error("Failed to delete movie");
    }
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Year",
      dataIndex: "year",
      key: "year",
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <span>
          <Button
            style={{ marginLeft: "0.5rem", marginBottom: "0.5rem" }}
            onClick={() => showModal(record)}
          >
            Edit
          </Button>
          <Button
            danger
            onClick={() => handleDelete(record._id)}
            style={{ marginLeft: 10 }}
          >
            Delete
          </Button>
        </span>
      ),
    },
  ];

  return (
    <div>
      <NavbarHead />
      <div style={{ padding: "20px" }}>
        <h2>Movie Manager</h2>
        <Button
          type="primary"
          onClick={() => showModal()}
          style={{ marginBottom: 20 }}
        >
          Add Movie
        </Button>
        <Table
          columns={columns}
          dataSource={movies}
          loading={loading}
          pagination={{
            pageSize: 5,

            position: ["bottomCenter"],
          }}
          rowKey="_id"
        />

        <Modal
          title={currentMovie ? "Edit Movie" : "Add Movie"}
          open={isModalVisible}
          onOk={handleOk}
          onCancel={() => setIsModalVisible(false)}
        >
          <Form form={form} layout="vertical">
            <Form.Item
              name="name"
              label="Title"
              rules={[
                { required: true, message: "Please input the movie title!" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="year"
              label="Year"
              rules={[
                { required: true, message: "Please input the movie year!" },
              ]}
            >
              <Input type="number" />
            </Form.Item>
            <Form.Item
              name="time"
              label="Time (minutes)"
              rules={[
                { required: true, message: "Please input the movie duration!" },
              ]}
            >
              <Input type="number" />
            </Form.Item>
            <Form.Item
              name="introduce"
              label="Introduce"
              rules={[
                {
                  required: true,
                  message: "Please input the movie introduction!",
                },
              ]}
            >
              <Input.TextArea />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
};

export default MovieManager;
