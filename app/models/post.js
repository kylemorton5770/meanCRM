//Get mongoose to declare the post model 
//REM: Mongoose is ODM for mapping docs to models
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

//declare post schema
var PostSchema = new Schema({
	subject: String,
	body: String,
	userid: String,
	username: String
});

module.exports = mongoose.model('Post', PostSchema);
