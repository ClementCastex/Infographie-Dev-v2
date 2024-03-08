// Dimensions du SVG
var svgWidth = 600;
var svgHeight = 500;

// Marges du graphique
var margin = {
  top: 50,
  right: 100,
  bottom: 70,
  left: 100,
};

// Largeur et hauteur du graphique
var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Création du SVG
var svg = d3
  .select("#Mid-leftPanel")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Données
var data = [
  {
    Category: "SMEs",
    Administration: 5,
    Retail: 53,
    Construction: 8,
    Industry: 21,
    Services: 207,
  },
  {
    Category: "MID-CAP",
    Administration: 14,
    Retail: 6,
    Construction: 1,
    Industry: 10,
    Services: 33,
  },
  {
    Category: "LCs",
    Administration: 0,
    Retail: 5,
    Construction: 2,
    Industry: 3,
    Services: 11,
  },
  {
    Category: "VSEs",
    Administration: 0,
    Retail: 2,
    Construction: 0,
    Industry: 5,
    Services: 7,
  },
];

// Échelles
var x0 = d3.scaleBand().rangeRound([0, width]).paddingInner(0.1);

var x1 = d3.scaleBand().padding(0.05);

var y0 = d3.scaleLinear().rangeRound([height, 0]);

var y1 = d3.scaleLinear().rangeRound([height, 0]);

var color = d3
  .scaleOrdinal()
  .range(["#f6a200", "#fec800", "#038185", "#00a5a5", "#e94a34"]);

var categories = data.map(function (d) {
  return d.Category;
});
var subCategories = Object.keys(data[0]).slice(1);

x0.domain(categories);
x1.domain(subCategories).rangeRound([0, x0.bandwidth()]);
y0.domain([
  0,
  d3.max(data, function (d) {
    return d3.max(subCategories, function (key) {
      return d[key];
    });
  }),
]).nice();
y1.domain([
  0,
  d3.max(data, function (d) {
    return d.Total;
  }),
]).nice();

// Axes
svg
  .append("g")
  .attr("class", "x axis")
  .style("font-size", "20px")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(x0));

svg
  .append("g")
  .attr("class", "y axis")
  .call(d3.axisLeft(y0).ticks(null, "s"))
  .append("text")
  .attr("x", 2)
  .attr("y", y0(y0.ticks().pop()) + 0.5)
  .attr("dy", "0.32em")
  .attr("fill", "#000")
  .attr("font-weight", "bold")
  .style("font-size", "20px")
  .attr("text-anchor", "start")
  .text("Value");


// Barres
var bars = svg
  .selectAll(".bar")
  .data(data)
  .enter()
  .append("g")
  .attr("class", "g")
  .attr("stroke", "black")
  .style("stroke-width", "1px")
  .style("font-size", "20px")
  .attr("transform", function (d) {
    return "translate(" + x0(d.Category) + ",0)";
  });

bars
  .selectAll("rect")
  .data(function (d) {
    return subCategories.map(function (key) {
      return { key: key, value: d[key] };
    });
  })
  .enter()
  .append("rect")
  .attr("x", function (d) {
    return x1(d.key);
  })
  .attr("y", function (d) {
    return y0(d.value);
  })
  .attr("width", x1.bandwidth())
  .attr("height", function (d) {
    return height - y0(d.value);
  })
  .attr("fill", function (d) {
    return color(d.key);
  });

bars
  .append("text")
  .attr("x", x1.bandwidth() / 2)
  .attr("y", function (d) {
    return y0(d.Total) + 5;
  })
  .attr("dy", ".75em")
  .style("font-size", "20px")
  .text(function (d) {
    return d.Total;
  });

// Légende
var legend = svg
  .selectAll(".legend")
  .data(subCategories.slice().reverse())
  .enter()
  .append("g")
  .attr("class", "legend")
  .style("font-size", "20px")
  .attr("transform", function (d, i) {
    return "translate(0," + i * 20 + ")";
  });

legend
  .append("rect")
  .attr("x", width - 18)
  .attr("width", 18)
  .attr("height", 18)
  .style("fill", color);

