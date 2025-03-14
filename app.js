const express = require("express");
const app = express();
const port = 3000;
const mongoose = require("mongoose");
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));
const path = require("path");
const livereload = require("livereload");
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, "public"));

const connectLivereload = require("connect-livereload");
app.use(connectLivereload());

liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});
const data = require("./models/dataSchema");
app.get("/", (req, res) => {
  res.render("home");
});
app.get("/add", (req, res) => {
  res.render("user/add");
});
app.get("/view", (req, res) => {
  res.render("user/view");
});
app.get("/edit", (req, res) => {
  res.render("user/edit");
});
app.get("/delete", (req, res) => {
  res.render("user/delete");
});
app.get("/search", (req, res) => {
  res.render("user/search");
});
mongoose
  .connect(
    "mongodb://admin:admin@localhost:27017/mongo_express?authSource=admin"
  )
  .then(() => {
    app.listen(port, () => {
      console.log(`http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
