import type { Task } from '../services/data.service';

import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
} from '@angular/core';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-task-new',
  templateUrl: './task-new.component.html',
  styleUrls: ['./task-new.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskNewComponent {
  private platform = inject(Platform);

  public value: null | string = null;

  @Input() onTaskAdd: (task: Task) => void = () => {};

  public onAdd() {
    if (this.value && this.value.length > 0) {
      this.onTaskAdd({
        title: this.value,
        finish: false,
      });
      this.value = null;
    }
  }

  isIos() {
    return this.platform.is('ios');
  }
}
