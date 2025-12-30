import { getUser } from './user.service';

export async function getUserController(req: any, res: any) {
  try {
    const user = await getUser(req.params.id);
    res.json(user);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
}
