import { Injectable } from '@nestjs/common';
import { ProductsRepository } from './products.repository';

@Injectable()
export class ProductsService {
  constructor(private readonly productsRepository: ProductsRepository) {}

  getProducts(page: number, limit: number) {
    return this.productsRepository.getProducts(page, limit);
  }

  addProducts() {
    return this.productsRepository.addProducts();
  }

  //! HACER SERVICIOS EXTRAS DEL REPOSITORIO
}
