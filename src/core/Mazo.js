import { Carta } from './Carta.js';

const PALOS = ['Picas', 'Corazones', 'Diamantes', 'Tréboles'];

export class Mazo {
    constructor(){
        this.cartas = [];
        this.crearMazo();
    }

    crearMazo(){
        this.cartas = [];
        const numerosValidos = [1, 2, 3, 4, 5, 6, 7, 11, 12, 13];

        for (const palo of PALOS) {
            for (const numero of numerosValidos) {
        this.cartas.push(new Carta(palo, numero));
            }
        }
    }

    barajar() {
        for (let i = this.cartas.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.cartas[i], this.cartas[j]] = [this.cartas[j], this.cartas[i]];
        }
    }

    // Reparte las cartas según la modalidad seleccionada
  repartir(numJugadores) {
    this.crearMazo();
    this.barajar();

    if (numJugadores === 4) {
      // 4 Jugadores (en parejas): 10 cartas para cada uno
      return {
        manos: [
          this.cartas.slice(0, 10),
          this.cartas.slice(10, 20),
          this.cartas.slice(20, 30),
          this.cartas.slice(30, 40)
        ],
        cartaGuia: null
      };
    } else if (numJugadores === 3) {
      // 3 Jugadores (individual): 13 cartas para cada uno y 1 al medio como "guía"
      return {
        manos: [
          this.cartas.slice(0, 13),
          this.cartas.slice(13, 26),
          this.cartas.slice(26, 39)
        ],
        cartaGuia: this.cartas[39]
      };
    } else {
      throw new Error('El juego Chucho solo admite 3 o 4 jugadores.');
    }
  }
}