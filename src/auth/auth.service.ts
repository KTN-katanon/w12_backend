import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(login: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByLogin(login);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = user;
    const payload = { sub: user.id, login: user.login };
    return {
      user: user,
      access_token: await this.jwtService.signAsync(payload),
    };
    return result;
  }
}
