// app/models/projet.js
// grab the mongoose module
var mongoose = require('mongoose');

// define our projet model

var projetSchema = new mongoose.Schema({
    name : {type : String, default: ''},
    family : {type : String, default: ''},
    description : {type : String, default: ''},
    reference : {type : String, default: ''},
    partner : {type : String, default: ''},
    created_at : {type : Date, default: Date.now}
});
// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model("Projet", projetSchema);
