/* Import mongoose and define any variables needed to create the schema */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/* Create your schema */
var nameSchema = new Schema({ //Replace nameSchema
  created_at: Date,
  updated_at: Date
});

//Pre function
nameSchema.pre('save', function(next) { //Replace nameSchema
  var currentTime = new Date;
  this.updated_at = currentTime;
  if(!this.created_at)
  {
    this.created_at = currentTime;
  }
  next();
});

/* Use your schema to instantiate a Mongoose model */
var ModelName = mongoose.model('Name', nameSchema); //Replace name

/* Export the model to make it avaiable to other parts of your Node application */
module.exports = ModelName;
