import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Project } from './schemas/project.schema';
import { ProjectDto } from './dto/project.dto';
import { User } from 'src/auth/schemas/user.schema';
import { v4 as uuidv4 } from "uuid";

@Injectable()
export class ProjectService {

    constructor(
        @InjectModel(Project.name) private readonly projectModel: Model<Project>,
        @InjectModel(User.name) private readonly userModel: Model<User>,
      ) {}


// <    provideObjectId(id: string): {
//         const objectId = new mongoose.
//         return {}
//     }>
      
    
    async findAll(): Promise<Project[]> {
        return await this.projectModel.find().populate('developers').exec();
    }

    async findById(projectId: string): Promise<Project> {
        const project = await this.projectModel.findById(projectId).populate('developers').exec();
        
        if (!project) {
          throw new NotFoundException(`Project with ID ${projectId} not found`);
        }
    
        return project;
      }

    async create(projectDto: ProjectDto) : Promise<Project> {

        const {clientName, name, startDate, endDate, progress} = projectDto;

        const project = await this.projectModel.create({
            // _id: uuidv4(),
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
        ).populate('developers').exec()

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

        const project = await this.projectModel.findById(projectId).populate('developers').exec();

        if(!project) {
            throw new NotFoundException(`Project with ID ${projectId} not found`)
        }

        const developer = await this.userModel.findById(developerId);

        if(!developer || developer.role != 'Developer') {
            throw new NotFoundException(`Developer with ID ${developerId} not found or is not a Developer`);
        }

        const developerExists = project.developers.some(dev => dev.equals(developer._id));

        if(developerExists) {
            throw new ConflictException(`Developer with ID ${developerId} is already added to the project`);
        }


        project.developers.push(developer);
        
        const savedProject =  await project.save();

        return savedProject
    }


    async removeDeveloper(projectId: string, developerId: string) {

        const project = await this.projectModel.findById(projectId).populate('developers').exec();

        if(!project) {
            throw new NotFoundException(`Project with ID ${projectId} not found`)
        }

        const developerIndex = project.developers.findIndex(dev => dev._id == developerId);

        if (developerIndex !== -1) {
          project.developers.splice(developerIndex, 1);
          await project.save();
        } else {
          throw new NotFoundException(`Developer with ID ${developerId} not found in the project`);
        }

        return project;
    }

}
