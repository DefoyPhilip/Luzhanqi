import Piece from './Piece';

export const COLONEL_VALUE = 5;

class Colonel extends Piece {
  constructor() {
    super();
    this.value = COLONEL_VALUE;
  }
}

export default Colonel;
