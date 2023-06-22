let chartDom = document.querySelector('.main');

let myChart = echarts.init(chartDom);

let projects = [];

let months = [];

loadData().then(res => projects.push(res[0]));//projects.push(res));

setTimeout(() => {

    console.log(projects[0])

    option = {
        backgroundColor: 'transparent',
	    title: {
	    	padding: 10,
	    	text: "Возраст сотрудников",
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
              data: ['Forest', 'Steppe', 'Desert', 'Wetland']
            }
          ],
          yAxis: [
            {
              type: 'value'
            }
          ],
          series: [
            {
                name: 'Forest',
                type: 'bar',
                barGap: 0,
                emphasis: {
                  focus: 'series'
                },
                data: [320, 332, 301, 334, 390]
              },
              {
                name: 'Steppe',
                type: 'bar',
                emphasis: {
                  focus: 'series'
                },
                data: [220, 182, 191, 234, 290]
              },
              {
                name: 'Desert',
                type: 'bar',
                emphasis: {
                  focus: 'series'
                },
                data: [150, 232, 201, 154, 190]
              },
              {
                name: 'Wetland',
                type: 'bar',
                emphasis: {
                  focus: 'series'
                },
                data: [98, 77, 101, 99, 40]
              }
          ]
      };
    
    option && myChart.setOption(option);
}, 300);

async function loadData() {
    let res = [];
    await fetch("http://localhost:4444/api/v1/projects/year") 
    .then(response => response.json())
    .then(data => data.map(
        (item) => {
            res.push(item.currentYear)
        }
    ));
    console.log(res);
    return res;
}