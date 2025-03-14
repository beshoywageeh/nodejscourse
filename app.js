const express = require("express");
const methodOverride = require("method-override");
const app = express();
const port = 3000;
const mongoose = require("mongoose");
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(methodOverride("_method"));
const path = require("path");
const moment = require("moment");
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
const money_treas = require("./models/money_treasSchema");
app.get("/", (req, res) => {
  money_treas
    .find()
    .then((result) => {
      res.render("home", { title: "Home", data: result, moment: moment });
    })
    .catch((err) => {
      console.log(err);
    });
});
app.get("/add", (req, res) => {
  res.render("user/add", { title: "Add Record" });
});
app.get("/view/:id", (req, res) => {
  money_treas
    .findById(req.params.id)
    .then((result) => {
      res.render("user/view", {
        data: result,
        title: "View Record",
        moment: moment,
      });
    })
    .catch((err) => {
      console.log(err);
    });
});
app.get("/edit/:id", (req, res) => {
  money_treas
    .findById(req.params.id)
    .then((result) => {
      res.render("user/edit", {
        data: result,
        title: "Edit Record",
        moment: moment,
      });
    })
    .catch((err) => {
      console.log(err);
    });
});
app.put("/update/:id", (req, res) => {
  money_treas
    .findByIdAndUpdate({ _id: req.params.id }, req.body)
    .then((result) => {
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
});
app.delete("/delete/:id", (req, res) => {
  money_treas
    .deleteOne({ _id: req.params.id })
    .then((result) => {
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
});
app.post("/search", (req, res) => {
  money_treas
    .find({
      $or: [
        { description: { $regex: req.body.search, $options: "i" } },
        { amount: Number(req.body.search) || 0 },
      ],
    })
    .then((result) => {
      console.log(result);
      res.render("user/search", {
        data: result,
        moment: moment,
        title: "Search",
      });
    })
    .catch((err) => console.log(err));
});
app.post("/add_record", (req, res) => {
  const { status, description, amount, date } = req.body;
  const addData = new money_treas({
    status: status,
    description: description,
    amount: amount,
    date: date,
  })
    .save()
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
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
