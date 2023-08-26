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
}

// if any errors arise while connecting then catch them 
main().catch((err) => {
    console.log("Not connected main...");
    console.log(err)
});