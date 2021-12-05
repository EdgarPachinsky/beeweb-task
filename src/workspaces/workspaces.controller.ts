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
  Request,
} from '@nestjs/common';
import { WorkspacesService } from './workspaces.service';
import { CreateWorkspaceDto } from './dto/create-workspace.dto';
import { UpdateWorkspaceDto } from './dto/update-workspace.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileUpload } from '../utils/file-upload';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import slugify from 'slugify';

const fileUploadUtils = new FileUpload();

@Controller('workspaces')
export class WorkspacesController {
  constructor(private readonly workspacesService: WorkspacesService) {
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(FileInterceptor('image', fileUploadUtils.getLocalOptions()))
  create(
    @Body() createWorkspaceDto: CreateWorkspaceDto,
    @UploadedFile() file: Express.Multer.File,
    @Request() req
  ) {

    const subdomain = slugify(createWorkspaceDto.name.toLowerCase());

    createWorkspaceDto.image = file?.filename;
    createWorkspaceDto.subdomain = subdomain;
    createWorkspaceDto.belongsTo = req.user

    return this.workspacesService.create(createWorkspaceDto);
  }


  @Get()
  findAll() {
    return this.workspacesService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':subdomain')
  findOne(
    @Param('subdomain') subdomain: string,
    @Request() req
  ) {
    return this.workspacesService.findOne(subdomain, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/workspace-channels/:id')
  findChannels(
    @Param('id') id: string,
    @Request() req
  ) {
    return this.workspacesService.findChannels(id, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @UseInterceptors(FileInterceptor('image', fileUploadUtils.getLocalOptions()))
  update(
    @Param('id') id: string,
    @Body() updateWorkspaceDto: UpdateWorkspaceDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    updateWorkspaceDto.image = file?.filename;
    return this.workspacesService.update(id, updateWorkspaceDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(
    @Param('id') id: string,
    @Request() req
  ) {
    return this.workspacesService.remove(id, req.user);
  }
}
