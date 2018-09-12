(function() {
  'use strict';


  angular
    .module('ciotPlatform')
    .controller('dashboardController', DashboardController)
  ;



  const STATS_CARD_HEADER_COLOR_CLASSES = [
    "md-card-header-blue",
    "md-card-header-primary",
    "md-card-header-green",
    "md-card-header-warning",
    "md-card-header-danger",
    "md-card-header-rose"
  ];



  DashboardController.$inject = ['$scope', '$state', '$mdDialog', 'apiService'];

  function DashboardController($scope, $state, $mdDialog, apiService) {


    $scope.init = _init;

    $scope.barLabels = ['Ja', 'Fe', 'Ma', 'Ap', 'Mai', 'Ju', 'Jul', 'Au', 'Se', 'Oc', 'No', 'De'];
    $scope.barSeries = ['New Service'];
    $scope.barColors =[
      {
        backgroundColor: "#fff",
        pointBackgroundColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        borderColor: "#fff",
        pointBorderColor: '#fff',
        pointHoverBorderColor: "#fff"
      },"#fff","#fff","#fff"
    ];
    $scope.barData = [
      [65, 59, 80, 81, 56, 55, 40, 80, 81, 56, 55, 40],
    ];
    $scope.barOptions = {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero:true,
            fontColor: "#fff"
          },
          gridLines: {
            color: "rgba(255, 255, 255, 0.1)",
            zeroLineColor: "rgba(255, 255, 255, 0.1)"
          }
        }],
        xAxes: [{
          ticks: {
            fontColor: "#fff"
          },
          gridLines: {
            color: "rgba(255, 255, 255, 0.1)",
            zeroLineColor: "rgba(255, 255, 255, 0.1)"
          }
        }]
      },
      responsive: true,
      maintainAspectRatio: false
    };




    $scope.lineLabels = ['Ja', 'Fe', 'Ma', 'Ap', 'Mai', 'Ju', 'Jul', 'Au', 'Se', 'Oc', 'No', 'De'];
    $scope.lineSeries = ['Series A'];
    $scope.lineColors =[
      {
        backgroundColor: "transparent",
        pointBackgroundColor: "transparent",
        pointHoverBackgroundColor: "transparent",
        borderColor: "#fff",
        pointBorderColor: '#fff',
        pointHoverBorderColor: "#fff"
      },"transparent","transparent","transparent"
    ];
    $scope.lineData = [
      [65, 59, 80, 81, 56, 55, 65, 59, 80, 81, 56, 40]
    ];
    $scope.lineOptions = {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero:true,
            fontColor: "#fff"
          },
          gridLines: {
            color: "rgba(255, 255, 255, 0.1)",
            zeroLineColor: "rgba(255, 255, 255, 0.1)"
          }
        }],
        xAxes: [{
          ticks: {
            fontColor: "#fff"
          },
          gridLines: {
            color: "rgba(255, 255, 255, 0.1)",
            zeroLineColor: "rgba(255, 255, 255, 0.1)"
          }
        }]
      },
      responsive: true,
      maintainAspectRatio: false
    };


    $scope.pieLabels = ["Download Sales", "In-Store Sales", "Mail-Order Sales"];
    $scope.pieData = [300, 500, 100];










    $scope.statsHeaderColorClass = _statsHeaderColorClass;

    function _init() {
       apiService.getDashboardData()
      .then(function(dashboardData){
        $scope.$apply(function () {
          $scope.dashboardData = dashboardData;
        });

      }, function(err){
      });
    }


    function _statsHeaderColorClass(index) {
      return STATS_CARD_HEADER_COLOR_CLASSES[index];
    }

  }

})();
