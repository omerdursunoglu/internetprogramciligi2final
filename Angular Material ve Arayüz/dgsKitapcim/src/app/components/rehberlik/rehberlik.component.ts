import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-rehberlik',
  templateUrl: './rehberlik.component.html',
  styleUrls: ['./rehberlik.component.scss']
})
export class RehberlikComponent implements OnInit {

  constructor(
    public apiServis: ApiService,
  ) { }

  ngOnInit() {
  }

}
