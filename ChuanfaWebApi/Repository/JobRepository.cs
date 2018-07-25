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
using FMSWebApi.Properties;

namespace FMSWebApi.Repository
{
    public class JobRepository : IJobRepository
    {
        private string mConnStr = "server=localhost;uid=root;pwd=$B$Transit888;database=ads;Charset=utf8;max pool size=500;default command timeout=999999;";
        private string mProjName = "ADS";
        public IEnumerable<JobInfo> GetAll()
        {
            MySqlConnection conn = new MySqlConnection();
            MySqlCommand cmd = new MySqlCommand();
            List<JobInfo> arrJobs = new List<JobInfo>();

            try
            {
                conn.ConnectionString = mConnStr;
                conn.Open();

                cmd.CommandText = "view_jobs";
                cmd.Connection = conn;
                cmd.CommandType = CommandType.TableDirect;
                MySqlDataReader reader = cmd.ExecuteReader();

                if ((reader != null) && (reader.HasRows))
                {
                    while (reader.Read())
                    {
                        JobInfo currJob = DataMgrTools.BuildJob(reader);
                        arrJobs.Add(currJob);
                    }
                }
                conn.Close();
            }
            catch (MySqlException ex)
            {
                Logger.LogEvent(mProjName, "GetAll Jobs: " + ex.Message, System.Diagnostics.EventLogEntryType.Error);
            }

            try
            {
                conn.Open();
                for (int i = 0; i < arrJobs.Count; i++)
                {
                    string query = string.Format("SELECT * FROM view_drivers where asset_id = {0}", arrJobs[i].AssetID);

                    cmd.CommandText = query;
                    cmd.Connection = conn;
                    cmd.CommandType = CommandType.Text;
                    using (MySqlDataReader reader = cmd.ExecuteReader())
                    {
                        DriverInfo currDriver = new DriverInfo();
                        if ((reader != null) && (reader.HasRows))
                        {
                            while (reader.Read())
                            {
                                currDriver = DataMgrTools.BuildDriver(reader);
                                string strFill = "";
                                currDriver.Image = GetImage(String.Format("drivers/{0}", currDriver.DriverID), ref strFill);
                                currDriver.ImageFill = strFill;
                                arrJobs[i].DriverInfo = currDriver;
                            }
                        }
                        else
                        {
                            arrJobs[i].DriverInfo = currDriver;

                        }

                    }
                }
                conn.Close();
            }
            catch (Exception ex)
            {
                Logger.LogEvent("GetAll-view_assets: " + ex.Message, System.Diagnostics.EventLogEntryType.Error);
            }

            if (conn != null)
                conn.Close();

            return arrJobs.ToArray();
        }

        public IEnumerable<JobInfo> GetAllEx()
        {
            MySqlConnection conn = new MySqlConnection();
            MySqlCommand cmd = new MySqlCommand();
            List<JobInfo> arrJobs = new List<JobInfo>();

            return arrJobs.ToArray();
        }

        public IEnumerable<JobReportInfo> GetAllReport()
        {
            MySqlConnection conn = new MySqlConnection();
            MySqlCommand cmd = new MySqlCommand();
            List<JobReportInfo> arrJobs = new List<JobReportInfo>();

            return arrJobs.ToArray();
        }

