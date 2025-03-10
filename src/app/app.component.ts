import { Component } from '@angular/core';
import { LoginComponent } from './components/login/login/login.component';
import {  RouterModule, RouterOutlet } from '@angular/router';
import { AllCoursesComponent } from "./components/courses/all-courses/all-courses.component";
import { routes } from './app.routes';
@Component({
  selector: 'app-root',
  imports: [RouterModule, RouterOutlet],
    templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
  export class AppComponent {

  title = 'courseManagment';

}
