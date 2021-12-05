import { User } from '../../schemas/user.schema';

export class CreateWorkspaceDto {
  belongsTo: User
  name: string;
  subdomain: string;
  image: string;
}
