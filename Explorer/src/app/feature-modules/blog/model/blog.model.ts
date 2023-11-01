export interface Blog {
    id?: number,
    title: string;
    description: string;
    date: Date;
    pictures?: string[]; 
    status: BlogStatus
  }

  export enum BlogStatus {'Draft' , 'Published' , 'Closed' }
