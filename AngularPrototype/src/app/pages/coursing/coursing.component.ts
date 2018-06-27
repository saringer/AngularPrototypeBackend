import {Component, ElementRef, Injectable, Input, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatPaginatorIntl, MatSort, MatTableDataSource} from '@angular/material';
import {Club} from "../../data-models/club";
import {ClubService} from "../../services/ClubService/club.service";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {DataSource} from "@angular/cdk/collections";
import {Observable} from "rxjs/Rx";
import {Coursing} from "../../data-models/coursing";
import {CoursingService} from "../../services/CoursingService/coursing.service";
import {Coursingresult} from "../../data-models/coursingresult";
import {ClubDataSource} from "../admin/club-crud-table/club-crud-table.component";
import {SearchService} from "../../services/SearchService/search.service";
import {TournamentDeleteDialogComponent} from "../admin/dialogs/tournament-dialog/tournament-delete-dialog/tournament-delete-dialog.component";
import {CoursingDetailDialogComponent} from "./dialogs/coursing-detail-dialog/coursing-detail-dialog.component";


@Component({
  selector: 'app-coursing',
  templateUrl: './coursing.component.html',
  styleUrls: ['./coursing.component.css']
})
export class CoursingComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('paginatorCoursing') paginatorCoursing: MatPaginator;


  displayedColumns = ['position', 'total', 'name', 'besitzer', 'gesamtteilnahme', 'inwertung'];
  dataSourceCoursing: CoursingDataSource | null;
  whippetImg = 'assets/img/whippet_grau.png';
  whippetImgColored = 'assets/img/whippet.png';
  years: String[] = [];
  selectedYear: string = String(new Date().getFullYear()-1);
  selected_coursing_class: string = 'international';
  tabIndex: number = 0;



  constructor(private dialog: MatDialog, private searchService: SearchService, private coursingService: CoursingService) {
    var year = new Date().getFullYear();
    var range = [];

    // i>100 dient hier nur als Sicherheitsanker falls aus irgendeinem Grund das Jahr nicht richtig ausgelesen wird um
    // eine Endlosschleife zu vermeiden
    for (var i = 0; ((year) - i) != 2010 || i > 100; i++) {
      this.years.push(
        String((year) - i)
      );
    }
  }

  openCoursingDetailView(element, selected_coursing_class, year) {
    this.dialog.open(CoursingDetailDialogComponent, {
      data:{element, selected_coursing_class, year}});

  }


  ngOnInit() {
    this.paginatorCoursing._intl.itemsPerPageLabel = 'Pro Seite: ';
    this.paginatorCoursing._intl.nextPageLabel = 'Nächste Seite';
    this.paginatorCoursing._intl.previousPageLabel = 'Vorherige Seite';
    this.loadDataCoursing();
  }

  onYearChange(event) {
    if (this.tabIndex === 0) {
      this.coursingService.getAllCoursings('international', 'Rüde', this.selectedYear);
    }
    else if (this.tabIndex === 1) {
      this.coursingService.getAllCoursings('international', 'Hündin', this.selectedYear);
    }
    else if (this.tabIndex === 2) {
      this.coursingService.getAllCoursings('national', 'all', this.selectedYear);
    }
  }

  hover(element) {
    //this.whippetImg = 'assets/img/whippet.png';
  }

  unhover(element) {
   // this.whippetImg = 'assets/img/whippet_grau.png';
  }

  public loadDataCoursing() {

    this.dataSourceCoursing = new CoursingDataSource(this.coursingService, this.paginatorCoursing, this.sort);
    if (!this.dataSourceCoursing) {
      return;
    }
    else {
      this.searchService.currentMessage.subscribe(message => this.dataSourceCoursing.filter = message);
    }

  }

  onTabSwitch(event) {
    if (event.index === 0) {
      this.tabIndex = event.index;
      this.selected_coursing_class = 'international';
      this.coursingService.getAllCoursings('international', 'Rüde', this.selectedYear);
    }
    else if (event.index === 1) {
      this.tabIndex = event.index;
      this.selected_coursing_class = 'international';
      this.coursingService.getAllCoursings('international', 'Hündin', this.selectedYear);
    }
    else if (event.index === 2) {
      this.tabIndex = event.index;
      this.selected_coursing_class = 'national';
      this.coursingService.getAllCoursings('national', 'all', this.selectedYear);
    }
  }

  replaceDotWithComma(el: string): string {
        console.log(el);
        el = el.replace('.', ',');
        console.log(el);
        return el.replace(/./g, ',')
  }

}


export class CoursingDataSource extends DataSource<any> {
  _filterChange = new BehaviorSubject('');

  get filter(): string {
    return this._filterChange.value;
  }

  set filter(filterCoursing: string) {
    this._filterChange.next(filterCoursing);
  }

  filteredData: Coursingresult[] = [];
  renderedData: Coursingresult[] = [];

  constructor(private coursingService: CoursingService,
              public _paginatorCoursing: MatPaginator,
              private _sort: MatSort) {
    super();
    this._filterChange.subscribe(() => this._paginatorCoursing.pageIndex = 0);

  }

  connect(): Observable<Coursingresult[]> {
    const displayDataChanges = [
      this.coursingService.dataChange,
      this._sort.sortChange,
      this._filterChange,
      this._paginatorCoursing.page
    ];
    var year = new Date().getFullYear();
    this.coursingService.getAllCoursings('international', 'Rüde', String(year-1));
    return Observable.merge(...displayDataChanges).map(() => {
      // Filter data
      this.filteredData = this.coursingService.data.slice().filter((coursingResult: Coursingresult) => {
        const searchStr = (coursingResult.dogname + coursingResult.ownername + coursingResult.totalParticipations + coursingResult.totalratings + coursingResult.ranking).toLowerCase();
        return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
      });

      // Sort filtered data
      const sortedData = this.sortData(this.filteredData.slice());


      // Grab the page's slice of the filtered sorted data.
      const startIndex = this._paginatorCoursing.pageIndex * this._paginatorCoursing.pageSize;
      this.renderedData = sortedData.splice(startIndex, this._paginatorCoursing.pageSize);
      return this.renderedData;

    });
  }

  disconnect() {
  }

  /** Returns a sorted copy of the database data. */
  sortData(data: Coursingresult[]): Coursingresult[] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';

      switch (this._sort.active) {
        case 'name':
          [propertyA, propertyB] = [a.dogname, b.dogname];
          break;
      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
    });
  }
}

@Injectable()
export class CustomPaginator extends MatPaginatorIntl {
  itemsPerPageLabel = 'Rows per page';
}
