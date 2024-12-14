import {
  Controller,
  Get,
  HttpStatus,
  Res,
  Post,
  Body,
  Param,
  NotFoundException,
  Query,
  Put,
  Delete,
} from '@nestjs/common';
import { ProductsService } from './products.service';

import { CreateProductDTO } from './dto/products.dto';
import { Roles } from 'src/decorators';
import { Role } from 'src/rol.enum';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  //Ruta para obtener todos los productos
  //Get All
  @Roles(Role.Admin, Role.User)
  @Get('/')
  async getAllProducts(@Res() res) {
    const products = await this.productsService.getProducts();
    return res.status(HttpStatus.OK).json({
      message: 'Todos los productos enviados',
      products,
    });
  }

  //13.5.2
  @Roles(Role.User, Role.Admin)
  //Ruta para obtener un producto
  //Get one
  @Get('/:id')
  async getProduct(@Res() res, @Param('id') id: string) {
    const product = await this.productsService.getProduct(id);
    if (!product) {
      throw new NotFoundException('Producto solicitado NO encontrado');
    }
    return res.status(HttpStatus.OK).json({
      message: 'Producto encontrado',
      product,
    });
  }

  //13.5.2
  @Roles(Role.Admin)
  //Ruta para crear un producto
  //Post Create
  @Post('/create')
  async createProduct(@Res() res, @Body() productCreate: CreateProductDTO) {
    const product = await this.productsService.createProduct(productCreate);
    return res.status(HttpStatus.CREATED).json({
      message: 'Producto creado correctamente',
      product,
    });
  }

  //13.5.2
  @Roles(Role.Admin)
  //Ruta para actualizar un producto
  //Put Update
  @Put('/update')
  async updateProduct(
    @Res() res,
    @Body() productUpdated: CreateProductDTO,
    @Query('id') productId,
  ) {
    const product = await this.productsService.updateProduct(
      productId,
      productUpdated,
    );
    if (!product) {
      throw new NotFoundException('Producto por actualizar NO encontrado');
    }
    return res.status(HttpStatus.ACCEPTED).json({
      message: 'Producto actualizado correctamente',
      product,
    });
  }

  //13.5.2
  @Roles(Role.Admin)
  //Ruta para eliminar un producto
  //Delete Delete
  @Delete('/delete')
  async deleteProduct(@Res() res, @Query('id') id: string) {
    const product = await this.productsService.deleteProduct(id);
    if (!product) {
      throw new NotFoundException('Producto NO encontrado para eliminar');
    }
    return res.status(HttpStatus.OK).json({
      message: 'Producto eliminado correctamente',
      product,
    });
  }
}
