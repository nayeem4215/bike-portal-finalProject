const mongoose = require("mongoose");

const bikeSchema = new mongoose.Schema({
  //   creator: {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "User",
  //     required: true,
  //   },
  name: {
    type: String,
    required: true,
  },
  // },
  // img: {
  //   type: String,
  //   required: true,
  // },
  type: {
    type: String,
    required: true,
  },
  madeIn: {
    type: String,
    default: "unknown",
  },
  distributor: {
    type: String,
    default: "unknown",
  },
  modelYear: {
    type: Number,
    default: 2000,
  },
  assembleIn: {
    type: String,
    default: "unknown",
  },
  brand: { type: String, default: "unknown" },
  price: {
    type: Number,
    required: true,
  },
  engine: {
    type: String,
    required: true,
  },
  engineType: {
    type: String,
    required: true,
  },
  power: {
    type: Number,
    required: true,
  },
  displacement: {
    type: Number,
    default: 0,
  },
  stroke: {
    type: Number,
    default: 0,
  },
  compressionRatio: {
    type: String,
    default: "unknown",
  },
  fuelSupply: {
    type: String,
    default: "unknown",
  },
  engineCooling: {
    type: String,
    default: "unknown",
  },
  transmissionType: {
    type: String,
    default: "unknown",
  },
  clutchType: {
    type: String,
    default: "unknown",
  },
  torque: {
    type: Number,
    default: 0,
  },
  mileage: {
    type: Number,
    default: 0,
  },
  chassisType: {
    type: String,
    default: "unknown",
  },
  rearSuspension: {
    type: String,
    default: "unknown",
  },
  brakes: {
    type: String,
    default: "unknown",
  },
  frontBrakeType: {
    type: String,
    default: "unknown",
  },
  frontBrakeDiameter: {
    type: Number,
    default: 0,
  },
  antiLockBrackingSystem: {
    type: Boolean,
    default: false,
  },
  rearBrakeType: {
    type: String,
    default: "unknown",
  },
  rearBrakeDiameter: {
    type: Number,
    default: 0,
  },
  brakingSystem: {
    type: String,
    default: "unknown",
  },
  frontTireSize: {
    type: String,
    default: "unknown",
  },
  rearTireSize: {
    type: String,
    default: "unknown",
  },
  tireType: {
    type: String,
    default: "unknown",
  },
  wheelType: {
    type: String,
    default: "unknown",
  },
  overallLength: {
    type: Number,
    default: 0,
  },
  overallWidth: {
    type: Number,
    default: 0,
  },
  height: {
    type: Number,
    default: 0,
  },
  weight: {
    type: Number,
    default: 0,
  },
  wheelbase: {
    type: Number,
    default: 0,
  },
  fuelTankCapacity: {
    type: Number,
    default: 0,
  },
  seatheight: {
    type: Number,
    default: 0,
  },
  batteryType: {
    type: String,
    default: "unknown",
  },
  headLight: {
    type: String,
    default: "unknown",
  },
  indicators: {
    type: String,
    default: "unknown",
  },
  batteryVoltage: {
    type: Number,
    default: 0,
  },
  tailLight: {
    type: String,
    default: "unknown",
  },
  speedoMeter: {
    type: String,
    default: "unknown",
  },
  additionalFeatures: {
    type: String,
    default: "Unknown",
  },
});

module.exports = new mongoose.model("Bike", bikeSchema);
