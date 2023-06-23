let chartDom = document.querySelector('.main');

let myChart = echarts.init(chartDom);

let projects = [];
let types = [];
let months = [];
let projectsCount = {
  "Разработка" : [],
  "Сопровождение" : [],
  "Консультации и обучение" : [],
  "Другое" : []
}

loadData().then(res => projects.push(res[0]));//projects.push(res));

setTimeout(() => {

    for(let item of projects[0]) {
      if(item.type == 'Разработка') {
        projectsCount["Разработка"].push(item.count);
      } else if (item.type == 'Сопровождение') {
        projectsCount["Сопровождение"].push(item.count);
      } else if (item.type == 'Консультации и обучение') {
        projectsCount["Консультации и обучение"].push(item.count);
      } else if (item.type == 'Другое') {
        projectsCount["Другое"].push(item.count);
      }
      months.push(item.month);
    }

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
              data: ['Январь', 'Февраль', 'Март',  'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь',] 
            }
          ],
          yAxis: [
            {
              type: 'value'
            }
          ],
          series: [
            {
                name: 'Разработка',
                type: 'line',
                barGap: 0,
                emphasis: {
                  focus: 'series'
                },
                data: projectsCount['Разработка']
              },
              {
                name: 'Сопровождение',
                type: 'line',
                emphasis: {
                  focus: 'series'
                },
                data: projectsCount['Сопровождение']
              },
              {
                name: 'Консультации и обучение',
                type: 'line',
                emphasis: {
                  focus: 'series'
                },
                data: projectsCount['Консультации и обучение']
              },
              {
                name: 'Другое',
                type: 'line',
                emphasis: {
                  focus: 'series'
                },
                data: projectsCount['Другое']
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
    return res;
}