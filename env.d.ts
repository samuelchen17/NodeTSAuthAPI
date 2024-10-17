declare namespace NodeJS {
  interface ProcessEnv {
    MONGODB_URL: string;
    SECRET: string;
  }
}

// when i want env variables to be accessed across whole project
// declare global {
//   namespace NodeJS {
//     interface ProcessEnv {
//       MONGODB_URL: string;
//       JWT_SECRET: string;
//     }
//   }
// }
