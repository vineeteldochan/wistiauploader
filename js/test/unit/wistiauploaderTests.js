
 describe('Testing Wistia Video uploader', function() {
  describe('Testing uploaderController', function(){
      beforeEach(module('processstdemo'));
      it('should pick up the accesstoken from the attribute', inject(function($componentController){
        var scope = {},
        attrs = {},
        element = angular.element('<div></div>'); //provide element you want to test

        var ctrl = $componentController('uploader',{$scope: scope, $element:element, $attrs:attrs });

        expect(ctrl.vidlist).toBeDefined();
      }));
  });
});
