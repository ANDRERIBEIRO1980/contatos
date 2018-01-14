module.exports = function(app){

	var Relatorio   = app.models.relatorios;  //nome do arquivo usuarios.js da pasta models

	var RelatorioController = {

		index: function(req,res){
			Relatorio.find(function(err,dados){
				if(err){
					req.flash('erro', 'Erro ao buscar participantes: '+err);
					res.redirect('/home');
				}else{
					res.render('relatorios/index', {lista: dados});
				}
			});			
		},

		agrupado: function(req,res){
			Relatorio.aggregate([{$group: { _id : "$estado", quantidade: { $sum : 1}}} , {$project :{_id : 0, estado : "$_id", quantidade : "$quantidade"}}, {$sort:{quantidade:-1}}], function(err,dados){
				if(err){
					req.flash('erro', 'Erro ao buscar participantes: '+err);
					res.redirect('/home');
				}else{
					res.render('relatorios/agrupado', {lista: dados});
				}
			}).sort({quantidade:1});
		}

	}

	return RelatorioController;	
}