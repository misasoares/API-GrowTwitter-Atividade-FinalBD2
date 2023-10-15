import { NextFunction, Request, Response } from 'express';
import userService from '../service/user.service';


async function authMiddleware(req: Request, res: Response, next: NextFunction) {
	try {
		const token = req.headers.authorization;

		if (!token) {
			return res.status(401).send({
				code: 401,
				message: 'Authentication token fail',
			});
		}

		const user = await userService.getUserByToken(token as string);

		if (!user) {
			return res.status(401).send({
				code: 401,
				message: 'Authentication token fail',
			});
		}

		req.body.userID = user.id;

		next();
	} catch (error) {
		return res.status(500).send({
			code: 500,
			message: error,
		});
	}
}

export default authMiddleware;
