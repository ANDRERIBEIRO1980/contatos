var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

module.exports = function(){

	var usuarioSchema = mongoose.Schema({
		nome     : {type: String, trim: true},
		email    : {type: String, trim: true, unique: true, index: true},
		site     : {type: String, trim: true},
		password : {type: String},
		data_cad : {type: Date, default: Date.now}
	});

	//criptografa a senha informada no cadastro
	usuarioSchema.methods.generateHash = function(password){
		return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
	};

	//valida senha informada para login com a senha cadastrada no banco de dados
	usuarioSchema.methods.validPassword = function(password, old_password){
		return bcrypt.compareSync(password, old_password, null);
	}
	
	return mongoose.model('Usuarios',usuarioSchema);
}