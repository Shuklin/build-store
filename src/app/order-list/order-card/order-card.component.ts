import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {IOrder, StatusEnum} from "../../data/order.interface";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-order-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-card.component.html',
  styleUrl: './order-card.component.scss'
})
export class OrderCardComponent implements OnChanges {
  @Input() order: IOrder | undefined = undefined;

  statusClass: string = '';

  ngOnChanges(changes: SimpleChanges) {
    if (changes['order']) {
      this.setStatusStyle(changes['order'].currentValue.status);
    }
  }

  setStatusStyle(status: StatusEnum) {
    let statusClass = 'order-status-'
    switch (status) {
      case StatusEnum.Complete:
        statusClass += 'completed';
        break;
      case StatusEnum.InProgress:
        statusClass += 'progress';
        break;
      case StatusEnum.Pending:
        statusClass += 'pending';
        break;
      default:
        statusClass = ''
    }
    this.statusClass = statusClass;
    return;
  }
}
