import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { RezervisaneKolicineService } from '../services/rezervisane-kolicine.service';
import { CreateRezervisaneKolicineDto } from '../dto/create-rezervisane-kolicine.dto';
import { UpdateRezervisaneKolicineDto } from '../dto/update-rezervisane-kolicine.dto';

@Controller('rezervisane-kolicine')
export class RezervisaneKolicineController {
  constructor(private readonly rezervisaneKolicineService: RezervisaneKolicineService) {}

  @Get('/kupci')
  fetchKupci(){
    try {
      return this.rezervisaneKolicineService.getKupci();
      
    } catch (error) {
      throw new HttpException(error.message,HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }


  @Post()
  create(@Body() createRezervisaneKolicineDto: CreateRezervisaneKolicineDto) {
    try {
      return this.rezervisaneKolicineService.create(createRezervisaneKolicineDto);
      
    } catch (error) {
      throw new HttpException(error.message,HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  findAll() {
    try {
      return this.rezervisaneKolicineService.findAll();
      
    } catch (error) {
      throw new HttpException(error.message,HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {


    try {
      return this.rezervisaneKolicineService.findOne(+id);
      
    } catch (error) {
      throw new HttpException(error.message,HttpStatus.INTERNAL_SERVER_ERROR);
    }

  }

  @Patch(':id')
  update(@Param('id') id:string,@Body() updateRezervisaneKolicineDto: UpdateRezervisaneKolicineDto) {
    try {
      return this.rezervisaneKolicineService.update(id,updateRezervisaneKolicineDto);
      
    } catch (error) {
      throw new HttpException(error.message,HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    try {
      return this.rezervisaneKolicineService.remove(+id);
      
    } catch (error) {
      throw new HttpException(error.message,HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
