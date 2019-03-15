// Internal.
import { areaDivider } from './areaDivider';
import * as Mocks from '../mocks';

// Code.
describe('areaDivider', () => {
  it('should be defined', () => {
    expect(areaDivider).toBeDefined();
  });
  it('should return the expected output', () => {
    expect(areaDivider(Mocks.area1, 0.01)).toMatchSnapshot();
  });
  it('should return the expected output', () => {
    expect(areaDivider(Mocks.area2)).toMatchSnapshot();
  });
  it('should be safe with the decimals', () => {});
});
