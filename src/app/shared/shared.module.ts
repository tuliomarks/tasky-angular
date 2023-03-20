import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TaskComponent } from './task/task.component';
import { TaskFormComponent } from './task-form/task-form.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,

        HttpClientModule,

        MatFormFieldModule,
        MatInputModule,
        MatIconModule
    ],
    declarations: [
        TaskComponent,
        TaskFormComponent,
        HeaderComponent
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,

        HttpClientModule,

        TaskComponent,
        TaskFormComponent,
        HeaderComponent
    ]
})
export class SharedModule
{
}
