var mongoose = require('mongoose');

module.exports = function(){

	var participantesSchema = mongoose.Schema({
		nome     : {type: String, trim: true},
		cidade   : {type: String, trim: true},
		estado   : {type: String, trim: true}
	});

	return mongoose.model('Participantes',participantesSchema);
}