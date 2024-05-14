import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { WorkoutAddComponent } from '../workout-add/workout-add.component';
import { FitnessService } from '../../service/fitness.service';
import { CommonModule } from '@angular/common';
import { WorkoutDetails } from '../../model/workoutdetails';

@Component({
  selector: 'app-workout-list',
  standalone: true,
  imports: [ CommonModule, WorkoutAddComponent],
  templateUrl: './workout-list.component.html',
  styleUrl: './workout-list.component.css'
})
export class WorkoutListComponent {

  constructor(
    private router: Router,
    private _fitnessService: FitnessService
    ) {
      this.readWorkouts();
    }

  public activities: any = [];
  public totalDuration: number = 0;
  public averageDuration: number = 0;

  public readWorkouts = () => {
    this._fitnessService.getAllWorkouts().subscribe(
      (data) => {
        debugger
        this.activities = data;
        console.log("Actvitiess>>>", this.activities);
        console.log("Workout Listed!");
        this.calculateDuration(this.activities);
      },
      (e) => console.error('Error1', e)
    );

  }

  public calculateDuration = (activities: any) => {
    console.log("In calculateTotalDuration");
    this.totalDuration = 0;
    this.averageDuration = 0;

    activities.forEach((activity: any) => {
      this.totalDuration += activity.Duration;
    });

    this.averageDuration = this.totalDuration != 0
    ? Number((this.totalDuration / activities.length).toFixed())
    : 0;  
  }

  // public onAddWorkout() {
  //   this.router.navigate(['/workout-add']);
  // }

  public onEdit = (activity: WorkoutDetails) => {
    this.router.navigate(['/workout-add', activity._id]);
  }

  public onDelete = (activity: WorkoutDetails, index: number) => {
    this._fitnessService.deleteWorkout(activity._id).subscribe(
      (data) => {
        debugger
        this.activities.splice(index, 1);
        console.log("Actvitiess>>>", this.activities);
        console.log("Workout Deleted!");
        this.calculateDuration(this.activities);
      },
      (e) => console.error('Error1', e)
    );
  }
}

