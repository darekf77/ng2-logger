//#region backend
console.log('heeloa')
import * as path from 'path';
import * as _ from "lodash";
import "reflect-metadata";
import { createConnection, useContainer } from 'typeorm';
//#endregion

import { init, ENDPOINT, GET, Response } from 'isomorphic-rest';



import { Log, Level } from 'ng2-logger';
const log = Log.create('main application')
const log2 = Log.create('auth module')
const log3 = Log.create('books module')
const log4 = Log.create("/Users/test/Projects/testProject/index.ts")
export class User {
    name: string;
    id: number;
    friend: User;
}


@ENDPOINT('/hello')
export class UserController {

    @GET('/')
    hello(): Response<User> {
        let user = new User();
        return { send: user }
    }

}


const Controllers = [UserController]
const Entities = [User];

//#region backend
export function start() {

    init('http://localhost:4000').expressApp({
        controllers: _.values(Controllers),
        entities: _.values(Entities)
    });
}
start();
//#endregion


const randomJSON = {
    //#region backend
    "_id": "5a53ce64f67745e7b894ac84",
    "index": 5,
    "guid": "c99745b8-a806-448c-a25a-ca119ce231e5",
    "isActive": true,
    "balance": "$2,181.59",
    "picture": "http://placehold.it/32x32",
    "age": 38,
    "eyeColor": "blue",
    "name": "Hutchinson Stanley",
    "gender": "male",
    "company": "ZIPAK",
    "email": "hutchinsonstanley@zipak.com",
    "phone": "+1 (902) 487-3299",
    "address": "147 Tompkins Place, Volta, Pennsylvania, 8514",
    "about": "Tempor voluptate sint nulla qui dolor culpa ea pariatur. Proident ea dolor laboris exercitation non dolore ad elit duis. Nostrud non excepteur cillum incididunt occaecat. Voluptate esse velit proident officia voluptate ipsum exercitation exercitation nulla qui veniam.\r\n",
    "registered": "2014-12-28T12:28:33 -01:00",
    "latitude": -61.247966,
    "longitude": -35.969817,
    "tags": [
        "ullamco",
        "mollit",
        "deserunt",
        "fugiat",
        "ad",
        "exercitation",
        "sunt"
    ],
    "friends": [
        {
            "id": 0,
            "name": "Lou Gordon"
        },
        {
            "id": 1,
            "name": "Cherry Hernandez"
        },
        {
            "id": 2,
            "name": "Jeannette Vaughan"
        }
    ],
    "greeting": {
        "favoriteFruit": "strawberry"
    }
    //#endregion

}



let user = new User();
user.id = 1;
user.name = 'Peter Parker';
user.friend = user;
// log.i([1, 2, 3] as any)
log3.i('test info')
log.er('test error', user)
log3.w('warning here', 'watch out!')
log2.d('debug this', user)
log2.i('info about json', randomJSON)
log4.er(user as any)
