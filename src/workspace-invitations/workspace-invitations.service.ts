import { Injectable } from '@nestjs/common';
import { CreateWorkspaceInvitationDto } from './dto/create-workspace-invitation.dto';
import { UpdateWorkspaceInvitationDto } from './dto/update-workspace-invitation.dto';
import { WorkspaceInvitation, WorkspaceInvitationDocument } from '../schemas/workspace-invitation.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../schemas/user.schema';

@Injectable()
export class WorkspaceInvitationsService {
  constructor(
    @InjectModel(WorkspaceInvitation.name) private WorkspaceInvitation: Model<WorkspaceInvitationDocument>,
    @InjectModel(User.name) private User: Model<UserDocument>
  ) {
  }

  async create(data: any, user: any) {

    try{

      const username = data.username;
      const userToSend = await this.User.findOne({username: username})

      if(!userToSend)
        return {
          status:'error',
          message: 'User not found',
          data: {}
        };

      const workspaceInvitation = new this.WorkspaceInvitation({
        from: user,
        to: userToSend,
        workspace: data.workspace
      })

      return {
        status:'success',
        message: 'Invitation sent successfully!',
        data: await workspaceInvitation.save()
      };
    }catch (e) {
      return {
        status:'error',
        message: e.message,
        data: {}
      };
    }
  }

  async findUserInvitations(user: any){
    return this.WorkspaceInvitation.find({to:user, status:'pending'}).populate('from').populate('workspace')
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
