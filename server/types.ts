import { Request } from "express";

declare module "express-session" {
  interface SessionData {
    userId?: string;
  }
}

export interface AuthenticatedRequest extends Request {
  session: {
    userId?: string;
    destroy: (callback: (err: any) => void) => void;
    save: (callback: (err: any) => void) => void;
  }
}