import React from 'react';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import Layout from '../components/Layout';
import { getTopicList } from '../apis';
import { Topic } from '../interfaces';
import { TopicList } from '../components/TopicList';

interface Props {
  topics: Topic[];
}

const IndexPage = ({ topics }: Props) => {
  return (
    <Layout title='Home | Serverless V2EX'>
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
  return { props: { topics } };
};

export default IndexPage;
