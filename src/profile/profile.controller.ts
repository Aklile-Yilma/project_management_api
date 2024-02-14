import { BadRequestException, Body, Controller, Param, Patch } from '@nestjs/common';
import { ProfileDto } from './dto/profile-dto';
import { ProfileService } from './profile.service';
import { plainToClass } from 'class-transformer';
import { profileResponseDto } from './dto/profile-response-dto';
import { Profiler } from 'inspector';

@Controller('profile')
export class ProfileController {

    constructor(private profileService: ProfileService) {}
    
    @Patch('/:id')
    async updateProfile(@Body() profileDto: ProfileDto, @Param('id') userId: string): Promise<profileResponseDto> {
        
        if(!profileDto.contactInfo == undefined && !profileDto.name == undefined) {
            throw new BadRequestException('Please provide fields to update( contactInfo or name)')
        }

        const updatedProfile = this.profileService.update(userId, profileDto)

        const profileResponse = plainToClass(profileResponseDto, updatedProfile, {excludeExtraneousValues: true});

        return profileResponse
    }

}
