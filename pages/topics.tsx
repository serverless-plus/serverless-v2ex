import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { get } from '../utils/request';
import Layout from '../components/Layout';
import { Topic } from '../interfaces';
import { TopicList } from '../components/TopicList';
import { Loading } from '../components/Loading';

const TopicsPage = () => {
  const router = useRouter();
  const tab = (router.query.tab as string) || 'latest';

  const [topicList, setTopicList] = useState([] as Topic[]);
  const [loading, setLoading] = useState(true);

  async function getTopics(tab: string) {
    const topics: Topic[] = await get({
      url: `/api/topics?tab=${tab}`,
    });
    setTopicList(topics);
  }

  useEffect(() => {
    getTopics(tab);
    setLoading(false);
  }, [tab]);

  return (
    <Layout title={`${tab} | Serverless V2EX`}>
      {!loading ? <TopicList topics={topicList} /> : <Loading />}
    </Layout>
  );
};

export default TopicsPage;
