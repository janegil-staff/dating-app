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

export const deleteImage = async (req, res, next) => {
  const { publicId } = req.body;
  const { userId } = req.params;

  if (!publicId || !userId) {
    return res.status(400).json({ error: "Missing publicId or userId" });
  }

  try {
    // 1. Delete from Cloudinary
    await cloudinary.uploader.destroy(publicId);

    // 2. Remove image URL from user's profileImages
    const imageUrl = `https://res.cloudinary.com/${
      cloudinary.config().cloud_name
    }/image/upload/v*/${publicId.replace("dating-app/", "")}`;
    await User.findByIdAndUpdate(userId, {
      $pull: { profileImages: { $regex: publicId.split("/")[1] } },
    });

    res.json({ success: true });
  } catch (err) {
    console.error("Error deleting image:", err);
    res.status(500).json({ error: "Failed to delete image" });
  }
};

export const updateDescription = async (req, res, next) => {
  console.log(req.body);
  try {
    const { userId } = req.params;
    const { description } = req.body;

    const user = await User.findByIdAndUpdate(
      userId,
      {
        description: description,
      },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res
      .status(200)
      .json({ message: "User description updated succesfully" });
  } catch (error) {
    res.status(500).json({ message: "Error updating user description" });
  }
};


export const usersByGender = async (req, res, next) => {
  try {
    const { gender } = req.query;
    const users = await User.find({ gender });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const addTurnOns = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { turnOn } = req.body;

    const user = await User.findByIdAndUpdate(
      userId,
      { $addToSet: { turnOns: turnOn } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res
      .status(200)
      .json({ message: "Turn on updated succesfully", user });
  } catch (error) {
    res.status(500).json({ message: "Error adding the turn on" });
  }
};

export const removeTurnOns = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const { turnOn } = req.body;

    const user = await User.findByIdAndUpdate(
      userId,
      { $pull: { turnOns: turnOn } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res
      .status(200)
      .json({ message: "Turn on removed succesfully", user });
  } catch (error) {
    return res.status(500).json({ message: "Error removing turn on" });
  }
};

export const lookingFor = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { lookingFor } = req.body;

    const user = await User.findByIdAndUpdate(
      userId,
      {
        $addToSet: { lookingFor: lookingFor },
      },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "No user" });
    }

    return res
      .status(200)
      .json({ message: "Looking for updated succesfully".user });
  } catch (error) {
    res.status(500).json({ message: "Error updating looking for", error });
  }
};

export const lookingForRemove = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { lookingFor } = req.body;

    const user = await User.findByIdAndUpdate(
      userId,
      {
        $pull: { lookingFor: lookingFor },
      },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "No user" });
    }

    return res
      .status(200)
      .json({ message: "Looking for updated succesfully".user });
  } catch (error) {
    res.status(500).json({ message: "Error removing looking for", error });
  }
};
