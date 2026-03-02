import { IsBoolean, IsJSON } from "class-validator"

export class ResponsePutDto {
    @IsBoolean()
    ok: boolean

    @IsJSON()
    data: any
}