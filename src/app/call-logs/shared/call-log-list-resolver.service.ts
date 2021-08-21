import { Resolve } from '@angular/router';
import { Injectable } from '@angular/core';
import { CallLogService } from './call-log.service'

@Injectable({
  providedIn: 'root'
})
export class CallLogListResolverService implements Resolve<any> {

  constructor(private service: CallLogService) {

  }
  resolve() {
    return this.service.getAll();
  }
}
