import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/shared/services/prisma.service';
import * as bcrypt from 'bcrypt';
import { RegisterDTO } from './dto/register.dto';
import { LoginDTO, LoginResponseDTO } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async findOneById(id: number): Promise<User> {
    // todo: handle not found
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundException('User does not exist!');
    return user;
  }
  findOneByUsername(username: string): Promise<User> {
    const user = this.prisma.user.findUnique({ where: { username } });
    if (!user) throw new NotFoundException('User does not exist!');
    return user;
  }
  findAll(): Promise<User[] | []> {
    return this.prisma.user.findMany();
  }
  async validateUser(loginData: LoginDTO) {
    const user = await this.findOneByUsername(loginData.username);

    if (
      user &&
      (await this.comparePasswords(loginData.password, user.password))
    )
      return user;

    return null;
  }
  async register(registerData: RegisterDTO) {
    if (registerData.password !== registerData.repeatPassword)
      throw new BadRequestException('Passwords do not match!');
    try {
      return await this.prisma.user.create({
        data: {
          email: registerData.email,
          password: await this.hashPassword(registerData.password),
          username: registerData.username,
        },
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2002') {
          throw new BadRequestException(
            'There is a unique constraint violation!',
          );
        }
      }
      throw e;
    }
  }
  async login(dto: LoginDTO): Promise<LoginResponseDTO> {
    const user = await this.findOneByUsername(dto.username);
    const payload = { username: user.username, sub: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  async comparePasswords(passwordToCheck: string, hash: string) {
    return await bcrypt.compare(passwordToCheck, hash);
  }
}
