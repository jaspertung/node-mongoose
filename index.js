const mongoose = require('mongoose');
const Campsite = require('./models/campsite');

const url = 'mongodb://localhost:27017/nucampsite';
const connect = mongoose.connect(url, { //wrapper around mongodb node driver's connect method but with added functionality through mongoose
    useCreateIndex: true, //deal with deprecation warnings from mongodb node driver
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
});

connect.then(() => {

    console.log('Connected correctly to server');

    //const newCampsite = new Campsite({ //instantiate new document based on mongoose model named campsite
    Campsite.create({
        name: 'React Lake Campground',
        description: 'test'// if don't have a description, will return validation error since using mongoose and required a description in the model
    })
    //newCampsite.save() //save document to campsites collection and return promise saying if it failed or succeeded
    .then(campsite => {
        console.log(campsite);

        //return Campsite.find() //find all documents based on the model, if successful return documents inside array of objects
        return Campsite.findByIdAndUpdate(campsite._id, {
            $set: { description: 'Updated Test Document' }
        }, {
            new: true
        });
    })
    .then(campsite => {
        console.log(campsite);

        campsite.comments.push({
            rating: 5,
            text: 'What a magnificent view!',
            author: 'Tinus Lorvaldes'
        });

        return campsite.save();
    })
    .then(campsite => {
        console.log(campsite);
        return Campsite.deleteMany();
    })
    .then(() => {
        return mongoose.connection.close();
    })
    .catch(err => {
        console.log(err);
        mongoose.connection.close();
    });
});
