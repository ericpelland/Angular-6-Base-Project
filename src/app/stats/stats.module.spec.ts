import { StatsModule } from './stats.module';

describe('StatsModule', () => {
  let statsModule: StatsModule;

  beforeEach(() => {
    statsModule = new StatsModule();
  });

  it('should create an instance', () => {
    expect(statsModule).toBeTruthy();
  });
});
