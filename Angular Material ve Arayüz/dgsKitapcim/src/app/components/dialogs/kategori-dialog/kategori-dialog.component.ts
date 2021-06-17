import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Kategori } from 'src/app/models/Kategori';

@Component({
  selector: 'app-kategori-dialog',
  templateUrl: './kategori-dialog.component.html',
  styleUrls: ['./kategori-dialog.component.css']
})
export class KategoriDialogComponent implements OnInit {
  dialogBaslik: string;
  yeniKayit: Kategori;
  islem: string;
  frm: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<KategoriDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public frmBuild: FormBuilder,
  ) {
    this.islem = data.islem;
    this.yeniKayit = data.kayit;

    if (this.islem == 'ekle') {
      this.dialogBaslik = 'Kategori Ekle';
    }
    if (this.islem == 'duzenle') {
      this.dialogBaslik = 'Kategori Düzenle';
    }

    this.frm=this.FormOlustur();
   }

  ngOnInit() {
  }

  FormOlustur() {
    return this.frmBuild.group({

      kategoriId: [this.yeniKayit.kategoriId],
      kategoriAdi: [this.yeniKayit.kategoriAdi],
    });
  }

}

