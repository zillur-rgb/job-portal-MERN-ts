export interface CustomRequest extends Request {
  user?: { userId: string }; // Add the user property to the interface
}
