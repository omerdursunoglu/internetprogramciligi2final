import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Sonuc } from 'src/app/models/Sonuc';
import { Kitap } from 'src/app/models/Kitap';
import { ApiService } from 'src/app/services/api.service';
import { MyAlertService } from 'src/app/services/myAlert.service';
import { ConfirmDialogComponent } from '../../dialogs/confirm-dialog/confirm-dialog.component';
import { GorselyukleDialogComponent } from '../../dialogs/gorselyukle-dialog/gorselyukle-dialog.component';
import { UrunDialogComponent } from '../../dialogs/urun-dialog/urun-dialog.component';


@Component({
  selector: 'app-urunler',
  templateUrl: './urunler.component.html',
  styleUrls: ['./urunler.component.css'],
})
export class UrunlerComponent implements OnInit {
  dialogRef: MatDialogRef<UrunDialogComponent>;
  confirmdialogRef: MatDialogRef<ConfirmDialogComponent>;
  gorselDialogRef: MatDialogRef<GorselyukleDialogComponent>;
  urunler: Kitap[];
  dataSource: any;
  displayedColumns = [
    'kitapResmi',
    'kitapId',
    'kitapAdi',
    'kitapFiyat',
    'kitapSayfasi',
    'kitapKategoriId',
    'kitapKategoriAdi',
    'kitapYayineviId',
    'islemler',
  ];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(
    public apiServis: ApiService,
    public matDialog: MatDialog,
    public alert: MyAlertService
  ) {}

  ngOnInit() {
    this.UrunListele();
  }

  UrunListele() {
    this.apiServis.KitapListe().subscribe((d: Kitap[]) => {
      this.urunler = d;
      this.dataSource = new MatTableDataSource(this.urunler);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  UrunFiltrele(e) {
    var deger = e.target.value;
    this.dataSource.filter = deger.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  Ekle() {
    var yeniKayit: Kitap = new Kitap();
    this.dialogRef = this.matDialog.open(UrunDialogComponent, {
      width: '60%',
      data: {
        kayit: yeniKayit,
        islem: 'ekle',
      },
    });
    this.dialogRef.afterClosed().subscribe((d) => {
      if (d) {
        this.apiServis.KitapEkle(d).subscribe((s: Sonuc) => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.UrunListele();
          }
        });
      }
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
            this.UrunListele();
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
      '  Ürününü silmek istediğinize emin misiniz ?';

    this.confirmdialogRef.afterClosed().subscribe((d) => {
      if (d) {
        this.apiServis.KitapSil(kayit.kitapId).subscribe((s: Sonuc) => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.UrunListele();
          }
        });
      }
    });
  }

  GorselGuncelle(kayit: Kitap) {
    this.gorselDialogRef = this.matDialog.open(GorselyukleDialogComponent, {
      width: '40%',
      data: kayit,
    });

    this.gorselDialogRef.afterClosed().subscribe(d=>{
      if (d) {
        d.kitapId=kayit.kitapId;
        this.apiServis.kitapresimguncelle(d).subscribe((s:Sonuc)=>{
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.UrunListele();
          }
        });
      }
    });
  }
}
