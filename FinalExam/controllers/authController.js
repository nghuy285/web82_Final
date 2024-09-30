import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserModel from "../models/user.js";
const SecretKey = "Secret";
const auth = {
  login: async (req, res) => {
    try {
      const { email, password, role } = req.body;
      if (!email || !password) throw new Error("Email or password is missing!");
      const currentUser = await UserModel.findOne({
        email,
      });
      if (!currentUser) throw new Error("Email or password is invalid!");
      const comparedPassword = bcrypt.compareSync(
        password,
        currentUser.password
      );
      if (!comparedPassword) throw new Error("Email or password is invalid!");
      const user = {
        _id: currentUser._id,
        email: currentUser.email,
      };

      const accessToken = jwt.sign(user, SecretKey, {
        expiresIn: 60 * 5,
      });

      res.status(200).send({
        message: "Login successful!",
        token: accessToken,
        id: user._id,
        role: role,
      });
    } catch (err) {
      res.status(400).send({
        message: "login fail",
        data: null,
      });
    }
  },
  register: async (req, res) => {
    try {
      const { userName, email, password } = req.body;
      if (!email || !password) throw Error("Email or password is missing");
      const hashedpwd = bcrypt.hashSync(password, 10);
      const createUser = await UserModel.create({
        userName,
        email,
        password: hashedpwd,
      });
      res.status(201).json({ message: "User registered successfully" });
    } catch (err) {
      res.status(400).send({
        message: err.message,
        data: null,
      });
    }
  },
};
export { auth };
