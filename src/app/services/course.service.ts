import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, switchMap } from 'rxjs';
import { Course } from '../models/course';

@Injectable({
  providedIn: 'root'
})

export class CourseService {
  private apiUrl = 'http://localhost:3000/api/courses';
  private courseSubject: BehaviorSubject<Course[]> = new BehaviorSubject<Course[]>([]);
  myCourses$: Observable<Course[]> = this.courseSubject.asObservable();

  constructor(private http: HttpClient) { }


  getAllCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.apiUrl);
  }

  addStudentToCourse(courseId: number, userId: number): any {
  
    return this.http.post<void>(`http://localhost:3000/api/courses/${courseId}/enroll`,{ userId });
  }
  getUserCourses(userId: number):Observable<Course[]> {
  
  return this.http.get<Course[]>(`${this.apiUrl}/student/${userId}`);
 }
  deleteCourseFromStudent(courseId: number, userId: number): Observable<void> {
    const body = { userId };
    return this.http.delete<void>(`http://localhost:3000/api/courses/${courseId}/unenroll`, { body: body });
  }
  getCourseById(id: number): Observable<Course> {
    console.log("in get course by id");

    return this.http.get<Course>(`${this.apiUrl}/${id}`);
  }

  createCourse(course: Course): Observable<Course> {
    return this.http.post<Course>(this.apiUrl, course);
  }

  updateCourse(id: number, course: Partial<Course>): Observable<Course> {
    return this.http.put<Course>(`${this.apiUrl}/${id}`, course);
  }

  deleteCourse(id: number): Observable<void> {
    return this.courseSubject.pipe(
      switchMap(courseId => {
        if (courseId === null) throw new Error('Course ID is not set');
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
      })
    );
  }


}