        public IEnumerable<WardInfo> GetAllJobWard()
        {
            MySqlConnection conn = new MySqlConnection();
            MySqlCommand cmd = new MySqlCommand();
            List<WardInfo> arrJobs = new List<WardInfo>();

            return arrJobs.ToArray();
        }
        public IEnumerable<JobInfo> GetByCompany(JobInfo param)
        {
            List<JobInfo> arrJobs = new List<JobInfo>();
            JobInfo currJob = new JobInfo();
            object objTemp = new object();

            string query = "SELECT * FROM view_jobs WHERE (timestamp between @StartTS and @EndTS)";
  
            if (param.AssetResellerID > 0) query += " and reseller_id = @AssetResellerID";
            if (param.AssetCompanyID > 0) query += " and company_id = @AssetCompanyID";
            if (param.Flag > 0) query += " and flag >= @Flag";
            if (param.Payment > 0) query += " and payment = @Payment";
            if (!string.IsNullOrEmpty(param.JobStatus)) query += " and job_status = @JobStatus";
            if (!string.IsNullOrEmpty(param.Agent)) query += " and agent = @Agent";
            if (!string.IsNullOrEmpty(param.JobDriver)) query += " and driver_name = @JobDriver";
            if (!string.IsNullOrEmpty(param.JobType)) query += " and job_type = @JobType";
            if (param.Trip > 0) query += " and trip >= @Trip";
            if (param.isReturn > 0) query += " and isReturn = @isReturn";

            if (param.AssetID > 0) query += " and asset_id = @AssetID";
            else if (!string.IsNullOrEmpty(param.Asset)) query += " and asset_id = (SELECT asset_id FROM view_assets WHERE name = @AssetName)";
            
            query += " order by timestamp desc";

            using (MySqlConnection conn = new MySqlConnection(mConnStr))
            {
                try
                {
                    using (MySqlCommand cmd = new MySqlCommand(query, conn))
                    {
                        conn.Open();
                        cmd.Prepare();
                        cmd.Parameters.AddWithValue("@StartTS", param.Timestamp);
                        cmd.Parameters.AddWithValue("@EndTS", param.RxTime);
                        cmd.Parameters.AddWithValue("@AssetResellerID", param.AssetResellerID);
                        cmd.Parameters.AddWithValue("@AssetCompanyID", param.AssetCompanyID);
                        cmd.Parameters.AddWithValue("@Payment", param.Payment);
                        cmd.Parameters.AddWithValue("@JobStatus", param.JobStatus);
                        cmd.Parameters.AddWithValue("@Agent", param.Agent);
                        cmd.Parameters.AddWithValue("@Trip", param.Trip);
                        cmd.Parameters.AddWithValue("@JobDriver", param.JobDriver);
                        cmd.Parameters.AddWithValue("@JobType", param.JobType);
                        cmd.Parameters.AddWithValue("@Flag", param.Flag);
                        cmd.Parameters.AddWithValue("@isReturn", param.isReturn);
                        if (param.AssetID > 0) cmd.Parameters.AddWithValue("@AssetID", param.AssetID);
                        else if (!string.IsNullOrEmpty(param.Asset)) cmd.Parameters.AddWithValue("@AssetName", param.Asset);

                        using (MySqlDataReader reader = cmd.ExecuteReader())
                        {
                            if ((reader != null) && (reader.HasRows))
                            {
                                while (reader.Read())
                                {
                                    currJob = DataMgrTools.BuildJob(reader);
                                    arrJobs.Add(currJob);
                                }
                            }
                        }

                        conn.Close();
                    }
                }
                catch (Exception ex)
                {
                    Logger.LogEvent(ex.Message + "-Get(ByCompany)", System.Diagnostics.EventLogEntryType.Error);

                }

                try
                {
                    using (MySqlCommand cmd = new MySqlCommand(query, conn))
                    {
                        conn.Open();
                        for (int i = 0; i < arrJobs.Count; i++)
                        {
                            query = string.Format("SELECT * FROM view_drivers where asset_id = {0}", arrJobs[i].AssetID);

                            cmd.CommandText = query;
                            cmd.Connection = conn;
                            cmd.CommandType = CommandType.Text;
                            using (MySqlDataReader reader = cmd.ExecuteReader())
                            {
                                DriverInfo currDriver = new DriverInfo();
                                if ((reader != null) && (reader.HasRows))
                                {
                                    while (reader.Read())
                                    {
                                        currDriver = DataMgrTools.BuildDriver(reader);
                                        string strFill = "";
                                        currDriver.Image = GetImage(String.Format("drivers/{0}", currDriver.DriverID), ref strFill);
                                        currDriver.ImageFill = strFill;
                                        arrJobs[i].DriverInfo = currDriver;
                                    }
                                }
                                else
                                {
                                    arrJobs[i].DriverInfo = currDriver;

                                }

                            }
                        }
                        conn.Close();
                    }
                }
                catch (Exception ex)
                {
                    Logger.LogEvent("GetByCompany-view_driver: " + ex.Message, System.Diagnostics.EventLogEntryType.Error);
                }
            }

            return arrJobs;
        }
        public IEnumerable<JobInfo> GetByCompanyReturn(JobInfo param)
        {
            List<JobInfo> arrJobs = new List<JobInfo>();
            JobInfo currJob = new JobInfo();
            object objTemp = new object();

            string query = "SELECT * FROM view_jobs WHERE (rx_time between @StartTS and @EndTS)";

            if (param.AssetResellerID > 0) query += " and reseller_id = @AssetResellerID";
            if (param.AssetCompanyID > 0) query += " and company_id = @AssetCompanyID";
            if (param.Flag > 0) query += " and flag >= @Flag";
            if (param.Payment > 0) query += " and payment = @Payment";
            if (!string.IsNullOrEmpty(param.JobStatus)) query += " and job_status = @JobStatus";
            if (!string.IsNullOrEmpty(param.Agent)) query += " and agent = @Agent";
            if (!string.IsNullOrEmpty(param.JobDriver)) query += " and driver_name = @JobDriver";
            if (!string.IsNullOrEmpty(param.JobType)) query += " and job_type = @JobType";
            if (param.Trip > 0) query += " and trip >= @Trip";
            if (param.isReturn > 0) query += " and isReturn = @isReturn";

            if (param.AssetID > 0) query += " and asset_id = @AssetID";
            else if (!string.IsNullOrEmpty(param.Asset)) query += " and asset_id = (SELECT asset_id FROM view_assets WHERE name = @AssetName)";

            query += " order by timestamp desc";

            using (MySqlConnection conn = new MySqlConnection(mConnStr))
            {
                try
                {
                    using (MySqlCommand cmd = new MySqlCommand(query, conn))
                    {
                        conn.Open();
                        cmd.Prepare();
                        cmd.Parameters.AddWithValue("@StartTS", param.Timestamp);
                        cmd.Parameters.AddWithValue("@EndTS", param.RxTime);
                        cmd.Parameters.AddWithValue("@AssetResellerID", param.AssetResellerID);
                        cmd.Parameters.AddWithValue("@AssetCompanyID", param.AssetCompanyID);
                        cmd.Parameters.AddWithValue("@Payment", param.Payment);
                        cmd.Parameters.AddWithValue("@JobStatus", param.JobStatus);
                        cmd.Parameters.AddWithValue("@Agent", param.Agent);
                        cmd.Parameters.AddWithValue("@Trip", param.Trip);
                        cmd.Parameters.AddWithValue("@JobDriver", param.JobDriver);
                        cmd.Parameters.AddWithValue("@JobType", param.JobType);
                        cmd.Parameters.AddWithValue("@Flag", param.Flag);
                        cmd.Parameters.AddWithValue("@isReturn", param.isReturn);
                        if (param.AssetID > 0) cmd.Parameters.AddWithValue("@AssetID", param.AssetID);
                        else if (!string.IsNullOrEmpty(param.Asset)) cmd.Parameters.AddWithValue("@AssetName", param.Asset);

                        using (MySqlDataReader reader = cmd.ExecuteReader())
                        {
                            if ((reader != null) && (reader.HasRows))
                            {
                                while (reader.Read())
                                {
                                    currJob = DataMgrTools.BuildJob(reader);
                                    arrJobs.Add(currJob);
                                }
                            }
                        }

                        conn.Close();
                    }
                }
                catch (Exception ex)
                {
                    Logger.LogEvent(ex.Message + "-Get(ByCompany)", System.Diagnostics.EventLogEntryType.Error);

                }

                try
                {
                    using (MySqlCommand cmd = new MySqlCommand(query, conn))
                    {
                        conn.Open();
                        for (int i = 0; i < arrJobs.Count; i++)
                        {
                            query = string.Format("SELECT * FROM view_drivers where asset_id = {0}", arrJobs[i].AssetID);

                            cmd.CommandText = query;
                            cmd.Connection = conn;
                            cmd.CommandType = CommandType.Text;
                            using (MySqlDataReader reader = cmd.ExecuteReader())
                            {
                                DriverInfo currDriver = new DriverInfo();
                                if ((reader != null) && (reader.HasRows))
                                {
                                    while (reader.Read())
                                    {
                                        currDriver = DataMgrTools.BuildDriver(reader);
                                        string strFill = "";
                                        currDriver.Image = GetImage(String.Format("drivers/{0}", currDriver.DriverID), ref strFill);
                                        currDriver.ImageFill = strFill;
                                        arrJobs[i].DriverInfo = currDriver;
                                    }
                                }
                                else
                                {
                                    arrJobs[i].DriverInfo = currDriver;

                                }

                            }
                        }
                        conn.Close();
                    }
                }
                catch (Exception ex)
                {
                    Logger.LogEvent("GetByCompanyReturn-view_driver: " + ex.Message, System.Diagnostics.EventLogEntryType.Error);
                }
            }

            return arrJobs;
        }
        public IEnumerable<JobReportInfo> GetByCompanyReport(JobReportInfo param)
        {

            List<JobReportInfo> arrJobs = new List<JobReportInfo>();
            JobReportInfo currJob = new JobReportInfo();


            string query = "SELECT * FROM view_jobs WHERE (timestamp between @StartTS and @EndTS)";

            if (param.AssetResellerID > 0) query += " and reseller_id = @AssetResellerID";
            if (param.AssetCompanyID > 0) query += " and company_id = @AssetCompanyID";
            if (param.Flag > 0) query += " and flag >= @Flag";
            if (param.Payment > 0) query += " and payment = @Payment";
            if (!string.IsNullOrEmpty(param.JobStatus)) query += " and job_status = @JobStatus";
            if (!string.IsNullOrEmpty(param.Agent)) query += " and agent = @Agent";
            if (!string.IsNullOrEmpty(param.JobDriver)) query += " and driver_name = @JobDriver";
            if (!string.IsNullOrEmpty(param.JobType)) query += " and job_type = @JobType";
            if (!string.IsNullOrEmpty(param.Destination)) query += " and destination = @Destination";
            if (param.Trip > 0) query += " and trip >= @Trip";
            if (param.isReturn > 0) query += " and isReturn = @isReturn";

            if (param.AssetID > 0) query += " and asset_id = @AssetID";
            else if (!string.IsNullOrEmpty(param.Asset)) query += " and asset_id = (SELECT asset_id FROM view_assets WHERE name = @AssetName)";

            query += " group by job_number";
            query += " order by timestamp desc";

            using (MySqlConnection conn = new MySqlConnection(mConnStr))
            {
                try
                {
                    using (MySqlCommand cmd = new MySqlCommand(query, conn))
                    {
                        conn.Open();
                        cmd.Prepare();
                        cmd.Parameters.AddWithValue("@StartTS", param.Timestamp);
                        cmd.Parameters.AddWithValue("@EndTS", param.RxTime);
                        cmd.Parameters.AddWithValue("@AssetResellerID", param.AssetResellerID);
                        cmd.Parameters.AddWithValue("@AssetCompanyID", param.AssetCompanyID);
                        if (param.Trip > 0) cmd.Parameters.AddWithValue("@Trip", param.Trip);
                        if (!string.IsNullOrEmpty(param.JobType)) cmd.Parameters.AddWithValue("@JobType", param.JobType);
                        if (param.Flag > 0) cmd.Parameters.AddWithValue("@Flag", param.Flag);
                        if (param.isReturn > 0) cmd.Parameters.AddWithValue("@isReturn", param.isReturn);
                        if (!string.IsNullOrEmpty(param.Destination)) cmd.Parameters.AddWithValue("@Destination", param.Destination);
                        if (param.AssetID > 0) cmd.Parameters.AddWithValue("@AssetID", param.AssetID);
                        else if (!string.IsNullOrEmpty(param.Asset)) cmd.Parameters.AddWithValue("@AssetName", param.Asset);

                        MySqlDataReader reader = cmd.ExecuteReader();

                        while (reader.Read())
                        {
                            currJob = DataMgrTools.BuildJobReport(reader);
                            arrJobs.Add(currJob);
                        }
                        conn.Close();
                    }
                }
                catch (Exception ex)
                {
                    Logger.LogEvent(mProjName, "GetByCompanyReport: " + ex.Message, System.Diagnostics.EventLogEntryType.Error);
                }
            }

            return arrJobs;
        }
        public IEnumerable<WardInfo> GetByJobWard(JobReportInfo param)
        {

            List<WardInfo> arrWard = new List<WardInfo>();
            WardInfo currWard = new WardInfo();

            string query2 = "SELECT destination, count(destination) as countDestination FROM view_jobs WHERE (timestamp between @StartTS and @EndTS)";

            if (param.AssetResellerID > 0) query2 += " and reseller_id = @AssetResellerID";
            if (param.AssetCompanyID > 0) query2 += " and company_id = @AssetCompanyID";
            if (param.Flag > 0) query2 += " and flag >= @Flag";
            if (param.Payment > 0) query2 += " and payment = @Payment";
            if (!string.IsNullOrEmpty(param.JobStatus)) query2 += " and job_status = @JobStatus";
            if (!string.IsNullOrEmpty(param.Agent)) query2 += " and agent = @Agent";
            if (!string.IsNullOrEmpty(param.JobDriver)) query2 += " and driver_name = @JobDriver";
            if (!string.IsNullOrEmpty(param.JobType)) query2 += " and job_type = @JobType";
            if (!string.IsNullOrEmpty(param.Destination)) query2 += " and destination = @Destination";
            if (param.Trip > 0) query2 += " and trip >= @Trip";
            if (param.isReturn > 0) query2 += " and isReturn = @isReturn";

            if (param.AssetID > 0) query2 += " and asset_id = @AssetID";
            else if (!string.IsNullOrEmpty(param.Asset)) query2 += " and asset_id = (SELECT asset_id FROM view_assets WHERE name = @AssetName)";

            query2 += " group by destination";
            query2 += " order by countDestination desc";

            using (MySqlConnection conn = new MySqlConnection(mConnStr))
            {
                try
                {
                    using (MySqlCommand cmd = new MySqlCommand(query2, conn))
                    {
                        conn.Open();
                        cmd.Prepare();
                        cmd.Parameters.AddWithValue("@StartTS", param.Timestamp);
                        cmd.Parameters.AddWithValue("@EndTS", param.RxTime);
                        cmd.Parameters.AddWithValue("@AssetResellerID", param.AssetResellerID);
                        cmd.Parameters.AddWithValue("@AssetCompanyID", param.AssetCompanyID);
                        if (param.Trip > 0) cmd.Parameters.AddWithValue("@Trip", param.Trip);
                        if (!string.IsNullOrEmpty(param.JobType)) cmd.Parameters.AddWithValue("@JobType", param.JobType);
                        if (param.Flag > 0) cmd.Parameters.AddWithValue("@Flag", param.Flag);
                        if (param.isReturn > 0) cmd.Parameters.AddWithValue("@isReturn", param.isReturn);
                        if (!string.IsNullOrEmpty(param.Destination)) cmd.Parameters.AddWithValue("@Destination", param.Destination);
                        if (param.AssetID > 0) cmd.Parameters.AddWithValue("@AssetID", param.AssetID);
                        else if (!string.IsNullOrEmpty(param.Asset)) cmd.Parameters.AddWithValue("@AssetName", param.Asset);

                        MySqlDataReader reader = cmd.ExecuteReader();

                        while (reader.Read())
                        {
                            currWard = DataMgrTools.BuildWard(reader);
                            arrWard.Add(currWard);
                        }
                        conn.Close();
                    }
                }
                catch (Exception ex)
                {
                    Logger.LogEvent(mProjName, "GetByJobWard: " + ex.Message, System.Diagnostics.EventLogEntryType.Error);
                }
            }

            return arrWard;
        }
        public IEnumerable<JobInfo> GetByScheduleReport(JobInfo param)
        {
            List<JobInfo> arrJobs = new List<JobInfo>();
            JobInfo currJob = new JobInfo();
            object objTemp = new object();

            string query = "SELECT * FROM view_jobs WHERE (timestamp between @StartTS and @EndTS)";

            if (param.AssetResellerID > 0) query += " and reseller_id = @AssetResellerID";
            if (param.AssetCompanyID > 0) query += " and company_id = @AssetCompanyID";

            if (!string.IsNullOrEmpty(param.JobType)) query += " and job_type = @JobType";
            if (param.Trip > 0) query += " and trip >= @Trip";
            if (param.isReturn > 0) query += " and isReturn = @isReturn";
            if (param.Flag > 0) query += " and flag >= @Flag";

            query += " order by timestamp desc";

            using (MySqlConnection conn = new MySqlConnection(mConnStr))
            {
                try
                {
                    using (MySqlCommand cmd = new MySqlCommand(query, conn))
                    {
                        conn.Open();
                        cmd.Prepare();
                        cmd.Parameters.AddWithValue("@StartTS", param.Timestamp);
                        cmd.Parameters.AddWithValue("@EndTS", param.RxTime);
                        cmd.Parameters.AddWithValue("@AssetResellerID", param.AssetResellerID);
                        cmd.Parameters.AddWithValue("@AssetCompanyID", param.AssetCompanyID);
                        cmd.Parameters.AddWithValue("@Trip", param.Trip);
                        cmd.Parameters.AddWithValue("@JobType", param.JobType);
                        cmd.Parameters.AddWithValue("@Flag", param.Flag);
                        cmd.Parameters.AddWithValue("@isReturn", param.isReturn);

                        using (MySqlDataReader reader = cmd.ExecuteReader())
                        {
                            if ((reader != null) && (reader.HasRows))
                            {
                                while (reader.Read())
                                {
                                    currJob = DataMgrTools.BuildJob(reader);
                                    arrJobs.Add(currJob);
                                }
                            }
                        }

                        conn.Close();
                    }
                }
                catch (Exception ex)
                {
                    Logger.LogEvent(ex.Message + "-Get(ByCompany)", System.Diagnostics.EventLogEntryType.Error);

                }

                try
                {
                    using (MySqlCommand cmd = new MySqlCommand(query, conn))
                    {
                        conn.Open();
                        for (int i = 0; i < arrJobs.Count; i++)
                        {
                            query = string.Format("SELECT * FROM view_drivers where asset_id = {0}", arrJobs[i].AssetID);

                            cmd.CommandText = query;
                            cmd.Connection = conn;
                            cmd.CommandType = CommandType.Text;
                            using (MySqlDataReader reader = cmd.ExecuteReader())
                            {
                                DriverInfo currDriver = new DriverInfo();
                                if ((reader != null) && (reader.HasRows))
                                {
                                    while (reader.Read())
                                    {
                                        currDriver = DataMgrTools.BuildDriver(reader);
                                        string strFill = "";
                                        currDriver.Image = GetImage(String.Format("drivers/{0}", currDriver.DriverID), ref strFill);
                                        currDriver.ImageFill = strFill;
                                        arrJobs[i].DriverInfo = currDriver;
                                    }
                                }
                                else
                                {
                                    arrJobs[i].DriverInfo = currDriver;

                                }

                            }
                        }
                        conn.Close();
                    }
                }
                catch (Exception ex)
                {
                    Logger.LogEvent("GetByCompany-view_driver: " + ex.Message, System.Diagnostics.EventLogEntryType.Error);
                }
            }

            return arrJobs;
        }
        public IEnumerable<JobInfo> GetByCompanyEx(JobInfo param)
        {
            List<JobInfo> arrJobs = new List<JobInfo>();
            JobInfo currJob = new JobInfo();
            object objTemp = new object();

            string query = "SELECT * FROM view_jobs WHERE timestamp <= @StartTS";

            if (param.AssetResellerID > 0) query += " and reseller_id = @AssetResellerID";
            if (param.AssetCompanyID > 0) query += " and company_id = @AssetCompanyID";
            if (param.Flag > 0) query += " and flag >= @Flag";

            if (param.AssetID > 0) query += " and asset_id = @AssetID";
            else if (!string.IsNullOrEmpty(param.Asset)) query += " and asset_id = (SELECT asset_id FROM view_assets WHERE name = @AssetName)";

            using (MySqlConnection conn = new MySqlConnection(mConnStr))
            {
                try
                {
                    using (MySqlCommand cmd = new MySqlCommand(query, conn))
                    {
                        conn.Open();
                        cmd.Prepare();
                        cmd.Parameters.AddWithValue("@StartTS", param.Timestamp);
                        cmd.Parameters.AddWithValue("@AssetResellerID", param.AssetResellerID);
                        cmd.Parameters.AddWithValue("@AssetCompanyID", param.AssetCompanyID);
                        cmd.Parameters.AddWithValue("@Flag", param.Flag);
                        if (param.AssetID > 0) cmd.Parameters.AddWithValue("@AssetID", param.AssetID);
                        else if (!string.IsNullOrEmpty(param.Asset)) cmd.Parameters.AddWithValue("@AssetName", param.Asset);

                        using (MySqlDataReader reader = cmd.ExecuteReader())
                        {
                            if ((reader != null) && (reader.HasRows))
                            {
                                while (reader.Read())
                                {
                                    currJob = DataMgrTools.BuildJob(reader);
                                    arrJobs.Add(currJob);
                                }
                            }
                        }

                        conn.Close();
                    }
                }
                catch (Exception ex)
                {
                    Logger.LogEvent(ex.Message + "-Get(ByCompany)", System.Diagnostics.EventLogEntryType.Error);

                }

                try
                {
                    using (MySqlCommand cmd = new MySqlCommand(query, conn))
                    {
                        conn.Open();
                        for (int i = 0; i < arrJobs.Count; i++)
                        {
                            query = string.Format("SELECT * FROM view_drivers where asset_id = {0}", arrJobs[i].AssetID);

                            cmd.CommandText = query;
                            cmd.Connection = conn;
                            cmd.CommandType = CommandType.Text;
                            using (MySqlDataReader reader = cmd.ExecuteReader())
                            {
                                DriverInfo currDriver = new DriverInfo();
                                if ((reader != null) && (reader.HasRows))
                                {
                                    while (reader.Read())
                                    {
                                        currDriver = DataMgrTools.BuildDriver(reader);
                                        string strFill = "";
                                        currDriver.Image = GetImage(String.Format("drivers/{0}", currDriver.DriverID), ref strFill);
                                        currDriver.ImageFill = strFill;
                                        arrJobs[i].DriverInfo = currDriver;
                                    }
                                }
                                else
                                {
                                    arrJobs[i].DriverInfo = currDriver;

                                }

                            }
                        }
                        conn.Close();
                    }
                }
                catch (Exception ex)
                {
                    Logger.LogEvent("GetByCompany-view_driver: " + ex.Message, System.Diagnostics.EventLogEntryType.Error);
                }
            }

            return arrJobs;
        }

