import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
    Patch,
    BadRequestException,
  } from '@nestjs/common';
  import { MarkupService } from './markup.service';
  import { CreateMarkupDto } from './dto/create-markup.dto';
  import { UpdateMarkupDto } from './dto/update-markup.dto';
  
  @Controller('markup')
  export class MarkupController {
    constructor(private readonly markupService: MarkupService) {}
  
    @Post('create')
    create(@Body() createDto: CreateMarkupDto) {
      return this.markupService.create(createDto);
    }
  
    @Get('list')
    findAll() {
      return this.markupService.findAll();
    }
  
    @Get('list/:id')
    findOne(@Param('id') id: string) {
      const parsedId = parseInt(id, 10);
      if (isNaN(parsedId)) throw new BadRequestException('Invalid Markup ID');
      return this.markupService.findOne(parsedId);
    }
  
    @Patch('update/:id')
    update(@Param('id') id: string, @Body() updateDto: UpdateMarkupDto) {
      const parsedId = parseInt(id, 10);
      if (isNaN(parsedId)) throw new BadRequestException('Invalid Markup ID');
      return this.markupService.update(parsedId, updateDto);
    }
  
    @Delete('delete/:id')
    remove(@Param('id') id: string) {
      const parsedId = parseInt(id, 10);
      if (isNaN(parsedId)) throw new BadRequestException('Invalid Markup ID');
      return this.markupService.remove(parsedId);
    }
  
    @Get('latest')
    getLatest() {
      return this.markupService.getCurrentMarkup();
    }
  }
  