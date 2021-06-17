import { MyAlertService } from './../../../services/myAlert.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../dialogs/confirm-dialog/confirm-dialog.component';
import { YayineviDialogComponent } from '../../dialogs/yayinevi-dialog/yayinevi-dialog.component';
import { Yayinevi } from 'src/app/models/Yayinevi';
import { ApiService } from 'src/app/services/api.service';
import { MatTableDataSource } from '@angular/material/table';
import { Sonuc } from 'src/app/models/Sonuc';

@Component({
  selector: 'app-yayinevi',
  templateUrl: './yayinevi.component.html',
  styleUrls: ['./yayinevi.component.css']
})
export class YayineviComponent implements OnInit {
  dialogRef: MatDialogRef<YayineviDialogComponent>;
  confirmdialogRef: MatDialogRef<ConfirmDialogComponent>;
  yayinevleri: Yayinevi[];
  dataSource: any;
  displayedColumns = [
    'yayineviId',
    'yayineviAdi',
    'islemler',
  ];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(
    public apiServis: ApiService,
    public matDialog: MatDialog,
    public alert: MyAlertService
  ) { }

  ngOnInit() {
    this.YayineviListe();
  }

  YayineviListe() {
    this.apiServis.YayineviListe().subscribe((d: Yayinevi[]) => {
      this.yayinevleri = d;
      this.dataSource = new MatTableDataSource(this.yayinevleri);
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
    var yeniKayit: Yayinevi = new Yayinevi();
    this.dialogRef = this.matDialog.open(YayineviDialogComponent, {
      width: '60%',
      data: {
        kayit: yeniKayit,
        islem: 'ekle',
      },
    });
    this.dialogRef.afterClosed().subscribe((d) => {
      if (d) {
        this.apiServis.YayineviEkle(d).subscribe((s: Sonuc) => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.YayineviListe();
          }
        });
      }
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

        kayit.yayineviAdi = d.yayineviAdi;

        this.apiServis.YayineviDuzenle(kayit).subscribe((s: Sonuc) => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.YayineviListe();
          }
        });
      }
    });
  }

  Sil(kayit: Yayinevi) {
    this.confirmdialogRef = this.matDialog.open(ConfirmDialogComponent, {
      width: '60%',
    });
    this.confirmdialogRef.componentInstance.dialogMesaj = kayit.yayineviAdi + '  Yayınevi silinecektir onaylıyor musunuz ?';

    this.confirmdialogRef.afterClosed().subscribe(d=>{
      if (d) {
        this.apiServis.YayineviSil(kayit.yayineviId).subscribe((s:Sonuc)=>{
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.YayineviListe();
          }
        });
      }
    });
  }

}
