const { default: mongoose } = require("mongoose");
const Bike = require("../models/bikeModel");

// Get all bikes
exports.getBikes = async (req, res) => {
  try {
    // Build the filter object based on the query parameters
    const filter = {};
    // Filter bikes based on brand
    if (req.query.brand) {
      let brand = req.query.brand[0].toUpperCase();
      brand = brand + req.query.brand.slice(1);
      filter.brand = brand;
    }
    console.log(filter);
    const bikes = await Bike.find(filter);
    res.json(bikes);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

// Create a new bike
exports.createBike = async (req, res) => {
  // const {
  //   userName,
  //   type,
  //   model,
  //   price,
  //   engine,
  //   engineType,
  //   power,
  //   displacement,
  //   stroke,
  //   compressionRatio,
  //   fuelSupply,
  //   engineCooling,
  //   transmissionType,
  //   clutchType,
  //   torque,
  //   mileage,
  //   chassisType,
  //   rearSuspension,
  //   brakes,
  //   frontBrakeType,
  //   frontBrakeDiameter,
  //   antiLockBrackingSystem,
  //   rearBrakeType,
  //   rearBrakeDiameter,
  //   brakingSystem,
  //   frontTireSize,
  //   rearTireSize,
  //   tireType,
  //   wheelType,
  //   overallLength,
  //   overallWidth,
  //   height,
  //   weight,
  //   wheelbase,
  //   fuelTankCapacity,
  //   seatHeight,
  //   batteryType,
  //   headLight,
  //   indicators,
  //   batteryVoltage,
  //   tailLight,
  //   speedoMeter,
  //   rpmMeter,
  //   seatType,
  //   engineKillSwitch,
  //   odoMeter,
  //   handleType,
  //   passengerGrabRail,
  //   additionalFeatures,
  // } = req.body;

  /*
  {
      userName,
      type,
      model,
      price,
      engine,
      engineType,
      power,
      displacement,
      stroke,
      compressionRatio,
      fuelSupply,
      engineCooling,
      transmissionType,
      clutchType,
      torque,
      mileage,
      chassisType,
      rearSuspension,
      brakes,
      frontBrakeType,
      frontBrakeDiameter,
      antiLockBrackingSystem,
      rearBrakeType,
      rearBrakeDiameter,
      brakingSystem,
      frontTireSize,
      rearTireSize,
      tireType,
      wheelType,
      overallLength,
      overallWidth,
      height,
      weight,
      wheelbase,
      fuelTankCapacity,
      seatHeight,
      batteryType,
      headLight,
      indicators,
      batteryVoltage,
      tailLight,
      speedoMeter,
      rpmMeter,
      seatType,
      engineKillSwitch,
      odoMeter,
      handleType,
      passengerGrabRail,
      additionalFeatures,
    }
    */

  try {
    console.log(req.body);
    const newBike = new Bike(req.body);

    const savedBike = await newBike.save();
    res.json(savedBike);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

// Get a single bike
exports.getBike = async (req, res) => {
  try {
    const bike = await Bike.findById(req.params.id);
    if (!bike) {
      return res.status(404).json({ msg: "Bike not found" });
    }
    res.json(bike);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

// Update a

// Update a bike
exports.updateBike = async (req, res) => {
  try {
    const bike = await Bike.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!bike) {
      return res.status(404).json({ msg: "Bike not found" });
    }
    res.json(bike);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

// Delete a bike
exports.deleteBike = async (req, res) => {
  try {
    const bike = await Bike.findByIdAndDelete(req.params.id);
    if (!bike) {
      return res.status(404).json({ msg: "Bike not found" });
    }
    res.json({ msg: "Bike deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

async function getSameBrandedBikes(brand, id) {
  try {
    const sameBrandedBikes = await Bike.aggregate([
      { $match: { brand, _id: { $ne: new mongoose.Types.ObjectId(id) } } }, // Filter bikes that are recommended
      { $sample: { size: 4 } }, // Randomly select 5 bikes from the recommended bikes
      {
        $project: {
          // Select only the fields that you want to return to the client
          _id: 1,
          name: 1,
          brand: 1,
          distributor: 1,
          modelYear: 1,
          price: 1,
          img: 1,
        },
      },
    ]);

    return sameBrandedBikes;
  } catch (err) {
    console.log(err);
    return [];
  }
}
async function getClosePriceRangedBikes(price, id) {
  try {
    const recommendedBikes = await Bike.aggregate([
      {
        $match: {
          _id: { $ne: new mongoose.Types.ObjectId(id) },
          price: { $gt: price - 5000, $lt: price + 5000 },
        },
      }, // Filter bikes that are recommended and have a price that is within $1000 of the user's price
      { $sample: { size: 4 } }, // Randomly select 5 bikes from the recommended bikes
      {
        $project: {
          // Select only the fields that you want to return to the client
          _id: 1,
          name: 1,
          brand: 1,
          distributor: 1,
          modelYear: 1,
          price: 1,
          img: 1,
        },
      },
    ]);
    return recommendedBikes;
  } catch (err) {
    console.log(err);
    return [];
  }
}
// Recommed bike
exports.getRecommendedBikesBasedOnABike = async (req, res, next) => {
  try {
    const { id } = req.params;
    const bike = await Bike.findById(id);
    let sameBrandedBikes = [];
    let closedPriced = [];
    if (bike) {
      sameBrandedBikes = await getSameBrandedBikes(bike.brand, id);
      closedPriced = await getClosePriceRangedBikes(bike.price, id);
    }
    res.json({
      sameBrandedBikes,
      closePricedBikes: closedPriced,
    });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ msg: "Server Error - failed to get recommendated bikes" });
  }
};

exports.newArrival = async (req, res) => {
  try {
    const newBikes = await Bike.aggregate([
      {
        $sort: {
          modelYear: -1,
        },
      },
      {
        $limit: 4,
      },
    ]);

    res.json(newBikes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.popular = async (req, res) => {
  try {
    const newBikes = await Bike.find().limit(4);
    res.json(newBikes);
  } catch {
    res.status(500).json({ message: err.message });
  }
};
