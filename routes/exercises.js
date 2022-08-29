const router = require("express").Router();
let Exercise = require("../models/exercise.model");

router.route("/").get((req, res) => {
  Exercise.find({}, (err, foundExercise) => {
    if (err) {
      res.status(400).json("Error: " + err);
    } else {
      if (foundExercise) {
        res.json(foundExercise);
      }
    }
  });
});

router.route("/add").post((req, res) => {
  const Username = req.body.username;
  const Description = req.body.description;
  const Duration = Number(req.body.duration);
  const date = Date.parse(req.body.date);

  const newExercise = new Exercise({
    username: Username,
    description: Description,
    duration: Duration,
    date: date,
  });

  newExercise
    .save()
    .then(() => res.json("Exercise added!"))
    .catch((err) => res.status(400).json("Error:  " + err));
});
router
  .route("/:id")
  .get((req, res) => {
    Exercise.findById(req.params.id, (err, foundResult) => {
      if (!err) {
        if (foundResult) {
          res.json(foundResult);
        }
      } else {
        res.status(400).json("Error: " + err);
      }
    });
  })
  .delete((req, res) => {
    Exercise.findByIdAndDelete(req.params.id, (err) => {
      if (!err) {
        res.json("Exercise deleted!");
      } else {
        res.status(400).json("Error: " + err);
      }
    });
  });

router.route("/update/:id").post((req, res) => {
  Exercise.findById(req.params.id, (err, foundUser) => {
    if (err) {
      res.status(400).json("Error: " + err);
    } else {
      if (foundUser) {
        foundUser.username = req.body.username;
        foundUser.description = req.body.description;
        foundUser.duration = Number(req.body.duration);
        foundUser.date = Date.parse(req.body.date);

        foundUser
          .save()
          .then(() => res.json("Exercise updated!"))
          .catch((error) => res.status(400).json("Error: " + error));
      }
    }
  });
});

module.exports = router;
