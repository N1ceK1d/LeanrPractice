let chartDom = document.querySelector('.main');

let myChart = echarts.init(chartDom);
let profits = [];
let years = [];
let profitsCount = [];

loadData().then(res => profits.push(res));//projects.push(res));

setTimeout(() => {
    for (let item of profits[0]) {
        years.push(item.year);
        profitsCount.push(item.revenue - item.expenses);
    }
    option = {
        backgroundColor: 'transparent',
	    title: {
	    	padding: 10,
	    	text: "Прибыль по годам",
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
                name: 'Прибыль',
                type: 'line',
                stack: 'Total',
                data: profitsCount
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
    return res;
}