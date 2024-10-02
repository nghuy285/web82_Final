import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Select,
  notification,
  Popconfirm,
} from "antd";
import axios from "axios";
import NavbarHead from "../Navbar/NavbarHead";

const TheaterManagement = () => {
  const [theaters, setTheaters] = useState([]);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
  const [selectedTheater, setSelectedTheater] = useState(null);
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [theaterResponse, movieResponse] = await Promise.all([
          axios.get("http://localhost:8080/theaters"),
          axios.get("http://localhost:8080/movies"),
        ]);
        setTheaters(theaterResponse.data);
        setMovies(movieResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleAddTheater = async (values) => {
    await axios.post("http://localhost:8080/theaters", values);
    notification.success({ message: "Thêm rạp thành công!" });
    setIsAddModalVisible(false);
    const response = await axios.get("http://localhost:8080/theaters");
    setTheaters(response.data);
  };

  const handleUpdateTheater = async (values) => {
    await axios.put(
      `http://localhost:8080/theaters/${selectedTheater._id}`,
      values
    );
    notification.success({ message: "Cập nhật rạp thành công!" });
    setIsUpdateModalVisible(false);
    setSelectedTheater(null);
    const response = await axios.get("http://localhost:8080/theaters");
    setTheaters(response.data);
  };

  const handleDeleteTheater = async (id) => {
    await axios.delete(`http://localhost:8080/theaters/${id}`);
    notification.success({ message: "Xóa rạp thành công!" });
    const response = await axios.get("http://localhost:8080/theaters");
    setTheaters(response.data);
  };

  const showAddModal = () => {
    setIsAddModalVisible(true);
  };

  const showUpdateModal = (theater) => {
    setSelectedTheater(theater);
    setIsUpdateModalVisible(true);
  };

  return (
    <>
      <NavbarHead></NavbarHead>
      <Button type="primary" onClick={showAddModal}>
        Thêm Rạp
      </Button>
      <Table
        dataSource={theaters}
        rowKey="_id"
        pagination={{
          pageSize: 7,

          position: ["bottomCenter"],
        }}
      >
        <Table.Column title="Tên Rạp" dataIndex="name" />
        <Table.Column title="Địa Chỉ" dataIndex="location" />
        <Table.Column
          title="Số Ghế"
          dataIndex="seats"
          render={(seats) => seats.length}
        />
        <Table.Column
          title="Hành Động"
          render={(text, theater) => (
            <>
              <Button type="link" onClick={() => showUpdateModal(theater)}>
                Sửa
              </Button>
              <Popconfirm
                title="Bạn có chắc chắn muốn xóa rạp này không?"
                onConfirm={() => handleDeleteTheater(theater._id)}
                okText="Có"
                cancelText="Không"
              >
                <Button type="link" danger>
                  Xóa
                </Button>
              </Popconfirm>
            </>
          )}
        />
      </Table>

      <Modal
        title="Thêm Rạp Chiếu Phim"
        open={isAddModalVisible}
        onCancel={() => setIsAddModalVisible(false)}
        footer={null}
      >
        <Form onFinish={handleAddTheater}>
          <Form.Item name="name" label="Tên Rạp" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="location"
            label="Địa Chỉ"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="movies" label="Phim">
            <Select placeholder="Chọn phim">
              {movies.map((movie, index) => (
                <Select.Option key={movie._id} value={movie._id}>
                  {movie.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="seatsPerRow" label="Số Ghế">
            <Input />
          </Form.Item>
          <Form.Item name="rows" label="Số Hàng">
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Thêm
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Cập Nhật Rạp Chiếu Phim"
        open={isUpdateModalVisible}
        onCancel={() => setIsUpdateModalVisible(false)}
        footer={null}
      >
        <Form onFinish={handleUpdateTheater} initialValues={selectedTheater}>
          <Form.Item name="name" label="Tên Rạp" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="location"
            label="Địa Chỉ"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="movies" label="Phim">
            <Select placeholder="Chọn phim">
              {movies.map((movie, index) => (
                <Select.Option key={movie._id} value={movie._id}>
                  {movie.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="seatsPerRow" label="Số Ghế">
            <Input />
          </Form.Item>
          <Form.Item name="rows" label="Số Hàng">
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Cập Nhật
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default TheaterManagement;