        public IEnumerable<JobInfo> GetByCompanyFilter(JobInfo param)
        {
            List<JobInfo> arrJobs = new List<JobInfo>();
            JobInfo currJob = new JobInfo();
            object objTemp = new object();

            string query = "SELECT * FROM view_jobs WHERE (timestamp between @StartTS and @EndTS)";

            if (param.AssetResellerID > 0) query += " and reseller_id = @AssetResellerID";
            if (param.AssetCompanyID > 0) query += " and company_id = @AssetCompanyID";
            if (param.Flag > 0) query += " and flag >= @Flag";
            if (param.Payment > 0) query += " and payment = @Payment";
            if (!string.IsNullOrEmpty(param.JobStatus)) query += " and job_status = @JobStatus";
            if (!string.IsNullOrEmpty(param.Agent)) query += " and agent = @Agent";
            if (!string.IsNullOrEmpty(param.JobDriver)) query += " and driver_name = @JobDriver";
            if (!string.IsNullOrEmpty(param.JobType)) query += " and job_type = @JobType";
            if (param.Trip > 0) query += " and trip = @Trip";

            if (param.AssetID > 0) query += " and asset_id = @AssetID";
            else if (!string.IsNullOrEmpty(param.Asset)) query += " and asset_id = (SELECT asset_id FROM view_assets WHERE name = @AssetName)";

            query += " and flag != 0 order by timestamp desc";

            using (MySqlConnection conn = new MySqlConnection(mConnStr))
            {
                try
                {
                    using (MySqlCommand cmd = new MySqlCommand(query, conn))
                    {
                        conn.Open();
                        cmd.Prepare();
                        cmd.Parameters.AddWithValue("@StartTS", param.Timestamp);
                        cmd.Parameters.AddWithValue("@EndTS", param.RxTime);
                        cmd.Parameters.AddWithValue("@AssetResellerID", param.AssetResellerID);
                        cmd.Parameters.AddWithValue("@AssetCompanyID", param.AssetCompanyID);
                        cmd.Parameters.AddWithValue("@Payment", param.Payment);
                        cmd.Parameters.AddWithValue("@JobStatus", param.JobStatus);
                        cmd.Parameters.AddWithValue("@Agent", param.Agent);
                        cmd.Parameters.AddWithValue("@Trip", param.Trip);
                        cmd.Parameters.AddWithValue("@JobDriver", param.JobDriver);
                        cmd.Parameters.AddWithValue("@JobType", param.JobType);
                        cmd.Parameters.AddWithValue("@Flag", param.Flag);
                        if (param.AssetID > 0) cmd.Parameters.AddWithValue("@AssetID", param.AssetID);
                        else if (!string.IsNullOrEmpty(param.Asset)) cmd.Parameters.AddWithValue("@AssetName", param.Asset);

                        using (MySqlDataReader reader = cmd.ExecuteReader())
                        {
                            if ((reader != null) && (reader.HasRows))
                            {
                                while (reader.Read())
                                {
                                    currJob = DataMgrTools.BuildJob(reader);
                                    arrJobs.Add(currJob);
                                }
                            }
                        }

                        conn.Close();
                    }
                }
                catch (Exception ex)
                {
                    Logger.LogEvent(ex.Message + "-Get(ByCompany)", System.Diagnostics.EventLogEntryType.Error);

                }

                try
                {
                    using (MySqlCommand cmd = new MySqlCommand(query, conn))
                    {
                        conn.Open();
                        for (int i = 0; i < arrJobs.Count; i++)
                        {
                            query = string.Format("SELECT * FROM view_drivers where asset_id = {0}", arrJobs[i].AssetID);

                            cmd.CommandText = query;
                            cmd.Connection = conn;
                            cmd.CommandType = CommandType.Text;
                            using (MySqlDataReader reader = cmd.ExecuteReader())
                            {
                                DriverInfo currDriver = new DriverInfo();
                                if ((reader != null) && (reader.HasRows))
                                {
                                    while (reader.Read())
                                    {
                                        currDriver = DataMgrTools.BuildDriver(reader);
                                        string strFill = "";
                                        currDriver.Image = GetImage(String.Format("drivers/{0}", currDriver.DriverID), ref strFill);
                                        currDriver.ImageFill = strFill;
                                        arrJobs[i].DriverInfo = currDriver;
                                    }
                                }
                                else
                                {
                                    arrJobs[i].DriverInfo = currDriver;

                                }

                            }
                        }
                        conn.Close();
                    }
                }
                catch (Exception ex)
                {
                    Logger.LogEvent("GetByCompany-view_driver: " + ex.Message, System.Diagnostics.EventLogEntryType.Error);
                }
            }

            return arrJobs;
        }

