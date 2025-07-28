import { Controller,Get, Query,Param } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchQuery } from './dto/search-query.dto';

 
@Controller('search')
export class SearchController {

    constructor(
     private readonly searchService:SearchService ){}


     @Get()
     search(@Query() dto:SearchQuery){
        return this.searchService.search(dto);
     }

     @Get('by-token/:token')
  getByToken(@Param('token') token: string) {
    return this.searchService.getByToken(token);
  }


     @Get('debug')
     debug(){
      return this.searchService.debugCache()
     }



}
