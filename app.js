var express      = require('express');
var path         = require('path');
var favicon      = require('static-favicon');
var logger       = require('morgan');
var cookieParser = require('cookie-parser');//trabalhar com cookies
var bodyParser   = require('body-parser'); //trabalhar com formularios
var session      = require('express-session');//trabalhar com sessoes
var load         = require('express-load');
var mongoose     = require('mongoose');
var flash        = require('express-flash');
var moment       = require('moment');
var expressValidator = require('express-validator');



//conexão com o mongodb
mongoose.connect('mongodb://localhost/uala', function(err){
	if(err){
		console.log("Erro ao conectar no mongodb: "+err);
	}else{
		console.log("Conexão com o mongodb efetuada com sucesso!");
	}
});

//rotas
//var routes = require('./routes/index');
//var users  = require('./routes/users');

//instancia de app
var app = express();

//middleware
var erros = require('./middleware/erros');

//view engine setup
app.set('views', path.join(__dirname, 'views'));//diretorio das view
app.set('view engine', 'jade'); //seta jade como template engine

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());//trabalhar com json
app.use(bodyParser.urlencoded());//trabalhar com formularios
app.use(expressValidator());//validar formularios, precisa ser apois o bodyParser
app.use(cookieParser()); //trabalhar com cookies
app.use(session({ secret: 'sua-chave-secreta' }));//para trabalhar com sessoes
app.use(express.static(path.join(__dirname, 'public')));//caminho dos arquivos estaticos
app.use(flash()); //uso da lib de mensagens

//helper deve ser carregado antes do load
app.use(function(req,res,next){

	//cria as sessoes de usuario
	res.locals.session  = req.session.usuario;
	res.locals.isLogged = req.session.usuario ? true : false;

	//uso da lib para formatacao de dados
	//permite usar nas respostas http na variavel res
	res.locals.moment   = moment;
	next();
});

//definicao de rotas
//app.use('/', routes);
//app.use('/users', users);

//carrega os diretorios abaixo para app
load('models').then('controllers').then('routes').into(app);

//middleware deve estar abaixo do load
app.use(erros.notfound);
app.use(erros.serverError);


app.listen(3000, function() {
    console.log('Express server listening on port 3000');
});
