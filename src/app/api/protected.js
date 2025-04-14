import nextConnect from 'next-connect';
import verifyToken from '../../../lib/middleware';

const handler = nextConnect();

handler.use(verifyToken);

handler.get((req, res) => {
  res.status(200).json({ message: 'This is a protected route', user: req.user });
});

export default handler;
