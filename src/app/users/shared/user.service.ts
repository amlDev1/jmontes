import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { IUser } from './user-model';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  getAll(): Observable<IUser[]> {
    const subject = new Subject<IUser[]>();
    setTimeout(() => {
      subject.next(Users);
      subject.complete();
    },
      200);
    return subject;
  }
}

const Users: IUser[] = [
  {
    id: 1,
    name: 'Juan M'
  },
  {
    id: 2,
    name: 'Jesse M'
  },
  {
    id: 3,
    name: 'John'
  },
  {
    id: 4,
    name: 'Sandra'
  }
];

