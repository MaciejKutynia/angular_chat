import {LoginRequestInterface} from "./login.interface";

export interface RegisterRequestInterface extends LoginRequestInterface {
  email: string
}
