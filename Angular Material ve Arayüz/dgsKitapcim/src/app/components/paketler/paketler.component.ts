import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-paketler',
  templateUrl: './paketler.component.html',
  styleUrls: ['./paketler.component.css']
})
export class PaketlerComponent implements OnInit {

  constructor(
    public apiServis: ApiService,
  ) { }

  ngOnInit() {
  }

}
