import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class CreateProductDto {

  @IsNotEmpty()
  @MaxLength(100)
  @MinLength(3)
  name: string;

  @IsNotEmpty()
  @MaxLength(100)
  @MinLength(3)
  trader_comme: string;

  cod_reference?: string;

  @IsNotEmpty()
  qnts_item: string;

  @IsNotEmpty()
  value_sale: string;

  @IsNotEmpty()
  data_fabrication: string;

  due_date?: string;
    @IsNotEmpty()
    companyId: number;
}
