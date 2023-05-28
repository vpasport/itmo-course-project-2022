import { Component, inject, Input } from '@angular/core';
import { RefresherCustomEvent } from '@ionic/angular';

import { TaskComponent } from '../task/task.component';
import { TaskNewComponent } from '../task-new/task-new.component';

import { DataService, Task } from '../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  private data = inject(DataService);

  constructor() {}

  refresh(ev: any) {
    setTimeout(() => {
      (ev as RefresherCustomEvent).detail.complete();
    }, 1000);
  }

  getNotFinishedTasks(): Task[] {
    // return this.data.getTasks().filter((task) => !task.finish);
    return this.data.get5kTasks().filter((task) => !task.finish);
  }
  getFinishedTasks(): Task[] {
    // return this.data.getTasks().filter((task) => task.finish);
    return this.data.get5kTasks().filter((task) => task.finish);
  }

  finishedTask() {
    return (task: Task) => {
      this.data.finishedTask(task);
    };
  }

  removeTask() {
    return (task: Task) => {
      this.data.removeTask(task);
    };
  }

  addTask() {
    return (task: Task) => {
      this.data.addTask(task);
    };
  }
}
