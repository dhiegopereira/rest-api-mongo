require('dotenv').config();
const port = process.env.EXPRESS_PORT;
const mongo = process.env.MONGO_PORT;
const app = require('./src/app');

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect(mongo).
    then(() => {
        app.listen(port, () => console.log(`Listening at http://localhost:${port}`));
    })
    .catch(err => {
        console.log('Could not connect to MongoDB', err);
    })