
export class CreateProfileDto {

  firstname: string

  lastname: string;

  dateOfBirth: Date;

  email: string;


  constructor(firstname: string, lastname: string, dateOfBirth: Date, email: string) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.dateOfBirth = dateOfBirth;
    this.email = email;
  }
}
