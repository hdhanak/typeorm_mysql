import { Request, Response } from "express";
import { ErrorMessage, MessageResponse } from "../middleware/commenResError";
import { router } from "../router/routers";
import { getRepository } from "typeorm";
import AppDataSource from "../config/db";
import { User } from "../entity/User";

const getUser = async (req: Request, res: Response) => {
  try {
    const userRepositry = AppDataSource.getRepository(User)

    const user = await userRepositry.find({
        where:{
            id:Number(req.params.id)
        }
    })

    return MessageResponse(req, res, user, 200);

  } catch (error) {
    return ErrorMessage(req, res, error, 412);
  }
};

const craeteUser = async (req: Request, res: Response) => {
  try {
   
    const user = await AppDataSource.getRepository(User).create(req.body)
    const results = await AppDataSource.getRepository(User).save(user)

    return MessageResponse(req, res, user, 201);
  } catch (error) {
    console.log(error, "eroo");

    return ErrorMessage(req, res, error, 412);
  }
};

const updateUserById = async (req: Request, res: Response) => {
  const userRepositry = AppDataSource.getRepository(User);
  let user = { ...req.body };
  await userRepositry.update(Number(req.params.id), user);

  const updatedPlayer = await userRepositry.find({
    where: { id: Number(req.params.id) },
  });

  res.send(updatedPlayer);
};

const deleteUser = async (req: Request, res: Response) => {
    try {
      const userRepositry = AppDataSource.getRepository(User)
  
      const user = await userRepositry.delete({
          
              id:Number(req.params.id)
          
      })
      console.log(user,'user');
      if(user.affected == 1)
          return MessageResponse(req, res, 'deleted', 200);
  return ErrorMessage(req,res,'user not found',400)
    } catch (error) {
      return ErrorMessage(req, res, error, 412);
    }
  };

export { getUser, craeteUser, updateUserById,deleteUser };
