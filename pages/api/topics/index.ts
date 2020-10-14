import { NextApiRequest, NextApiResponse } from 'next';
import { getTopicList } from '../../../apis';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const tab = req.query.tab || 'latest';
    const topics = await getTopicList(tab as string);

    res.status(200).json(topics);
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err.message });
  }
};

export default handler;
