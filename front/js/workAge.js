let chartDom = document.querySelector('.main');

let ages = [];
loadData().then(data => data.map(item => ages.push(item)));

let myChart = echarts.init(chartDom);

let ranges = {
    "3 года" : [],
    '4 года' : [],
    '5 лет' : [], 
    '6 лет' : [], 
    '> 6 лет' : [],
}

setTimeout(() => {
    ages.forEach((age) => {
    
        if(age <= 3) {
            ranges["3 года"].push(age);
        } else if (age == 4) {
            ranges["4 года"].push(age);
        } else if (age == 5) {
            ranges["5 лет"].push(age);
        } else if (age == 6) {
            ranges["6 лет"].push(age);
        } else if (age >= 6) {
            ranges["> 6 лет"].push(age);
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
		text: "Стаж работы",
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
          data: ['3 года', '4 год', '5 лет', '6 лет', '> 6 лет']
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
            res.push(getYearValue(item.hireDate))
        }
    ));
    console.log(res);

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