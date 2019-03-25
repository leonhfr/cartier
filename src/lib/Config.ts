// Code.
export default class Config {
  static get account(): number {
    return Number(process.env.ACCOUNT) || 0;
  }
  static get region(): string {
    return process.env.REGION || '';
  }
  static get flickrKey(): string {
    return process.env.FLICKRKEY || '';
  }
  static get flickrLimit(): number {
    return Number(process.env.FLICKRLIMIT) || 0;
  }
  static get rate(): number {
    return Number(process.env.RATE) || 0;
  }
  static get timeout(): number {
    return Number(process.env.TIMEOUT) || 0;
  }
}
