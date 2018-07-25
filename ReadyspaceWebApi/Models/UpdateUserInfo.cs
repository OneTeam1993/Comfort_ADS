using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FMSWebApi.Models
{
    /// <summary>
    /// user info
    /// </summary>
    public class UpdateUserInfo
    {
        public int UserID { get; set; }
        public string LoginRetry { get; set; }
     
    }
}