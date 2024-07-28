import { StatusCodes } from "http-status-codes";
import CustomAPIError from "./custom-api";

export default class NotFoundError extends CustomAPIError {
  statusCode;
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.NOT_FOUND;
  }
}
