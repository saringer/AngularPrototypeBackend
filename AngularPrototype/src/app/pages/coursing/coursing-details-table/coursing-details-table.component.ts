import {Component, Input, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {MatPaginator, MatSort} from "@angular/material";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Observable} from "rxjs/Rx";
import {Tournament} from "../../../data-models/tournament";
import {DataSource} from "@angular/cdk/collections";
import {CoursingDetailService} from "../../../services/CoursingService/coursing.detail.service";
import {SearchService} from "../../../services/SearchService/search.service";
import {Coursingdetail} from "../../../data-models/coursingdetail";

@Component({
  selector: 'app-coursing-details-table',
  templateUrl: './coursing-details-table.component.html',
  styleUrls: ['./coursing-details-table.component.css']
})
export class CoursingDetailsTableComponent implements OnInit {

  @ViewChild('paginatorTournament') paginatorTournament: MatPaginator | null;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumsTournament = ['title', 'coursing_rating', 'double_weighted', 'notstarted','notfinished', 'withdrawn', 'disqualified', 'injured'];
  dataSourceTournament: TournamentDataSource;
  @Input() year: string;
  @Input() dog_id: number;
  @Input() coursing_class: string;

  constructor(private coursingDetailService: CoursingDetailService, private searchService: SearchService) { }

  ngOnInit() {
    this.paginatorTournament._intl.itemsPerPageLabel = 'Pro Seite: ';
    this.paginatorTournament._intl.nextPageLabel = 'Nächste Seite';
    this.paginatorTournament._intl.previousPageLabel = 'Vorherige Seite';
    this.loadDataTournaments();
    this.coursingDetailService.getAllCoursingDetailsForDog(this.dog_id, this.coursing_class, this.year);

  }


  public loadDataTournaments() {
    this.dataSourceTournament = new TournamentDataSource(this.coursingDetailService, this.paginatorTournament, this.sort);
    if (!this.dataSourceTournament) {
      return;
    }
    else {
      this.searchService.currentMessage.subscribe(message => this.dataSourceTournament.filter = message);

    }
  }

}

export class TournamentDataSource extends DataSource<any> {
  _filterChange = new BehaviorSubject('');

  get filter(): string {
    return this._filterChange.value;
  }

  set filter(filterTournament: string) {
    this._filterChange.next(filterTournament);
  }

  filteredData: Coursingdetail[] = [];
  renderedData: Coursingdetail[] = [];

  constructor(private coursingDetailService: CoursingDetailService,
              public _paginatorTournament: MatPaginator,
              private _sort: MatSort) {
    super();
    this._filterChange.subscribe(() => this._paginatorTournament.pageIndex = 0);

  }

  connect(): Observable<Coursingdetail[]> {
    const displayDataChanges = [
      this.coursingDetailService.dataChange,
      this._sort.sortChange,
      this._filterChange,
      this._paginatorTournament.page
    ];

    return Observable.merge(...displayDataChanges).map(() => {
      // Filter data
      this.filteredData = this.coursingDetailService.data.slice().filter((coursingdetail: Coursingdetail) => {
        const searchStr = (coursingdetail.title + coursingdetail.coursing_rating).toLowerCase();
        return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
      });

      // Sort filtered data
      const sortedData = this.sortData(this.filteredData.slice());


      // Grab the page's slice of the filtered sorted data.
      const startIndex = this._paginatorTournament.pageIndex * this._paginatorTournament.pageSize;
      this.renderedData = sortedData.splice(startIndex, this._paginatorTournament.pageSize);
      return this.renderedData;

    });
  }

  disconnect() {
  }


  /** Returns a sorted copy of the database data. */
  sortData(data: Coursingdetail[]): Coursingdetail[] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      let propertyA: boolean | number | string = '';
      let propertyB: boolean | number | string = '';

      switch (this._sort.active) {
        case 'title':
          [propertyA, propertyB] = [a.title.toLowerCase(), b.title.toLowerCase()];
          break;
        case 'coursing_rating':
          [propertyA, propertyB] = [a.coursing_rating, b.coursing_rating];
          break;
        case 'double_weighted':
          [propertyA, propertyB] = [a.double_weighted, b.double_weighted];
          break;
        case 'notfinished':
          [propertyA, propertyB] = [a.notfinished, b.notfinished];
          break;
        case 'notstarted':
          [propertyA, propertyB] = [a.notstarted, b.notstarted];
          break;
        case 'withdrawn':
          [propertyA, propertyB] = [a.withdrawn, b.withdrawn];
          break;
        case 'injured':
          [propertyA, propertyB] = [a.injured, b.injured];
          break;
        case 'disqualified':
          [propertyA, propertyB] = [a.disqualified, b.disqualified];
          break;
      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
    });
  }
}
