import { BaseError } from "./base-error";

export class AlreadyExistsError extends BaseError {
  constructor() {
    super("Já existe uma url encurtada com esse nome.", 409);
  }
}
