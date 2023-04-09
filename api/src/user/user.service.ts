import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { classToPlain } from 'class-transformer';
import { UserDocument, UserModel } from 'db/models';

@Injectable()
export class UserService {
    constructor(
        private jwtService: JwtService,
        private model:UserModel
    ){

    }

    async validateUserByJwt(body){
      const user = await this.model.findById(body._id)
      return user
    }

    verifyToken(token: string): number {
      try {
        if (!token) return 0
        const id = this.jwtService.verify(token.replace('Bearer ', ''))
        return id
      } catch (error) {
        return 0
      }
    }
    genToken(body){
        return {
            accessToken:"",
            refreshToken:""
        }

    }

    async getToken(user: UserDocument) {
        return this.jwtService.sign(
          {
            sub: user._id,
            _id: user._id,
          },
          {
            expiresIn: '7d',
          },
        );
      }

    findById(user){
        return {}
    }
}
