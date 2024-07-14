import {Component, OnInit} from '@angular/core';
import {IOrder} from "../data/order.interface";
import {OrderService} from "../data/order.service";
import {CommonModule} from "@angular/common";
import {OrderCardComponent} from "./order-card/order-card.component";
import {MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {MatNativeDateModule, MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatIconModule} from "@angular/material/icon";
import {FilterPipe} from "../shared/pipes/filter.pipe";
import {SearchIdPipe} from "../shared/pipes/search.pipe";
import {DateRangePipe} from "../shared/pipes/date-range.pipe";

@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [
    CommonModule,
    OrderCardComponent,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatOptionModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    FilterPipe,
    SearchIdPipe,
    DateRangePipe
  ],
  providers: [
    MatDatepickerModule
  ],
  templateUrl: './order-list.component.html',
  styleUrl: './order-list.component.scss'
})
export class OrderListComponent implements OnInit {
  orders: IOrder[] = [];

  productLinesList: string[] = [];

  filterForm = new FormGroup({
    status: new FormGroup({
      pending: new FormControl(false),
      progress: new FormControl(false),
      completed: new FormControl(false),
    }),
    productLines: new FormControl([]),
    dateRange: new FormGroup({
      dateFrom: new FormControl(),
      dateTo: new FormControl(),
    }),
    search: new FormControl('')
  })

  constructor(private orderService: OrderService) {
  }

  ngOnInit() {
    this.orderService.getOrders().subscribe(orders => {
      this.orders = orders;
      this.getProductLinesList(orders);


    })

    this.filterForm.valueChanges.subscribe(val => {
      console.log(val)
      // console.log(this.filterForm.value)
    })
  }

  getProductLinesList(orders: IOrder[]) {
    const productLines = orders.map(order => order.productLine);
    const uniqueProductLines = new Set(productLines);
    const uniqueProductLinesArray = [...uniqueProductLines];
    this.productLinesList = uniqueProductLinesArray;
    return;
  }

  getFilterStatusArray() {
    const statusFormValue = this.filterForm.value['status'];

    if (!statusFormValue) {
      return []
    }

    const statusArray = [];
    if (statusFormValue['pending']) {
      statusArray.push('Pending')
    }
    if (statusFormValue['completed']) {
      statusArray.push('Complete')
    }
    if (statusFormValue['progress']) {
      statusArray.push('InProgress')
    }

    return statusArray
  }

  getFilterProductLineArray() {
    return this.filterForm.value['productLines'] || [];
  }

  getSearchIdLine() {
    return this.filterForm.value['search'] || '';
  }

  getDateFormValue(dateType: 'dateFrom'|'dateTo') {
    const dateRange = this.filterForm.value['dateRange'];

    if (!dateRange) return undefined;

    if (dateType === 'dateFrom') return dateRange.dateFrom;
    if (dateType === 'dateTo') return dateRange.dateTo;

    return undefined
  }
}
