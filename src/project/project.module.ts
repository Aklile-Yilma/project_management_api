import { Module } from '@nestjs/common';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Project, ProjectSchema } from './schemas/project.schema';
import { User, UserSchema } from 'src/auth/schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: Project.name, schema: ProjectSchema},
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [ProjectController],
  providers: [ProjectService]
})
export class ProjectModule {}
