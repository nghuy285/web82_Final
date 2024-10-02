import UserModel from "../models/user.js";
const UserController = {
  getUser: async (req, res) => {
    const { id } = req.params;
    const user = await UserModel.findById(id);
    res.send(user);
  },
  getAllUser: async (req, res) => {
    try {
      const users = await UserModel.find();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: "Error fetching users", error });
    }
  },
  updateUser: async (req, res) => {
    const { id } = req.params;
    const { userName, email, role } = req.body;
    try {
      const user = await UserModel.findById(id);
      if (!user) return res.status(404).json({ message: "User not found" });

      user.userName = userName || user.userName;
      user.email = email || user.email;
      user.role = role || user.role;
      const updatedUser = await user.save();
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json({ message: "Error updating user", error });
    }
  },
  addFav: async (req, res) => {
    try {
      const user = await UserModel.findById(req.user._id);
      if (!user) return res.status(404).json({ message: "User not found" });

      const movieId = req.params.movieId;

      user.favorites.push(movieId);
      await user.save();

      res.status(200).json({ message: "Movie added to favorites" });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  },
  delFav: async (req, res) => {
    try {
      const { movieId } = req.params;
      const userId = req.user._id;

      const user = await UserModel.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      if (!user.favorites.includes(movieId)) {
        return res
          .status(404)
          .json({ message: "Movie not found in favorites" });
      }

      user.favorites = user.favorites.filter(
        (fav) => fav.toString() !== movieId
      );
      await user.save();

      res.status(200).json({
        message: "Movie removed from favorites",
        favorites: user.favorites,
      });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Failed to remove movie from favorites" });
    }
  },
  listFav: async (req, res) => {
    try {
      const userId = req.user._id;
      const user = await UserModel.findById(userId).populate("favorites");
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json({ favorites: user.favorites });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch favorites" });
    }
  },
};

export { UserController };
