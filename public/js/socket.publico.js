var socket = io();

var pantallas = [];


var lblTicket1 = $("#lblTicket1");
var lblTicket2 = $("#lblTicket2");
var lblTicket3 = $("#lblTicket3");
var lblTicket4 = $("#lblTicket4");

var lblEscritorio1 = $("#lblEscritorio1");
var lblEscritorio2 = $("#lblEscritorio2");
var lblEscritorio3 = $("#lblEscritorio3");
var lblEscritorio4 = $("#lblEscritorio4");

var lblTickets = [lblTicket1, lblTicket2, lblTicket3, lblTicket4];
var lblEscritorios = [lblEscritorio1, lblEscritorio2, lblEscritorio3, lblEscritorio4];


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

// escuchar para poder el ultimo
socket.on('ultimoTicket', function(data) {   
var audio = new Audio('audio/new-ticket.mp3');
audio.play();
ActualizarHTML(data.ultimos4);
});

// escuchar para poder mostrar los ultimos 4
socket.on('ultimos4', function(data){
var audio = new Audio('audio/new-ticket.mp3');
audio.play();
ActualizarHTML(data.ultimos4);
});


function ActualizarHTML(ultimos4){
 for (var i = 0; i <= ultimos4.length -1; i++) {
    lblTickets[i].text('Ticket ' + ultimos4[i].numero);
    lblEscritorios[i].text('Escritorio ' + ultimos4[i].escritorio);
 }
  var ultimoticket = ultimos4[0].numero;
  var ultimoescritorio = ultimos4[0].escritorio;

 speechSynthesis.speak(new SpeechSynthesisUtterance(`Ticket ${ultimoticket} escritorio ${ultimoescritorio}`));
 speechSynthesis.speak(new SpeechSynthesisUtterance(`Ticket ${ultimoticket} escritorio ${ultimoescritorio}`));    
}



