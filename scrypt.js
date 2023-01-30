const ethURL = 'https://ethplorer.io/service/service.php?data=0x2e458d04a349352c0c7613920a7c0d941a112501&page=pageTab%3Dtransfers&showTx=all';
const rxdURL ='https://radiantexplorer.com/ext/getaddress/19qM6izZopGCCTNrm6omh2Gv1uQxiqZEVX';
const coinsCurrency = 'https://api.coinpaprika.com/v1/tickers';
const myCoins = [];
const coinsPrice = [];
const coinName = [];
const coinBalance = [];


function validateText() {
  // Vérifie si le champ de saisie contient uniquement des lettres
  var coinInput = document.getElementById("coinInput");
  var letters = /^[A-Za-z]+$/;
  if(coinInput.value.match(letters)) {
    coinInput.style.borderColor = "green";
  } else {
    coinInput.style.borderColor = "red";
  }
}

function validateNumber() {
  // Vérifie si le champ de saisie contient uniquement des chiffres
  var balanceInput = document.getElementById("balanceInput");
  var numbers = /^[0-9]+.?[0-9]*$/;
  if(balanceInput.value.match(numbers)) {
    balanceInput.style.borderColor = "green";
  } else {
    balanceInput.style.borderColor = "red";
  }
}

function submitForm() {
  // Récupère les anciennes données du localStorage
  var oldData = JSON.parse(localStorage.getItem("data")) || [];
  var coinInput = document.getElementById("coinInput").value;
  var balanceInput = document.getElementById("balanceInput").value;
  if (oldData !== null && document.getElementById("coinInput").value !== "" && document.getElementById("balanceInput").value !== ""){
    var newData = {
      "balance": parseInt(balanceInput),
      "coin": coinInput
    };
    oldData.push(newData);
    localStorage.setItem("data", JSON.stringify(oldData));
  } 
  
  if (oldData == null && document.getElementById("coinInput").value !== "" && document.getElementById("balanceInput").value !== "") {
    var newData = {
      "balance": parseInt(balanceInput),
      "coin": coinInput
    };
    localStorage.setItem("data", JSON.stringify(newData));
  }
  
}



  
var data = JSON.parse(localStorage.getItem("data"));


for (let i = 0; i < data.length; i++) {
      myCoins.push({ "balance": data[i].balance, "coin": data[i].coin });
};
  





 fetch(rxdURL)
  .then(response => response.json())
  .then(eth => {
    myCoins.push(eth.balance);
  }); 

  console.log(myCoins);





/*   const cryptoList = document.getElementById("crypto-list");
  cryptoList.addEventListener("change", (event) => {
  const selectedValue = event.target.value;
  const cryptoInfo = document.getElementById("crypto-info");

  // Récupérer les informations correspondant à la sélection
  const selectedCurrency = allCoins[0].filter(
    (currency) => currency.symbol === selectedValue
  )[0];
  const { id, symbol, quotes } = selectedCurrency;
  const price = quotes.USD.price;

  // Afficher les informations dans le paragraphe
  cryptoInfo.innerText = `${id}: ${symbol} ${price}`;
}); */

fetch(coinsCurrency)
.then(response => response.json())
.then(coins => { 

  for (let i = 0; i < myCoins.length; i++) {
    const selectedCurrency = coins.filter(currency => currency.symbol === myCoins[i].coin);
    if (selectedCurrency) {
      const price = selectedCurrency[0].quotes.USD.price;
      const name = selectedCurrency[0].name;
      const symbol = selectedCurrency[0].symbol;
      const balance_price = myCoins[i].balance * price;
      coinsPrice.push({ "price": price, "symbol": symbol, "name": name, "balance": myCoins[i].balance, "balance_price": balance_price});
      coinBalance.push(coinsPrice[i].balance_price);
      coinName.push(coinsPrice[i].name);
    } else {
      return error;
    }
  }
  
});

var options = {
  stroke: {
    width: 0
  },
  series:  coinBalance,
  labels: coinName, 
  chart: {
    width: 500,
    type: 'donut',

  },
  plotOptions: {
    pie: {
      startAngle: -0,
      endAngle: 360,
    }
  },
  tooltip: {
      shared: true,
      y: {
          formatter: function (val) {
              return val;
          }
      }
  },
  fill: {
    type: 'gradient',
    gradient: {
      shade: 'dark',
      shadeIntensity: 0.5,
      opacityFrom: 1,
      opacityTo: 1,
      stops: [60, 85],
    }
  },
  legend: {
    show: true,

    formatter: function(val, opts) {
      return val + ": " + opts.w.globals.series[opts.seriesIndex]
    },
  },
  title: {
          text: 'Mon Solde total'
  },
  responsive: [{
    breakpoint: 600,
    options: {
      chart: {
        width: 400
      },
      legend: {
        position: 'bottom'
      }
    }
  }]
  
};

var chart = new ApexCharts(document.querySelector("#chart"), options);
chart.render();

function toggleChartValues() {
  var toggleButton = document.getElementById("toggleValues");
  if (toggleButton.innerHTML === "Masquer les valeurs") {
    toggleButton.innerHTML = "Afficher les valeurs";
    chart.updateOptions({
      legend: {
            formatter: undefined,
      },
      tooltip: {
        shared: false,
        y: {
            formatter: function (val) {
                return "****";
            }
        }
    },
    });
  } else {
    toggleButton.innerHTML = "Masquer les valeurs";
    chart.updateOptions({
      legend: {
        formatter: function(val, opts) {
          return val + ": " + opts.w.globals.series[opts.seriesIndex]
        }
      },
      tooltip: {

        shared: true,
        y: {
            formatter: function (val) {
                return val;
            }
        }
    },
    });
  }
}