const Secret = "Secret";
const roleMiddleware = (roles) => {
  return (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(403).json({
        message: "Forbidden: No token provided.",
      });
    }

    jwt.verify(token, Secret, (err, decoded) => {
      if (err) {
        return res.status(403).json({
          message: "Forbidden: Failed to authenticate token.",
        });
      }

      // Lưu thông tin người dùng vào req.user
      req.user = decoded; // Giả sử decoded chứa thông tin người dùng

      // Gọi next() để tiếp tục xử lý
      next();
    });
  };
};

export default roleMiddleware;
