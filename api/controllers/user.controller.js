import cloudinary from "../configs/cloudinary.config.js";
import User from "../models/User.js";

export const getUser = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(500).json({ message: "User not found" });
    }

    return res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: "Error fetching the user details" });
  }
};

export const genderAndBirthdate = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { gender, year, month, day } = req.body;

    const date = new Date(year, month - 1, day);

    const user = await User.findByIdAndUpdate(
      userId,
      { gender: gender, birthdate: date },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ message: "User gender updated Succesfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error updating user gender", error });
  }
};

export const uploadImage = async (req, res, next) => {

  try {
    const { userId } = req.params;
    const { image } = req.body;

    console.log(userId);
    if (!image || !userId) {
      return res.status(400).json({ error: "Missing image or userId" });
    }

    const result = await cloudinary.uploader.upload(image, {
      folder: "dating-app",
    });

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    user.profileImages.push(result.secure_url);
    await user.save();

    res.json({ url: result.secure_url, message: "Image uploaded and saved" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Upload failed" });
  }
};
