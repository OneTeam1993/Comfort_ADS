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
    public class GenerateJobIDController : ApiController
    {
        private static readonly IGenerateJobIDRepository repository = new GenerateJobIDRepository();

        public IEnumerable<GenerateJobID> GetByCompany([FromUri]GenerateJobID param)
        {

            return repository.GetJobID();
        }
		
    }
}
