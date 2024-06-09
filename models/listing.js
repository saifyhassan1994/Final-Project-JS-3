
const mongoose = require("mongoose");
const Schema = mongoose.Schema;                
const ReviewSchema = require("./review.js");


const listingSchema = new Schema({
    title:{
        type:String,
        required: true,
    } ,
    description: String,
    

    
    image: {

      url: String,
      filename: String,

    },

    price: Number,
    location: String,
    country: String,
    reviewsAll: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review",                    // "Review" is collection of "reviewSchema"
        }
    ],
    ownerListing:{
        type: Schema.Types.ObjectId,
        ref: "User",                           // "User" is collection of "userSchema"
    },
    category: {
        type: String,
        enum: ['Trending', 'Rooms', 'Iconic Cities', 'Mountains', 'Castles', 'Amazing Pools'],
        
    },
    geometry: {   // this is geojson format to store coordinates
        type: {
          type: String,
          enum: ['Point'], // 'location.type' must be 'Point'
          required: true
        },
        coordinates: {
          type: [Number], // since we want to store the cooordinates of longitude and latitude which is two numbers thats why we will array to store two numbers.
          required: true,
        },
      }, 

});






listingSchema.post("findOneAndDelete", async (listingdata) => {
    if (listingdata) {
        await ReviewSchema.deleteMany({ _id: { $in: listingdata.reviewsAll}});  
    }
});



const Listingmodel = mongoose.model("Listing", listingSchema);     
module.exports = Listingmodel;                                      
                                                              