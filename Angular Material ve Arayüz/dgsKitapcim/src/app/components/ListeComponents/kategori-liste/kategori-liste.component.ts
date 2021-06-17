import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Kategori } from 'src/app/models/Kategori';
import { Sonuc } from 'src/app/models/Sonuc';
import { ApiService } from 'src/app/services/api.service';
import { MyAlertService } from 'src/app/services/myAlert.service';
import { ConfirmDialogComponent } from '../../dialogs/confirm-dialog/confirm-dialog.component';
import { KategoriDialogComponent } from '../../dialogs/kategori-dialog/kategori-dialog.component';

@Component({
  selector: 'app-kategori-liste',
  templateUrl: './kategori-liste.component.html',
  styleUrls: ['./kategori-liste.component.css']
})
export class KategoriListeComponent implements OnInit {
  dialogRef: MatDialogRef<KategoriDialogComponent>;
  confirmdialogRef: MatDialogRef<ConfirmDialogComponent>;
  kategori: Kategori[];
  katId: number;
  secKategori: Kategori;
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
       this.katId = p.katId;
       this.KategoriGetir();
     }
   });
  }

  KategoriGetir() {
    this.apiServis.KategoriById(this.katId).subscribe((d: Kategori) => {
      this.secKategori = d;
      console.log(d);
    });
  }

  Duzenle(kayit: Kategori) {
    this.dialogRef = this.matDialog.open(KategoriDialogComponent, {
      width: '60%',
      data: {
        kayit: kayit,
        islem: 'duzenle',
      },
    });

    this.dialogRef.afterClosed().subscribe((d) => {
      if (d) {
        kayit.kategoriId = d.katId;
        this.apiServis.KategoriDuzenle(kayit).subscribe((s: Sonuc) => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.KategoriGetir();
          }
        });
      }
    });
  }

  Sil(kayit: Kategori) {
    this.confirmdialogRef = this.matDialog.open(ConfirmDialogComponent, {
      width: '60%',
    });
    this.confirmdialogRef.componentInstance.dialogMesaj =
      kayit.kategoriId +
      " ID'li " +
      kayit.kategoriAdi +
      '  Kategoriyi silmek istediğinize emin misiniz ?';

    this.confirmdialogRef.afterClosed().subscribe((d) => {
      if (d) {
        this.apiServis.KategoriSil(kayit.kategoriId).subscribe((s: Sonuc) => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.KategoriGetir();
          }
        });
      }
    });
  }

}
