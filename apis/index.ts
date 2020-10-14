import { get } from '../utils/request';

const BASE_URL = 'https://www.v2ex.com/api';

// `/api/topics/show.json?node_name=${topics}`

const getTopicList = async (tab: string) => {
  let url = '';
  if (tab === 'latest') {
    url = 'latest.json';
  } else if (tab === 'hot') {
    url = 'hot.json';
  } else {
    url = `show.json?node_name=${tab}`;
  }
  console.log(`axios.get.url: ${url}`);

  const res = await get({
    url: `${BASE_URL}/topics/${url}`,
  });

  return res;
};

const getTopic = async (id: string | number) => {
  const [detail] = await get({
    url: `${BASE_URL}/topics/show.json?id=${id}`,
  });

  const replise = await get({
    url: `${BASE_URL}/replies/show.json?topic_id=${id}`,
  });

  detail.replyList = replise;
  return detail;
};

export { getTopicList, getTopic };
