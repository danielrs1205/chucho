// Jerarquía para ganar rondas: 3 > 2 > As > K > Q > J > 7 > 6 > 5 > 4
const JERARQUIA = {
  3: 10,  // El 3 le gana a todas las cartas
  2: 9,   // Solo el 3 le gana al 2
  1: 8,   // As (1)
  13: 7,  // K (Rey)
  12: 6,  // Q (Reina)
  11: 5,  // J
  7: 4,
  6: 3,
  5: 2,
  4: 1    // Cuña de menor valor
};

export class Carta {
  constructor(palo, numero) {
    this.palo = palo; // 'Picas', 'Corazones', 'Diamantes', 'Tréboles'
    this.numero = numero; // 1 al 7, 11 (J), 12 (Q), 13 (K)
    this.poder = JERARQUIA[numero];

    // Clasificación para el conteo de puntos al final de la partida
    this.esAs = numero === 1;
    this.esGrupoEspecial = [3, 2, 13, 12, 11].includes(numero); // Cartas (3, 2, K, Q, J)
    this.esCuna = [4, 5, 6, 7].includes(numero); // Cartas sin valor de punto ("cuñas")
  }
  
  getNombre() {
    const nombres = { 1: 'As', 11: 'J', 12: 'Q', 13: 'K' };
    const valor = nombres[this.numero] || this.numero;
    return `${valor} de ${this.palo}`;
  }
}
