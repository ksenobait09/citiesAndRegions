$("#process").on("click", function() {
    var $this = $(this);
    var text = $('#input').val();
    var cities = getCitiesFromText(text);
    if (cities.length == 0) {
        $('#input').addClass('is-invalid');
        return;
    } else {
        $('#input').removeClass('is-invalid');
    }
    var citiesAndRegions = getCitiesAndRegions(cities);
    $("#result tbody").html('');
    $.each(citiesAndRegions, function (i, row) {
            $("#result tbody").append(createTrForResult(row));
    });

})

function compareNames(a, b) {
    return a.localeCompare(b, "ru", {"sensitivity" : "base"});
}

function getCitiesFromText(text) {
    var rawCities = text.split(/\r\n|\r|\n|,/).map(function(text) {return $.trim(text); });
    var sortedCities = rawCities.sort(compareNames);
    var uniqueSortedCities = [];
    $.each(sortedCities, function(i,cityName) {
        if (cityName === "") {
            return true;
        }
        if (i > 0 && compareNames(sortedCities[i-1], sortedCities[i]) === 0 ) {
            return true;
        }
        uniqueSortedCities.push(cityName);
    });

    return uniqueSortedCities;
}

function getCitiesAndRegions(citiesToFind) {
    var indexCitiesToFind = 0, max = citiesToFind.length - 1;
    var result = [];

    var isFoundMap = citiesToFind.map(function(a) {
        return false;
    })

    $.each(window.cities, function(indexListCity, listCity) {
        var compare = compareNames(listCity.city, citiesToFind[indexCitiesToFind]);
        while (compare > 0) {
            indexCitiesToFind++;
            if (indexCitiesToFind > max) {
                return false;
            }
            compare = compareNames(listCity.city, citiesToFind[indexCitiesToFind]);
        }

        if (compare === 0) {
            result.push(listCity);
            isFoundMap[indexCitiesToFind] = true;
        }
    });
    sortedResult = result.sort(function (a, b) {
        return compareNames(a.region, b.region);
    });
    
    $.each(citiesToFind, function (i, city) {
        if (!isFoundMap[i]) {
            sortedResult.push({
                "city": city,
                "region": "&mdash;"});
        }
    });
    return sortedResult;
}

function createTrForResult(row) {
    var $tr = $("<tr>")
    .append(
        $("<td>").html(row.region)
    )
    .append(
        $("<td>").html(row.city)
    )
    return $tr;
}