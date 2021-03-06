var moment = require('moment');
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var AuthorSchema = new Schema(
  {
    first_name: {type: String, required: true, max: 100},
    family_name: {type: String, required: true, max: 100},
    author_image: {type: String, required: true},
    author_background: {type: String, required: true, max: 1000},
    date_of_birth: {type: Date},
    date_of_death: {type: Date}
  
  }
);

// Virtual for author's full name
AuthorSchema
.virtual('name')
.get(function () {
  return this.first_name + ' ' + this.family_name;
});

// Virtual for author's lifespan
AuthorSchema
.virtual('lifespan')
.get(function () {
  if(!this.date_of_death)
    return this.date_of_birth ? moment(this.date_of_birth).format('MMMM Do, YYYY') : '';
  else
    return moment(this.date_of_birth).format('MMMM Do, YYYY') + ' -\t ' + moment(this.date_of_death).format('MMMM Do, YYYY');
});

// Virtual for author's URL
AuthorSchema
.virtual('url')
.get(function () {
  return '/catalog/author/' + this._id;
});

//Export model
module.exports = mongoose.model('Author', AuthorSchema);