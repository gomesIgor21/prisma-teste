import { Router } from 'express';
import prismaClient from '../prismaClient';
import { setUserRoles, userRegister } from '../services/userServices';

const userRouter = Router();

userRouter.post('/users', async (req, res) => {
	try {
		
    const user = await userRegister(req.body);

    res.status(201).json(user)
	} catch (e) {
		console.error(e);
		res.status(500).json(e);
	}
});

userRouter.post('/users/roles', async (req, res) => {
  try {
    await setUserRoles(req.body.user, req.body.roles);

    res.status(201).json({sucesso: "Criado"});
  } catch (e) {
    const err = e as Error;
    res.status(500).json({error: err.message});
  }
})

export default userRouter