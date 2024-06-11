import { Component, OnInit, Signal, viewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DynamicTableComponent } from './dynamic-table/dynamic-table.component';
import dataJson from './data/dataJson.json';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `<div class="main p-4 flex flex-col justify-center">
      <div class="text-gray-600 text-3xl">Welcome to my table</div>
      <div class="w-auto p-4">
        <app-dynamic-table
          [data]="tableData"
          (onRowSelected)="dataHasBeenSelected($event)"
        ></app-dynamic-table>
      </div>
    </div>
    <router-outlet />`,
  imports: [RouterOutlet, DynamicTableComponent],
})
export class AppComponent implements OnInit {
  title = 'angular-try-out-new-functionality';
  tableData = dataJson.tableData;
  dynamicTableRef: Signal<DynamicTableComponent> = viewChild.required(
    DynamicTableComponent
  );

  ngOnInit(): void {
    this.dynamicTableRef().rowSelected.subscribe(this.dataHasBeenSelected);
  }
  public dataHasBeenSelected(rowData: any): void {
    const dataPoints = Object.keys(rowData);
    alert(dataPoints.map((dataPoint) => dataPoint + ': ' + rowData[dataPoint]));
  }
}
