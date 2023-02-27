import { Test, TestingModule } from '@nestjs/testing';
import { AccessToken } from './dto/access-token.dto';
import { TokenController } from './token.controller';
import { TokenService } from './token.service';

const tokenEntity: AccessToken = {
  access_token: 'aasasasamsha6s5dt67whdw',
};

describe('TokenController', () => {
  let controller: TokenController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TokenController],
      providers: [
        {
          provide: TokenService,
          useValue: {
            refreshToken: jest.fn().mockResolvedValue(tokenEntity),
          },
        },
      ],
    }).compile();

    controller = module.get<TokenController>(TokenController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
