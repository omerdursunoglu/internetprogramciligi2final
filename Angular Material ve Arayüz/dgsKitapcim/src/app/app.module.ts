import { BizeulasinComponent } from './components/bizeulasin/bizeulasin.component';
import { MotivasyonComponent } from './components/motivasyon/motivasyon.component';
import { RehberlikComponent } from './components/rehberlik/rehberlik.component';
import { PaketlerComponent } from './components/paketler/paketler.component';

import { YayineviDialogComponent } from './components/dialogs/yayinevi-dialog/yayinevi-dialog.component';
import { YayineviListeComponent } from './components/ListeComponents/yayinevi-liste/yayinevi-liste.component';
import { YayineviComponent } from './components/admin/yayinevi/yayinevi.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './components/home/home.component';
import { MaterialModule } from './material.module';
import { AlertDialogComponent } from './components/dialogs/alert-dialog/alert-dialog.component';
import { ConfirmDialogComponent } from './components/dialogs/confirm-dialog/confirm-dialog.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MainNavComponent } from './components/main-nav/main-nav.component';
import { UyelerComponent } from './components/admin/uyeler/uyeler.component';
import { UrunlerComponent } from './components/admin/urunler/urunler.component';
import { SiparislerComponent } from './components/admin/siparisler/siparisler.component';
import { KategorilerComponent } from './components/admin/kategoriler/kategoriler.component';
import { UyeDialogComponent } from './components/dialogs/uye-dialog/uye-dialog.component';
import { ApiService } from './services/api.service';
import { MyAlertService } from './services/myAlert.service';
import { ReactiveFormsModule } from '@angular/forms';
import { UyeListeComponent } from './components/ListeComponents/uye-liste/uye-liste.component';
import { UrunDialogComponent } from './components/dialogs/urun-dialog/urun-dialog.component';
import { UrunListeComponent } from './components/ListeComponents/urun-liste/urun-liste.component';
import { KategoriListeComponent } from './components/ListeComponents/kategori-liste/kategori-liste.component';
import { KategoriDialogComponent } from './components/dialogs/kategori-dialog/kategori-dialog.component';
import { SiparisDialogComponent } from './components/dialogs/siparis-dialog/siparis-dialog.component';
import { SiparisListeComponent } from './components/ListeComponents/siparis-liste/siparis-liste.component';
import { GorselyukleDialogComponent } from './components/dialogs/gorselyukle-dialog/gorselyukle-dialog.component';
import { LoginComponent } from './components/login/login.component';
import { AdminComponent } from './components/admin/admin/admin.component';
import { UyeolDialogComponent } from './components/dialogs/uyeol-dialog/uyeol-dialog.component';
import { SafeHTMLPipe } from './pipes/safeHTML.pipe';
import { AuthInterceptor } from './services/AuthInterceptor';
import { AuthGuard } from './services/AutgGuard';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MainNavComponent,
    UyeListeComponent,
    UrunListeComponent,
    KategoriListeComponent,
    SiparisListeComponent,
    YayineviListeComponent,
    LoginComponent,
    SafeHTMLPipe,
    PaketlerComponent,
    RehberlikComponent,
    MotivasyonComponent,
    BizeulasinComponent,


    //Admin
    AdminComponent,
    UyelerComponent,
    UrunlerComponent,
    SiparislerComponent,
    KategorilerComponent,
    YayineviComponent,

    //Dialoglar
    AlertDialogComponent,
    ConfirmDialogComponent,
    UyeDialogComponent,
    UrunDialogComponent,
    KategoriDialogComponent,
    SiparisDialogComponent,
    GorselyukleDialogComponent,
    UyeolDialogComponent,
    YayineviDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  entryComponents:[
    AlertDialogComponent,
    ConfirmDialogComponent,
    UyeDialogComponent,
    UrunDialogComponent,
    KategoriDialogComponent,
    SiparisDialogComponent,
    GorselyukleDialogComponent,
    UyeolDialogComponent,
    YayineviDialogComponent,
  ],
  providers: [ApiService,MyAlertService,AuthGuard ,SafeHTMLPipe,{provide: HTTP_INTERCEPTORS, useClass:AuthInterceptor, multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
