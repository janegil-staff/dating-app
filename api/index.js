import mongoose from "mongoose";
import app from "./app.js";

const { DATABASE_URL } = process.env;
const PORT = process.env.PORT || 8001;

mongoose.connection.on("error", (err) => {
  logger.error(`Mongodb connection error : ${err}`);
  process.exit(1);
});

mongoose
  .connect(DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to mongodb");
  });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
