const express = require("express");
const cors = require("cors");
const connectToDatabase = require("./utils/connectDb");
const bikeRoutes = require("./routes/bikeRoutes");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRouter");
const app = express();

// Enable CORS for all routes
const corsOptions = {
  origin: "*",
};
app.use(cors({ origin: "*" }));
connectToDatabase();

app.use(express.json());

// Auth routes
app.use("/api/auth", authRoutes);

// User routes
app.use("/api/users", userRoutes);
// Bike routes
app.use("/api/bikes", bikeRoutes);

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

const port = 3000; // choose any port number you like
app.listen(port, () => {
  console.log(`Server listening on port ${port}.`);
});
