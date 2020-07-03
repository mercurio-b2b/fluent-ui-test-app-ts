const sql = require("./db.js");

const util = require('util');

const query = util.promisify(sql.query).bind(sql);

const User = function (user) {
};

User.getAll = async () => {

	let res = await query("SELECT * FROM users");

	return res;
}

module.exports = User;