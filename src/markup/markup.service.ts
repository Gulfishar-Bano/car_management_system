// src/markup/markup.service.ts

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

  
   // Create a new markup
   
  async create(createDto: CreateMarkupDto): Promise<Markup> {
    const markup = this.markupRepo.create(createDto);
    return this.markupRepo.save(markup);
  }

  
   //Get all markup entries
   
  async findAll(): Promise<Markup[]> {
    return this.markupRepo.find({ order: { createdAt: 'DESC' } });
  }

  
   // Get one markup by ID
   
  async findOne(id: number): Promise<Markup> {
    const markup = await this.markupRepo.findOneBy({ id });
    if (!markup) {
      throw new NotFoundException(`Markup with ID ${id} not found`);
    }
    return markup;
  }

  
   //Update markup by ID
   
  async update(id: number, updateDto: UpdateMarkupDto): Promise<Markup> {
    const markup = await this.findOne(id);
    Object.assign(markup, updateDto);
    return this.markupRepo.save(markup);
  }

  
   // Delete markup by ID
   
  async remove(id: number): Promise<string> {
    const result = await this.markupRepo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Markup with ID ${id} not found`);
    }
    return `markup with ${id} deleted successfully `
  }

  
   //Get the most recent markup percentage (used dynamically in Fare)
   
  async getCurrentMarkup(): Promise<{ type: 'percentage' | 'fixed'; value: number }> {
    const latest = await this.markupRepo.find({
      order: { createdAt: 'DESC' },
      take: 1,
    });
  
    if (!latest.length) {
      return { type: 'percentage', value: 0 }; // default fallback
    }
  
    return {
      type: latest[0].type,
      value: Number(latest[0].value),
    };
  }
  
}
