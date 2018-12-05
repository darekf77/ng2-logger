import "reflect-metadata";
import { Response } from 'morphi';
export declare class User {
    name: string;
    id: number;
    friend: User;
}
export declare class UserController {
    hello(): Response<User>;
}
export declare function start(): void;
