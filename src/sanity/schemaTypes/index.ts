import { type SchemaTypeDefinition } from 'sanity'
import product from './modelTypes/product'
import Inventory from './modelTypes/Inventory'
import shipment from './modelTypes/shipment'
import Order from './modelTypes/Order'
import User from './modelTypes/User'
import Analytics from './modelTypes/Analytics'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [product, Inventory, shipment, Order, User, Analytics],
}
