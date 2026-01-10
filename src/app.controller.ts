import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateInvitationDto } from './dto/create-invitation.dto';
import { ResponseDto } from './dto/response.dto';
import { ResponseGetAllDto } from './dto/responseGetAll.dto';
import { ResponseDeleteDto } from './dto/responseDelete.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Post('/create')
  async createInvitado(@Body() dto: CreateInvitationDto): Promise<ResponseDto> {
    return await this.appService.crearInvitados(dto);
  }

  @Get('/get')
  async getInvitados(): Promise<ResponseGetAllDto> {
    return await this.appService.getAllInvitados();
  }

  @Delete("/delete/:id")
  async deleteInvitado(@Param('id') id: string): Promise<ResponseDeleteDto> {
    return await this.appService.deleteInvitado(id);
  }
}

