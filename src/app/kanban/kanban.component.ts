import { OnDestroy } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { filter, switchMap } from 'rxjs';
import { Task, TaskLists } from '../shared/models/task.model';
import { TasksService } from '../shared/services/tasks.service';

@Component({
  selector: 'app-kanban',
  templateUrl: './kanban.component.html',
  styleUrls: ['./kanban.component.scss']
})
export class KanbanComponent implements OnInit, OnDestroy {

  tasks: Task[];
  tasksList = TaskLists;
  _unsubscribeAll: Subject<any> = new Subject<any>();

  pipes = [ 
    {id: TaskLists.ToDo, title: 'To Do'},
    {id: TaskLists.Doing, title: 'Doing'},
    {id: TaskLists.Done, title: 'Done'} 
  ];

  constructor(private _service: TasksService){
  }

  ngOnInit(){
    this._service.tasks$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((tasks: Task[]) => {
        this.tasks = tasks
      });

    this._service.authorize().
      pipe(
        switchMap(res => {
          return this._service.getTasks();
        })
      ).subscribe();
  }

  ngOnDestroy(): void
  {
      this._unsubscribeAll.next(null);
      this._unsubscribeAll.complete();
  }

  getTasks(tasks, listFilter: any){    
    return tasks.filter(x=> x.list === listFilter);
  }
  
}
