export interface IUser {
  id: number;
  code: string;
  firstname: string;
  lastname: string;
  imgUrl: string;
  email: string;
  phoneNumber: number;
  address: Address;
  place: string;
  municipality: string;
  town: string;
  ytLink: string;
  igLink: string;
  fbLink: string;
  linkedLink: string;
  jobPosition: string;
  myDescription: string;
}

export interface Address {
  street: string;
  hausNumber: number;
}
