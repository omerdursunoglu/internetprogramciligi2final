using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace kitapSatis.ViewModel
{
    public class SiparisModel
    {
        public int siparisId { get; set; }
        public int siparisMusteriId { get; set; }
        public int siparisKodu { get; set; }
        public int siparisKitapId { get; set; }
        public string siparisTarihi { get; set; }
        public string siparisMusteriAdi { get; set; }
        public string siparisMusteriSoyadi { get; set; }
        public string siparisMusteriAdres { get; set; }
        public string siparisMusteriTelefon { get; set; }
        public string siparisMusteriMail { get; set; }

        public string siparisKitapAdi { get; set; }
        public decimal siparisKitapFiyati { get; set; }

        public string siparisYayineviAdi { get; set; }
        public string siparisKategoriAdi { get; set; }




    }
}