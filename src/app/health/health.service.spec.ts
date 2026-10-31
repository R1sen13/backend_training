import { HealthService } from './health.service';

describe('Health Service', () => {
  let service: HealthService;

  beforeEach(() => {
    service = new HealthService();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return health', () => {
    expect(service.health()).toBe('This server is running');
  });
});
