const fs = require('fs');

class Ticket {
	constructor(numero, escritorio) {
		this.numero = numero;
		this.escritorio = escritorio;
	}
}

class TicketControl {
	constructor() {
		this.ultimo = 0;
		this.hoy = new Date().getDate();
		this.tickets = [];
		this.ultimosCuatro = [];

		let data = require('../data/data.json');

		if (data.hoy === this.hoy) {
			this.ultimo = data.ultimo;
			this.tickets = data.tickets;
			this.ultimosCuatro = data.ultimosCuatro;
		} else {
			this.reiniciarConteo();
		}
	}

	siguienteTicket() {
		this.ultimo += 1;
		let ticket = new Ticket(this.ultimo, null);
		this.tickets.push(ticket);

		this.grabarArchivo();
		return `Ticket ${this.ultimo}`;
	}

	getUltimoTicket() {
		return `Ticket ${this.ultimo}`;
	}

	getUltimosCuatro() {
		return this.ultimosCuatro;
	}

	// Recibo un escritorio como argumento/parametro
	atenderTicket(escritorio) {
		// verifico que haya tickets pendientes de atender
		if (this.tickets.length === 0) {
			return 'No hay tickets';
		}

		// extraigo el numero para evitar el problema de que todos los obj son
		// pasados por referencias
		let numeroTicket = this.tickets[0].numero;

		// Shift: elimino el primer elemento de un array
		this.tickets.shift();
		let atenderTicket = new Ticket(numeroTicket, escritorio);

		// Unshift: agrego lo que envipo como parametro al principio del array
		this.ultimosCuatro.unshift(atenderTicket);

		if (this.ultimosCuatro.length > 4) {
			// splice(-1,1) elimino el ultimo elemento del array
			this.ultimosCuatro.splice(-1, 1);
		}

		console.log('ultimos cuatro', this.ultimosCuatro);

		this.grabarArchivo();

		return atenderTicket;
	}

	reiniciarConteo() {
		this.ultimo = 0;
		this.tickets = [];
		this.ultimosCuatro = [];
		this.grabarArchivo();
	}

	grabarArchivo() {
		let jsonData = {
			ultimo: this.ultimo,
			hoy: this.hoy,
			tickets: this.tickets,
			ultimosCuatro: this.ultimosCuatro,
		};

		let jsonDataString = JSON.stringify(jsonData);
		fs.writeFileSync('./server/data/data.json', jsonDataString);
		console.log('Se ha inicializado el sistema');
	}
}

module.exports = {
	TicketControl,
};
