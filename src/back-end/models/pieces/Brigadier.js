import Piece from './Piece';

export const BRIGADIER_VALUE = 6;

class Brigadier extends Piece {
  constructor() {
    super();
    this.value = BRIGADIER_VALUE;
  }
}

export default Brigadier;
