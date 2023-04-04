const mongoose =  require( "mongoose");
const Schema = mongoose.Schema;

const PeepCollection = new Schema({
    text: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true
    },
    userUsername: {
        type: String,
        required: true
    }
}, { timestamps: true })

const PeepChitter = mongoose.model("peepchitter", PeepCollection);

module.exports = PeepChitter;