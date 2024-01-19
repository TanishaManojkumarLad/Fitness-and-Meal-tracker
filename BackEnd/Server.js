const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const session = require("express-session");
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const User = require("./UserSchema");
let userToken;
const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

mongoose
  .connect("mongodb://127.0.0.1:27017/HealthTracker_db", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Mongodb connected"))
  .catch((err) => console.log(err));

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await User.findOne({ username: username });
      if (!user) {
        console.log("User not found while trying to log in");
        return done(null, false);
      }

      if (await bcrypt.compare(password, user.password)) {
        const token = jwt.sign({ userId: user._id }, "yourJWTSecret", {
          expiresIn: "1h",
        });
        userToken = token;
        return done(null, user);
      } else {
        return done(null, user);
      }
    } catch (err) {
      done(err);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

app.post("/register", async (req, res) => {
  try {
    const { username, password, email, age, gender, goal } = req.body;
    const existinguser = await User.findOne({ username });
    if (existinguser) {
      return res.status(400).send({ error: "Username already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      username: username,
      password: hashedPassword,
      email: email,
      age: age,
      gender: gender,
      goal: goal,
    });
    const token = jwt.sign({ userId: user._id }, "yourJWTSecret", {
      expiresIn: "1h",
    });
    userToken = token;
    await user.save();
    res.status(201).send(token);
  } catch (error) {
    console.log("User not register", error);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

app.post("/login", passport.authenticate("local"), (req, res) => {
  console.log("Login Successful!");
  res.send(userToken);
});

app.get("/createPlan/:username/:title/:plan", async (req, res) => {
  const { username, title, plan } = req.params;
  try {
    const response = await User.updateOne(
      { username: username },
      { $push: { plan: { title: title, plan: plan, isCompleted: false } } }
    );

    if (response.nModified === 1) {
      res.status(200).json({ message: "Create successful" });
    } else {
      res
        .status(404)
        .json({ message: "Document not found or no create performed" });
    }
  } catch (error) {
    console.error("Error creating document:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/createMealPlan/:username/:title/:plan", async (req, res) => {
  const { username, title, plan } = req.params;
  try {
    const response = await User.updateOne(
      { username: username },
      { $push: { mealplan: { title: title, plan: plan } } }
    );

    if (response.nModified === 1) {
      res.status(200).json({ message: "Create successful" });
    } else {
      res
        .status(404)
        .json({ message: "Document not found or no create performed" });
    }
  } catch (error) {
    console.error("Error creating document:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/home/:username", async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username: username });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get(
  "/updatePlan/:username/:title/:value/:iscompleted",
  async (req, res) => {
    const { username, title, value, iscompleted } = req.params;
    try {
      const response = await User.updateOne(
        { username: username, "plan.title": title },
        { $set: { "plan.$.plan": value, "plan.$.isCompleted": iscompleted } }
      );
      if (response.nModified === 1) {
        res.status(200).json({ message: "Update successful" });
      } else {
        res
          .status(404)
          .json({ message: "Document not found or no update performed" });
      }
    } catch (error) {
      console.error("Error updating document:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

app.get("/updateMeal/:username/:title/:value", async (req, res) => {
  const { username, title, value } = req.params;

  try {
    const response = await User.updateOne(
      { username: username, "mealplan.title": title },
      { $set: { "mealplan.$.plan": value } }
    );
    if (response.nModified === 1) {
      res.status(200).json({ message: "Update successful" });
    } else {
      res
        .status(404)
        .json({ message: "Document not found or no update performed" });
    }
  } catch (error) {
    console.error("Error updating document:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/deletePlan/:username/:title", async (req, res) => {
  const { username, title } = req.params;
  try {
    const response = await User.updateOne(
      { username: username },
      { $pull: { plan: { title: title } } }
    );

    // Check the response and send a corresponding status
    if (response.nModified === 1) {
      res.status(200).json({ message: "Delete successful" });
    } else {
      res
        .status(404)
        .json({ message: "Document not found or no delete performed" });
    }
  } catch (error) {
    console.error("Error deleting document:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/deleteMealPlan/:username/:title", async (req, res) => {
  const { username, title } = req.params;
  try {
    const response = await User.updateOne(
      { username: username, },
      { $pull: { mealplan: { title: title } } }
    );

    // Check the response and send a corresponding status
    if (response.nModified === 1) {
      res.status(200).json({ message: "Delete successful" });
    } else {
      res
        .status(404)
        .json({ message: "Document not found or no delete performed" });
    }
  } catch (error) {
    console.error("Error deleting document:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/updateInfo", async (req, res) => {
  const { username, email, age, gender, goal } = req.body;
  try {
    const response = await User.updateOne(
      { username: username },
      {
        $set: {
          email: email,
          age: age,
          gender: gender,
          goal: goal,
        },
      }
    );
    if (response.nModified === 1) {
      res.status(200).json({ message: "Update successful" });
    } else {
      res
        .status(404)
        .json({ message: "Document not found or no update performed" });
    }
  } catch (error) {
    console.error("Error updating document:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/logout", (req, res) => {
  req.logout(function (err) {
    if (err) {
      console.error("Error during logout:", err);
      return res.status(500).send("Internal Server Error");
    }

    console.log("User logged out");
    res.send("Logged out");
  });
});

const PORT = 3001;

app.listen(PORT, () => console.log(`Server running on port -> ${PORT}`));
