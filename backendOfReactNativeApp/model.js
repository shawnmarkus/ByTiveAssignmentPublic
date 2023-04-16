const mongoose = require("mongoose");

const SocialCardSchema = mongoose.Schema({
  imgSrc: String,
  email: String,
  contactNo: String,
  website: String,
  name: String,
  isLiked: {
    type: Boolean,
    default: false,
  },
});

const SocialCardModel = mongoose.model(
  "socialMediaCardDetails",
  SocialCardSchema
);

module.exports = SocialCardModel;
