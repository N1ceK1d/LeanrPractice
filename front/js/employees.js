let chartDom = document.querySelector('.main');

let myChart = echarts.init(chartDom);
let employees = [];
let years = [];
let employeesCount = [];

loadData().then(res => employees.push(res));//projects.push(res));

setTimeout(() => {
    for (let item of employees[0]) {
        console.log(item);
        years.push(item.year);
        employeesCount.push(item.employees);
    }
    console.log(years);
    option = {
        backgroundColor: 'transparent',
	    title: {
	    	padding: 10,
	    	text: "Количество сотрудников",
	    	left: 'center',
	    },
        tooltip: {
	    	trigger: 'axis',
	    	axisPointer: {
	    	type: 'shadow'
	    	},
	    	backgroundColor: '#272b30',
	    	
	    },
        xAxis: [
            {
              type: 'category',
              axisTick: { show: false },
              data: years
            }
          ],
          yAxis: [
            {
              type: 'value'
            }
          ],
          series: [
            {
                name: 'сотрудники',
                type: 'line',
                stack: 'Total',
                data: employeesCount
              },
          ]
      };
    
    option && myChart.setOption(option);
}, 300);

async function loadData() {
    let res = [];
    await fetch("http://localhost:4444/api/v1/company/statistic") 
    .then(response => response.json())
    .then(data => data.map(
        (item) => {
            res.push(item)
        }
    ));
    console.log(res);
    return res;
}