using FMSWebApi.Models;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.IO;
using System.Web.Hosting;
using System.Configuration;
using System.Web.UI.WebControls;

namespace FMSWebApi.Repository
{
    public class GenerateJobIDRepository : IGenerateJobIDRepository
    {
        private string mConnStr = "server=103.237.168.119;uid=root;pwd=@c3c0M;database=ads;Charset=utf8;max pool size=500;";
        private string mProjName = "ADS";

        public IEnumerable<GenerateJobID> GetJobID()
        {
            List<GenerateJobID> arrJobs = new List<GenerateJobID>();
            GenerateJobID currJob = new GenerateJobID();
            object objTemp = new object();

            string query = "SELECT max(job_id) + 1 AS NewJobID FROM jobs LIMIT 1";
  
            using (MySqlConnection conn = new MySqlConnection(mConnStr))
            {
                try
                {
                    using (MySqlCommand cmd = new MySqlCommand(query, conn))
                    {
                        conn.Open();
                        cmd.Prepare();

                        using (MySqlDataReader reader = cmd.ExecuteReader())
                        {
                            if ((reader != null) && (reader.HasRows))
                            {
                                while (reader.Read())
                                {
                                    currJob = DataMgrTools.BuildGenerateJobID(reader);
                                    arrJobs.Add(currJob);
                                }
                            }
                        }

                        conn.Close();
                    }
                }
                catch (Exception ex)
                {
                    Logger.LogEvent(ex.Message + "-Get(JobID)", System.Diagnostics.EventLogEntryType.Error);

                }

            }

            return arrJobs;
        }


    }
}