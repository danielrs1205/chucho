export class Jugador {
  constructor(id, nombre, equipo) {
    this.id = id;
    this.nombre = nombre;
    this.equipo = equipo; // Si juegan 4, los equipos son 1 o 2. Si juegan 3, cada uno es su propio equipo.
    this.mano = [];
    this.pozo = []; // Aquí guardamos las cartas que gana al llevarse una ronda
    this.puntosTotales = 0; // Puntos históricos acumulados para llegar a 21
  }

  recibirCartas(cartas) {
    this.mano = cartas;
  }

  jugarCarta(index) {
    // Retira la carta de la mano para jugarla en la mesa
    return this.mano.splice(index, 1)[0];
  }

  ganarRonda(cartasDeLaMesa) {
    // Guarda las cartas ganadas en su pozo
    this.pozo.push(...cartasDeLaMesa);
  }
}