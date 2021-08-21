import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { CallLogService } from './call-log.service'

@Injectable({
  providedIn: 'root'
})
export class CallLogDetailsResolverService implements Resolve<any> {

  constructor(private service: CallLogService) {

  }

  resolve(route: ActivatedRouteSnapshot) {
    const id = route.paramMap.get('id');
    if (id) {
      return this.service.getById(+id);
    }
    return this.service.getById(0);
  }
}
