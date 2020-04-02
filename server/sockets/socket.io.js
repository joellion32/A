const {io} = require('../../server/app');
const {TicketControl} = require('../classes/ticket-control');
const {Escritorios} = require('../classes/escritorios');

const ticket = new TicketControl();
const escritorio = new Escritorios();

// conexion desde el fronted
io.on('connection', (client) => {
console.log('Usuario conectado');    

client.on('disconnect', () => {
console.log('usuario desconectado');
});

client.on('siguienteTicket', (data, callback) =>{
let nuevoticket = ticket.siguienteTicket();
callback(nuevoticket);
});


// emitir el evento ultimo ticket
client.emit('ultimoTicket', {
ultimo:  ticket.ultimoTicket(),
ultimos4: ticket.Ultimos4()
});


// atender ticket
client.on('atenderTicket', (data, callback) => {
if(!data.escritorio){
return callback ({
error: true,
mensaje: 'Error falta el escritorio'    
});    
}

let atenderTicket = ticket.AtenderTicket(data.escritorio);
callback(atenderTicket);

// para que todos los usuarios vean la informacion
client.broadcast.emit('ultimos4', {
ultimos4: ticket.Ultimos4()
});
});



/*----------------------------Escritorios-----------------------------------------------*/

// mandar todos los escritorios
client.emit('Escritorios', {
escritorios: escritorio.getEscritorios()    
});


client.on('ActualizarData', (data) => {   
client.broadcast.emit('Actualizar', {
numero: data.numero, 
estatus: data.status,    
status: escritorio.ActualizarEscritorio(data.numero, data.status)
});    
});

client.on('ActualizarData2', (data) => {   
client.broadcast.emit('Actualizar2', {
numero: data.numero, 
estatus: data.status,    
status: escritorio.ActualizarEscritorio(data.numero, data.status)
});    
});


}); // cierre del ion
