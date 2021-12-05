import { Module } from '@nestjs/common';
import { WorkspacesService } from './workspaces.service';
import { WorkspacesController } from './workspaces.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Workspace, WorkspaceSchema } from '../schemas/workspace.schema';
import { Channel, ChannelSchema } from '../schemas/channel.schema';

@Module({
  imports:[
    MongooseModule.forFeature([{name: Workspace.name, schema: WorkspaceSchema}]),
    MongooseModule.forFeature([{name: Channel.name, schema: ChannelSchema}])
  ],
  controllers: [WorkspacesController],
  providers: [WorkspacesService]
})
export class WorkspacesModule {}
