import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { User } from './user.schema';
import { Workspace } from './workspace.schema';

export type WorkspaceInvitationDocument = WorkspaceInvitation & Document;

@Schema()
export class WorkspaceInvitation {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  from: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  to: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Workspace' })
  workspace: Workspace

  @Prop({
    required: true,
    enum: ['pending', 'rejected', 'accepted', 'expired'],
    default: 'pending'
  })
  status: string;
}

export const WorkspaceInvitationSchema = SchemaFactory.createForClass(WorkspaceInvitation);