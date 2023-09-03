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

    const pinapple = new FruitModel({
        name: "Pineapple",
        score: 9,
        review: "Great!"
    })
    
    await pinapple.save() .then(()=>{"Entry Inserted"}) .catch((err)=>{ console.log(err);});
    
    const personSchema = new mongoose.Schema({
        name: String,
        age: Number,
        favouriteFruit: fruitSchema
    });

    const personModel = mongoose.model("People", personSchema)
    
    const person1 = new personModel({
        name: "Amy",
        age: 20,
        favouriteFruit: pinapple
    });

    await person1.save() .then(()=>{"Entry Inserted"}) .catch((err)=>{ console.log(err);});
}

main().then(()=>{
    console.log("Exiting...");
    mongoose.connection.close();
})
.catch((err)=>{
    console.log("Error in main...");
    console.log(err);
});