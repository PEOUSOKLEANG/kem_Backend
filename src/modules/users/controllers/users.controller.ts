import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserInfo } from '../dto/update-user.dto';
import { ChangePassword } from '../dto/chanegpassword.dto';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { CreateRoleDto } from '../dto/role.dto';
import { Role } from '../entities/role.entity';
import { SystemRolesGuard } from 'src/common/guards/system_roles.guard';
import { Roles } from 'src/common/decorators/role.decorator';
import { ERole } from 'src/common/enum/role.enum';
import { ChangeUsernameDTO } from '../dto/changeUsername.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}


  @UseGuards(AccessTokenGuard, SystemRolesGuard)
  @Roles(ERole.User)
  @Get('/profile')
  async getProfile(@Req() req: any) {
    // console.log(ERole.Admin);

    return await this.usersService.findUser(req.user.sub);
  }
  // Change Username
  @UseGuards(AccessTokenGuard, SystemRolesGuard)
  @Roles(ERole.User)
  @Patch('change/username')
  async changeUsername(@Body() changeUsernameDto:ChangeUsernameDTO ,@Req() req:any ){
    return await this.usersService.changeUsername(changeUsernameDto,req.user.sub)
  }

  @UseGuards(AccessTokenGuard, SystemRolesGuard)
  @Roles(ERole.User)
  @Patch('/update')
  async updateUserInfo(
    @Req() req:any,
    @Body() updateUserInfo: UpdateUserInfo,
  ) {
    return await this.usersService.updateInformation(req.sub.user, updateUserInfo);
  }

  // change password
  @UseGuards(AccessTokenGuard, SystemRolesGuard)
  @Roles(ERole.User)
  @Patch('/password/change')
  async changePassword(
    // @Body() userId: number,
    @Req() req:any ,
    // @Param('userId') userId: number,
    @Body() changepassword: ChangePassword,
  ) {
    // console.log('me', userId);

    return await this.usersService.changePassword(req.user.sub, changepassword);
  }

  @Post('role')
  async create(@Body() createRoleDto: CreateRoleDto): Promise<Role> {
    return this.usersService.create(createRoleDto);
  }
}
