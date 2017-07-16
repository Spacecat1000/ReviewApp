let mongoose = require('mongoose');
let Schema = mongoose.Schema;

//build data schema
let LikeSchema = new Schema({
	arr: {
		type: [Number],
		required: [true]
	}
});
let Like = mongoose.model('like', LikeSchema);

module.exports = Like;