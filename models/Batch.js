const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define Sub-batch schema
const subBatchSchema = new Schema({
    name: {
        type: String,
        required: true,
        enum: ['Morning', 'Evening'], // You can add more sub-batch names if needed
        trim: true,
    },
    users: [{
        type: Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
    }],
}, {
    timestamps: true,
});

// Main Batch schema
const batchSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    description: {
        type: String,
        required: false,
        trim: true,
        maxlength: 500,
    },
    subBatches: [subBatchSchema],
    creatorId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
}, {
    timestamps: true,
});

const Batch = mongoose.model('Batch', batchSchema);
module.exports = Batch;
