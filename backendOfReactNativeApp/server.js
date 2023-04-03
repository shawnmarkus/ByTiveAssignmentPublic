const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const SocialCardModel = require("./model");

dotenv.config({ path: "./config.env" });

try {
  require("./connection");
} catch (error) {
  console.log("error hai bro", error);
}

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

// just a get request
app.get("/getUserList", (req, res) => {
  console.log("chiththi aayi hai");
  try {
    SocialCardModel.find({}).then((data) => {
      console.log(data);
      return res.status(200).json({
        retrievedData: data,
        status: "SUCCESS",
      });
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: "FAILED",
    });
  }
});

/*
 * Body in the create user entry must contain following fields:
 * imgSrc
 * email
 * contactNo
 * website
 */
app.post("/createUserEntry", (req, res) => {
  try {
    SocialCardModel.create({ ...req.body }).then((data) => {
      res.status(200).json({
        status: "SUCCESS",
        data: data,
      });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "FAILED",
    });
  }
});

// edit the user
app.patch("/editUser", (req, res) => {
  console.log("edit the user");
  try {
    // const { name, email, website, contactNo } = req.body;
    const dataToUpdate = Array(req.body).filter((item) => {
      return item !== "_id";
    })[0];

    // console.log();

    console.log("data to update is :", dataToUpdate);
    SocialCardModel.findOneAndUpdate(
      { _id: req.body._id },
      { ...dataToUpdate },
      { new: true }
    ).then((data) => {
      console.log("Updated data is ", data);
      res.status(200).json({
        status: "DATA_UPDATION_SUCCESS",
        data: data,
      });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "DATA_UPDATION_FAILED",
    });
  }
});

// delete the user
app.delete("/deleteUser", (req, res) => {
  try {
    SocialCardModel.findOneAndDelete({ _id: req.body._id }).then((data) => {
      res.status(200).json({
        status: "DATA_DELETION_SUCCESS",
        data: data,
      });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "DATA_DELETION_FAILED",
    });
  }
});

// port to listen
const PORT = process.env.PORT | 5000;
app.listen(PORT, (error) => {
  if (error) {
    console.log(`failed to listen because ${error}`);
  } else {
    console.log(`listening at ${process.env.PORT}`);
  }
});
