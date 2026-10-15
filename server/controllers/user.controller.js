const userModel = require("../models/user.model");
const userServices = require("../services/user.services");
const { validationResult } = require("express-validator");


module.exports.registerUser = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        console.log(req.body);

        const{fullname,email,password} = req.body;
        const hashPassword = await userModel.hashPassword(password);
        const user = await userServices.createUser({
            firstname: fullname.firstname,
            lastname: fullname.lastname,
            email,
            password:hashPassword
        });
        const token = user.generateAuthToken();
        res.status(201).json({
            user,
            token
        });
    } catch (error) {
        next(error);
    }

}

module.exports.loginUser = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;
        const user = await userModel.findOne({email}).select('+password');
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = user.generateAuthToken();
        res.status(200).json({
            user,
            token
        });
    } catch (error) {
        next(error);
    }
}