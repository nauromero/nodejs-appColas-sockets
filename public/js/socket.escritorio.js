var socket = io();

var searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has('escritorio')) {
	window.location = 'index.html';

	// Como no estoy dentro de una funcion, no puedo salir con un return
	throw new Error('El escritorio es necesario');
}

var escritorio = searchParams.get('escritorio');
var label = $('small');
console.log(escritorio);

$('h1').text(`Escritorio ${escritorio}`);

$('button').on('click', function () {
	// acá mando desde la url el parametro escritorio al socket del back
	socket.emit('atenderTicket', { escritorio }, function (response) {
		//la respuesta puede recibir el error seteado en el socket del servidor
		// si es correcto tengo un ticket
		console.log(response);
		if (response === 'No hay tickets') {
			alert(response);
			label.text(response);
			return;
		}
		label.text(response.numero);
	});
});