        public IEnumerable<JobInfo> GetJobList(JobInfo param)
        {
            List<JobInfo> arrJobs = new List<JobInfo>();
            JobInfo currJob = new JobInfo();
            object objTemp = new object();

            string query = "SELECT * FROM view_jobs WHERE (timestamp between @StartTS and @EndTS)";

            if (param.AssetResellerID > 0) query += " and reseller_id = @AssetResellerID";
            if (param.AssetCompanyID > 0) query += " and company_id = @AssetCompanyID";
            if (!string.IsNullOrEmpty(param.JobDriver)) query += " and driver_name = @JobDriver";

            query += " and flag >= 1";

            using (MySqlConnection conn = new MySqlConnection(mConnStr))
            {
                try
                {
                    using (MySqlCommand cmd = new MySqlCommand(query, conn))
                    {
                        conn.Open();
                        cmd.Prepare();
                        cmd.Parameters.AddWithValue("@StartTS", param.Timestamp);
                        cmd.Parameters.AddWithValue("@EndTS", param.RxTime);
                        cmd.Parameters.AddWithValue("@AssetResellerID", param.AssetResellerID);
                        cmd.Parameters.AddWithValue("@AssetCompanyID", param.AssetCompanyID);
                        cmd.Parameters.AddWithValue("@JobDriver", param.JobDriver);

                        using (MySqlDataReader reader = cmd.ExecuteReader())
                        {
                            if ((reader != null) && (reader.HasRows))
                            {
                                while (reader.Read())
                                {
                                    currJob = DataMgrTools.BuildJob(reader);
                                    arrJobs.Add(currJob);
                                }
                            }
                        }

                        conn.Close();
                    }
                }
                catch (Exception ex)
                {
                    Logger.LogEvent(ex.Message + "-Get(ByCompany)", System.Diagnostics.EventLogEntryType.Error);

                }

                try
                {
                    using (MySqlCommand cmd = new MySqlCommand(query, conn))
                    {
                        conn.Open();
                        for (int i = 0; i < arrJobs.Count; i++)
                        {
                            query = string.Format("SELECT * FROM view_drivers where asset_id = {0}", arrJobs[i].AssetID);

                            cmd.CommandText = query;
                            cmd.Connection = conn;
                            cmd.CommandType = CommandType.Text;
                            using (MySqlDataReader reader = cmd.ExecuteReader())
                            {
                                DriverInfo currDriver = new DriverInfo();
                                if ((reader != null) && (reader.HasRows))
                                {
                                    while (reader.Read())
                                    {
                                        currDriver = DataMgrTools.BuildDriver(reader);
                                        string strFill = "";
                                        currDriver.Image = GetImage(String.Format("drivers/{0}", currDriver.DriverID), ref strFill);
                                        currDriver.ImageFill = strFill;
                                        arrJobs[i].DriverInfo = currDriver;
                                    }
                                }
                                else
                                {
                                    arrJobs[i].DriverInfo = currDriver;

                                }

                            }
                        }
                        conn.Close();
                    }
                }
                catch (Exception ex)
                {
                    Logger.LogEvent("GetByCompany-view_driver: " + ex.Message, System.Diagnostics.EventLogEntryType.Error);
                }
            }

            return arrJobs;
        }

