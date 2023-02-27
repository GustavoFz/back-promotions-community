export class PostEntity {
  id: number;
  title: string;
  content: string;
  image: string;
  price: number;
  company: string | null;
  temp: number;
  link: string;
  expired: boolean;
  userId: number;
  categoryId: number;
  updatedAt: Date;
  createdAt: Date;

  constructor(post?: Partial<PostEntity>) {
    this.id = post?.id;
    this.title = post?.title;
    this.content = post?.content;
    this.image = post?.image;
    this.price = post?.price;
    this.company = post?.company;
    this.temp = post?.temp;
    this.link = post?.link;
    this.expired = post?.expired;
    this.userId = post?.userId;
    this.categoryId = post?.categoryId;
    this.updatedAt = post?.updatedAt;
    this.createdAt = post?.createdAt;
  }
}
