import { Component, OnInit } from '@angular/core';
import { Course } from '../../../models/course';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CourseService } from '../../../services/course.service';
import { AuthenticationService } from '../../../services/authentication.service';
@Component({
  selector: 'app-all-courses',
  imports: [MatCardModule, MatGridListModule, MatButtonModule, RouterOutlet,MatIconModule,RouterModule],
  templateUrl: './all-courses.component.html',
  styleUrl: './all-courses.component.css'
})
export class AllCoursesComponent  {

  allCourses: Course[] = [];
  joinedCourses:Course[]=[];
  id: number = 0

  constructor(private router: Router, public courseService: CourseService, public authService: AuthenticationService) {
    this.id = +(localStorage.getItem("userId")||'0');
    courseService.getAllCourses().subscribe((data) => { this.allCourses = data });
    this.courseService.getUserCourses(this.id).subscribe(data=>{this.joinedCourses=data});
  }


  joinCourse(course: Course) {
    this.courseService.addStudentToCourse(course.id, this.id).subscribe(()=>{
      this.courseService.getUserCourses(this.id).subscribe(data=>this.joinedCourses=data);
    });
  }


  leaveCourse(course: Course) {
    this.courseService.deleteCourseFromStudent(course.id,this.id).subscribe();
    this.courseService.getUserCourses(this.id).subscribe(data=>this.joinedCourses=data);
  }


  showDetails(course: Course) {
    console.log(course.id);
    this.router.navigate([`courses/${course.id}/lessons`]);
  }

  
  deleteCourse(course: Course) {
    this.courseService.deleteCourse(course.id).subscribe(()=>{
      this.courseService.getAllCourses().subscribe(data=>this.allCourses=data)
    })
  }

  createCourse() {
    this.router.navigate([`courses/add`]);
  }

  
  updateCourse(course: Course) {
    this.router.navigate([`courses/edit/${course.id}`]);
  }


  isInCourse(courseId:number):boolean{
    return this.joinedCourses.find(c=>c.id==courseId)?true:false
  }

}
