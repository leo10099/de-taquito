import { Controller, Get, Post, UseGuards, Body, Param } from '@nestjs/common';

// Guards
import { JwtAuthGuard } from '../auth/auth.guard.jwt';
// Components
import { PlayerService } from './player.service';

// // DTO
// import { CreatePlayerDto } from './dto/club.create.dto';

@Controller('/player')
export class PlayerController {
  constructor(private readonly playerService: PlayerService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAll() {
    return await this.playerService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:player')
  async getOne(@Param() param: { player: string }) {
    return await this.playerService.findOne(param.player);
  }

  // @UseGuards(JwtAuthGuard)
  // @Post()
  // async PostOne(@Body() createClubDto: CreateClubDto) {
  //   return await this.clubService.create(createClubDto);
  // }
}
