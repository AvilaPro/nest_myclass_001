import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';

import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ProductsModule,
    UsersModule,
    MongooseModule.forRoot('mongodb://localhost:27017/products_nest_clase'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
