const API_KEY = "869a754e-eeab-4d2a-88cf-d78e5126e108";

const currency = "BTC"; // le code de la crypto-monnaie, par exemple BTC pour Bitcoin

const headers = new Headers();
headers.append("X-CMC_PRO_API_KEY", API_KEY);

fetch(`https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?limit=5000`, { headers })
  .then(response => response.json())
console.log(response.json);
      
        var options = {
          series: [44, 55, 41, 17, 15, 8, 100, 85],
          chart: {
          width: 500,
          type: 'donut',
        },
        plotOptions: {
          pie: {
            startAngle: -90,
            endAngle: 270
          }
        },
        dataLabels: {
          enabled: false
        },
        fill: {
          type: 'gradient',
        },
        legend: {
          formatter: function(val, opts) {
            return val + " - " + opts.w.globals.series[opts.seriesIndex]
          }
        },
        title: {
          text: 'Mon Solde total'
        },
        responsive: [{
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: 'bottom'
            }
          }
        }]
        };

        var chart = new ApexCharts(document.querySelector("#chart"), options);
        chart.render();