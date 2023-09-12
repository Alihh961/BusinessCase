import {Iaddress} from "./Address";

export interface UserInscription {

  firstName: string,
  lastName: string,
  email: string,
  password: string,
  confPassword: string,
  dateOfBirth: Date | null,
  gender: string,
  address: Iaddress
}

export interface UserLogin {
  username: string,
  password: string
}

export interface User {
  id: number,
  email: string;
  firstName: string,
  lastName: string,
  gender: string,
  address: Iaddress,
  dateOfBirth: Date | null,
  isVerified: boolean,
}

export interface UserEdit {
  firstName : string ,
  lastName : string ,
  password : string,
}
