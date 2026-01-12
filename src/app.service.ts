import { Injectable } from '@nestjs/common';
import { PrismaService } from './service/prisma/prisma.service';
import { CreateInvitationDto } from './dto/create-invitation.dto';
import { ResponseDto } from './dto/response.dto';
import { ResponseGetAllDto } from './dto/responseGetAll.dto';
import { ResponseDeleteDto } from './dto/responseDelete.dto';
import Stripe from 'stripe'

@Injectable()
export class AppService {

  private stripe = new Stripe(process.env.SK_STRIPE!)

  constructor(
    private prismaService: PrismaService
  ) { }

  /**
   * Normaliza el nombre de familia para comparaciones:
   * - Convierte a minúsculas
   * - Elimina espacios extras
   */
  private normalizarFamilia(familia: string): string {
    return familia
      .toLowerCase()
      .trim()
      .replace(/\s+/g, ' '); // Normaliza espacios múltiples a uno solo
  }

  async crearInvitados(invitado: CreateInvitationDto) {
    const familiaNormalizada = this.normalizarFamilia(invitado.familia);
    const aliasNormalizado = (invitado.alias || '').toLowerCase().trim();

    // Buscar duplicados comparando familia Y alias
    const invitadosExistentes = await this.prismaService.invitados.findMany({
      select: { id: true, familia: true, alias: true, cantidad: true, created_at: true, updated_at: true }
    });

    const duplicado = invitadosExistentes.find(inv =>
      this.normalizarFamilia(inv.familia) === familiaNormalizada &&
      (inv.alias || '').toLowerCase().trim() === aliasNormalizado
    );

    if (duplicado) {
      return {
        duplicated: true,
        data: duplicado
      } as ResponseDto;
    }

    // Crear el nuevo invitado
    const nuevoInvitado = await this.prismaService.invitados.create({
      data: {
        familia: invitado.familia, // Guardar el original
        alias: invitado.alias,
        cantidad: invitado.cantidad
      }
    });

    return {
      duplicated: false,
      data: nuevoInvitado
    } as ResponseDto;
  }

  async getAllInvitados() {
    const invitados = await this.prismaService.invitados.findMany();

    return {
      ok: true,
      data: invitados ?? []
    } as ResponseGetAllDto
  }

  async deleteInvitado(id: string) {
    const invitado = await this.prismaService.invitados.delete({ where: { id } })

    if (!invitado) {
      return {
        ok: false,
        data: []
      } as ResponseDeleteDto
    }
    return {
      ok: true,
      data: invitado
    } as ResponseDeleteDto
  }

  async createSession(amount: number) {
    const amountDecimal = amount * 100
    const session = this.stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            product_data: {
              name: "Luna de miel",
              description: "Luna de miel - Hitsel y Diego"
            },
            currency: 'mxn',
            unit_amount: amountDecimal
          },
          quantity: 1
        }
      ],
      mode: 'payment',
      success_url: `https://dyh-gutech.com/success/${amount}`,
      cancel_url: 'https://dyh-gutech.com/boda',
    })
    return session
  }

  async createPago(amount: number) {
    const pay = await this.prismaService.pagos.create({
      data: {
        cantidad: parseInt(amount.toString())
      }
    });

    return {
      ok: true,
      data: pay
    }
  }

  async getTotalPagos() {
    const result = await this.prismaService.pagos.aggregate({
      _sum: {
        cantidad: true
      }
    })
    return { total: result._sum.cantidad ?? 0 }
  }
}
