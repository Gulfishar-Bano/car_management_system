import { Module } from '@nestjs/common';
import { JwtAuthController } from './jwt-auth.controller';
import { JwtAuthService } from './jwt-auth.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports:[ TypeOrmModule.forFeature([User]),
  PassportModule,
    JwtModule.register(
      { secret:"jwt-secret-key",
      signOptions:{expiresIn:"1h"}

      }
    )

  ],

  

  
  controllers: [JwtAuthController],
  providers: [JwtAuthService,JwtStrategy]
})
export class JwtAuthModule {}
