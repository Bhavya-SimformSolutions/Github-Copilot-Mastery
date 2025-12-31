import { getUser, ValidationError } from './user.service';

interface Request {
  params: {
    id: string;
  };
}

interface Response {
  status(code: number): Response;
  json(data: any): void;
}

export async function getUserController(req: Request, res: Response): Promise<void> {
  try {
    const user = await getUser(req.params.id);
    res.json(user);
  } catch (error) {
    if (error instanceof ValidationError) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}
