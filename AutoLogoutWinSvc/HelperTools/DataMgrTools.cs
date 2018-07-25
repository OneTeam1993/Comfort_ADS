using Oracle.ManagedDataAccess.Client;
using AutoLogoutWinSvc.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using AutoLogoutWinSvc;
using MySql.Data.MySqlClient;

namespace AutoLogoutWinSvc.HelperTools
{
    public class DataMgrTools
    {
        public static DriverInfo BuildDriverOracle(OracleDataReader dbRdr)
        {
            DriverInfo udtDriver = new DriverInfo();

            try
            {
                // set company parameters
                udtDriver.DriverID = dbRdr.ToInt32("driver_id");
                udtDriver.Name = dbRdr.ToString("driver_name");
                udtDriver.AssetID = dbRdr.ToInt32("asset_id");
                udtDriver.Asset = dbRdr.ToString("asset");
                udtDriver.Address = dbRdr.ToString("address");
                udtDriver.Phone = dbRdr.ToString("phone");
                //udtDriver.DateOfBirth = dbRdr.ToDateTime("birthdate");
                if (dbRdr["birthdate"] != DBNull.Value)
                    udtDriver.DateOfBirth = dbRdr.ToDateTime("birthdate");

                udtDriver.RelativePhone = dbRdr.ToString("relative_phone");
                udtDriver.RelativeName = dbRdr.ToString("relative_name");
                udtDriver.RFIDID = dbRdr.ToInt32("rfid_id");
                udtDriver.RFID = dbRdr.ToString("rfid");
                udtDriver.ResellerID = dbRdr.ToInt32("reseller_id");
                udtDriver.CompanyID = dbRdr.ToInt32("company_id");
                udtDriver.Company = dbRdr.ToString("company");
                udtDriver.BloodType = dbRdr.ToInt32("bloodtype");
                udtDriver.LastTap = dbRdr.ToDateTime("last_tap");
                udtDriver.Remarks = dbRdr.ToString("remarks");
                udtDriver.CreatedDate = dbRdr.ToDateTime("created_date");
                udtDriver.ModifiedDate = dbRdr.ToDateTime("modified_date");
                udtDriver.CreatedBy = dbRdr.ToInt32("created_by");
                udtDriver.ModifiedBy = dbRdr.ToInt32("modified_by");
                udtDriver.CreatedByName = dbRdr.ToString("created_byName");
                udtDriver.ModifiedByName = dbRdr.ToString("modified_byName");
                udtDriver.Email = dbRdr.ToString("email");

            }
            catch (Exception ex)
            {
                // log error
                Scheduler.LogError("BuildDriver", ex.Message);
            }
            return udtDriver;
        }
        public static DriverSched BuildDriverSchedOracle(OracleDataReader dbRdr)
        {
            DriverSched udtDriverSched = new DriverSched();

            try
            {
                // set company parameters
                udtDriverSched.SCS_ID = dbRdr.ToInt64("SCS_ID");
                udtDriverSched.OP_DATE = dbRdr.ToDateTime("OP_DATE");
                udtDriverSched.BUS_NO = dbRdr.ToString("BUS_NO");
                udtDriverSched.SVC_NO = dbRdr.ToString("SVC_NO");
                udtDriverSched.DRV_NO = dbRdr.ToInt32("DRV_NO");
                udtDriverSched.DUTY_NO = dbRdr.ToString("DUTY_NO");
                udtDriverSched.ACT_DEP_TIME = dbRdr.ToString("ACT_DEP_TIME");
                udtDriverSched.ACT_ARR_TIME = dbRdr.ToString("ACT_ARR_TIME");
                udtDriverSched.RESN_CODE_FOR_DEP = dbRdr.ToString("RESN_CODE_FOR_DEP");
                udtDriverSched.RESN_DESC = dbRdr.ToString("RESN_DESC");
                udtDriverSched.REMARKS_FOR_DEP = dbRdr.ToString("REMARKS_FOR_DEP");
            }
            catch (Exception ex)
            {
                // log error
                Scheduler.LogError("BuildDriverSched", ex.Message);
            }
            return udtDriverSched;
        }
        public static DriverSched BuildSavedDriverSched(MySqlDataReader dbRdr)
        {
            DriverSched udtDriverSched = new DriverSched();

            try
            {
                // set company parameters
                udtDriverSched.SCS_ID = dbRdr.ToInt64("SCS_ID");
                udtDriverSched.OP_DATE = dbRdr.ToDateTime("OP_DATE");
                udtDriverSched.BUS_NO = dbRdr.ToString("BUS_NO");
                udtDriverSched.SVC_NO = dbRdr.ToString("SVC_NO");
                udtDriverSched.DRV_NO = dbRdr.ToInt32("DRV_NO");
                udtDriverSched.DUTY_NO = dbRdr.ToString("DUTY_NO");
                udtDriverSched.ACT_DEP_TIME = dbRdr.ToString("ACT_DEP_TIME");
                udtDriverSched.ACT_ARR_TIME = dbRdr.ToString("ACT_ARR_TIME");
                udtDriverSched.RESN_CODE_FOR_DEP = dbRdr.ToString("RESN_CODE_FOR_DEP");
                udtDriverSched.RESN_DESC = dbRdr.ToString("RESN_DESC");
                udtDriverSched.REMARKS_FOR_DEP = dbRdr.ToString("REMARKS_FOR_DEP");
            }
            catch (Exception ex)
            {
                // log error
                Scheduler.LogError("BuildSavedDriverSched", ex.Message);
            }
            return udtDriverSched;
        }
        public static AssetInfo BuildAsset(MySqlDataReader dbRdr)
        {
            AssetInfo udtAsset = new AssetInfo();

            try
            {
                // check assigned tag
                string strTag = dbRdr.ToString("tag");
                if (strTag == "") strTag = "--";

                // get curfew times
                DateTime dtStart = dbRdr.ToDateTime("curfew_start");
                DateTime dtEnd = dbRdr.ToDateTime("curfew_end");

                // adjust curfew times
                dtStart = Convert.ToDateTime(String.Format("{0:dd-MMM-yy} {1:HH:mm:ss}", DateTime.Now, dtStart));
                dtEnd = Convert.ToDateTime(String.Format("{0:dd-MMM-yy} {1:HH:mm:ss}", DateTime.Now, dtEnd));
                if (dtStart > dtEnd)
                    dtEnd = dtEnd.AddDays(1.0);

                // set asset parameters
                udtAsset.AssetID = dbRdr.ToInt32("asset_id");
                udtAsset.Name = dbRdr.ToString("name");
                udtAsset.CategoryID = dbRdr.ToInt32("category_id");
                udtAsset.Category = dbRdr.ToString("category_desc");
                udtAsset.Phone = dbRdr.ToString("phone");
                udtAsset.Email = dbRdr.ToString("email");
                udtAsset.Home = dbRdr.ToInt32("home");
                udtAsset.AlertZones = dbRdr.ToString("restricted");
                udtAsset.Category = dbRdr.ToString("category_desc");
                udtAsset.TagID = dbRdr.ToInt32("tag_id");
                udtAsset.Tag = strTag;
                udtAsset.Phone = dbRdr.ToString("tagphone");
                udtAsset.SpeedLimit = dbRdr.ToDouble("speed_limit");
                udtAsset.Mileage = dbRdr.ToDouble("mileage");
                udtAsset.CompanyID = dbRdr.ToInt32("company_id");
                udtAsset.Company = dbRdr.ToString("company");
                udtAsset.DriverID = dbRdr.ToInt32("driver_id");
                udtAsset.InstallDate = dbRdr.ToDateTime("install_date");
                udtAsset.Port = dbRdr.ToInt32("port");
                udtAsset.TagType = dbRdr.ToString("tag_type");
                udtAsset.CurfewStart = dtStart;
                udtAsset.CurfewEnd = dtEnd;
                udtAsset.Temperature = 0.0;
                udtAsset.Temperature2 = 0.0;
                udtAsset.RFID = "";

            }
            catch (Exception ex)
            {
                //// log error
                Scheduler.LogError("BuildAsset", ex.Message);

            }
            return udtAsset;
        }
        public static DriverInfo BuildDriver(MySqlDataReader dbRdr)
        {
            DriverInfo udtDriver = new DriverInfo();
            try
            {
                // set company parameters
                udtDriver.DriverID = dbRdr.ToInt32("driver_id");
                udtDriver.Name = dbRdr.ToString("driver_name");
                udtDriver.AssetID = dbRdr.ToInt32("asset_id");
                udtDriver.Asset = dbRdr.ToString("asset");
                udtDriver.Address = dbRdr.ToString("address");
                udtDriver.Phone = dbRdr.ToString("phone");
                //udtDriver.DateOfBirth = dbRdr.ToDateTime("birthdate");
                if (dbRdr["birthdate"] != DBNull.Value)
                    udtDriver.DateOfBirth = dbRdr.ToDateTime("birthdate");

                udtDriver.RelativePhone = dbRdr.ToString("relative_phone");
                udtDriver.RelativeName = dbRdr.ToString("relative_name");
                udtDriver.RFIDID = dbRdr.ToInt32("rfid_id");
                udtDriver.RFID = dbRdr.ToString("rfid");
                udtDriver.ResellerID = dbRdr.ToInt32("reseller_id");
                udtDriver.CompanyID = dbRdr.ToInt32("company_id");
                udtDriver.Company = dbRdr.ToString("company");
                udtDriver.BloodType = dbRdr.ToInt32("bloodtype");
                udtDriver.LastTap = dbRdr.ToDateTime("last_tap");
                udtDriver.Remarks = dbRdr.ToString("remarks");
                udtDriver.CreatedDate = dbRdr.ToDateTime("created_date");
                udtDriver.ModifiedDate = dbRdr.ToDateTime("modified_date");
                udtDriver.CreatedBy = dbRdr.ToInt32("created_by");
                udtDriver.ModifiedBy = dbRdr.ToInt32("modified_by");
                udtDriver.CreatedByName = dbRdr.ToString("created_byName");
                udtDriver.ModifiedByName = dbRdr.ToString("modified_byName");
                udtDriver.Email = dbRdr.ToString("email");
                udtDriver.Password = dbRdr.ToString("password");

            }
            catch (Exception ex)
            {
                // log error
                //Logger.LogEvent(mProjName, "BuildDriver ERROR: " + ex.Message, System.Diagnostics.EventLogEntryType.Error);
            }
            return udtDriver;
        }

    }
}