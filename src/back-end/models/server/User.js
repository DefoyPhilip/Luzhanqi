import uniqid from 'uniqid';

class User {
  constructor() {
    this.id = uniqid();
    this.name = `user-${this.id.slice(-4)}`;
  }
}

export default User;
