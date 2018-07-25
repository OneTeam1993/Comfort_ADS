using FMSWebApi.Models;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace FMSWebApi.Repository
{
    public class HospitalRepository : IHospitalRepository
    {
        //private string mConnStr = "server=127.0.0.1;uid=root;pwd=12345;database=test;";
        private string mConnStr = "server=localhost;uid=root;pwd=@mbul@nc3;database=ads;max pool size=500;default command timeout=999999;";
        private string mProjName = "Comfort";
        public IEnumerable<HospitalInfo> GetAll()
        {
            MySqlConnection conn = new MySqlConnection();
            MySqlCommand cmd = new MySqlCommand();
            List<HospitalInfo> arrHospitals = new List<HospitalInfo>();

            try
            {
                conn.ConnectionString = mConnStr;
                conn.Open();

                cmd.CommandText = "hospital order by name asc";
                cmd.Connection = conn;
                cmd.CommandType = CommandType.TableDirect;
                MySqlDataReader reader = cmd.ExecuteReader();

                //Console.WriteLine(String.Format("Total Data: {0}", dbRdr.FieldCount));

                if ((reader != null) && (reader.HasRows))
                {
                    while (reader.Read())
                    {
                        HospitalInfo currHospital = DataMgrTools.BuildHospital(reader);
                        arrHospitals.Add(currHospital);
                    }
                }
                conn.Close();
            }
            catch (MySqlException ex)
            {
                Logger.LogEvent(mProjName, ex.Message, System.Diagnostics.EventLogEntryType.Error);
            }

            if (conn != null)
                conn.Close();

            return arrHospitals.ToArray();
        }

        public HospitalInfo Get(int hospitalID)
        {
            HospitalInfo currHospital = new HospitalInfo();
            string query = string.Format("SELECT * FROM hospital WHERE hospital_id = {0}", hospitalID);

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
                            currHospital = DataMgrTools.BuildHospital(reader);
                        }
                        conn.Close();
                    }
                }
                catch (Exception ex)
                {
                    Logger.LogEvent(ex.Message + "-Get(HospitalRepository)", System.Diagnostics.EventLogEntryType.Error);
                }
            }
            return currHospital;
        }

        public HospitalInfo Add(HospitalInfo currHospital)
        {
            try
            {
                using (MySqlConnection conn = new MySqlConnection(mConnStr))
                {
                    using (MySqlCommand cmd = new MySqlCommand())
                    {
                        conn.Open();
                        cmd.Connection = conn;
                        cmd.CommandText = "INSERT INTO hospital (name, address, short_name, code_id) " +
                            "VALUES (@Name, @Address, @ShortName, @CodeID)";
                        cmd.Prepare();
                        cmd.Parameters.AddWithValue("@Name", currHospital.Name);
                        cmd.Parameters.AddWithValue("@Address", currHospital.Address);
                        cmd.Parameters.AddWithValue("@ShortName", currHospital.ShortName);
                        cmd.Parameters.AddWithValue("@CodeID", currHospital.CodeID);
                        cmd.ExecuteNonQuery();
                        conn.Close();
                    }
                }
            }
            catch (Exception ex)
            {
                Logger.LogEvent(ex.Message + "-Add(Hospital)", System.Diagnostics.EventLogEntryType.Error);
            }

            return currHospital;
        }

        public bool Remove(int hospitalID)
        {
            bool retVal = false;
            string query = string.Format("DELETE FROM hospital WHERE hospital_id = {0}", hospitalID);

            using (MySqlConnection conn = new MySqlConnection(mConnStr))
            {
                try
                {
                    using (MySqlCommand cmd = new MySqlCommand(query, conn))
                    {
                        conn.Open();
                        if (cmd.ExecuteNonQuery() == 1)
                            retVal = true;
                        else
                            retVal = false;
                        conn.Close();
                    }
                }
                catch (Exception ex)
                {
                    Logger.LogEvent(ex.Message + "-Remove(Hospital)", System.Diagnostics.EventLogEntryType.Error);
                }
            }

            return retVal;
        }

        public bool Update(HospitalInfo currHospital)
        {
            bool retVal = false;
            try
            {
                using (MySqlConnection conn = new MySqlConnection(mConnStr))
                {
                    try
                    {
                        using (MySqlCommand cmd = new MySqlCommand())
                        {
                            conn.Open();
                            cmd.Connection = conn;
                            cmd.CommandText = "UPDATE hospital SET hospital_id = @HospitalID, name = @Name, address = @Address, short_name = @ShortName, code_id = @CodeID " +
                                                    "WHERE hospital_id = @HospitalID";
                            cmd.Prepare();
                            cmd.Parameters.AddWithValue("@HospitalID", currHospital.HospitalID);
                            cmd.Parameters.AddWithValue("@Name", currHospital.Name);
                            cmd.Parameters.AddWithValue("@Address", currHospital.Address);
                            cmd.Parameters.AddWithValue("@ShortName", currHospital.ShortName);
                            cmd.Parameters.AddWithValue("@CodeID", currHospital.CodeID);

                            if (cmd.ExecuteNonQuery() == 1)
                                retVal = true;
                            else
                                retVal = false;
                            conn.Close();
                        }
                    }
                    catch (Exception ex)
                    {
                        Logger.LogEvent(ex.Message + "-Update(Hospital)", System.Diagnostics.EventLogEntryType.Error);
                    }
                }
            }
            catch (Exception ex)
            {
                Logger.LogEvent(ex.Message + "-Update(Hospital)", System.Diagnostics.EventLogEntryType.Error);
            }

            return retVal;
        }

    }
}