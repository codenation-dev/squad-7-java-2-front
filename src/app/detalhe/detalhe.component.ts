import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpDatabaseService } from '../share/services/http-database/http-database.service';
import { DetailsItemLog } from '../share/services/http-database/model';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-detalhe',
  templateUrl: './detalhe.component.html',
  styleUrls: ['./detalhe.component.css'],
  preserveWhitespaces: true
})
export class DetalheComponent implements OnInit {

  detalheLog$: Observable<DetailsItemLog>;
  id: string;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private databaseService: HttpDatabaseService
  ) { }

  ngOnInit() {

    this.id = this.route.snapshot.params.id;
    this.detalheLog$ = this.databaseService.get(this.id);
  }

  redirectToDashboad() {
    this.router.navigate(['/dashboard']);
  }

}
