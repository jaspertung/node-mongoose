//define mongoose schema and model for all documents in campsite collection

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//add subdocument
const commentSchema = new Schema({
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const campsiteSchema = new Schema({ //instantiates new object named campsiteSchema
    name: { //1st arg (required): object defining properties
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    comments: [commentSchema] //add schema as subdocument inside campsiteSchema
}, { //2nd arg (optional): configs (ex. timestamps- createdat & updatedat)
    timestamps: true
});

//const Campsite = mongoose.model('Campsite', campsiteSchema) //create model named campsites (1st arg: Campsite, 2nd arg: schema used for collection)
module.exports = Campsite;