import { IsNotEmpty, IsString,MinLength } from "class-validator";
import { ERole } from "src/common/enum/role.enum";

export enum GenderDto{
    Male='male',
    Female='female',
    Other='other'
}

export class CreateUserDto {
    @IsNotEmpty()
    @MinLength(3)
    @IsString()
    username:string;

    @MinLength(8)
    phone_number:string;
    
    @IsNotEmpty()
    @MinLength(3)
    firstname:string;
    @IsNotEmpty()
    @MinLength(3)
    lastname:string;

    dob:Date;
    location:string;

    @MinLength(8)
    password:string;

    email:string;
    
    gender:GenderDto;

    // role:any;


}
