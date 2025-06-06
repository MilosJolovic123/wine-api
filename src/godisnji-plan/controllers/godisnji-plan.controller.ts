import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, UseGuards, Request } from '@nestjs/common';
import { GodisnjiPlanService } from '../services/godisnji-plan.service';
import { CreateGodisnjiPlanDto } from '../dto/create-godisnji-plan.dto';
import { UpdateGodisnjiPlanDto } from '../dto/update-godisnji-plan.dto';
import { Roles } from 'src/auth/roles.decorator';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('godisnji-plan')
export class GodisnjiPlanController {
  constructor(private readonly godisnjiPlanService: GodisnjiPlanService) {}

  
  @Post()
  @UseGuards(AuthGuard)
  @Roles('Šef proizvodnje')
  async create(@Request() req,@Body() createGodisnjiPlanDto: CreateGodisnjiPlanDto) {
    //try {
      createGodisnjiPlanDto.mejlSefaProizvodnje = req.user.email;
      const createdPlan = await this.godisnjiPlanService.create(createGodisnjiPlanDto);
      return createdPlan;
    // } catch (error) {
    //   throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    // }
  }

  
  
  @Get()
  // @UseGuards(AuthGuard)
  // @Roles('Komercijalista','Šef proizvodnje','Računovodja vinarije','Enolog')
  async findAll() {
    try {
      return await this.godisnjiPlanService.findAll();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('all-active')
  async findAllActive(){
   
      try {
        return await this.godisnjiPlanService.findAllActive();
        
      } catch (error) {
        throw new HttpException(error.message,HttpStatus.INTERNAL_SERVER_ERROR);
      }
  }
   
    
  
  @Get(':id')
  // @UseGuards(AuthGuard)
  // @Roles('Komercijalista','Šef proizvodnje','Računovodja vinarije','Enolog')
  async findOne(@Param('id') id: string) {
    try {
      const plan = await this.godisnjiPlanService.findOne(+id);
      if (!plan) {
        throw new HttpException('Plan not found', HttpStatus.NOT_FOUND);
      }
      return plan;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    }

    
  @Patch('activate/:id')
  // @UseGuards(AuthGuard)
  // @Roles('Šef proizvodnje')
  async updateActivate(@Param('id') id: string) {
    try {
      return await this.godisnjiPlanService.updateActivate(+id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  
  @Patch('deactivate/:id')
  // @UseGuards(AuthGuard)
  // @Roles('Šef proizvodnje')
  async updateDeactivate(@Param('id') id: string) {
    try {
      return await this.godisnjiPlanService.updateDeactivate(+id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  
  @Patch('close/:id')
  @UseGuards(AuthGuard)
  @Roles('Šef proizvodnje')
  async updateClose(@Param('id') id: string) {
    try {
      return await this.godisnjiPlanService.updateClose(+id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  
  @Delete(':id')
  // @UseGuards(AuthGuard)
  // @Roles('Šef proizvodnje')
  async remove(@Param('id') id: string) {
    try {
      await this.godisnjiPlanService.remove(+id);
      return { message: 'Plan deleted successfully' };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
