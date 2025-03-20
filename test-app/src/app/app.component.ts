import { Component } from '@angular/core';
import {
  EditableTableComponent,
  TableCell,
} from './editable-table/editable-table.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [EditableTableComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  cells: TableCell[][] = [
    [
      { type: 'text', value: 'A1' },
      { type: 'select', value: 'Option 1', options: ['Option 1', 'Option 2'] },
      { type: 'value', value: '123' },
      { type: 'text', value: 'B1' },
      { type: 'value', value: '456' },
    ],
    [
      { type: 'value', value: '789' },
      { type: 'text', value: 'C1' },
      { type: 'select', value: 'Option 2', options: ['Option 1', 'Option 2'] },
      { type: 'value', value: '101' },
      { type: 'text', value: 'D1' },
    ],
    [
      { type: 'text', value: 'E1' },
      { type: 'value', value: '112' },
      { type: 'text', value: 'F1' },
      { type: 'select', value: 'Option 1', options: ['Option 1', 'Option 2'] },
      { type: 'value', value: '131' },
    ],
    [
      { type: 'value', value: '415' },
      { type: 'text', value: 'G1' },
      { type: 'value', value: '161' },
      { type: 'text', value: 'H1' },
      { type: 'select', value: 'Option 2', options: ['Option 1', 'Option 2'] },
    ],
  ];
}
