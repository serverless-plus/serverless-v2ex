export type Member = {
  username: string;
  website: null | string;
  github: null | string;
  psn: null | string;
  bio: null | string;
  tagline: null | string;
  twitter: null | string;
  avatar_normal: string;
  url: string;
  created: number;
  avatar_large: string;
  avatar_mini: string;
  location: any;
  btc: any;
  id: number;
};

export type Node = {
  avatar_large: string;
  name: string;
  avatar_normal: string;
  title: string;
  url: string;
  topics: number;
  footer: string;
  header: string;
  title_alternative: string;
  avatar_mini: string;
  stars: number;
  aliases: any[];
  root: boolean;
  id: number;
  parent_node_name: string;
};

export type Reply = {
  member: Member;
  created: number;
  topic_id: number;
  content: string;
  content_rendered: string;
  last_modified: number;
  member_id: number;
  id: number;
};

export type Topic = {
  node: Node;
  member: Member;
  last_reply_by: string;
  last_touched: number;
  title: string;
  url: string;
  created: number;
  content: string;
  content_rendered: string;
  last_modified: number;
  replies: number;
  id: number;
  replyList?: Reply[];
};
