import { IStatus } from '../../common/status-model';
import { IUser } from '../../users/shared/user-model';

export interface ICallLog {
  id: number;
  status?: IStatus;
  title: string;
  problem: string;
  solution: string;
  user?: IUser;
  createdOn?: Date;
}

