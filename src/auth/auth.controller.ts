import { Body, Controller, HttpCode, Post, UseGuards} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { ApiTags } from '@nestjs/swagger';
import { Public } from './public.decorator';


@ApiTags('auth')
@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {}

    @Public()
    @Post('signup')
    signup(@Body() signupDto: SignupDto) : Promise<{token: string}> {
        return this.authService.signup(signupDto)
    }

    @Public()
    @Post('login')
    @HttpCode(200)
    login(@Body() loginDto: LoginDto) : Promise<{token: string}> {
        return this.authService.login(loginDto)
    }
}
