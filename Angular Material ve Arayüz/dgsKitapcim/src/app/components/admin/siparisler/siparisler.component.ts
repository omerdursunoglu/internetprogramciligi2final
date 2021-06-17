import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Siparis } from 'src/app/models/Siparis';
import { Sonuc } from 'src/app/models/Sonuc';
import { ApiService } from 'src/app/services/api.service';
import { MyAlertService } from 'src/app/services/myAlert.service';
import { ConfirmDialogComponent } from '../../dialogs/confirm-dialog/confirm-dialog.component';
import { SiparisDialogComponent } from '../../dialogs/siparis-dialog/siparis-dialog.component';


@Component({
  selector: 'app-siparisler',
  templateUrl: './siparisler.component.html',
  styleUrls: ['./siparisler.component.css']
})
export class SiparislerComponent implements OnInit {
  dialogRef: MatDialogRef<SiparisDialogComponent>;
  confirmdialogRef: MatDialogRef<ConfirmDialogComponent>;
  siparis: Siparis[];
  dataSource: any;
  displayedColumns = [

    'siparisId',
    'siparisMusteriId',
    'siparisMusteriAdi',
    'siparisMusteriSoyadi',
    'siparisKitapId',
    'siparisKitapAdi',
    'siparisKitapFiyati',
    'siparisTarihi',
    'siparisMusteriAdres',
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
    this.SiparisListe();
  }

  SiparisListe() {
    this.apiServis.SiparisListe().subscribe((d: Siparis[]) => {
      this.siparis = d;
      this.dataSource = new MatTableDataSource(this.siparis);
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
    var yeniKayit: Siparis = new Siparis();
    this.dialogRef = this.matDialog.open(SiparisDialogComponent, {
      width: '60%',
      data: {
        kayit: yeniKayit,
        islem: 'ekle',
      },
    });
    this.dialogRef.afterClosed().subscribe((d) => {
      if (d) {
        this.apiServis.SiparisEkle(d).subscribe((s: Sonuc) => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.SiparisListe();
          }
        });
      }
    });
  }

  Duzenle(kayit: Siparis) {
    this.dialogRef = this.matDialog.open(SiparisDialogComponent, {
      width: '60%',
      data: {
        kayit: kayit,
        islem: 'duzenle',
      },
    });

    this.dialogRef.afterClosed().subscribe((d) => {
      if (d) {

        kayit.siparisKitapId = d.siparisKitapId;
        kayit.siparisMusteriId = d.siparisMusteriId;
        kayit.siparisTarihi = d.siparisTarihi;
        kayit.siparisKodu = d.siparisKodu;

        this.apiServis.SiparisDuzenle(kayit).subscribe((s: Sonuc) => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.SiparisListe();
          }
        });
      }
    });
  }
  Sil(kayit: Siparis) {
    this.confirmdialogRef = this.matDialog.open(ConfirmDialogComponent, {
      width: '60%',
    });
    this.confirmdialogRef.componentInstance.dialogMesaj = kayit.siparisKodu + " Kodlu " + kayit.siparisKitapAdi + '  Kitabının siparişini silmek istediğinizden, emin misiniz ?';

    this.confirmdialogRef.afterClosed().subscribe(d=>{
      if (d) {
        this.apiServis.SiparisSil(kayit.siparisId).subscribe((s:Sonuc)=>{
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.SiparisListe();
          }
        });
      }
    });
  }

}
