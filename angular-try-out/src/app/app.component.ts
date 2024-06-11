import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DynamicTableComponent } from "./dynamic-table/dynamic-table.component";
import { CapitalizePipe } from './utils/capitalize.pipe';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, DynamicTableComponent]
})
export class AppComponent {
  title = 'angular-try-out';
  tableData = [
    { id: 1, name: 'John Doe', age: 30 },
    { id: 2, name: 'Jane Smith', age: 25 }
  ]
}
