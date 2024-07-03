import { Controller, Post, UseGuards, Request, Get } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AuthService } from "./auth.service";
import { AuthLoginDto } from "./dto/authLoginDto";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("login")
  async login(@Request() req) {
    return this.authService.login(req.body);
  }

  @Get("profile")
  @UseGuards(AuthGuard("jwt"))
  async getProfile(@Request() req) {
    return req.user;
  }
}
