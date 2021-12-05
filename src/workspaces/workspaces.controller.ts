import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { WorkspacesService } from './workspaces.service';
import { CreateWorkspaceDto } from './dto/create-workspace.dto';
import { UpdateWorkspaceDto } from './dto/update-workspace.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileUpload } from '../utils/file-upload';
import slugify from 'slugify';

const fileUploadUtils = new FileUpload();

@Controller('workspaces')
export class WorkspacesController {
  constructor(private readonly workspacesService: WorkspacesService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image', fileUploadUtils.getLocalOptions()))
  create(@Body() createWorkspaceDto: CreateWorkspaceDto, @UploadedFile() file: Express.Multer.File) {
    const subdomain = slugify(createWorkspaceDto.name.toLowerCase())
    createWorkspaceDto.image = file.filename
    createWorkspaceDto.subdomain = subdomain

    return this.workspacesService.create(createWorkspaceDto);
  }

  @Get()
  findAll() {
    return this.workspacesService.findAll();
  }

  @Get(':subdomain')
  findOne(@Param('subdomain') subdomain: string) {
    return this.workspacesService.findOne(subdomain);
  }


  @Patch(':id')
  @UseInterceptors(FileInterceptor('image', fileUploadUtils.getLocalOptions()))
  update(@Param('id') id: string, @Body() updateWorkspaceDto: UpdateWorkspaceDto) {
    return this.workspacesService.update(id, updateWorkspaceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.workspacesService.remove(id);
  }
}
