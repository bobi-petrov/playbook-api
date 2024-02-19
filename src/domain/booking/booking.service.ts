import { Injectable, NotFoundException } from '@nestjs/common';
import { Booking } from '@prisma/client';
import { PrismaService } from 'src/shared/services/prisma.service';
import { CreateBookingDTO } from './dto/create-booking.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class BookingService {
  constructor(
    private prisma: PrismaService,
    private userService: UserService,
  ) {}

  async findOneById(id: number): Promise<Booking> {
    const booking = await this.prisma.booking.findUnique({
      where: { id },
      include: { users: true, createdBy: true },
    });
    if (!booking) throw new NotFoundException('Booking not found!');
    return booking;
  }
  findAll(): Promise<Booking[] | []> {
    return this.prisma.booking.findMany();
  }

  async createBooking(
    createBookingDTO: CreateBookingDTO,
    createdByEmail: string,
  ) {
    const userIds = createBookingDTO.userIds;
    delete createBookingDTO.userIds;
    return this.prisma.booking.create({
      data: {
        ...createBookingDTO,
        createdBy: {
          connect: {
            id: (await this.userService.findOneByUsername(createdByEmail)).id,
          },
        },
        users: {
          connect: userIds.map((id) => ({
            id,
          })),
        },
      },
    });
  }
}
