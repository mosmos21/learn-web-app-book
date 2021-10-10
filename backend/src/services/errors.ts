export class AuthenticationError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = AuthenticationError.name;
  }
}

export class ServiceError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = ServiceError.name;
  }
}

export class InternalServerError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = InternalServerError.name;
  }
}
