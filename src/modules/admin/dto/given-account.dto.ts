import { Role } from "src/common/enum/role.enum";


export class GivenAccountDto{
    username :string;
    role:Role;
    password:string;
}