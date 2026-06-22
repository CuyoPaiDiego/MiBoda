import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateInvitationDto } from './dto/create-invitation.dto';
import { ResponseDto } from './dto/response.dto';
import { ResponseGetAllDto } from './dto/responseGetAll.dto';
import { ResponseDeleteDto } from './dto/responseDelete.dto';
import { UpdateInvitationDto } from './dto/update-invitation.dto';
import { ResponsePutDto } from './dto/responsePut.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Post('/create')
  async createInvitado(@Body() dto: CreateInvitationDto): Promise<ResponseDto> {
    return await this.appService.crearInvitados(dto);
  }

  @Put('/update/:id')
  async updateInvitado(@Body() dto: UpdateInvitationDto, @Param('id') id: string): Promise<ResponsePutDto> {
    return await this.appService.updateInvitado(dto, id);
  }

  @Get('/get/:evento')
  async getInvitados(@Param('evento') evento: string): Promise<ResponseGetAllDto> {
    return await this.appService.getAllInvitados(evento);
  }

  @Delete("/delete/:id")
  async deleteInvitado(@Param('id') id: string): Promise<ResponseDeleteDto> {
    return await this.appService.deleteInvitado(id);
  }

  @Get("/create-checkout-session/:amount")
  async createCheckoutSession(@Param('amount') amount: number): Promise<any> {
    return await this.appService.createSession(amount)
  }

  @Post("/create-pago/:amount")
  async createPago(@Param('amount') amount: number): Promise<any> {
    return await this.appService.createPago(amount)
  }

  @Get("/getTotalPagos")
  async getTotalPago(): Promise<any> {
    return await this.appService.getTotalPagos()
  }

}

