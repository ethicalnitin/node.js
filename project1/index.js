const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = 8000;

// Database Connection
mongoose
  .connect("mongodb://127.0.0.1:27017/youtube-app-1")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Mongo Error", err));

// Define User Schema
const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  gender: { type: String, required: true },
  jobTitle: { type: String, required: true },
});

// Create User Model
const User = mongoose.model("User", userSchema);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  console.log("Hello from middleware 1");
  req.myUsername = "nitin.dev";
  next();
});

app.use((req, res, next) => {
  console.log("Hello from middleware 2", req.myUsername);
  next();
});

// Routes

// Get all users (render as HTML)
app.get("/users", async (req, res) => {
  const allDbUsers = await User.find({});
  const html = `
    <ul>
      ${allDbUsers.map((user) => `<li>${user.firstName}</li>`).join("")}
    </ul>`;
  res.send(html);
});

// Get all users (JSON response)
app.get("/api/users", async (req, res) => {
  const allDbUsers = await User.find({});
  res.setHeader("myname", "Nitin");
  return res.json(allDbUsers);
});

// Routes with Dynamic Path Parameters
app
  .route("/api/users/:id")
  .get(async (req, res) => {
    const id = req.params.id;

    try {
      const user = await User.findById(id);
      if (!user) return res.status(404).json({ error: "User not found" });
      return res.json(user);
    } catch (error) {
      return res.status(400).json({ error: "Invalid user ID" });
    }
  })
  .patch(async (req, res) => {
    const id = req.params.id;
    const updates = req.body;

    try {
      const updatedUser = await User.findByIdAndUpdate(id, updates, {
        new: true,
        runValidators: true, 
      });

      if (!updatedUser) return res.status(404).json({ error: "User not found" });
      return res.json({ msg: "User updated successfully", user: updatedUser });
    } catch (error) {
      return res.status(400).json({ error: "Invalid request" });
    }
  })
  .delete(async (req, res) => {
    const id = req.params.id;

    try {
      const deletedUser = await User.findByIdAndDelete(id);
      if (!deletedUser) return res.status(404).json({ error: "User not found" });
      return res.json({ msg: "User deleted successfully" });
    } catch (error) {
      return res.status(400).json({ error: "Invalid user ID" });
    }
  });

// Add a new user
app.post("/api/users", async (req, res) => {
  const body = req.body;

  if (
    !body ||
    !body.firstName ||
    !body.lastName ||
    !body.email ||
    !body.gender ||
    !body.jobTitle
  ) {
    return res.status(400).json({ msg: "All fields are required" });
  }

  try {
    const newUser = await User.create({
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      gender: body.gender,
      jobTitle: body.jobTitle,
    });

    return res.status(201).json({ msg: "User created successfully", user: newUser });
  } catch (error) {
    return res.status(400).json({ error: "Error creating user", details: error.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
