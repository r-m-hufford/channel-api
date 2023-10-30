import { Request, Response } from "express";

class CustomError extends Error {
  statusCode: number;
  messages: string[];
  constructor(statusCode: number, messages: string[]) {
    super();
    this.statusCode = statusCode;
    this.messages = messages;
  }
}

const errorHandlerMiddleware = (err: CustomError, req: Request, res: Response, next: any) => {
  if (err instanceof CustomError) {
    if (typeof err.messages === 'string') err.messages = [err.messages];
    return res.status(err.statusCode).json({ error: err.messages })
  }
console.error(err);
res.status(500).json({ error: 'Internal Server Error' });
}

export { CustomError, errorHandlerMiddleware };