import { Observable, Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { ICallLog } from './call-log-model';

@Injectable({
  providedIn: 'root'
})
export class CallLogService {
  private callLogStorageName = 'callLog';

  constructor() {
    const data = localStorage.getItem(this.callLogStorageName);
    if (!data) {
      this.setStorage(CallLogs);
    }
  }

  private getStorage(): ICallLog[] {
    const data = localStorage.getItem(this.callLogStorageName);
    if (data) {
      const storageObject = JSON.parse(data);
      return storageObject.items.map((i: ICallLog) => i);
    }
    return [];
  }

  private setStorage(logs: ICallLog[]) {
    const storageObject = { items: logs };
    localStorage.setItem(this.callLogStorageName, JSON.stringify(storageObject));
  }

  private checkDate(date: any, startDate: Date, endDate: Date): boolean {
    if (!date) {
      return false;
    }
    let d = new Date();
    if (typeof date === 'string') {
      const stringDate = new Date(date);
      d = new Date(stringDate.toDateString());
    } else {
      d = new Date(date.toDateString());
    }
    return d >= startDate && d <= endDate;
  }

  getByDates(startDate: Date, endDate: Date): Observable<ICallLog[]> {
    const subject = new Subject<ICallLog[]>();
    setTimeout(() => {
      const data = this.getStorage();
      const filterData = data.filter(log => this.checkDate(log.createdOn, startDate, endDate));
      subject.next(filterData);
      subject.complete();
    },
      200);
    return subject;
  }

  getAll(): Observable<ICallLog[]> {
    const subject = new Subject<ICallLog[]>();
    setTimeout(() => {
      subject.next(this.getStorage());
      subject.complete();
    },
      200);
    return subject;
  }

  getById(id: number): Observable<ICallLog> {
    const subject = new Subject<ICallLog>();
    setTimeout(() => {
      const logs = this.getStorage();
      const log = logs.find(l => l.id === id);
      subject.next(log);
      subject.complete();
    },
      200);
    return subject;
  }

  save(entity: ICallLog): Observable<ICallLog> {
    const subject = new Subject<ICallLog>();
    setTimeout(() => {
      const editEntity = this.saveLog(entity);
      subject.next(editEntity);
      subject.complete();
    },
      200);
    return subject;
  }

  private saveLog(entity: ICallLog) {
    const logs = this.getStorage();
    if (entity.id > 0) {
      const index = logs.findIndex(((l: ICallLog) => l.id === entity.id) as any);
      if (index >= 0) {
        const dbEntity = logs[index];
        const newEntity: ICallLog = {
          id: dbEntity.id,
          createdOn: dbEntity.createdOn,
          user: dbEntity.user,
          status: entity.status,
          title: entity.title,
          problem: entity.problem,
          solution: entity.solution
        };
        logs.splice(index, 1);
        logs.push(newEntity);
        this.setStorage(logs);
        return dbEntity;
      }
    }
    const maxId = Math.max(...logs.map(l => l.id));
    const newEntity: ICallLog = {
      id: maxId + 1,
      status: entity.status,
      title: entity.title,
      problem: entity.problem,
      solution: entity.solution,
      user: entity.user,
      createdOn: new Date()
    };
    logs.push(newEntity);
    this.setStorage(logs);
    return newEntity;
  }
}




const CallLogs: ICallLog[] = [
  {
    id: 1,
    status: {
      id: 1,
      name: 'Open'
    },
    title: 'Outlook is not working',
    problem: 'not network connection',
    solution: '',
    user: {
      id: 1,
      name: 'Juan M'
    },
    createdOn: new Date('08/17/2021')
  },
  {
    id: 2,
    status: {
      id: 1,
      name: 'Open'
    },
    title: 'How do I create new folder on Outlook',
    problem: 'file explorer',
    solution: '',
    user: {
      id: 2,
      name: 'Jesse M'
    },
    createdOn: new Date('08/20/2021')
  },
  {
    id: 3,
    status: {
      id: 2,
      name: 'Closed'
    },
    title: 'Timeout trying to generate a invoice',
    problem: 'error ',
    solution: '',
    user: {
      id: 1,
      name: 'Juan M'
    },
    createdOn: new Date('08/20/2021')
  },
  {
    id: 4,
    status: {
      id: 3,
      name: 'In Progress'
    },
    title: 'Timeout trying to generate a invoice',
    problem: 'error 3',
    solution: '',
    user: {
      id: 1,
      name: 'Juan M'
    },
    createdOn: new Date(2021,7,20)
  },
  {
    id: 5,
    status: {
      id: 3,
      name: 'In Progress'
    },
    title: 'Timeout trying export to excel',
    problem: 'error 4',
    solution: '',
    user: {
      id: 1,
      name: 'Juan M'
    },
    createdOn: new Date('08/12/2021')
  },
  {
    id: 6,
    status: {
      id: 1,
      name: 'Open'
    },
    title: 'Timeout trying export to excel',
    problem: 'error 5',
    solution: '',
    user: {
      id: 1,
      name: 'Juan M'
    },
    createdOn: new Date('08/20/2021')
  }
];
