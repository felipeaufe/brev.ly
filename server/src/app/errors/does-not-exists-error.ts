import { BaseError } from "./base-error";

export class DoesNotExistsError extends BaseError {
  constructor() {
    super("O link curto informado não existe.", 404);
  }
}
