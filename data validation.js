// import mongoose
const mongoose = require('mongoose');

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/FruitsDB')
    .then((result) => {
        console.log("We are connected broooo");
    })
    .catch((err) => {
        console.log("Not connected broooo...");
        console.log(err);
    });

    
    const ourSchema = new mongoose.Schema({
        // change the attributes from single key value pairs to OBJECTS which have type (data type), then other validators
        name: {
            type: String,
            required: [true, "Please enter the name"]
            // makes this field required
        },
        rating: {
            type: Number,
            min: 1,
            max: 10
            //so any rating outside of 1 to 10 is NOT VALID
        },
        review: String
    });


    const Fruit = mongoose.model("Fruit", ourSchema);

    const fruit1 = new Fruit({
        name: "Peach",
        rating: 10,
        review: "Peaches Yum Yum"
    });

    await fruit1.save();
    console.log("inserted");

}

// if any errors arise while connecting then catch them 
main().then(()=>{
    mongoose.connection.close();
})
.catch((err) => {
    console.log("Error in main...");
    console.log(err)
});