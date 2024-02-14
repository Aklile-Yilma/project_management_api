import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { privateDecrypt } from 'crypto';
import { Model } from 'mongoose';
import { User } from 'src/auth/schemas/user.schema';
import { ProfileDto } from './dto/profile-dto';

@Injectable()
export class ProfileService {

    constructor(
        @InjectModel(User.name) private readonly userModel: Model<User>
    ) {}

    async update(userId: string, profileDto: ProfileDto): Promise<User> {

        const profile = await this.userModel.findById(userId);

        if(!profile) {
            throw new BadRequestException("User Not Found!")
        }

        if(profileDto.name) {
            profile.name = profileDto.name;
        }

        if(profileDto.contactInfo) {
            profile.contactInfo = profileDto.contactInfo;
        }

        const savedProfile = await profile.save();

        return savedProfile;

    }


}
