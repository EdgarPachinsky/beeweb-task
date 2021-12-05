import * as bcrypt from 'bcrypt';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  UseGuards,
  Request
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FileUpload } from '../utils/file-upload'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

const fileUploadUtils = new FileUpload();
const saltOrRounds = 10;

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    // private readonly authService: AuthService
  ) {}

  @Post('register')
  @UseInterceptors(FileInterceptor('avatar', fileUploadUtils.getLocalOptions()))
  async register(@Body() createUserDto: CreateUserDto, @UploadedFile() file: Express.Multer.File) {
    createUserDto.avatar = file.filename
    createUserDto.password = await bcrypt.hash(createUserDto.password, saltOrRounds);

    return await this.usersService.create(createUserDto);
  }

  // @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('file', fileUploadUtils.getLocalOptions()))
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @UploadedFile() file: Express.Multer.File
  ) {
    file?updateUserDto.avatar = file.filename:""
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }

  @Get('workspace/:id')
  getMyWorkspace(@Param('id') id: string) {
    return this.usersService.findMyWorkspace(id);
  }
}