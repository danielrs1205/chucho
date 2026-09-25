import { Mazo } from './core/Mazo.js';

const mazo = new Mazo();
const partida4 = mazo.repartir(4);
console.log('--- Reparto para 4 Jugadores ---');
console.log('Cartas Jugador 1:', partida4.manos[0].map(c => c.getNombre()));

const partida3 = mazo.repartir(3);
console.log('--- Reparto para 3 Jugadores ---');
console.log('Carta Guía en el centro:', partida3.cartaGuia.getNombre());