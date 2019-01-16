import Piece from './Piece';

export const LIEUTENANT_VALUE = 7;

class Lieutenant extends Piece {
  constructor() {
    super();
    this.value = LIEUTENANT_VALUE;
  }
}

export default Lieutenant;
