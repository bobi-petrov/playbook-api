import { Injectable } from '@nestjs/common';
import { Booking } from '@prisma/client';
import { PrismaService } from 'src/shared/services/prisma.service';

@Injectable()
export class BookingService {
  constructor(private prisma: PrismaService) {}

  findOneById(id: number): Promise<Booking | null> {
    return this.prisma.booking.findUnique({ where: { id } });
  }
  findAll(): Promise<Booking[] | null> {
    return this.prisma.booking.findMany();
  }
}
