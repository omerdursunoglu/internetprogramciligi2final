import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Kitap } from 'src/app/models/Kitap';
import { KitapResmi } from 'src/app/models/KitapResmi';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-gorselyukle-dialog',
  templateUrl: './gorselyukle-dialog.component.html',
  styleUrls: ['./gorselyukle-dialog.component.css'],
})
export class GorselyukleDialogComponent implements OnInit {
  secilenGorsel: any;
  urungorsel: KitapResmi = new KitapResmi();
  secUrun: Kitap;
  constructor(
    public dialogRef: MatDialogRef<GorselyukleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public apiServis: ApiService
  ) {
    this.secUrun = this.data;
  }

  ngOnInit() {

  }
  GorselSec(e) {
    var gorseller = e.target.files;
    var gorsel = gorseller[0];

    var fr = new FileReader();
    fr.onloadend = () => {
      this.secilenGorsel = fr.result;
      this.urungorsel.resimData = fr.result.toString();
      this.urungorsel.resimUzanti = gorsel.type;
    };

    fr.readAsDataURL(gorsel);
  }


}
