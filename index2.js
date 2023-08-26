const mongoose = require('mongoose');

async function main(){
    // Connection
    await mongoose.connect("mongodb://127.0.0.1:27017/peopleDB")
        .then((result) => {
            console.log("Connected to database...");
        }).catch((err) => {
            console.log("Unable to connect: " + err);
        });
    
    // Schema
    const peopleSchema = new mongoose.Schema({
        name: String,
        age: Number
    });

    // Model
    const People = mongoose.model("People", peopleSchema);

    // Insert Documents
    const person1 = new People({
        name: "John",
        age: 37
    });

    await person1.save();
}

main().catch((err)=>{
    console.log(err);
})