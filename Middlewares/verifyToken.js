const Vendor = require("../Models/Venodr"); // fixed typo: "Venodr" -> "Vendor"
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const secretKey = process.env.WAHTISYOURANME; // also consider renaming your ENV variable to something clearer

const verifyToken = async (req, res, next) => {
    const token = req.headers.token; // fixed: jwt.headers.token -> req.headers.token

    if (!token) {
        return res.status(401).json({
            status: false,
            message: "Token is not valid"
        });
    }

    try {
        const decoded = jwt.verify(token, secretKey);
        const vendor = await Vendor.findById(decoded.vendorId); // avoid shadowing variable name "Vendor"

        if (!vendor) {
            return res.status(404).json({
                status: false,
                message: "Vendor not found"
            });
        }

        req.vendorId = vendor._id;
        next();
    } catch (error) {
        return res.status(401).json({
            status: false,
            message: "Invalid token"
        });
    }
};

module.exports = verifyToken;