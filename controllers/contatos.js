var validacao = require('../validacoes/contatos');

module.exports = function(app){

	var Amigo = app.models.amigos; 

	var ContatoController = {
		index: function(req,res){
			var _id = req.params.id;
			Amigo.findById(_id, function(err,dados){
				if(err){
					req.flash('erro', 'Erro ao listar contatos: '+err);
					res.render('contatos/index', {lista: null});
				}
				res.render('contatos/index', {lista: dados.contatos, id: _id, nomeContato: dados.nome});
			});
		},

		create: function(req,res){
			res.render('contatos/create', {model: new Amigo(), id: req.params.id});
		},

		post: function(req,res){
			if(validacao(req,res)){
				var _id = req.params.id;
				Amigo.findById(_id, function(err,dados){
					var contato = req.body.contatos;
					dados.contatos.push(contato);
					dados.save(function(err){
						if(err){
							req.flash('erro', 'Erro ao cadastrar contato: '+err);						
						}
						res.redirect('/contatos/'+_id);
					});
				});	
			}else{
				res.render('contatos/create', {model: req.body, id: req.params.id});
			}			
		},

		excluir: function(req,res){
			//verificar os nomes dos parametros que foram definidos na rota
			var _idAmigo = req.params.idAmigo;
			Amigo.findById(_idAmigo, function(err,dados){
				if(err){
					res.json(400, 'Erro ao excluir contato: '+err);
				}
				var contatoID = req.params.idContato;
				dados.contatos.id(contatoID).remove();
				dados.save(function(err){
					if(err){
						//mensagem que será retornada para a chamada ajax
						res.json(400, 'Erro ao excluir contato: '+err);
					}
					//mensagem que será retornada para a chamada ajax
					res.json(200, 'Registro exclusão com sucesso!');
				});
			});
		}
	}

	return ContatoController;
}