import { Args, Resolver } from '@nestjs/graphql';

import { SearchResult } from './search-result.dto';
import { Query } from '@nestjs/graphql';
import { SearchService } from './search.service';
import { SearchQuery } from './dto/search-query.dto';

@Resolver()
export class SearchResolver {

    constructor(
        private readonly searchService:SearchService
    ){}



   
    @Query(()=>[SearchResult])
    Search(@Args('filter') filter:SearchQuery)
    {

       return this.searchService.search(filter)
    }


    @Query(()=>SearchResult)
    GetByToken(@Args('token') token:string){
     
        return this.searchService.getByToken(token)

    }




}
