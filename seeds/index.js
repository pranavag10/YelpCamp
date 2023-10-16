const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp');

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for(let i = 0; i < 100; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const pric = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '6511a4e82b7271e7ac4b7028',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'abc',
            price: pric,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dkword9tu/image/upload/v1695750926/YelpCamp/wg2ri0zjvad3sm60sylm.jpg',
                    filename: 'YelpCamp/wg2ri0zjvad3sm60sylm'
                },
                {
                    url: 'https://res.cloudinary.com/dkword9tu/image/upload/v1695752466/YelpCamp/lkusjhx3gl80y6i62sl4.jpg',
                    filename: 'YelpCamp/lkusjhx3gl80y6i62sl4'
                }
            ]

        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})