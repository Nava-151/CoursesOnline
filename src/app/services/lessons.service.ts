
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { Lesson } from '../models/lesson';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LessonService {
  private lessonSubject:BehaviorSubject<Lesson[] > = new BehaviorSubject<Lesson[] >([]);
  private apiUrl = 'http://localhost:3000/api/courses';

  constructor(private http: HttpClient, private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      const courseId = +params['courseId'];
    });
  }


  getAllLessons(courseId:number):Observable<Lesson[]> {
    return this.http.get<Lesson[]>(`${this.apiUrl}/${courseId}/lessons`)
  
  }

  getLessonById(idLesson: number): Observable<Lesson> {
    return this.lessonSubject.pipe(
      switchMap(courseId => {
        if (courseId === null) throw new Error('Course ID is not set');
        return this.http.get<Lesson>(`${this.apiUrl}/${courseId}/lessons/${idLesson}`);
      })
    );
  }

  createLesson(lesson: Lesson): Observable<Lesson> {
    return this.http.post<Lesson>(`${this.apiUrl}/${lesson.courseId}/lessons`, lesson).pipe(
      tap((newL) => {
        this.lessonSubject.next([...this.lessonSubject.getValue(), newL]);
      })
    );
  }

  updateLesson(id: number, lesson: Partial<Lesson>,courseId:number): Observable<Lesson> {
      return this.http.put<Lesson>(`${this.apiUrl}/${courseId}/lessons/${id}`, lesson);
  }

  deleteLesson(id: number): Observable<void> {
    return this.lessonSubject.pipe(
      switchMap(courseId => {
        if (courseId === null) throw new Error('Course ID is not set');
        return this.http.delete<void>(`${this.apiUrl}/${courseId}/lessons/${id}`);
      })
    );
  }
}
