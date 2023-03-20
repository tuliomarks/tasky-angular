import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable, switchMap, take, tap } from "rxjs";
import { Task } from "../models/task.model";

@Injectable({
  providedIn: 'root'
})
export class TasksService 
{
    _baseEndpoint = 'http://localhost:5000';
    _token: string;
    _tasks: BehaviorSubject<Task[]> = new BehaviorSubject([]);
  
    /**
     * Constructor
     */
    constructor(private _httpClient: HttpClient) {
    }

    get tasks$(): Observable<Task[]>
    {
        return this._tasks.asObservable();
    }

    authorize(){      
      const credentials = {
        login:'letscode', 
        senha:'lets@123'
      };
      return this._httpClient.post(`${this._baseEndpoint}/login`, credentials).pipe(
        tap((response: any) => {
          this._token = response;
        })
      )
    }

    getHeaders(){
      return  { 
        headers: { 
          Authorization: `Bearer ${this._token}` 
        }
      };
    }
  
    getTasks(): Observable<any> {
        return this._httpClient.get(`${this._baseEndpoint}/cards`, this.getHeaders() ).pipe(
            tap((response: any[]) => {

                const newList = response.map(card => { 
                  return {
                    id: card.id,
                    title: card.titulo,
                    description: card.conteudo,
                    list: card.lista
                  } as Task;
                });
                console.log(newList);
                //fill the tasks variable with the new values 
                this._tasks.next(newList);
            })
        );
    }

    postTask(formData: any): Observable<any> {

      const payload = {
        titulo: formData.title, 
        conteudo: formData.description, 
        lista: formData.list
      };

      return this.tasks$.pipe(
        take(1),
        switchMap(tasks => 
          this._httpClient.post(`${this._baseEndpoint}/cards`, payload, this.getHeaders() ).pipe(
            map((response: any) => {
  
                const newTask = { 
                  id: response.id,
                  title: response.titulo,
                  description: response.conteudo,
                  list: response.lista
                } as Task;
  
                //fill the tasks variable with the new values 
                this._tasks.next([ ...tasks, newTask]);
                
                return newTask;
            })
          )
        )
      )
    }

    putTask(formData: any): Observable<any> {

      const payload = {
        id: formData.id,
        titulo: formData.title, 
        conteudo: formData.description, 
        lista: formData.list
      };
      return this.tasks$.pipe(
        take(1),
        switchMap(tasks => 
          this._httpClient.put(`${this._baseEndpoint}/cards/${formData.id}`, payload, this.getHeaders() ).pipe(
            map((response: any) => {
  
                const updatedTask = { 
                  id: response.id,
                  title: response.titulo,
                  description: response.conteudo,
                  list: response.lista
                } as Task;
  
                const idx = tasks.findIndex(task => task.id === formData.id);

                tasks[idx] = updatedTask;

                //fill the tasks variable with the new values 
                this._tasks.next(tasks);
                
                return updatedTask;
            })
          )
        )
      )
    }

    deleteTask(id: string): Observable<any> {

      return this.tasks$.pipe(
        take(1),
        switchMap(tasks => 
          this._httpClient.delete(`${this._baseEndpoint}/cards/${id}`, this.getHeaders() ).pipe(
            map((response: any) => {
  
                const idx = tasks.findIndex(task => task.id === id);

                tasks.splice(idx, 1);

                //fill the tasks variable with the new values 
                this._tasks.next(tasks);
                
                return response;
            })
          )
        )
      )
    }
  }