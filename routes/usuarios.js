module.exports = function(app){

	var usuario    = app.controllers.usuarios;
	var autenticar = require('../middleware/autenticar');


	app.route('/usuarios').get(autenticar, usuario.index);

	app.route('/usuarios/create')
	   .get(autenticar, usuario.create)
	   .post(autenticar, usuario.post);

	app.route('/usuarios/show/:id').get(autenticar, usuario.show);
	app.route('/usuarios/delete/:id').post(autenticar, usuario.delete);

	app.route('/usuarios/edit/:id')
		.get(autenticar, usuario.edit)
		.post(autenticar, usuario.update);
}