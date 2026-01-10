import { IsBoolean, IsJSON } from "class-validator"

export class ResponseDeleteDto {
    @IsBoolean()
    ok: boolean

    @IsJSON()
    data: any
}