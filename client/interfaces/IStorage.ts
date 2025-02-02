interface IStorageMainItems {
  itemsName: string;
  img: string;
  total: number;
}

interface IStorageSubItems {
  itemsName: string;
  price: number;
  measurer: string;
  stocks: number;
  lastupdate: string;
}

interface IGetStorageWareHouseData {
  _id: string;
  items_name: string;
  quanity: string;
  units_in_measure: string;
  price_per_unit: string;
  created_at: string;
  last_update: string;
}

interface IGetStorageData {
  user_id: string;
  item_type: string;
  item_img: string;
  warehouse: Array<IGetStorageWareHouseData>;
}

interface ICreateStorage {
  user_id: string;
  item_type: string;
  item_name: string;
  quantity: string;
  units_in_measure: string;
  price_per_unit: string;
  item_img: string;
}

interface IEditStorage extends ICreateStorage {
  _id: string;
}

interface IGetRawStorage {
  _id: string;
  item_img: string;
  user_id: string;
  item_type: string;
  item_name: string;
  quantity: number;
  units_in_measure: string;
  price_per_unit: number;
  createdAt: string;
  updatedAt: string;
}

interface ICartStorageManagement {
  actualStorage: Array<IGetRawStorage>;
  usedStorage: Array<IGetRawStorage>;
}

interface IGetRawStorageByUserIDApollo<T> {
  StorageByUserId: Array<T>;
}

interface IGetRawStorageByIDApollo<T> {
  Storage: T;
}

interface IGetWareHouseStorageApollo {
  StorageByUserIdWarehouse: Array<IGetStorageData>;
}

interface IGetWareHouseByItemTypeApollo {
  StoragesByUserIdAndItemName: IGetStorageData;
}

export type { IStorageMainItems, IStorageSubItems, IGetStorageData, IGetStorageWareHouseData, ICreateStorage, IGetRawStorage, ICartStorageManagement, IGetRawStorageByUserIDApollo, IGetRawStorageByIDApollo, IGetWareHouseStorageApollo, IGetWareHouseByItemTypeApollo, IEditStorage };
