var falcorExpress = require('falcor-express');
var Router = require('falcor-router');
var falcor = require('falcor');
var $ref = falcor.Model.ref;

var express = require('express');

var app = express();

var database = require('./database');


app.use('/model.json', falcorExpress.dataSourceRoute(function (req, res) {
  return new Router([
    {
      route: 'user',
      get: function(pathSet) {
        var pathValues = [];
        var link = ['people', '7'];
        pathValues.push( {
          path: [pathSet[0]],
          value: $ref(link)
        });
        return pathValues;
      }
    },
    {
      route: 'bugs[{ranges}][{keys}]',
      get: getItems(database.bugs, {'raisedBy': 'people'})
    },
    {
      route: 'people[{ranges}][{keys}]',
      get: getItems(database.people)
    }
  ]);
}));

var rangeGenerator = function(ranges, fn) {
 var vals = [];
 for (var ri = 0; ri < ranges.length; ++ri) {
  var range = ranges[ri];
  for (var i = range.from; i <= range.to; ++i) {
   var val = fn(i);
   vals.push(val);
  }
 }
 return vals;
};


var getItems = function(dataPromise, links) {
  return function(pathSet) {
    var ranges = pathSet[1];
    var props = pathSet[2];

    return dataPromise.then(function(data) {
      var pathValues = [];
      rangeGenerator(ranges, function(index) {
        var item = data['' + index];
        props.forEach(function(prop) { 
          var value = item[prop];
          if (links && links[prop]) {
            value = $ref([links[prop], value]);
          }
          pathValues.push( {
            path: [pathSet[0], index, prop],
            value: value
          });
        });
      });
      return pathValues;
    });
  }
};


// serve static files from current directory
app.use(express.static(__dirname + '/'));

var server = app.listen(3000);