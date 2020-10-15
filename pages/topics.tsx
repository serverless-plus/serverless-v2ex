import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import Layout from '../components/Layout';
import { Topic } from '../interfaces';
import { getTopicList } from '../apis';
import { TopicList } from '../components/TopicList';

interface Props {
  tab: string;
  topics: Topic[];
}

const TopicsPage = ({ tab, topics }: Props) => {
  return (
    <Layout title={`${tab} | Serverless V2EX`}>
      <TopicList topics={topics} />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const { query = {} } = context;
  const tab = query.tab ? (query.tab as string) : 'latest';

  const topics: Topic[] = await getTopicList(tab);
  return { props: { topics, tab } };
};

export default TopicsPage;
