import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Musteri } from 'src/app/models/Musteri';

@Component({
  selector: 'app-uye-dialog',
  templateUrl: './uye-dialog.component.html',
  styleUrls: ['./uye-dialog.component.scss'],
})
export class UyeDialogComponent implements OnInit {

  dialogBaslik: string;
  yeniKayit: Musteri;
  islem: string;
  frm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<UyeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public frmBuild: FormBuilder,

  ) {
    this.islem = data.islem;
    this.yeniKayit = data.kayit;

    if (this.islem == 'ekle') {
      this.dialogBaslik = 'Üye Ekle';
    }
    if (this.islem == 'duzenle') {
      this.dialogBaslik = 'Üye Düzenle';
    }

    this.frm=this.FormOlustur();
  }
  ngOnInit() {
  }
  FormOlustur() {
    return this.frmBuild.group({
      musteriId: [this.yeniKayit.musteriId],
      musteriAdi: [this.yeniKayit.musteriAdi],
      musteriSoyadi: [this.yeniKayit.musteriSoyadi],
      musteriMail: [this.yeniKayit.musteriMail],
      musteriKuladi: [this.yeniKayit.musteriKuladi],
      musteriSifre: [this.yeniKayit.musteriSifre],
      musteriAdres: [this.yeniKayit.musteriAdres],
      yetkilendirme: [this.yeniKayit.yetkilendirme],
    });
  }


}
