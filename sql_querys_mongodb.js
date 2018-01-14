/*
db.colecao1.insert({nome : 'maria 1', idade:10, estadocivil: "solteira"})
db.colecao1.insert({nome : 'maria 2', idade:15, estadocivil: "casada"})
db.colecao1.insert({nome : 'maria 3', idade:20, estadocivil: "solteira"})
db.colecao1.insert({nome : 'maria 4', idade:30, estadocivil: "solteira"})
db.colecao1.insert({nome : 'senhora maria', idade:30, estadocivil: "solteira"})
db.colecao1.insert({nome : 'senhora maria dos santos', idade:30, estadocivil: "solteira"})
db.colecao1.insert({nome : 'senhora maria dos santos', idade:30, estadocivil: "solteira", estado: 'SP'})
db.colecao1.insert({nome : 'MARIA MAIUSCULA', idade:30, estadocivil: "solteira", estado: 'SP'})

//alterar somente 1 documento
db.colecao1.update({nome:'MARIA MAIUSCULA alterada'}, //where
                   {$set:{nome:'MARIA MAIUSCULA alterada',
                          estado:'SP'
                          }})

//alterar multiplos documentos com parametro multi:true                          
db.colecao1.update({nome:'maria 2'}, //where
                   {$set:{nome:'maria 2',
                          estado:'RN'
                          }},
                    {multi:true})                          
                    
//alterar multiplos documentos sem parametro multi:true        
db.colecao1.updateMany({nome:'maria 3'}, //where
                   {$set:{nome:'maria 3',
                          estado:'MG'
                          }})                          

//remover documento                      
db.colecao1.remove({nome :'senhora maria alterada 2'})

*/
//sem where
db.colecao1.find()


//where idade =10
db.colecao1.find({idade :{$eq:10}})

//where idade >10
db.colecao1.find({idade :{$gt:10}})

//where idade >=10
db.colecao1.find({idade :{$gte:10}})

//where idade <20
db.colecao1.find({idade :{$lt:20}})

//where idade <=20
db.colecao1.find({idade :{$lte:20}})

//where estadocivil <> 'casada'
db.colecao1.find({estadocivil :{$ne:'casada'}})

//where idade in (10,20,30)
db.colecao1.find({idade :{$in:[10,20,30]}})

//where idade not in (10,20,30)
db.colecao1.find({idade :{$nin:[10,20,30]}})

//select distinct 
db.colecao1.distinct("estadocivil")

//where com regex, com maria no inicio
db.colecao1.find({nome:{$regex:/^maria/}})

//where com regex, com maria em qualquer parte
db.colecao1.find({nome:{$regex:/.*maria.*/}})

//where nome = 'maria 1' or idade = 15 or nome = 'senhora maria'
db.colecao1.find({$or:[
                       {nome :{$eq:'maria 1'}},
                       {idade:{$eq:15}},
                       {nome:{$eq:'senhora maria'}}
                      ]})
                      
//where not nome = 'maria 1'
db.colecao1.find({nome: {$not:{$eq: 'maria 1'}}})  


//where not nome = 'maria 1' and not idade = 15 and not nome = 'senhora maria'
db.colecao1.find({$nor:[
                       {nome :{$eq:'maria 3'}},
                       {idade:{$eq:15}},
                       {nome:{$eq:'senhora maria'}}
                      ]})   


//where com regex maria em qualquer parte and idade >=15
db.colecao1.find({$and:[{nome:{$regex:/.*maria.*/}},
                        {idade:{$gte:15}}
                      ]})
                      
//where idade>=10 and idade menor<=20 order by idade
db.colecao1.find({$and: [
                        {idade: {$gte: 10}},
                        {idade: {$lte: 20}}
                        ]
                 }).sort({idade:1})      
        
                         
db.colecao1.find().sort({idade:1})
                
                      
//retorna todos os documentos onde o campo 'estado' existe
db.colecao1.find({estado:{$exists:true}})                      
                     
//where nome like '%maria%' 
db.colecao1.find({nome:/maria/})

//where nome like termine com santos
db.colecao1.find({nome:/santos$/})

//where nome like inicie com maria
db.colecao1.find({nome:/^maria/})

//where nome like inicie com maria com case insensitive (minusculas e maiusculas)
db.colecao1.find({nome:/^maria/i})

//order by idade decrescente
db.colecao1.find().sort({idade:-1})

//order by idade crescente
db.colecao1.find().sort({idade:1})

//select nome, idade, estadocivil , estado
//from colecao where estadocivil = 'solteira'
//order by idade (1=crescente, -1=decrescente)
db.colecao1.find({estadocivil:'solteira'}, //where
                 {_id:0,nome:1,idade:1,estadocivil:1, estado:1} //campos
                 ).sort({idade:1}) //ordenacao
                 
//select nome, idade, estadocivil , estado
//from colecao where estadocivil = 'solteira'
//order by idade, nome desc 


//(1=crescente, -1=decrescente)
//retorna somente 1 registro limit =1
//pula 2 registros e me retorna o registro 3 skip 2                 
db.colecao1.find({estadocivil:'solteira'}, //where
                 {_id:0,nome:1,idade:1,estadocivil:1, estado:1} //campos
                 ).sort({idade:1, nome:-1}) //ordenacao                 
                 .limit(1).skip(2)
                 

//select estado, count(1) from tab group by estado                 
db.colecao1.aggregate([{$group: {_id: "$estado", qtde: {$sum: 1}}}])

db.colecao1.count()
db.colecao1.count( { estado: { $exists: true } } )
db.colecao1.count( { estado: { $exists: false } } )
//or
db.colecao1.find( { estado: { $exists: true } } ).count()

db.colecao1.count( { idade: { $gt: 15 } } )
//or
db.colecao1.find( { idade: { $gt: 15 } } ).count()

db.colecao1.find( { estado: "SP" } ).explain()

db.participantes.find({})
db.participantes.aggregate({$group: { _id : "$estado", quantidade: { $sum : 1}}})
db.participantes.aggregate({$group: { _id : "$estado", quantidade: { $sum : 1}}},{$project :{_id : 0, estado : "$_id", quantidade : "$quantidade"}})
db.participantes.aggregate({$group: { _id : "$estado", quantidade: { $sum : 1}}} , {$project :{_id : 0, estado : "$_id", quantidade : "$quantidade"}}, {$sort:{quantidade:-1}})
                 
db.colecao1.find().sort({idade:1})
























                      

