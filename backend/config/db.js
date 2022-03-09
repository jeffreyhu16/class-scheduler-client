const mongoose = require('mongoose');

exports.connectDB = () => {
    mongoose.connect(process.env.MONGO_URI)
        .then(conn => console.log(conn.connection.host))
        .catch(err => {
            console.log(err);
            process.exit(1);
        });
}