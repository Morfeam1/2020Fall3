

import { myFetch } from "./my-fetch";

myFetch('http://localhost:3001/users')
.then(async x=> console.log( {json: await x.json()}))
export const list = "Database, SQL code";