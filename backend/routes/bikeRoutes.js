const express = require("express");
const router = express.Router();
const bikeController = require("../controllers/bikeController");

// Get all bikes
router.get("/", bikeController.getBikes);

// Create a new bike
router.post("/", bikeController.createBike);
// New arrival bikes
router.get("/new-arrival", bikeController.newArrival);

// Popular bikes
router.get("/popular", bikeController.popular);

// Get a single bike
router.get("/:id", bikeController.getBike);

// Update a bike
router.put("/:id", bikeController.updateBike);

// Delete a bike
router.delete("/:id", bikeController.deleteBike);

// Recommendation based on a bike
router.get(
  "/recommendation/:id",
  bikeController.getRecommendedBikesBasedOnABike
);

module.exports = router;