legend
  .append("text")
  .attr("x", width - 24)
  .attr("y", 9)
  .attr("dy", ".35em")
  .style("text-anchor", "end")
  .text(function (d) {
    return d;
  });

// Données des zones géographiques
var dataZoneGeo = [
  { ZoneGeo: "Seine-Maritime (outside Metro)", count: 60 },
  { ZoneGeo: "Eure", count: 58 },
  { ZoneGeo: "Métropole Rouen (outside Rouen)", count: 160 },
  { ZoneGeo: "Rouen", count: 119 },
  { ZoneGeo: "Normandie (outside 27 & 76)", count: 27 },
  { ZoneGeo: "Outside Normandie", count: 125 },
];

var colorZg = [
  "#e94a34",
  "#e94a34",
  "#00a5a5",
  "#00a5a5",
  "#fec800",
  "#fec800",
];

var marginZg = { top: 20, right: 30, bottom: 30, left: 60 },
  widthZg = 600,
  heightZg = 400;

var svgZg = d3
  .select("#Mid-rightPanel")
  .append("svg")
  .attr("width", widthZg + marginZg.left + marginZg.right)
  .attr("height", heightZg + marginZg.top + marginZg.bottom)
  .append("g")
  .attr("transform", "translate(" + marginZg.left + "," + marginZg.top + ")");

// Echelle pour l'axe des X
var x = d3
  .scaleBand()
  .range([0, widthZg])
  .domain(
    dataZoneGeo.map(function (d) {
      return d.ZoneGeo;
    })
  )
  .padding(0.1);

// Echelle pour l'axe des Y
var y = d3
  .scaleLinear()
  .range([heightZg, 0])
  .domain([
    0,
    d3.max(dataZoneGeo, function (d) {
      return d.count;
    }),
  ]);

// Axe des X
svgZg
  .append("g")
  .style("font-size", "12px")
  .attr("transform", "translate(0," + heightZg + ")")
  .call(d3.axisBottom(x));

// Axe des Y
svgZg.append("g").call(d3.axisLeft(y));

// Ajout des barres
svgZg
  .selectAll(".bar")
  .data(dataZoneGeo)
  .enter()
  .append("rect")
  .attr("class", "bar")
  .attr("x", function (d) {
    return x(d.ZoneGeo);
  })
  .attr("width", x.bandwidth())
  .attr("y", function (d) {
    return y(d.count);
  })
  .attr("height", function (d) {
    return heightZg - y(d.count);
  })
  .attr("height", function (d) {
    return heightZg - y(d.count);
  })
  .style("fill", function (d, i) {
    return colorZg[i % colorZg.length];
  })
  .attr("stroke", "black")
  .style("stroke-width", "1px");

// Ajout des étiquettes (labels)
svgZg
  .selectAll(".label")
  .data(dataZoneGeo)
  .enter()
  .append("text")
  .attr("class", "label")
  .attr("x", function (d) {
    return x(d.ZoneGeo) + x.bandwidth() / 2;
  })
  .attr("y", function (d) {
    return y(d.count) - 5;
  })
  // Ajustez la position verticale
  .attr("text-anchor", "middle")
  .text(function (d) {
    return d.count;
  })
  .style("fill", "black");

// Ajout des étiquettes (labels) avec rotation
svgZg
  .selectAll(".label")
  .data(dataZoneGeo)
  .enter()
  .append("text")
  .attr("class", "label")
  .attr("x", function (d) {
    return x(d.ZoneGeo) + x.bandwidth() / 2;
  })
  .attr("y", function (d) {
    return y(d.count) + 10; // Ajustement vertical
  })
  .attr("dy", "0.35em") // Ajustement vertical supplémentaire
  .attr("text-anchor", "end") // Alignement à droite
  .attr("transform", function(d) {
    return "rotate(-45 " + (x(d.ZoneGeo) + x.bandwidth() / 2) + "," + (y(d.count) + 10) + ")";
  }) // Rotation de -45 degrés
  .text(function (d) {
    return d.ZoneGeo;
  })
  .style("fill", "black")
  .style("font-size", "20px");