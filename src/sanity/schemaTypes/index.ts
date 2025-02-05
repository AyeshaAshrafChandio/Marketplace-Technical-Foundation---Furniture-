import { type SchemaTypeDefinition } from 'sanity'

import Inventory from './modelTypes/Inventory'
import shipment from './modelTypes/shipment'
import Order from './modelTypes/Order'
import User from './modelTypes/User'
import Analytics from './modelTypes/Analytics'
import { Category } from './modelTypes/category'
import { product } from './modelTypes/product'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [product,Category, Inventory, shipment, Order, User, Analytics],
}
