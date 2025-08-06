import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { Fare } from 'src/fare/fare.entity';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MarkupModule } from 'src/markup/markup.module';
import { SearchResolver } from './search.resolver';

@Module({
  
    imports:[
        TypeOrmModule.forFeature([Fare]),
        CacheModule.register(),MarkupModule
    ],

    providers:[SearchService, SearchResolver],
    controllers:[SearchController]


})
export class SearchModule {}
