const mongoose = require('mongoose');

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/FruitsDB")
    .then((result) => {
        console.log("Connected to Database");
    }).catch((err) => {
        console.log("Error: "+err);
    });

    const fruitSchema = new mongoose.Schema({
        name: {
            type: String,
            required: [true, "No Name Entered"]
        },

        rating: {
            type: Number,
            min: 1,
            max: 10
        },

        review: String
    });

    const FruitModel = mongoose.model("Fruit", fruitSchema);

    const pear = new FruitModel({
        name: "Pear",
        score: 9,
        review: "Sweet!"
    })
    
    await pear.save() .then(()=>{console.log("Entry Inserted");}) .catch((err)=>{ console.log(err);});
    
    const personSchema = new mongoose.Schema({
        name: String,
        age: Number,
        favouriteFruit: fruitSchema
    });

    const personModel = mongoose.model("People", personSchema)

    await personModel.updateOne({_id: "64ef30b0ef01b0124f9eb9c2"}, {favouriteFruit: pear}) .then(()=>{console.log("Entry Updated");}) .catch((err)=>{console.log(err);})
}

main().then(()=>{
    console.log("Exiting...");
    mongoose.connection.close();
})
.catch((err)=>{
    console.log("Error in main...");
    console.log(err);
});