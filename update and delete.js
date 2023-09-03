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
        name: {
            type: String,
            required: [true, "Please enter the name"]
        },
        rating: {
            type: Number,
            min: 1,
            max: 10
        },
        review: String
    });


    const Fruit = mongoose.model("Fruit", ourSchema);

    // UPDATE
    await Fruit.updateOne({_id: "64ef2728fab8347438d33a1c"}, {name: "NEW Peach"})
    .then((result) => {
        console.log("Updated");
    }).catch((err) => {
        console.log(err);
    });


    // DELETE   
    await Fruit.deleteOne({_id: "64ea2322cd4f09e3d66f1ece"})
    .then((result) => {
        console.log("Deleted the entry");
    }).catch((err) => {
        console.log(err);
    });
}

// close the connection after everything is done
main().then(()=>{
    mongoose.connection.close();
})
// if any errors arise while connecting then catch them 
.catch((err) => {
    console.log("Error in main...");
    console.log(err)
});