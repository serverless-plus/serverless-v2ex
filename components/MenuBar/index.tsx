import { ReactNode, useState, useEffect, Fragment } from 'react';
import Link from 'next/link';
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
    node: <Link href='/'>首页</Link>,
    icon: <HomeOutlined />,
  },
  {
    title: '最热',
    tab: 'hot',
    node: <Link href='/topics?tab=hot'>最热</Link>,
    icon: <FireOutlined />,
  },
  {
    title: '最新',
    tab: 'latest',
    node: <Link href='/topics?tab=latest'>最新</Link>,
    icon: <FieldTimeOutlined />,
  },
  {
    title: 'Node.js',
    tab: 'nodejs',
    node: <Link href='/topics?tab=nodejs'>Node.js</Link>,
    icon: <NodejsIcon />,
  },
  {
    title: 'Python',
    tab: 'python',
    node: <Link href='/topics?tab=python'>Python</Link>,
    icon: <FieldTimeOutlined />,
  },
  {
    title: '程序员',
    tab: 'programmer',
    node: <Link href='/topics?tab=programmer'>程序员</Link>,
    icon: <UserOutlined />,
  },
  {
    title: 'Linux',
    tab: 'linux',
    node: <Link href='/topics?tab=linux'>Linux</Link>,
    icon: <CodeOutlined />,
  },
  {
    title: '问与答',
    tab: 'qna',
    node: <Link href='/topics?tab=qna'>问与答</Link>,
    icon: <QuestionCircleOutlined />,
  },
  {
    title: '酷工作',
    tab: 'jobs',
    node: <Link href='/topics?tab=jobs'>酷工作</Link>,
    icon: <DesktopOutlined />,
  },
];

const MenuBar = ({ pathname, children }: MenuBarProps) => {
  console.log('pathname', pathname);

  const [open, setOpen] = useState(false);
  const [drawHeight, setDrawHeight] = useState(1000);

  useEffect(() => {
    setDrawHeight(document.documentElement.clientHeight);
  }, []);

  const sidebar = (
    <List>
      {nodeList.map((item) => {
        return (
          <List.Item
            onClick={() => setOpen(!open)}
            key={item.tab}
            thumb={item.icon}>
            {item.node}
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
        Serverless V2EX
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
