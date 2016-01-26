var fs = require('fs');

var loadJson = function(fileName) {
  var filePromise = new Promise(function(resolve, reject) {
    fs.readFile(fileName, function (err, data) {
      if (err) { 
        reject(err);
      } else {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(e);
        }
      }
    });
  });

  var itemsPromise = filePromise
  .then(function(data) {
    var items = {};
    for (var i=0; i<data.length; ++i) {
      var item = data[i];
      items[item.id] = item;
    }
    return items;
  })

  return itemsPromise;
};

var people = loadJson('./people.json')
.then(function(people) {
  console.log('LOADED people.json');
  return people;
})
.catch(function(err) {
  console.log('ERROR', err);
});


var bugs = loadJson('./bugs.json')
.then(function(bugs) {
  console.log('LOADED bugs.json');
  return bugs;
})
.catch(function(err) {
  console.log('ERROR', err);
});

module.exports = {
  bugs: bugs,
  people: people
};