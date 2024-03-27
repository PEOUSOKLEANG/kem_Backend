export enum GenderDto{
    Male='male',
    Female='female',
    Other='other'

}
export class CreateUserDto {
    username:string;
    firstname:string;
    lastname:string 
    dob:Date;
    location:string
    password:string
    gender:GenderDto


}
