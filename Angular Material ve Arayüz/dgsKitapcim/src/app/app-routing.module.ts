import { MotivasyonComponent } from './components/motivasyon/motivasyon.component';
import { RehberlikComponent } from './components/rehberlik/rehberlik.component';
import { PaketlerComponent } from './components/paketler/paketler.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { KategorilerComponent } from './components/admin/kategoriler/kategoriler.component';
import { KategoriListeComponent } from './components/ListeComponents/kategori-liste/kategori-liste.component';
import { SiparisListeComponent } from './components/ListeComponents/siparis-liste/siparis-liste.component';
import { UrunListeComponent } from './components/ListeComponents/urun-liste/urun-liste.component';
import { UyeListeComponent } from './components/ListeComponents/uye-liste/uye-liste.component';
import { LoginComponent } from './components/login/login.component';
import { SiparislerComponent } from './components/admin/siparisler/siparisler.component';
import { UrunlerComponent } from './components/admin/urunler/urunler.component';
import { UyelerComponent } from './components/admin/uyeler/uyeler.component';
import { AdminComponent } from './components/admin/admin/admin.component';
import { AuthGuard } from './services/AutgGuard';
import { YayineviComponent } from './components/admin/yayinevi/yayinevi.component';
import { YayineviListeComponent } from './components/ListeComponents/yayinevi-liste/yayinevi-liste.component';
import { BizeulasinComponent } from './components/bizeulasin/bizeulasin.component';



const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'login', component:LoginComponent},
  {path:'bizeulasin', component:BizeulasinComponent},
  {path:'paketler', component:PaketlerComponent},
  {path:'rehberlik', component:RehberlikComponent},
  {path:'motivasyon', component:MotivasyonComponent},


  //admin pathleri
  {path:'admin', component:AdminComponent, canActivate:[AuthGuard],data:{yetkiler:["Admin"],gerigit:"/login"}},
  {path:'admin/uyeler', component:UyelerComponent, canActivate:[AuthGuard],data:{yetkiler:["Admin"],gerigit:"/login"}},
  {path:'admin/siparisler', component:SiparislerComponent, canActivate:[AuthGuard],data:{yetkiler:["Admin"],gerigit:"/login"}},
  {path:'admin/yayinevleri', component:YayineviComponent, canActivate:[AuthGuard],data:{yetkiler:["Admin"],gerigit:"/login"}},
  {path:'admin/kategoriler', component:KategorilerComponent, canActivate:[AuthGuard],data:{yetkiler:["Admin"],gerigit:"/login"}},
  {path:'admin/urunler', component:UrunlerComponent, canActivate:[AuthGuard],data:{yetkiler:["Admin"],gerigit:"/login"}},
  {path:'admin/uyeliste/:uyeId', component:UyeListeComponent, canActivate:[AuthGuard],data:{yetkiler:["Admin"],gerigit:"/login"}},
  {path:'admin/urunliste/:urunId', component:UrunListeComponent, canActivate:[AuthGuard],data:{yetkiler:["Admin"],gerigit:"/login"}},
  {path:'admin/kategoriliste/:katId', component:KategoriListeComponent, canActivate:[AuthGuard],data:{yetkiler:["Admin"],gerigit:"/login"}},
  {path:'admin/siparisliste/:siparisId', component:SiparisListeComponent, canActivate:[AuthGuard],data:{yetkiler:["Admin"],gerigit:"/login"}},
  {path:'admin/yayineviliste/:yayineviId', component:YayineviListeComponent, canActivate:[AuthGuard],data:{yetkiler:["Admin"],gerigit:"/login"}},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
