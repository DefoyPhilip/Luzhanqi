import Piece from './Piece';

export const MARSHALL_VALUE = 9;

class Marshall extends Piece {
  constructor() {
    super();
    this.value = MARSHALL_VALUE;
  }
}

export default Marshall;
