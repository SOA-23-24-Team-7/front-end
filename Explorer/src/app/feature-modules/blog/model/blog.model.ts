export interface Blog {
    title: string;
    description: string;
    date: Date;
    pictures?: string[]; 
    status: BlogStatus
  }

  export enum BlogStatus {'Draft' , 'Published' , 'Closed' }