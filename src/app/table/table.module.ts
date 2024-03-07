import { NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { TableComponent } from './table.component';

@NgModule({
  declarations: [
    TableComponent
  ],
  imports: [
    MatTableModule
  ],
  exports: [
    TableComponent
  ]
})
export class TableModule { }
