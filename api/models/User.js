import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    enum: ["male", "female", "other"],
  },
  birthdate: {
    type: Date,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  verificationToken: String,
  crushes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  recievedLikes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  matches: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  profileImages: {
    type: [String],
    validate: {
      validator: function (val) {
        return val.length <= 6;
      },
      message: "You can only upload up to 6 images.",
    },
  },
  description: {
    type: String,
  },
  turnOns: [
    {
      type: String, //Array of string for turn ons
    },
  ],
  lookingFor: [
    {
      type: String, // Array of strings for what they are looking for
    },
  ],
});

userSchema.pre("save", async function (next) {
  try {
    if (this.isNew) {
      const salt = await bcrypt.genSalt(12);
      const hashedPassword = await bcrypt.hash(this.password, salt);
      this.password = hashedPassword;
    }
    next();
  } catch (error) {
    next(error);
  }
});

const User = mongoose.model("User", userSchema);

export default User;
