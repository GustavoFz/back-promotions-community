import { Test, TestingModule } from '@nestjs/testing';
import { User } from './entities/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';

const userEntityList: User[] = [
  new User({
    id: 1,
    nickname: 'Gustavo',
    picture: 'http://placehold.it/50x50',
    email: 'gustavo@solidktech.com',
    password: 'password',
    updatedAt: new Date(),
    createdAt: new Date(),
  }),
  new User({
    id: 2,
    nickname: 'Thiago',
    picture: 'http://placehold.it/50x50',
    email: 'thiago@solidktech.com',
    password: 'password',
    updatedAt: new Date(),
    createdAt: new Date(),
  }),
  new User({
    id: 3,
    nickname: 'Julio',
    picture: 'http://placehold.it/50x50',
    email: 'julio@solidktech.com',
    password: 'password',
    updatedAt: new Date(),
    createdAt: new Date(),
  }),
];

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            create: jest.fn().mockResolvedValue(userEntityList[0]),
            findAll: jest.fn().mockResolvedValue(userEntityList),
            findById: jest.fn().mockResolvedValue(userEntityList[0]),
            update: jest.fn().mockResolvedValue(userEntityList[0]),
            remove: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should call findAll', async () => {
      const result = await controller.findAll();

      expect(result).toEqual(userEntityList);
      expect(typeof result).toEqual('object');
      expect(service.findAll).toHaveBeenCalledTimes(1);
    });

    it('should throw an error', async () => {
      jest.spyOn(service, 'findAll').mockRejectedValueOnce(new Error());
    });
  });

  describe('findById', () => {
    it('should call findById', async () => {
      const id = 1;
      const result = await controller.findOne(id);

      expect(result).toEqual(userEntityList[0]);
      expect(typeof result).toEqual('object');
      expect(service.findById).toHaveBeenCalledTimes(1);
      expect(service.findById).toHaveBeenCalledWith(id);
    });

    it('should throw an error', async () => {
      const id = 1;

      jest.spyOn(service, 'findById').mockRejectedValueOnce(new Error());

      expect(controller.findOne(id)).rejects.toThrowError();
    });
  });

  describe('create', () => {
    it('should call create', async () => {
      const body = {
        nickname: 'Gustavo',
        picture: 'http://placehold.it/50x50',
        email: 'gustavo@solidktech.com',
        password: 'password',
      };

      const result = await controller.create(body);

      expect(result).toEqual(userEntityList[0]);
      expect(typeof result).toEqual('object');
      expect(service.create).toHaveBeenCalledWith(body);
      expect(service.create).toHaveBeenCalledTimes(1);
    });

    it('should throw an error', async () => {
      const body = {
        nickname: 'Gustavo',
        picture: 'http://placehold.it/50x50',
        email: 'gustavo@solidktech.com',
        password: 'password',
      };

      jest.spyOn(service, 'create').mockRejectedValueOnce(new Error());

      expect(controller.create(body)).rejects.toThrowError();
    });
  });

  describe('update', () => {
    it('should call update', async () => {
      const id = 1;
      const body = {
        nickname: 'Gustavo',
        picture: 'http://placehold.it/50x50',
        email: 'gustavo@solidktech.com',
        password: 'NewPassword',
      };
      const result = await controller.update(id, body);

      expect(result).toEqual(userEntityList[0]);
      expect(typeof result).toEqual('object');
      expect(service.update).toHaveBeenCalledWith(id, body);
      expect(service.update).toHaveBeenCalledTimes(1);
    });

    it('should throw an error', async () => {
      const id = 1;
      const body = {
        nickname: 'Gustavo',
        picture: 'http://placehold.it/50x50',
        email: 'gustavo@solidktech.com',
        password: 'NewPassword',
      };
      jest.spyOn(service, 'update').mockRejectedValueOnce(new Error());

      expect(controller.update(id, body)).rejects.toThrowError();
    });
  });

  describe('delete', () => {
    it('should call delete', async () => {
      const id = 1;
      const result = await controller.remove(id);

      expect(result).toBeUndefined();
    });

    it('should throw an error', async () => {
      const id = 1;
      jest.spyOn(service, 'remove').mockRejectedValueOnce(new Error());
      expect(controller.remove(id)).rejects.toThrowError();
    });
  });
});
