import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Sonuc } from 'src/app/models/Sonuc';
import { Kitap } from 'src/app/models/Kitap';
import { ApiService } from 'src/app/services/api.service';
import { MyAlertService } from 'src/app/services/myAlert.service';
import { ConfirmDialogComponent } from '../../dialogs/confirm-dialog/confirm-dialog.component';
import { UrunDialogComponent } from '../../dialogs/urun-dialog/urun-dialog.component';

@Component({
  selector: 'app-urun-liste',
  templateUrl: './urun-liste.component.html',
  styleUrls: ['./urun-liste.component.css'],
})
export class UrunListeComponent implements OnInit {
  dialogRef: MatDialogRef<UrunDialogComponent>;
  confirmdialogRef: MatDialogRef<ConfirmDialogComponent>;
  urun: Kitap[];
  kitapId: number;
  secUrun: Kitap;

  constructor(
    public apiServis: ApiService,
    public route: ActivatedRoute,
    public matDialog: MatDialog,
    public alert: MyAlertService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((p) => {
      console.log(p);
      if (p) {
        this.kitapId = p.kitapId;
        this.UrunGetir();
      }
    });
  }

  UrunGetir() {
    this.apiServis.KitapById(this.kitapId).subscribe((d: Kitap) => {
      this.secUrun = d;
    });
  }

  Duzenle(kayit: Kitap) {
    this.dialogRef = this.matDialog.open(UrunDialogComponent, {
      width: '60%',
      data: {
        kayit: kayit,
        islem: 'duzenle',
      },
    });

    this.dialogRef.afterClosed().subscribe((d) => {
      if (d) {
        kayit.kitapId = d.kitapId;
        kayit.kitapAdi = d.kitapAdi;
        kayit.kitapFiyat = d.kitapFiyat;
        kayit.kitapSayfasi = d.kitapSayfasi;
        kayit.kitapYayineviId = d.kitapYayineviId;
        kayit.kitapBasim = d.kitapBasim;
        kayit.kitapResmi = d.kitapResmi;
        kayit.kitapKategoriId = d.kitapKategoriId;
        this.apiServis.KitapDuzenle(kayit).subscribe((s: Sonuc) => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.UrunGetir();
          }
        });
      }
    });
  }

  Sil(kayit: Kitap) {
    this.confirmdialogRef = this.matDialog.open(ConfirmDialogComponent, {
      width: '60%',
    });
    this.confirmdialogRef.componentInstance.dialogMesaj =
      kayit.kitapId +
      ' Kodlu ' +
      kayit.kitapAdi +
      '  Ürünü silmek istediğinize emin misiniz ?';

    this.confirmdialogRef.afterClosed().subscribe((d) => {
      if (d) {
        this.apiServis.KitapSil(kayit.kitapId).subscribe((s: Sonuc) => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.UrunGetir();
          }
        });
      }
    });
  }
}
