module.exports = function(req,res,next){
	if(req.session.usuario){
		//continua com a requisicao se usuário estiver logado
		//senao volta para a pagina de login
		return next();
	}
	return res.redirect('/');
}