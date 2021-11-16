import { Profile } from './profile';

export class Comment {
    _id?: string;
    createdAt?: Date;
    updatedAt?: Date;
    body?: string;
    author!: Profile

}
