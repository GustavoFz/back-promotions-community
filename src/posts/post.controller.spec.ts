import { Test, TestingModule } from '@nestjs/testing';
import { CreatePostDto } from './dto/create-post.dto';
import { PostEntity } from './entities/post.entity';
import { PostController } from './post.controller';
import { PostService } from './post.service';

const postEntityList: PostEntity[] = [
  new PostEntity({
    id: 1,
    title: 'Post 1',
    content: 'Post 1 content',
    image: 'https://picsum.photos/200/300',
    price: 100,
    company: 'Company 1',
    temp: 10,
    link: 'https://www.google.com',
    expired: false,
    userId: 1,
    categoryId: 1,
    updatedAt: new Date(),
    createdAt: new Date(),
  }),
  new PostEntity({
    id: 2,
    title: 'Post 2',
    content: 'Post 2 content',
    image: 'https://picsum.photos/200/300',
    price: 100,
    company: 'Company 2',
    temp: 10,
    link: 'https://www.google.com',
    expired: false,
    userId: 1,
    categoryId: 1,
    updatedAt: new Date(),
    createdAt: new Date(),
  }),
];

const newPostEntity: CreatePostDto = {
  title: 'Post 3',
  content: 'Post 3 content',
  image: 'https://picsum.photos/200/300',
  price: 100,
  company: 'Company 3',
  link: 'https://www.google.com',
  userId: 1,
  categoryId: 1,
};

describe('PostController', () => {
  let controller: PostController;
  let service: PostService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostController],
      providers: [
        {
          provide: PostService,
          useValue: {
            create: jest.fn().mockResolvedValue(newPostEntity),
            findByFilter: jest.fn().mockResolvedValue(postEntityList),
            findOne: jest.fn().mockResolvedValue(postEntityList[0]),
            update: jest.fn().mockResolvedValue(postEntityList),
            remove: jest.fn().mockResolvedValue(postEntityList),
            createLikePost: jest.fn().mockResolvedValue(postEntityList),
            updateLikePost: jest.fn().mockResolvedValue(postEntityList),
            removeLikePost: jest.fn().mockResolvedValue(postEntityList),
            findLikePost: jest.fn().mockResolvedValue(postEntityList),
          },
        },
      ],
    }).compile();

    controller = module.get<PostController>(PostController);
    service = module.get<PostService>(PostService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findOne', () => {
    it('should call findAll', async () => {
      const id = '1';

      const result = await controller.findOne(id);

      expect(result).toEqual(postEntityList[0]);
      expect(typeof result).toEqual('object');
      expect(service.findOne).toHaveBeenCalledTimes(1);
    });

    it('should throw an error', async () => {
      const id = '1';
      jest.spyOn(service, 'findOne').mockRejectedValueOnce(new Error());

      expect(controller.findOne(id)).rejects.toThrow();
    });
  });

  describe('create', () => {
    it('should call create', async () => {
      const body = {
        title: 'Post 3',
        content: 'Post 3 content',
        image: 'https://picsum.photos/200/300',
        price: 100,
        company: 'Company 3',
        link: 'https://www.google.com',
        userId: 1,
        categoryId: 1,
      };

      const result = await controller.create(body);

      expect(result).toEqual(newPostEntity);
      expect(typeof result).toEqual('object');
      expect(service.create).toHaveBeenCalledTimes(1);
    });

    it('should throw an error', async () => {
      const body = {
        title: 'Post 3',
        content: 'Post 3 content',
        image: 'https://picsum.photos/200/300',
        price: 100,
        company: 'Company 3',
        link: 'https://www.google.com',
        userId: 1,
        categoryId: 1,
      };

      jest.spyOn(service, 'create').mockRejectedValueOnce(new Error());

      expect(controller.create(body)).rejects.toThrow();
    });
  });
  describe('update', () => {
    it('should call update', async () => {
      const id = '1';
      const body = {
        title: 'Post 3',
        content: 'Post 3 content',
        image: 'https://picsum.photos/200/300',
        price: 100,
        company: 'Company 3',
        link: 'https://www.google.com',
        userId: 1,
        categoryId: 1,
      };

      const result = await controller.update(id, body);
    });
  });
});