        public JobInfo LogoutAsset(JobInfo item)
        {
            try
            {
                //2016-12-01
                string strStart = (item.Timestamp != DateTime.MinValue ? String.Format("'{0:yyyy-MM-dd}'", item.Timestamp) : "NULL");
                string strEnd = (item.RxTime != DateTime.MinValue ? String.Format("'{0:yyyy-MM-dd}'", item.RxTime) : "NULL");
                string strJobType = "Scheduled";
                string strJobStatus = "Completed";

                using (MySqlConnection conn = new MySqlConnection(mConnStr))
                {
                    using (MySqlCommand cmd = new MySqlCommand())
                    {
                        conn.Open();
                        cmd.Connection = conn;
                        cmd.CommandText = "UPDATE jobs SET asset_id = @AssetID WHERE timestamp between @StartTS and @EndTS and company_id = @AssetCompanyID and driver_name = @JobDriver and job_type = @JobType and job_status != @JobStatus";
                        cmd.Prepare();
                        cmd.Parameters.AddWithValue("@AssetID", 0);
                        cmd.Parameters.AddWithValue("@AssetCompanyID", item.AssetCompanyID);
                        cmd.Parameters.AddWithValue("@JobDriver", item.JobDriver);
                        cmd.Parameters.AddWithValue("@StartTS", item.Timestamp);
                        cmd.Parameters.AddWithValue("@EndTS", item.RxTime);
                        cmd.Parameters.AddWithValue("@JobType", strJobType);
                        cmd.Parameters.AddWithValue("@JobStatus", strJobStatus);
                        cmd.ExecuteNonQuery();
                        conn.Close();
                    }
                }
            }
            catch (Exception ex)
            {
                Logger.LogEvent(ex.Message + "-LogoutAsset", System.Diagnostics.EventLogEntryType.Warning);
            }

            return item;
        }

