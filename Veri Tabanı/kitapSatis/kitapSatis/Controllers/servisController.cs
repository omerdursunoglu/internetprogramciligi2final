using System;
using System.Collections.Generic;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Web.Http;
using kitapSatis.Models;
using kitapSatis.ViewModel;

namespace kitapSatis.Controllers
{
    public class servisController : ApiController
    {
        KitapSatisDBEntities db = new KitapSatisDBEntities();
        SonucModel sonuc = new SonucModel();

        #region Kategori

        [HttpGet]
        [Route("api/kategoriliste")]
        public List<KategoriModel> KategoriListe()
        {
            List<KategoriModel> liste = db.kategori.Select(x => new KategoriModel()
            {

                kategoriId = x.kategoriId,
                kategoriAdi = x.kategoriAdi,
                katUrunSay = x.kitaplar.Count()

            }
            ).ToList();

            return liste;
        }
        [HttpGet]
        [Route("api/kategoribyid/{kategoriId}")]
        public KategoriModel KategoriById(int kategoriId)
        {
            KategoriModel kayit = db.kategori.Where(s => s.kategoriId == kategoriId).Select(x => new KategoriModel()
            {
                kategoriId = x.kategoriId,
                kategoriAdi = x.kategoriAdi,
                katUrunSay = x.kitaplar.Count()
            }).FirstOrDefault();
            return kayit;
        }
        [Authorize]
        [HttpPost]
        [Route("api/kategoriekle")]
        public SonucModel KategoriEkle(KategoriModel model)
        {
            if (db.kategori.Count(s => s.kategoriAdi == model.kategoriAdi) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Bu kategori zaten var.";
                return sonuc;
            }

            kategori yeni = new kategori();
            yeni.kategoriAdi = model.kategoriAdi;
            db.kategori.Add(yeni);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Kategori eklendi.";
            return sonuc;
        }
        [Authorize]
        [HttpPut]
        [Route("api/kategoriduzenle")]
        public SonucModel KategoriDuzenle(KategoriModel model)
        {
            kategori kayit = db.kategori.Where(s => s.kategoriId == model.kategoriId).FirstOrDefault();

            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Kategori bulunamadı.";
                return sonuc;
            }

            kayit.kategoriAdi = model.kategoriAdi;
            db.SaveChanges();

            sonuc.islem = true;
            sonuc.mesaj = "Kategori düzenlendi.";
            return sonuc;
        }
        [Authorize]
        [HttpDelete]
        [Route("api/kategorisil/{kategoriId}")]
        public SonucModel KategoriSil(int kategoriId)
        {
            kategori kayit = db.kategori.Where(s => s.kategoriId == kategoriId).FirstOrDefault();

            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Kategori bulunamadı.";
                return sonuc;
            }

            if (db.kitaplar.Count(s => s.kitapKategoriId == kategoriId) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Kategori içinde kayıtlar, olduğu için kategori silinemez.";
                return sonuc;
            }

