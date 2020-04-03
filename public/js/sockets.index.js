var socket = io();
var label = $("#lblNuevoTicket");


socket.on('connect', function(client){
console.log('conectado al servidor');
});

socket.on('disconnect', function(){
$.smallBox({
  title:"Error",
  content:"Desconexion con el servidor",
  fa:"fa-star-o",
  timeout:4000,
});
});

/*----------------------------CREAR TICKETS---------------------------*/
// recibir ultimo ticket
socket.on('ultimoTicket', function(data) {
    $(label).text(data.ultimo); 
    });
    
    $("button").on('click', function () {
        socket.emit('siguienteTicket', null, function(siguienteTicket){
           $(label).text(siguienteTicket); 
        });
    });



/*--------------------------ESCRITORIOS ----------------------*/
var lblEscritorio1 = $("#escritorio1");
var lblEscritorio2 = $("#escritorio2");
var lblEscritorio3 = $("#escritorio3");
var lblEscritorio4 = $("#escritorio4");
var lblEscritorio5 = $("#escritorio5");
var lblEscritorio6 = $("#escritorio6");
var lblEscritorio7 = $("#escritorio7");
var lblEscritorio8 = $("#escritorio8");

var lblEscritorios = [lblEscritorio1, lblEscritorio2, lblEscritorio3, lblEscritorio4, lblEscritorio5, lblEscritorio6, lblEscritorio7, lblEscritorio8];


$(document).ready(function () {
socket.on('Escritorios', function(data){  
ActualizarDOM(data.escritorios);
});

socket.on('Actualizar', function(data){  
if(data.estado == true){    
$(`#escritorio${data.numero}`).html(`Escritorio ${data.numero} </br> (En Uso)`);
}else{
$(`#escritorio${data.numero}`).html(`Escritorio ${data.numero} </br> (Sin Usar)`); 
}
});

});



function ActualizarDOM(escritorios){
for(var i = 0; i <= escritorios.length -1; i++){
if(escritorios[i].status == false){
lblEscritorios[i].html(`Escritorio ${escritorios[i].numero} </br> (Sin Usar)`);
}else{
lblEscritorios[i].html(`Escritorio ${escritorios[i].numero} </br> (En Uso)`);
}
}    
}


// funcion para recibir parametros del escritorio
function enviar(numero, status){
socket.emit('ActualizarData', {
numero: numero,
status: status
});
window.location = `escritorio.html?escritorio=${numero}`;   
}






    