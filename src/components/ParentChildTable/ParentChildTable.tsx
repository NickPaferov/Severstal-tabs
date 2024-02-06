import { Table } from "antd";
import { IColumn, IUser } from "../../types";

const ParentChildTable = ({
  users,
  columns,
}: {
  users: IUser[];
  columns: IColumn[];
}) => {
  const getObjChildren = (data: IUser[]) => {
    const children = data.reduce((obj: { [key: number]: IUser[] }, item) => {
      item.key = item.id;
      const index = item.parentId;

      !obj[index] ? (obj[index] = [item]) : obj[index].push(item);

      return obj;
    }, {});

    return children;
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

  const getRootParents = (data: IUser[]) => {
    const objChildren = addChildren(data);
    const parentKeys = Object.keys(objChildren);

    const rootParents = parentKeys.reduce((arr: IUser[], key) => {
      return arr.concat(objChildren[+key]);
    }, []);

    return rootParents;
  };

  const getTableData = (data: IUser[]) => {
    const rootParents = getRootParents(data);

    return rootParents;
  };

  const config = {
    dataSource: getTableData(users),
    columns: columns,
  };

  return <Table {...config}></Table>;
};

export default ParentChildTable;
