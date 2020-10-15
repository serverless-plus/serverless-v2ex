import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import Layout from '../components/Layout';
import { formatDate } from '../utils';
import { getTopic } from '../apis';
import { Loading } from '../components/Loading';
import { Topic } from '../interfaces';
// import BackToTop from './BackTop';

type TopicProps = {
  topic: Topic;
  topicId: string;
};

const TopicPage = ({ topic }: TopicProps) => {
  const { replyList = [] } = topic || {};

  //获取回复列表
  let repliesItems: JSX.Element[] = [];
  if (replyList.length > 0) {
    repliesItems = replyList.map((reply, i) => {
      return (
        <div key={i} className='reply-container'>
          <div className='reply-avatar'>
            <img src={reply.member.avatar_mini}></img>
          </div>
          <div className='reply-content'>
            <div>
              <span>
                {reply.member.username}&nbsp;&nbsp;
                {formatDate(reply.last_modified)}
              </span>
            </div>
            <div
              dangerouslySetInnerHTML={{ __html: reply.content_rendered }}
              className='rendered-content'
            />
          </div>
        </div>
      );
    });
  }

  return (
    <Layout title={(topic && topic.title) || 'Topic'}>
      {topic && topic.member ? (
        <div className='topic-container'>
          <div className='topic'>
            <div className='topic-title'>
              <div className='left-info'>
                <div>
                  <strong>{topic.title}</strong>
                </div>
                <div>
                  <span>
                    {topic.member.username}&nbsp;&nbsp;
                    {formatDate(topic.last_modified)}
                  </span>
                </div>
              </div>
              <div className='right-avatar'>
                <img
                  src={topic.member.avatar_normal}
                  className='right-avater-img'></img>
              </div>
            </div>
            <div
              dangerouslySetInnerHTML={{ __html: topic.content_rendered }}
              className='rendered-content'
            />
          </div>
          {repliesItems}
        </div>
      ) : (
        <Loading />
      )}
      {/* <BackToTop /> */}
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const { query = {} } = context;

  if (query && query.id) {
    const topic: Topic = await getTopic(query.id as string);

    return { props: { topic: topic, topicId: query.id } };
  }
  return { props: { topic: {} } };
};

export default TopicPage;
