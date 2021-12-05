import { Injectable } from '@nestjs/common';
import { CreateWorkspaceInvitationDto } from './dto/create-workspace-invitation.dto';
import { UpdateWorkspaceInvitationDto } from './dto/update-workspace-invitation.dto';

@Injectable()
export class WorkspaceInvitationsService {
  create(createWorkspaceInvitationDto: CreateWorkspaceInvitationDto) {
    return 'This action adds a new workspaceInvitation';
  }

  findAll() {
    return `This action returns all workspaceInvitations`;
  }

  findOne(id: number) {
    return `This action returns a #${id} workspaceInvitation`;
  }

  update(id: number, updateWorkspaceInvitationDto: UpdateWorkspaceInvitationDto) {
    return `This action updates a #${id} workspaceInvitation`;
  }

  remove(id: number) {
    return `This action removes a #${id} workspaceInvitation`;
  }
}