        public JobInfo Get(int jobID)
        {
            JobInfo currJob = new JobInfo();
            string query = string.Format("SELECT * FROM view_jobs WHERE job_id = {0}", jobID);

            using (MySqlConnection conn = new MySqlConnection(mConnStr))
            {
                try
                {
                    using (MySqlCommand cmd = new MySqlCommand(query, conn))
                    {
                        conn.Open();
                        MySqlDataReader reader = cmd.ExecuteReader();

                        while (reader.Read())
                        {
                            currJob = DataMgrTools.BuildJob(reader);
                        }
                        conn.Close();
                    }
                }
                catch (Exception ex)
                {
                    Logger.LogEvent(mProjName, "Get: " + ex.Message, System.Diagnostics.EventLogEntryType.Error);
                    conn.Close();
                }
            }
            return currJob;
        }

        public JobInfo Add(JobInfo currJob)
        {
            try
            {
                using (MySqlConnection conn = new MySqlConnection(mConnStr))
                {
                    using (MySqlCommand cmd = new MySqlCommand())
                    {
                        conn.Open();
                        cmd.Connection = conn;
                        cmd.CommandText = "INSERT INTO jobs (job_number, company, toc, timestamp, rx_time, company_id, reseller_id, asset_id, amount, bed, caller, destination, origin, phone, unit, accessories, remarks, remarks2, flag, patient, payment, trip, receipt_number, new_amount, agent, job_status, paramedic, driver_name, job_type, isReturn) " +
                            "VALUES (@JobNumber, @Company, @TOC, @Timestamp, @RxTime, @AssetCompanyID, @AssetResellerID, @AssetID, @Amount, @Bed, @Caller, @Destination, @Origin, @Phone, @Unit, @Accessories, @Remarks, @Remarks2, @Flag, @Patient, @Payment, @Trip, @Receipt, @NewAmount, @Agent, @JobStatus, @Paramedic, @JobDriver, @JobType, @isReturn)";
                        cmd.Prepare();
                        cmd.Parameters.AddWithValue("@JobNumber", currJob.JobNumber);
                        cmd.Parameters.AddWithValue("@Company", currJob.Company);
                        cmd.Parameters.AddWithValue("@TOC", currJob.TOC);
                        cmd.Parameters.AddWithValue("@Timestamp", currJob.Timestamp);
                        cmd.Parameters.AddWithValue("@RxTime", currJob.RxTime);
                        cmd.Parameters.AddWithValue("@AssetCompanyID", currJob.AssetCompanyID);
                        cmd.Parameters.AddWithValue("@AssetResellerID", currJob.AssetResellerID);
                        cmd.Parameters.AddWithValue("@AssetID", currJob.AssetID);
                        cmd.Parameters.AddWithValue("@Amount", currJob.Amount);
                        cmd.Parameters.AddWithValue("@Bed", currJob.Bed);
                        cmd.Parameters.AddWithValue("@Caller", currJob.Caller);
                        cmd.Parameters.AddWithValue("@Destination", currJob.Destination);
                        cmd.Parameters.AddWithValue("@Origin", currJob.Origin);
                        cmd.Parameters.AddWithValue("@Phone", currJob.Phone);
                        cmd.Parameters.AddWithValue("@Unit", currJob.Unit);
                        cmd.Parameters.AddWithValue("@Accessories", currJob.Accessories);
                        cmd.Parameters.AddWithValue("@Remarks", currJob.Remarks);
                        cmd.Parameters.AddWithValue("@Remarks2", currJob.Remarks2);
                        cmd.Parameters.AddWithValue("@Patient", currJob.Patient);
                        cmd.Parameters.AddWithValue("@Payment", currJob.Payment);
                        cmd.Parameters.AddWithValue("@Trip", currJob.Trip);
                        cmd.Parameters.AddWithValue("@Flag", currJob.Flag);
                        cmd.Parameters.AddWithValue("@Receipt", "");
                        cmd.Parameters.AddWithValue("@NewAmount", 0);
                        cmd.Parameters.AddWithValue("@JobStatus", currJob.JobStatus);
                        cmd.Parameters.AddWithValue("@Paramedic", "");
                        cmd.Parameters.AddWithValue("@Agent", currJob.Agent);
                        cmd.Parameters.AddWithValue("@JobDriver", currJob.JobDriver);
                        cmd.Parameters.AddWithValue("@JobType", currJob.JobType);
                        cmd.Parameters.AddWithValue("@isReturn", currJob.isReturn);
                        cmd.ExecuteNonQuery();
                        conn.Close();
                    }
                }
            }
            catch (Exception ex)
            {
                Logger.LogEvent(ex.Message + "-Add(JobRepository)", System.Diagnostics.EventLogEntryType.Error);
            }

            return currJob;
        }

        public bool Remove(int jobID)
        {
            bool retVal = false;
            string query = string.Format("DELETE FROM jobs WHERE job_id = {0}", jobID);

            try
            {
                using (MySqlConnection conn = new MySqlConnection(mConnStr))
                {
                    using (MySqlCommand cmd = new MySqlCommand(query, conn))
                    {
                        conn.Open();
                        if (cmd.ExecuteNonQuery() == 1)
                            retVal = true;
                        else
                            retVal = false;
                    }
                    conn.Close();
                }
            }
            catch (Exception ex)
            {
                Logger.LogEvent(ex.Message + "-Remove(JobRepository)", System.Diagnostics.EventLogEntryType.Error);
            }

            return retVal;
        }

