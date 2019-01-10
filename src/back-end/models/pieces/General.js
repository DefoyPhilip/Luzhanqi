import Piece from './Piece';

export const GENERAL_VALUE = 8;

class General extends Piece {
  constructor() {
    super();
    this.value = GENERAL_VALUE;
  }
}

export default General;
