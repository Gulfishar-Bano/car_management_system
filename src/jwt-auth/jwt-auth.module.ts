import { Module } from '@nestjs/common';
import { JwtAuthController } from './jwt-auth.controller';
import { JwtAuthService } from './jwt-auth.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PassportModule } from '@nestjs/passport';
import { User } from './user.entity';
import { Booking } from 'src/booking/entities/booking.entity';
import { Fare } from 'src/fare/fare.entity';
import { Markup } from 'src/markup/markup.entity';
@Module({
  imports:[ TypeOrmModule.forFeature([User,Booking,Fare,Markup]),
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
