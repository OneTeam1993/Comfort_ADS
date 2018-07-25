using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FMSWebApi.Models
{
    public class SearchJob
    {
        public long JobID { get; set; }
        public string JobNumber { get; set; }
        public string Company { get; set; }
        public int AssetID { get; set; }
        public string Asset { get; set; }
        public DriverInfo DriverInfo { get; set; }
        public int AssetCompanyID { get; set; }
        public string AssetCompany { get; set; }
        public int AssetResellerID { get; set; }
        public string AssetReseller { get; set; }
        public DateTime TOC { get; set; }
        public DateTime Timestamp { get; set; }
        public DateTime RxTime { get; set; }
        public double Amount { get; set; }
        public string Bed { get; set; }
        public string Caller { get; set; }
        public string Destination { get; set; }
        public string Origin { get; set; }
        public string Phone { get; set; }
        public string Unit { get; set; }
        public string Accessories { get; set; }
        public int Payment { get; set; }
        public int Trip { get; set; }
        public int Flag { get; set; }
        public string Patient { get; set; }
        public string Remarks { get; set; }
        public string Remarks2 { get; set; }
        public string Receipt { get; set; }
        public double NewAmount { get; set; }
        public string Agent { get; set; }
        public string JobStatus { get; set; }
        public string Paramedic { get; set; }
        public string JobDriver { get; set; }
        public string JobType { get; set; }
        public int isReturn { get; set; }
		public string ErrorMessage { get; set; }
    }
}