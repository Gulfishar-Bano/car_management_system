
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Markup } from './markup.entity';
import { Repository } from 'typeorm';
import { CreateMarkupDto } from './dto/create-markup.dto';
import { UpdateMarkupDto } from './dto/update-markup.dto';

@Injectable()
export class MarkupService {
  constructor(
    @InjectRepository(Markup)
    private readonly markupRepo: Repository<Markup>,
  ) {}

  
   
  async create(createDto: CreateMarkupDto): Promise<Markup> {
    const markup = this.markupRepo.create(createDto);
    return this.markupRepo.save(markup);
  }

  
  
   
  async findAll(): Promise<Markup[]> {
    return this.markupRepo.find({ order: { createdAt: 'DESC' } });
  }

  
   
   
  async findOne(id: number): Promise<Markup> {
    const markup = await this.markupRepo.findOneBy({ id });
    if (!markup) {
      throw new NotFoundException(`Markup with ID ${id} not found`);
    }
    return markup;
  }

  
   
  async update(id: number, updateDto: UpdateMarkupDto): Promise<Markup> {
    const markup = await this.findOne(id);
    Object.assign(markup, updateDto);
    return this.markupRepo.save(markup);
  }

  
   
   
  async remove(id: number): Promise<string> {
    const result = await this.markupRepo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Markup with ID ${id} not found`);
    }
    return `markup with ${id} deleted successfully `
  }


   
  async getCurrentMarkup(): Promise<{ type: 'percentage' | 'fixed'; value: number }> {
    const latest = await this.markupRepo.find({
      order: { createdAt: 'DESC' },
      take: 1,
    });
  
    if (!latest.length) {
      return { type: 'percentage', value: 0 }; 
    }
  
    return {
      type: latest[0].type,
      value: Number(latest[0].value),
    };
  }
  
}
