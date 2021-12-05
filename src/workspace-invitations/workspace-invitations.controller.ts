import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards } from '@nestjs/common';
import { WorkspaceInvitationsService } from './workspace-invitations.service';
import { CreateWorkspaceInvitationDto } from './dto/create-workspace-invitation.dto';
import { UpdateWorkspaceInvitationDto } from './dto/update-workspace-invitation.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('workspace-invitations')
export class WorkspaceInvitationsController {
  constructor(private readonly workspaceInvitationsService: WorkspaceInvitationsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Request() req) {
    return this.workspaceInvitationsService.create(req.body, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('user-invitations')
  findUserInvitations(
    @Request() req
  ) {
    return this.workspaceInvitationsService.findUserInvitations(req.user);
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
