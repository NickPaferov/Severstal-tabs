import { Table } from "antd";
import { useState } from "react";
import { IColumn, IUser, SortedColumn } from "../../types";
import SidePanel from "../SidePanel/SidePanel";

const ParentChildTable = ({
  users,
  columns,
}: {
  users: IUser[];
  columns: IColumn[];
}) => {
  const [sortedColumn, setSortedColumn] = useState<SortedColumn | null>(null);
  const [sortedOrder, setSortedOrder] = useState<"asc" | "desc">("asc");
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);

  const handleSort = (column: IColumn) => {
    if (["name", "balance", "isActive"].includes(column.key)) {
      const isAsc = sortedColumn === column.key && sortedOrder === "asc";
      const newSortedOrder = isAsc ? "desc" : "asc";
      setSortedColumn(column.key as SortedColumn);
      setSortedOrder(newSortedOrder);
    }
  };

  const getObjChildren = (data: IUser[]) => {
    return data.reduce((obj: { [key: number]: IUser[] }, item) => {
      item.key = item.id;
      const index = item.parentId;

      !obj[index] ? (obj[index] = [item]) : obj[index].push(item);

      return obj;
    }, {});
  };

  const addChildren = (data: IUser[]) => {
    const objChildren = getObjChildren(data);
    data.forEach((row) => {
      const indexRow = row.id;

      if (objChildren[indexRow]) {
        row.children = objChildren[indexRow];
        delete objChildren[indexRow];
      }
    });
    return objChildren;
  };

  const getTableData = (data: IUser[]) => {
    const objChildren = addChildren(data);
    const parentKeys = Object.keys(objChildren);

    return parentKeys.reduce((arr: IUser[], key) => {
      return arr.concat(objChildren[+key]);
    }, []);
  };

  const sortedData = () => {
    const rootParents = getTableData(users);

    if (sortedColumn) {
      return rootParents.sort((a, b) => {
        const aValue = a[sortedColumn as SortedColumn];
        const bValue = b[sortedColumn as SortedColumn];

        if (sortedOrder === "asc") {
          return aValue > bValue ? 1 : -1;
        } else {
          return bValue > aValue ? 1 : -1;
        }
      });
    }

    return rootParents;
  };

  const renderSortArrow = (columnKey: string) => {
    if (sortedColumn === columnKey) {
      return sortedOrder === "asc" ? "↑" : "↓";
    }
    return null;
  };

  const handleOnRow = (user: IUser) => {
    setSelectedUser(user);
    setIsSidePanelOpen(true);
  };

  const closeSidePanel = () => {
    setIsSidePanelOpen(false);
  };

  const config = {
    dataSource: sortedData(),
    columns: columns.map((column) => ({
      ...column,
      title: (
        <>
          {column.title} {renderSortArrow(column.key)}
        </>
      ),
      onHeaderCell: () => ({
        onClick: () => handleSort(column),
      }),
    })),
    onRow: (record: IUser) => ({
      onClick: () => handleOnRow(record),
    }),
  };

  return (
    <>
      <Table {...config}></Table>
      <SidePanel
        currentUser={selectedUser}
        drawerVisible={isSidePanelOpen}
        closeSidePanel={closeSidePanel}
      />
    </>
  );
};

export default ParentChildTable;
