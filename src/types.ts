export interface IUser {
  id: number;
  parentId: number;
  isActive: boolean;
  balance: string;
  name: string;
  email: string;
  key?: number;
  children?: IUser[];
}

export interface IColumn {
  title: string;
  dataIndex: string;
  key: string;
}

export type SortedColumn = "name" | "balance" | "isActive"
