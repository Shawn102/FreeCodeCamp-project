const router = require("express").Router();
let User = require("../models/user.model");

router.route("/").get((req, res) => {
  User.find({}, (err, foundUsers) => {
    if (err) {
      res.status(400).json("Error" + err);
    } else {
      if (foundUsers) {
        res.json(foundUsers);
      }
    }
  });
});

router.route("/add").post((req, res) => {
  const newUser = new User({ username: req.body.username });
  newUser
    .save()
    .then(() => res.json("User added!"))
    .catch((err) => res.status(400).json("Error" + err));
});

module.exports = router;
