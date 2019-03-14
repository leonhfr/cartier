// Code.
export default class Config {
  static get account(): number {
    return Number(process.env.ACCOUNT) || 0;
  }
  static get timeout(): number {
    return Number(process.env.TIMEOUT) || 0;
  }
}
