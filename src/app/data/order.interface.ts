export enum StatusEnum {
  InProgress = 'InProgress',
  Pending = 'Pending',
  Complete = 'Complete'
}

export enum UnitsEnum {
  M_Qube = 'm3',
  TN = 'TN'
}

export interface IOrder {
  status: StatusEnum;
  id: number;
  productLine: string;
  product: string;
  quantity: number;
  units: UnitsEnum;
  dateRequested: string;
}
