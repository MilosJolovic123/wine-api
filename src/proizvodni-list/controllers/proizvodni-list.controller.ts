import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { ProizvodniListService } from '../services/proizvodni-list.service';
import { UpdateProizvodniListDto } from '../dto/update-proizvodni-list.dto';
import { CreateProizvodniListDto } from '../dto/proizvodni-list.dto';
import { requestDTO } from '../dto/request-dto';


@Controller('proizvodni-list')
export class ProizvodniListController {
  
  constructor(private readonly proizvodniListService: ProizvodniListService) {}



  @Get('/grozdje')
  async fetchGrozdje(){
    return await this.proizvodniListService.getGrozdje();
  }

  @Post()
  async create(@Body() requestDTO: requestDTO) {
    try {
      const {grozdje,sira,proizvodniList} = requestDTO;
      const createdPList = await this.proizvodniListService.create(grozdje,sira,proizvodniList); 
      return createdPList; 
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  async findAll() {
    try {
      return this.proizvodniListService.findAll();
      
    } catch (error) {
      throw new HttpException(error.message,HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {

    try {
      const pList = this.proizvodniListService.findOne(+id);
      if(!pList){
        throw new HttpException('List not found',HttpStatus.NOT_FOUND);
      }
      return pList;
    } catch (error) {
      throw new HttpException(error.message,HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

// @Patch()
//  async update(@Body() updateProizvodniListDto: UpdateProizvodniListDto) {
  
//   try {
    
//     return this.proizvodniListService.update(updateProizvodniListDto);
//   } catch (error) {
//     throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
//   }
  
  
//   }

      @Delete(':id')
      remove(@Param('id') id: string) {
      return this.proizvodniListService.remove(+id);
      }

}
    
    
    






