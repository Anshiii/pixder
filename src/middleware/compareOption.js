/**
 * Created by Anshi on 2017/7/18.
 */
module.exports = function (option, info) {
  if (!option || !info || (typeof option) !== 'object') {
	return true
  }
  let result = true;

  for (let i in option) {
	switch (i) {
	  case 'rate':
		if (parseInt(option.rate) > parseInt(info.rate)) {
		  result = false
		}
		break;
	  case 'day':
		if (option.day != info.day) {
		  result = false
		}
		break;
	  case 'time':
		if (typeof option.time === 'object') {
		  let min, max;
		  if (option.time[0] > option.time[1]) {
			min = option.time[1];
			max = option.time[0];
		  } else {
			min = option.time[0];
			max = option.time[1];
		  }
		  if (!(parseInt(min) < parseInt(info.time) && parseInt(info.time) < parseInt(max))) {
			result = false
		  }
		}
	}
  }
  return result;
}