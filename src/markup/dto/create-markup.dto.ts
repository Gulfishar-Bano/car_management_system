import { IsIn, IsNumber, Min } from 'class-validator';

export class CreateMarkupDto {
  @IsIn(['percentage', 'fixed'])
  type: 'percentage' | 'fixed';

  @IsNumber()
  @Min(0)
  value: number;
}
