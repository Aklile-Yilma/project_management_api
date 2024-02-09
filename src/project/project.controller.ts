import { Body, Controller, Patch, Post, Param, NotFoundException, Delete } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectDto } from './dto/project.dto';
import { DeveloperDto } from './dto/developer.dto';
import { Project } from './schemas/project.schema';

@Controller('project')
export class ProjectController {

    constructor (private projectService: ProjectService) {}


    @Post()
    create(@Body() projectDto: ProjectDto) {
        return this.projectService.create(projectDto)
    }

    @Patch(":id/updateProgress")
    async updateProgress(@Param('id') projectId: string, @Body() projectDto: ProjectDto) {

        const updatedProgress = await this.projectService.updateProgress(projectId, projectDto.progress);

        if(!updatedProgress) {
            throw new NotFoundException(`Project with ID ${projectId} not found`);
        }

        return updatedProgress
    }


    @Post(':id/add-developer')
    async addDeveloperToProject(@Param('id') projectId: string, @Body() developerDto: DeveloperDto) : Promise<Project> {
        return await this.projectService.addDeveloper(projectId, developerDto.developerId);
    } 

    @Delete(':id/remove-developer')
    async removeDeveloperToProject(@Param('id') projectId: string, @Body() developerDto: DeveloperDto) : Promise<Project> {
        return await this.projectService.removeDeveloper(projectId, developerDto.developerId);
    }

    @Delete(':id')
    async deleteProject(@Param('id') projectId: string) {
        return await this.projectService.deleteProject(projectId);
    }
}
