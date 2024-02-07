import { Drawer, Tag } from "antd";
import { IUser } from "../../types";
import { Space, Typography } from "antd";

const { Text } = Typography;

const SidePanel = ({
  currentUser,
  drawerVisible,
  closeSidePanel,
}: {
  currentUser: IUser | null;
  drawerVisible: boolean;
  closeSidePanel: () => void;
}) => {
  const closeDrawer = () => {
    closeSidePanel();
  };

  return (
    <Drawer
      title="User info"
      placement="left"
      closable={true}
      onClose={closeDrawer}
      open={drawerVisible}
      width={300}
    >
      {currentUser && (
        <Space direction="vertical">
          <Space>
            <Text strong>Name: </Text>
            <Text>{currentUser.name}</Text>
          </Space>
          <Space>
            <Text strong>email: </Text>
            <Text>{currentUser.email}</Text>
          </Space>
          <Space>
            <Text strong>balance: </Text>
            <Text>{currentUser.balance}</Text>
          </Space>
          <Space>
            <Text strong>isActive: </Text>
            <Tag color={currentUser.isActive ? "green" : "red"}>
              {currentUser.isActive ? "TRUE" : "FALSE"}
            </Tag>
          </Space>
        </Space>
      )}
    </Drawer>
  );
};

export default SidePanel;
