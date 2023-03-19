import { Component, Input } from '@angular/core';
import { Task, TaskLists } from '../models/task.model';
import { TasksService } from '../services/tasks.service';

@Component({
  selector: 'task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent {

  @Input() model: Task;

  taskListOrder = [
    TaskLists.ToDo, 
    TaskLists.Doing,
    TaskLists.Done
  ]
  isEditingMode: boolean;

  constructor(private _service: TasksService){
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
}
