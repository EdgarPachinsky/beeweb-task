import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateWorkspaceDto } from './dto/create-workspace.dto';
import { UpdateWorkspaceDto } from './dto/update-workspace.dto';
import { Workspace, WorkspaceDocument } from '../schemas/workspace.schema';
import { User } from '../schemas/user.schema';
import { ChannelsService } from '../channels/channels.service';
import { Channel, ChannelDocument } from '../schemas/channel.schema';

@Injectable()
export class WorkspacesService {
  constructor(
    @InjectModel(Workspace.name) private WorkspaceModel: Model<WorkspaceDocument>,
    @InjectModel(Channel.name) private ChannelModel: Model<ChannelDocument>
  ) {
  }

  async create(createWorkspaceDto: CreateWorkspaceDto) {
    try {
      const createdWorkspace = new this.WorkspaceModel(createWorkspaceDto);
      return {
        status:'success',
        message: 'Saved successfully',
        data: await createdWorkspace.save()
      };
    }catch (e){
      return {
        status:'error',
        message: e.message,
        data: {}
      };
    }
  }

  async findAll() {

    try {

      const workspaces = await this.WorkspaceModel.find().populate('belongsTo coWorkers').exec()

      return {
        status:'success',
        message: workspaces.length>0?`Found all workspaces`:`No any workspace`,
        data: workspaces
      };
    }catch (e){
      return {
        status:'error',
        message: e.message,
        data: {}
      };
    }
  }

  async findOne(subdomain: string, user: any) {

    try {

      const workspace = await this.WorkspaceModel.findOne({ subdomain: subdomain, belongsTo:user }).populate('belongsTo coWorkers');

      return {
        status:'success',
        message: workspace?`Found workspace`:`No any workspace with subdomain of ${subdomain}`,
        data: workspace
      };
    }catch (e){
      return {
        status:'error',
        message: e.message,
        data: {}
      };
    }
  }

  async findChannels(id: string, user: any){

    const workspace = await this.WorkspaceModel.findOne({_id:id})
    return this.ChannelModel.find({workspace:workspace})
  }

  async update(id: string, updateWorkspaceDto: UpdateWorkspaceDto) {

    try {

      const workspace = await this.WorkspaceModel.updateOne({ _id: id }, { $set: { ...updateWorkspaceDto } });

      return {
        status:'success',
        message: 'Workspace updated',
        data: workspace
      };
    }catch (e){
      return {
        status:'error',
        message: e.message,
        data: {}
      };
    }
  }

  async remove(id: string, user: any) {

    try {
      const deletingWorkspace = await this.WorkspaceModel.findOne({ _id: id })
      if(!deletingWorkspace.belongsTo === user._id){
        return {
          status:'error',
          message: 'Not your workspace',
        };
      }

      const workspace = await this.WorkspaceModel.remove({ _id: id });

      return {
        status:'success',
        message: 'Workspace deleted',
        data: workspace
      };
    }catch (e){
      return {
        status:'error',
        message: e.message,
        data: {}
      };
    }
  }
}
