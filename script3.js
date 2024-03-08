var dataYears = [
  { year: 1900, count: 9 },
  { year: 1956, count: 1 },
  { year: 1957, count: 1 },
  { year: 1963, count: 1 },
  { year: 1966, count: 1 },
  { year: 1974, count: 1 },
  { year: 1979, count: 1 },
  { year: 1980, count: 2 },
  { year: 1982, count: 1 },
  { year: 1983, count: 7 },
  { year: 1985, count: 1 },
  { year: 1986, count: 3 },
  { year: 1987, count: 3 },
  { year: 1988, count: 4 },
  { year: 1989, count: 2 },
  { year: 1991, count: 1 },
  { year: 1992, count: 1 },
  { year: 1993, count: 5 },
  { year: 1994, count: 3 },
  { year: 1995, count: 3 },
  { year: 1996, count: 2 },
  { year: 1997, count: 2 },
  { year: 1998, count: 5 },
  { year: 1999, count: 3 },
  { year: 2000, count: 6 },
  { year: 2001, count: 2 },
  { year: 2002, count: 2 },
  { year: 2003, count: 3 },
  { year: 2004, count: 4 },
  { year: 2005, count: 7 },
  { year: 2006, count: 6 },
  { year: 2007, count: 5 },
  { year: 2008, count: 9 },
  { year: 2009, count: 9 },
  { year: 2010, count: 13 },
  { year: 2011, count: 9 },
  { year: 2012, count: 15 },
  { year: 2013, count: 17 },
  { year: 2014, count: 19 },
  { year: 2015, count: 16 },
  { year: 2016, count: 26 },
  { year: 2017, count: 38 },
  { year: 2018, count: 38 },
  { year: 2019, count: 36 },
  { year: 2020, count: 39 },
  { year: 2021, count: 76 },
  { year: 2022, count: 58 },
  { year: 2023, count: 33 },
];

// Définition des dimensions du graphique
var widthYears = 800;
var heightYears = 600;
var marginYears = { top: 20, right: 30, bottom: 50, left: 60 };

// Création de l'élément SVG
var svg = d3
  .select("#bottom")
  .append("svg")
  .attr("width", widthYears + marginYears.left + marginYears.right)
  .attr("height", heightYears + marginYears.top + marginYears.bottom)
  .append("g")
  .attr(
    "transform",
    "translate(" + marginYears.left + "," + marginYears.top + ")"
  );

// Echelle X
var x = d3
  .scaleLinear()
  .domain(
    d3.extent(dataYears, function (d) {
      return d.year;
    })
  )
  .range([0, widthYears]);

// Echelle Y
var y = d3
  .scaleLinear()
  .domain([
    0,
    d3.max(dataYears, function (d) {
      return d.count;
    }),
  ])
  .range([heightYears, 0]);

// Axe X
svg.append("g")
    .attr("transform", "translate(0," + heightYears + ")")
    .call(d3.axisBottom(x).tickFormat(d3.format("d")));

// Axe Y
svg.append("g")
    .call(d3.axisLeft(y));

// Création de la courbe
svg
  .append("path")
  .datum(dataYears)
  .attr("fill", "none")
  .attr("stroke", "#e94a34")
  .attr("stroke-width", 5)
  .attr(
    "d",
    d3
      .line()
      .x(function (d) {
        return x(d.year);
      })
      .y(function (d) {
        return y(d.count);
      })
  );

// Ajout des points de données
svg
  .selectAll("dot")
  .data(dataYears)
  .enter()
  .append("circle")
  .attr("r", 4)
  .attr("cx", function (d) {
    return x(d.year);
  })
  .attr("cy", function (d) {
    return y(d.count);
  })
  .attr("fill", "#e94a34");

// Ajout des labels
svg
  .selectAll("text")
  .data(dataYears)
  .enter()
  .append("text")
  .attr("x", function (d) {
    return x(d.year) + 5;
  })
  .attr("y", function (d) {
    return y(d.count) - 10;
  })
  .text(function (d) {
    return d.count;
  })
  .attr("font-family", "sans-serif")
  .attr("font-size", "12px")
  .attr("fill", "black");
