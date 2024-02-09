import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Project } from './schemas/project.schema';
import { ProjectDto } from './dto/project.dto';
import { User } from 'src/auth/schemas/user.schema';

@Injectable()
export class ProjectService {

    constructor(
        @InjectModel(Project.name) private readonly projectModel: Model<Project>,
        @InjectModel(User.name) private readonly userModel: Model<User>,
      ) {}
    

    async create(projectDto: ProjectDto) : Promise<ProjectDto> {

        const {clientName, name, startDate, endDate, progress} = projectDto;

        const project = await this.projectModel.create({
            clientName,
            name, 
            startDate,
            endDate,
            progress
        })

        return project;
    }

    async updateProgress(projectId: string, newProgress: number) {

        const project = await this.projectModel.findByIdAndUpdate(
            projectId, 
            {progress: newProgress},
            {new: true}
        )

        return project;
    }

    async deleteProject(projectId: string) {

        const project = await this.projectModel.findById(projectId);

        if(!project) {
            throw new NotFoundException(`Project with ID ${projectId} not found`)
        }

        await project.deleteOne();

    }


    async addDeveloper(projectId: string, developerId: string) {

        const project = await this.projectModel.findById(projectId);

        if(!project) {
            throw new NotFoundException(`Project with ID ${projectId} not found`)
        }

        const developer = await this.userModel.findById(developerId);

        if(!developer || developer.role != 'Developer') {
            throw new NotFoundException(`Developer with ID ${developerId} not found or is not a Developer`);
        }

        project.developers.push(developer);
        
        return await project.save();
    }


    async removeDeveloper(projectId: string, developerId: string) {

        const project = await this.projectModel.findById(projectId);

        if(!project) {
            throw new NotFoundException(`Project with ID ${projectId} not found`)
        }

        project.developers = project.developers.filter(developer => developer.id != developerId);

        return await project.save()
    }

}
