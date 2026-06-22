import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateInvitationDto {

    @IsString()
    familia: string;

    @IsOptional()
    @IsString()
    alias?: string;

    @IsNumber()
    cantidad: number;

    @IsString()
    evento: string;
}