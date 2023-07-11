// **** Your JavaScript code goes here ****
d3.csv('NetflixOriginals.csv').then(function (dataset) {
    var svg = d3.select('svg');
    var div = d3.select('div').append('div');

    // Legend:
    svg.append("text")
        .attr('transform', 'translate(770, 160)')
        .text("Legend:")
        .style("font-size", "13px")
        .attr("alignment-baseline", "middle")

    // IMDB Score < 4
    svg.append("circle")
        .attr('transform', 'translate(748, 190)')
        .attr("r", 6)
        .style("fill", "#809ef9")

    svg.append("text")
        .attr('transform', 'translate(770, 190)')
        .text("IMDB Score < 4")
        .style("font-size", "13px")
        .attr("alignment-baseline", "middle")


    // 4 < IMDB Score < 6
    svg.append("circle")
        .attr('transform', 'translate(748, 220)')
        .attr("r", 6)
        .style("fill", "blue")

    svg.append("text")
        .attr('transform', 'translate(770, 220)')
        .text("4 < IMDB Score < 6")
        .style("font-size", "13px")
        .attr("alignment-baseline", "middle")


    // 6 < IMDB Score
    svg.append("circle")
        .attr('transform', 'translate(748, 250)')
        .attr("r", 6)
        .style("fill", "darkBlue")

    svg.append("text")
        .attr('transform', 'translate(770, 250)')
        .text("6 < IMDB Score")
        .style("font-size", "13px")
        .attr("alignment-baseline", "middle")

    svg.append('g')
        .attr('class', 'scatterDots')
        .selectAll("dot")
        .data(dataset)
        .enter()
        .append("circle")
        .attr("cx", function (d) { return scaleDate(new Date(d.Premiere)); })
        .attr("cy", function (d) { return scaleIMDB(d['IMDB Score']); })
        .attr("r", 3.5)
        .style("fill", function (d) {
            if (d['IMDB Score'] < 4) {
                return "#809ef9"
            } else if (d['IMDB Score'] > 6) {
                return "darkBlue";
            } else {
                return "blue";
            }
        })
        .style('opacity', 0.35)
        .on('mouseover', function (d, i) {
            d3.select(this).transition()
                .duration('100')
                .style('opacity', 9)
            div.transition()
                .duration('100')
                .style("opacity", 1);
            div.html(d['Title'])
                .style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.y) + "px");
        })
        .on('mouseout', function (d, i) {
            d3.select(this).transition()
                .duration('100')
                .style("opacity", 0.35)
            div.transition()
                .duration('100')
                .style('opacity', 0)
        });


});


// **** Functions to call for scaled values ****

function scaleDate(date) {
    return dateScale(date);
}

function scaleIMDB(imdb) {
    return imdbScale(imdb);
}

// **** Code for creating scales, axes and labels ****

var dateScale = d3.scaleTime()
    .domain([new Date(2015, 0, 1), new Date(2022, 0, 1)]).range([60, 700]);

var imdbScale = d3.scaleLinear()
    .domain([1, 10]).range([340, 20]);

var svg = d3.select('svg');

svg.append('g').attr('class', 'x axis')
    .attr('transform', 'translate(0,345)')
    .call(d3.axisBottom(dateScale).ticks(d3.timeYear));

svg.append('text')
    .attr('class', 'label')
    .attr('transform', 'translate(360,390)')
    .text('Premiere Date');

svg.append('g').attr('class', 'y axis')
    .attr('transform', 'translate(55,0)')
    .call(d3.axisLeft(imdbScale));

svg.append('text')
    .attr('class', 'label')
    .attr('transform', 'translate(15,200) rotate(90)')
    .text('IMDB Ranking');

svg.append('text')
    .attr('class', 'title')
    .attr('transform', 'translate(360,30)')
    .text('Netflix Originals Rankings');