/**
 * El schema debe establecer las reglas del documento a ser guardado
 */
import { Schema } from 'mongoose';

export const ProductSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  imageURL: String,
  createdAt: { type: Date, default: Date.now },
});
