import React, { ReactNode } from 'react';
import { LocaleProvider } from 'antd-mobile';
import enUS from 'antd-mobile/lib/locale-provider/en_US';
import { MenuBar } from './MenuBar';
import { BackButton } from './BackButton';

type Props = {
  children?: ReactNode;
  title?: string;
  tab?: string;
  language?: string;
};

const Layout = ({ language, children }: Props) => {
  const locale: any =
    language && language.substr(0, 2) === 'en' ? enUS : undefined;

  return (
    <LocaleProvider locale={locale}>
      <MenuBar>
        {children} <BackButton />
      </MenuBar>
    </LocaleProvider>
  );
};

export default Layout;
