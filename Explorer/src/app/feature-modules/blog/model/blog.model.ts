export interface Blog {
    Title: string;
    Description: string;
    Date: Date;
    Pictures?: string[]; 
    Status: BlogStatus
  }

  export enum BlogStatus {'Draft' , 'Published' , 'Closed' }