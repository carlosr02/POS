function lerXMLComXml2Js(arquivo, funcao){
  var fs = require('fs')
  var xmlParser = require('xml2js').parseString

  fs.readFile(arquivo,function(err,data){
    xmlParser(data, funcao)
  })
}

lerXMLComXml2Js('./natalcard.xml',function(err,result){
  console.log(result.alunos.aluno[1]['$'].matricula)
  console.log(result.alunos.aluno[1].nome[0])
    console.log(result.alunos.aluno[1].cpf[0])
    console.log(result.alunos.aluno[1].email[0])
    console.log(result.alunos.aluno[1].telefone[0])
})
