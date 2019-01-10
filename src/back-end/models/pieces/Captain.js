import Piece from './Piece';

export const CAPTAIN_VALUE = 3;

class Captain extends Piece {
  constructor() {
    super();
    this.value = CAPTAIN_VALUE;
  }
}

export default Captain;
