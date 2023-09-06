import {Iaddress} from "./Address";

export interface UserInscription {

  firstname: string,
  lastname: string,
  email: string,
  password: string,
  passwordconfirmation: string,
  birthdate: Date | null,
  street: string,
  buildingnumber: string,
  gender: string,

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
