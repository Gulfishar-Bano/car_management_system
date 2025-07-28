import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MarkupController } from './markup.controller';
import { MarkupService } from './markup.service';
import { Markup } from './markup.entity';
import { Fare } from 'src/fare/fare.entity';


@Module({

    imports:[
        TypeOrmModule.forFeature([Markup,Fare])
    ],
    controllers:[MarkupController],
    providers:[MarkupService],
    exports:[MarkupService]


})
export class MarkupModule {}
