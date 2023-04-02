import { Request, Response } from "express";
import { getRepository } from "typeorm";
import AppDataSource from "../../config/db";
import { Category } from "../../entity/Category";
import { Employee } from "../../entity/Employee";
import { Photo } from "../../entity/Photo";
import { Profile } from "../../entity/Profile";
import { Question } from "../../entity/Question";
import { User } from "../../entity/User";
import { ErrorMessage, MessageResponse } from "../../middleware/commenResError";

const createEmp = async (req: Request, res: Response) => {
  try {
    let photoArr = req.body.photos;
    let arr: any = [];
    await Promise.all(
      photoArr.map(async (ele: any, index: any) => {
        const photo1 = new Photo();
        photo1.photo = ele;
        await AppDataSource.manager.save(photo1);
        console.log(photo1);
        arr.push(photo1);
      })
    );
    console.log(arr, "arr");

    const emp = new Employee();
    emp.emp_name = req.body.emp_name;
    emp.age = req.body.age;
    emp.salary = req.body.salary;
    emp.photos = arr;

    await AppDataSource.manager.save(emp);
    return MessageResponse(req, res, emp, 201);
  } catch (error) {
    console.log(error, "eroo");

    return ErrorMessage(req, res, error, 412);
  }
};

const manyToOne = async (req: Request, res: Response) => {
  try {
    const empRepositry = AppDataSource.getRepository(Employee);
    const Emps = await empRepositry.find({
      relations: {
        photos: true,
      },
    });
    return MessageResponse(req, res, Emps, 201);
  } catch (error) {
    console.log(error, "eroo");

    return ErrorMessage(req, res, error, 412);
  }
};

const oneToMany = async (req: Request, res: Response) => {
  try {
    const photoRepositry = AppDataSource.getRepository(Photo);
    const Emps = await photoRepositry.find({
      relations: {
        employee: true,
      },
    });
    return MessageResponse(req, res, Emps, 201);
  } catch (error) {
    console.log(error, "eroo");

    return ErrorMessage(req, res, error, 412);
  }
};

const craeteM2m = async (req: Request, res: Response) => {
  try {
    const category1 = new Category();
    category1.name = "animals";
    await AppDataSource.manager.save(category1);

    const category2 = new Category();
    category2.name = "zoo";
    await AppDataSource.manager.save(category2);

    const question = new Question();
    question.title = "dogs";
    question.text = "who let the dogs out?";
    question.categories = [category1, category2];
    await AppDataSource.manager.save(question);
    return MessageResponse(req, res, question, 200);
  } catch (error) {
    return ErrorMessage(req, res, error, 412);
  }
};

const ManyToMany = async (req: Request, res: Response) => {
    try {
      const categoryRepositry = AppDataSource.getRepository(Question);
      const category = await categoryRepositry.find({
        relations: {
            categories: true,
        },
      });
      return MessageResponse(req, res, category, 201);
    } catch (error) {
      console.log(error, "eroo");
  
      return ErrorMessage(req, res, error, 412);
    }
  };
export { createEmp, oneToMany, manyToOne,craeteM2m,ManyToMany };
