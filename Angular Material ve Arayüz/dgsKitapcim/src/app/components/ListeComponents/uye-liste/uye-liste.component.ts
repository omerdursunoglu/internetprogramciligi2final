import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Musteri } from 'src/app/models/Musteri';
import { ApiService } from 'src/app/services/api.service';
import { ConfirmDialogComponent } from '../../dialogs/confirm-dialog/confirm-dialog.component';
import { UyeDialogComponent } from '../../dialogs/uye-dialog/uye-dialog.component';
import { MatDialog } from '@angular/material/dialog';

import { MyAlertService } from 'src/app/services/myAlert.service';
import { Sonuc } from 'src/app/models/Sonuc';

@Component({
  selector: 'app-uye-liste',
  templateUrl: './uye-liste.component.html',
  styleUrls: ['./uye-liste.component.scss'],
})
export class UyeListeComponent implements OnInit {
  dialogRef: MatDialogRef<UyeDialogComponent>;
  confirmdialogRef: MatDialogRef<ConfirmDialogComponent>;
  uye:Musteri[];
  uyeId: number;
  secUye: Musteri;
  dataSource: any;
  displayedColumns= [
    'uyeId',
    'uyeAdi',
    'uyeSoyadi',
    'uyeKullaniciAdi',
    'uyeSifre',
    'uyeTel',
    'uyeMail',
    'uyeAdres',
    'uyeYetki',
    'islemler',

  ];

  constructor(
    public apiServis: ApiService,
    public route: ActivatedRoute,
    public matDialog: MatDialog,
    public alert: MyAlertService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((p) => {
      // console.log(p);
      if (p) {
        this.uyeId = p.uyeId;
        this.UyeGetir();

      }
    });
  }



  UyeGetir() {
    this.apiServis.MusteriById(this.uyeId).subscribe((d: Musteri) => {
      this.secUye = d;
      console.log(d);

    });
  }



  Duzenle(kayit:Musteri) {
    this.dialogRef = this.matDialog.open(UyeDialogComponent, {
      width: '60%',
      data: {
        kayit: kayit,
        islem: 'duzenle',
      },
    });

    this.dialogRef.afterClosed().subscribe((d) => {
      if (d) {
        kayit.musteriAdi = d.musteriAdi;
        kayit.musteriSoyadi = d.musteriSoyadi;
        kayit.musteriMail = d.musteriMail;
        kayit.musteriKuladi = d.musteriKuladi;
        kayit.musteriSifre = d.musteriSifre;
        kayit.musteriAdres = d.musteriAdres;
        kayit.yetkilendirme = d.yetkilendirme;
        this.apiServis.MusteriDuzenle(kayit).subscribe((s: Sonuc) => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.UyeGetir();
          }
        });
      }
    });
  }

  Sil(kayit:Musteri) {
    this.confirmdialogRef = this.matDialog.open(ConfirmDialogComponent, {
      width: '60%',
    });
    this.confirmdialogRef.componentInstance.dialogMesaj = kayit.musteriAdi + " " + kayit.musteriSoyadi + ' İsimli kullanıcıyı silmek istediğinize emin misiniz ?';

    this.confirmdialogRef.afterClosed().subscribe(d=>{
      if (d) {
        this.apiServis.MusteriSil(kayit.musteriId).subscribe((s:Sonuc)=>{
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.UyeGetir();
          }
        });
      }
    });
  }


}
