import { Injectable } from '@nestjs/common';
import { CreateChannelDto } from './dto/create-channel.dto';
import { UpdateChannelDto } from './dto/update-channel.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Channel, ChannelDocument } from '../schemas/channel.schema';

@Injectable()
export class ChannelsService {
  constructor(
    @InjectModel(Channel.name) private ChannelModel: Model<ChannelDocument>
  ) {}

  async create(createChannelDto: CreateChannelDto) {

    try {
      const createChannel = new this.ChannelModel(createChannelDto);
      return {
        status:'success',
        message: 'Saved successfully',
        data: await createChannel.save()
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
    return this.ChannelModel.find().populate('belongsTo');
  }

  findOne(id: string) {
    return this.ChannelModel.findOne({_id:id}).populate('belongsTo');
  }

  update(id: string, updateChannelDto: UpdateChannelDto) {
    return this.ChannelModel.updateOne({_id:id}, {$set:{ ...updateChannelDto }})
  }

  remove(id: string) {
    return this.ChannelModel.remove({ _id:id })
  }
}
