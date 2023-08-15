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
  warehouse: Array<IGetStorageWareHouseData>;
}

export type { IStorageMainItems, IStorageSubItems, IGetStorageData, IGetStorageWareHouseData };
