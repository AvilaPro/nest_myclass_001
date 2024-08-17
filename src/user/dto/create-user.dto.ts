import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  //propiedad: nombre del usuario
  @IsString()
  readonly name: string;

  //propiedad: email del usuario
  //el email del usuario debe ser obligatorio en todas las peticiones.
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  //propiedad: contrasena del usuario
  //la contrasena es obviamente obligatoria
  @IsNotEmpty()
  @MinLength(6)
  readonly password: string;

  //propiedad: rol del usuario
  //importante para validar acciones del usuario
  @IsString()
  readonly roles: string;

  //propiedad: telefono del usuario (opcional)
  @IsString()
  readonly phone: string;
}
