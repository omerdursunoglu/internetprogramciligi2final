import { Yayinevi } from './../../../models/Yayinevi';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Kategori } from 'src/app/models/Kategori';
import { Kitap } from 'src/app/models/Kitap';
import { ApiService } from 'src/app/services/api.service';
import { MyAlertService } from 'src/app/services/myAlert.service';

@Component({
  selector: 'app-urun-dialog',
  templateUrl: './urun-dialog.component.html',
  styleUrls: ['./urun-dialog.component.css']
})
export class UrunDialogComponent implements OnInit {
  dialogBaslik: string;
  yeniKayit: Kitap;
  islem: string;
  frm: FormGroup;
  dataSource: any;
  kategoriler: Kategori[];
  yayinevleri: Yayinevi[];
  constructor(
    public dialogRef: MatDialogRef<UrunDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public frmBuild: FormBuilder,
    public apiServis: ApiService,
    public matDialog: MatDialog,
    public alert: MyAlertService
  ) {
    this.islem = data.islem;
    this.yeniKayit = data.kayit;

    if (this.islem == 'ekle') {
      this.dialogBaslik = 'Kitap Ekle';
    }
    if (this.islem == 'duzenle') {
      this.dialogBaslik = 'Kitap Düzenle';
    }

    this.frm=this.FormOlustur();
   }

  ngOnInit() {
    this.KategoriListe()
    this.YayineviListe()
  }

  FormOlustur() {
    return this.frmBuild.group({

      kitapId: [this.yeniKayit.kitapId],
      kitapAdi: [this.yeniKayit.kitapAdi],
      kitapFiyat: [this.yeniKayit.kitapFiyat],
      kitapSayfasi: [this.yeniKayit.kitapSayfasi],
      kitapYayineviId: [this.yeniKayit.kitapYayineviId],
      kitapBasim: [this.yeniKayit.kitapBasim],
      kitapResmi: [this.yeniKayit.kitapResmi],
      kitapKategoriId: [this.yeniKayit.kitapKategoriId],
    });
  }

  KategoriListe() {
    this.apiServis.KategoriListe().subscribe((d: Kategori[]) => {
      this.kategoriler = d;
      this.dataSource = new MatTableDataSource(this.kategoriler);

    });
  }

  YayineviListe() {
    this.apiServis.YayineviListe().subscribe((d: Yayinevi[]) => {
      this.yayinevleri = d;
      this.dataSource = new MatTableDataSource(this.yayinevleri);

    });
  }
}
