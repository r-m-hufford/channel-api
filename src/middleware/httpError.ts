import { Request, Response } from "express";

class HttpError extends Error {
  statusCode: number;
  messages: string[];
  constructor(statusCode: number, messages: string[]) {
    super();
    this.statusCode = statusCode;
    this.messages = messages;
  }
}

const errorHandlerMiddleware = (err: HttpError, _req: Request, res: Response, _next: any) => {
  if (err instanceof HttpError) {
    if (typeof err.messages === 'string') err.messages = [err.messages];
    return res.status(err.statusCode).json({ error: err.messages })
  }
console.error(err);
return res.status(500).json({ error: 'Internal Server Error' });
}

export { HttpError, errorHandlerMiddleware };