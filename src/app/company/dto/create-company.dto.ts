import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class CreateCompanyDto {

  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(100)
  name: string;

  @IsNotEmpty()
  @MinLength(14)
  @MaxLength(14)
  cnpj: string;
}
