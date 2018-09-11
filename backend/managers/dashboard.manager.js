'use strict';

var _ = require("lodash");

var UserModel = require("../models/user.model.js");



var DASHBOARD_TEMPLATE_USER = {
  'stats': [
    {
      "icon": "fas fa-cubes",
      "title": "Service",
      "value": "13",
      "unit": "EA",             //  number, string, plus, dollar, krw,
      "subIcon": "fas fa-file-upload",
      "subText": "Uploaded open services"
    },
    {
      "icon": "fas fa-heart",
      "title": "Followers",
      "value": "145",
      "unit": "EA",             //  number, string, plus, dollar, krw,
      "subIcon": "fas fa-tags",
      "subText": "Tagged times by others"
    },
    {
      "icon": "far fa-play-circle",
      "title": "Running device",
      "value": "102",
      "unit": "EA",             //  number, string, plus, dollar, krw,
      "subIcon": "fas fa-tags",
      "subText": "Tagged items"
    }
  ],
  'chart': [
    {
      "icon": "fas fa-user",
      "title": "Users",
      "desc": "Sign in users",
      "subIcon": "fas fa-user",
      "subText": "recent 1 years",
      "data": []
    },
    {
      "icon": "fas fa-cubes",
      "title": "Open services",
      "desc": "Registered open services",
      "subIcon": "fas fa-cubes",
      "subText": "recent 1 years",
      "data": []
    }

  ]
};


var DASHBOARD_TEMPLATE_SYSTEM = {
  'stats': [
    {
      "icon": "fas fa-user",
      "title": "Users",
      "value": "2,222",
      "unit": "persons",             //  number, string, plus, dollar, krw,
      "subIcon": "fas fa-user-plus",
      "subText": "Active user"
    },
    {
      "icon": "fas fa-cubes",
      "title": "Open Service",
      "value": "190,203",
      "unit": "EA",             //  number, string, plus, dollar, krw,
      "subIcon": "fas fa-warehouse",
      "subText": "Registered open services"
    },
    {
      "icon": "fas fa-power-off",
      "title": "Open Data",
      "value": "50,000",
      "unit": "EA",             //  number, string, plus, dollar, krw,
      "subIcon": "fas fa-database",
      "subText": "Active process"
    }
  ],
  'chart': [
    {
      "icon": "fas fa-user",
      "title": "Users",
      "desc": "Sign in users",
      "subIcon": "fas fa-user",
      "subText": "recent 1 years",
      "data": []
    },
    {
      "icon": "fas fa-cubes",
      "title": "Open services",
      "desc": "Registered open services",
      "subIcon": "fas fa-cubes",
      "subText": "recent 1 years",
      "data": []
    }
  ]
};



function _getDashboardData(authToken) {
  return new Promise((resolve, reject)=>{
    try {
      if(authToken) {
        UserModel.findOneByUserId(authToken.userid)
          .then((user)=>{

            resolve(DASHBOARD_TEMPLATE_USER);
          })
          .then((vspace)=>{
            resolve(vspace);
          })
          .catch((err)=>{
            reject(err);
          });

      }
      else {
        resolve(DASHBOARD_TEMPLATE_SYSTEM);
      }



    } catch(ex) {
      reject(ex);
    }
  });
}


/**
 * Expose 'dashboard.manager.js'
 */
module.exports.getDashboardData = _getDashboardData;
