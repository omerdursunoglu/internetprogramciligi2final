using kitapSatis.Models;
using kitapSatis.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace kitapSatis.Auth
{
    public class musteriService
    {
        KitapSatisDBEntities db = new KitapSatisDBEntities();
        public MusteriModel UyeOturumAc(string kadi, string parola)
        {
            MusteriModel musteri = db.musteri.Where(s => s.musteriKuladi == kadi && s.musteriSifre == parola).Select(x => new MusteriModel()
            {
                musteriId = x.musteriId,
                musteriAdi = x.musteriAdi,
                musteriSoyadi = x.musteriSoyadi,
                musteriKuladi = x.musteriKuladi,
                musteriSifre = x.musteriSifre,
                musteriMail = x.musteriMail,
                musteriAdres = x.musteriAdres,
                yetkilendirme = x.yetkilendirme,

            }).SingleOrDefault();

            return musteri;
        }

    }
}