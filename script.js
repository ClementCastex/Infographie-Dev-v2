/***********************/
// Data Graph et Barre Top//
/***************************/
const dataPie = [
  { nom: "Services", value: 68 },
  { nom: "Retail", value: 17 },
  { nom: "Industry", value: 8 },
  { nom: "Administration", value: 4 },
  { nom: "Construction", value: 3 },
  { nom: "Farming", value: 1 },
];

var dataCourbe = [
  { nombre: "Apprentice 2020", sales: 95 },
  { nombre: "Apprentice 2021", sales: 80 },
  { nombre: "Apprentice 2022", sales: 103 },
  { nombre: "Apprentice 2023", sales: 103 },
];

/***********************/
// Couleur Top//
/************************/

// Couleurs Graphique

const colorsPie = [
  "#e94a34",
  "#038185",
  "#00a5a5",
  "#f6a200",
  "#fec800",
  "#620092",
];

// Couleur des Barres

const colorsCourbe = ["#00a5a5", "#fec800", "#e94a34", "#e94a34"];
const colorsStackedBar = [
  "#98abc5",
  "#8a89a6",
  "#7b6888",
  "#6b486b",
  "#a05d56",
];

/**************************/
// Config des 2 Graph Top //
/**************************/

var width = 500;
var height = 400;
var marginLeft = 80;
var widthCourbe = 600;
var heightCourbe = 400;

/***********************/
// Build Graphique  Top//
/************************/

// Graphique Pie
const svgPie = d3
  .select("#leftPanel")
  .append("svg")
  .attr("width", width)
  .attr("height", height)
  .attr("stroke", "white")
  .style("stroke-width", "2px");

const radius = Math.min(width, height) / 2;
const colorScalePie = d3
  .scaleOrdinal()
  .domain(dataPie.map((d) => d.nom))
  .range(colorsPie);

const pie = d3.pie().value((d) => d.value);

const arc = d3.arc().innerRadius(0).outerRadius(radius);

const arcsPie = svgPie
  .selectAll("arc")
  .data(pie(dataPie))
  .enter()
  .append("g")
  .attr("class", "arc")
  .attr("transform", `translate(${width / 2}, ${height / 2})`);

arcsPie
  .append("path")
  .attr("d", arc)
  .attr("fill", (d) => colorScalePie(d.data.nom));

// Légende Graphique Pie
const legendPie = svgPie
  .selectAll(".legend")
  .data(dataPie.map((d) => ({ nom: d.nom, value: d.value })))
  .enter()
  .append("g")
  .attr("class", "legend")
  .attr("transform", (d, i) => `translate(0,${i * 20})`);

legendPie
  .append("circle")
  .attr("cx", 50)
  .attr("cy", 280)
  .attr("r", 8)
  .style("fill", (d) => colorScalePie(d.nom));

legendPie
  .append("text")
  .attr("x", 50)
  .attr("y", 280)
  .attr("dy", ".35em")
  .attr("dx", "1em")
  .style("text-anchor", "start")
  .style("font-size", "20px")
  .attr("stroke", "black")
  .style("stroke-width", "1px")
  .style("font-size", "20px")
  .text((d) => `${d.nom} (${d.value}%)`);

// Création de l'échelle pour l'axe des x
var xScaleCourbe = d3
  .scaleBand()
  .domain(
    dataCourbe.map(function (d) {
      return d.nombre;
    })
  )
  .range([50, 600]);
// Création de l'échelle pour l'axe des y
var yScaleCourbe = d3
  .scaleLinear()
  .domain([
    0,
    d3.max(dataCourbe, function (d) {
      return d.sales;
    }),
  ])
  .nice()
  .range([400, 20]);

// Création de la ligne en utilisant les échelles
var lineCourbe = d3
  .line()
  .x(function (d) {
    return xScaleCourbe(d.nombre) + xScaleCourbe.bandwidth() / 2;
  })
  .y(function (d) {
    return yScaleCourbe(d.sales);
  });

// Création de l'élément SVG
var svgCourbe = d3
  .select("#rightPanel")
  .append("svg")
  .attr("width", 600)
  .attr("height", 500);

// Ajout de la courbe à l'élément SVG
svgCourbe
  .append("path")
  .datum(dataCourbe)
  .attr("fill", "none")
  .attr("stroke", "#e94a34")
  .attr("stroke-width", 7)
  .attr("d", lineCourbe);

// Création de l'axe des x
var xAxis = d3.axisBottom().scale(xScaleCourbe);

// Création de l'axe des y
var yAxis = d3.axisLeft().scale(yScaleCourbe);

// Ajout de l'axe des x à l'élément SVG
svgCourbe
  .append("g")
  .attr("transform", "translate(0," + 400 + ")")
  .call(xAxis)
  .selectAll("text")
  .style("text-anchor", "end")
  .attr("dx", "-.8em")
  .attr("dy", ".15em")
  .attr("transform", "rotate(-35)")
  .style("font-size", "16px");

// Ajout de l'axe des y à l'élément SVG
svgCourbe
  .append("g")
  .attr("transform", "translate(50, 0)")
  .style("font-size", "20px")
  .call(yAxis);
