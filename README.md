npm i mongodb mongoose express typeorm @types/mongoose @types/express @types/multer typescript ts-node nodemon @types/node mysql2 typeorm reflect-metadata

TYPESCRIPT 
npm install typescript --save-dev
npx tsc

2.use this
npm i -g typeorm not => npm i typeorm

NOTE::
1. not install mongodb if you are going to use typeorm
if you install both =>>>>>>>     npm i typeorm --force



CONFIG
"emitDecoratorMetadata": true,
"experimentalDecorators": true,



migartion cli
1. To Run 
npx typeorm-ts-node-commonjs migration:run -d src/config/db.ts

COLLECTION
https://api.postman.com/collections/22263125-600daf6e-6f6e-4234-88a1-63ba6d888b92?access_key=