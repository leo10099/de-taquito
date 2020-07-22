import { Controller, Get, Post, UseGuards, Body, Query } from '@nestjs/common';

// Guards
import { JwtAuthGuard } from '../auth/auth.guard.jwt';
// Components
import { ClubService } from './club.service';
// DTO
import { CreateClubDto } from './dto/club.create.dto';

@Controller('/club')
export class ClubController {
  constructor(private readonly clubService: ClubService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAll() {
    return await this.clubService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getOneByExternalServiceId(@Query() externalServiceId: number) {
    return await this.clubService.findByExternalServiceId(externalServiceId);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async PostOne(@Body() createClubDto: CreateClubDto) {
    return await this.clubService.create(createClubDto);
  }
}
