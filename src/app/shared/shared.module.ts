import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TaskComponent } from './task/task.component';
import { TaskFormComponent } from './task-form/task-form.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,

        HttpClientModule,

        MatFormFieldModule,
        MatInputModule,
    ],
    declarations: [
        TaskComponent,
        TaskFormComponent,
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,

        HttpClientModule,

        TaskComponent,
        TaskFormComponent
    ]
})
export class SharedModule
{
}
