import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';

import { ProductsModule } from './products/products.module';

import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { UserGuard } from './user/user.guard';
import { RolesGuard } from './user/roles/roles.guard';

@Module({
  imports: [
    //cap.15 - agregar el modulo Config que nos permite acceder a las variables de entorno.
    ConfigModule.forRoot(),
    //cap.15 - configuracion de base de datos en el servidor
    MongooseModule.forRoot(`${process.env.MONGODB_URL}`),
    ProductsModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'APP_GUARD',
      useClass: UserGuard,
    },
    {
      provide: 'APP_GUARD',
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
