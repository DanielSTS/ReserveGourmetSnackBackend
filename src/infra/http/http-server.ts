export type fn = (params: any, body: any) => Promise<any>;

export default interface HttpServer {
  on(method: string, url: string, callback: fn, auth?: boolean): void;
  listen(port: number): void;
}
