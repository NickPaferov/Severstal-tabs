import { Drawer } from "antd";
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
            <Text type="secondary">Name: </Text>
            {currentUser.name}
          </Space>
          <Space>
            <Text type="secondary">Email: </Text>
            {currentUser.email}
          </Space>
          <Space>
            <Text type="secondary">Balance: </Text>
            {currentUser.balance}
          </Space>
          <Space>
            <Text type="secondary">isActive: </Text>
            {`${currentUser.isActive}`}
          </Space>
        </Space>
      )}
    </Drawer>
  );
};

export default SidePanel;
