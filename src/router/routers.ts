import express, { Request, Response } from "express";
import { craeteM2m, createEmp, ManyToMany, manyToOne, oneToMany } from "../controller/Employee";
import { craeteUser, deleteUser, getUser, updateUserById } from "../controller/logic";
import { createProfile, joinProfileOneToOne } from "../controller/profileController";
// import { findloc } from "../services/loc.services";
const router = express.Router()

router.get('/user/:id',getUser)
router.post('/user',craeteUser)
router.patch('/user/:id',updateUserById)
router.delete('/user/:id',deleteUser)
// router.post('/find',findAgg)

//OneToOne
router.get('/joinProfile',joinProfileOneToOne)
router.post('/profile',createProfile)


//EMp and photo   manyToOne relation

router.post('/createEmp',createEmp)
router.get('/manyToOne',oneToMany)
router.get('/oneToMany',manyToOne)

// M2M question and category carete
router.post('/craeteM2m',craeteM2m)
router.get('/ManyToMany',ManyToMany)

export {router}