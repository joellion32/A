var socket = io();


socket.on('connect', function(){
console.log('Servidor contectado');
});

socket.on('disconnect', function(){
$.smallBox({
  title:"Error",
  content:"Desconexion con el servidor",
  fa:"fa-star-o",
  timeout:4000,
});
});


// para obtener parametros desde el navegador
var searchParams = new URLSearchParams(window.location.search);

if(!searchParams.has('escritorio')){
window.location = "index.html";    
throw new Error('El escritorio es necesario');
}
 var escritorio = searchParams.get('escritorio');
 $("h1").text("Escritorio " + escritorio);

$("#atender").on('click', function() { 
   socket.emit('atenderTicket', {escritorio: escritorio}, function(resp){

    if(resp === 'No hay tickets'){
    $("small").text(resp);
     alert(resp);
     return    
    }
    $("small").text(resp.numero);
    });
});


// function para cerrar escritorio
$("#cerrar").on('click', function (numero, status) {
numero = escritorio;
status = false;
socket.emit('ActualizarData2', {
numero: numero,
status: status
});
window.location = "/";
});
 
