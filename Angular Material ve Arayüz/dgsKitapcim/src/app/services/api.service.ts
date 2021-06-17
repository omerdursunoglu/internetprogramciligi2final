import { KitapResmi } from './../models/KitapResmi';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Kategori } from '../models/Kategori';
import { Siparis } from '../models/Siparis';
import { Kitap } from '../models/Kitap';
import { Musteri } from '../models/Musteri';
import { Yayinevi } from '../models/Yayinevi';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  apiUrl = 'https://localhost:44346/api/';
  siteUrl = 'https://localhost:44346/';

  constructor(public http: HttpClient) {}

  // Siteye giriş
  tokenAl(kullaniciAdi: string, sifre: string) {
    var data =
      'username=' +
      kullaniciAdi +
      '&password=' +
      sifre +
      '&grant_type=password';

    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });
    return this.http.post(this.apiUrl + '/token', data, { headers: reqHeader });
  }

  oturumKontrol() {
    if (localStorage.getItem('token')) {
      return true;
    } else {
      return false;
    }
  }

  yetkiKontrol(yetkiler) {
    var uyeYetkileri: string[] = JSON.parse(localStorage.getItem('uyeYetkileri'));
    var sonuc: boolean = false;

    if (uyeYetkileri) {
      yetkiler.forEach(element => {
        if (uyeYetkileri.indexOf(element)>-1) {
          sonuc=true;
          return false;
        }
      });
    }

    return sonuc;
  }

  //Kategori servisi

KategoriListe() {
  return this.http.get(this.apiUrl + 'kategoriliste');
}

KategoriById(kategoriId: number) {
  return this.http.get(this.apiUrl + 'kategoribyid/' + kategoriId);
}

KategoriEkle(kat: Kategori) {
  return this.http.post(this.apiUrl + 'kategoriekle', kat);
}

KategoriDuzenle(kat: Kategori) {
  return this.http.put(this.apiUrl + 'kategoriduzenle', kat);
}

KategoriSil(kategoriId: number) {
  return this.http.delete(this.apiUrl + 'kategorisil/' + kategoriId);
}

//Yayınevi servisi

YayineviListe() {
  return this.http.get(this.apiUrl + 'yayineviliste');
}

YayineviById(yayineviId: number) {
  return this.http.get(this.apiUrl + 'yayinevibyid/' + yayineviId);
}

YayineviEkle(yayin: Yayinevi) {
  return this.http.post(this.apiUrl + 'yayineviekle', yayin);
}

YayineviDuzenle(yayin: Yayinevi) {
  return this.http.put(this.apiUrl + 'yayineviduzenle', yayin);
}

YayineviSil(yayineviId: number) {
  return this.http.delete(this.apiUrl + 'yayinevisil/' + yayineviId);
}

  //Kitap servisi

KitapListe() {
  return this.http.get(this.apiUrl + 'kitapliste');
}

KitapById(kitapId: number) {
  return this.http.get(this.apiUrl + 'kitapbyid/' + kitapId);
}

KitapEkle(ktp: Kitap) {
  return this.http.post(this.apiUrl + 'kitapekle', ktp);
}

KitapDuzenle(ktp: Kitap) {
  return this.http.put(this.apiUrl + 'kitapduzenle', ktp);
}

KitapSil(kitapId: number) {
  return this.http.delete(this.apiUrl + 'kitapsil/' + kitapId);
}

kitapresimguncelle(kitapResmi: KitapResmi) {
  return this.http.post(this.apiUrl + 'kitapresimguncelle', kitapResmi);
}

  //Müşteri servisi

MusteriListe() {
  return this.http.get(this.apiUrl + 'musteriliste');
}

MusteriById(musteriId: number) {
  return this.http.get(this.apiUrl + 'musteribyid/' + musteriId);
}

MusteriEkle(muste: Musteri) {
  return this.http.post(this.apiUrl + 'musteriekle', muste);
}

MusteriDuzenle(muste: Musteri) {
  return this.http.put(this.apiUrl + 'musteriduzenle', muste);
}

MusteriSil(musteriId: number) {
  return this.http.delete(this.apiUrl + 'musterisil/' + musteriId);
}

  //Sipariş servisi

SiparisListe() {
  return this.http.get(this.apiUrl + 'siparisliste');
}

SiparisById(siparisId: number) {
  return this.http.get(this.apiUrl + 'siparisbyid/' + siparisId);
}

SiparisEkle(siparis: Siparis) {
  return this.http.post(this.apiUrl + 'siparisEkle', siparis);
}

SiparisDuzenle(siparis: Siparis) {
  return this.http.put(this.apiUrl + 'siparisduzenle', siparis);
}

SiparisSil(siparisId: number) {
  return this.http.delete(this.apiUrl + 'siparissil/' + siparisId);
}
}
