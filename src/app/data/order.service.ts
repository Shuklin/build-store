import { Injectable } from '@angular/core';
import {ORDERS_MOCK_DATA} from "./order.mock-data";
import {Observable, of} from "rxjs";
import {IOrder} from "./order.interface";

@Injectable({
  providedIn: 'root',
})
export class OrderService {

  constructor() { }

  getOrders(): Observable<IOrder[]> {
    return of(ORDERS_MOCK_DATA)
  }

}