        public bool Update(JobInfo currJob)
        {
            bool retVal = false;
            try
            {
                using (MySqlConnection conn = new MySqlConnection(mConnStr))
                {
                    using (MySqlCommand cmd = new MySqlCommand())
                    {
                        conn.Open();
                        cmd.Connection = conn;
                        cmd.CommandText = "UPDATE jobs SET job_number = @JobNumber, company = @Company, toc = @TOC, timestamp = @Timestamp, rx_time = @RxTime, company_id = @AssetCompanyID, reseller_id = @AssetResellerID, asset_id = @AssetID, " +
                            "amount = @Amount, bed = @Bed, caller = @Caller, destination = @Destination, origin = @Origin, phone = @Phone, unit = @Unit, accessories = @Accessories, remarks = @Remarks, remarks2 = @Remarks2, flag = @Flag, patient = @Patient, " +
                            "payment = @Payment, trip = @Trip, receipt_number = @Receipt, new_amount = @NewAmount, agent = @Agent, job_status = @JobStatus, paramedic = @Paramedic, driver_name = @JobDriver, job_type = @JobType WHERE job_id = @JobID";
                        cmd.Prepare();
                        cmd.Parameters.AddWithValue("@JobNumber", currJob.JobNumber);
                        cmd.Parameters.AddWithValue("@Company", currJob.Company);
                        cmd.Parameters.AddWithValue("@TOC", currJob.TOC);
                        cmd.Parameters.AddWithValue("@Timestamp", currJob.Timestamp);
                        cmd.Parameters.AddWithValue("@RxTime", currJob.RxTime);
                        cmd.Parameters.AddWithValue("@AssetCompanyID", currJob.AssetCompanyID);
                        cmd.Parameters.AddWithValue("@AssetResellerID", currJob.AssetResellerID);
                        cmd.Parameters.AddWithValue("@AssetID", currJob.AssetID);
                        cmd.Parameters.AddWithValue("@Amount", currJob.Amount);
                        cmd.Parameters.AddWithValue("@Bed", currJob.Bed);
                        cmd.Parameters.AddWithValue("@Caller", currJob.Caller);
                        cmd.Parameters.AddWithValue("@Destination", currJob.Destination);
                        cmd.Parameters.AddWithValue("@Origin", currJob.Origin);
                        cmd.Parameters.AddWithValue("@Phone", currJob.Phone);
                        cmd.Parameters.AddWithValue("@Unit", currJob.Unit);
                        cmd.Parameters.AddWithValue("@Accessories", currJob.Accessories);
                        cmd.Parameters.AddWithValue("@Remarks", currJob.Remarks);
                        cmd.Parameters.AddWithValue("@Remarks2", currJob.Remarks2);
                        cmd.Parameters.AddWithValue("@Flag", currJob.Flag);
                        cmd.Parameters.AddWithValue("@Patient", currJob.Patient);
                        cmd.Parameters.AddWithValue("@Payment", currJob.Payment);
                        cmd.Parameters.AddWithValue("@Trip", currJob.Trip);
                        cmd.Parameters.AddWithValue("@Receipt", currJob.Receipt);
                        cmd.Parameters.AddWithValue("@NewAmount", currJob.NewAmount);
                        cmd.Parameters.AddWithValue("@Agent", currJob.Agent);
                        cmd.Parameters.AddWithValue("@JobStatus", currJob.JobStatus);
                        cmd.Parameters.AddWithValue("@Paramedic", currJob.Paramedic);
                        cmd.Parameters.AddWithValue("@JobDriver", currJob.JobDriver);
                        cmd.Parameters.AddWithValue("@JobType", currJob.JobType);
                        cmd.Parameters.AddWithValue("@JobID", currJob.JobID);

                        if (cmd.ExecuteNonQuery() == 1)
                            retVal = true;
                        else
                            retVal = false;
                        conn.Close();
                    }
                }
            }
            catch (Exception ex)
            {
                Logger.LogEvent(ex.Message + "-Update(JobRepository)", System.Diagnostics.EventLogEntryType.Error);
            }

            return retVal;
        }

        /// <summary>
        /// gets image file
        /// </summary>
        /// <param name="strName"></param>
        /// <param name="strDefault"></param>
        /// <param name="strFill"></param>
        /// <returns></returns>
        public string GetImage(string strName, ref string strFill)
        {
            try
            {
                // loop through image file types
                List<string> arrTypes = new List<string>() { "jpg", "png", "gif", "bmp" };
                foreach (string strType in arrTypes)
                {
                    string strTemp = String.Format("{0}.{1}", strName, strType);
                    string strFile = String.Format("{0}images\\{1}", HostingEnvironment.ApplicationPhysicalPath, strTemp);
                    //string strUri = String.Format("{0}/images/{1}", ConfigurationManager.AppSettings["ServerPath"], strTemp);
                    string strUri = String.Format("{0}/images/{1}", "http://119.75.6.116/adswebapi", strTemp);

                    // check file path
                    if (File.Exists(strFile))
                    {
                        // return image path
                        strFill = "Uniform";
                        return String.Format("{0}?dt={1:ddMMMyyHHmmss}", strUri, File.GetLastWriteTimeUtc(strFile));
                    }
                }
            }
            catch (Exception ex)
            {
                // log error
                Logger.LogEvent("Get Image: ", ex.Message, System.Diagnostics.EventLogEntryType.Error);
            }

            // image file not found
            strFill = "None";
            return strName;
        }

        public object GetAssetByJobEx(object item)
        {
            JobInfo newInfo = item as JobInfo;
            try
            {
                using (MySqlConnection conn = new MySqlConnection(Settings.Default.DB))
                {
                    using (MySqlCommand cmd = new MySqlCommand())
                    {
                        conn.Open();
                        cmd.Connection = conn;
                        cmd.CommandText = "SELECT * FROM view_jobs WHERE job_id = @JobID";
                        cmd.Prepare();
                        cmd.Parameters.AddWithValue("@JobID", newInfo.JobID);
                        MySqlDataReader reader = cmd.ExecuteReader();


                        if ((reader != null) && (reader.HasRows))
                        {
                            while (reader.Read())
                            {
                                newInfo = DataMgrTools.BuildJob(reader);
                            }
                        }
                        else
                        {
                            newInfo.ErrorMessage = Consts.ERR_JOBERROR;
                        }

                        conn.Close();
                    }
                }
            }
            catch (Exception ex)
            {
                Logger.LogEvent("GetAssetByJobEx: " + ex.Message, System.Diagnostics.EventLogEntryType.Error);
            }

            return newInfo;
        }

