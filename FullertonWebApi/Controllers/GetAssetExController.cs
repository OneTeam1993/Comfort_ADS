using MySql.Data.MySqlClient;
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
    public class GetAssetExController : ApiController
    {
        private static readonly IAssetRepository repository = new AssetRepository();


        public string Get()
        {
            return "Success";
        }

        // POST: api/getassetex
        public AssetInfo Post([FromBody]AssetInfo value)
        {
            value = repository.GetAssetByTagEx(value) as AssetInfo;
            return value;
        }

    }
}
