var socket = io();
var label = $('#lblNuevoTicket');

socket.on('connect', function () {
	console.log('Conectado al servidor');
});

socket.on('disconnect', function () {
	console.log('desconectado del servidor');
});

socket.on('estadoActual', function (response) {
	label.text(response.actual);
});

$('button').on('click', function () {
	socket.emit('siguienteTicket', null, function (siguienteTicket) {
		label.text(siguienteTicket);
	});
});
