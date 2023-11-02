export interface PersonUpdate {
    id: number;
    userId: number;
    name: string;
    surname: string;
    email:string;
    username:string;
    profilePicture?:string;
    bio?: string;
    motto?: string;
  }
  