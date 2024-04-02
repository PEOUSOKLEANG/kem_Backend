import { ConflictException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { RegisterRespone } from 'src/modules/types';
import { UpdateUserInfo } from '../dto/update-user.dto';
import { GeneralRespone } from 'src/modules/types/generalRespone';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private userRepository:Repository<User>){}


    async registerNewUser(registerDto:CreateUserDto):Promise<RegisterRespone>{
        const [phone_number] = registerDto.phone_number;
        const existedUser = await this.userRepository.findOne({where:{phone_number}})
        
        // if(existedUser){
        //     throw new ConflictException('User with this Phone_number already exists')
        // }
        try {
            const newUser = new User();
            newUser.username = registerDto.username
            newUser.firstname = registerDto.firstname
            newUser.lastname = registerDto.lastname
            newUser.gender = registerDto.gender
            newUser.phone_number = registerDto.phone_number
            newUser.password =  registerDto.password
            newUser.location= registerDto.location
            if(existedUser) throw Error;
            if(!existedUser) await this.userRepository.save(newUser);
            return {
                message: `${newUser.username} is Created, successful`,
                statusCode: HttpStatus.OK,
            }
        
        } catch (error) {
            throw new HttpException({
                status:HttpStatus.INTERNAL_SERVER_ERROR,
                message:'User with this Phone number already exists'
            },HttpStatus.INTERNAL_SERVER_ERROR)
            
        }

    }

    async updateInformation(id:number,updateUserInfoDto:UpdateUserInfo):Promise<GeneralRespone>{
        const isUser = await this.userRepository.findOne({where:{id:id}})
        try {
            if(!isUser) throw Error;
            const updateUserInform = await this.userRepository.findOne({where:{id}})
            updateUserInform.username = updateUserInfoDto.username
            updateUserInform.firstname = updateUserInfoDto.firstname
            updateUserInform.lastname = updateUserInfoDto.lastname
            updateUserInform.dob = updateUserInfoDto.dob
            updateUserInform.gender = updateUserInfoDto.gender
            updateUserInform.location = updateUserInfoDto.location
            await this.userRepository.save(updateUserInfoDto);
            return{
                message:'successful',
                statusCode:HttpStatus.OK
            }

        } catch (error) {
            throw new HttpException({
                status:HttpStatus.INTERNAL_SERVER_ERROR,
                message:`update Fail`
            },HttpStatus.INTERNAL_SERVER_ERROR)
            
        }
    }

    
    // async UserExisted(phone_number:string){
    //     await this.userRepository.findOne({where:{phone_number}})
    //     try {
        
    //     } catch (error) {
            
    //     }
    // }

}
