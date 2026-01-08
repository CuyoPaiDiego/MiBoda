import { Injectable } from '@nestjs/common';
import { PrismaService } from './service/prisma/prisma.service';
import { CreateInvitationDto } from './dto/create-invitation.dto';
import { ResponseDto } from './dto/response.dto';

@Injectable()
export class AppService {

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
}
