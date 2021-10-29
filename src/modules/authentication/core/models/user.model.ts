export class User {
  readonly username: string;
  readonly email: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly authToken: string;
  readonly authenticated: boolean;

  constructor(
    username?: string,
    email?: string,
    firstName?: string,
    lastName?: string,
    authToken?: string,
    authenticated?: boolean
  ) {
    this.username = username || '';
    this.email = email || '';
    this.firstName = firstName || '';
    this.lastName = lastName || '';
    this.authToken = authToken || '';
    this.authenticated = authenticated || false;
  }

  public clone(): User {
    return new User(this.username, this.email, this.firstName, this.lastName, this.authToken, this.authenticated);
  }
}
