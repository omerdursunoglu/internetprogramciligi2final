import { MyAlertService } from './../../../services/myAlert.service';
import { Yayinevi } from './../../../models/Yayinevi';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../dialogs/confirm-dialog/confirm-dialog.component';
import { YayineviDialogComponent } from '../../dialogs/yayinevi-dialog/yayinevi-dialog.component';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute } from '@angular/router';
import { Sonuc } from 'src/app/models/Sonuc';

@Component({
  selector: 'app-yayinevi-liste',
  templateUrl: './yayinevi-liste.component.html',
  styleUrls: ['./yayinevi-liste.component.css']
})
export class YayineviListeComponent implements OnInit {
  dialogRef: MatDialogRef<YayineviDialogComponent>;
  confirmdialogRef: MatDialogRef<ConfirmDialogComponent>;
  Yayinevi: Yayinevi[];
  YayineviId: number;
  secYayinevi: Yayinevi;
  dataSource: any;
  displayedColumns = [
    'katId',
    'katAdi',
    'katUrunSay',
    'islemler',
  ];
  constructor(
    public apiServis: ApiService,
    public route: ActivatedRoute,
    public matDialog: MatDialog,
    public alert: MyAlertService
  ) { }

  ngOnInit() {
    this.route.params.subscribe((p) => {
      console.log(p);
     if (p) {
       this.YayineviId = p.yaynId;
       this.YayineviGetir();
     }
   });
  }

  YayineviGetir() {
    this.apiServis.YayineviById(this.YayineviId).subscribe((d: Yayinevi) => {
      this.secYayinevi = d;
      console.log(d);
    });
  }

  Duzenle(kayit: Yayinevi) {
    this.dialogRef = this.matDialog.open(YayineviDialogComponent, {
      width: '60%',
      data: {
        kayit: kayit,
        islem: 'duzenle',
      },
    });

    this.dialogRef.afterClosed().subscribe((d) => {
      if (d) {
        kayit.yayineviId = d.yayineviId;
        this.apiServis.YayineviDuzenle(kayit).subscribe((s: Sonuc) => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.YayineviGetir();
          }
        });
      }
    });
  }

  Sil(kayit: Yayinevi) {
    this.confirmdialogRef = this.matDialog.open(ConfirmDialogComponent, {
      width: '60%',
    });
    this.confirmdialogRef.componentInstance.dialogMesaj =
      kayit.yayineviId +
      " Id'li " +
      kayit.yayineviAdi +
      '  yayınevini silmek istediğinize emin misin ?';

    this.confirmdialogRef.afterClosed().subscribe((d) => {
      if (d) {
        this.apiServis.KategoriSil(kayit.yayineviId).subscribe((s: Sonuc) => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.YayineviGetir();
          }
        });
      }
    });
  }

}
