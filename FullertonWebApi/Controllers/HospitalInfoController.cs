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
    public class HospitalInfoController : ApiController
    {
        private static readonly IHospitalRepository repository = new HospitalRepository();

        public IEnumerable<HospitalInfo> GetAllHospital()
        {
            return repository.GetAll();
        }

        public HospitalInfo GetHospital(int hospitalID)
        {
            HospitalInfo currHospital = repository.Get(hospitalID);
            if (currHospital == null)
            {
                throw new HttpResponseException(HttpStatusCode.NotFound);
            }
            return currHospital;
        }

        public IEnumerable<HospitalInfo> GetHospitalByName(string hospitalname)
        {
            return repository.GetAll().Where(
                c => string.Equals(c.Name, hospitalname,
                         StringComparison.OrdinalIgnoreCase));
        }

        public HospitalInfo PostHospital(HospitalInfo currHospital)
        {
            currHospital = repository.Add(currHospital);
            return currHospital;
        }

        public bool PutHospital(int id, HospitalInfo currHospital)
        {
            currHospital.HospitalID = id;
            if (!repository.Update(currHospital))
            {
                return false;
                //throw new HttpResponseException(HttpStatusCode.NotFound);
            }
            return true;
        }

        public void DeleteHospital(int id)
        {
            HospitalInfo currHospital = repository.Get(id);
            if (currHospital == null)
            {
                throw new HttpResponseException(HttpStatusCode.NotFound);
            }
            repository.Remove(id);
        }

    }
}
