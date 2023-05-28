import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import { HomePage } from './home.page';
import { HomePageRoutingModule } from './home-routing.module';
import { TaskComponentModule } from '../task/task.module';
import { TaskNewComponentModule } from '../task-new/task-new.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    TaskComponentModule,
    TaskNewComponentModule,
  ],
  declarations: [HomePage],
})
export class HomePageModule {}
