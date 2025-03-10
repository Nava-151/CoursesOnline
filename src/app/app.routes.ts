import { Routes } from '@angular/router';
import { AllCoursesComponent } from './components/courses/all-courses/all-courses.component';
import { DisplayCourseComponent } from './components/courses/display-course/display-course.component';
import { LoginComponent } from './components/login/login/login.component';
import { connectedGuard } from './guards/connected.guard';
import { CourseFormComponent } from './components/courses/course-form/course-form.component';
import { teacherConnectedGuard } from './guards/teacher-connected.guard';
import { LessonFormComponent } from './components/lessons/lesson-form/lesson-form.component';

export const routes: Routes = [

    { path: '', component: LoginComponent },
    { path: 'login', component: LoginComponent },
    {path:'seeAll',component:AllCoursesComponent ,canActivate:[connectedGuard]},
    { path: 'courses/add', component: CourseFormComponent, canActivate: [teacherConnectedGuard] },
    { path: 'courses/edit/:id', component: CourseFormComponent, canActivate: [teacherConnectedGuard] },
    { path: 'courses/:courseId/lessons/add', component: LessonFormComponent, canActivate: [teacherConnectedGuard] },
    { path: 'courses/:courseId/lessons/edit/:id', component: LessonFormComponent, canActivate: [teacherConnectedGuard] },
    {
        path: 'courses', component: AllCoursesComponent, canActivate: [connectedGuard],
        children: [{
            path: ':courseId/lessons',
            component: DisplayCourseComponent,
            canActivate: [connectedGuard],
        } ]
    }
];
