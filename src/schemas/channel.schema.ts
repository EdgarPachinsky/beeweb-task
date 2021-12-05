import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { User } from './user.schema';
import { Workspace } from './workspace.schema';

export type ChannelDocument = Channel & Document;

@Schema()
export class Channel {
  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop({type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]})
  users: User[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Workspace' })
  workspace: Workspace
}

export const ChannelSchema = SchemaFactory.createForClass(Channel);