using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace kitapSatis.ViewModel
{
    public class MusteriModel
    {
        public int musteriId { get; set; }
        public string musteriAdi { get; set; }
        public string musteriSoyadi { get; set; }
        public string musteriMail { get; set; }
        public string musteriKuladi { get; set; }
        public string musteriSifre { get; set; }
        public string musteriAdres { get; set; }
        public int yetkilendirme { get; set; }
    }
}