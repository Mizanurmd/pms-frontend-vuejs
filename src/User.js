export default class User {
    constructor(id, username, email, role, password, tokens = [], ownedProjects = [], memberOfProjects = []) {
      this.id = id;
      this.username = username;
      this.email = email;
      this.role = role;
      this.password = password;
      this.tokens = tokens;
      this.ownedProjects = ownedProjects;
      this.memberOfProjects = memberOfProjects;
    }
  }
  