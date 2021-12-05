import { User } from '../../schemas/user.schema';

export class CreateChannelDto {
  image:string
  belongsTo:User
}
