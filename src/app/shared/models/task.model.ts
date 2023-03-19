export interface Task {
    id: string;
    title: string;
    description: string;
    list: TaskLists;
}

export interface TaskApi {
    uuid: string;
    titulo: string;
    conteudo: string;
    lista: TaskLists;
}

export enum TaskLists {
    ToDo = 'todo',
    Doing = 'doing',
    Done = 'done',
}