import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/entities/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(Users) private usersRespository: Repository<Users>,
  ) {}

  async getUsers(page: number, limit: number) {
    const skip = (page - 1) * limit;
    const users = await this.usersRespository.find({
      take: limit,
      skip: skip,
    });

    return users.map(({ password, ...userNoPassword }) => userNoPassword);
  }

  async getById(id: string) {
    const user = await this.usersRespository.findOne({
      where: { id },
      relations: {
        orders: true,
      },
    });
    if (!user) return `No se encontro el usuario con id ${id}`;
    const { password, ...userNoPassword } = user;
    return userNoPassword;
  }

  async addUser(user: Partial<Users>) {
    const newUser = await this.usersRespository.save(user);

    const dbUser = await this.usersRespository.findOneBy({id: newUser.id})

    const { password, ...userNoPassword } = dbUser;
    return userNoPassword;
  }

  async updateUser(id: string, user: Users) {
    await this.usersRespository.update(id, user);
    const updatedUser = await this.usersRespository.findOneBy({ id });
    const { password, ...userNoPassword } = updatedUser;
    return userNoPassword;
  }

  async deleteUser(id: string) {
    const user = await this.usersRespository.findOneBy({ id });
    this.usersRespository.remove(user);
    const { password, ...userNoPassword } = user;
    return userNoPassword;
  }

  async getUserByEmail(email: string) {
    return await this.usersRespository.findOneBy({ email });
  }
}
