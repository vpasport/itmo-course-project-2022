import type { Task } from '../services/data.service';

import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
} from '@angular/core';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskComponent {
  private platform = inject(Platform);

  @Input() task!: Task;
  @Input() onTrashClick: (task: Task) => void = () => {};
  @Input() onTaskChecked: (task: Task) => void = () => {};

  public onChecked() {
    if (this.task) {
      this.onTaskChecked(this.task);
    }
  }

  public onClick() {
    if (this.task) {
      this.onTrashClick(this.task);
    }
  }

  isIos() {
    return this.platform.is('ios');
  }
}
