(function() {
  'use strict';

  angular
    .module('ciotPlatform')
    .directive('dragToMove', DragToMoveDirective)
    .directive('oneKeyEnter', OnKeyEnterDirective)

  ;


  DragToMoveDirective.$inject = ['$document'];

  function DragToMoveDirective($document) {
    var directive = {
      restrict: 'A',
      scope: {
        position: '=',
        onDragEnd: '=',
        objectId: '@'
      },
      link: link
    }
    return directive;

    function link(scope, element, attr) {
      var startX = 0, startY = 0, x = scope.position.x || 0, y = scope.position.y || 0;
      var offsetParent = element[0].offsetParent;
      var offsetParentWidth = offsetParent ? offsetParent.clientWidth : 1000, offsetParentHeight = offsetParent ? offsetParent.clientHeight : 1000;

      element.css({
        cursor: 'pointer',
        position: 'absolute'
      });

      element.on('mousedown', function(event) {
        // Prevent default dragging of selected content
        event.preventDefault();
        startX = event.pageX - x;
        startY = event.pageY - y;
        $document.on('mousemove', mousemove);
        $document.on('mouseup', mouseup);

        offsetParent = element[0].offsetParent;
        offsetParentWidth = offsetParent ? offsetParent.clientWidth : 1000;
        offsetParentHeight = offsetParent ? offsetParent.clientHeight : 1000;
      });

      function mousemove(event) {
        y = Math.min(offsetParentHeight-element[0].clientHeight-10, Math.max( 10, event.pageY - startY ));
        x = Math.min(offsetParentWidth-element[0].clientWidth-10, Math.max( 10, event.pageX - startX ));

        element.css({
          top: y + 'px',
          left:  x + 'px'
        });
      }

      function mouseup() {

        if(scope.onDragEnd) {
          scope.onDragEnd(x, y, scope.objectId);
        }

        $document.unbind('mousemove', mousemove);
        $document.unbind('mouseup', mouseup);
      }
    }
  }


  function OnKeyEnterDirective() {
    var directive = {
      restrict: 'A',
      link: link
    }
    return directive;

    function link(scope, element, attrs) {
      element.bind("keydown keypress", function (event) {
        if(event.which === 13) {
          scope.$apply(function (){
            scope.$eval(attrs.onKeyEnter);
          });

          event.preventDefault();
        }
      });
    }
  }


})();
