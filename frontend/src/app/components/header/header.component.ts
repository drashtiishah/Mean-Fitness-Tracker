import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { WorkoutDetails } from '../../model/workoutdetails';
import { AuthService } from '../../service/auth.service';
import { FitnessService } from '../../service/fitness.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ RouterLink ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  isUserLoggedIn: boolean = false;

  constructor(private authService: AuthService, 
    private _fitnessService: FitnessService,
    private router: Router) { }

  ngOnInit(): void {
    this.isUserLoggedIn = this.authService.isAuthenticated();
  }
  
  logout() {
    this.authService.logout().subscribe({
      next: (res:any) => {
        this.isUserLoggedIn = false;
        this.authService.setUserLogin(false);
        alert("User logged out succssfully");
        this.router.navigate(["/login"]);
      },
      error: (err:any) => {
        if (!err.success) {
          alert("User not logged in");
          this.router.navigate(["/login"]);
        }
      }
    });
  }

  newData(event: any){
    event.preventDefault();
    // this._fitnessService.setter(new WorkoutDetails());
    this.router.navigateByUrl('/workout-add');
  }

  displayData(){
    this._fitnessService.displayData();
  }

}
