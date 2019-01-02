import Brigadier from '../src/back-end/models/pieces/Brigadier';
import Captain from '../src/back-end/models/pieces/Captain';
import Colonel from '../src/back-end/models/pieces/Colonel';
import Commander from '../src/back-end/models/pieces/Commander';
import Engineer from '../src/back-end/models/pieces/Engineer';
import Flag from '../src/back-end/models/pieces/Flag';
import General from '../src/back-end/models/pieces/General';
import Grenade from '../src/back-end/models/pieces/Grenade';
import Landmine from '../src/back-end/models/pieces/Landmine';
import Lieutenant from '../src/back-end/models/pieces/Lieutenant';
import Major from '../src/back-end/models/pieces/Major';
import Marshall from '../src/back-end/models/pieces/Marshall';
import Fight from '../src/back-end/models/Fight';

describe('Test pieces fight result', () => {
  const brigadier = new Brigadier();
  const captain = new Captain();
  const colonel = new Colonel();
  const commander = new Commander();
  const engineer = new Engineer();
  const flag = new Flag();
  const general = new General();
  const grenade = new Grenade();
  const landmine = new Landmine();
  const lieutenant = new Lieutenant();
  const major = new Major();
  const marshall = new Marshall();
  describe('when a piece attack a flag', () => {
    it('should win', () => {
      expect(Fight.test(brigadier, flag)).toEqual(1);
      expect(Fight.test(captain, flag)).toEqual(1);
      expect(Fight.test(colonel, flag)).toEqual(1);
      expect(Fight.test(commander, flag)).toEqual(1);
      expect(Fight.test(engineer, flag)).toEqual(1);
      expect(Fight.test(general, flag)).toEqual(1);
      expect(Fight.test(grenade, flag)).toEqual(1);
      expect(Fight.test(lieutenant, flag)).toEqual(1);
      expect(Fight.test(major, flag)).toEqual(1);
      expect(Fight.test(marshall, flag)).toEqual(1);
      expect(Fight.test(flag, brigadier)).toEqual(2);
      expect(Fight.test(flag, captain)).toEqual(2);
      expect(Fight.test(flag, colonel)).toEqual(2);
      expect(Fight.test(flag, commander)).toEqual(2);
      expect(Fight.test(flag, engineer)).toEqual(2);
      expect(Fight.test(flag, general)).toEqual(2);
      expect(Fight.test(flag, grenade)).toEqual(2);
      expect(Fight.test(flag, lieutenant)).toEqual(2);
      expect(Fight.test(flag, major)).toEqual(2);
      expect(Fight.test(flag, marshall)).toEqual(2);
    });
  });
  describe('when attacking a landmine', () => {
    it('should win if it\'s an engineer', () => {
      expect(Fight.test(engineer, landmine)).toEqual(1);
      expect(Fight.test(landmine, engineer)).toEqual(2);
    });
    it('should lose if it\'s not an engineer', () => {
      expect(Fight.test(brigadier, landmine)).toEqual(2);
      expect(Fight.test(captain, landmine)).toEqual(2);
      expect(Fight.test(colonel, landmine)).toEqual(2);
      expect(Fight.test(commander, landmine)).toEqual(2);
      expect(Fight.test(general, landmine)).toEqual(2);
      expect(Fight.test(lieutenant, landmine)).toEqual(2);
      expect(Fight.test(major, landmine)).toEqual(2);
      expect(Fight.test(marshall, landmine)).toEqual(2);
      expect(Fight.test(landmine, brigadier)).toEqual(1);
      expect(Fight.test(landmine, captain)).toEqual(1);
      expect(Fight.test(landmine, colonel)).toEqual(1);
      expect(Fight.test(landmine, commander)).toEqual(1);
      expect(Fight.test(landmine, general)).toEqual(1);
      expect(Fight.test(landmine, lieutenant)).toEqual(1);
      expect(Fight.test(landmine, major)).toEqual(1);
      expect(Fight.test(landmine, marshall)).toEqual(1);
    });
  });
  describe('when a piece attack a grenade', () => {
    it('should be even', () => {
      expect(Fight.test(brigadier, grenade)).toEqual(0);
      expect(Fight.test(captain, grenade)).toEqual(0);
      expect(Fight.test(colonel, grenade)).toEqual(0);
      expect(Fight.test(commander, grenade)).toEqual(0);
      expect(Fight.test(engineer, grenade)).toEqual(0);
      expect(Fight.test(general, grenade)).toEqual(0);
      expect(Fight.test(lieutenant, grenade)).toEqual(0);
      expect(Fight.test(major, grenade)).toEqual(0);
      expect(Fight.test(marshall, grenade)).toEqual(0);
      expect(Fight.test(landmine, grenade)).toEqual(0);
      expect(Fight.test(grenade, brigadier)).toEqual(0);
      expect(Fight.test(grenade, captain)).toEqual(0);
      expect(Fight.test(grenade, colonel)).toEqual(0);
      expect(Fight.test(grenade, commander)).toEqual(0);
      expect(Fight.test(grenade, engineer)).toEqual(0);
      expect(Fight.test(grenade, general)).toEqual(0);
      expect(Fight.test(grenade, lieutenant)).toEqual(0);
      expect(Fight.test(grenade, major)).toEqual(0);
      expect(Fight.test(grenade, marshall)).toEqual(0);
      expect(Fight.test(grenade, landmine)).toEqual(0);
    });
  });
  describe('when a piece attack another piece', () => {
    it('should win if it\'s value is higher', () => {
      // marshall
      expect(Fight.test(marshall, brigadier)).toEqual(1);
      expect(Fight.test(marshall, captain)).toEqual(1);
      expect(Fight.test(marshall, colonel)).toEqual(1);
      expect(Fight.test(marshall, commander)).toEqual(1);
      expect(Fight.test(marshall, engineer)).toEqual(1);
      expect(Fight.test(marshall, general)).toEqual(1);
      expect(Fight.test(marshall, lieutenant)).toEqual(1);
      expect(Fight.test(marshall, major)).toEqual(1);
      expect(Fight.test(brigadier, marshall)).toEqual(2);
      expect(Fight.test(captain, marshall)).toEqual(2);
      expect(Fight.test(colonel, marshall)).toEqual(2);
      expect(Fight.test(commander, marshall)).toEqual(2);
      expect(Fight.test(engineer, marshall)).toEqual(2);
      expect(Fight.test(general, marshall)).toEqual(2);
      expect(Fight.test(lieutenant, marshall)).toEqual(2);
      expect(Fight.test(major, marshall)).toEqual(2);
      // general
      expect(Fight.test(general, brigadier)).toEqual(1);
      expect(Fight.test(general, captain)).toEqual(1);
      expect(Fight.test(general, colonel)).toEqual(1);
      expect(Fight.test(general, commander)).toEqual(1);
      expect(Fight.test(general, engineer)).toEqual(1);
      expect(Fight.test(general, lieutenant)).toEqual(1);
      expect(Fight.test(general, major)).toEqual(1);
      expect(Fight.test(brigadier, general)).toEqual(2);
      expect(Fight.test(captain, general)).toEqual(2);
      expect(Fight.test(colonel, general)).toEqual(2);
      expect(Fight.test(commander, general)).toEqual(2);
      expect(Fight.test(engineer, general)).toEqual(2);
      expect(Fight.test(lieutenant, general)).toEqual(2);
      expect(Fight.test(major, general)).toEqual(2);
      // lieutenant
      expect(Fight.test(lieutenant, brigadier)).toEqual(1);
      expect(Fight.test(lieutenant, captain)).toEqual(1);
      expect(Fight.test(lieutenant, colonel)).toEqual(1);
      expect(Fight.test(lieutenant, commander)).toEqual(1);
      expect(Fight.test(lieutenant, engineer)).toEqual(1);
      expect(Fight.test(lieutenant, major)).toEqual(1);
      expect(Fight.test(brigadier, lieutenant)).toEqual(2);
      expect(Fight.test(captain, lieutenant)).toEqual(2);
      expect(Fight.test(colonel, lieutenant)).toEqual(2);
      expect(Fight.test(commander, lieutenant)).toEqual(2);
      expect(Fight.test(engineer, lieutenant)).toEqual(2);
      expect(Fight.test(major, lieutenant)).toEqual(2);
      //bridagier
      expect(Fight.test(brigadier, captain)).toEqual(1);
      expect(Fight.test(brigadier, colonel)).toEqual(1);
      expect(Fight.test(brigadier, commander)).toEqual(1);
      expect(Fight.test(brigadier, engineer)).toEqual(1);
      expect(Fight.test(brigadier, major)).toEqual(1);
      expect(Fight.test(captain, brigadier)).toEqual(2);
      expect(Fight.test(colonel, brigadier)).toEqual(2);
      expect(Fight.test(commander, brigadier)).toEqual(2);
      expect(Fight.test(engineer, brigadier)).toEqual(2);
      expect(Fight.test(major, brigadier)).toEqual(2);
      // colonel
      expect(Fight.test(colonel, captain)).toEqual(1);
      expect(Fight.test(colonel, commander)).toEqual(1);
      expect(Fight.test(colonel, engineer)).toEqual(1);
      expect(Fight.test(colonel, major)).toEqual(1);
      expect(Fight.test(captain, colonel)).toEqual(2);
      expect(Fight.test(commander, colonel)).toEqual(2);
      expect(Fight.test(engineer, colonel)).toEqual(2);
      expect(Fight.test(major, colonel)).toEqual(2);
      // major
      expect(Fight.test(major, captain)).toEqual(1);
      expect(Fight.test(major, commander)).toEqual(1);
      expect(Fight.test(major, engineer)).toEqual(1);
      expect(Fight.test(captain, major)).toEqual(2);
      expect(Fight.test(commander, major)).toEqual(2);
      expect(Fight.test(engineer, major)).toEqual(2);
      // captain
      expect(Fight.test(captain, commander)).toEqual(1);
      expect(Fight.test(captain, engineer)).toEqual(1);
      expect(Fight.test(commander, captain)).toEqual(2);
      expect(Fight.test(engineer, captain)).toEqual(2);
      // commander
      expect(Fight.test(commander, engineer)).toEqual(1);
      expect(Fight.test(engineer, commander)).toEqual(2);
    });
    it('should be even if their value are even', () => {
      expect(Fight.test(brigadier, brigadier)).toEqual(0);
      expect(Fight.test(captain, captain)).toEqual(0);
      expect(Fight.test(colonel, colonel)).toEqual(0);
      expect(Fight.test(commander, commander)).toEqual(0);
      expect(Fight.test(engineer, engineer)).toEqual(0);
      expect(Fight.test(general, general)).toEqual(0);
      expect(Fight.test(lieutenant, lieutenant)).toEqual(0);
      expect(Fight.test(major, major)).toEqual(0);
      expect(Fight.test(marshall, marshall)).toEqual(0);
    });
  });
});
