export class CreateProductDto {
  name: string;
  trader_comme: string;
  cod_reference?: string;
  qnts_item: string;
  value_sale: string;
  data_fabrication: string;
  due_date?: string;
    companyId: number;
}
