const express = require("express");
const app = express();
const mongoose = require("mongoose");

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

const personRoutes = require("./routers/personRoutes");

app.use("/person", personRoutes);

app.get("/", (req, res) => {
  res.json({ message: "OI express" });
});

mongoose
  .connect(
    "mongodb+srv://roott:*********@cluster0.6gjhmux.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(8081, () => {
      console.log("servidor and db on...");
    });
  })
  .catch((err) => console.log(err));
