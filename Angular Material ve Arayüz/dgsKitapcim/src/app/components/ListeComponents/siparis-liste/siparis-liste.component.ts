import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Kategori } from 'src/app/models/Kategori';
import { Siparis } from 'src/app/models/Siparis';
import { Sonuc } from 'src/app/models/Sonuc';
import { ApiService } from 'src/app/services/api.service';
import { MyAlertService } from 'src/app/services/myAlert.service';
import { ConfirmDialogComponent } from '../../dialogs/confirm-dialog/confirm-dialog.component';
import { SiparisDialogComponent } from '../../dialogs/siparis-dialog/siparis-dialog.component';

@Component({
  selector: 'app-siparis-liste',
  templateUrl: './siparis-liste.component.html',
  styleUrls: ['./siparis-liste.component.css']
})
export class SiparisListeComponent implements OnInit {
  dialogRef: MatDialogRef<SiparisDialogComponent>;
  confirmdialogRef: MatDialogRef<ConfirmDialogComponent>;
  kategori: Kategori[];
  siparisId: number;
  secSip: Siparis;
  dataSource: any;
  constructor(
    public apiServis: ApiService,
    public route: ActivatedRoute,
    public matDialog: MatDialog,
    public alert: MyAlertService
  ) { }

  ngOnInit() {
    this.route.params.subscribe((p) => {
      console.log(p);
     if (p) {
       this.siparisId = p.siparisId;
       this.SiparisGetir();
     }
   });
  }

  SiparisGetir() {
    this.apiServis.SiparisById(this.siparisId).subscribe((d: Siparis) => {
      this.secSip = d;
      console.log(d);
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
        kayit.siparisMusteriId = d.siparisMusteriId;
        kayit.siparisKitapId = d.siparisKitapId;

        this.apiServis.SiparisDuzenle(kayit).subscribe((s: Sonuc) => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.SiparisGetir();
          }
        });
      }
    });
  }

  Sil(kayit: Siparis) {
    this.confirmdialogRef = this.matDialog.open(ConfirmDialogComponent, {
      width: '60%',
    });
    this.confirmdialogRef.componentInstance.dialogMesaj =
      kayit.siparisKodu +
      ' Kodlu ' +
      kayit.siparisKitapAdi +
      '  siparişinizi, silmek istediğinize emin misiniz ?';

    this.confirmdialogRef.afterClosed().subscribe((d) => {
      if (d) {
        this.apiServis.SiparisSil(kayit.siparisId).subscribe((s: Sonuc) => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.SiparisGetir();
          }
        });
      }
    });
  }

}
