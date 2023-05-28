import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TaskNewComponent } from './task-new.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, RouterModule],
  declarations: [TaskNewComponent],
  exports: [TaskNewComponent],
})
export class TaskNewComponentModule {}
