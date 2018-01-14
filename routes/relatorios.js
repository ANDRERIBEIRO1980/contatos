var autenticar = require('../middleware/autenticar');

module.exports = function(app){

	var relatorio = app.controllers.relatorios;

	app.route('/relatorios').get(autenticar, relatorio.index);
	app.route('/relatorios/agrupado').get(autenticar, relatorio.agrupado);

}