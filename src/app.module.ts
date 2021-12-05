import { Global, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { WorkspacesModule } from './workspaces/workspaces.module';
import { ChannelsModule } from './channels/channels.module';
import { WorkspaceInvitationsModule } from './workspace-invitations/workspace-invitations.module';
import { MulterModule } from '@nestjs/platform-express';
import { AuthModule } from './auth/auth.module';
import { FilesModule } from './files/files.module';


@Global()
@Module({
  imports: [
    MulterModule.register({
      dest: './uploads',
    }),
    MongooseModule.forRoot(`mongodb+srv://mors:77777hopar77777@morscluster.xso7o.mongodb.net/BeeWebTask?retryWrites=true&w=majority`),
    UsersModule,
    WorkspacesModule,
    ChannelsModule,
    WorkspaceInvitationsModule,
    AuthModule,
    FilesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
