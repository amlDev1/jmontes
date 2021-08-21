import { forkJoin } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { CallLogService } from '../call-logs/shared/call-log.service'
import { ICallLog } from '../call-logs/shared/call-log-model';
import { StatusService } from '../common/status.service';
import { IStatus } from '../common/status-model';
import { IDashBoardModel } from './dashboard-model';




import {
  Chart, ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip,
  SubTitle
} from 'chart.js';



Chart.register(
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip,
  SubTitle
);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  startDate = new Date();
  endDate = new Date();
  data: IDashBoardModel[] = [];
  labels: string[] = [];
  quantities: number[] = [];

  chart: any;

  constructor(private logService: CallLogService
    , private statusService: StatusService) {

  }

  run() {
    const request = forkJoin([
      this.logService.getByDates(this.startDate, this.endDate),
      this.statusService.getAll()
    ]);
    request.subscribe(response => {
      const logs = response[0] as ICallLog[];
      const statuses = response[1] as IStatus[];
      this.data = statuses.map(s => {
        const data = logs.filter(l => l.status != null && l.status.id === s.id);
        const model: IDashBoardModel = {
          label: s.name,
          quantity: data.length
        };
        return model;
      });
      this.labels = this.data.map(d => d.label);
      this.quantities = this.data.map(d => d.quantity);
      this.chart.data.labels = this.labels;
      this.chart.data.datasets = [
        {
          label: 'Number of Calls',
          data: this.quantities,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }
      ];
      this.chart.update();
    });
  }

  ngOnInit(): void {
    const now = new Date();
    const start = new Date();
    start.setDate(now.getDate() - 5);
    this.startDate = new Date(start.toDateString());
    this.endDate = new Date(now.toDateString());
    this.chart = new Chart('canvas', {
      type: 'bar',
      data: {
        labels: this.labels,
        datasets: [{
          label: 'Number of Calls',
          data: this.quantities,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      }
    });

    this.run();
  }

}
