/**
 * Ésta es la clase que define que se está enviando
 * y recibiendo en las peticiones del API
 */
export class CreateProductDTO {
  readonly name: string;
  readonly description: string;
  readonly price: number;
  readonly imageURL: string;
  readonly createdAt: Date;
}
