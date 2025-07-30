import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
    Patch,
    BadRequestException,
    UseGuards,
  } from '@nestjs/common';
  import { MarkupService } from './markup.service';
  import { CreateMarkupDto } from './dto/create-markup.dto';
  import { UpdateMarkupDto } from './dto/update-markup.dto';
import { JwtAuthGuard } from 'src/jwt-auth/jwt-auth.guard';
import { Roles } from 'src/jwt-auth/roles.decorator';
import { RolesGuard } from 'src/jwt-auth/roles.guard';



@UseGuards(JwtAuthGuard,RolesGuard)
@Roles('admin')
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
  