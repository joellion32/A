const fs = require('fs');


class Escritorios {

constructor(){
this.escritorios = [
{
 numero: 1,
 status: false,   
},
{
 numero: 2,
 status: false,   
},
{
 numero: 3,
 status: false,   
},
{
 numero: 4,
 status: false,   
},
{
 numero: 5,
 status: false,   
},
{
 numero: 6,
 status: false,   
},
{
 numero: 7,
 status: false,   
},
{
 numero: 8,
 status: false,   
}     
]


this.hoy = new Date().getDate();
let data = require('../data/escritorios.json');   
this.guardarData();
this.escritorios = data.escritorios;
}


getEscritorios() {
return this.escritorios; 
}


ActualizarEscritorio(numero, status){    
this.getEscritorios();
let index = this.escritorios.findIndex(escritoro => escritoro.numero === numero);

if(index >= 0 && status == true){    
this.escritorios[index].status = status;
this.guardarData();    
}else{
console.log('ERROR');
}
}


guardarData(){
 let dataJson = {
 hoy: this.hoy,
 escritorios: this.escritorios    
 }   

let data = JSON.stringify(dataJson);

 fs.writeFileSync('./server/data/escritorios.json', data);
}

}


module.exports = {

    Escritorios
}