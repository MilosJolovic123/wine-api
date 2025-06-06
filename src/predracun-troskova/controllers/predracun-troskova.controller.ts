import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { PredracunTroskovaService } from '../services/predracun-troskova.service';
import { UpdatePredracunTroskovumDto } from '../dto/update-predracun-troskovum.dto';
import { CreatePredracunTroskovaDto } from '../dto/create-predracun-troskovum.dto';
import { Http2ServerResponse } from 'http2';

@Controller('predracun-troskova')
export class PredracunTroskovaController {
  constructor(private readonly predracunTroskovaService: PredracunTroskovaService) {}

  @Post('/osnovni')
  async createOsnovni(@Body() createPredracunTroskovumDto: CreatePredracunTroskovaDto) {
    try {
      return await this.predracunTroskovaService.createOsnovni(createPredracunTroskovumDto);
      
    } catch (error) {
      throw new HttpException(error.message,HttpStatus.BAD_REQUEST); 
    }
    
  }

  @Get()
  findAll() {
    try {
      return this.predracunTroskovaService.findAll();
      
    } catch (error) {
      throw new HttpException(error.message,HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    try {
      return this.predracunTroskovaService.findOne(+id);
      
    } catch (error) {
      throw new HttpException(error.message,HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('/dodatni')
  async createDodatni(@Body() createPredracunTroskovumDto: CreatePredracunTroskovaDto){
    try {
      return this.predracunTroskovaService.createDodatni(createPredracunTroskovumDto);
      
    } catch (error) {
      throw new HttpException(error.message,HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // @Patch()
  // update(@Body() updatePredracunTroskovumDto: UpdatePredracunTroskovumDto) {
  //   return this.predracunTroskovaService.update(updatePredracunTroskovumDto);
  // }
  //
  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.predracunTroskovaService.remove(+id);
  // }
}
