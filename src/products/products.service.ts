import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { Product } from './interfaces/products.interface';
import { CreateProductDTO } from './dto/products.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
  ) {}

  //Método para crear un producto
  //Create
  async createProduct(productToSave: CreateProductDTO): Promise<Product> {
    const newProduct = new this.productModel(productToSave);
    return await newProduct.save();
  }

  //Método para obtener todos los productos
  //Read all
  async getProducts(): Promise<Product[]> {
    const products = await this.productModel.find();
    return products;
  }

  //Método para obtener un producto
  //Read one
  async getProduct(id: string): Promise<Product> {
    const product = await this.productModel.findById(id);
    return product;
  }

  //Método para actualizar un producto
  //Update
  async updateProduct(
    id: string,
    productToUpdate: CreateProductDTO,
  ): Promise<Product> {
    const product = await this.productModel.findByIdAndUpdate(
      id,
      productToUpdate,
      { new: true },
    );
    return product;
  }

  //Método para eliminar un producto
  //Delete
  async deleteProduct(id: string): Promise<Product> {
    const product = await this.productModel.findByIdAndDelete(id);
    return product;
  }
}
