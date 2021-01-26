const mongoose = require("mongoose");

const CompteurSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectID,
	trainer: String,
	idDiscord : String,
	count : Number,
	time: Date
});

module.exports = mongoose.model("Compteur", CompteurSchema);