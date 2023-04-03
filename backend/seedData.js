const mongoose = require("mongoose");
const fs = require("fs");
const Bike = require("./models/bikeModel"); // assuming you have a bikes model defined

async function seedDatabase() {
  try {
    // read in the local JSON data and parse it into an array of objects
    const rawData = fs.readFileSync("./data/bikeData.json");

    const bikes = JSON.parse(rawData);

    //open a connection to your MongoDB database using Mongoose
    await mongoose.connect("mongodb://127.0.0.1:27017/bikeportal", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // // loop through the array of objects and create a new document in your MongoDB database for each object
    for (const bike of bikes) {
      const newbikes = new Bike(bike);

      await newbikes.save(); // save the new document to the database
      console.log(`Saved bike: ${bike.name}`);
    }

    // // close the Mongoose connection once all documents have been inserted
    await mongoose.connection.close();
    console.log("Database seeding complete!");
  } catch (err) {
    console.error(err);
  }
}

async function deleteAllBikes(){
   try{
        //open a connection to your MongoDB database using Mongoose
        await mongoose.connect("mongodb://127.0.0.1:27017/bikeportal", {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });
    let res =  await Bike.deleteMany({})}
    catch(e){
      console.log(e)
    }
}

// deleteAllBikes()
seedDatabase();
