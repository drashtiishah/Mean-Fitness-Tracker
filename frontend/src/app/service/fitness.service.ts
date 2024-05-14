import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { WorkoutDetails } from '../model/workoutdetails';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FitnessService {

  constructor(private _http: HttpClient, private router: Router) { }

  public workoutDetails?: WorkoutDetails;
  public baseUri: string = 'http://localhost:8000/api';
  public headers = new HttpHeaders().set('Content-Type', 'application/json');

  //Create
  public createWorkout(data: any): Observable<any>{
    let url = `${this.baseUri}`;
    return this._http.post(url, data);
  }

  //GetAll
  public getAllWorkouts(){
    return this._http.get(`${this.baseUri}`);
  }

  // GetById
  public getWorkoutById(id: number): Observable<any> {
    let url = `${this.baseUri}/${id}`;
    return this._http.get(url, { headers: this.headers });
  }

  // Edit
  public editWorkout(id: number, data: any): Observable<any> {
    let url = `${this.baseUri}/${id}`;
    return this._http
      .patch(url, data, { headers: this.headers });
  }

  // Delete 
  public deleteWorkout(id: number): Observable<any> {
    let url = `${this.baseUri}/${id}`;
    return this._http
      .delete(url, { headers: this.headers });
  }

  setter(data: any){
    this.workoutDetails = data;
  }

  getter(){
    return this.workoutDetails;
  }

  displayData(){
    this.router.navigateByUrl('/workout-list');
  }

}
