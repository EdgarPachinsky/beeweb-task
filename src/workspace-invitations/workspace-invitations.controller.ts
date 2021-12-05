import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WorkspaceInvitationsService } from './workspace-invitations.service';
import { CreateWorkspaceInvitationDto } from './dto/create-workspace-invitation.dto';
import { UpdateWorkspaceInvitationDto } from './dto/update-workspace-invitation.dto';

@Controller('workspace-invitations')
export class WorkspaceInvitationsController {
  constructor(private readonly workspaceInvitationsService: WorkspaceInvitationsService) {}

  @Post()
  create(@Body() createWorkspaceInvitationDto: CreateWorkspaceInvitationDto) {
    return this.workspaceInvitationsService.create(createWorkspaceInvitationDto);
  }

  @Get()
  findAll() {
    return this.workspaceInvitationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.workspaceInvitationsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWorkspaceInvitationDto: UpdateWorkspaceInvitationDto) {
    return this.workspaceInvitationsService.update(+id, updateWorkspaceInvitationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.workspaceInvitationsService.remove(+id);
  }
}
