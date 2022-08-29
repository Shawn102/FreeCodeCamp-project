const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const exercisesRouter = require("./routes/exercises");
const usersRouter = require("./routes/users");

const app = express();

mongoose.connect("mongodb://localhost:27017/reactExpressDB", (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Mongodb connected to your app!");
  }
});

app.use(cors());
app.use(express.json());

app.use("/exercises", exercisesRouter);
app.use("/users", usersRouter);



const port = process.env.PORT || 3400;
app.listen(port, () => {
  console.log(`Your app started on port ${port}`);
});

