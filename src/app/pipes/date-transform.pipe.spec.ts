import { DateFormatPipe } from './date-transform.pipe';

describe('DateTransformPipe', () => {
  it('create an instance', () => {
    const pipe = new DateFormatPipe();
    expect(pipe).toBeTruthy();
  });
});
