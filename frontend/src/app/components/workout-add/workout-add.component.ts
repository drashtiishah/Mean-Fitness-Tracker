import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { WorkoutDetails } from '../../model/workoutdetails';
import { FitnessService } from '../../service/fitness.service';
import { WorkoutListComponent } from '../workout-list/workout-list.component';

@Component({
  selector: 'app-workout-add',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, WorkoutListComponent],
  templateUrl: './workout-add.component.html',
  styleUrl: './workout-add.component.css'
})
export class WorkoutAddComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private _fitnessService: FitnessService,
    private router: Router,
    private actRoute: ActivatedRoute) { }

  public id: any;

  ngOnInit(): void {
    this.id = this.actRoute.snapshot.paramMap.get('id');
    console.log("ID:---", this.id);
    // console.log("Type of ID:---",typeof this.id);
    // debugger;
    if (this.id) {
      this.getWorkoutById(this.id);
    }
  }

  public fitnessForm = this.formBuilder.group({
    activity: ['',
      [
        Validators.required,
      ]],
    duration: [''],
    category: [''],
    type: [''],
    intensity: ['']
  });

  public getWorkoutById = (id: any) => {
    // debugger;
    this._fitnessService.getWorkoutById(id).subscribe((data) => {
      console.log("Data>>>", data);

      this.fitnessForm.setValue({
        activity: data.Activity,
        duration: data.Duration,
        category: data.Category,
        type: data.Type,
        intensity: data.Intensity
      });
    });
  }

  public onSubmit = () => {

    this.id = this.actRoute.snapshot.paramMap.get('id');
    if(this.id){
      debugger;
      return this._fitnessService.editWorkout(this.id, this.fitnessForm.value).subscribe({
        complete: () => {
          debugger
          console.log('Workout successfully updated!');
          this.router.navigateByUrl('/workout-list');
        },
        error: (e) => {
          console.log(e);
        },
      })
    }

    return this._fitnessService.createWorkout(this.fitnessForm.value).subscribe({
      complete: () => {
        console.log('Workout successfully added!');
        this.router.navigateByUrl('/workout-list');
      },
      error: (e) => {
        console.log(e);
      },
    });
  }

}
