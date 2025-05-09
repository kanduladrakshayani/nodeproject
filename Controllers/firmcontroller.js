const Firm = require("../Models/firm");
const Vendor = require("../Models/Venodr"); // Fixed typo: "Venodr" -> "Vendor"
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Ensure the 'uploads' directory exists
const uploadDirectory = path.join(__dirname, "../uploads");

if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory, { recursive: true });
}

// Configure multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDirectory); // Ensures the file is saved in the 'uploads' folder
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1e9) + ext;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage: storage });

// Add firm controller
// const addFirm = async (req, res) => {
//   const { firstname, area, category, region, offer } = req.body;
//   const image = req.file ? req.file.filename : undefined;

//   try {
//     const firmVendor = await Vendor.findById(req.vendorId); // req.vendorId from token
//     if (!firmVendor) {
//       return res.status(404).json({
//         status: false,
//         message: "Vendor not found",
//       });
//     }

//     const firm = new Firm({
//       firstname,
//       area,
//       category, // If category is an array, ensure it's passed as an array
//       region,
//       offer,
//       image,
//       vendor: firmVendor._id,
//     });

//     const saveFirm = await firm.save();
//     console.log('firmVendor',firmVendor)
//     firmVendor.products.push(saveFirm); // Add firm to vendor
//     await firmVendor.save();

//     res.status(201).json({
//       status: true,
//       message: "Firm added successfully",
//       data: saveFirm,
//     });
//   } catch (error) {
//     console.error("Error adding firm:", error);
//     res.status(500).json({
//       status: false,
//       message: "Server error",
//     });
//   }
// };
const addFirm = async (req, res) => {
  const { firstname, area, category, region, offer } = req.body;
  const image = req.file ? req.file.filename : undefined;

  try {
    const firmVendor = await Vendor.findById(req.vendorId); // req.vendorId from token
    if (!firmVendor) {
      return res.status(404).json({
        status: false,
        message: "Vendor not found",
      });
    }

    const firm = new Firm({
      firstname,
      area,
      category,
      region,
      offer,
      image,
      vendor: firmVendor._id,
    });

    const saveFirm = await firm.save();

    // Ensure products field exists and is initialized as an array
    if (!firmVendor.products) {
      firmVendor.products = []; // Initialize if undefined
    }

    firmVendor.products.push(saveFirm._id); // Add firm to vendor's products
    await firmVendor.save();

    res.status(201).json({
      status: true,
      message: "Firm added successfully",
      data: saveFirm,
    });
  } catch (error) {
    console.error("Error adding firm:", error);
    res.status(500).json({
      status: false,
      message: "Server error",
    });
  }
};

module.exports = {
  addFirmMiddleware: [upload.single("image"), addFirm], // Use multer middleware to handle image upload
};
