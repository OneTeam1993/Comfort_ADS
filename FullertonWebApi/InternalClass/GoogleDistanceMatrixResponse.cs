﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FMSWebApi
{
    public class GoogleDistanceMatrixResponse
    {
        public string status { get; set; }
        public string origin_addresses { get; set; }
        public string destination_addresses { get; set; }
        public rows[] rows { get; set; }
    }

    //{
    //  "rows": [ {
    //    "elements": [ {
    //      "status": "OK",
    //      "duration": {
    //        "value": 340110,
    //        "text": "3 jours 22 heures"
    //      },
    //      "distance": {
    //        "value": 1734542,
    //        "text": "1 735 km"
    //      }
    //    }, {
    //      "status": "OK",
    //      "duration": {
    //        "value": 24487,
    //        "text": "6 heures 48 minutes"
    //      },
    //      "distance": {
    //        "value": 129324,
    //        "text": "129 km"
    //      }
    //    } ]
    //  }, {
    //    "elements": [ {
    //      "status": "OK",
    //      "duration": {
    //        "value": 288834,
    //        "text": "3 jours 8 heures"
    //      },
    //      "distance": {
    //        "value": 1489604,
    //        "text": "1 490 km"
    //      }
    //    }, {
    //      "status": "OK",
    //      "duration": {
    //        "value": 14388,
    //        "text": "4 heures 0 minutes"
    //      },
    //      "distance": {
    //        "value": 135822,
    //        "text": "136 km"
    //      }
    //    } ]
    //  } ]
    //}

    public class rows
    {
        public elements[] elements { get; set; }  
    }
    public class elements
    {
        public string status { get; set; }
        public duration[] duration { get; set; }
        public distance[] distance { get; set; }
    }
    public class duration
    {
        public int value { get; set; }
        public string text { get; set; }
    }
    public class distance
    {
        public int value { get; set; }
        public string text { get; set; }
    }


}
