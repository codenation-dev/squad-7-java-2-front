import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { merge, of as observableOf, of } from 'rxjs';
import { catchError, map, startWith, switchMap, tap } from 'rxjs/operators';
import { DetailsItemLog, ComboSelect } from '../share/services/http-database/model';
import { HttpDatabaseService } from '../share/services/http-database/http-database.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements AfterViewInit, OnInit {

  formulario: FormGroup;
  displayedColumns: string[] = ['level', 'detail', 'frequencia', 'detalhes', 'arquivar', 'apagar'];

  ambientes: ComboSelect[] = [
    { value: 'PRODUCTION', viewValue: 'Produção' },
    { value: 'TEST', viewValue: 'Homologação' },
    { value: 'DEVELOPMENT', viewValue: 'Dev' },
  ];

  data = new MatTableDataSource<DetailsItemLog>();

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) matSortChange: MatSort;

  constructor(private databaseService: HttpDatabaseService
    , private formBuilder: FormBuilder
    , private router: Router, ) { }

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      ambiente: [null],
    });

    this.formulario.get('ambiente').valueChanges
      .subscribe(() => this.getData()
      );
  }

  ngAfterViewInit() {
    this.matSortChange.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    this.getData();
  }

  private getData() {
    merge(this.matSortChange.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.databaseService.getLogs(
            this.matSortChange.active, this.matSortChange.direction, this.paginator.pageIndex, this.formulario.get('ambiente').value);
        }),
        map(data => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
          this.isRateLimitReached = false;
          this.resultsLength = data.totalElements;

          return data.content;
        }),
        catchError(() => {
          this.isLoadingResults = false;
          // Catch if the GitHub API has reached its rate limit. Return empty data.
          this.isRateLimitReached = true;
          return observableOf([]);
        })
      ).subscribe(data => this.data.data = data as DetailsItemLog[]);

  }

  public doFilter = (value: string) => {
    this.data.filter = value.trim().toLocaleLowerCase();
  }

  public redirectToDetails = (id: string) => {
    this.router.navigate(['/detalhe', id]);

  }

  public arquivar = (value: DetailsItemLog) => {
    value.archived = true;
    const dataBody = JSON.stringify(value);
    this.databaseService.put(dataBody).subscribe(
      () => this.getData(),
      error => alert(error)
    );
  }

  public delete = (value: string) => {
    this.databaseService.delete(value).subscribe(
      () => this.getData(),
      error => alert(error));
  }
}
