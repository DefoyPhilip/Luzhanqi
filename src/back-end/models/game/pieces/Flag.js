import Piece from './Piece';

export const FLAG_VALUE = 0;

class Flag extends Piece {
  constructor() {
    super();
    this.value = FLAG_VALUE;
  }
}

export default Flag;
