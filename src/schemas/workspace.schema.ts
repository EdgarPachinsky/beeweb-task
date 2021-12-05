import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { User } from './user.schema';

export type WorkspaceDocument = Workspace & Document;

@Schema()
export class Workspace {
  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  belongsTo: User;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
  coWorkers: User[];

  @Prop({ unique: true })
  subdomain: string;

  @Prop()
  image: string;
}

export const WorkspaceSchema = SchemaFactory.createForClass(Workspace);