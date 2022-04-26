import { Role, User } from '@prisma/client';
import prismaClient from '../prismaClient';

type Payload = {
	username: string;
	password: string;
	roles: string[];
};

const userRegister = async (payload: Payload) => {
	try {
	
		const user = await prismaClient.user.create({
			data: {
				username: payload.username,
				password: payload.password,									
			},			
		});
    
		// await setUserRoles(user, payload.roles);

		return user;
	} catch (e) {
		const err = e as Error;
		throw new Error(err.message);
	}
};

const setUserRoles = async (user: User, roles: any) => {
	try {
		const rolesId: Role[] = await prismaClient.role.findMany({
			where: {
				name: {
					in: roles,
				},
			},
		});
    
		rolesId.forEach(async (role) => {
			await prismaClient.userHasRole.create({
        data: {
          roleId: role.id,
          userId: user.id
        }
      })
		});

	} catch (e) {
		const err = e as Error;
		throw new Error(err.message);
	}
};

const listUserByRoles = async (role: string) => {
	try {
		const users = await prismaClient.user.findMany({
			where: {
				roles: {
					some: {
						role: {
							name: role
						}
					}
				}
			}
		});
		return users;
	} catch (e) {
		const err = e as Error;
		throw new Error(err.message);
	}
}

export { userRegister, setUserRoles, listUserByRoles };
