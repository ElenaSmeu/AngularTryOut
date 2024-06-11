import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { CapitalizePipe } from '../utils/capitalize.pipe';
import { faArrowDownLong, faArrowUpLong } from '@fortawesome/free-solid-svg-icons';
import {
  FontAwesomeModule,
} from '@fortawesome/angular-fontawesome';
type SortDirection = "Asc" | "Desc" | "None";
@Component({
  selector: 'app-dynamic-table',
  standalone: true,
  imports: [CommonModule, CapitalizePipe, FontAwesomeModule], 
  template: `
  <table class="table-auto w-full">
    <thead class="py-10 bg-gray-100 rounded-t">
      <tr>
        <th *ngFor="let col of columns">
          <div class="text-3xl text-gray-800 flex flex-row justify-center items-center"> 
            <div> {{ col.name | capitalize : "titleCase" }} </div>
            <div class="flex flex-row pl-2 justify-center cursor-pointer">
            <div [ngClass]="{'text-red-800' : col.sort =='Asc'}"  class="text-sm pr-1" (click)="applySortBy(col.name, 'Asc')"> <fa-icon [icon]="iconUp"></fa-icon> </div>
            <div [ngClass]="{'text-red-800' : col.sort =='Desc'}"  class="text-sm" (click)="applySortBy(col.name, 'Desc')"> <fa-icon [icon]="iconDown"></fa-icon> </div>
          </div>
          </div>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr class="border border-l-1 text-center text-lg" *ngFor="let row of data" >
        <td *ngFor="let col of columns" class="p-2" >{{ row[col.name] }}</td>
      </tr>
    </tbody>
  </table>
`,
})
export class DynamicTableComponent implements OnInit {
  @Input({required: true}) data: any[] = [];
  iconUp = faArrowDownLong
  iconDown = faArrowUpLong
  columns : {name: string, sort: SortDirection}[]  = []

  ngOnInit() {
    this.columns = this.processColumns();

  }
  
  processColumns(): {name: string, sort: SortDirection}[] {
   if(!this.data || this.data.length === 0) {
    return [];
   }
   return Array.from(new Set<string>(this.data.flatMap(Object.keys))).map(key => ({name: key, sort: "None"}))
  }

  applySortBy(col: string, sortType: SortDirection): void {
    this.columns = this.columns.map(({name}) => {
     return  name == col ? {name, sort: sortType } : {name, sort : "None"}
    });
    console.log(col, sortType);
  }




}
