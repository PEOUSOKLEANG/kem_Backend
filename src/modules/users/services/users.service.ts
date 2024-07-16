import { BadRequestException, ConflictException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { DeepPartial, Repository } from 'typeorm';
import { UpdateUserInfo } from '../dto/update-user.dto';
import { GeneralRespone } from 'src/modules/types/generalRespone';
import { ChangePassword } from '../dto/chanegpassword.dto';
import { Role } from '../entities/role.entity';
import { CreateRoleDto } from '../dto/role.dto';
import { ChangeUsernameDTO } from '../dto/changeUsername.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private userRepository:Repository<User>,
        @InjectRepository(Role) private roleRepository:Repository<Role>
){}

// existed User  
async existedUser (email:string ,username:string,phone_number:string ){
    const isemail = await this.userRepository.findOne({where:{email:email}});
    const isPhoneNumber = await this.userRepository.findOne({where:{phone_number:phone_number}});
    const isUsername = await this.userRepository.findOne({where:{username:username}})
    if(isemail && isPhoneNumber && isUsername){
        return `${email},${phone_number},${username} are ready existed `;
    } 
    if(isUsername){
        return `${username}, Username already exisits`;
    }
    if( isPhoneNumber ){
        return `${phone_number}, Phone number already exisits`;
    }
    if(isemail ){
        return `${username}, Email already exisits`;
    }
}

//validate user
async validateUser(inputvalue:string , type:string):Promise<User>{

    if(type === "username"){
        const isUsername = await this.userRepository.findOne({where:{username:inputvalue}})
        if(!isUsername) throw new BadRequestException(' This username is not exsit ');
        return isUsername;
    }
    else if (type === "phonenumber"){
        const isPhoneNumber = await this.userRepository.findOne({where:{phone_number:inputvalue}});
        if(!isPhoneNumber) throw new BadRequestException('This Phone number is not exist');
        return isPhoneNumber;
    }
    else if(type ===  "email"){
         const isemail = await this.userRepository.findOne({where:{email:inputvalue}});  

        if(!isemail) throw new BadRequestException ('This email is not exist');
        return isemail;
    }
    else throw new BadRequestException('something went wrong.')

}


//update password
async updatePassword(userId:number , password:string){
    const user = await this.userRepository.findOne({where:{id:userId}})
    user.password = password
    await this.userRepository.save(user);
    // await this.userRepository.update(userId,password)
}
//change password
async changePassword(userId: number, changePasswordDto: ChangePassword){

    // validate User 
    const userChangePW = await this.userRepository.findOne({where:{id:userId}});
    // console.log("me",userChangePW.password);

    if(!userChangePW) throw new BadRequestException('something is wrong .');
    //validate new password between input 1st and input2 are match or not
    if(changePasswordDto.newPassword1 !== changePasswordDto.newPassword2) 
        throw new BadRequestException('NewPassword1 and password2is not matched. ');
    

    // validate old password before asign to database
    const validOldPassword = await userChangePW.validatePassword(changePasswordDto.oldPassword);
    if(!validOldPassword) throw new BadRequestException('Old password is invalid');

    // before save new password to database
    userChangePW.password = changePasswordDto.newPassword1
    await this.userRepository.save(userChangePW)
    return{
        statusCode:HttpStatus.OK,
        message:'password is updated'
    }
}





    //update info
    async updateInformation(id:number,updateUserInfoDto:UpdateUserInfo):Promise<GeneralRespone>{
        const isUser = await this.userRepository.findOne({where:{id:id}})
        console.log(id,updateUserInfoDto);
        
        const existsUsername = await this.userRepository.findOne({where:{username:updateUserInfoDto.username}});
        if (existsUsername) throw new BadRequestException('username already exited');

        const email = await  this.userRepository.findOne({where:{email:updateUserInfoDto.email}});
        if(email) throw new BadRequestException('email already exists');

        const phone_number = await this.userRepository.findOne({where:{phone_number:updateUserInfoDto.phone_number}});
        if(phone_number) throw new BadRequestException('phone number already exited');
        
        try {
            if(isUser){
                // const updateUserInform = await this.userRepository.findOne({where:{id:id}})
                isUser.username = updateUserInfoDto.username
                isUser.firstname = updateUserInfoDto.firstname
                isUser.lastname = updateUserInfoDto.lastname
                isUser.dob = updateUserInfoDto.dob
                isUser.gender = updateUserInfoDto.gender
                isUser.location = updateUserInfoDto.location
                isUser.email = updateUserInfoDto.email
                isUser.phone_number = updateUserInfoDto.phone_number
                // isUser.role = updateUserInfoDto.role

                console.log(isUser);

                await this.userRepository.save(isUser);

                
            return {
                data:isUser,
                message:'successful',
                statusCode:HttpStatus.OK
            }
            }
            else if(!isUser) throw Error;
            

        } catch (error) {
            throw new HttpException({
                status:HttpStatus.BAD_REQUEST,
                message:`update Fail`
            },HttpStatus.BAD_REQUEST)
            
        }
    }
    async findUser(userid:number){
        const user = await this.userRepository.findOne({
            where:{id:userid},
            relations:{post:true,role:true},
            
        })

        delete user.password;
        return user;
    }
    // create Role
//    async createRole(name:string){
//     const role: DeepPartial<Role> = { name: name };
//     return await this.roleRepository.save(role);
//    }

    async create(createRoleDto: CreateRoleDto): Promise<Role> {
    const role: DeepPartial<Role> = { name: createRoleDto.name };
    return await this.roleRepository.save(role);
  }

  //changUsername
  async changeUsername(changeUsername:ChangeUsernameDTO ,sub:number){
    const user = await this.userRepository.findOne({where:{id:sub}});
    user.username = changeUsername.username
    await this.userRepository.save(user);
    return {
        message:`username is changed`,
        statusCode:HttpStatus.OK
    }

  }
}
