import Piece from './Piece';

export const LANDMINE_VALUE = 11;

class Landmine extends Piece {
  constructor() {
    super();
    this.value = LANDMINE_VALUE;
  }
}

export default Landmine;