        //To DEBUG To update job asset id
        public JobInfo GetAssetByJobDriver(JobInfo item)
        {
            JobInfo currJob = new JobInfo();
            try
            {
                using (MySqlConnection conn = new MySqlConnection(mConnStr))
                {

                    #region GET THE LINKED JOBS
                    try
                    {                       
                        currJob = GetByJobDriver(item.JobDriver, item.AssetCompanyID);                     
                    }
                    catch (Exception ex)
                    {
                        Logger.LogEvent("GET THE LINKED JOBS: " + ex.Message, System.Diagnostics.EventLogEntryType.Error);
                    }
                    #endregion

                    if (currJob.JobType == "Scheduled" && currJob.JobStatus == "Scheduled In Progress" && item.JobDriver == currJob.JobDriver)
                    {
                        using (MySqlCommand cmd = new MySqlCommand())
                        {
                            conn.Open();
                            cmd.Connection = conn;
                            cmd.CommandText = "UPDATE jobs SET company_id = @AssetCompanyID, asset_id = @AssetID WHERE job_id = @JobID";
                            cmd.Prepare();
                            cmd.Parameters.AddWithValue("@AssetCompanyID", item.AssetCompanyID);
                            cmd.Parameters.AddWithValue("@AssetID", item.AssetID);
                            cmd.Parameters.AddWithValue("@JobID", currJob.JobID);
                            Logger.LogEvent("GetAssetByJobDriver - Check Job ID: " + currJob.JobID, System.Diagnostics.EventLogEntryType.Warning);
                            cmd.ExecuteNonQuery();
                            conn.Close();
                        }
                    }

                }
            }
            catch (Exception ex)
            {
                Logger.LogEvent(ex.Message + "-GetAssetByJobDriver", System.Diagnostics.EventLogEntryType.Error);
            }

            return item;
        }

        public JobInfo GetByJobDriver(string jobDriver, int companyID)
        {
            JobInfo currJob = new JobInfo();
            string query = string.Format("SELECT * FROM view_jobs WHERE driver_name = @JobDriver");
            if (currJob.AssetCompanyID > 0) query += " and company_id = @AssetCompanyID";
            query += " and flag >= 1 order by timestamp desc";

            using (MySqlConnection conn = new MySqlConnection(mConnStr))
            {
                try
                {
                    using (MySqlCommand cmd = new MySqlCommand())
                    {
                        conn.Open();
                        cmd.Connection = conn;
                        cmd.CommandText = query;
                        cmd.Prepare();
                        cmd.Parameters.AddWithValue("@JobDriver", jobDriver);
                        cmd.Parameters.AddWithValue("@AssetCompanyID", companyID);
                        MySqlDataReader reader = cmd.ExecuteReader();

                        while (reader.Read())
                        {
                            currJob = DataMgrTools.BuildJob(reader);
                        }
                        conn.Close();
                    }
                }
                catch (Exception ex)
                {
                    Logger.LogEvent(ex.Message + "-GetByJobDriver", System.Diagnostics.EventLogEntryType.Error);
                    conn.Close();
                }
            }
            return currJob;
        }

        public JobInfo GetByAssetID(int assetID)
        {

            JobInfo currJob = new JobInfo();
            string query = string.Format("SELECT * FROM view_jobs WHERE asset_id = @AssetID and flag >= 1 order by timestamp desc");


            using (MySqlConnection conn = new MySqlConnection(mConnStr))
            {
                try
                {
                    using (MySqlCommand cmd = new MySqlCommand())
                    {
                        conn.Open();
                        cmd.Connection = conn;
                        cmd.CommandText = query;
                        cmd.Prepare();
                        cmd.Parameters.AddWithValue("@AssetID", assetID);
                        MySqlDataReader reader = cmd.ExecuteReader();

                        while (reader.Read())
                        {
                            currJob = DataMgrTools.BuildJob(reader);
                        }
                        conn.Close();
                    }
                }
                catch (Exception ex)
                {
                    Logger.LogEvent(ex.Message + "-GetByAssetID", System.Diagnostics.EventLogEntryType.Error);
                    conn.Close();
                }
            }
            return currJob;
        }

        public JobInfo UpdateJobByZone(JobInfo currJob)
        {
            try
            {
                using (MySqlConnection conn = new MySqlConnection(mConnStr))
                {
                    using (MySqlCommand cmd = new MySqlCommand())
                    {
                        conn.Open();
                        cmd.Connection = conn;
                        cmd.CommandText = "UPDATE jobs SET job_number = @JobNumber, company = @Company, timestamp = @Timestamp, rx_time = @RxTime, company_id = @AssetCompanyID, reseller_id = @AssetResellerID, asset_id = @AssetID, " +
                                          "amount = @Amount, bed = @Bed, caller = @Caller, destination = @Destination, origin = @Origin, phone = @Phone, unit = @Unit, accessories = @Accessories, remarks = @Remarks, flag = @Flag, patient = @Patient, " +
                                          "payment = @Payment, trip = @Trip, receipt_number = @Receipt, new_amount = @NewAmount, agent = @Agent, job_status = @JobStatus, paramedic = @Paramedic WHERE job_id = @JobID";
                        cmd.Prepare();
                        cmd.Parameters.AddWithValue("@JobNumber", currJob.JobNumber);
                        cmd.Parameters.AddWithValue("@Company", currJob.Company);
                        cmd.Parameters.AddWithValue("@Timestamp", currJob.Timestamp);
                        cmd.Parameters.AddWithValue("@RxTime", currJob.RxTime);
                        cmd.Parameters.AddWithValue("@AssetCompanyID", currJob.AssetCompanyID);
                        cmd.Parameters.AddWithValue("@AssetResellerID", currJob.AssetResellerID);
                        cmd.Parameters.AddWithValue("@AssetID", currJob.AssetID);
                        cmd.Parameters.AddWithValue("@Amount", currJob.Amount);
                        cmd.Parameters.AddWithValue("@Bed", currJob.Bed);
                        cmd.Parameters.AddWithValue("@Caller", currJob.Caller);
                        cmd.Parameters.AddWithValue("@Destination", currJob.Destination);
                        cmd.Parameters.AddWithValue("@Origin", currJob.Origin);
                        cmd.Parameters.AddWithValue("@Phone", currJob.Phone);
                        cmd.Parameters.AddWithValue("@Unit", currJob.Unit);
                        cmd.Parameters.AddWithValue("@Accessories", currJob.Accessories);
                        cmd.Parameters.AddWithValue("@Remarks", currJob.Remarks);
                        cmd.Parameters.AddWithValue("@Flag", currJob.Flag);
                        cmd.Parameters.AddWithValue("@Patient", currJob.Patient);
                        cmd.Parameters.AddWithValue("@Payment", currJob.Payment);
                        cmd.Parameters.AddWithValue("@Trip", currJob.Trip);
                        cmd.Parameters.AddWithValue("@Receipt", currJob.Receipt);
                        cmd.Parameters.AddWithValue("@NewAmount", currJob.NewAmount);
                        cmd.Parameters.AddWithValue("@Agent", currJob.Agent);
                        cmd.Parameters.AddWithValue("@JobStatus", "Expired");
                        cmd.Parameters.AddWithValue("@Paramedic", currJob.Paramedic);
                        cmd.Parameters.AddWithValue("@JobID", currJob.JobID);
                        cmd.ExecuteNonQuery();
                        conn.Close();
                    }
                }
            }
            catch (Exception ex)
            {
                Logger.LogEvent(ex.Message + "-UpdateJobByZone(JobRepository)", System.Diagnostics.EventLogEntryType.Error);
            }

            return currJob;
        }

    }
}