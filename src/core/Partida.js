import { Mazo } from './Mazo.js';
import { Jugador } from './Jugador.js';
import { ValidadorReglas } from './ValidadorReglas.js';
import { CalculadoraPuntos } from './CalculadoraPuntos.js';

export class Partida {
  constructor(numJugadores) {
    this.numJugadores = numJugadores;
    this.jugadores = this.crearJugadores(numJugadores);
    this.mazo = new Mazo();
    
    // Estado de la ronda actual
    this.turnoActual = 0; // Índice del jugador que debe tirar
    this.rondaActual = 1;
    this.maxRondas = numJugadores === 4 ? 10 : 13; // 10 rondas en parejas, 13 individual
    this.paloDecidido = null;
    this.cartasEnMesa = []; // Formato: { jugador: Jugador, carta: Carta }
  }

  crearJugadores(num) {
    const jugadores = [];
    for (let i = 0; i < num; i++) {
      // Si son 4, los jugadores 0 y 2 son el Equipo 1. Los 1 y 3 son el Equipo 2.
      const equipo = num === 4 ? (i % 2 === 0 ? 1 : 2) : i; 
      jugadores.push(new Jugador(i, `Jugador ${i + 1}`, equipo));
    }
    return jugadores;
  }

  iniciarPartida() {
    const reparto = this.mazo.repartir(this.numJugadores);
    this.jugadores.forEach((jugador, i) => {
      jugador.recibirCartas(reparto.manos[i]);
    });

    if (this.numJugadores === 3) {
      // Lógica especial de 3 jugadores: carta guía en el medio
      this.cartasEnMesa.push({ jugador: null, carta: reparto.cartaGuia });
      this.paloDecidido = reparto.cartaGuia.palo;
    }
  }

  procesarTurno(indiceJugador, indiceCartaMano) {
    const jugador = this.jugadores[indiceJugador];
    const cartaIntentada = jugador.mano[indiceCartaMano];

    // 1. Validar si la jugada es legal o merece sanción
    const validacion = ValidadorReglas.validarJugada(cartaIntentada, jugador.mano, this.paloDecidido);
    
    if (validacion.sancion) {
      jugador.puntosTotales -= 1; // Se resta un punto al jugador/equipo por penalización
      return { exito: false, mensaje: validacion.mensaje };
    }

    // 2. Jugar la carta
    const cartaJugada = jugador.jugarCarta(indiceCartaMano);
    this.cartasEnMesa.push({ jugador: jugador, carta: cartaJugada });

    // Definir el palo si es el primero en tirar
    if (!this.paloDecidido) {
      this.paloDecidido = cartaJugada.palo;
    }

    // 3. Evaluar si la ronda terminó
    if (this.cartasEnMesa.length === this.numJugadores + (this.numJugadores === 3 ? 1 : 0)) {
      this.evaluarFinDeRonda();
    } else {
      // Pasar turno al siguiente
      this.turnoActual = (this.turnoActual + 1) % this.numJugadores;
    }

    return { exito: true };
  }

  evaluarFinDeRonda() {
    const resultado = ValidadorReglas.determinarGanadorRonda(this.cartasEnMesa, this.paloDecidido);
    const ganador = this.cartasEnMesa[resultado.indiceGanador].jugador;
    
    // Entregar todas las cartas de la mesa al pozo del ganador
    ganador.ganarRonda(this.cartasEnMesa.map(j => j.carta));

    // Limpiar mesa para la siguiente ronda
    this.cartasEnMesa = [];
    this.paloDecidido = null;
    this.rondaActual++;

    // El ganador inicia la siguiente ronda
    this.turnoActual = ganador.id;

    if (this.rondaActual > this.maxRondas) {
      this.terminarJuego();
    }
  }

  terminarJuego() {
    // Aquí invocaremos CalculadoraPuntos para evaluar el pozo de cada jugador y sumar.
    console.log("Fin de la partida. Hora de contar puntos.");
  }
}