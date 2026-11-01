import { HealthController } from './health.controller';
import { Test, TestingModule } from '@nestjs/testing';
import { HealthService } from './health.service';
import { jest } from '@jest/globals';

describe('HealthController', () => {
  let controller: HealthController;

  const healthServiceMock = {
    health: jest.fn(),
  };

  beforeEach(async () => {
    healthServiceMock.health.mockReturnValue('This server is running');

    const module: TestingModule = await Test.createTestingModule({
      controllers: [HealthController],
      providers: [
        {
          provide: HealthService,
          useValue: healthServiceMock,
        },
      ],
    }).compile();

    controller = module.get<HealthController>(HealthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return health status', () => {
    expect(controller.getHealth()).toBe('This server is running');
    expect(healthServiceMock.health).toHaveBeenCalledTimes(1);
  });
});
