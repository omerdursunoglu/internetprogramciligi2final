using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace kitapSatis.ViewModel
{
    public class KitapModel
    {
        public int kitapId { get; set; }
        public string kitapAdi { get; set; }
        public decimal kitapFiyat { get; set; }
        public int kitapSayfasi { get; set; }
        public int kitapYayineviId { get; set; }
        public int kitapBasim { get; set; }
        public string kitapResmi { get; set; }
        public string kitapKategoriAdi { get; set; }

        public int kitapKategoriId { get; set; }
    }
}