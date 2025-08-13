'use client';

import { Layout, Menu } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import { FC, ReactNode } from "react";
import Link from 'next/link';
import "./index.css";
import { usePathname } from 'next/navigation';

type Props = {
  children?: ReactNode;
};

const items = [
  { key: "/", label: <Link href="/">Home</Link> },
  { key: "/posts", label: <Link href="/posts">Posts</Link> },
  { key: "/albums", label: <Link href="/albums">Albums</Link> },
  { key: "/todos", label: <Link href="/todos">Todos</Link> },
];

const CustomLayout: FC<Props> = ({ children }: Props) => {
    const pathname = usePathname();

  return (
    <Layout className="layout">
      <Header className="header">
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={[pathname]}
          selectedKeys={[pathname]}
          items={items.map((item) => ({
            ...item,
            key: item.key,
            label: item.label,
          }))}
          style={{ flex: 1, minWidth: 0 }}
        />
      </Header>
      <Content className="content">
        {children}
      </Content>
      <Footer className="footer">Footer</Footer>
    </Layout>
  );
};

export default CustomLayout;