import { Injectable } from '@nestjs/common';
import { CreateTypeDto } from './dto/create-type.dto';
import { UpdateTypeDto } from './dto/update-type.dto';
import * as fs from 'fs';
import * as path from 'path';
import { json } from 'stream/consumers';

@Injectable()
export class CarTypeService {

    private filePath = path.join(process.cwd(), 'src', 'car-type', 'data', 'car-type.json');


private readData()
{
    return JSON.parse(fs.readFileSync(this.filePath,'utf-8'));
}

private writeData(data){
    fs.writeFileSync(this.filePath,JSON.stringify(data,null,2));

}

getAll(){
    return this.readData();
}

create(createDto: CreateTypeDto) {
    const types = this.readData();
    const newId = types.length > 0 ? types[types.length - 1].id + 1 : 1;
    const newType = { id: newId, ...createDto };
    types.push(newType);
    this.writeData(types);
    return newType;
  }
  

 update(id:number,updateDto:UpdateTypeDto){
    const types=this.readData();
    const index=types.findIndex((t)=>t.id===id);
    if(index===-1) return {message:'Type not found'}
    types[index]={...types[index],...updateDto};
     this.writeData(types);
     return types[index];
 }

 delete(id: number) {
    const types = this.readData();
    const updated = types.filter((t) => t.id !== id);
  
    console.log('Before:', types);
    console.log('After:', updated);
  
    this.writeData(updated); // Make sure this is actually writing to the file
  
    return { message: `Deleted type with ID ${id}` };
  }
  
 
}
