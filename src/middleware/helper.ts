import mongoose, { Model } from "mongoose";
import { registerSchema } from "../models/register";

const Validator = require('validatorjs');



const validator:any = async (body:any, rules:any, customMessages:any, callback:any) => {
    const validation = new Validator(body, rules, customMessages);

    validation.passes(() => callback(null, true));
    validation.fails(() => callback(validation.errors, false));
    
};
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]/;

// Tighten password policy
Validator.register('strict', (value:any) => passwordRegex.test(value),
    'password must contain at least one uppercase letter, one lowercase letter and one number');
    
    Validator.registerAsync('exist', function(value:any,  attribute:any, req:Request, passes:any) {        
        
        if (!attribute) throw new Error('Specify Requirements i.e fieldName: exist:table,column');
        //split table and column
        let attArr = attribute.split(",");

        if (attArr.length !== 2) throw new Error(`Invalid format for validation rule on ${attribute}`);
        
        
        //assign array index 0 and 1 to table and column respectively
        const { 0: table, 1: column } = attArr;
        
        
        //define custom error message
        let msg = (column == "email") ? `${column} has already been taken `: `${column} already in use`
        //check if incoming value already exists in the database
     
        mongoose.model(table,registerSchema).findOne({ [column]: value}).then((result: any) => {
            if (result) {
                passes(false, msg);
            } else {
                passes();
            }
        }).catch((err: any) => {
            passes(false, err);
        });

    });
    
    
    
    module.exports = validator;
    
    




                /**
                
                * Checks if incoming value already exist for unique and non-unique fields in the database
                * e.g email: required|email|exists:User,email
 */
//  Validator.registerAsync('exist', function(value,  attribute, req, passes) {
//     if (!attribute) throw new Error('Specify Requirements i.e fieldName: exist:table,column');
//     //split table and column
//     let attArr = attribute.split(",");
//     if (attArr.length !== 2) throw new Error(`Invalid format for validation rule on ${attribute}`);

//     //assign array index 0 and 1 to table and column respectively
//     const { 0: table, 1: column } = attArr;
//     //define custom error message
//     let msg = (column == "username") ? `${column} has already been taken `: `${column} already in use`
//     //check if incoming value already exists in the database
//     Models[table].valueExists({ [column]: value })
//     .then((result) => {
//         if(result){
//             passes(false, msg); // return false if value exists
//             return;
//         }
//         passes();
//     })
// });