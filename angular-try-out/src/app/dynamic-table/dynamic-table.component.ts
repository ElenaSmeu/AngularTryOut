import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  OnDestroy,
  OnInit,
  Output,
  output,
} from '@angular/core';
import { CapitalizePipe } from '../utils/capitalize.pipe';
import {
  faArrowDownLong,
  faArrowUpLong,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
type SortDirection = 'Asc' | 'Desc' | 'None';
@Component({
  selector: 'app-dynamic-table',
  standalone: true,
  imports: [CommonModule, CapitalizePipe, FontAwesomeModule],
  template: `
    <table class="table-auto w-full">
      <thead class="py-10 bg-gray-100 rounded-t">
        <tr>
          <th *ngFor="let col of columns">
            <div
              class="text-3xl text-gray-800 flex flex-row justify-center items-center cursor-pointer"
            >
              <div (click)="applySortBy(col)" class="hover:text-blue-600">
                {{ col | capitalize : 'titleCase' }}
              </div>
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          class="border border-l-1 text-center text-lg cursor-pointer hover:bg-gray-200"
          *ngFor="let row of data"
          (click)="selectRow(row)"
        >
          <td *ngFor="let col of columns" class="p-2">{{ row[col] }}</td>
        </tr>
      </tbody>
    </table>
  `,
})
export class DynamicTableComponent implements OnInit {
  @Input({ required: true }) data: any[] = [];

  iconUp = faArrowDownLong;
  iconDown = faArrowUpLong;
  columns: string[] = [];
  sortby: string = '';
  sortDirection: SortDirection = 'Asc';
  rowSelected = output<any>();

  ngOnInit() {
    this.columns = this.processColumns();
  }

  processColumns(): string[] {
    if (!this.data || this.data.length === 0) {
      return [];
    }
    return Array.from(new Set<string>(this.data.flatMap(Object.keys)));
  }
  getNextSortDirection(isSameColumn: boolean): SortDirection {
    if (isSameColumn) {
      switch (this.sortDirection) {
        case 'Asc':
          return 'Desc';
        default:
          return 'Asc';
      }
    } else {
      return 'Asc';
    }
  }

  applySortBy(col: string): void {
    this.sortDirection = this.getNextSortDirection(this.sortby == col);
    this.sortby = col;
    this.data.sort((a, b) => {
      const compareTermA = a[col];
      const compareTermB = b[col];
      switch (typeof compareTermA) {
        case 'string':
          return compareTermA.localeCompare(compareTermB);
        case 'number':
          return compareTermA > compareTermB;
        default:
          return compareTermA;
      }
    });
    if (this.sortDirection == 'Asc') {
      return;
    }
    this.data.reverse();
  }
  selectRow(row: any): void {
    this.rowSelected.emit(row);
  }
}
