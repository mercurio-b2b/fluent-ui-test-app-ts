const User = require("../models/user.model.js");

exports.getAll = async (req, res) => {

    try {
        let data = await User.getAll();
        res.send(data);
    }
    catch (err) {
        console.error("get: "+err);
        res.status(500).send({
            message: "Error getting user data "
        });
    }
};
