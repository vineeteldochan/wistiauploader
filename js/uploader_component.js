angular.module('processstdemo', []);
angular.
  module('processstdemo').
  component('uploader', {
    templateUrl:'./template/uploaderTemplate.html',
    bindings:{
      accesstoken: '@'
    },
    controller: function uploaderController($scope, $http, $element, $attrs) {
      var ctrl = this;

      ctrl.vidlist = [];

      ctrl.getList = function(){
        $http.get('https://api.wistia.com/v1/medias.json?access_token='+$attrs.accesstoken)
          .then(function successCallback(response) {
            ctrl.vidlist = [];
            if(response > ""){
              if(response.data > "" && response.data instanceof Array){
                angular.forEach(response.data,function(eachvid){
                  ctrl.vidlist.push({hashed_id:eachvid.hashed_id});
                })
              }
            }
          }, function errorCallback(response) {
              //alert("WRR: "+JSON.stringify(response));
          });
      }
      ctrl.getList(this);
      angular.element(document).ready(function () {
          var addfilebtn = $element.find('#fileupload');
          var startallbtn = $element.find('#startall');
          startallbtn.bind('click',function(){
            $('.btnupload').click();
          })
          this.upload = {
              dataType: 'json',
              add: function (e, data) {
                var exp = Math.log(data.files[0].size) / Math.log(1024) | 0;
                var result = (data.files[0].size / Math.pow(1024, exp)).toFixed(2);
                result = result + ' ' + (exp == 0 ? 'bytes': 'KMGTPEZY'[exp - 1] + 'B');
                  data.context = $('<li class="list-group-item"><span>Filename: '+data.files[0].name+'</span><button class="btn btn-primary btnupload">Upload</button><span style="display:block">Size: '+result+'</span></li>')
                      .appendTo(document.getElementsByClassName('list-group')[0]);
                  data.context.find('button')
                      .click(function () {
                          data.context = $(this).text('Uploading...');
                          data.context.removeClass('btn-danger').removeClass('btn-primary').removeClass('btn-warning').removeClass('btn-success').addClass('btn-warning');
                          data.submit();
                      });
              },
              progressall: function (e, data) {
                  var progress = parseInt(data.loaded / data.total * 100, 10);
                  $('.progress-bar').css(
                      'width',
                      progress + '%'
                  );
                  $('.progress-bar').text(progress+'%')
              },
              done: function (e, data) {
                  data.context.text('Upload Complete');
                  data.context.removeClass('btn-danger').removeClass('btn-primary').removeClass('btn-warning').removeClass('btn-success').addClass('btn-success');
                  data.context.unbind('click');
                  angular.element('.videolist').scope().$ctrl.getList();
              },
              fail: function(e,data){
                data.context.text('Upload Failed');
                data.context.removeClass('btn-danger').removeClass('btn-primary').removeClass('btn-warning').removeClass('btn-success').addClass('btn-danger');
              }
          };
          addfilebtn.fileupload(this.upload);
      });
    }
  }).
  component('embedvideo', {
    templateUrl:'./template/embedvideoTemplate.html' ,
    controller: function embedvideoController($scope,$http,$attrs){
      var ctrl = this;
      ctrl.delvid = function(vid){
        ctrl.delvid = vid;
        $http.delete('https://api.wistia.com/v1/medias/'+vid+'.json?access_token='+this.uploaderv.accesstoken)
          .then(function successCallback(response) {
            if(response > ""){
              if(response.data > ""){
                var ind = ctrl.uploaderv.vidlist.map(function(e){return e.hashed_id}).indexOf(ctrl.delvid);
                if(ind > -1){
                    ctrl.uploaderv.vidlist.splice(ind, 1);
                }
              }
            }
          }, function errorCallback(response) {
              alert("Delete failed. Please refresh page");
              //alert("WRR: "+JSON.stringify(response));
          });
      }
    },
    require: {
      uploaderv: '^uploader'
    },
    bindings: {
      vid: '<'
    }
  })
