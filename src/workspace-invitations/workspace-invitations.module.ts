import { Module } from '@nestjs/common';
import { WorkspaceInvitationsService } from './workspace-invitations.service';
import { WorkspaceInvitationsController } from './workspace-invitations.controller';

@Module({
  controllers: [WorkspaceInvitationsController],
  providers: [WorkspaceInvitationsService]
})
export class WorkspaceInvitationsModule {}
