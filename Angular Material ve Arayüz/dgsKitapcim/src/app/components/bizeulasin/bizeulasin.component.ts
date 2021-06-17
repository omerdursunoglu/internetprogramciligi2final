import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-bizeulasin',
  templateUrl: './bizeulasin.component.html',
  styleUrls: ['./bizeulasin.component.scss']
})
export class BizeulasinComponent implements OnInit {

  constructor(
    public apiServis: ApiService,
  ) { }

  ngOnInit() {
  }

}
