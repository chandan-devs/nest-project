import { Injectable } from "@nestjs/common";
import { UserService } from "../user/user.service"; // Adjust path as per your application structure
import { User } from "../common/entity/user.entity"; // Assuming User entity definition
import { AuthLoginDto } from "./dto/authLoginDto";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findByEmail(email);
    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(authLoginDto: AuthLoginDto) {
    const { email, password } = authLoginDto;
    const user = await this.validateUser(email, password);
    if (!user) {
      return { message: "Invalid credentials" };
    }
    // Generate JWT token and return it
    const payload = { email: user.email, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
