import { Component, Input, ViewEncapsulation } from '@angular/core';
import { Task, TaskLists } from '../models/task.model';
import { TasksService } from '../services/tasks.service';
import { marked } from 'marked';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TaskComponent {

  @Input() model: Task;

  taskListOrder = [
    TaskLists.ToDo, 
    TaskLists.Doing,
    TaskLists.Done
  ]
  isEditingMode: boolean;

  constructor(
    private _service: TasksService,
    private _sanitizer: DomSanitizer){
  }

  delete(){
    this._service.deleteTask(this.model.id).subscribe();
  }
  
  getListIdx(list){
    return this.taskListOrder.findIndex(x => x == list);
  }

  isFirstList(){
      return this.getListIdx(this.model.list) === 0;
  }

  isLastList(){
    return this.getListIdx(this.model.list) === this.taskListOrder.length - 1;
  }

  sendNext(){
    if (!this.isLastList()){      
      const currentPos = this.getListIdx(this.model.list);
      const data = {...this.model};
      // update to the next list
      data.list = this.taskListOrder[currentPos+1];
      this._service.putTask(data).subscribe();
    }
  }

  sendPrev(){
    if (!this.isFirstList()){      
      const currentPos = this.getListIdx(this.model.list);
      const data = {...this.model};
      // update to the next list
      data.list = this.taskListOrder[currentPos-1];
      this._service.putTask(data).subscribe();
    }
  }

  editMode(){
    this.isEditingMode = !this.isEditingMode;
  }

  getParsed(value){
    return this._sanitizer.bypassSecurityTrustHtml(marked.parse(value));
  }
}
