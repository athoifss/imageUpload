"use strict";
var util = require("util");

var util = require("util");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function(req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  }
});
const imageFilter = function(req, file, cb) {
  if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
    req.fileValidationError = "Only image files are allowed!";
    return cb(new Error("Only image files are allowed!"), false);
  }
  cb(null, true);
};

function getTest(req, res) {
  let upload = multer({ storage: storage, fileFilter: imageFilter }).array(
    "image",
    4
  );

  upload(req, res, function(err) {
    if (req.fileValidationError) {
      console.log(1);
    } else if (!req.files) {
      // this is where the files are actually uploaded/
      console.log(2);
    } else if (err instanceof multer.MulterError) {
      console.log(3);
    } else if (err) {
      console.log(4);
    }
    console.log(req.files);
  });
}

function hello(req, res) {
  var name = req.swagger.params.name.value || "stranger";
  var hello = util.format("Hello, %s!", name);
  res.json(hello);
}
module.exports = {
  hello: hello,
  getTest: getTest
};
