import { BadRequestException,Get, Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import {  LocalAuthGuard, Me } from './auth.decorator';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(
        private service: AuthService,
    ){}


    @Post("login")
    @LocalAuthGuard()
    async login (@Body() body){
        return this.service.login(body)
    }

    @Post("register")
    async register (@Body() body){
        return await this.service.register(body)

    }

    @Post("logout")
   @UseGuards(JwtAuthGuard)
    async loginout (@Body() body){
        return {
            status:true,
        }
    }

    @Get("info")
   @UseGuards(JwtAuthGuard)
    async getInfo (@Me() user){
        return user
       
    }
}
