import User from "../models/User.js";

export const genderAndBirthdate = async (req, res, next) => {

   console.log(req.params);
    console.log(req.body);
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

