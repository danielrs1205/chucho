export class ValidadorReglas {
  // Verifica si la carta que el jugador intenta tirar es legal
  static validarJugada(cartaJugada, manoJugador, paloDecidido) {
    // Si es la primera carta de la ronda, cualquier carta es válida y decide el palo
    if (!paloDecidido) {
      return { valida: true, sancion: false };
    }

    // Si tira del mismo palo decidido, es una jugada perfecta
    if (cartaJugada.palo === paloDecidido) {
      return { valida: true, sancion: false };
    }

    // Si tira de otro palo, verificamos si está cometiendo una infracción
    const tienePaloDecidido = manoJugador.some(carta => carta.palo === paloDecidido);
    
    if (tienePaloDecidido) {
      // Sanción estricta: tiene cartas del palo pero decidió no usarlas
      return { 
        valida: false, 
        sancion: true, 
        mensaje: "Sanción: -1 punto. Tienes cartas del palo obligatorio en tu mano." 
      };
    }

    // Es válida si lanza otro palo porque NO posee ninguna del palo decidido
    return { valida: true, sancion: false };
  }

  // Determina quién se lleva las cartas de la mesa al final de la ronda
  static determinarGanadorRonda(jugadasEnMesa, paloDecidido) {
    let cartaGanadora = null;
    let poderMaximo = -1;
    let indiceGanador = -1;

    // Solo compiten las cartas que respeten el palo decidido
    jugadasEnMesa.forEach((jugada, index) => {
      if (jugada.carta.palo === paloDecidido) {
        if (jugada.carta.poder > poderMaximo) {
          poderMaximo = jugada.carta.poder;
          cartaGanadora = jugada.carta;
          indiceGanador = index;
        }
      }
    });

    // Retorna el índice del jugador que ganó para asignarle el pozo
    return { cartaGanadora, indiceGanador };
  }
}