import { Musteri } from '../../models/Musteri';
import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { ApiService } from 'src/app/services/api.service';
import { Kategori } from 'src/app/models/Kategori';
import { UyeolDialogComponent } from '../dialogs/uyeol-dialog/uyeol-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';
import { MyAlertService } from 'src/app/services/myAlert.service';
import { Sonuc } from 'src/app/models/Sonuc';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css'],
})
export class MainNavComponent implements OnInit {
  kadi: string;
  dataSource:any;
  kategoriler: Kategori[];
  uyeler: Musteri[];
  dialogRef: MatDialogRef<UyeolDialogComponent>;
  confirmdialogRef: MatDialogRef<ConfirmDialogComponent>;
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    public apiServis: ApiService,
    public matDialog: MatDialog,
    public alert: MyAlertService
  ) {}

  ngOnInit(): void {
    this.KategoriListe();
    if (this.apiServis.oturumKontrol) {
      this.kadi = localStorage.getItem('kadi');
    }
  }

  KategoriListe() {
    this.apiServis.KategoriListe().subscribe((d: Kategori[]) => {
      this.kategoriler=d;
    });
  }

  OturumKapat() {
    localStorage.clear();
    location.href = '/';
  }
  Ekle() {
    var yeniKayit: Musteri = new Musteri();
    this.dialogRef = this.matDialog.open(UyeolDialogComponent, {
      width: '60%',
      data: {
        kayit: yeniKayit,
        islem: 'ekle',
      },
    });
    this.dialogRef.afterClosed().subscribe((d) => {
      if (d) {
        this.apiServis.MusteriEkle(d).subscribe((s: Sonuc) => {
          this.alert.AlertUygula(s);
        });
      }
    });
  }
  UrunFiltrele(e) {
    var deger = e.target.value;
    this.dataSource.filter = deger.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
