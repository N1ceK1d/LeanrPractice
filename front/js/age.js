let chartDom = document.querySelector('.main');

let ages = [];
loadData().then(data => data.map(item => ages.push(item)));

let myChart = echarts.init(chartDom);

let ranges = {
    "18-20" : [],
    '20-22' : [],
    '22-24' : [], 
    '24-26' : [], 
    '26-28' : [], 
    '28-30' : [], 
    '30-35' : [], 
    '35-40' : [], 
    '40-45' : [], 
    '45-50' : [], 
    '50-55' : [],
    '>55' : []
}


setTimeout(() => {
    ages.forEach((age) => {
    
        if(age >= 18 && age <= 20) {
            ranges["18-20"].push(age);
        } else if (age >= 20 && age <= 22) {
            ranges["20-22"].push(age);
        } else if (age >= 22 && age <= 24) {
            ranges["22-24"].push(age);
        } else if (age >= 24 && age <= 26) {
            ranges["24-26"].push(age);
        } else if (age >= 26 && age <= 28) {
            ranges["26-28"].push(age);
        } else if (age >= 28 && age <= 30) {
            ranges["28-30"].push(age);
        } else if (age >= 30 && age <= 35) {
            ranges["30-35"].push(age);
        } else if (age >= 35 && age <= 40) {
            ranges["35-40"].push(age);
        } else if (age >= 40 && age <= 45) {
            ranges["40-45"].push(age);
        } else if (age >= 45 && age <= 50) {
            ranges["45-50"].push(age);
        } else if (age >= 50 && age <= 55) {
            ranges["50-55"].push(age);
        } else if (age >= 55) {
            ranges[">55"].push(age);
        }
    })

    let result = [];

    for (let i of Object.keys(ranges)) {
        result.push(ranges[i].length);
    }
    

    option = {
        backgroundColor: 'transparent',
	// заголовок диаграммы
	title: {
		padding: 10,
		text: "Возраст сотрудников",
		left: 'center',
	},
	// всплывающее окно при наведении
    tooltip: {
	    	trigger: 'axis',
	    	axisPointer: {
	    	type: 'shadow'
	    	},
	    	// фон окна
	    	backgroundColor: '#272b30',
	    	// изменение цвета текста, переменная textColor = { color: 'white' }
        
	    },
        
        xAxis: {
          type: 'category',
          data: ['18-20', '20-22', '22-24', '24-26', '26-28', '28-30', '30-35', '40-45', '45-50', '>50']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: result,
            type: 'bar'
          }
        ]
      };
    
    option && myChart.setOption(option);
    //console.log(ranges);
}, 300)


async function loadData() {
    let res = [];

    await fetch("http://localhost:4444/api/v1/company/employees") 
    .then(response => response.json())
    .then(data => data.map(
        (item) => {
            res.push(getYearValue(item.birthdate))
        }
    ));
    //console.log(res);

    return res;
}

function getYearValue(date) {
    let d = new Date(date);
    let c = new Date();
    
    return c.getFullYear() - d.getFullYear();
}

function sum(arr) {
    let count = 0;

    for (let i of arr) {
        count += 1;
    }

    return count;
}