import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { forkJoin } from 'rxjs';

import { CallLogService } from '../shared/call-log.service';
import { ICallLog } from '../shared/call-log-model';
import { UserService } from '../../users/shared/user.service';
import { StatusService } from '../../common/status.service';
import { IUser } from '../../users/shared/user-model';
import { IStatus } from '../../common/status-model'
import { AlertService } from '../../common/alert.service';

@Component({
  selector: 'app-call-log-details',
  templateUrl: './call-log-details.component.html',
  styleUrls: ['./call-log-details.component.css']
})
export class CallLogDetailsComponent implements OnInit {
  users: IUser[] = [];
  statuses: IStatus[] = [];
  callLogId = 0;
  status: any;
  title: any;
  problem: any;
  solution: any;
  caller: any;
  callLogForm = new FormGroup({});

  callLog: ICallLog = {
    id: 0,
    status: {
      id: 1,
      name: 'Open'
    },
    title: '',
    problem: '',
    solution: '',
    user: undefined,
    createdOn: undefined
  }

  constructor(private callLogService: CallLogService
    , private usersService: UserService
    , private statusService: StatusService
    , private route: ActivatedRoute
    , private router: Router
    , private alertService: AlertService
  ) { }

  ngOnInit(): void {
    const log = this.route.snapshot.data['callLog'];
    if (log) {
      this.callLog = log;
    }
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.callLogId = +id;
    }
    this.initForm();
    this.loadData();
  }

  private initForm() {
    this.status = new FormControl(this.callLog.status?.name, [Validators.required]);
    this.title = new FormControl(this.callLog.title, [Validators.required]);
    this.problem = new FormControl(this.callLog.problem, [Validators.required]);
    this.solution = new FormControl(this.callLog.solution);
    this.caller = new FormControl(this.callLog.user?.name, [Validators.required]);
    this.callLogForm = new FormGroup({
      caller: this.caller,
      status: this.status,
      title: this.title,
      problem: this.problem,
      solution: this.solution
    });
  }

  private loadData() {
    const request = forkJoin([
      this.usersService.getAll(),
      this.statusService.getAll()
    ]);
    request.subscribe(response => {
      this.users = response[0] as IUser[];
      this.statuses = response[1] as IStatus[];
    });
  }

  private setCallFromForm(form: FormGroup) {
    const { value } = form;
    this.callLog.user = this.users.find(u => u.name === value.caller);
    this.callLog.status = this.statuses.find(s => s.name === value.status);
    this.callLog.title = value.title;
    this.callLog.problem = value.problem;
    this.callLog.solution = value.solution;
  }

  private saveCallLog(close: boolean) {
    this.callLogService.save(this.callLog).subscribe((response: ICallLog) => {
      this.callLog = response;
      this.alertService.success('Log has been saved');
      if (close) {
        this.router.navigate(['/call-logs']);
      } else {
        if (this.callLogId === 0) {
          this.router.navigate([`/call-logs/${response.id}`]);
        }
      }
    });
  }

  save(form: any) {
    this.setCallFromForm(form);
    this.saveCallLog(false);
  }

  saveAndClose() {
    this.setCallFromForm(this.callLogForm);
    this.saveCallLog(true);
  }

  cancel() {
    this.router.navigate(['/call-logs']);
  }

}
