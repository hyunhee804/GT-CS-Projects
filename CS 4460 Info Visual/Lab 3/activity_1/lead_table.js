// **** Your JavaScript code goes here ****
d3.csv('NetflixOriginals.csv').then(function (dataset) {
    var rows = d3.select('#main').select('#netflix-table').select('tbody').selectAll('tr')
        .data(dataset)
        .enter()
        .append('tr')

    rows.append('td')
        .text(function (d) { return d['Title'] });

    rows.append('td')
        .text(function (d) { return d['IMDB Score'] });
    
    rows.append('td')
        .text(function (d) { return d['Premiere'].split("/", 1) });

    var data = d3.select('#main').select('#netflix').selectAll('p')
        .remove()
        .data(dataset)
        .enter()
        .append('p')

    data.append('p')
        .style('fill', 'darkOrange')
        .style("color", function(d, i) {
            return d['IMDB Score'] == 9 ? "#ff0000" : "#000";
        })
        .text(function (d) { return d['Title'] + ' premiered on ' + d['Premiere'] + ', receiving an IMDB Score of: ' + d['IMDB Score']})
    });

