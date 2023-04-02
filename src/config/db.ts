import path from "path";
import { DataSource } from "typeorm";
import { User } from "../entity/User";
import { Employee } from "../entity/Employee";
import { Profile } from "../entity/Profile";
import { Photo } from "../entity/Photo";
import { Question } from "../entity/Question";
import { Category } from "../entity/Category";

console.log(path.join(process.cwd() + "/src/entity/*.ts") , '__dirname' );
console.log('3',`${__dirname}*/entity/*.ts}`);

const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "",
  database: "typeorm_mysql",
  synchronize:true,
  entities: [User,Employee,Profile,Photo,Question,Category],
  migrationsTableName:"migartions",
  migrations:[`src/migration/1680434931712-Hello.ts`],
});

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err);
  });

export default AppDataSource;
