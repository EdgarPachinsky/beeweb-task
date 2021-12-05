import { Module } from '@nestjs/common';
import { WorkspaceInvitationsService } from './workspace-invitations.service';
import { WorkspaceInvitationsController } from './workspace-invitations.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { WorkspaceInvitation, WorkspaceInvitationSchema } from '../schemas/workspace-invitation.schema';
import { User, UserSchema } from '../schemas/user.schema';

@Module({
  imports:[
    MongooseModule.forFeature([{name: User.name, schema: UserSchema}]),
    MongooseModule.forFeature([{name: WorkspaceInvitation.name, schema: WorkspaceInvitationSchema}]),
  ],
  controllers: [WorkspaceInvitationsController],
  providers: [WorkspaceInvitationsService]
})
export class WorkspaceInvitationsModule {}
