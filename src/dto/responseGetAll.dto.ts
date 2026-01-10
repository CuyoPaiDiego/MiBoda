import { IsBoolean, IsJSON } from "class-validator"

export class ResponseGetAllDto {
    @IsBoolean()
    ok: boolean

    @IsJSON()
    data: any
}