using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AutoLogoutWinSvc.Models
{
    /// <summary>
    /// company info
    /// </summary>
    public class DriverSched
    {
        public long SCS_ID { get; set; }
        public DateTime OP_DATE { get; set; }
        public DateTime RX_TIME { get; set; }
        public string BUS_NO { get; set; }
        public string SVC_NO { get; set; }
        public int DRV_NO { get; set; }
        public string DUTY_NO { get; set; }
        public string ACT_DEP_TIME { get; set; }
        public string ACT_ARR_TIME { get; set; }
        public string RESN_CODE_FOR_DEP { get; set; }
        public string RESN_DESC { get; set; }
        public string REMARKS_FOR_DEP { get; set; }
        public string ErrorMessage { get; set; }
    
    }
}