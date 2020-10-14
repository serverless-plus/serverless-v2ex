import Link from 'next/link';
import { formatDate } from '../../utils';
import { Topic } from '../../interfaces';

type Props = {
  topic: Topic;
};

const TopicItem = ({ topic }: Props) => (
  <div className='cell'>
    <div className='member'>
      <img src={topic.member.avatar_normal} />
    </div>
    <div className='title'>
      <div>
        <Link href={`/topic?id=${topic.id}`}>
          <span className='link-label'>{topic.title}</span>
        </Link>
      </div>
      <div>
        <span className='info'>
          {topic.node.title} • {formatDate(topic.last_touched)} •{' '}
          {topic.replies}
        </span>
      </div>
    </div>
  </div>
);

export { TopicItem };
