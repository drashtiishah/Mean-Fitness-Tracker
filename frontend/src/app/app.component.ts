import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { FitnessService } from './service/fitness.service';
import { WorkoutAddComponent } from './components/workout-add/workout-add.component';
import { WorkoutListComponent } from './components/workout-list/workout-list.component';
import { HeaderComponent } from './components/header/header.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule, FormsModule , ReactiveFormsModule, WorkoutAddComponent, WorkoutListComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';

  constructor(private formBuilder: FormBuilder, private _fitnessService: FitnessService) {}
}
