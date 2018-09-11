(function() {
  'use strict';


  angular
    .module('ciotPlatform')
    .controller('toolsMetadataController', ToolsMetadataController)
  ;





  function ToolsMetadataPreviewDialog($scope, metadata, $mdDialog ) {

    $scope.metadata = metadata;
    $scope.metadataString = JSON.stringify(metadata, null, 2);

    $scope.cancel = function() {
      $mdDialog.cancel();
    };

    $scope.create = function() {

      $mdDialog.hide($scope.formData);
    };
  }










  ToolsMetadataController.$inject = ['$scope', '$state', '$mdDialog', 'apiService'];

  function ToolsMetadataController($scope, $state, $mdDialog, apiService) {

    $scope.formData = {
      service: {
        serviceName: '',
        versionCode: {
          major: 0,
          minor: 1,
          revision: 0
        },
        creator: '',
        openData : {
          local: [

          ]
          ,
          global: [

          ]
        }
      },
      databus: {

      }
    };


    $scope.init = _init;

    $scope.showMetadataPreviewDialog = _showMetadataPreviewDialog;

    $scope.setEditingData = _setEditingData;
    $scope.deleteOpenData = _deleteOpenData;
    $scope.addOpenData = _addOpenData;


    function _init() {


      //  test
      // for(var i=0; i < 4; i++) {
      //   var localData = {
      //     name: 'local-data-name-' + (i+1),
      //     description: 'local data description ' + (i+1),
      //     template: '{asdfj: askfjs, asfa: asdfas, afasf: ' + ('local data name-' + (i+1)) + '}'
      //   }
      //   $scope.formData.service.openData.local.push(localData);
      //
      //   var globalData = {
      //     name: 'global-data-name-' + (i+1),
      //     description: 'global data description-' + (i+1),
      //     template: '{asdfj: askfjs, asfa: asdfas, afasf: ' + ('global data-name-' + (i+1)) + '}'
      //   }
      //   $scope.formData.service.openData.global.push(globalData);
      //
      // }


    }


    function _setEditingData(data) {
      $scope.editingData = data;
    };

    function _deleteOpenData(target, data) {
      var targetGroup = $scope.formData.service.openData[target];
      if(targetGroup) {
        var indexOf = targetGroup.indexOf(data);
        targetGroup.splice(indexOf, 1);
      }
    }


    function __cloneOpenData(target, data) {
      var nameTokens = data.name.split('_');
      var baseName = data.name + '_';
      var startSeq = 1;
      if(nameTokens.length > 1) {
        var sequence = nameTokens[nameTokens.length-1];
        var seqNo = parseInt(sequence);
        if(!isNaN(seqNo)) {
          if( (''+seqNo) == sequence) {
            startSeq = seqNo+1;
            nameTokens.pop();
            baseName = nameTokens.join('_') + '_';
          }
        }
      }

      var newName = '';
      while(true) {
        newName = baseName + startSeq;

        var obj = target.find(function(item) {
          if (item.name == newName)
            return true;
          else
            return false;
        });

        if(obj == null)
          break;
        else
          startSeq++;
      }

      var newObj = JSON.parse(JSON.stringify(data));
      newObj.name = newName;


      return newObj;
    }



    function _addOpenData(targetName, data) {
      var targetGroup = $scope.formData.service.openData[targetName];
      if(!targetGroup) {
        return;
      }

      if(data) {
        var indexOf = targetGroup.indexOf(data);
        var newData = __cloneOpenData(targetGroup, data);

        targetGroup.splice(indexOf+1, 0, newData);
      }
      else {
        var data = {
          name: 'new-open-data',
          description: 'new open data',
          template: 'describe open data hear'
        };

        var newData = __cloneOpenData(targetGroup, data);

        targetGroup.push(newData);
      }

    }



    function _showMetadataPreviewDialog(ev) {

      if($scope.metadataForm.$invalid) {
        //alert('aa');
        //return;
      }

      $mdDialog.show({
        controller: ToolsMetadataPreviewDialog,
        templateUrl: './app/tools/dialog.tool.metadata.preview.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose:true,
        locals: {
          metadata: $scope.formData
        }
      })
        .then(function(aeResource) {
          apiService.registerAeResource(aeResource)
            .then((aeResource)=> {
              $scope.$apply(()=>{
                $scope.aeResourceList.push(aeResource);
              });
            });
        }, function() {
        });
    }


  }

})();
