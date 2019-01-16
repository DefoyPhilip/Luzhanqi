import Piece from './Piece';

export const GRENADE_VALUE = 10;

class Grenade extends Piece {
  constructor() {
    super();
    this.value = 10;
  }
}

export default Grenade;
