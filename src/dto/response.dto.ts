import { IsBoolean, IsJSON } from "class-validator"

export class ResponseDto {
    @IsBoolean()
    duplicated: boolean

    @IsJSON()
    data: any
}