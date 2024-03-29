import type { RefineThemedLayoutV2HeaderProps } from "@refinedev/antd";
import { useGetIdentity } from "@refinedev/core";
import {
  Layout as AntdLayout,
  Avatar,
  Space,
  Typography,
} from "antd";
import React from "react";

const { Text } = Typography;


type IUser = {
  id: number;
  name: string;
  avatar: string;
};

export const Header: React.FC<RefineThemedLayoutV2HeaderProps> = ({
  isSticky,
}) => {
  const { data: user } = useGetIdentity<IUser>();

  const headerStyles: React.CSSProperties = {
    backgroundColor: 'white',
    backgroundImage: `url(${process.env.REACT_APP_PUBLIC_URL}/assets/orlandofox_banner.png)`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    padding: "0px 24px",
    height: "64px",
  };

  if (isSticky) {
    headerStyles.position = "sticky";
    headerStyles.top = 0;
    headerStyles.zIndex = 1;
  }

  return (
    <AntdLayout.Header style={headerStyles}>
      <div style={{ 
        verticalAlign: 'center', 
        marginTop: '40px', 
        backgroundColor: 'white', 
        height:'12px', 
        fontSize: '90%',
        display: 'flex',
        alignItems: 'center',
        fontWeight: 'bold' 
      }}>
          Banner by Orlando Fox [<a rel="noreferrer" href="https://twitter.com/orlando_fox" target="_blank">Twitter</a> - <a rel="noreferrer" href="https://www.afoxdraws.com/" target="_blank">Website</a>]
      </div>
      <Space>
        <Space style={{ marginLeft: "8px" }} size="middle">
          {user?.name && <Text strong>{user.name}</Text>}
          {user?.avatar && <Avatar src={user?.avatar} alt={user?.name} />}
        </Space>
      </Space>
    </AntdLayout.Header>
  );
};
