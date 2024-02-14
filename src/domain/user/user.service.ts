import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/shared/services/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  findOneById(id: number): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { id } });
  }
  findAll(): Promise<User[] | null> {
    return this.prisma.user.findMany();
  }
}
