export enum KEY_POST {
    Farmer = 'farmer',
    Invention = 'invention'
}
export class CreatePostDto {
    user:number;
    // date:Date;
    key_post:KEY_POST;
    location:string;
    description:string; 
    post_file?:string;
    update_date:Date;






}
