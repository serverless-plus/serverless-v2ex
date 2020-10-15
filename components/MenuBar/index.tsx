import { ReactNode, useState, useEffect, Fragment } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Drawer, List, NavBar } from 'antd-mobile';
import {
  MenuOutlined,
  HomeOutlined,
  FireOutlined,
  FieldTimeOutlined,
  CodeOutlined,
  UserOutlined,
  QuestionCircleOutlined,
  DesktopOutlined,
} from '@ant-design/icons';
import NodejsIcon from '../Icons/nodejs';

type MenuBarProps = {
  pathname?: string;
  children: ReactNode;
};

const nodeList = [
  {
    title: '首页',
    tab: 'index',
    href: '/',
    icon: <HomeOutlined />,
  },
  {
    title: '最热',
    tab: 'hot',
    href: 'topics?tab=hot',
    icon: <FireOutlined />,
  },
  {
    title: '最新',
    tab: 'latest',
    href: 'topics?tab=latest',
    icon: <FieldTimeOutlined />,
  },
  {
    title: 'Node.js',
    tab: 'nodejs',
    href: 'topics?tab=nodejs',
    icon: <NodejsIcon />,
  },
  {
    title: 'Python',
    tab: 'python',
    href: 'topics?tab=python',
    icon: <FieldTimeOutlined />,
  },
  {
    title: '程序员',
    tab: 'programmer',
    href: 'topics?tab=programmer',
    icon: <UserOutlined />,
  },
  {
    title: 'Linux',
    tab: 'linux',
    href: 'topics?tab=linux',
    icon: <CodeOutlined />,
  },
  {
    title: '问与答',
    tab: 'qna',
    href: 'topics?tab=qna',
    icon: <QuestionCircleOutlined />,
  },
  {
    title: '酷工作',
    tab: 'jobs',
    href: 'topics?tab=jobs',
    icon: <DesktopOutlined />,
  },
];

function initTitle(tab = 'index') {
  const [current] = nodeList.filter((item) => item.tab === tab);
  return current.title;
}

const MenuBar = ({ children }: MenuBarProps) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [drawHeight, setDrawHeight] = useState(1000);
  const [tab] = useState(router.query.tab || 'index');
  const [title, setTitle] = useState(initTitle(tab as string));

  useEffect(() => {
    setDrawHeight(document.documentElement.clientHeight);
  }, []);

  const sidebar = (
    <List>
      {nodeList.map((item) => {
        return (
          <List.Item
            onClick={() => {
              setOpen(!open);
              setTitle(item.title);
            }}
            key={item.tab}
            thumb={item.icon}
            className={tab === item.tab ? `nav-item active` : 'nav-item'}>
            <Link href={item.href}>{item.title}</Link>
          </List.Item>
        );
      })}
    </List>
  );

  return (
    <Fragment>
      <NavBar
        icon={<MenuOutlined />}
        onLeftClick={() => {
          setOpen(!open);
        }}
        rightContent={[
          <Link href='/about' key='about'>
            <QuestionCircleOutlined />
          </Link>,
        ]}>
        {title && `${title} - `}Serverless V2EX
      </NavBar>
      <Drawer
        className='my-drawer'
        style={{ minHeight: drawHeight }}
        contentStyle={{ color: '#A6A6A6' }}
        sidebar={sidebar}
        open={open}
        onOpenChange={() => {
          setOpen(!open);
        }}>
        {children}
      </Drawer>
    </Fragment>
  );
};

export { MenuBar };
