import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateInvitationDto {

    @IsString()
    @IsOptional()
    familia?: string;

    @IsOptional()
    @IsString()
    alias?: string;

    @IsNumber()
    @IsOptional()
    cantidad?: number;

}