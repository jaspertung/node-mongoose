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

    //const newCampsite = new Campsite({ //instantiate new document based on mongoose model named campsite ----removed when added .create
    Campsite.create({// automatically saves
        name: 'React Lake Campground',
        description: 'test'// if don't have a description, will return validation error since using mongoose and required a description in the model
    })
    //newCampsite.save() //save document to campsites collection and return promise saying if it failed or succeeded
    .then(campsite => {
        console.log(campsite);//original document

        //return Campsite.find() //find all documents based on the model, if successful return documents inside array of objects -------replaced when added comments subdocument
        return Campsite.findByIdAndUpdate(campsite._id, {//1st arg: campsite id, 2nd arg: object with updating operator, 3rd arg: cause method to return updated document
            $set: { description: 'Updated Test Document' }
        }, {
            new: true
        });
    })
    .then(campsite => {
        console.log(campsite); //updated document with new description

        //comments subdocument
        campsite.comments.push({//comments stored as array so can use push method to add new comment
            rating: 5,
            text: 'What a magnificent view!',
            author: 'Tinus Lorvaldes'
        });

        return campsite.save();//to make subdocument update take effect
    })
    .then(campsite => {
        console.log(campsite); //updated document with comments subdocument
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
