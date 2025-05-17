// models/User.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const attendanceSchema = new Schema({
  year: {
    type: Number,
    required: true,
  },
  months: [
    {
      month: {
        type: Number,
        required: true,
      },
      days: [
        {
          day: {
            type: Number,
            required: true,
          },
          present: {
            type: Boolean,
            required: true,
          },
        },
      ],
    },
  ],
});
//ss

const userSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    firebaseUid: {
      type: String,
      required: true,
      unique: true,
    },
    weight: {
      type: Number,
    },
    height: {
      type: Number,
    },

    education: {
      type: String,
    },
    referance: {
      type: String,
    },

    disease: {
      type: String,
    },

    injury: {
      type: String,
    },

    parrentName: {
      type: String,
    },
    occupation: {
      type: String,
    },
    address: {
      type: String,
    },
    remark: {
      type: String,
    },

    birthDate: {
      type: Date,
    },
    mobileNumber: {
      type: String,
      unique: true,
      trim: true,
      required: true,
    },
    email: {
      type: String,
    },
    batch: {
      type: Schema.Types.ObjectId,
      ref: "Batch",
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
    },
    role: {
      type: String,
      enum: ["Admin", "Player", "Coach"],
      default: "Player",
    },
    playerType: {
      type: String,
      enum: ["Batsman", "Bowler", "Wicketkeeper", "Allrounder"],
    },
    attendance: [attendanceSchema],
    playedMatches: [
      {
        match: {
          type: Schema.Types.ObjectId,
          ref: "Match",
        },
        result: {
          type: String,
          enum: ["Win", "Lose"],
        },
      },
    ],
    upcomingMatches: [
      {
        type: Schema.Types.ObjectId,
        ref: "Match",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
