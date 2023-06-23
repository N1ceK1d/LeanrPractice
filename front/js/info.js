let employeesCount = document.querySelector(".emp-count");
let devCount = document.querySelector(".dev-count");
let midAge = document.querySelector(".mid-age");
let midTime = document.querySelector(".mid-time");

function loadData() {
	let res = []
	fetch("http://localhost:4444/api/v1/company/employees")
	.then(response => response.json())
    .then(data => res.push(data));
	return res;
}
let emp = loadData()
//loadData().then(res => emp.push(res));

setTimeout(() => {
	let emps = [];
	let devs = [];
	let ages = [];
	let works = [];
	for (let i of emp[0]) {
		
		emps.push(i);
		if (i.position == 'Разработчик') {
			devs.push(i);
		}
		ages.push(getYearValue(i.birthdate));
		works.push(getYearValue(i.hireDate));
	}
	employeesCount.textContent = emps.length;
	devCount.textContent = devs.length;
	midAge.textContent = getAverage(ages);
	midTime.textContent = getAverage(works);
	//console.log(emp);
}, 300);


function getYearValue(date) {
    let d = new Date(date);
    let c = new Date();
    
    return c.getFullYear() - d.getFullYear();
}

function getAverage(arr) {
	const sum = arr.reduce((a, b) => a + b, 0);
	const avg = (sum / arr.length) || 0;
	return avg.toFixed(1);
}