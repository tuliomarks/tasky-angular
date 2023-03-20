import { Input, OnDestroy } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Task, TaskLists } from 'src/app/shared/models/task.model';
import { TasksService } from 'src/app/shared/services/tasks.service';

@Component({
  selector: 'kanban-pipe',
  template: `<h3 class="font-bold flex-grow">{{title}}</h3>
    <hr class="my-3">
    <div class="flex flex-col" *ngFor="let task of tasks">
      <task [model]="task"></task>
    </div>`
})
export class KanbanPipeComponent implements OnInit, OnDestroy {

  @Input() id: TaskLists;
  @Input() title: string;
  
  tasks: Task[];
  
  _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(private _service: TasksService){
  }

  ngOnInit(){
    this._service.tasks$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((tasks: Task[]) => {
        this.tasks = tasks.filter(x => x.list === this.id)
      });
  }

  ngOnDestroy(): void
  {
      this._unsubscribeAll.next(null);
      this._unsubscribeAll.complete();
  }
}
