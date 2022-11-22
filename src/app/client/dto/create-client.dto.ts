import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class CreateClientDto {
  id: number;

  @IsNotEmpty()
  @MaxLength(100)
  @MinLength(3)
  name: string;

  @IsNotEmpty()
  @MaxLength(11)
  @MinLength(11)
  cpf: string;
}
