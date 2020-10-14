import { TopicItem } from './Topic';
import { Topic } from '../../interfaces';

type Props = {
  topics: Topic[];
};

const TopicList = ({ topics }: Props) => (
  <div className='article-container'>
    {topics.map((item) => (
      <TopicItem key={item.id} topic={item} />
    ))}
  </div>
);

export { TopicList };
