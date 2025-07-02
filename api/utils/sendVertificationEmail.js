import nodemailer from "nodemailer";

export const sendVerificationEmail = async (email, verificationToken) => {
  const transpoter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "janstovr@gmail.com",
      pass: "lqxy gipk vdzw riws",
    },
  });

  const mailOptions = {
    from: "matchmake.com",
    to: email,
    subject: "Email verification",
    text: `Please click on the following link to verify your email : http://localhost:8001/api/auth/verify/${verificationToken}`,
  };

  //send the mail
  try {
    await transpoter.sendMail(mailOptions);
  } catch (error) {
    console.log(error);
    console.log("Error sending the verification email");
  }
};