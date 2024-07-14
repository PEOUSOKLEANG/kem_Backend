// import { SetMetadata } from '@nestjs/common';
// import { Role } from '../enum/role.enum';


// export const ROLE_KEY = 'role';
// export const Roles = (...role: Role[])=> SetMetadata(ROLE_KEY,role)

import { SetMetadata } from '@nestjs/common';
import { Role } from '../enum/role.enum';

export const ROLE_KEY = 'roles';
export const Roles = (...roles: Role[]) => SetMetadata(ROLE_KEY, roles);