            db.kategori.Remove(kayit);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Kategori silindi.";
            return sonuc;
        }

        #endregion

        #region Kitaplar

        [HttpGet]
        [Route("api/kitapliste")]
        public List<KitapModel> kitapListe()
        {
            List<KitapModel> liste = db.kitaplar.Select(x => new KitapModel()
            {

                kitapId = x.kitapId,
                kitapAdi = x.kitapAdi,
                kitapFiyat = x.kitapFiyat,
                kitapSayfasi = x.kitapSayfasi,
                kitapYayineviId = x.kitapYayineviId,
                kitapBasim = x.kitapBasim,
                kitapResmi = x.kitapResmi,
                kitapKategoriId = x.kitapKategoriId,
                kitapKategoriAdi = x.kategori.kategoriAdi,

            }
            ).ToList();

            return liste;
        }
        [HttpGet]
        [Route("api/kitapbyid/{kitapId}")]
        public KitapModel kitapById(int kitapId)
        {
            KitapModel kayit = db.kitaplar.Where(s => s.kitapId == kitapId).Select(x => new KitapModel()
            {
                kitapId = x.kitapId,
                kitapAdi = x.kitapAdi,
                kitapFiyat = x.kitapFiyat,
                kitapSayfasi = x.kitapSayfasi,
                kitapYayineviId = x.kitapYayineviId,
                kitapBasim = x.kitapBasim,
                kitapResmi = x.kitapResmi,
                kitapKategoriId = x.kitapKategoriId,


            }).FirstOrDefault();
            return kayit;
        }
        [Authorize]
        [HttpPost]
        [Route("api/kitapekle")]
        public SonucModel kitapEkle(KitapModel model)
        {
            if (db.kitaplar.Count(s => s.kitapAdi == model.kitapAdi) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Bu kitap zaten kayıtlı.";
                return sonuc;
            }

            kitaplar yeni = new kitaplar();

            yeni.kitapAdi = model.kitapAdi;
            yeni.kitapFiyat = model.kitapFiyat;
            yeni.kitapSayfasi = model.kitapSayfasi;
            yeni.kitapYayineviId = model.kitapYayineviId;
            yeni.kitapBasim = model.kitapBasim;
            yeni.kitapResmi = "stokfoto.jpg";
            yeni.kitapKategoriId = model.kitapKategoriId;

            db.kitaplar.Add(yeni);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Kitap eklendi.";
            return sonuc;
        }
        [Authorize]
        [HttpPut]
        [Route("api/kitapduzenle")]
        public SonucModel kitapDuzenle(KitapModel model)
        {
            kitaplar kayit = db.kitaplar.Where(s => s.kitapId == model.kitapId).FirstOrDefault();

            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Kitap bulunamadı.";
                return sonuc;
            }

            kayit.kitapAdi = model.kitapAdi;
            kayit.kitapFiyat = model.kitapFiyat;
            kayit.kitapSayfasi = model.kitapSayfasi;
            kayit.kitapYayineviId = model.kitapYayineviId;
            kayit.kitapBasim = model.kitapBasim;
            kayit.kitapResmi = model.kitapResmi;
            kayit.kitapKategoriId = model.kitapKategoriId;
            db.SaveChanges();

            sonuc.islem = true;
            sonuc.mesaj = "Kitap düzenlendi.";
            return sonuc;
        }
        [Authorize]
        [HttpDelete]
        [Route("api/kitapsil/{kitapId}")]
        public SonucModel kitapSil(int kitapId)
        {
            kitaplar kayit = db.kitaplar.Where(s => s.kitapId == kitapId).FirstOrDefault();

            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Kitap bulunamadı.";
                return sonuc;
            }

            if (db.kitaplar.Count(s => s.kitapKategoriId == kitapId) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Kitap silinemedi.";
                return sonuc;
            }

            db.kitaplar.Remove(kayit);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Kitap silindi.";
            return sonuc;
        }
        [Authorize]
        [HttpPost]
        [Route("api/kitapresimguncelle")]
        public SonucModel kitapresimguncelle(KitapResmi model)
        {
            kitaplar ktp = db.kitaplar.Where(s => s.kitapId == model.kitapId).SingleOrDefault();
            if (ktp == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Böyle bir kitap yok";
                return sonuc;
            }

            if (ktp.kitapResmi != "stokresim.jpg")
            {
                string yol = System.Web.Hosting.HostingEnvironment.MapPath("~/Dosyalar/" + ktp.kitapResmi);
                if (File.Exists(yol))
                {
                    File.Delete(yol);
                }
            }

            string data = model.resimData;
            string base64 = data.Substring(data.IndexOf(',') + 1);
            base64 = base64.Trim('\0');
            byte[] imgbytes = Convert.FromBase64String(base64);
            string dosyaAdi = ktp.kitapId + model.resimUzanti.Replace("image/", ".");

            using (var ms = new MemoryStream(imgbytes, 0, imgbytes.Length))
            {

                Image img = Image.FromStream(ms, true);
                img.Save(System.Web.Hosting.HostingEnvironment.MapPath("~/Dosyalar/" + dosyaAdi));

            }

            ktp.kitapResmi = dosyaAdi;
            db.SaveChanges();

            sonuc.islem = true;
            sonuc.mesaj = "Kitap resmi güncellendi.";


            return sonuc;
        }

        #endregion

        #region Yayinevi

        [HttpGet]
        [Route("api/yayineviliste")]
        public List<YayineviModel> MarkaListe()
        {
            List<YayineviModel> liste = db.yayinevi.Select(x => new YayineviModel()
            {

                yayineviId = x.yayineviId,
                yayineviAdi = x.yayineviAdi,


            }
            ).ToList();

            return liste;
        }

        [HttpGet]
        [Route("api/yayinevibyid/{yayineviId}")]
        public YayineviModel yayineviById(int yayineviId)
        {
            YayineviModel kayit = db.yayinevi.Where(s => s.yayineviId == yayineviId).Select(x => new YayineviModel()
            {
                yayineviId = x.yayineviId,
                yayineviAdi = x.yayineviAdi,
                


            }).FirstOrDefault();
            return kayit;
        }
        [Authorize]
        [HttpPost]
        [Route("api/yayineviekle")]
        public SonucModel yayineviEkle(YayineviModel model)
        {
            if (db.yayinevi.Count(s => s.yayineviAdi == model.yayineviAdi) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Bu yayınevi zaten var.";
                return sonuc;
            }

            yayinevi yeni = new yayinevi();

            yeni.yayineviAdi = model.yayineviAdi;
          

            db.yayinevi.Add(yeni);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Yayınevi eklendi.";
            return sonuc;
        }
        [Authorize]
        [HttpPut]
        [Route("api/yayineviduzenle")]
        public SonucModel YayineviDuzenle(YayineviModel model)
        {
            yayinevi kayit = db.yayinevi.Where(s => s.yayineviId == model.yayineviId).FirstOrDefault();

            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Yayınevi bulunamadı.";
                return sonuc;
            }

            kayit.yayineviAdi = model.yayineviAdi;
            db.SaveChanges();

            sonuc.islem = true;
            sonuc.mesaj = "Yayınevi düzenlendi.";
            return sonuc;
        }
        [Authorize]
        [HttpDelete]
        [Route("api/yayinevisil/{yayineviId}")]
        public SonucModel yayineviSil(int yayineviId)
        {
            yayinevi kayit = db.yayinevi.Where(s => s.yayineviId == yayineviId).FirstOrDefault();

            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Yayınevi bulunamadı.";
                return sonuc;
            }

         

            db.yayinevi.Remove(kayit);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Yayınevi Silindi";
            return sonuc;
        }

        #endregion

        #region Musteri
        [Authorize]
        [HttpGet]
        [Route("api/musteriliste")]
        public List<MusteriModel> UyeListe()
        {
            List<MusteriModel> liste = db.musteri.Select(x => new MusteriModel()
            {

                musteriId = x.musteriId,
                musteriAdi = x.musteriAdi,
                musteriSoyadi = x.musteriSoyadi,
                musteriKuladi = x.musteriKuladi,
                musteriSifre = x.musteriSifre,
                musteriMail = x.musteriMail,
                musteriAdres = x.musteriAdres,
                yetkilendirme = x.yetkilendirme,

            }
            ).ToList();

            return liste;
        }
        [Authorize]
        [HttpGet]
        [Route("api/musteribyid/{musteriId}")]
        public MusteriModel UyeById(int musteriId)
        {
            MusteriModel kayit = db.musteri.Where(s => s.musteriId == musteriId).Select(x => new MusteriModel()
            {
                musteriId = x.musteriId,
                musteriAdi = x.musteriAdi,
                musteriSoyadi = x.musteriSoyadi,
                musteriKuladi = x.musteriKuladi,
                musteriSifre = x.musteriSifre,
                musteriMail = x.musteriMail,
                musteriAdres = x.musteriAdres,
                yetkilendirme = x.yetkilendirme,
            }).FirstOrDefault();
            return kayit;
        }

        [HttpPost]
        [Route("api/musteriekle")]
        public SonucModel MusteriEkle(MusteriModel model)
        {
            if (db.musteri.Count(s => s.musteriKuladi == model.musteriKuladi) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Zaten kayıtlı.";
                return sonuc;
            }

            musteri yeni = new musteri();

            yeni.musteriAdi = model.musteriAdi;
            yeni.musteriSoyadi = model.musteriSoyadi;
            yeni.musteriKuladi = model.musteriKuladi;
            yeni.musteriSifre = model.musteriSifre;
            yeni.musteriMail = model.musteriMail;
            yeni.musteriAdres = model.musteriAdres;
            


            db.musteri.Add(yeni);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Eklendi.";
            return sonuc;
        }

        [HttpPut]
        [Route("api/musteriduzenle")]
        public SonucModel MusteriDuzenle(MusteriModel model)
        {
            musteri kayit = db.musteri.Where(s => s.musteriId == model.musteriId).FirstOrDefault();

            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Müşteri bulunamadı.";
                return sonuc;
            }

            kayit.musteriAdi = model.musteriAdi;
            kayit.musteriSoyadi = model.musteriSoyadi;
            kayit.musteriKuladi = model.musteriKuladi;
            kayit.musteriSifre = model.musteriSifre;
            kayit.musteriMail = model.musteriMail;
            kayit.musteriAdres = model.musteriAdres;
            kayit.yetkilendirme = model.yetkilendirme;


            db.SaveChanges();

            sonuc.islem = true;
            sonuc.mesaj = "Müşteri düzenlendi.";
            return sonuc;
        }

        [HttpDelete]
        [Route("api/musterisil/{uyeId}")]
        public SonucModel MusteriSil(int musteriId)
        {
            musteri kayit = db.musteri.Where(s => s.musteriId == musteriId).FirstOrDefault();

            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Müşteri bulunamadı.";
                return sonuc;
            }




            db.musteri.Remove(kayit);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Müşteri silindi.";
            return sonuc;
        }

        #endregion

        #region Siparis
        [Authorize]
        [HttpGet]
        [Route("api/siparisliste")]
        public List<SiparisModel> SiparisListe()
        {
            List<SiparisModel> liste = db.siparis.Select(x => new SiparisModel()
            {

                siparisId = x.siparisId,
                siparisMusteriId = x.siparisMusteriId,
                siparisTarihi = x.siparisTarihi,
                siparisKodu = x.siparisKodu,
                siparisKitapId = x.siparisKitapId,

                siparisMusteriAdi = x.musteri.musteriAdi,
                siparisMusteriSoyadi = x.musteri.musteriSoyadi,
                siparisMusteriAdres = x.musteri.musteriAdres,
                siparisMusteriMail = x.musteri.musteriMail,

                siparisKitapAdi = x.kitaplar.kitapAdi,
                siparisKitapFiyati = x.kitaplar.kitapFiyat,

                siparisYayineviAdi = x.kitaplar.yayinevi.yayineviAdi,
                siparisKategoriAdi = x.kitaplar.kategori.kategoriAdi,
            }
            ).ToList();

            return liste;
        }
        [HttpGet]
        [Route("api/siparisbyid/{siparisId}")]
        public SiparisModel SiparisById(int siparisId)
        {
            SiparisModel kayit = db.siparis.Where(s => s.siparisId == siparisId).Select(x => new SiparisModel()
            {
                siparisId = x.siparisId,
                siparisMusteriId = x.siparisMusteriId,
                siparisTarihi = x.siparisTarihi,
                siparisKodu = x.siparisKodu,
                siparisKitapId = x.siparisKitapId,

                siparisMusteriAdi = x.musteri.musteriAdi,
                siparisMusteriSoyadi = x.musteri.musteriSoyadi,
                siparisMusteriAdres = x.musteri.musteriAdres,
                siparisMusteriMail = x.musteri.musteriMail,

                siparisKitapAdi = x.kitaplar.kitapAdi,
                siparisKitapFiyati = x.kitaplar.kitapFiyat,

                siparisYayineviAdi = x.kitaplar.yayinevi.yayineviAdi,
                siparisKategoriAdi = x.kitaplar.kategori.kategoriAdi,

            }).FirstOrDefault();
            return kayit;
        }

        [HttpPost]
        [Route("api/siparisEkle")]
        public SonucModel SiparisEkle(SiparisModel model)
        {
            if (db.siparis.Count(s => s.siparisKodu == model.siparisKodu) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Bu sipariş zaten var.";
                return sonuc;
            }

            siparis yeni = new siparis();

            yeni.siparisMusteriId = model.siparisMusteriId;
            yeni.siparisTarihi = model.siparisTarihi;
            yeni.siparisKodu = model.siparisKodu;
            yeni.siparisKitapId = model.siparisKitapId;


            db.siparis.Add(yeni);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Sipariş eklendi.";
            return sonuc;
        }

        [HttpPut]
        [Route("api/siparisduzenle")]
        public SonucModel SiparisDuzenle(SiparisModel model)
        {
            siparis kayit = db.siparis.Where(s => s.siparisId == model.siparisId).FirstOrDefault();

            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Sipariş bulunamadı.";
                return sonuc;
            }


            kayit.siparisId = model.siparisId;
            kayit.siparisMusteriId = model.siparisMusteriId;
            kayit.siparisTarihi = model.siparisTarihi;
            kayit.siparisKodu = model.siparisKodu;
            kayit.siparisKitapId = model.siparisKitapId;



            db.SaveChanges();

            sonuc.islem = true;
            sonuc.mesaj = "Sipariş düzenlendi.";
            return sonuc;
        }

        [HttpDelete]
        [Route("api/siparissil/{siparisId}")]
        public SonucModel SiparisSil(int siparisId)
        {
            siparis kayit = db.siparis.Where(s => s.siparisId == siparisId).FirstOrDefault();

            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Sipariş bulunamadı.";
                return sonuc;
            }




            db.siparis.Remove(kayit);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Sipariş silindi.";
            return sonuc;
        }

        #endregion
    }
}
