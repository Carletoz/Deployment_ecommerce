import { Controller, Get, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly ProductsService: ProductsService) {}

  @Get()
  getProducts(@Query('page') page: string, @Query('limit') limit: string) {
    return this.ProductsService.getProducts(Number(page), Number(limit));
  }

  @Get('seeder')
  addProducts() {
    return this.ProductsService.addProducts();
  }
}
