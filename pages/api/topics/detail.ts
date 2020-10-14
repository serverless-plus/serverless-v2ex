import { NextApiRequest, NextApiResponse } from 'next';
import { getTopic } from '../../../apis';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const id = req.query.id;
    if (id) {
      const topic = await getTopic(id as string);

      res.status(200).json(topic);
    } else {
      res.status(500).json({ statusCode: 500, message: 'Topic id not exist.' });
    }
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err.message });
  }
};

export default handler;
