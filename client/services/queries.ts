import { gql } from "@apollo/client";

/**
 * Query document for getting all the raw storage data in cart page
 * @param {string} user_id Consumer/Providers ID
 */

export const GET_RAW_STORAGE_FOR_CART = gql`
  query StorageByUserId($user_id: ID!) {
    StorageByUserId(user_id: $user_id) {
      user_id
      item_type
      item_name
      quantity
      units_in_measure
      price_per_unit
      _id
      createdAt
      updatedAt
    }
  }
`;

/**
 * Query document for getting the single storage data
 * @param {string} id Id of the the storage
 */

export const GET_RAW_STORAGE_BY_ID_FOR_CART = gql`
  query Storage($id: ID!) {
    Storage(id: $id) {
      user_id
      item_type
      item_name
      quantity
      units_in_measure
      price_per_unit
      _id
    }
  }
`;

/**
 * Query document for getting all the storage in warehouse format
 * @param {string} user_id Consumer/Providers ID
 */

export const GET_WAREHOUSE_STORAGE_FOR_STORAGE = gql`
  query StorageByUserIdWarehouse($user_id: ID!) {
    StorageByUserIdWarehouse(user_id: $user_id) {
      user_id
      item_type
      item_img
      warehouse {
        _id
        items_name
        quanity
        units_in_measure
        price_per_unit
      }
    }
  }
`;

/**
 * Query document for getting the single storage in warehouse format by item_type
 * @param {string} user_id Consumer/Providers ID
 * @param {string} item_type name of the item type
 */

export const GET_WAREHOUSE_BY_ITEM_TYPE = gql`
  query StoragesByUserIdAndItemName($user_id: ID!, $item_type: String!) {
    StoragesByUserIdAndItemName(user_id: $user_id, item_type: $item_type) {
      user_id
      item_img
      item_type
      warehouse {
        _id
        items_name
        quanity
        units_in_measure
        price_per_unit
      }
    }
  }
`;

/**
 * For creating storage items
 * @param {string} user_id Consumer/Providers ID
 * @param {base64} item_img image of the item type
 * @param {string} item_type name of the item type
 * @param {string} item_name name of the item
 * @param {string} quantity quantity of the item
 * @param {string} units_in_measure measurer of the mentioned item name
 * @param {string} price_per_unit price of the mentioned item name, for single item
 *
 * For creating sub items
 * @param {string} user_id Consumer/Providers ID
 * @param {base64} item_img image of the item type (Can't edit)
 * @param {string} item_type name of the item type (Can't edit)
 * @param {string} item_name name of the item
 * @param {string} quantity quantity of the item
 * @param {string} units_in_measure measurer of the mentioned item name
 * @param {string} price_per_unit price of the mentioned item name, for single item
 */

export const CREATE_WAREHOUSE_FOR_STORAGE = gql`
  mutation CreateWareHouse($item_img: String!, $user_id: String!, $item_type: String!, $item_name: String!, $quantity: String!, $units_in_measure: String!, $price_per_unit: String!) {
    CreateWareHouse(item_img: $item_img, user_id: $user_id, item_type: $item_type, item_name: $item_name, quantity: $quantity, units_in_measure: $units_in_measure, price_per_unit: $price_per_unit) {
      _id
    }
  }
`;

/**
 * For editing sub items
 * @param {string} user_id Consumer/Providers ID
 * @param {string} _id id of the storage
 * @param {base64} item_img image of the item in base64 format (can't edit)
 * @param {string} item_type name of the item type (can't edit)
 * @param {string} item_name name of the item (can't edit)
 * @param {string} quantity quantity of the item
 * @param {string} units_in_measure measurer of the mentioned item name
 * @param {string} price_per_unit price of the mentioned item name, for single item
 */

export const EDIT_WAREHOUSE_ID = gql`
  mutation EditWareHouse($_id: String!, $item_img: String!, $user_id: String!, $item_type: String!, $item_name: String!, $quantity: String!, $units_in_measure: String!, $price_per_unit: String!) {
    EditWareHouse(_id: $_id, item_img: $item_img, user_id: $user_id, item_type: $item_type, item_name: $item_name, quantity: $quantity, units_in_measure: $units_in_measure, price_per_unit: $price_per_unit) {
      _id
    }
  }
`;

/**
 * For Deleting the storage
 * @param {string} id Id of the the storage
 */

export const DELETE_WAREHOUSE_BY_ID = gql`
  mutation DeleteWareHouse($ware_house_id: String!) {
    DeleteWareHouse(ware_house_id: $ware_house_id) {
      _id
    }
  }
`;

/**
 * For Retrieving users under a admin
 * @param {unique(string)} admin_id Id of the the admin user
 */

export const GET_USER_BY_ADMIN = gql`
  query UsersByAdmin($admin_id: ID!) {
    UsersByAdmin(admin_id: $admin_id) {
      age
      user_name
      owner_mail
      owner_mobile
      status
      usertype
      _id
      createdAt
      updatedAt
    }
  }
`;
