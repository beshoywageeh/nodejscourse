const express = require("express");
const router = express.Router();
const moment = require("moment");
const money_treas = require("../models/money_treasSchema");
router.get("/", (req, res) => {
  money_treas
    .find()
    .then((result) => {
      res.render("home", { title: "Home", data: result, moment: moment });
    })
    .catch((err) => {
      console.log(err);
    });
});
router.get("/add", (req, res) => {
  res.render("user/add", { title: "Add Record" });
});
router.get("/view/:id", (req, res) => {
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
router.get("/edit/:id", (req, res) => {
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
router.put("/update/:id", (req, res) => {
  money_treas
    .findByIdAndUpdate({ _id: req.params.id }, req.body)
    .then((result) => {
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
});
router.delete("/delete/:id", (req, res) => {
  money_treas
    .deleteOne({ _id: req.params.id })
    .then((result) => {
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
});
router.post("/search", (req, res) => {
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
router.post("/add_record", (req, res) => {
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
module.exports = router;