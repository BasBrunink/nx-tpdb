
export class CreateProfileDto {

  firstname: string

  lastname: string;

  dateofBirth: Date;

  email: string;


  constructor(firstname: string, lastname: string, dateofBirth: Date, email: string) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.dateofBirth = dateofBirth;
    this.email = email;
  }
}
