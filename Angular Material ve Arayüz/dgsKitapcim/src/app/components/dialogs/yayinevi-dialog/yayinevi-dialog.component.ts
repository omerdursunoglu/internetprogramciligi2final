import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Yayinevi } from './../../../models/Yayinevi';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-yayinevi-dialog',
  templateUrl: './yayinevi-dialog.component.html',
  styleUrls: ['./yayinevi-dialog.component.css']
})
export class YayineviDialogComponent implements OnInit {
  dialogBaslik: string;
  yeniKayit: Yayinevi;
  islem: string;
  frm: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<YayineviDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public frmBuild: FormBuilder,
  ) {
    this.islem = data.islem;
    this.yeniKayit = data.kayit;

    if (this.islem == 'ekle') {
      this.dialogBaslik = 'Yayınevi Ekle';
    }
    if (this.islem == 'duzenle') {
      this.dialogBaslik = 'Yayınevi Düzenle';
    }

    this.frm=this.FormOlustur();
   }

  ngOnInit() {
  }
  FormOlustur() {
    return this.frmBuild.group({

      yayineviId: [this.yeniKayit.yayineviId],
      yayineviAdi: [this.yeniKayit.yayineviAdi],
    });
  }
}
