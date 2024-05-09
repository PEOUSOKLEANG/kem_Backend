import { BadRequestException, ConflictException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { RegisterRespone } from 'src/modules/types';
import { UpdateUserInfo } from '../dto/update-user.dto';
import { GeneralRespone } from 'src/modules/types/generalRespone';
import { error } from 'console';
import { ChangePassword } from '../dto/chanegpassword.dto';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private userRepository:Repository<User>){}


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



// async saveNewUser(registerDto:CreateUserDto):Promise<User>{
//     await this.userRepository.save(registerDto);
// }

// register 
    // async registerNewUser(registerDto:CreateUserDto):Promise<RegisterRespone>{
    //     const [phone_number] = registerDto.phone_number;
    //     const existedUser = await this.userRepository.findOne({where:{phone_number}})

    //     try { 
    //         if(!existedUser) {
    //             const newUser = new User();
    //             newUser.username = registerDto.username
    //             newUser.firstname = registerDto.firstname
    //             newUser.lastname = registerDto.lastname
    //             newUser.gender = registerDto.gender
    //             newUser.phone_number = registerDto.phone_number
    //             newUser.password =  registerDto.password
    //             newUser.location = registerDto.location
    //             newUser.email = registerDto.email
    //             newUser.dob = registerDto.dob
    //             console.log(newUser);
    //             await this.userRepository.save(newUser);
    //                 console.log(newUser);
    //                 return {
    //                     message: `${newUser.username} is Created, successful`,
    //                     statusCode: HttpStatus.OK,
    //                 }
    //             }    
    //         else if(existedUser) throw Error;
    //     } catch (error) {
    //         throw new HttpException({
    //             status:HttpStatus.BAD_REQUEST,
    //             message:'User with this Phone number already exists'
    //         },HttpStatus.BAD_REQUEST)
            
    //     }

    // }


    //update info
    async updateInformation(id:number,updateUserInfoDto:UpdateUserInfo):Promise<GeneralRespone>{
        const isUser = await this.userRepository.findOne({where:{id:id}})
        console.log(id,updateUserInfoDto);
        
        try {
            if(isUser){
                // const updateUserInform = await this.userRepository.findOne({where:{id:id}})
                isUser.username = updateUserInfoDto.username
                isUser.firstname = updateUserInfoDto.firstname
                isUser.lastname = updateUserInfoDto.lastname
                isUser.dob = updateUserInfoDto.dob
                isUser.gender = updateUserInfoDto.gender
                isUser.location = updateUserInfoDto.location

                console.log(isUser);

                await this.userRepository.save(isUser);
                
            return {
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

    
    // async UserExisted(phone_number:string){
    //     await this.userRepository.findOne({where:{phone_number}})
    //     try {
        
    //     } catch (error) {
            
    //     }
    // }

}
