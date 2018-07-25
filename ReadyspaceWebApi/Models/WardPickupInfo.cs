using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FMSWebApi.Models
{
    public class WardPickupInfo
    {
        public string Origin { get; set; }
        public int CountOrigin { get; set; }
		public string ErrorMessage { get; set; }
    }
}