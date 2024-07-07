import { BadRequestException, Injectable } from '@nestjs/common';
import { Users } from 'src/entities/users.entity';
import { UsersRepository } from 'src/users/users.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly jwtService: JwtService,
  ) {}

  getAuth() {
    return ' Authorization from service';
  }
  async signIn(email: string, password: string) {
    if (!email || !password) return 'Email y password requeridos';

    const user = await this.usersRepository.getUserByEmail(email);
    if (!user) throw new BadRequestException('Credenciales incorrectas');

    //* Validar Password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
      throw new BadRequestException('Credenciales incorrectas');

    //*Firmar token
    const payload = { id: user.id, email: user.email, isAdmin: user.isAdmin };
    const token = this.jwtService.sign(payload);

    return {
      message: 'Usuario Logueado...',
      token,
    };
  }

  async signUp(user: Partial<Users>) {
    const { email, password } = user;

    const foundUser = await this.usersRepository.getUserByEmail(email);
    if (foundUser) throw new BadRequestException('El mail ya esta registrado');

    const hashedPassword = await bcrypt.hash(password, 10);

    return await this.usersRepository.addUser({
      ...user,
      password: hashedPassword,
    });
  }
}
