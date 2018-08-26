// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
var fs = require('fs');
const path = require('path')
const app = require('electron').remote.app
var SQL = require('sql.js');
window.$ = window.jQuery = require('jquery')

let absoletePath = path.join(app.getAppPath(), 'app')

// Coment this line to use database
window.cities = require(path.join(absoletePath,'citiesOfRussia.json'));

// connect Database if no json
if (typeof window.cities === "undefined") {
    let relativePath = path.dirname(__dirname)
    var filebuffer = fs.readFileSync(path.join(relativePath, 'app/sql/cities_and_regions'), 'utf8');
    // Load the db
    var db = new SQL.Database(filebuffer);
    // load cities and regions from Database
    var sqlStr =   `SELECT city.name as city, region.name as region
                    FROM city
                    JOIN region ON city.region_id = region.id
                    JOIN country on country.id = region.country_id
                    WHERE country.name = "Россия"
                    ORDER BY city.name`;
    var res = db.exec(sqlStr)[0];

    window.cities = res.values.map(function(row) {
        var city = {};
        $.each(res.columns, function( index, name) {
            city[name] = row[index];
        });
        return city;
    })
}


