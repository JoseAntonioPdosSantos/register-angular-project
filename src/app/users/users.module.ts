import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { AppMaterialModule } from '../shared/app-material/app-material.module';
import { UserFormComponent } from './user-form/user-form.component';
import { UserTableComponent } from './user-table/user-table.component';
import { UsersRoutingModule } from './users-routing.module';

@NgModule({
  declarations: [UserTableComponent, UserFormComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    AppMaterialModule,
    ReactiveFormsModule,
  ],
})
export class UsersModule {}
