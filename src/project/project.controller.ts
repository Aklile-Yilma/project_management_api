import { Body, Controller, Patch, Post, Param, NotFoundException, Delete, BadRequestException, Get, UseGuards } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectDto } from './dto/project.dto';
import { DeveloperDto } from './dto/developer.dto';
import { Project } from './schemas/project.schema';
import { ProjectUpdateDto } from './dto/project-update.dto';
import { ProjectResponseDto } from './dto/project-response.dto';
import { plainToClass } from 'class-transformer';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.gaurd';
import { Roles } from 'src/auth/roles.decorator';
import { UserRole } from 'src/auth/schemas/user.schema';

@ApiTags('projects')
@Controller('projects')
// @UseGuards(AuthGuard())
@UseGuards(AuthGuard)
export class ProjectController {

    constructor (private projectService: ProjectService) {}


    @Get()
    async findAll(): Promise<ProjectResponseDto[]>  {
        const projects = await this.projectService.findAll();

        const projectResponse = projects.map((project) => {
            return plainToClass(ProjectResponseDto, project, {excludeExtraneousValues: true});

        })
                
        return projectResponse;
    }

    @Get(':id')
    async findById(@Param('id') projectId: string) : Promise<ProjectResponseDto> {

        const project = await this.projectService.findById(projectId);

        const projectResponse = plainToClass(ProjectResponseDto, project, {excludeExtraneousValues: true});

        return projectResponse;
    }



    @Post()
    async create(@Body() projectDto: ProjectDto) : Promise<ProjectResponseDto>{
        const project =  await this.projectService.create(projectDto)

        const projectResponse = plainToClass(ProjectResponseDto, project, {excludeExtraneousValues: true});

        return projectResponse
    }

    @Patch(":id/update-progress")
    @Roles(UserRole.ADMIN)
    async updateProgress(@Param('id') projectId: string, @Body() projectDto: ProjectUpdateDto) {

        if(!projectDto.progress == undefined) {
            throw new BadRequestException('progress not provided!')
        } 

        const updatedProgress = await this.projectService.updateProgress(projectId, projectDto.progress);

        if(!updatedProgress) {
            throw new NotFoundException(`Project with ID ${projectId} not found`);
        }

        const projectResponse = plainToClass(ProjectResponseDto, updatedProgress, {excludeExtraneousValues: true});
        
        return projectResponse
    }


    @Post(':id/add-developer')
    async addDeveloperToProject(@Param('id') projectId: string, @Body() developerDto: DeveloperDto) : Promise<ProjectResponseDto> {
        const project = await this.projectService.addDeveloper(projectId, developerDto.developerId);

        const projectResponse = plainToClass(ProjectResponseDto, project, {excludeExtraneousValues: true});

        return projectResponse
    } 

    @Delete(':id/remove-developer')
    async removeDeveloperToProject(@Param('id') projectId: string, @Body() developerDto: DeveloperDto) : Promise<ProjectResponseDto> {
        const project =  await this.projectService.removeDeveloper(projectId, developerDto.developerId);

        const projectResponse = plainToClass(ProjectResponseDto, project, {excludeExtraneousValues: true});

        return projectResponse
    }

    @Delete(':id')
    async deleteProject(@Param('id') projectId: string) {
        const project =  await this.projectService.deleteProject(projectId);

        const projectResponse = plainToClass(ProjectResponseDto, project, {excludeExtraneousValues: true});

        return projectResponse
    }
}
