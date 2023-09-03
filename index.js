// import mongoose
const mongoose = require('mongoose');

async function main() {

    // 1. CONNECT OUR PROGRAM TO MONGODB
    // pass the url of our mongod :-  localhost:port/DBname
    await mongoose.connect('mongodb://127.0.0.1:27017/FruitsDB')
                    .then((result) => {
                        console.log("We are connected broooo");
                    })
                    .catch((err) => {
                        console.log("Not connected broooo...");
                        console.log(err);
                    });
    // use await mongoose.connect('mongodb://user:password@127.0.0.1:27017test'); if your database has authentication enabled


    // 2. CONSTRUCT A SCHEMA OBJECT
    const ourSchema = new mongoose.Schema({
        name: String,
        rating: Number,
        review: String
    });


    // 3. CREATE A MODEL i.e a table or blueprint for the documents (like a class)
    const Fruit = mongoose.model("Fruit", ourSchema);


    // 4. CREATE A DOCUMENT OBJECT TO INSERT
    // A document is an instace of a model (like an object)
    const fruit1 = new Fruit({
        name: "Apple",
        rating: 7,
        review: "Pretty solid as a fruit."
    });


    // 5. INSERT THE DOCUMENT INTO MONGODB
    // await fruit1.save();

    // **CHALLENGE**

    // Inserting in the same database FruitsDB
    // Schema
    const peopleSchema = new mongoose.Schema({
        name: String,
        age: Number
    });

    // Model or table
    const People = mongoose.model("People", peopleSchema);

    // Insert Documents
    const person1 = new People({
        name: "John",
        age: 37
    });

    await person1.save();

    // INSERTION IN BULK
    const kiwi = new Fruit({
        name: "Kiwi",
        score: 9,
        review: "Mostly great sometimes sour."
    });
    const orange = new Fruit({
        name: "Orange",
        score: 4,
        review: "Too sour for me."
    });
    const banana = new Fruit({
        name: "Banana",
        score: 10,
        review: "My favourite fruit!!"
    });

    // SAVE IN BULK
    // await Fruit.insertMany([kiwi, orange, banana])
    // .then((result) => {
    //     console.log("Successfully saved all the fruits to FruitsDB");
    // }).catch((err) => {
    //     console.log(err);
    // });
    //insertMany() no longer takes a callback function
    
    // READING FROM THE DATABASE
    await Fruit.find({}) //returns a promise with result as the result of .find()
    .then((result) => {
        result.forEach(fruit => {
            console.log(fruit.name);
        });
    }).catch((err) => {
        console.log(err);
    });
    //find() no longer takes a callback
}

// if any errors arise while connecting then catch them 
main().then(()=>{
    mongoose.connection.close();
})
.catch((err) => {
    console.log("Error in main...");
    console.log(err)
});