// models/Batch.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const batchSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    users: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
    }],
}, {
    timestamps: true,
});

const Batch = mongoose.model('Batch', batchSchema);
module.exports = Batch;
