import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateInvitationDto } from './dto/create-invitation.dto';
import { ResponseDto } from './dto/response.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Post('/create')
  async createInvitado(@Body() dto: CreateInvitationDto): Promise<ResponseDto> {
    return await this.appService.crearInvitados(dto);
  }
}
