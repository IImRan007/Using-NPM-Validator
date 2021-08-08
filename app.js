const mongoose = require("mongoose");
const validator = require("validator");

mongoose
  .connect("mongodb://localhost:27017/mydatabase", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("Connection Successful..."))
  .catch((err) => console.log(err));

// What is schema?
// A mongoose schema defines the structure of the document, default values, validators, etc.

// defining schema
const playListSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    // uppercase: true,
    trim: true,
    minlength: 2,
    maxlength: 30,
  },
  ctype: {
    type: String,
    required: true,
    lowercase: true,
    enum: ["frontend", "backend", "database"],
  },
  videos: {
    type: Number,
    validate(value) {
      if (value < 0) {
        throw new Error("Video count should not be negative");
      }
      // OR
      // validate: {
      //   validator: function (value) {
      //     return value.length < 0;
      //   },
      //   message: "Video count should not be negative",
    },
  },
  author: String,
  email: {
    type: String,
    required: true,
    unique: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Invalid Email Address");
      }
    },
  },
  active: Boolean,
  date: {
    type: Date,
    default: Date.now,
  },
});

// Use Pascal Case(Capital) for collection creation
const Playslist = new mongoose.model("Playlist", playListSchema);

// Creating/Inserting Document
const createDocument = async () => {
  try {
    const expressPlaylist = new Playslist({
      name: "expers",
      ctype: "Backend",
      videos: 55,
      author: "Thapa Technical",
      email: "imran@gmail.com",
      active: true,
    });

    const result = await Playslist.insertMany([expressPlaylist]);
    console.log(result);
  } catch (err) {
    console.log(err);
  }
};

createDocument();
