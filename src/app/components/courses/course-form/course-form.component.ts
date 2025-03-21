import { Component } from '@angular/core';
import { FormGroup, FormControl, FormsModule, ReactiveFormsModule, Form } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Course } from '../../../models/course';
import { UserService } from '../../../services/user.service';
import {  MatIconModule } from '@angular/material/icon';
import { CourseService } from '../../../services/course.service';

@Component({
  selector: 'app-course-form',
  imports: [
    ReactiveFormsModule,
    FormsModule,
    MatIconModule,
    RouterModule
  ],
  templateUrl: './course-form.component.html',
  styleUrl: './course-form.component.css'
})
export class CourseFormComponent {

  courseId: number = 0;
  course!: Course;
  constructor(private courseService: CourseService, private router: ActivatedRoute, private userService: UserService,private route:Router) {
    this.router.params.subscribe(params => {
      this.courseId = +params['id'];

    });
    //2 routes one which get route with id and the second not
    if (this.courseId > 0) {
      courseService.getCourseById(this.courseId).subscribe((data: Course) => {
        this.course = data
        this.populateForm({ title: this.course.title, description: this.course.description });
      });
    }


  }
  closeModal() {
    throw new Error('Method not implemented.');
  }
  onSubmit() {
    if (this.courseId > 0)
      this.courseService.updateCourse(this.courseId, { id: this.courseId, title: this.courseForm.value.title, description: this.courseForm.value.description, teacherId: this.course.teacherId, lessons: [] }).subscribe(data => {console.log(data)
      this.route.navigate(['seeAll']);
  });
    else {
      const id = this.userService.currentUser?.id as number;
      this.courseService.createCourse({
        id: this.courseId, title: this.courseForm.value.title, description: this.courseForm.value.description,
        teacherId: +(localStorage.getItem("userId") || "0"), lessons: []
      }).subscribe(data => {console.log(data)
      this.route.navigate(['seeAll']);
      
      }
    );
    }
  }
  courseForm: FormGroup = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
  });


  populateForm(data: any) {
    Object.keys(data).forEach(key => {
      if (this.courseForm.controls[key]) {
        this.courseForm.controls[key].setValue(data[key]);
      }
    });
  }
}
