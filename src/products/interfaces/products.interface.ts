/**
 * Define el tipo de dato que esperamos recibir y/o enviar
 * desde las peticiones y debe extender de la clase Document de
 * la libreria mongoose
 */
import { Document } from 'mongoose';

export interface Product extends Document {
  readonly name: string;
  readonly description: string;
  readonly price: number;
  readonly imageURL: string;
  readonly createdAt: string;
}
