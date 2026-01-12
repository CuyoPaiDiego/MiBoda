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

