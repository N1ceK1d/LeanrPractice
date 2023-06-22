let chartDom = document.querySelector('.main');
let genders = [];
let male = 0;
let female = 0;


loadData().then(data => data.map(item => genders.push(item)));

let myChart = echarts.init(chartDom);

setTimeout(() => {
    for (let i in genders)
    {
        if(genders[i] == 'Мужской') {
            male += 1;
        } else {
            female += 1;
        }
    }

    option = {
        backgroundColor: 'transparent',
	    title: {
	    	padding: 10,
	    	text: "Пол сотрудников",
	    	left: 'center',
	    },
        tooltip: {
	    	trigger: 'axis',
	    	axisPointer: {
	    	type: 'shadow'
	    	},
	    	backgroundColor: '#1D1AB2',
	    },
        
        xAxis: {
          type: 'category',
          data: ['Мужской', 'Женский']
        },
        yAxis: {
          type: 'value'
        },
        series: [
            {
              data: [
                {
                    value: male,
                    itemStyle: {
                      color: '#1D1AB2'
                    }
                },
                {
                value: female,
                itemStyle: {
                  color: '#E439A1'
                }
              },],
              type: 'bar'
            }
        ]
    };
    
    // устанавливаем для экземпляра диаграммы опции
    option && myChart.setOption(option);
}, 300)


async function loadData() {
    let res = [];

    await fetch("http://localhost:4444/api/v1/company/employees") 
    .then(response => response.json())
    .then(data => data.map(
        (item) => {
            res.push(item.gender)
        }
    ));
    //console.log(res);

    return res;
}