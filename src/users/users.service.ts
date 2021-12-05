import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from '../schemas/user.schema';
import { Workspace, WorkspaceDocument } from '../schemas/workspace.schema';


@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private UserModel: Model<UserDocument>,
    @InjectModel(Workspace.name) private WorkspaceModel: Model<WorkspaceDocument>
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const createdUser = new this.UserModel(createUserDto);
      await createdUser.save();

      return {
        status: 'success',
        message: 'Created new user',
        data: createdUser
      };
    }catch (e){
      return {
        status:'error',
        message: e.message,
        data: {}
      };
    }
  }

  findAll() {
    return this.UserModel.find().exec();
  }

  findOne(id: string) {
    return this.UserModel.findOne({_id:id})
  }

  findOneDynamicField(field: string, value: string) {
    return this.UserModel.findOne({ [field] : value})
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.UserModel.updateOne({_id:id}, { $set: { ...updateUserDto } })
  }

  remove(id: string) {
    return this.UserModel.remove({_id:id})
  }

  async findMyWorkspace(id: string) {
    const user = await this.UserModel.findOne({_id:id})
    return await this.WorkspaceModel.find({ belongsTo: user }).exec();
  }
}
