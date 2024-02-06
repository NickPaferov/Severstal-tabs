import { Tag } from "antd";
import "./App.css";
import ParentChildTable from "./components/ParentChildTable/ParentChildTable";
import data from "./data/default";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "balance",
    dataIndex: "balance",
    key: "balance",
  },
  {
    title: "isActive",
    dataIndex: "isActive",
    key: "isActive",
    render: (row: boolean) => {
      return <Tag color={row ? "green" : "red"}>{row ? "TRUE" : "FALSE"}</Tag>;
    },
  },
];

const App = () => {
  return (
    <div className="app-container">
      <ParentChildTable users={data} columns={columns} />
    </div>
  );
};

export default App;
