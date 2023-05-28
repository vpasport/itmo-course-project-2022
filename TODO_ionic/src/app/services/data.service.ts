import { Injectable, Input } from '@angular/core';

export type Task = {
  title: string;
  finish: boolean;
};

@Injectable({
  providedIn: 'root',
})
export class DataService {
  public tasks: Task[] = [
    {
      title: 'Task 1',
      finish: false,
    },
    {
      title: 'Task 2',
      finish: false,
    },
    {
      title: 'Task 3',
      finish: false,
    },
    {
      title: 'Task 4',
      finish: false,
    },
    {
      title: 'Task 5',
      finish: false,
    },
    {
      title: 'Task 6',
      finish: true,
    },
  ];

  constructor() {}

  public getTasks(): Task[] {
    return this.tasks;
  }

  public removeTask(task: Task) {
    this.tasks = this.tasks.filter((el) => el !== task);
  }

  public addTask(task: Task) {
    this.tasks.push(task);
  }

  public finishedTask(task: Task) {
    const idx = this.tasks.findIndex((el) => el === task);
    this.tasks[idx].finish = !this.tasks[idx].finish;
  }

  public get5kTasks(): Task[] {
    return [
      ...Array<Task>(2500).fill({ title: 'Task', finish: false }),
      ...Array<Task>(2500).fill({ title: 'Task', finish: false }),
    ];
  }
}
