import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { ConnectApiService } from '../_services/connect.api.service';

export const UserExistsGuardGuard: CanActivateFn = (route, state) => {
  const productService = inject(ProductService);
  const productId: number = parseInt(route.params['id']);
  return !isNaN(productId) && productService.productExists(productId);
};
