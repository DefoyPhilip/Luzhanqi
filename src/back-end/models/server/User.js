import uniqid from 'uniqid';

class User {
  constructor() {
    this.id = uniqid();
    this.name = `user-${this.id.slice(-4)}`;
    this.isReadyWith = '';
  }
}

export default User;
