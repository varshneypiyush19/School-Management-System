require("dotenv").config();
const formidable = require("formidable");
const path = require("path");
const fs = require("fs");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const School = require("../models/school.model");
module.exports = {
  registerSchool: async (req, res) => {
    try {
      const form = new formidable.IncomingForm();
      form.parse(req, async (err, fields, files) => {
        const school = await School.findOne({
          email: fields.email[0],
        });
        if (school) {
          return res
            .status(409)
            .json({ success: false, message: "Email already registered" });
        } else {
          const photo = files.image[0];
          let filepath = photo.filepath;
          let originalFilename = photo.originalFilename.replace("", "_");
          let newpath = path.join(
            __dirname,
            process.env.SCHOOL_IMAGE_PATH,
            originalFilename
          );

          let photoData = fs.readFileSync(filepath);
          fs.writeFileSync(newpath, photoData);

          const salt = bcrypt.genSaltSync(10);
          const hashedPassword = bcrypt.hashSync(fields.password[0], salt);
          const newSchool = new School({
            school_name: fields.school_name[0],
            email: fields.email[0],
            owner_name: fields.owner_name[0],
            school_image: originalFilename,
            password: hashedPassword,
          });
          const savedSchool = await newSchool.save();
          res.status(200).json({
            success: true,
            data: savedSchool,
            message: "School registered successfully",
          });
        }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "School registration failed",
      });
    }
  },
  loginSchool: async (req, res) => {
    try {
      const school = await School.findOne({
        email: req.body.email,
      });
      if (school) {
        const isAuth = bcrypt.compareSync(req.body.password, school.password);
        if (isAuth) {
          const jwtSecret = process.env.JWT_SECRET;
          const token = jwt.sign(
            {
              id: school._id,
              schoolId: school._id,
              owner_name: school.owner_name,
              school_name: school.school_name,
              image_url: school.school_image,
              role: "SCHOOL",
            },
            jwtSecret
          );
          res.header("Authorization", token);
          res.status(200).json({
            success: true,
            message: "School logged in successfully",
            user: {
              id: school._id,
              owner_name: school.owner_name,
              school_name: school.school_name,
              image_url: school.school_image,
              role: "SCHOOL",
            },
          });
        } else {
          res.status(401).json({
            success: false,
            message: "Password is incorrect",
          });
        }
      } else {
        res.status(404).json({
          success: false,
          message: "Email is not registered",
        });
      }
    } catch {
      res.status(500).json({
        success: false,
        message: "Internal server error [SCHOOL LOGIN]",
      });
    }
  },
  getAllSchools: async (req, res) => {
    try {
      const schools = await School.find().select([
        "-password",
        "-_id",
        "-owner_name",
        "createdAt",
      ]);
      res.status(200).json({
        success: true,
        message: "Success in fetching all schools",
        schools,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Internal server error [ALL SCHOOL DATA]",
      });
    }
  },

  getSchoolOwnData: async (req, res) => {
    try {
      const id = req.user.id;
      const school = await School.findOne({ _id: id });
      if (school) {
        res.status(200).json({
          success: true,
          school,
        });
      } else {
        res.status(404).json({
          success: false,
          message: "School not found",
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Internal server error [OWN SCHOOL DATA]",
      });
    }
  },
  updateSchool: async (req, res) => {
    try {
      const id = req.user.id;
      const form = new formidable.IncomingForm();
      form.parse(req, async (err, fields, files) => {
        const school = await School.findOne({ _id: id });
        if (files.image) {
          const photo = files.image[0];
          let filepath = photo.filepath;
          let originalFilename = photo.originalFilename.replace("", "_");
          if (school.school_image) {
            let oldImagePath = path.join(
              __dirname,
              process.env.SCHOOL_IMAGE_PATH,
              school.school_image
            );
            if (fs.existsSync(oldImagePath)) {
              fs.unlink(oldImagePath),
                (err) => {
                  if (err) {
                    console.error("Error deleting old Image.", err);
                  }
                };
            }
          }
          let newpath = path.join(
            __dirname,
            process.env.SCHOOL_IMAGE_PATH,
            originalFilename
          );

          let photoData = fs.readFileSync(filepath);
          fs.writeFileSync(newpath, photoData);
          Object.keys(fields).forEach((field) => {
            school[field] = fields[field][0];
          });
          await school.save();
          res.status(200).json({
            success: true,
            message: "School updated successfully",
          });
        }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "School registration failed",
      });
    }
  },
};
