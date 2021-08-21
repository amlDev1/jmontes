import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { IStatus } from './status-model';

@Injectable({
  providedIn: 'root'
})
export class StatusService {

  getAll(): Observable<IStatus[]> {
    const subject = new Subject<IStatus[]>();
    setTimeout(() => {
      subject.next(Statuses);
      subject.complete();
    },
      200);
    return subject;
  }
}

const Statuses: IStatus[] = [
  {
    id: 1,
    name: 'Open'
  },
  {
    id: 2,
    name: 'Closed'
  },
  {
    id: 3,
    name: 'In Progress'
  }
];


