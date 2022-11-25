import { IsEmail, IsNotEmpty, IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class CreateEmployeeDto {
  id: string;

  @IsNotEmpty()
  @MaxLength(100)
  @MinLength(3)
  name: string;

  @IsNotEmpty()
  @MaxLength(100)
  @MinLength(3)
  lastname: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  password: string;

  constructor(employee?: Partial<CreateEmployeeDto>) {
    this.id = employee?.id;
    this.name = employee?.name;
    this.lastname = employee?.lastname;
    this.email = employee?.email;
    this.password = employee?.password;
  }
}
