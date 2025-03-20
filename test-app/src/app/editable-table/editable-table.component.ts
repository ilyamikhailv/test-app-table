import {
  Component,
  Input,
  ElementRef,
  ChangeDetectionStrategy,
  HostListener,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Интерфейс, описывающий ячейку таблицы
export type TableCell = {
  type: 'text' | 'select' | 'value'; // Тип ячейки
  value: string; // Значение ячейки
  options?: string[]; // Опции для выпадающего списка (если type === 'select')
};

@Component({
  selector: 'app-editable-table',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './editable-table.component.html',
  styleUrls: ['./editable-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditableTableComponent {
  private readonly cmp = inject(ElementRef<HTMLInputElement>);
  @Input() cells: TableCell[][] = []; // Данные таблицы
  focusedRow = 0; // Индекс текущей строки
  focusedCol = 0; // Индекс текущего столбца
  editMode = false; // Флаг режима редактирования

  // Вход в режим редактирования
  enterEditMode(row: number, col: number) {
    if (this.cells[row][col].type === 'value') return;
    this.focusedRow = row;
    this.focusedCol = col;
    this.editMode = true;
    this.cmp.nativeElement.querySelector(`#input-${row}-${col}`)?.focus();
  }

  // Выход из режима редактирования
  exitEditMode() {
    this.editMode = false;
  }

  // Обработка клавиш Enter и Escape внутри полей ввода
  handleInputKeydown(
    event: KeyboardEvent,
    input: HTMLInputElement | HTMLSelectElement
  ) {
    if (event.key === 'Enter' || event.key === 'Escape') {
      this.exitEditMode();
      input.blur();
      event.stopPropagation();
    }
  }

  // Обработка навигации по таблице с помощью клавиатуры
  @HostListener('document:keydown', ['$event'])
  handleTableNavigation(event: KeyboardEvent) {
    if (this.editMode) return;
    switch (event.key) {
      case 'ArrowUp':
        this.focusedRow = Math.max(0, this.focusedRow - 1);
        break;
      case 'ArrowDown':
        this.focusedRow = Math.min(this.cells.length - 1, this.focusedRow + 1);
        break;
      case 'ArrowLeft':
        this.focusedCol = Math.max(0, this.focusedCol - 1);
        break;
      case 'ArrowRight':
        this.focusedCol = Math.min(
          this.cells[0].length - 1,
          this.focusedCol + 1
        );
        break;
      case 'Enter':
        this.enterEditMode(this.focusedRow, this.focusedCol);
        break;
    }
  }
}
