const rollNos = ['rollNo1', 'rollNo2', 'rollNo3'];
const rollNosString = rollNos.join(',');

console.log(rollNosString);
const url = `/downloadDMC?rollNos=${rollNosString}`;


console.log(url);


