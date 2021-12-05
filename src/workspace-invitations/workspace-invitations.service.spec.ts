import { Test, TestingModule } from '@nestjs/testing';
import { WorkspaceInvitationsService } from './workspace-invitations.service';

describe('WorkspaceInvitationsService', () => {
  let service: WorkspaceInvitationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WorkspaceInvitationsService],
    }).compile();

    service = module.get<WorkspaceInvitationsService>(WorkspaceInvitationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
