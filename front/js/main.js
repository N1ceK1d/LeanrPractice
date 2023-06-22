let chartDom = document.querySelector('.main');

// инициализируем диаграмму
let myChart = echarts.init(chartDom);

// задаем опции диаграммы
let option = {
	// в моем случае нужно было поставить прозрачный фон из-за темной темы страницы
	backgroundColor: 'transparent',
	//// всплывающее окно при наведении
  	tooltip: {
		trigger: 'axis',
		axisPointer: {
		type: 'shadow'
		},
	},
	//	// фон окна
	backgroundColor: '#272b30',
	// xAxis - определяет, что будет отображаться на оси X диаграммы
  	xAxis: {
		// в данном случае категория
    type: 'category',
		// определены данные для подписи оси
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
	// xAxis - определяет, что будет отображаться на оси Y диаграммы
  	yAxis: {
		// в данном случае значение
    type: 'value'
  },
  	series: [
    {
			// а вот и сами данные диаграммы, таким образом
			// каждое значение соответствует своей категории Mon - 120, Tue - 200 и т.д.
      data: [120, 200, 150, 80, 70, 110, 130],
      type: 'bar'
    }
  ]
};

// устанавливаем для экземпляра диаграммы опции
option && myChart.setOption(option);