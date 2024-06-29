import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { AuthLoginDto } from './dto/authLoginDto';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService
    ){}

    async function login(authLoginDto: AuthLoginDto){
        
    }

    function validateUser(email:string,password:string){
        let user = this.userService.findByEmail(email)
        console.log(user)
    }
    validateUser("")

}
