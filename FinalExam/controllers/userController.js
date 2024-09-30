import UserModel from "../models/user.js";
const UserController = {
  getUser: async (req, res) => {
    const { id } = req.params;
    const user = await UserModel.findById(id);
    res.send(user);
  },
};
export { UserController };
