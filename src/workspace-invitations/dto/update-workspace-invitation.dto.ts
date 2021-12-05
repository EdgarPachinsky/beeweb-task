import { PartialType } from '@nestjs/mapped-types';
import { CreateWorkspaceInvitationDto } from './create-workspace-invitation.dto';

export class UpdateWorkspaceInvitationDto extends PartialType(CreateWorkspaceInvitationDto) {}
