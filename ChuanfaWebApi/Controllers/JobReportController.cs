using FMSWebApi.Models;
using FMSWebApi.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace FMSWebApi.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class JobReportController : ApiController
    {
        private static readonly IJobRepository repository = new JobRepository();

        public IEnumerable<JobReportInfo> GetByCompany([FromUri]JobReportInfo param)
        {
            if  ((param.Timestamp != DateTime.MinValue && param.RxTime != DateTime.MinValue) &&
                (param.AssetResellerID > 0 || param.AssetCompanyID > 0 || param.AssetID > 0 || !string.IsNullOrEmpty(param.Asset) || param.Flag > 0 || param.Payment > 0 || !string.IsNullOrEmpty(param.JobStatus) || !string.IsNullOrEmpty(param.Agent) || !string.IsNullOrEmpty(param.JobDriver) || !string.IsNullOrEmpty(param.JobType) || param.Trip > 0))                        
            {
                return repository.GetByCompanyReport(param);
            }
            else
            {
                return repository.GetAllReport();
            }
        }
		
    }
}
