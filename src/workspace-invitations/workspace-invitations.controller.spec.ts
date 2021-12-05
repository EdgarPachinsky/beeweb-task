import { Test, TestingModule } from '@nestjs/testing';
import { WorkspaceInvitationsController } from './workspace-invitations.controller';
import { WorkspaceInvitationsService } from './workspace-invitations.service';

describe('WorkspaceInvitationsController', () => {
  let controller: WorkspaceInvitationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WorkspaceInvitationsController],
      providers: [WorkspaceInvitationsService],
    }).compile();

    controller = module.get<WorkspaceInvitationsController>(WorkspaceInvitationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
