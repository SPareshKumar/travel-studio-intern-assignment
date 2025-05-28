import { IsString, IsNotEmpty, IsOptional, IsDateString } from 'class-validator';

export class CreateRequestDto {
  @IsString()
  @IsNotEmpty()
  guestPhone: string;

  @IsString()
  @IsNotEmpty()
  requestText: string;

  @IsOptional()
  @IsDateString()
  createdAt: Date;

  @IsString()
  @IsOptional()
  status: string;
}

