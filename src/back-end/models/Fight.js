import { ENGINEER_VALUE } from './pieces/Engineer';
import { FLAG_VALUE } from './pieces/Flag';
import { GRENADE_VALUE } from './pieces/Grenade';
import { LANDMINE_VALUE } from './pieces/Landmine';

class Fight {
  static test(a, b) {
    if (a.value === FLAG_VALUE || (b.value === ENGINEER_VALUE && a.value === LANDMINE_VALUE)) {
      return 2;
    }
    if (b.value === FLAG_VALUE || (a.value === ENGINEER_VALUE && b.value === LANDMINE_VALUE)) {
      return 1;
    }
    if (a.value === GRENADE_VALUE || b.value === GRENADE_VALUE) {
      return 0;
    }
    if (a.value > b.value) {
      return 1;
    }
    if (a.value === b.value) {
      return 0;
    }
    return 2;
  }
}

export default Fight;
