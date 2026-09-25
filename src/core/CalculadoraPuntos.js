export class CalculadoraPuntos {
  static calcularPuntosPozo(pozoCartas) {
    let cantidadAses = 0;
    let cantidadCartasGrupo = 0;

    pozoCartas.forEach(carta => {
      if (carta.esAs) {
        cantidadAses += 1;
      } else if (carta.esGrupoEspecial) {
        cantidadCartasGrupo += 1;
      }
    });

    // Un punto por As, sin mezclar.
    const puntosPorAses = cantidadAses;
    
    // Un punto por cada 3 cartas del grupo especial.
    const puntosPorGrupo = Math.floor(cantidadCartasGrupo / 3);

    return {
      puntosGanados: puntosPorAses + puntosPorGrupo,
      desglose: {
        ases: puntosPorAses,
        grupos: puntosPorGrupo
      }
    };
  }

  static verificarEstadoPartida(puntuacionTotal, puntosPartidaActual) {
    // Si un bando se lleva los 10 puntos de la partida en una sola sentada
    if (puntosPartidaActual === 10) {
      return { finDeJuego: true, ganadorDefinitivo: true, motivo: "¡Cayó el burro!" };
    }
    
    // Condición de victoria normal
    if (puntuacionTotal >= 21) {
      return { finDeJuego: true, ganadorDefinitivo: true, motivo: "Alcanzó 21 puntos." };
    }
    
    return { finDeJuego: false };
  }
}