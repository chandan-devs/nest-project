import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { UserService } from "../user/user.service"; // Adjust path as per your application structure
import { JwtStrategy } from "./jwt.strategy";
import { jwtConstants } from "./jwt.constants";
import { UserModule } from "src/user/user.module";

@Module({
  imports: [
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: "1h" }, // Adjust token expiration as needed
    }),
    UserModule
  ],
  controllers: [AuthController],
  providers: [AuthService, UserService, JwtStrategy],
  exports: [AuthService], // Export AuthService if needed in other modules
})
export class AuthModule {}
