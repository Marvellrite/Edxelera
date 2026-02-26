export default class Redis {
  public status = "ready";
  private map = new Map<string, number>();
  constructor(..._args: unknown[]) {}
  async connect() { this.status = "ready"; }
  async incr(key: string) {
    const next = (this.map.get(key) ?? 0) + 1;
    this.map.set(key, next);
    return next;
  }
  async expire(_key: string, _seconds: number) { return 1; }
}
