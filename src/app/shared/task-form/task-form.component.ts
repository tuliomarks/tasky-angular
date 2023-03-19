import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { tap } from 'rxjs';
import { Task } from '../models/task.model';
import { TasksService } from '../services/tasks.service';

@Component({
  selector: 'task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnInit
{
  @Input() model: Task;
  @Input() showCancel: boolean;
  @Input() clearFormWhenSubmit = false;

  @Output() onClose = new EventEmitter();

  form: UntypedFormGroup;

  constructor(
    private _formBuilder: UntypedFormBuilder,
    private _service: TasksService
  ) {}

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.form = this._formBuilder.group({
      id          : [ this.model?.id ],
      title       : [ this.model?.title, [Validators.required]],
      description : [ this.model?.description, [Validators.required]],
      list        : [ this.model?.list || 'todo' ],
    });
  }

  submit() {
    if (this.form.valid){
      const formData = this.form.getRawValue();

      let serviceObservable = this._service.putTask(formData);
        
      if (!formData.id){
        serviceObservable = this._service.postTask(formData)
          .pipe(tap(result => {
            // update the id retrieved to send correctly the put in the second submit
            this.form.patchValue({id: result.id});
          })
        );
      } 

      // handle post or put
      serviceObservable.subscribe(res => {

        this.cancel();
        if (this.clearFormWhenSubmit){
          this.discard(); 
        }
      });
    }
  }

  cancel(){
    if (this.onClose){
      this.onClose.emit();
    }
  }

  discard() {
    this.form.reset();
  }

}
