module.exports = function(app){

	var Usuario    = app.models.usuarios;
	var validacao  = require('../validacoes/autenticacao');
	var nodemailer = require('nodemailer');

	var HomeController = {
		index: function(req,res){
			res.render('home/index');
		},

		login: function(req,res){

			if (req.session.usuario)
				res.render('home/index');
			else	
				res.render('home/login');
		},

		autenticacao: function(req,res){
			var usuario  = new Usuario();
			var email    = req.body.email;
			var password = req.body.password;

			if(validacao(req,res)){
				Usuario.findOne({'email': email}, function(err,data){
					if(err){
						req.flash('erro', 'Erro ao entrar no sistema: '+err);
						res.redirect('/');
					}else if(!data){
						req.flash('erro', 'E-mail não encontrado!');
						res.redirect('/');
					}else if(!usuario.validPassword(password, data.password)){
						req.flash('erro', 'Senha não confere!');
						res.redirect('/');
					}else{
						//cria uma sessao com os dados do usuario logado
						req.session.usuario = data;
						res.redirect('/home');
					}
				});
			}else{
				res.redirect('/');
			}
		},


		logout: function(req,res){
			//finaliza sessao
			req.session.destroy();
			res.redirect('/');
		},

		email: function(req,res){
			res.render('home/email');
		},

		enviar: function(req,res){

			var transport = nodemailer.createTransport({
				host: "smtp.gmail.com",				
				port: 465,
				auth:{
					user: "seuemaildeorigem@gmail.com",
					pass: "senhadoemail"
				}
			});

			var mailOptions = {
				from: "Contatos <seuemaildeorigem@gmail.com>",
				to: req.body.email,
				subject: req.body.assunto,
				text: req.body.mensagem
			}

			console.log(mailOptions);

			transport.sendMail(mailOptions, function(err, response){
				if(err){
					req.flash('erro', 'Erro ao enviar e-mail: '+err);
					res.redirect('/email');
				}else{
					req.flash('info', 'E-mail enviado com sucesso!');
					res.redirect('/email');
				}				
			});

		}
	}

	return HomeController;
}