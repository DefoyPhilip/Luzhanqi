import Piece from './Piece';

export const MAJOR_VALUE = 4;

class Major extends Piece {
  constructor() {
    super();
    this.value = MAJOR_VALUE;
  }
}

export default Major;
