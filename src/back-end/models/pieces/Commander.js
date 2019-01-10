import Piece from './Piece';

export const COMMANDER_VALUE = 2;

class Commander extends Piece {
  constructor() {
    super();
    this.value = COMMANDER_VALUE;
  }
}

export default Commander;
