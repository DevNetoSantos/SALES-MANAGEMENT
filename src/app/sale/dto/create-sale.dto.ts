import { IsNotEmpty } from 'class-validator';

export class CreateSaleDto {

  @IsNotEmpty()
  qts_product: string;

  @IsNotEmpty()
  pay_value: string;

    @IsNotEmpty()
    clientId: number;

    @IsNotEmpty()
    employeeId: number;

    @IsNotEmpty()
    productId: number;
}
