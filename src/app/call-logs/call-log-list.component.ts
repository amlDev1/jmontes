import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ICallLog } from './shared/call-log-model';


@Component({
  selector: 'app-call-log-list',
  templateUrl: './call-log-list.component.html',
  styleUrls: ['./call-log-list.component.css']
})
export class CallLogListComponent implements OnInit {
  private data: ICallLog[] = [];
  displayedColumns: string[] = ['createdOn', 'user', 'title', 'status'];
  filteredData: ICallLog[] = [];
  textToSearch = '';
  onlySearchOpen = false;

  constructor(private router: Router
    , private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    const list = this.route.snapshot.data['list'];
    if (list) {
      this.data = list;
      this.filteredData = list;
    }
  }

  onSearchChange(): void {
    if (this.textToSearch) {
      this.filteredData = this.data.filter(d => this.searchText(d, this.textToSearch));
    } else {
      this.filteredData = this.data.map(d => ({ ...d }));
    }
  }

  private searchText(entity: ICallLog, text: string): boolean {
    if (!text) {
      return false;
    }
    const textToSearch = text.toLowerCase();
    const searchCheck = entity.problem.toLowerCase().includes(textToSearch)
      || entity.solution.toLowerCase().includes(textToSearch)
      || entity.title.toLowerCase().includes(textToSearch);
    return this.onlySearchOpen ? searchCheck && entity.status != null && entity.status.name === 'Open' : searchCheck;
  }

  selectRow(row: ICallLog): void {
    this.router.navigate([`/call-logs/${row.id}`]);
  }

  createLog() {
    this.router.navigate(['/call-logs/0']);
  }

}
