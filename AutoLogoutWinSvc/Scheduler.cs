using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Security;
using System.Security.Cryptography.X509Certificates;
using System.ServiceProcess;
using System.Text;
using System.Threading.Tasks;
using System.Timers;
using Oracle.ManagedDataAccess.Client;
using MySql.Data.MySqlClient;
using AutoLogoutWinSvc.Properties;
using AutoLogoutWinSvc.Models;
using AutoLogoutWinSvc.HelperTools;
using HelperTools;

namespace AutoLogoutWinSvc
{
    public partial class Scheduler : ServiceBase
    {
        private Timer timer1 = null;
        private string mConnStrMySQL = Settings.Default.mConnStrMySQL;
        public Scheduler()
        {
            InitializeComponent();
            ServicePointManager.ServerCertificateValidationCallback = delegate (object s, X509Certificate certificate,
                 X509Chain chain, SslPolicyErrors sslPolicyErrors) { return true; };

        }
        protected override void OnStart(string[] args)
        {
            try
            {
                UpdateAssetDriver();
                Library.WriteErrorLog("Auto Driver Logout window service started");
            }
            catch(Exception ex)
            {
                Logger.LogToEvent("OnStart Exception: " + ex.Message, EventLogEntryType.Error);
                return;
            }

        }
        protected override void OnStop()
        {
            try
            {
                timer1.Enabled = false;
                Library.WriteErrorLog("Auto Driver Logout window service stopped");
            }
            catch (Exception ex)
            {
                Logger.LogToEvent("OnStop Exception: " + ex.Message, EventLogEntryType.Error);
                return;
            }

        }
        private void UpdateAssetDriver()
        {
            try
            {
                using (MySqlConnection conn = new MySqlConnection(mConnStrMySQL))
                {         
                    #region Update All Driver
                    try
                    {
                        using (MySqlCommand cmd = new MySqlCommand())
                        {
                            conn.Open();
                            cmd.Connection = conn;
                            cmd.CommandText = "UPDATE assets SET driver_id = @DriverID WHERE company_id = @CompanyID";
                            cmd.Prepare();
                            cmd.Parameters.AddWithValue("@DriverID", 0);
                            cmd.Parameters.AddWithValue("@CompanyID", 2);
                            cmd.ExecuteNonQuery();
                            conn.Close();
                        }
                    }
                    catch (Exception ex)
                    {
                        Logger.LogToEvent("Auto Logout Driver: " + ex.Message, EventLogEntryType.Error);
                    }
                    #endregion

                }
            }
            catch (Exception ex)
            {
                Logger.LogToEvent("CheckDriver Exception: " + ex.Message, EventLogEntryType.Error);
                return;
            }
        }
        public static void LogError(string strSource, string strError)
        {
            // log error event
            LogEvent(0, String.Format("{0}\r{1}", strSource, strError));
        }
        public static void LogEvent(int iLevel, string strLog)
        {
            try
            {
                // create event source
                string strSource = String.Format("ADSWin-{0}", Settings.Default.DataPort);
                string instanceDir = System.AppDomain.CurrentDomain.BaseDirectory;
                if (!EventLog.SourceExists(strSource))
                    EventLog.CreateEventSource(new EventSourceCreationData(strSource, Settings.Default.ProjectName));

                // check error type
                EventLogEntryType iType = EventLogEntryType.Information;
                switch (iLevel)
                {
                    case 0: iType = EventLogEntryType.Error; break;
                    case 1: iType = EventLogEntryType.Warning; break;
                }

                // log event
                strLog = String.Format("{0}:\r\n{1}", instanceDir, strLog);
                EventLog.WriteEntry(strSource, strLog, iType);
            }
            catch (Exception ex)
            {
                Library.WriteErrorLog(ex.Message);
            }
        }
    }
}
