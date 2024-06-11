import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CapitalizePipe } from '../utils/capitalize.pipe';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';
type Sort = "Asc" | "Desc" | "None";
@Component({
  selector: 'app-dynamic-table',
  standalone: true,
  imports: [CommonModule, CapitalizePipe], 
  template: `
  <table class="table-auto w-full">
    <thead class="py-4 border">
      <tr>
        <th *ngFor="let col of columns()">
          <div class="text-2xl text-gray-800 flex flex-row justify-center"> 
            <div> {{ col.name | capitalize : "titleCase" }} </div>
            <fa-icon></fa-icon>
          </div>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr class="border border-l-1 text-center" *ngFor="let row of data" >
        <td *ngFor="let col of columns()">{{ row[col.name] }}</td>
      </tr>
    </tbody>
  </table>
`,
})
export class DynamicTableComponent {
  @Input({required: true}) data: any[] = [];
  iconUp = faAngleUp
  iconDown = faAngleDown
  
  columns(): {name: string, sort: Sort}[] {
   if(!this.data || this.data.length === 0) {
    return [];
   }
   return Array.from(new Set<string>(this.data.flatMap(Object.keys))).map(key => ({name: key, sort: "None"}))
  }


}
