using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FMSWebApi.Models
{
    /// <summary>
    /// hospital info
    /// </summary>
    public class HospitalInfo
    {
      
        public int HospitalID { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public string ShortName { get; set; }
        public int CodeID { get; set; }
        public string ErrorMessage { get; set; }
    
    }
}