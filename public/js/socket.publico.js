var socket = io();

var lblTicket2 = $('#lblTicket2');
var lblTicket1 = $('#lblTicket1');
var lblTicket3 = $('#lblTicket3');
var lblTicket4 = $('#lblTicket4');

var lblEscrititorio1 = $('#lblEscritorio1');
var lblEscrititorio2 = $('#lblEscritorio2');
var lblEscrititorio3 = $('#lblEscritorio3');
var lblEscrititorio4 = $('#lblEscritorio4');

var lblTickets = [lblTicket1, lblTicket2, lblTicket3, lblTicket4];
var lblEscritorios = [
	lblEscrititorio1,
	lblEscrititorio2,
	lblEscrititorio3,
	lblEscrititorio4,
];

// socket.on('estadoActual', function (data) {
// 	actualizaHTML(data.ultimosCuatro);
// });

socket.on('ultimosCuatro', function (data) {
	var audio = new Audio('audio/new-ticket.mp3');
	audio.play();
	actualizaHTML(data.ultimosCuatro);
});

function actualizaHTML(ultimosCuatro) {
	for (var i = 0; i <= ultimosCuatro.length; i++) {
		lblTickets[i].text('Ticket ' + ultimosCuatro[i].numero);
		lblEscritorios[i].text('Escritorio ' + ultimosCuatro[i].escritorio);
	}
}
