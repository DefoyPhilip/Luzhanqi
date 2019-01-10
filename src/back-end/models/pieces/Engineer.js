import Piece from './Piece';

export const ENGINEER_VALUE = 1;

class Engineer extends Piece {
  constructor() {
    super();
    this.value = ENGINEER_VALUE;
  }
}

export default Engineer;
