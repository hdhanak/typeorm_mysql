import { Request, Response } from "express";
import { getRepository } from "typeorm";
import AppDataSource from "../../config/db";
import { Profile } from "../../entity/Profile";
import { User } from "../../entity/User";
import { ErrorMessage, MessageResponse } from "../../middleware/commenResError";

const getUser = async (req: Request, res: Response) => {
  try {
    const profileRepositry = AppDataSource.getRepository(Profile);

    const profile = await profileRepositry.find({
      where: {
        id: Number(req.params.id),
      },
    });

    return MessageResponse(req, res, profile, 200);
  } catch (error) {
    return ErrorMessage(req, res, error, 412);
  }
};

const createProfile = async (req: Request, res: Response) => {
  try {
    const profile = await AppDataSource.getRepository(Profile).create(req.body);
    const results = await AppDataSource.getRepository(Profile).save(profile);

    return MessageResponse(req, res, profile, 201);
  } catch (error) {
    console.log(error, "eroo");

    return ErrorMessage(req, res, error, 412);
  }
};

const updateUserById = async (req: Request, res: Response) => {
  const profileRepositry = AppDataSource.getRepository(Profile);
  let profile = { ...req.body };
  await profileRepositry.update(Number(req.params.id), profile);

  const updatedProfile = await profileRepositry.find({
    where: { id: Number(req.params.id) },
  });

  res.send(updatedProfile);
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const profileRepositry = AppDataSource.getRepository(Profile);

    const profile = await profileRepositry.delete({
      id: Number(req.params.id),
    });
    console.log(profile, " profile");
    if (profile.affected == 1) return MessageResponse(req, res, "deleted", 200);
    return ErrorMessage(req, res, "user not found", 400);
  } catch (error) {
    return ErrorMessage(req, res, error, 412);
  }
};

//........Pro..profile join

const joinProfileOneToOne = async (req: Request, res: Response) => {
  try {
    const userRepositry = AppDataSource.getRepository(User);
console.log('11111');

    const user = await userRepositry.find({
        relations: {
            profile: true,
        },
    
    });
    MessageResponse(req, res, user, 200);
  } catch (error) {
    console.log(error);
    
    return ErrorMessage(req, res, error, 412);
  }
};

export { getUser, createProfile, updateUserById, deleteUser,joinProfileOneToOne };
