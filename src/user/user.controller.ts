import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './schemas/user.schema';

@Controller('users')
export class UserController {

    constructor(private readonly userService: UserService) {}

    @Post()
    create(@Body() user: User): Promise<User> {
        return this.userService.create(user);
    }

    @Get()
    findAll(): Promise<User[]> {
        return this.userService.findAll();
    }
}
