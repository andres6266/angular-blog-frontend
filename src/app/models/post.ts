export class Post{
    constructor(
        public id:number,
        public user_id:number,
        public category_id:number,
        public title:string,
        public content:string,
        public image:string,
        //Para mostrar fechas de los Post
        public createdAt:any
    ){

    }
}