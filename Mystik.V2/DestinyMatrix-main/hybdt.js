!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):a("object"==typeof exports?require("jquery"):jQuery)}(function(a){var b,c=navigator.userAgent,d=/iphone/i.test(c),e=/chrome/i.test(c),f=/android/i.test(c);a.mask={definitions:{9:"[0-9]",a:"[A-Za-z]","*":"[A-Za-z0-9]"},autoclear:!0,dataName:"rawMaskFn",placeholder:"_"},a.fn.extend({caret:function(a,b){var c;if(0!==this.length&&!this.is(":hidden"))return"number"==typeof a?(b="number"==typeof b?b:a,this.each(function(){this.setSelectionRange?this.setSelectionRange(a,b):this.createTextRange&&(c=this.createTextRange(),c.collapse(!0),c.moveEnd("character",b),c.moveStart("character",a),c.select())})):(this[0].setSelectionRange?(a=this[0].selectionStart,b=this[0].selectionEnd):document.selection&&document.selection.createRange&&(c=document.selection.createRange(),a=0-c.duplicate().moveStart("character",-1e5),b=a+c.text.length),{begin:a,end:b})},unmask:function(){return this.trigger("unmask")},mask:function(c,g){var h,i,j,k,l,m,n,o;if(!c&&this.length>0){h=a(this[0]);var p=h.data(a.mask.dataName);return p?p():void 0}return g=a.extend({autoclear:a.mask.autoclear,placeholder:a.mask.placeholder,completed:null},g),i=a.mask.definitions,j=[],k=n=c.length,l=null,a.each(c.split(""),function(a,b){"?"==b?(n--,k=a):i[b]?(j.push(new RegExp(i[b])),null===l&&(l=j.length-1),k>a&&(m=j.length-1)):j.push(null)}),this.trigger("unmask").each(function(){function h(){if(g.completed){for(var a=l;m>=a;a++)if(j[a]&&C[a]===p(a))return;g.completed.call(B)}}function p(a){return g.placeholder.charAt(a<g.placeholder.length?a:0)}function q(a){for(;++a<n&&!j[a];);return a}function r(a){for(;--a>=0&&!j[a];);return a}function s(a,b){var c,d;if(!(0>a)){for(c=a,d=q(b);n>c;c++)if(j[c]){if(!(n>d&&j[c].test(C[d])))break;C[c]=C[d],C[d]=p(d),d=q(d)}z(),B.caret(Math.max(l,a))}}function t(a){var b,c,d,e;for(b=a,c=p(a);n>b;b++)if(j[b]){if(d=q(b),e=C[b],C[b]=c,!(n>d&&j[d].test(e)))break;c=e}}function u(){var a=B.val(),b=B.caret();if(o&&o.length&&o.length>a.length){for(A(!0);b.begin>0&&!j[b.begin-1];)b.begin--;if(0===b.begin)for(;b.begin<l&&!j[b.begin];)b.begin++;B.caret(b.begin,b.begin)}else{for(A(!0);b.begin<n&&!j[b.begin];)b.begin++;B.caret(b.begin,b.begin)}h()}function v(){A(),B.val()!=E&&B.change()}function w(a){if(!B.prop("readonly")){var b,c,e,f=a.which||a.keyCode;o=B.val(),8===f||46===f||d&&127===f?(b=B.caret(),c=b.begin,e=b.end,e-c===0&&(c=46!==f?r(c):e=q(c-1),e=46===f?q(e):e),y(c,e),s(c,e-1),a.preventDefault()):13===f?v.call(this,a):27===f&&(B.val(E),B.caret(0,A()),a.preventDefault())}}function x(b){if(!B.prop("readonly")){var c,d,e,g=b.which||b.keyCode,i=B.caret();if(!(b.ctrlKey||b.altKey||b.metaKey||32>g)&&g&&13!==g){if(i.end-i.begin!==0&&(y(i.begin,i.end),s(i.begin,i.end-1)),c=q(i.begin-1),n>c&&(d=String.fromCharCode(g),j[c].test(d))){if(t(c),C[c]=d,z(),e=q(c),f){var k=function(){a.proxy(a.fn.caret,B,e)()};setTimeout(k,0)}else B.caret(e);i.begin<=m&&h()}b.preventDefault()}}}function y(a,b){var c;for(c=a;b>c&&n>c;c++)j[c]&&(C[c]=p(c))}function z(){B.val(C.join(""))}function A(a){var b,c,d,e=B.val(),f=-1;for(b=0,d=0;n>b;b++)if(j[b]){for(C[b]=p(b);d++<e.length;)if(c=e.charAt(d-1),j[b].test(c)){C[b]=c,f=b;break}if(d>e.length){y(b+1,n);break}}else C[b]===e.charAt(d)&&d++,k>b&&(f=b);return a?z():k>f+1?g.autoclear||C.join("")===D?(B.val()&&B.val(""),y(0,n)):z():(z(),B.val(B.val().substring(0,f+1))),k?b:l}var B=a(this),C=a.map(c.split(""),function(a,b){return"?"!=a?i[a]?p(b):a:void 0}),D=C.join(""),E=B.val();B.data(a.mask.dataName,function(){return a.map(C,function(a,b){return j[b]&&a!=p(b)?a:null}).join("")}),B.one("unmask",function(){B.off(".mask").removeData(a.mask.dataName)}).on("focus.mask",function(){if(!B.prop("readonly")){clearTimeout(b);var a;E=B.val(),a=A(),b=setTimeout(function(){B.get(0)===document.activeElement&&(z(),a==c.replace("?","").length?B.caret(0,a):B.caret(a))},10)}}).on("blur.mask",v).on("keydown.mask",w).on("keypress.mask",x).on("input.mask paste.mask",function(){B.prop("readonly")||setTimeout(function(){var a=A(!0);B.caret(a),h()},0)}),e&&f&&B.off("input.mask").on("input.mask",u),A()})}})});
jQuery('.inputs-header-date').mask('99.99.9999');
const calculateButton=document.querySelector('#calculate_button');
const nameInput=document.querySelector('#name');
const dateInput=document.querySelector('#date');
const womanGenderButton=document.querySelector('#woman');
const manGenderButton=document.querySelector('#man');
calculateButton.addEventListener('click', (event)=> {
if(nameInput.value.length===0){
nameInput.value='Аноним'
}
let brthdayArray=dateInput.value.split('.');
let aeNumber=date.getFullYear() - parseInt(brthdayArray[2]);
let aeMonths=parseInt(brthdayArray[1]);
let aeDays=parseInt(brthdayArray[0]);
let ageMonthss=date.getMonth() + 1 - aeMonths;
let ageDayss=date.getDate() - aeDays;
if(aeNumber < 0||aeNumber > 79){
alert('Согласно Матрице Судьбы, Вы должны быть младше 80 лет. \n Введите корректно год рождения!');
event.preventDefault();
}
if(aeNumber==0&&ageMonthss==0&&ageDayss < 0){
alert('Вы ввели будущее время. \n Введите корректно дату!');
event.preventDefault();
}
if(aeNumber==0&&ageMonthss < 0){
alert('Вы ввели будущее время. \n Введите корректно дату!');
event.preventDefault();
}
if(aeMonths < 1||aeMonths > 12){
alert('Введите корректно Месяц!');
event.preventDefault();
}
if(aeDays < 1||aeDays > 31){
alert('Введите корректно День!');
event.preventDefault();
}
if(dateInput.value.length===0){
alert('Заполните поле Даты!');
event.preventDefault();
}else if(dateInput.value.split('-').reverse().join('.').split('.').length!==3){
alert('Заполните дату в формате "дд.мм.гггг"');
event.preventDefault();
}
const gender=document.querySelector('.active-gender').innerHTML;
if(dateInput.value.split('-').reverse().join('.').split('.').length===3){
localStorage['name']=nameInput.value;
localStorage['date']=dateInput.value.split('-').reverse().join('.').toString();
localStorage['gender']=gender;
}})
womanGenderButton.addEventListener('click', ()=> {
womanGenderButton.style.opacity='0';
manGenderButton.style.opacity='1';
womanGenderButton.classList.remove('active-gender');
manGenderButton.classList.add('active-gender');
})
manGenderButton.addEventListener('click', ()=> {
manGenderButton.style.opacity='0';
womanGenderButton.style.opacity='1';
manGenderButton.classList.remove('active-gender');
womanGenderButton.classList.add('active-gender');
})
let acc=document.getElementsByClassName("accordion");
let accActive=document.getElementsByClassName('active');
let i;
for (i=0; i < acc.length; i++){
acc[i].addEventListener("click", function (){
if(this.classList.contains('blocked')){
}else{
this.classList.toggle("active");
let panel=this.nextElementSibling;
if(panel.style.maxHeight){
panel.style.maxHeight=null;
}else{
panel.style.maxHeight=panel.scrollHeight + "px";
}}
});
}
window.addEventListener('resize', function(){
for (i=0; i < accActive.length; i++){
if(accActive[i].classList.contains("active")){
let panel=accActive[i].nextElementSibling;
panel.style.maxHeight=panel.scrollHeight + "px";
}}
});
jQuery('#matrix-select').change(function(){
jQuery('#imgmatrix').attr('src', jQuery('#matrix-select').val());
});
const birthdayText=document.querySelector('#birthday');
const birthday=localStorage['date'];
const nameUser=document.querySelector('#name_text');
const gender=localStorage['gender'];
const defbirthday='11.11.2000';
if(birthday==undefined){
jQuery('#tarif-sec').hide();
jQuery('#sudiba').hide();
jQuery('#matrisa').hide();
}else{
jQuery('#tarif-sec').show();
jQuery('#sudiba').show();
jQuery('#matrisa').show();
}
document.addEventListener('DOMContentLoaded', function(){
nameUser.innerHTML=localStorage['name'];
birthdayText.innerHTML=birthday;
});
let user=navigator.userAgent.toString();
let allRows=document.querySelectorAll('.rectangle-tr');
let allRowsArray=Array.from(allRows);
if(user.includes('Mac')||user.includes('Macintosh')){
for (let i=0; i < allRowsArray.length; i++){
allRowsArray[i].classList.add('rectangle-tr-active');
}}
let birthdayArray=new Array();
if(birthday!=undefined){
birthdayArray=birthday.split('.');
}else{
birthdayArray[0]=11;
birthdayArray[1]=11;
birthdayArray[2]=2011;
}
let A=parseInt(calculation(birthdayArray[0]));
let B=parseInt(calculation(birthdayArray[1]));
let C=parseInt(calculation(birthdayArray[2]));
function calculation(number){
let sumNumber=number.toString().split('').reduce((previousValue, currentValue)=> +previousValue + +currentValue);
while(parseInt(number) > 22||sumNumber > 22){
number=number.toString().split('').reduce((previousValue, currentValue)=> +previousValue + +currentValue);
if(parseInt(number) > 22){
number=number.toString().split('').reduce((previousValue, currentValue)=> +previousValue + +currentValue);
}
return number;
}
return number
}
const date=new Date();
const age=document.querySelector('#age');
let ageMonths=date.getMonth() - parseInt(B) + 1;
let ageDays=date.getDate() - birthdayArray[0];
let ageNumber=date.getFullYear() - parseInt(birthdayArray[2]);
if(ageMonths <=0&&ageDays < 0){
ageNumber -=1;
}
console.log(ageDays)
age.innerHTML=ageNumber.toString();
let D=calculation(A+B+C);
let K1=calculation(D+C);
const firstChakraItemOne=document.querySelector('#D');
firstChakraItemOne.innerHTML=(D).toString();
const firstChakraItemTwo=document.querySelector('#C');
firstChakraItemTwo.innerHTML=(C).toString();
const firstChakraItemThree=document.querySelector('#K1');
firstChakraItemThree.innerHTML=(K1).toString();
let X=calculation(A+B+C+D);
let D2=calculation(D+X);
let D1=calculation(D+D2);
let C2=calculation(C+X);
let C1=calculation(C+C2);
let K2=calculation(D2+C2);
const secondChakraItemOne=document.querySelector('#D1');
secondChakraItemOne.innerHTML=(D2).toString();
const secondChakraItemTwo=document.querySelector('#C1');
secondChakraItemTwo.innerHTML=(C2).toString();
const secondChakraItemThree=document.querySelector('#K2');
secondChakraItemThree.innerHTML=(K2).toString();
let K3=calculation(X+X);
const thirdChakraItemOne=document.querySelector('#X');
thirdChakraItemOne.innerHTML=(X).toString();
const thirdChakraItemTwo=document.querySelector('#X_2');
thirdChakraItemTwo.innerHTML=(X).toString();
const thirdChakraItemThree=document.querySelector('#K3');
thirdChakraItemThree.innerHTML=(K3).toString();
let B2=calculation(B+X);
let B3=calculation(B2+X);
let A2=calculation(A+X);
let A3=calculation(A2+X);
let K4=calculation(B3+A3);
const fourthChakraItemOne=document.querySelector('#B3');
fourthChakraItemOne.innerHTML=(B3).toString();
const fourthChakraItemTwo=document.querySelector('#A3');
fourthChakraItemTwo.innerHTML=(A3).toString();
const fourthChakraItemThree=document.querySelector('#K4');
fourthChakraItemThree.innerHTML=(K4).toString();
let K5=calculation(B2+A2);
const fifthChakraItemOne=document.querySelector('#B2');
fifthChakraItemOne.innerHTML=(B2).toString();
const fifthChakraItemTwo=document.querySelector('#A2');
fifthChakraItemTwo.innerHTML=(A2).toString();
const fifthChakraItemThree=document.querySelector('#K5');
fifthChakraItemThree.innerHTML=(K5).toString();
let B1=calculation(B+B2);
let A1=calculation(A+A2);
let K6=calculation(B1+A1);
const sixthChakraItemOne=document.querySelector('#B1');
sixthChakraItemOne.innerHTML=(B1).toString();
const sixthChakraItemTwo=document.querySelector('#A1');
sixthChakraItemTwo.innerHTML=(A1).toString();
const sixthChakraItemThree=document.querySelector('#K6');
sixthChakraItemThree.innerHTML=(K6).toString();
let E=calculation(A+B);
const seventhChakraItemOne=document.querySelector('#B');
seventhChakraItemOne.innerHTML=(B).toString();
const seventhChakraItemTwo=document.querySelector('#A');
seventhChakraItemTwo.innerHTML=(A).toString();
const seventhChakraItemThree=document.querySelector('#E');
seventhChakraItemThree.innerHTML=(E).toString();
let T1=calculation(D+D2+B3+X+B1+B2+B);
let T2=calculation(A+A1+A2+A3+X+C2+C);
let T3=calculation(E+K6+K5+K4+K3+K2+K1);
const lastChakraItemOne=document.querySelector('#T1');
lastChakraItemOne.innerHTML=(T1).toString();
const lastChakraItemTwo=document.querySelector('#T2');
lastChakraItemTwo.innerHTML=(T2).toString();
const lastChakraItemThree=document.querySelector('#T3');
lastChakraItemThree.innerHTML=(T3).toString();
let LN=calculation(B+D);
let LZ=calculation(A+C);
let LP1=calculation(LN+LZ);
const privateItemOne=document.querySelector('#LN');
privateItemOne.innerHTML=(LN).toString();
const privateItemTwo=document.querySelector('#LZ');
privateItemTwo.innerHTML=(LZ).toString();
const privateItemThree=document.querySelector('#LP1');
privateItemThree.innerHTML=(LP1).toString();
let G=calculation(C+D);
let F=calculation(B+C);
let H=calculation(D+A);
let LO=calculation(E+G);
let LM=calculation(F+H);
let Y=calculation(E+F+G+H);
const socialItemOne=document.querySelector('#LO');
socialItemOne.innerHTML=(LO).toString();
const socialItemTwo=document.querySelector('#LM');
socialItemTwo.innerHTML=(LM).toString();
const socialItemThree=document.querySelector('#Y');
socialItemThree.innerHTML=(Y).toString();
let LP3=calculation(LP1+Y)
const spiritItemOne=document.querySelector('#LP1_2');
spiritItemOne.innerHTML=(LP1).toString();
const spiritItemTwo=document.querySelector('#Y_2');
spiritItemTwo.innerHTML=(Y).toString();
const spiritItemThree=document.querySelector('#LP3');
spiritItemThree.innerHTML=(LP3).toString();
const manItemOne=document.querySelector('#E_man');
manItemOne.innerHTML=(E).toString();
const manItemTwo=document.querySelector('#G_man');
manItemTwo.innerHTML=(G).toString();
const manItemThree=document.querySelector('#X_man');
manItemThree.innerHTML=(X).toString();
const womanItemOne=document.querySelector('#F_woman');
womanItemOne.innerHTML=(F).toString();
const womanItemTwo=document.querySelector('#H_woman');
womanItemTwo.innerHTML=(H).toString();
const womanItemThree=document.querySelector('#X_woman');
womanItemThree.innerHTML=(X).toString();
const diagramItemOne=document.querySelector('#B_diagram');
diagramItemOne.innerHTML=(B).toString();
const diagramItemTwo=document.querySelector('#E_diagram');
diagramItemTwo.innerHTML=(E).toString();
const diagramItemThree=document.querySelector('#F_diagram');
diagramItemThree.innerHTML=(F).toString();
const diagramItemFourth=document.querySelector('#A_diagram');
diagramItemFourth.innerHTML=(A).toString();
const diagramItemFifth=document.querySelector('#C_diagram');
diagramItemFifth.innerHTML=(C).toString();
const diagramItemSixth=document.querySelector('#H_diagram');
diagramItemSixth.innerHTML=(H).toString();
const diagramItemSeventh=document.querySelector('#G_diagram');
diagramItemSeventh.innerHTML=(G).toString();
const diagramItemEighth=document.querySelector('#D_diagram');
diagramItemEighth.innerHTML=(D).toString();
const personalPanelItem=document.querySelector('#personal_panel');
function personalPanelContentCreate(numbers){
let isPositiveTitleOpened=true;
let isNegativeTitleOpened=true;
let isCommunicationTitleOpened=true;
let isSuperPowerTitleOpened=true;
numbers.map((item, index, array)=> {
if(isPositiveTitleOpened){
isPositiveTitleOpened = !isPositiveTitleOpened;
const text=document.createElement('p');
text.textContent='В позитиве';
text.style.fontWeight='700';
personalPanelItem.appendChild(text);
}
if(index===0){
for (let i=0; i < array.length; i++){
if((i===0)||(i===1&&array[0]!==array[1])){
switch (array[i]){
case 1: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(1) Ваша личность уникальна, вы наделены незаурядными способностями и обладаете магическим даром. Вас интересует энергетическая и магическая составляющая жизни, стоит вам только чуть-чуть углубиться в эту тему – вы максимально оперативно и с легкостью познаете божественные законы мироздания. Вы оцениваете себя как личность коммуникативную, с легкостью налаживаете новые контакты. Временами считаете себя чересчур болтливыми, дружелюбными и доверчивыми. Для вас свойственны оригинальность и творческий ум, сообразительность. Для вашей личности очень важно выделиться из толпы, не слиться с остальным социумом и найти ту сферу жизни, в которой вы будет иметь возможность творить и создавать что-то новое, уникальное, присущее лишь вам одному. <br>
Вы, по своей природе, лидеры, новаторы — первопроходцы, и для вас очень важно преуспеть в чем-то быстрее остальных и быть первым. Если вы увлекаетесь каким-либо делом, то отдаетесь этому целиком и полностью.<br>
Вам абсолютно неважно, следует ли кто-то за вами или нет. Вот только стоит вам поделиться своими идеями с другими людьми, они могут легко вдохновиться и пойти за вами, выбрав вас в качестве лидера. Ваша уверенность в себе безгранична, вы четко знаете свои цели и прилагаете максимум усилий, чтобы их достичь. Обладаете мощной энергией материализации – творите реальность силой своей мысли.<br>
<br>
Часто приходиться самостоятельно пробивать дорогу в жизни себе и многим. Вам не чуждо делиться своим полученным опытом с другими людьми. Люди, соприкоснувшиеся с ними, быстрее начинают двигаться к своей эволюции. Вы буквально стоите на передовой линии. Всего добиваетесь своими силами и усилиями. Достигаете мастерства в любом своем начинании, вне зависимости от того, какие условия и обстоятельства. Не будете терпеть авторитарного давления на свою личность со стороны других людей. Сразу же всем сообщите, что такого отношения к себе не потерпите.  Работать с людьми вы согласны только на равных, с равными по духу партнерами. Можете работать как в коллективе, так и в одиночку – результат будет одинаково хорош. Что бы не происходило в вашей жизни – все для вас поправимо и сделано в лучшем виде. Вам не понять, что значит трястись, откладывать и избегать. Интеллект, навыки – все при вас.
Свобода — это основа вашей жизни.<br><br>
Вы путешественники, познаватели в мире всего нового, первооткрыватели. Вы достаточно легко согласитесь на эксперименты, если увидите в этом потенциал и выгоду для себя. Праздник жизни и фейерверк – это для вас.<br><br>
Невыносимо  находиться в ситуации застоя, выбираете быть в центре событий и новых впечатлений.  Вся жизнь для вас – это череда удивительных приключений, к которым вы не просто всегда готовы, а встречаете с максимальным оптимизмом.<br><br>
Вы выбираете активную жизненную позицию, не принимая других вариантов. Вы способны по щелчку пальцев загореться какой-то идеей и других увлечь за собой. И то, что обычным людям кажется недостижимым, вам видится лишь как очередная «вершина» на вашем пути, которую вы непременно возьмете в оборот. О чем бы вы не подумали, куда бы не направили свою энергию — все исполняется, будто по мановению волшебной палочки.
`
personalPanelItem.appendChild(paragraph);
break;
}
case 2: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(2) Вы обладаете развитой интуицией. Способны направлять и давать мудрые советы. Вы чуткий, глубоко понимаете жизнь. В любых спорах для вас нет проблем сгладить углы и гасить негативные всплески эмоций путем поглощения их своей энергией. Вам достаточно произнести всего лишь пару слов и конфликта как не бывало.  Умение всех мирить, приводить в гармонию все пространство, находить компромисс и договариваться – вот ваши качества. Выступаете в роли связующего звена между противниками, так как не занимаете определенной позиции, выбирая нейтральную сторону. Вам присущи глубинные чувствования и видения. Вы с легкостью замечаете и видите то, что скрыто от посторонних глаз и лежит за гранью обычного восприятия и понимания. Очень наблюдательны, таинственны и загадочны, осторожны. Далеко не каждого подпускаете к себе и не всем показываете свое истинное лицо, часто создаете видимость, а, на самом же деле, истину прячете от чужих глаз.<br><br>
Ваша энергия обволакивает, как загадочная дымка, подобно туману, стелящемуся над просторами Земли. Вы яркая личность, но при этом незаметная. Вы плените и неуловимы. Вы комбинируете в себе противоположные черты с завидной легкостью, буквально играючи. Вы на постоянной основе читаете чужие души, как книгу Бытия. Ваши советы и изрекаемая мудрость помогают многим людям.<br><br>
Вы противоречивы, но очень тонко чувствуете все вокруг, понимаете чужую боль, как свою собственную. Стремитесь помочь и исцелить окружающих вас людей. Вы обладаете способностью уговорить, успокоить, снять боль. От природы целители и дипломаты, вас притягивает все необычное и загадочное. <br><br>
Очень сильная интуиция, чувствование и понимание других людей. Для этого
нужно прочувствовать себя и привести себя в гармонию.<br><br>
Вы человек, с избытком заботы в собственной личности. Для вас важно кому-то отдавать ее кому-то сполна, окутать ее целиком и полностью. Будь то домашний питомец, пожилой сосед, любимый муж или ваше чадо, не обязательно даже свой. Вы отличаетесь чувствительностью и ранимостью, мягкие по своей натуре. Сочувствуете каждому прохожему и готовы всегда прийти на помощь.  Для вас лидерские позиции не в приоритете, остаетесь в тени по собственному желанию, наслаждаясь нейтралитетом. Вы лучше поддержите кого-то другого в его начинаниях, вдохновите на свершения. Любите, оставаясь в тени и не быть замеченным, управлять ситуацией издалека, аккуратно разворачивая события по личному замыслу. Всегда влияете на принятие решений, ведь вы, словно серые кардиналы, способны управлять ситуацией, людьми и событиями – неявно, скрыто, актуально ведя события согласно собственному замыслу. К вашему мнению прислушиваются ведь в ваших словах находят правильное решение. Вы этому активно способствуете, при этом проявляя скромность и осторожность, потому как вы не видите смысла высказывать свои таланты.  Суета не для вас, свое медитативное состояние ставите выше всего остального. Оно вам дорого, и вы его цените и бережете. Мир внутри вас не позволяете подвергать негативу со стороны посторонних людей. Редко кому открываетесь и ваше доверие сложно заслужить. Окружающий людей воспринимают на позициях равенства. Любите и принимаете природу и животный мир. В самом лучшем своем распоряжении духа – всегда пребываете в гармонии.     `
personalPanelItem.appendChild(paragraph);
break;
}
case 3: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(3) Люди, рождённые под этим знаком олицетворяют земное материальное плодородие, земные блага. Дом, семья, дети, положение, статус в социуме, является для вас очень важным. Вы стремитесь в жизни занять лидирующие позиции. Хорошие управленцы и организаторы.<br><br>
Такие люди, как вы, по своей природе привлекательные, притягивающие взгляды окружающих, обаятельные, всегда ухоженные и красиво одетые. Для вас важен социальный статус и мир материи, то есть мир денег. Красивая квартира, машина, отдых на лучших курортах, походы по салонам красоты и уход за собой, покупка стильной одежды – вам это, безусловно, нравится.  Все атрибуты вашей жизни, должны быть в полном порядке и соответствовать статусу богатого, успешного человека. <br><br>
Наделены природной любовью к себе и умением заботиться и ухаживать за своим телом, за домом и за детьми. Хорошо и легко ведете домашнее хозяйство. Рационально распоряжаетесь деньгами. Ответственны, обязательны, контролируете всех своих близких, часто пытаетесь за них решать встающие перед ними задачи. <br><br>
Вы любите зарабатывать и тратить. Материальные блага легко приходят в вашу жизнь, так как вы, в хорошем распоряжении духа, являетесь мудрым руководителем. Знаете, как организовать команду, как правильно раздать задания и спросить их выполнение, со своих подчиненных.  Занимаете ключевые и руководящие должности. Вам удаётся собственный бизнес. Хорошо себя ощущаете там, где крутятся большие деньги. Всегда стремитесь к лучшему во всем.  В своих лучших проявлениях вам присущи широта, доброта и щедрость. Отзывчивы на помощь.<br><br>
<br><br>
Женщина<br><br>
Бог наделяет таких женщин внешней красотой, притягательностью и женственностью. Ощущением «королевы», «императрицы». Этот аркан судьбы созвучен иньской женской энергии. Как правило есть стремление стать авторитетом для окружающих. Быстро оказаться в центре внимания.Такая женщина знает и понимает, как увлечь за собой.<br><br>
Если она будет выбирать отдых, то выберет его в комфортабельном пятизвездочном отеле. А если вы будет выбирать спутника жизни, то отдаст предпочтение обеспеченному, уже имеющему положение в социуме или подающему большие надежды, перспективному человеку. Не вынесет рядом  слабого мужчину, будет постоянно давить на него.<br><br>
<br><br>
Мужчина<br><br>
Вы прекрасные знатоки женских душ, всегда окружены представителями  женского пола, прекрасно находите с ними общий язык, часто работаете в женских коллективах и являетесь всеобщими любимчиками. У вас добрая, открытая душа, вы общительные и веселые, заботливые и понимающие. У вас мягкое, обволакивающее обаяние. У вас это очень прекрасно получается любой домашний труд — готовить, убрать, растить детей. В вашей жизни всегда рядом присутствует сильная женщина - покровительница, которая всегда поддержит, даст вам советы, направит в нужное русло. Как правило — это мама, но это место может занять и жена. У вас прекрасные отношения со всеми женщинами мира — мамой, женой, дочерьми, коллегами, начальницами и подчиненными.<br><br>
Мужчине важно прорабатывать свои мужские качества, уходить от некой истеричности и инфантильности.`
personalPanelItem.appendChild(paragraph);
break;
}
case 4: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(4) Женщина<br><br>
Мужская яньская энергия, энергия огня, которая сама по себе является мощной всепоглощающей и действенной. Вы наделены большой властью и энергией, талантом управлять людьми и принимать важные решения. Впечатляющие возможности для достижения высокого положения в обществе. Открыты все дороги. Можете гордиться высокой работоспособностью, энергичностью, способностью выстраивать систему и упорядочивать процессы. Умение руководить, отличные организаторские данные, которые могут проявляться в политике, менеджменте – это все про вас. <br><br>Вы волевая личность, которая может дать фору любому представители сильного пола. Но, осознав в себе эти черты характера, вам не к спеху ими пользоваться, наоборот, вы трансформируете свое лидерское начало в женскую силу и энергию. Вам никогда не придет в голову выпячиваться и стараться быть лучше мужчин, соревноваться с ними. Вы можете стать «императрицей».
Вам характерно умение легко приводить в порядок дела, ставить задачи и направлять людей для достижения результата. Сильная личность, целеустремленная и надежная.<br><br>Вы умеете вести переговоры, выстраивать систему  и мыслить глобально. Нередка для вас амбициозность, любовь к покровительству и защите. Способность достигать успеха в любой области, в которой идет работа. Обладание значимыми мужскими качествами и сильным характером.
Быстрое принятие решений, строго логическое мышление, легкое выстраивание стратегии. Вы ощущаете комфорт в обществе мужчин и возможность будете иметь сильного покровителя в лице одного из них.
Сила воина, мужская сила, найдете выход из сложных ситуаций, вера в успех, отсутствие суеты и паники.
<br><br>
Мужчина<br><br>
Вы заботливые отцы и мужья. <br><br>Посадить дерево, построить дом, воспитать ребенка — вот ваши приоритеты. Вы успешны в бизнесе, быстро продвигаетесь по карьерной лестнице, прекрасные организаторы. Профессионалы своего дела, быстро принимаете решения и действуете.
<br><br>
Умение навести везде порядок, раздать всем задания, а потом проконтролировать их выполнение, умение зарабатывать деньги и успешно доводить дело до конца — это позитивные качества такого мужчины, как вы. <br><br>
Все самые лучшие мужские черты характера собраны в «императоре». Для женщины связать жизнь с таким человеком — счастье, ведь в доме всегда будет достаток, любые проблемы решены, отдых организован. «Император» почитаем в семье, на работе, в обществе. Его щедрость не знает границ, он готов помочь советом, деньгами, любыми действиями. Взваливает на свои плечи груз различных задач и отлично справляется с этим.<br><br>
Вы наделены большой властью и энергией, талантом управлять людьми и принимать важные решения. У вас имеются все возможности для достижения высокого положения в обществе. Умение зарабатывать деньги и успешно доводить дело до конца — это позитивные качества мужчины «императора».<br><br>
Можете гордиться высокой работоспособностью, энергичностью, способностью выстраивать систему и упорядочивать процессы. В вас присутствует отличные организаторские данные, которые могут проявляться в политике, менеджменте. Характерно умение легко приводить в порядок дела, ставить задачи и направлять людей для достижения результата.`
personalPanelItem.appendChild(paragraph);
break;
}
case 5: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(5) У вас хорошо получается наставлять, воспитывать, что помогает сблизиться с детьми и взрослыми. Лидеры, хорошие управленцы и прекрасные ораторы. Узнав что-то интересное, непременно расскажете это другим. Вы – учителя от Бога, поэтому прекрасно обучаете других людей. И не важно – преподаете ли в школе, учите ли собирать машины или строить бизнес. Вам необходимо делиться.<br><br>
Прекрасная логика, но часто интуицию заглушает голос ума. Ищете всему объяснения. Для того чтобы убедить вас, нужно изложить множество фактов. Важно научиться периодически «отключать» ум и слушать свою душу, впускать духовные знания в свою жизнь. Если вы начинаете во что-то верить, то вдохновенно несете это знание в массы, зажигая сердца.<br><br>
В жизни для вас довольно важны различные правила и традиции. Вы довольно педантичны, аккуратны в одежде, любите чистоту. У вас всегда все на своем месте. Для вас характерно четкое соблюдение норм и законов, стремление призвать к тому же других.
Нет склонности к экспериментам и авантюрам любого рода, придерживаетесь стабильности во всем и всегда. Однако не отказываетесь от участия в сомнительных мероприятиях, если это приносит пользу для саморазвития. Нередко вы получаете по два-три высших образования, проходите множество курсов по самореализации. Вы готовы вечно учиться, всю жизнь познаете что-то новое, с удовольствием посещаете различные тренинги, читаете книги. Вы как губка, все впитываете в себя, наполняясь новыми знаниями, а потом – с таким же удовольствием отдаете эти знания в мир. <br><br>
Часто выбор сферы деятельности, связанной с преподаванием, исполнением закона, юриспруденцией. Лучше всего развито логическое мышление и способности к точному анализу. Смена деятельности не воспринимается как что-то тяжелое и болезненное. Любите все структурировать, раскладывать по полочкам. Умение структурировать – это магия, которая притягивает людей. С вами все становится намного проще и тривиальней. Вещи обретают смысл и порядок.
`
personalPanelItem.appendChild(paragraph);
break;
}
case 6: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(6) Энергия общения, коммуникаций и чувственности. Вы легко общаетесь и сходитесь с людьми. Имеете множество друзей и знакомых, вы милые и приятные, обходительные. Легко располагаете к себе, умеете урегулировать конфликты и сгладить острые углы.Вас привлекает всё яркое, красивое изящное. Вы ценители искусства, красоты, обладаете превосходным,утончённым вкусом. Являетесь гурманами в еде, ценителями всего красивого и прекрасного. Любовь для вас является неотъемлемой частью жизни. Вам важно любить всё то, чем вы занимаетесь, всё то, на что направлено ваше внимание.<br><br>
Вам очень важно мнение окружающих, что о вас скажут, что подумают, как вы будете выглядеть в глазах других людей, какое произведете впечатление. Артистичны по своей природе, любите получать от жизни удовольствия,нежиться в энергии обожания и любви. Где бы вы не находились, легко притягиваете к себе внимание и становитесь душой любой компании.<br><br>
Эмоциональны и влюбчивы, поэтому погружаетесь в отношения всецело с головой, ярко переживая все связанные с этим эмоции. В вашем доме, как правило, царит уютная и красивая атмосфера, любите принимать гостей, радушные хозяева. Так же с удовольствием участвуете в любых празднествах и вечеринках.<br><br>
Вы умеете создавать вокруг себя праздник и поэтому редко бываете одни. Одиночество не для вас. Отношения с собой, со своим партнером, с миром – вот что вас заботит больше всего. Если любите человека, то полностью без остатка. Готовы окружить его заботой, вниманием, делать ради него всего. Бескорыстно помогаете окружающим. Про вас говорят — душа нараспашку.<br><br>
Заниматься только любимым делом, тем, что вас зажигает и вдохновляет. Вы прекрасные организаторы, являетесь связующим звеном между множеством людей.  У вас, как правило, несколько телефонов, множество аккаунтов в соцсетях. <br><br>
Еще одна ваша отличительная черта — способность во всем видеть красоту. Тщательно следите за своей внешностью, за своим телом. Всегда стремитесь выглядеть с иголочки.`
personalPanelItem.appendChild(paragraph);
break;
}
case 7: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(7) Вы умеете ставить для себя цели и с легкостью их достигаете. Вам жизненно необходимо точно знать, куда и в каком направлении вы будете двигаться. Ваша самостоятельность позволяет вам брать ответственность не только за себя, но и за окружающих. Вам характерна любовь построению планов, прописыванию стратегии, систем работы.  Так вам проще сконцентрироваться и направить свою энергию в нужном русле, чтобы избежать бесполезных действий.<br><br>
Вам важно выйти победителем из любого обстоятельства. Если же вы терпите поражение, то оно только подстегнет вас пробовать снова и снова решить ту или иную ситуацию. Добиваетесь своих целей, не подавляя при этом окружающих. Даже если случается такая ситуация, при которой вам приходится бороться с кем-либо, то вы относитесь с уважением к своему противнику. Вам несложно признать свою неправоту и проявить гибкость, не отрекаясь от своих идей. Все складывается у вас легко, если придерживаетесь их. Вам нет нужды быть оратором, чтобы донести мысли до своих компаньонов и коллег. <br><br>
Активная жизненная позиция сочетается с оптимизмом, легкостью на подъем. Необходимо постоянное движение. Этому способствует отличные навыки вождения машины и любовью к проведению большой доли времени за рулем, в разъездах. Путешествия становятся неотъемлемой частью расширение кругозора, путем получения новых знаний.   <br><br>
Такой образ жизни заряжает энергией и способствует развитию еще большей мобильности. Предпочитаете выбирать спорт и здоровый образ жизни. Вы трудоголик, зациклены на работе. Это все мотивирует окружающих, и они следуют за вашей яркой личностью. <br><br>
Превыше всего остального в вашей пирамиде потребностей собственная реализация. Вам важно получать видимый результат своих трудов. Вы не будете стараться выполнить на отлично поставленную задачу, если это не принесет пользы окружающим и вам. Особую значимость также играет материальная сторона. Чем выше ваш доход от предприятия, тем больше внимания будет уделено на достижение цели. Для вас очень важна социальная реализация, общественное признание и руководящая должность в команде. За вашими плечами должен быть надежный тыл – коллектив, на который можно положиться и довериться. Вы задаете лишь вектор движения, цель, а ваша команда немедленно приступает к выполнению поставленных задач.<br><br>
Ваше жизненное кредо основывается на том, что в жизни нет ничего, невозможного. То, к чему другие люди идут практически всю жизнь, вы можете достичь всего за пару месяцев.  Вы мыслите масштабно – строите серьезные карьерные планы. У вас есть некая способность видеть, где и чье место, ставите нужных людей на значимые, ключевые места. `
personalPanelItem.appendChild(paragraph);
break;
}
case 8: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(8) Вы самостоятельны и отличаетесь от остальных людей глубиной своих познаний, чувств и стремлений. Склонны искать истинную правду и справедливость в любых обстоятельствах. Вам дано всё время работать над улучшением своей кармы. Интересуют различные методы улучшения судьбы, посещение различных тренингов и семинаров. Вам очень важно разобраться в законах Вселенной. Очень ответственны, защищаете слабых. Открыты и дружелюбны к людям – всегда ориентированны на помощь. <br><br>
При возникновении различного рода проблем, стараетесь разложить все по полочкам, к решению приходите с разных сторон. Не забываете о практической части своего труда. Не достигнете результата, если вам что-то не по нраву, либо не выгодно как с материальной, так и с моральной стороны.<br><br>
Вы видите и понимаете чувства глубже других людей. С легкостью дойдете до истинной сути и причины разных явлений с уверенностью в себе и достаточным спокойствием. При этом для комфортного существования необходимы внутренняя гармония и баланс. В этом вашем состоянии лучше всего проявляется суть и важные качества личности.  <br><br>
У вас все должно быть все четко, структурировано. Вы всегда держите свое слово. И если уж что-то пообещали, то точно выполняете, даже если это все в ущерб вам самим. Вас смело можно брать в партнеры, давать различные задания и не контролировать, вы сами со всем справитесь. Вы находитесь в балансе и живете по принципу: «Что посеешь, то и пожнешь».  <br><br>
Хорошее и плохое, совершенное вами, возвращается быстро и в двойном размере. Открытость, дружелюбность, бесстрашие, способность быстро реагировать в экстремальных ситуациях. Вы мудрые, можете дать дельный совет. Сразу видите корень проблемы. Вы прямолинейны и сразу примите свою ошибку, если знаете, что виноваты.  `
personalPanelItem.appendChild(paragraph);
break;
}
case 9: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(9) Вы мудрые и глубокие личности, к которым постоянно тянуться за советами и поддержкой.  Мудрость, которая у вас имеется, дополняется жизненным опытом, широкой душой и умением посочувствовать ближним. Многие считают вас надежным другом, умеющим хранить тайны и секреты. Если вы чем-либо увлечены на данный момент, то вы досконально изучите все детали этого предмета. Вам можно поручить любые дела – вы ответственно подойдете к решению этого вопроса, но все это сделаете неспешно и очень последовательно.  Вы рождены для интеллектуального труда. Склонны к научной деятельности, аналитике и логике.  Можете стать ученым, преподавателем или даже заиметь собственный бизнес.   Вам важно осознание, что вы принесете пользу общества своим умом, мудростью и знаниями. Вы с радостью поделитесь своим новыми изобретениями или идеями с окружающими людьми.
Вы - самодостаточная личность, которая отдает предпочтение уединению, чем шумным компаниям. Вы закрываетесь от остального мира, что помогает вам глубже осознать себя и настроиться на рабочую атмосферу. Постоянно постигаете что-то новое, много учитесь и анализируете.  Вам хорошо наедине с собой и никогда не бывает скучно. Самодостаточность - главная черта. В вас много задатков и талантов, которые вам еще предстоит реализовать и развить. Любите окунуться в размышления на абстрактные темы, пофилософствовать.
Вы очень приятные и тактичные собеседники. Всегда аккуратны в своих советах и словах.<br><br>        Не особо рады людям, которые навязывают вам свою точку зрения. Излишняя эмоциональность может восприняться, как отсутствие воспитания и культуры. Отличительные характерные черты – доброта, прямолинейность и честность.
Ваше доверие нужно заслужить, поэтому при знакомстве с новыми людьми – вы долго к ним присматриваетесь и буквально изучаете их личность. Только тогда, когда вас удовлетворит увиденное, вы можете завести с ними отношения. Если же вам этот человек пришелся по вкусу, будьте уверены – вы будете готовы пойти на многие поступки ради этого человека, останетесь верны до самого конца.
Зачастую не спешите выходить замуж или жениться, но если уже выбрали партнера, то будете ему верны и преданны. Однолюбы. Но бурно проявлять свои чувства не станете, предпочитая держать все внутри себя. Сначала стремитесь встать на ноги, укрепиться материально, выучиться. Среди таких людей чаще всего встречаются поздние браки.
Среди них встречаются и отшельники, люди ушедшие в монастырь от суеты и обыденности. Они могут вести аскетичный образ жизни, отказываться от телесных и материальных удовольствий.`
personalPanelItem.appendChild(paragraph);
break;
}
case 10: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(10) Вы счастливчик по судьбе, о вас говорят «родился в рубашке». Все в вашей жизни складывается легко и весело: приходят необходимые вам люди, двери перед вами открываются сами по себе. Вам остается лишь расслабиться и получать удовольствие от жизни. Даже в самых сложных обстоятельствах вам покровительствуют высшие силы. Все в последний момент разруливается в вашу сторону, так как вам надо было. А окружающие люди оказывают вам свою поддержку или предлагают выгодные условия сотрудничества. За что бы вы не взялись, у вас все получится будто бы по велению волшебной палочки. Вас часто принимают на работу потому как вы, трудясь на какую-то компанию, обязательно приносите с собой новизну.
Вы не лидеры по натуре, но поддерживаете лидера, становитесь его правой рукой и опорой. Вы постоянно нуждаетесь в компании единомышленников, быть вместе с кем-то. Вы прекрасно работаете в коллективе и в команде. Ваша энергичность и талант удачливо преподносить свои проекты создают настроение на успех. Вам характерно быть авантюрными непоседами, вы легки на подъем, любите путешествовать, всегда находитесь в движении. У вас игривый и веселый характер, вы неутолимы и неугомонны.
Ваша открытость к людям тесно переплетается с добросердечностью. <br><br>
После общения с вами, людям вокруг вас кажется, что жизнь становится легче, интересней и волшебней. Вы просто-напросто заряжаете их своей энергетикой, своим оптимизмом. Отличаетесь позитивным мышлением и веселым нравом, готовы поделиться с близкими и коллегами всем, что у вас имеется.  «Все будет хорошо» - ваша любимая фраза. Вы настолько сильно любите мир, людей вокруг вас, что это все отвечает вам взаимностью. `
personalPanelItem.appendChild(paragraph);
break;
}
case 11: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(11) Вы наделены способностью оперативно восстанавливать в себе энергию и силы.<br><br>
Сила может выражаться по-разному: в ваших физических возможностях, в силе духа или силе слова, если вам необходимо убедить людей, вести их.<br><br>
Отличаетесь выносливостью, можете анализировать и делать большой объем работы. Вы быстро обучаетесь, буквально схватываете на лету информацию.  Ваше трудолюбие способствует тому, что вы постоянно находитесь в каких-то делах, у вас буквально нет возможности спокойно сидеть на месте и бездействовать. Не ограничиваетесь выполнением одной задачи, выполняете сразу несколько дел. При этом доводите каждое дело до логического завершения. Окружающие люди удивляются с вас, они не понимают, как вы все успеваете и откуда у вас столько сил.
Ваш удел делать мир лучше и красивее.<br><br>
Вы успеваете все: ведете бизнес, заботитесь о семье и помогаете друзьям и родственникам. Оцениваете весь мир с позиции силы – вам интересней находиться в таком месте, где вы можете проявить эти свои качества в полной мере. У вас есть потрясающая способность раскрывать скрытый потенциал в других людях. Учите их верить в себя и действовать несмотря ни на что.  В вашей компании остальным всегда комфортно проводить время. Ваша целеустремленность и активность помогают вам в любых ваших начинаниях.  <br><br>
Вы не будете тратить свое время и силы на доскональное изучение чего-либо, глубоко вникать не для вас. Вы сразу же применяете свои навыки на практике, параллельно анализируя свои сильные и слабые стороны. Самое интересное, что при таком подходе ваш профессионализм находится на высоком уровне. Вы настоящие лидеры, можете управлять массами, грамотно доносить свое мнение. Имеете огромное влияние на окружающих людей. Действуете всегда без промедлений. Вы не готовы быть в подчинении, наоборот, вам привычнее самим руководить процессом и самостоятельно принимать решения. <br><br>
Любите заниматься спортом, возможен даже выбор профессии в этом направлении. Низкий болевой порог чувствительности делает вас еще более неуязвимым и непоколебимым. Вы веселые, любознательные, открытые и искренние личности. Если уж загорелись какой-либо идеей, есть большая вероятность, что при этом вы заразили своим энтузиазмом окружающих людей. Они всенепременно последуют за вами, без долгих размышлений. Многогранные личности. В один день вы можете начать осваивать лыжный спорт, на следующий – рисовать картины. Вы заряжаетесь от природы: солнце, воздух, вода.  `
personalPanelItem.appendChild(paragraph);
break;
}
case 12: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(12) У вас крайне необычный взгляд на окружающий мир. Вы творческая личность, которая постоянно формирует различные идеи. Созидаете различные инновации и изобретения. Всегда глянете на ту или иную ситуацию с совершенно другого угла. У вас отличительное от всех остальных мышление и видение реальности. В социуме ощущаете себя «белой вороной» - везде выделяетесь свой индивидуальностью. При общении с вами люди замечают то, на что раньше вообще не обращали внимания.  Вы буквально кладезь интересной и бесценной информации. Вы очень любите животных, природу и искусство. <br><br>
Вы умеете извлекать из любой информации все креативное и необычное, генерируете идеи для самых разных проектов в любом сфере деятельности. Для вас характерно применять не только творческий подход, но и самодисциплину. С легкостью организуете людей. Имеете навыки управления ситуацией. Всегда стараетесь смотреть на мир с позитивной точки зрения, оптимистичны в своих наблюдениях. Для вас практически не существует плохих и злых людей – есть закомплексованные, либо обделенные вниманием, которые нуждаются именно в вашей помощи. У вас любящее искреннее сердце и открытая душа, готовая прийти на помощь в любой момент. <br><br>
Вас всегда волнует вопрос того, как много пользы вы можете привнести в этот мир. Вы желаете не только зарабатывать, но и сделать так, чтобы ваша деятельность была связана с помощью людям. <br><br>
Вы эмпаты – сопереживаете и имеете большое любящее сердце. Творите добро из тени, никому не расскажите о своих деяниях. Умеете соблюдать баланс между помощью другим и заботой о себе. Можете сказать твердое «нет», однако сделаете это вежливо и деликатно, чтобы не обидеть просящего.<br><br>
Весь мир для вас семья, а люди – братья и сестры. Частенько бескорыстно помогаете людям. Отзывчивы и способны на искреннее сострадание. Делаете много ч для мира и социума, при этом подчистую забываю о собственных нуждах.  Дарите ему абсолютную любовь вперемешку с пониманием. Никогда не осуждаете за промахи. Всегда стараетесь духовно развиваться. Желаете обладать богатым жизненным опытом.   Точно знаете, что все должно быть в гармонии – умеете как отдавать, так и принимать блага. Однако, другое дело, что к этому вы приходите далеко не сразу, и в течение жизни набиваете себе много шишек, прежде чем обрести мудрость.   <br><br>
`
personalPanelItem.appendChild(paragraph);
break;
}
case 13: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(13) Вы любите жизнь во всех ее проявлениях. Смелые, активные и отчаянные – это все про вас. Вы бесстрашная личность, которая в экстремальных ситуациях может действовать решительно и без промедлений. Способны оперативно мобилизовать свои действия. Экстрим приносит вам удовольствие. Вы личность, окруженная атмосферой загадочности и непостижимой мистики. Сами до конца еще не разобрались, где находится предел ваших возможностей. Своим положительным примером запускаете в других процессы трансформации. С вами интересно проводить время, на вас остальным людям хочется равняться, стать успешнее.<br><br>
Вам быстро надоедает однообразие, перед вашими глазами постоянно должно что-то происходить. Усидеть на месте для вас непосильный труд. Вам важно испытывать постоянный интерес к жизни, заниматься тем, что вас вдохновляет. Обладаете уникальным свойством трансформировать все вокруг себя. Если вы ворвались в пространство другого человека, вам характерно менять ее до неузнаваемости, его жизнь никогда не будет прежней. И все эти изменения у них произойдут только после знакомства с вашей персоной. Вы умеете находить нужные слова, чтобы вдохновить других на перемены. Поддержите и подтолкнете их к действиям. <br><br>
Вы любознательны и креативны, выражаете особый интерес к различным аспектам жизни. С легкостью откликаетесь на все неизведанное и необычное. Можете браться за несколько проектов одновременно и при этом качество вашей работы не пострадает.  Любое свое начинание вы доводите до логического конца. Помогаете людям и обществу в целом преодолеть те сферы жизни, которые уже отжили свое. Умеете отпускать ситуации и учите других тому же.<br><br>
Вы точно знаете, как правильно себя подать и не растеряться в любой экстремальной ситуации. Легко концентрируетесь в самых сложных условиях, действуете без паники. Ваша уверенность в завтрашнем дне помогать вам выстроить для себя четкую жизненную позицию – идете вперед и не сдаетесь.  У вас притуплен страх опасности и смерти, можно даже выделить некоторую любовь к экстриму. Совсем неудивительно если вы выберете для себя специальность, связанную с опасностями.<br><br>
Вы повержены постоянной смене циклов в вашей судьбе: постоянно что-то заканчивается, что-то начинается новое, и так всю вашу жизнь. Легко можете сменить профессию, страну, освоить новое хобби. Вы на протяжении всего своего существования как бы множество раз умирали в одном качестве и рождаетесь в другом. <br><br>
В вашем характере говорить все прямо, предпочитаете сказать правду в глаза, чем что-то утаивать и носить какие-то обиды за плечами. Быстро обучаетесь и осваиваете другие виды деятельности. Вам жизненно необходимо постоянно ставить себе все новые и новые цели, чтобы ваш интерес к жизни не угасал.`
personalPanelItem.appendChild(paragraph);
break;
}
case 14: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(14) Вы мягкая, покладистая и душевная личность. Взрослый взгляд на окружающий мир. Люди искусства – это про вас. Тонкие и чувствительные, восприимчивые ко всем прекрасным проявлениям натуры. Вам очень интересен внутренний мир окружающих людей. Способны разглядеть в человеке все самое хорошее и усилить это.
<br><br>Вы интеллектуальны и начитаны, можете поддержать любую беседу. Посещаете различные культурные мероприятия, так проходит ваш досуг. Выбираете профессии, связанные с творчеством. Любите что-нибудь смастерить руками. Даже если вы обошли стороной профессии, связанные с творчеством, то ваш досуг все равно каким-то образом сводится к посещению вами кино, театров, выставок, галерей.  У вас имеется тонкий художественный вкус, прекрасно сочетающийся с любовью ко всему, что связано каким-либо образом к искусству (театр, живопись, архитектура). Вы настоящий знаток во многих сферах благодаря вашему богатому кругу увлечений и интеллектуальных занятий.
<br><br>Вы всегда находитесь в контакте со своей душой и идете на ее зов, не обращая внимания на мнение окружающих людей. Вы задаете себя вопрос о собственных желаниях и, соответственно, двигаетесь за ними. Как правило, занимаетесь любимым делом, которое приносит вам и деньги, и удовольствие.  Обучение вам дается легко, если изучаемый вами предмет полезен для расширения кругозора. Часто путешествуете и можете выбрать деятельность в сфере искусства на международном уровне. Достаточно быстро приспосабливаетесь к новым условиям жизни. С удовольствием перенимаете культуру поведения и общения людей разных стран и национальностей.
<br><br>У вас имеется дар исцелять других: словом, делом, прикосновением. Врачеватели от Бога.Стараетесь жить умеренно, заботясь о собственном теле. Любите заниматься различными очищающими душу и тело процедурами. Питаетесь здоровой пищей и следите за своим внешним видом. Хорошо разбираетесь в травах. Вас можно назвать «зрелой душой» - вы мудрые, понимающие, уравновешенные, готовы всегда прийти на помощь.  Стараетесь жить по средствам, не приобретая ненужные вещи, которые затем будут лишь захламлять ваш дом. Вы доброжелательны и уравновешены, любите животных и природную красоту. Обращаетесь к людям на равных, с уважением и достоинством. Рядом с водой чувствуете себя намного спокойнее, она очень благотворно влияет на вашу жизнь и ваше состояние. Могли бы занять лидирующие позиции, но не стремитесь к этому.`
personalPanelItem.appendChild(paragraph);
break;
}
case 15: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(15) Вы веселый и энергичный человек, видящий других насквозь. Постоянно пребываете в позитивном настроении, буквально освещаете собой весь мир. Вам не чуждо делиться с другими своими светлыми эмоциями. У вас сильное тело и сильный дух. Вам буквально предназначено испытать на себе самом огромную мощь разрушительных ситуаций, справиться с ними и передать собственный опыт другим людям. Слабые люди вас опасаются, так как вы сильный человек. Они берут с вас пример, любят и уважают.
<br><br>Вас практически невозможно обмануть. Сразу же выявляете все изъяны и недостатки. Другим людям нет смысла притворяться перед вами другим человеком. Вам достаточно лишь появиться в каком-нибудь коллективе и окружающие сразу же начнут показывать свои несовершенства – агрессию, жадность, черствость и различные обиды.
<br><br>У вас также есть навык усиливать и положительные их черты – креативность, доброжелательность, сострадание. Склонны открывать окружающим людям их собственные слабости через соблазны, чтобы они смогли увидеть и проработать свои негативные черты характера. Способны контролировать людей и управлять ситуацией так, чтобы события развивались в нужном вам ключе.
<br><br>Материальные блага достигаются вами легко, буквально играючи. Дорогие машины, хорошие дома и квартиры, отдых на лучших курортах, возможности для достижения финансового процветания – это все как бы само вас преследует. При этом всем вы не особо зациклены на деньгах, ведь для вас куда важнее обсудить особо тонкие душевные темы. Любите занимать такими делами, чтобы они приносили вам не только удовлетворение, но и были полезны вашему саморазвитию, а также приносили какую-либо помощь окружающим.
<br><br>Вы, видя в других несовершенства, принимаете и любите людей безусловно. Оказываете помощь окружающим в освобождении от агрессии, гордыни, зависимости, черствости и раскрыть в них самые положительные качества. Вам подвластно управлять массами. Имеете некий несокрушимый авторитет в обществе. Вы грамотны, веселы и авантюрны. Вам характерна гибкость и умение принимать реальность во всех ее проявлениях, безусловная любовь ко всему сущему, смирение и понимание, что бы не происходило. Стоит вам только чего-то захотеть, как реальность выстилает перед вами красную дорожку – все сбывается быстро и точно.
<br><br>Нередко у таких людей, как вы, открывается дар ясновидения или имеется хорошо развитая интуиция. Присущая вам жизненная мудрость дает глубокое понимание сути самых разных вещей. Умеете дать другим людям ценный совет. `
personalPanelItem.appendChild(paragraph);
break;
}
case 16: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(16) Вы духовно пробужденный человек, который смог побороть в себе все свои искушения и зависимости. Пришли к осознанию себя в новом качестве. У вас есть способности к ясновидению, предсказанию. Вселенная вас слышит и дает желаемое.  Обладаете сильной энергетикой и целительными способностями.
<br><br>Вам характерно разрушать устаревшее мировоззрение и на его обломках возводить новое, духовное и гармоничное. Научившись навыку трансформации собственной энергии, вы становитесь хозяином своей жизни, которому подвластно все в этой жизни. У вас большая сила духа, крепкое тело и нервы. Различные обстоятельства и ситуации, где у многих других людей возникают трудности, и они опускают руки, вы только лишь крепнете и становитесь еще более выносливыми.
<br><br>Вам претит консерватизм. Вы, наоборот, новатор – ставите все с ног на голову, привносите в жизнь окружающих людей огромные перемены и помогаете людям начать новый путь. Не терпите никакого застоя, сметаете все на своем пути, даже если это вам дается болезненно. Все, что мешает вам как-либо развиваться отбрасываете в сторону и дальше мчитесь вперед. Вы очень веселая личность, постоянно улыбаетесь. Авантюристы и склонны к решительным действиям. Радуетесь всем проявлениям жизни, что способствует поучению всего, о чем вы только пожелаете.
<br><br>Ваши мыли довольно часто сбываются. Стоит вам только подумать о каком-то путешествии, как кто-то из ваших друзей позвонит вам и предложит поездку с компанией. Ваша жизнь буквально наполнена мелкими бытовыми чудесами такого рода.
<br><br>Для вас характерно жить свою жизнь мудро - здесь и сейчас. По-другому смотрите на многие вещи и обстоятельства. Благодаря своему ценному и богатому жизненному опыту, вы обладаете способностью трансформировать свое мировоззрение, извлекать важнейшие уроки из произошедшего. Различные блага достаются непростым путем, приходится много времени проводить на работе и трудиться не покладая рук. Зачастую просто необходимо сломать старое целиком и построить новое.
<br><br>Вы наделены большим запасом энергии, способны быть настоящим амбициозным лидером, надежным партнером по бизнесу и просто хорошим располагающим к себе товарищем. Люди следуют за вами по собственному желанию, так как вы умеете вдохновлять и вести за собой массы.
<br><br>Отличаетесь добрым сердцем. Умеете мотивировать самого себя и остальных людей. Генерируете хорошие идеи и всегда готовы прийти на помощь близким и родственникам в трудную минуту. Имеете ценный навык работы с большим объемом информации.
<br><br>Постоянно развиваетесь и выражаете готовность к сложным трансформациям, как внутри себя, так и в окружающем обществе. <br><br>
<br><br>Для вас характерно действовать смело и осознанно, всегда готовы взять ответственность за собственные решения, не боитесь рисковать. `
personalPanelItem.appendChild(paragraph);
break;
}
case 17: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(17) Вы человек «звезда», творческие личности по своей натуре с самого своего рождения.. Зачастую связываете себя со сферой искусства. Вам суждено блистать на сцене, выступать перед публикой, ловить на себе восхищенные взгляды. Для вас характерно постоянно находиться в центре внимания. Одеваетесь ярко и вызывающе. У вас талант любую историю рассказать интересно, так, что все окружающие будут слушать, открыв рты. Обладаете хорошим чувством юмора. Ваше окружение восхищается вами, замечает ваши способности и таланты, стремятся быть к вам еще ближе.
<br><br>Вас по жизни преследует успех. Будете признаны обществом за что бы вы не взялись, любая ваша деятельность принесет вам известность. Хорошо совмещаете творческую деятельность и заработки. Вы идете по своему звездному пути – это секрет вашего успеха во всем. Стоит вам лишь прикоснуться к чему-то, как эта вещь тут же становится известной и востребованной людьми. С легкостью обеспечиваете себе финансовую стабильность, совмещая с любимым делом. Ярко выделяетесь на фоне толпы. Ваша индивидуальность привлекает к вам повышенное внимание со стороны общества и вам это по душе. Пользуетесь своими успехами в продвижении себя по карьерной лестнице. Обладаете уникальной фантазией и креативным мышлением. На любую проблему сразу предлагаете несколько вариантов ее решения.  Выбрав одно занятие и достигнув в нем необходимого мастерства, есть возможность достичь большого успеха и головокружительной славы.  И все, чтобы вы не делали, если вы делаете с любовью, у вас получается хорошо.
<br><br>Вы прирожденные целители, обладающие повышенной чувствительностью. Ваши руки способны исцелять, причем для этого им необязательно где-то обучаться – уже одно ваше прикосновение имеет чудодейственную силу. У вас очень хорошо развита интуиция. Одно ваше прикосновение имеет чудодейственную силу.         Временами вам снятся пророческие сны, так как у вас отлично развиты интуитивные и экстрасенсорные способности. Восприимчивость, чувствительность, интуитивность, богатое воображение и фантазия. Иногда про вас говорят: спуститесь на землю и перестаньте витать в облаках.
<br><br>Проходите свой жизненный путь легко, выполняя попутно предназначение. Со стороны кажется, будто вам и делать ничего не надо, все придет к вам само. Долю творчества вносите в любую сферу деятельности, вкладывая свою душу. Вы уверены в своем мастерстве, знаете себе цену и не боитесь ее озвучивать.
<br><br>Являетесь оптимистом по жизни, вам нравится украшать свой дом предметами из разных материалов. Не допускаете в свою жизнь никакой серости, даже в выборе одежды. Предпочитаете смешивать разные стили и цвета.
<br><br>Про человека, через которого течет, как через проводника, Небесная энергия, говорят, что он звездный человек, т.е. имеет связь со своей звездой.`
personalPanelItem.appendChild(paragraph);
break;
}
case 18: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(18) Вы очень глубокая и таинственная личность, обладающая мистическим притяжением и загадочностью.        Способны мгновенно воплощать в жизнь то, о чем думали и мечтали.  Можете гордиться развитым воображением и природной интуицией. Обходите стороной рискованные дела, если не испытываете чувство азарта или хотя бы мельчайшей заинтересованности. У вас сильная связь с луной, от которой зависит ваше самочувствие и все жизненные циклы. Стоит вам только захотеть снег, как он тут же пойдет. Можете успешно реализоваться в сфере эзотерики и магии. У вас отличная интуиция, умеете видеть прошлое и будущее. Вам часто снятся вещие сны. Свои способности направляете на помощь окружающим людям. Если же перед вами стоит непосильная задача, и вы не знаете, как с ней справиться, вы можете попросить, чтобы ответ пришел к вам во сне. У вас хорошо развито воображение, поэтому ваш выбор творческих профессий вполне обоснован. Создаете у себя в голове некие картинки и образы, а потом воплощаете их в жизнь.
<br><br>Вы утонченные, артистичные, мистические и загадочные личности. Благодаря своему обаянию притягиваете к себе людей. На вас большое влияние оказывает полнолуние и вода. Вы физически способны ощущать воздействие всех фаз ночного светила.
<br><br>Вы бесстрашны и научились преодолевать свои сомнения и опасения. Смело шагаете по своему жизненному пути. Вы осознаете, что за страхом всегда кроются ресурсы для саморазвития. Перед вами постоянно стоит выбор: поддаться подсознательному опасению и остановиться на половине пути, либо жить про принципу «глаза боятся, а руки делают».  Вы предпочитаете следовать второму пути. Окружающие постоянно у вас интересуются, как вы смогли пройти то или иное испытание. Они недоумевают: «Неужели тебе было не страшно?». Конечно же, вы боялись, но то, что стоит за страхом, для вас куда важнее. Вы осознанно шли к своим переживаниям и стали победителем.
<br><br>
<br><br>Обладаете способностью управлять событиями и обстоятельствами своей жизни при помощи оптимистичного мышления. Ваши мысли довольно легко материализуются благодаря сильной энергетике. Есть большая вероятность, что магические способности станут вашим основным инструментом в вашей профессии. Разносторонние интересы способствуют вашему развитию в любом интересующем вас аспекте жизни. Часто имеется талант к писательству.
<br><br>Вам нравится создавать вокруг себя красивое пространство, озаботились обстановкой и окружаете себя обаятельными людьми. Выбор круга общения происходит по внешнему признаку. Способны черпать информацию из любого источника и быстро перерабатываете ее. Отличаетесь пространственным и образным мышлением, что полезно в разных сферах знаний.`
personalPanelItem.appendChild(paragraph);
break;
}
case 19: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(19) Вы не можете сидеть без дела, вам постоянно нужно находиться в суете и в движении. Вам с рождения дано большое количество энергии. Вы как ходячее солнце, в вашем свете и лучах хотят согреться тысячи людей. Вам не жалко поделиться своим теплом, его хватит на всех окружающих людей. Вас заметно издалека в какой бы компании вы не находились. Вы всегда шутите, много смеетесь, громко разговариваете и находитесь в центре внимания. Любите жизнь в любых ее проявлениях и смотрите на мир оптимистично. Вы буквально не ведаете, что такое депрессия и плохое настроение. Очень добры по отношению к близким и незнакомцам.
<br><br>Ваше призвание в том, чтобы осчастливить как можно больше людей в этом мире. Охотно идете заниматься благотворительностью и любой общественной деятельностью за счет чего становитесь популярными и востребованными.
<br><br>Вы пришли в эту жизнь, чтобы научиться направлять свою энергию на благие дела.  Можете стать успешным человеком во всех сферах деятельности, ведь вы наполнены счастьем и готовы поделиться им со всем миром. Вы поспеваете везде и всюду: растите детей, ходите на работу, занимаетесь общественной деятельностью, помогаете нуждающимся, уделяете достаточно внимания спорту и хобби. Ваш язык любви – язык служения другим людям. Вы делаете множество благих дел не только для своих близких друзей, но и для совсем незнакомых людей.
<br><br>Благодаря вашему стремлению с благодарностью платить другим людям, процветание в вашу жизнь приходит через квартиры, курорты, дома и т.д. Можете легко добиться успеха в любой сфере – духовной, материальной, социальной. Деньги для вас – лишь результат любимого и полезного для других людей дела.
<br><br>Очень любите близких и родственников, стараетесь создавать для них все условия для комфортной жизни. Вам не чуждо дарить материальные блага любимым и просто малознакомым людям. Вы получаете искреннее удовольствие от своей профессиональной деятельности, что позволяет вам получать впечатляющие финансовые возможности.
<br><br>Для вас характерно занимать лидерские позиции благодаря своему позитивному отношению к миру. Способны заряжать собственной энергией все и всех вокруг. Ваша амбициозность и требовательность к себе сочетается с целеустремленностью и способностью развиваться в самый разных аспектах жизни. Стремитесь всегда довести дело до конца, не останавливаетесь на достигнутом.
<br><br>Не боитесь быть смешными, с удовольствием примитесь за организацию какого-либо увеселительного мероприятия. Не умеете долго переживать, воспринимаете свои ошибки и неудачи как очередной шанс достичь большего. Не обидчивы и сами не любите причинять боль и страдания другим людям. Вы постоянно активничаете, проявляете любовь к любой общественной деятельности. Готовы по максимум приложить все свои усилия, но при этом жертвенность – не про вас.  `
personalPanelItem.appendChild(paragraph);
break;
}
case 20: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(20) Вам от рождения дан дар ясновидения, вы умеете подключаться к любому информационному полю и черпать оттуда все необходимые вам сведения. У вас отлично развита интуиция. Довольно часто вам на ум внезапно приходят какие-то идеи или мысли. Складывается впечатление, что их вам кто-то нашептал. Способны предчувствовать различные обстоятельства. У вас есть способность исцелять людей, ясно видеть суть проблем. Стремитесь подсказывать окружающим людям правильное направление. В медитации можете получить все ответы на интересующие вас вопросы, новые знания и методики для исцеления родственников.
<br><br>Вы связаны незримыми нитями с кармой своего рода. В сновидениях часто видите умерших родственников, которые дают вам какие-то подсказки, предостерегают и направляют вас. В ваших же силах изучить историю своих предков, проанализировать все негативные программы и установки, с которыми не правился ваш род, трансформировать их в опыт и использовать для своего развития. Работая над самим собой, вы исцеляете карму своего рода и переходите на совершенно новый уровень бытия, где царит любовь, понимание и принятие.
<br><br>У вас прекрасные отношения со своими родителями и близкими, которым каждый может позавидовать. Ваш род – ваша опора и поддержка, без которых вы не смогли бы нормально функционировать. Вам важно знать, что ваши родственники вам всегда выслушают и поймут. И вы также готовы прийти к ним на помощь по первому же зову. Вы считаете себя человеком семейным, интересующимся своим происходящим. Вырабатываете заботу о своей семье. Считаете, что вы имеете сформированное мировоззрение и проверенную временем систему ценностей.
<br><br>Для вас характерно выступать посредником между враждующими и конфликтующими сторонами. Имеете дар убеждения, приводя при этом весомые доводы для примирения.
<br><br>У вас может быть дар целительства. Обладаете сильной энергетикой. Вам часто снятся вещие и пророческие сны, имеете развитую интуицию. Способны успешно получать информацию извне. Вы незаменимый сотрудник и друг, потому как глубоко понимаете, как устроена жизнь и ее законы. Не любите растрачивать энергию попусту, четко знаете в чем ваше предназначение в этой жизни. Испытываете интерес ко всему тайному и загадочному, что способствует развитию вашего любознательности и усидчивости.
<br><br>Можете часами и днями сидеть в поиске нужной для вас информации. У вас много различных увлечений и интересов. Способны не только узреть проблему в собственном семействе, но и оказываете посильную помощь в предотвращении трагедии. Всегда готовы помочь советом либо обратить внимание на важные детали для исправления ситуаций в судьбе других людей. Способны анализировать любую полученную информацию и правильно доносить личный опыт и знания до людей.  `
personalPanelItem.appendChild(paragraph);
break;
}
case 21: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(21) Вы миролюбивый человек, шагаете по миру с открытым сердцем. Для вас все религии едины и все люди вокруг – ваши родные братья и сестры. Высказывая демонстративно принятие этого мира и людей в нем приводит к получению поддержки отовсюду. Вы притягиваете с свою жизнь доброжелательных и приятных людей. Вы легки на подъем и любите путешествовать, при этом оперативно заводя новые связи и знакомства. У вас филологический склад ума.
<br><br>Вы привыкли мыслишь масштабно, вас постоянно необходимо расширять свое поле деятельности, ставите перед собой большие и амбициозные цели. Во время своего очередного путешествия вы черпаете для себя вдохновение. К вас приходят новые идеи и мысли, вы знакомитесь с интересными людьми. С людьми, с которыми чуть позже у вас рождаются масштабные проекты. Для вас в этом мире нет ничего невозможного. Вы знаете, что необходимо желать большего и тогда оно придет к вам в руки. Вы открыты к людям противоположного пола, любите их и уважаете.
<br><br>Окружающим кажется, что ваша планка слишком завышена, что вы мечтаете о чем-то несбыточном. Однако спустя какое-то время они видят картину, в которой вы уверенно приближаетесь к своей цели. Вы постоянно выходите из зоны своего комфорта и расширяете свое влияние, обновляете свои знания, навыки и умения. Ваша масштабность постоянно только растет, мечты становятся все более глобальными. Вам суждено осуществить свои замыслы, а ваша деятельность при этом всем приносит пользу большому количеству людей. Ваша миссия заключается в умении объединять людей, способствовать установлению мира и любви вокруг себя.
<br><br>Вы желаете видеть гармонию и мир вокруг себя, склонны примирять враждующие стороны и проявлять чудеса дипломатии. В ссорах предпочитаете держать нейтралитет, не принимаете чью-либо сторону. Ваше мнения для конфликтующих сторон играет большую роль, они слушают вас и примиряются друг с другом. Можете тонко и глубоко вникать в суть вещей.
<br><br>Для вас буквально открыты границы всего мира. Любите много путешествовать, узнавать что-то новое. Стремитесь побывать в каждой стране и вынести оттуда полезный опыт для саморазвития. Можете нести свои положительные идеалы и увлекать других собственными идеями. Из вас получаются хорошие преподаватели, лекторы в учебных заведениях. Можете стать организатором благотворительных фондов. У вас могут появляться возможности принять участие в одном из глобальных проектов, объединяющим каким-либо образом людей всего мира – от олимпиады до работы в модном доме всемирно известного брэнда.
<br><br>Любую информацию схватываете на лету, быстро учитесь и предпочитаете не копить полученные знания, а выливать их в массы. Вам легко даются иностранные языки. Лучшая деятельность для вас при этом – работа в крупных компаниях международного значения или хотя бы частые поездки за границу. Легко адаптируетесь к новым условиям проживания, будь то другой климат, культура либо новые обстоятельства.`
personalPanelItem.appendChild(paragraph);
break;
}
case 22: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(22) Для вас самое главное – полная свобода действий и отсутствие всяческих рамок и ограничений. Вы активны и легки на подъем. Вы счастливы просто потому, что вам подарили жизнь. Ведете себя как дитя, удивляетесь всему вокруг. Не устаете восхищаться красотой природы и найдете любой повод порадоваться даже незначительным мелочам. Вы чувствуете себя свободным человеком и способны даровать свободу другим. Не признаете никаких ограничений. Часто играете не по правилам жизни, бросаете вызов традициям, устоям, рамкам. Вы совершенно не заморачиваетесь тем, что о вас могут подумать другие люди. Хотите что-то сделать – делаете, даже если это привлечет к вам внимание окружающих.
<br><br>У вас имеется отменное чувство юмора, которое содержит в себе свои оттенки – иронию и сарказм. Открытый смех и тонкая улыбка являются для вас оружием против любых ограничений. Не терпите давления и авторитаризма на свою персону. Сотрудничаете только на условиях партнерства, равенства. Вся ваша жизнь наполнена фейерверками, она буквально представляет собой праздник, который не собирается заканчиваться в ближайшее время. Можете себе позволить иметь все, не цепляясь при этом ни за что.
<br><br>Поддерживаете доверительные отношения со своим партнером и близким окружением. Они вас не контролируют и вы это цените.  Вы также даете им свободу действий и слова.
<br><br>Не привязаны к материальным ценностям, но вас всегда есть достаточно денег, для того что вы хотите.  Любите создавать яркие воспоминания ежедневно, для вас важны новые впечатления. Не хотите оставаться на одном и том же месте. Считаете, что комфортные условия для жизни можно создать везде.
<br><br>Вы открытый человек, отличаетесь любознательностью. Легко переносите отсутствие элементарных удобств. Ощущаете себя частичкой природы, поэтому склонны стремиться к жизни в отдалении от городской суеты и вообще благ цивилизации. Не тяните за собой груз проблем из прошлого, легко с ним расстаетесь. Живете одним днем. Для вас важен свободный график жизни.
<br><br>Монотонный труд не для вас, поэтому предпочитаете заниматься творческой деятельностью – художник, дизайнер, садовод. Ваша творческая личность жаждет проявить свой креативный взгляд на жизнь. Не боитесь отличаться от окружающего мира. Выделяетесь своими суждениями, мнением и даже внешним видом. Склонны помогать людям в их выходе за мнимые рамки самоограничения и обрести настоящую свободу духа.`
personalPanelItem.appendChild(paragraph);
break;
}}
}}
}
if(isNegativeTitleOpened){
isNegativeTitleOpened = !isNegativeTitleOpened;
const text=document.createElement('p');
text.innerHTML='В негативе';
text.style.fontWeight='700';
personalPanelItem.appendChild(text);
}
if(index===0){
for (let i=0; i < array.length; i++){
if((i===0)||(i===1&&array[0]!==array[1])){
switch(array[i]){
case 1: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(1) Вы склонны себя переоценивать. Завышенная самооценка, эго и самомнение — частые ваши спутники по жизни. «Корона» на вашей голове вырастает очень быстро, особенно если есть повод, даже самый незначительный. Рост и развитие в любой сфере моментально делает из вас «эксперта», который всегда лучше знает, как надо жить.
<br><br>Вы эгоистичный человек, ваши потребностями стоят всегда на первом месте. Вы неустанно подчеркиваете свою значимость. Вам присущи нередкие эмоциональные качели и срывы из-за невыполненной задачи. Может случиться такое, что вы потеряете веру в собственные силы. Вами одолеет неуверенность в себе, в ваших лидерских качествах. Вам очень сложно найти самого себя, и в душе, такими темпами, расцветут комплексы. Вы все также будете считать себя гениями, которых просто-напросто мир не понимает и не признает.
<br><br>Властные и подавляющие других. Не идете на уступки, привыкли диктовать свои условия игры. Вам сложно работать в команде, где приходится учитывать интересы других людей. И хоть в какой-то мере поступаться своими.
<br><br>Неспособность полюбовно решить конфликт или разрешить ситуацию. Легче абстрагироваться от своей команды или других людей, с которыми идет взаимодействие, и строго поставить перед фактом: «Если вам что-то не нравится – я вас не держу». Нередко проявляют агрессию и давление на других людей, заставляя их подчиняться своей воле.
<br><br>У вас практически не бывает моральных терзаний. Если вам приспичило что-либо сделать, вы пройдете всюду, практически по головам, не взирая на последствия и приличия. Вы протиснитесь в самую узкую щель, ведь вы буквально не в силах сопротивляться вашей внутренней тяге.  В противовес всему этому – вы довольно быстро теряете интерес к тому чего достигли, и оно может не принести вам такой радости, на которую вы рассчитывали.
<br><br>Также вы можете злоупотреблять своими магическими способностями, как осознанно (в корыстных целях заниматься темной магией), так и бессознательно. Вы с легкостью можете «сглазить» или «накаркать» негативную ситуацию.  Просто пожелав человеку что-нибудь плохое, без задней мысли, вы материализуете это в его жизнь. Однако следует не забывать, что все негативные мысли, посланные окружающим, к вам же, в конечном счете, и возвращаются, приумножившись многократно в виде заболеваний или разрушающих ситуаций. В вас достаточно много агрессии, злобы, жестокости и хамства. Держите себя в руках, возьмите под контроль свои чувства и слова.
<br><br>Минус в гиперпроявленности:
<br><br>Когда чувствуется мощь и власть, то начинает просыпаться гордыня. Признается только своя ценность и только своя значимость, все остальные кажутся медленными, боязливыми.
<br><br>Проявляется эгоизм, подавление других людей, подчинение их своей воли. Такой человек себя будет чувствовать очень плохо.
<br><br>Не следует брать на себя желание за всех решить. Необходимо что-то сделать, потому что каждый должен идти своей дорогой – можно лишь рекомендовать, но не давить.
`
personalPanelItem.appendChild(paragraph);
break;
}
case 2: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(2) Стараетесь никому ничего не обещать, так как хорошо знаете, что не выполните его, либо затянете его реализацию. Вы ленивые и нерешительные – постоянно надо мотивировать вас и подталкивать к действиям, напоминать о данном слове.
<br><br>Вам очень сложно выйти из зоны комфорта, из привычного уклада жизни. Вы будете бурчать и высказывать свое недовольство по разным поводам, но так и не приступите к тому, чтобы что-то изменить в своей жизни, даже если это «что-то» незначительно. Для вас в порядке вещей ходить на нелюбимую работу. Натура противоречивая, в вас как будто идет борьба двух противоположных начал – белого и черного, добра и зла, мужского и женского, духовного и материального. Вам сложно соединить все это воедино и прийти к гармонии. В плохом распоряжении духу выступ
<br><br>Вам присуща переменчивость в собственном мнении, сегодня говорите одно, а завтра совсем другое.  Вас можно назвать мастером создания иллюзий. Все, что было сказано вами – вы ведь действительно в это верите, будто бы это на самом деле происходило в вашей жизни. Настолько окунулись в иллюзию своих рассказов, что буквально пережили это.
<br><br>Вы сами себе на уме, про таких говорят «люди с двойным дном». Нечестные, хитрые и изворотливые. Причем не только с людьми, которые вас окружают, но и с самим собой действуете по тому же механизму. В голове у вас происходит одно, а действуете абсолютно по-другому. Меняете маски и роли по щелчку пальцев. Вам очень сложно высказать кому-либо о своих истинных чувствах, поэтому установить с вами контакт довольно затруднительно.
<br><br>Крайность этого минуса - осознанное бесплодие. Это все идет от того, что вы не доверяете сами себе. Личность в раздрае: мозг тянет в одну сторону, душа - в другую. Из-за того, что в вас много сомнений, вы думаете, что другие люди, тоже такие же сомневающиеся и им доверять нельзя. Важно научиться доверять себе и прислушиваться к своей интуиции.
<br><br>Эта энергия дает множество сомнений и для совершения выбора необходимо медитировать - сесть или лечь и закрыть глаза, представить себе одну картинку и представить себе другую картинку и по первой реакции внутри принять решение.`
personalPanelItem.appendChild(paragraph);
break;
}
case 3: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(3) Женщина
<br><br>Властная авторитарная особа, которая контролирует всех и вся. Пытается за ранее предвидеть и решить проблемы до того как они появились.  Сложно передать свои полномочия, довериться кому-то.  Она прочно держит свой кулак сжатым.
<br><br>Завидует успешным женщинам и их благополучным семьям.
<br><br>Бывает зацикленна на карьере, статусе, признании и славе. Из-за этого, забывает о семье, рождении детей, а потом жалеете об этом и сетуете на то, что «уже слишком поздно».
<br><br>Женщина гребет на себя лишнюю ответственность, склонна все проверять, командовать, давить своим контролем. Она по определению, ментально сильнее мужчины, потому с энергией в минусе, ей легко задавить своего мужчину. От вечных обид и напряжения на мужчин могут возникать заболевания мочеполовой системы.
<br><br>И мужчина часто деградирует рядом с такой женщиной. Порой женщины говорят, что выходила замуж за такого классного парня, а он стал тряпкой, диванной подушкой и вообще ничего не может сделать без моего пинка и толчка. Это женщина его просто задавила и ему некуда встать, он старается не сопротивляться. Иногда мужчины не выдерживая прессинга, бьют таких женщин, потому что ментально чувствуют себя равными им по духу.
<br><br>Мужчина
<br><br>Подвержены женской энергии, поэтому могут быть истеричными, несдержанными, эмоциональными и вспыльчивыми. В семье, энергетически, мужчина может занять женское место, то есть будет избегать ответственности в принятии решений, может зарабатывать меньше, чем жена. Не будет иметь своего мнения, полностью подчиняясь своей «покровительнице».
<br><br>Не хватает мужественности, силы воли, твердости в характере. Мужчине сложно добиться высокого положения в социуме, научиться зарабатывать деньги. Он не в ладу с миром материи и не можете понять, как можно зарабатывать, купить квартиру, машину, обеспечить потребности своей собственной семьи.
<br><br>Не способен построить гармоничные отношения с женщиной.  Может испытывать по отношению к ним страхи, агрессию, обиду. Создается такое впечатление, что все женщины мира ополчились против такого мужчины. У него конфликты со своей матерью, с женой, дочками. Жизнь посылает ему постоянно женщин, которых он должен, безусловно, принять, простить, наладить с ними отношения. Есть и другая сторона медали. Такие мужчины могут быть и ловеласами, но не активными охотниками – завоевателями, а теми, кто позволяет себя любить. За него могут бороться несколько женщин, а он будет только наблюдать и примет победительницу.`
personalPanelItem.appendChild(paragraph);
break;
}
case 4: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(4) Женщина
<br><br>Занимающей мужскую позицию женщина, выталкивает энергетически из своего поля представителей сильной половины. Отсюда проблемы создания семьи. Настрой к мужчинам может быть агрессивным и воинственным. Придирки, нетерпимость, подавление. Тем самым, отталкивая их и лишая себя возможности, построить гармоничные и полноценные отношения. Бывают проблемы с зачатием. Придется потрудиться над наработкой мягкости и гибкости. Научиться впускать мужчин в свою жизнь и доверять им.
<br><br>Такие женщины комфортно чувствуют себя в мужском обществе. Часто и внешне одеваются как мужчины, коротко стригутся, предпочитают спортивный стиль в одежде, занимаются мужским родом деятельности, выбирают мужские профессии.
<br><br>Ваш высокий уровень ответственности за все, может переходить в контроль и гиперопеку. Это перерастает в тиранию над близкими. В отношении подчиненных такая же картина. Стремление к материальным благам может привести к  зацикленности на материальных ценностях.
<br><br>Следует активно работать над своей женственностью, осознанно понизить по вибрациям энергию дом императрицы, осознавать свои мужские лидерские способности и становиться более мягкой и текучей, свободной и раскрепощённой, подобной женской энергии. В судьбе отмечен знак сильного мужчины – покровителя.
<br><br>Мужчина
<br><br>Властность и авторитарность. В семье тиран, которому невозможно перечить.  Он же упрямый, как бык. «Доказывать что-то – бесполезно!» — именно так часто говорят домочадцы о своих мужчинах.  Не признают право других на индивидуальность и самоопределение. Категоричны, воинственны, высокомерны, злоупотребление властью.
<br><br>Душа черствая, зацикленность лишь на материальных благах, на уме – только власть и управление людьми. Бывает, позволяют себе агрессивные выпады, любят спорить и доказывать свою правоту. Устанавливают жесткий контроль над окружающими людьми и лишают их права выбора. Даже если понимают, что их решение ошибочно, все равно будут гнуть свою линию, идти всем наперекор. Если не добиваются своего, очень страдают и чувствуют себя несчастными.
<br><br>Но есть и другой оттенок энергии — это полная бездейственность и неумение выполнять мужские функции в семье, на работе, в социуме. Могут быть истеричными, несдержанными, эмоциональными и вспыльчивыми. Чрезмерная мягкость, нежелание принимать на себя ответственность.`
personalPanelItem.appendChild(paragraph);
break;
}
case 5: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(5) Ограничены в своем мировоззрении, сидите в своих рамках и ими меряете всех окружающих. Жесткие и категоричные.
<br><br>Увлекшись чем-нибудь, перестаете замечать вокруг себя людей с другой жизненной позицией. А если и замечаете, то непременно вступаете в спор, убеждая собеседника в своей правоте, часто делая это агрессивно и эмоционально. «Есть две точки зрения: моя и неправильная» — вот по такому принципу живут пятерки в «минусе».
<br><br>Вы склонны контролировать окружающих – и прежде всего свою семью. Из - за этого нередко возникают конфликты. Как следствие, сами обижаетесь на родственников, обвиняя в том, что вас недостаточно ценят и любят.
<br><br>Часто и сами не можете вырваться из опеки родителей. Не можете устроить свою личную жизнь, вырваться из родовой системы, открепиться, начать самостоятельную жизнь. Осуждение, гордыня, желание управлять, властвовать, подавлять — вот «минусовые» черты характера, над которыми следует работать.
<br><br>Или другая крайность минуса – эти люди боятся становиться учителями. Кажется, что вы еще не достаточно знаете и умеете. Синдром самозванца появляется от неуверенности в своих силах. Начните отдавать – и вы увидите, как легко пойдет процесс.
<br><br>Также подсознательно, в «минусе» боитесь конкуренции. Вы скупитесь передавать свои знания другим людям, чтобы, не дай Бог, кто-то не стал лучше вас. Постоянно что-то доказываете, скрываете информацию, подчеркивая свою исключительность.
`
personalPanelItem.appendChild(paragraph);
break;
}
case 6: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(6) Часто даете волю своим эмоциям, агрессивны и мнительны. Можете раздуть проблему, а потом мучиться от негативных мыслей. Важно мнение окружающий людей. Вам нужно всем нравиться, чтобы вас любили и ни в коем случае, не подумали что-то плохое. Желание казаться лучше для всех, может быть настолько сильным, что будете постоянно подстраиваться под других, исполнять чужие прихоти, тем самым теряя свое истинное «Я». Если вы с кем-то поспорили, то всю ночь эти мысли вас изматывают, не дают покоя.
<br><br>Вы болтливы и не умеете держать язык за зубами. Можете сплетничать и осуждать людей за их спинами. Ставите высокую планку, и если люди не будуте ей соответствовать, то обеспечены придирки и претензии. Трудно принимать людей такими, какими они есть.
<br><br>
<br><br>Бываете зациклены на отношениях, которые уже давным-давно умерли. Может появляется страх одиночества, и вы готовы спасать любыми способами отношения, даже те, которые изжили себя. В погоне за любовью, часто меняете партнеров или же встречаетесь с несколькими сразу. Чувство недолюбленности – из детства, поэтому легко ведетесь на красивые слова, поступки и комплименты.
<br><br>Высокие требования и к себе, постоянно себя критикуете. Вам сложно полюбить себя. Постоянные страдания от осознания своих «недостатков», и чем больше стремление к совершенству, тем сильнее понимание «несовершенства» своей природы. Настоящее наказание– признать свою неправоту и сказать: «Да, я не идеален».
<br><br>Глубинная нелюбовь к себе - вот с чем приходится вам работать в этом воплощении. Частое разочарование в людях, поскольку сначала идеализируете их.
<br><br>Из-за этого вы можете бояться принять любовь в свою жизнь, опасаться серьезных отношений, так как не доверяете партнерам.
<br><br>Цените только внешнее, только материальное проявление, материальные вещи, неспособность полноценно отдаваться в отношениях, любить и быть искренним человеком.Мнительность, недоверчивость, ранимость, потому что внутри нет духовного стержня и опоры в виде любви к
<br><br>себе, который сам себя поддерживает. Без любви к себе он сам себе не верит и не доверяет людям вокруг.
`
personalPanelItem.appendChild(paragraph);
break;
}
case 7: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(7) Вы сметаете все на своем пути, лишь бы достичь собственных целей. Вся жизнь ваша построена на борьбе с видимыми и не видимыми врагами. Идете по головам. Вам сложно дается прощения самого себя. Жизнь для вас – бег с препятствиями. В результате этого, она полна трудностей, так как ваше подсознание выстраивает преграды в реальности, которые вам просто необходимо преодолеть, что-то доказать, сражаться. Вы можете даже получить от этого всего кайф, на который затрачивается колоссальное количество нервов и энергии.
<br><br>Для вас важно доказать обществу, что вы значимы. Вы много работаете, устаете, перенапрягаетесь. Страдаете от своего трудоголизма и наносите дискомфорт своим близким. Предъявляете к себе различные претензии – якобы мало сделали и могли бы больше дел сотворить. Высказываете постоянное недовольство своими достижениями. Они оцениваются для вас, как мелкие и незначительные. Придираетесь к себе по поводу и без.
<br><br>Если социально не реализовываетесь, то очень страдаете.
<br><br>Вы можете начать разрушать собственные отношения с окружающими. В таком случае, в вашу жизнь приходит застой, становитесь слепы к ориентирам и к целям. Возникают сложности с пониманием того, куда двигаться и чем заниматься. Все это происходит для того, чтобы вы остановились и увидели, где вы поступили неправильно, кого обидели, кому нагрубили. Отсутствие динамики – обратная сторона вашей положительной энергии.   `
personalPanelItem.appendChild(paragraph);
break;
}
case 8: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(8) Частенько притягиваете к себе ситуации, в которых с вами поступают несправедливо, постоянно спорите, отстаивая свою позицию. Требуете с других, часто закрывая глаза на свои проступки. При этом всем склонны осуждать. Вы категоричны и не можете видеть мир целостно во всех его проявлениях. Агрессивны, резки и напористы. Вы стремитесь любой ценой прийти к соблюдению обязывающих норм и правил, как законодательных, так и общечеловеческих, что приводит к тому, что вас начинают считать педантичным, чудным и нудным.
<br><br>В вашей душе живет гордыня – всегда вы правы, и никто другой. Обвиняете в своих бедах всех вокруг, вместо того, чтобы взять ответственность за свою жизнь и за себя. Вы вспыльчивы и быстро ведетесь на провокации других людей, теряете баланс и равновесие.  Вам, как борцу за справедливость, трудно измениться. Вам сложно осознать, что нужно «почистить» все свои негативные мысли об окружающих, - и тогда ваша реальность, будто по мгновению волшебной палочки, преобразится.
<br><br>У вас часто повторяются одни и те же ситуации. Следовательно, вы не извлекаете уроки из происходящего и проживаете одни и те же сценарии до тех пор, пока не станете мягче, терпимее. Пока не дойдете до познания причинно-следственного закона бытия. С каждым разом ситуация будет становиться все жестче и жестче, заставляя вас задуматься над своими проступками. `
personalPanelItem.appendChild(paragraph);
break;
}
case 9: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(9) Вы с легкостью можете стать отшельником – замкнуты, недоверчивы, осторожны. Вам очень сложно пойти на контакт с людьми и наладить с ними доверительные и искренние отношения. Основная черта вашего характера – подозрительность ко всему окружающему миру. Разочаровавшись в ком-то однажды, вам очень сложно снова пойти на сближение. И, чтобы снова не переживать предательство близкого человека, вам проще просто не подпускать к себе никого.
<br><br>Проявляете мало заботы к своему физическом у и духовному состоянию. Вам все равно на ваш внешний вид, тело, жилище. Со стороны, возможно, вы выглядите как-то несуразно, небрежно, но вас это не беспокоит.
<br><br>Позволяете себе в речи множество заумных слов и фраз, которые вводят остальных в ступор.  Временами ставите себя выше окружающих себя людей. Отсюда же может возникнуть чрезмерная гордыня, осуждение других. Вам характерно учиться просто ради самого процесса обучения, при этом вы не склонны делиться ими с близкими людьми. Как раз наоборот, получаете знания только чтобы возвыситься над ними. Вам сложно принять материальное благо, часто осуждаете богатых процветающих людей.
<br><br>Бывает такое, что вы не можете найти себе партнера по жизни, либо даже просто близкого друга. А бывает так, что все у вас имеется – и друг, и жена, и дети, – но вы все равно чувствуете себя одиноким и не понятым никем из вашего окружения. Вы ощущаете дискомфорт в собственной семье. Вам кажется, что вас никто не знает – вы просто-напросто одинок, даже если находитесь в окружении людей.
<br><br>Вы стараетесь окружить себя техникой – у вас постоянно работает телевизор, радио, включены различные передачи – лишь бы не было тишины. Вы не хотите остаться наедине с самим собой. Все это ваша попытка заглушить тишину, которая вас окружает и в какой-то момент даже поглощает.
<br><br>Еще один «минус» — неуверенность в себе. Обладая какими – то интеллектуальными знаниями и способностями, нет возможности их реализовать, поскольку вы не верите в то, что ваши таланты понадобятся миру. И, таким образом. «консервируете» в себе все то, чем наделил Бог.`
personalPanelItem.appendChild(paragraph);
break;
}
case 10: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(10) Стоит вам начать нервничать, беспокоиться и суетиться, вас настигают негативные перемены. Свернув со своего счастливого пути, хватаетесь за любую, попавшуюся  на глаза, возможность, беретесь за труд, который вас сильно изматывает. При несоблюдении вами золотой середины в жизни начинаются неприятности.
<br><br>Вы частенько оказываетесь в ситуациях, которые можно описать фразой «не в своей тарелке». Легко можете поддаться какому-нибудь заманчивому предложению, купите какую-нибудь вещь, вступите в какие-то отношения; и спустя какое-то время вы начнете задумываться о том, что вы вообще делаете с этими всеми приобретениями. «Это все – не мое» - вот что вы думаете.
<br><br>Для вас характерно браться за множество дел сразу, при этом бросая остальные незавершенными – учеба, создание семьи, различные проекты в профессии. Любите откладывать все дела на потом. Забываете об обещаниях, которые когда-то дали близкому человеку.  Недоверие к самому себе сбивает вас с пути, вы сами себе проставляете препятствия и блоки. Приливы вашего отчаянного трудоголизма с периодичностью сменяются ленью.
<br><br>Порой вы боитесь принимать решения, не хотите брать за себя ответственность.. Эмоциональные скачки сказываются на вашей физическом и эмоциональном состоянии. Таким образом усиливается нервозность, нарушается сон, перепады настроения, отказываетесь от питания – все это приводит к истощению и упадку сил.
<br><br>Ждете от Вселенной или окружающих «волшебного пенделя», чтобы снова запустить энергию движения. Вы можете быть плаксивыми, инертными. Вы придумываете себе различного рода отговорки, лишь бы ничего не делать. Ваша жизнь становится скучной, однообразной и неинтересной. Вы очень внушаемы, часто становитесь пешками в чужой игре, можете поддаться под чужое влияние. Рискуете оказаться либо в плохой компании, либо оказаться в подчинении сильного авторитарного лидера, который будет вить из вас веревки.
<br><br>Вы живете в постоянном напряжении: боитесь за собственное будущее, волнуетесь о своих заработках. Все время произносите фразу: «Я переживаю». Чем больше вы поддаетесь напряжению и негативным эмоциям, тем быстрее вы выпадаете из потока удачи. Таким образом, ваша жизнь складывается сложнее – вы буквально гребете против течения.`
personalPanelItem.appendChild(paragraph);
break;
}
case 11: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(11) Вы можете работать на износ, не даете себе передохнуть. Перенапрягаетесь и страдаете от собственной загруженности. Частенько по вам видно, что вы измождены, но упорно продолжаете твердить свое. Если и даете себе время на отдых, то чувствуете себя виноватым. Потому как вам кажется, что вы пропускаете какие-то важные события.  Можете специально придумывать для себя работу, чтобы не допускать мысли о семье и бытовых проблемах. Можно сказать, таким методом вы убегаете от своих проблем в жизни, прикрывая все это рабочими моментами. Вам характерно трудиться на грани собственных сил – разрушаете самого себя.
<br><br>Вам хочется всего и сразу. Процесс ожидания вас сильно изводит. Для вас чего-то ждать – настоящее мучение, вы начинаете злиться, нервничать, раздражаться и агрессировать.
<br><br> Ведете себя агрессивно, заносчиво, вступаете в конфликты. Стремитесь быть впереди всех, при этом унижая и, нередко, уничтожая окружающих, даже близких друзей. Не терпите критики и осуждения своих поступков со стороны других людей.
<br><br>Вам очень сложно расслабиться, и начинаете раздражаться, когда окружающие вас люди медлительны или вовсе бездействуют. Слишком высокую планку задаете для самого себя и других людей. Требовательны к своей внешности, физическому состоянию, соответственно, приказным тоном призываете остальных к тому же.
<br><br>Не можете подстроиться под перепады собственного настроения. Не умеете наслаждаться настоящим, вам сложно увидеть ситуацию здесь и сейчас. Постоянно жалуетесь, что тянете все на себе. Часто выражаете свои обиды, придирки, претензии.
<br><br>Ваша чрезмерная требовательность зачастую приводит к разладу в семействе и разрыву отношений с близкими друзьями, родственниками. Нетерпимость к слабостям других выливается в нравоучительные нотации и навязывание своих методик управления телом и духом. Считаете себя человеком отстраненным, закрытым в себе. Склонны к рефлексии и медитации. Вы видите мир иначе, чем другие люди, что склоняет вас к мысли: «Я просто не приспособлен сосуществовать с обществом».
`
personalPanelItem.appendChild(paragraph);
break;
}
case 12: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(12) Из-за своей жертвенности слишком близко к сердцу принимаете чужие проблемы. Они буквально становятся вашими собственными. Впоследствии чего страдаете от депрессии и апатии. Забываете о своих нуждах и потребностях – многое делаете в ущерб своей личности. Вы терпеливы и лучше проглотите обиду – промолчите, но внутри будете неистово страдать.
<br><br>Часто не желаете отпускать родного человека, преследуя его. Надоедаете ему постоянными звонками и сообщениями, устраиваете публичные демонстрации своего душевного состояния.
<br><br>Если случается так, что вы не справляетесь с ситуацией – претворяетесь, что ничего не произошло, игнорируете проблему. Это все выражается в опозданиях, пессимистичном настроении, апатии. Можете по-настоящему заболеть на фоне всего этого. Невозможность, а скорее даже неумение, говорить «нет» каждому встречному приводит к деградации собственного «я».
<br><br>Часто испытываете материальные проблемы, вам стыдно брать деньги за выполненную работу. По итогу трудитесь за копейки, а порой и бесплатно. Вы не можете постоять за себя и позволяете окружающим «садиться вам на шею». Когда вам предлагают помощь, вы категорически против того, чтобы ее принять. А потом жалуетесь на то, что вами пользуются. У вас нарушен баланс «давать-принимать».
<br><br>Вы помогаете людям напоказ – оказываете помощь, а потом наглядно всем окружающим сообщаете об этом. Вы ждете благодарности и признание за свои свершения. Вы получаете любовь с помощью своей жертвенности, потому как не понимаете, каким образом ее можно получить еще. В некоторые моменты получаете даже мазохистское удовольствие от собственных страданий. В таком случае вашей любимой фразой является: «Не делай добра – не получишь зла».
<br><br>Корни вашей жертвенности уходят в нелюбовь к себе. Вы подолгу можете зависеть от каких-то ситуаций, вам не хватает решимости сделать первый шаг навстречу изменениям.`
personalPanelItem.appendChild(paragraph);
break;
}
case 13: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(13) Вы склонны браться за несколько дел сразу и ни одно из них не доводить до завершения.  Скажите в лоб другим людям все, что вас не устраивает, что вы о них думаете, обидите и даже не заметите. Возникают сложности с распределением времени и обязанностей – это приводит к беспорядку не только в делах, но и в вашей личной жизни. В погоне за экстремальными развлечениями забываете о таких человеческих качествах как забота и внимание.  Вы сумасбродные, чрезмерно рискованные, суетливые. Не соотносите свои силы и возможности, за что часто расплачиваетесь своим здоровьем, а порой – и жизнью. Вы получаете некоторое удовольствие от моментов, когда ваша жизнь находится на волоске – вам нравится подвергать себя серьезным опасностям. Таким образом получаете сильные эмоции, которые окрашивают вашу жизнь яркими красками.
<br><br>Вы любите вмешиваться в различные дела, разговоры и обстоятельства. Вам во всем хочется поучаствовать. Пытаетесь внести перемены и разрушения насильно там, где к ним еще не готовы. При несовпадении действительности с желаемым результатом появляются вспышки ярости, агрессии, которые направлены на более слабого и беззащитного человека. Преднамеренно выискиваете у соперника слабые места для выражения своего превосходства над ним.
<br><br>Можете быть непредсказуемым не только для окружающих людей, но и для самого себя. Страдаете от своего непостоянства, вспышек агрессии и перепадов настроения. В ситуациях, когда вы извергаете негативную энергию, может ломаться техника, перегореть лампочка и т.д.   Временами для вас характерно держаться за прошлое – сильно захламлять свой дом ненужными вещами. `
personalPanelItem.appendChild(paragraph);
break;
}
case 14: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(14) Вы, чувствительная и ранимая натура, которая сама себе может мешать наслаждаться прекрасными проявлениями природных богатств. Ваше сердце вам говорит одно, а разум – совсем другое. Вы склонны доверять своему уму и делать выбор в его пользу, что, зачастую, приводит к ловушке. Для вас очень важно мнение окружающих и, прежде чем принять решение, вы со всеми советуетесь.
<br><br>Склонны отказываться от прекрасного постижения жизни, в пользу зацикленности на материальных благах. Присущее вам чувство зависти к чужому успеху, нередко доводит до маниакального стремления быть лучшим во всем – быть талантливее, незаменимее, что приводит к вашему полному истощению.
<br><br>
<br><br>Можете быть грубыми, капризными, обидчивыми и несдержанными. Вам очень сложно отпустить обиды. Частенько ведете себя импульсивно и инфантильно, постоянно требуете чего-то от других.  Не привыкли таить своих чувств, все выносите напоказ – любите демонстративно пострадать, нуждаетесь в постоянной похвале и одобрении.Вы не умеете либо не хотите прощать никаких обид, часто разочаровываетесь в окружающих.  Уходите в себя и становитесь замкнутым.
<br><br>
<br><br>В периоды плохого настроения вы склонны пускать свою жизнь на самотек, не знаете меры в еде. Есть большой риск появления у вас вредных привычек и сильных зависимостей(алкогольной, наркотической, игровой, обжорству), от которых не сможете избавиться на протяжении всего своего жизненного пути.
<br><br>Вам очень сложно раскрыть свои потенциальные творческие способности, реализовать их. Не слушаете свою душу, которая требует от вас реализоваться, как творческая личность. Делаете выбор в пользу разума, думающего лишь о том, как заработать деньги. Не верите в то, что существуют какие-то Высшие силы.
`
personalPanelItem.appendChild(paragraph);
break;
}
case 15: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(15) Вы постоянно сталкиваетесь с искушениями этого мира: деньги, слава, наркотики, власть, секс, излишества, алкоголь, ревность, страсть. Самая отрицательная черта вашего характера – агрессивность. Выражаете агрессию на себя, на людей, на весь мир в целом. Желаете управлять окружающим миром и людьми, при этом подавляя их и навязывая свою собственную волю. Для вас характерно поддаваться различным зависимостям: алкоголь, наркотики и компьютерные игры.
<br><br>Склонны чрезмерно опекать, ревновать своих близких, подавляя их свободу и проявляя к ним жестокий контроль.  Если ваша сила духа слаба, то вы непременно поддадитесь этим дьявольским провокациям и опуститесь на самое дно жизни. Временами складывается впечатление, что сам Дьявол говорит вашими устами. Вы очень категоричны и склонны настаивать на том, что будет все именно так, как вы того хотите. Вам не чуждо манипулировать другими – в случае невыполнения окружающими людьми ваших требований, вы грозитесь обидеться и перестать разговаривать с ними.
<br><br>Вы выражаете огромную любовь к роскоши, постоянно стремитесь заполучить себе как можно больше материальных благ, что с легкостью сбивает вас с истинно правильного пути. Жажда власти делает вас жестоким человеком по отношению к подчиненным, готовы на любые пакости лишь бы достичь своей цели, даже пойти на предательство.
<br><br>Чрезмерная уверенность в своем авторитете, может в одночасье разрушить вашу идеальную жизнь. Встречаются случаи использования вами черной магии. Увлекшись потусторонними силами, есть большой риск закрыть собственноручно светлую сторону вашей личности. Таким образом можете стать равнодушным и скрытным человеком, что отдалит от вас родных и близких. Участятся случи эмоциональных срывов в людных местах. `
personalPanelItem.appendChild(paragraph);
break;
}
case 16: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(16) Вы даже не осознаете, что жизнь забирает все, за что вы так яростно цепляетесь. Держитесь за различные вещи, как в духовном, так и в материальном плане. Неспособны принимать какие-либо серьезные перемены и судьбоносные события в собственной жизни. Ваше нежелание развиваться приводит к тому, что они все-таки происходят, только в этот раз резко и непредсказуемо – через страдания и потери.
<br><br>Для вас характерно проявлять жадность и скупость. Впадаете из крайности в крайность – либо совершаете попытку уйти от проблем и реального мира, либо подвергаете себя чрезмерному риску. Ваша эмоциональная закрытость способствует недоверию со стороны окружающих.
<br><br>С вами очень сложно наладить контакт, практически невозможно прийти к общему соглашению. Часто испытываете всплески неконтролируемого гнева и агрессии. Склонны зацикливаться на одном происшествии, разрушать себя и все вокруг.
<br><br>Вы можете иметь плохое физическое состояние, часто попадаете в различные несчастные случаи. Возникают угрозы жизни и здоровью.  Ваше спасение заключается в переосмыслении собственных ценностей, необходимо изменить свое мировоззрение.
<br><br>Чаще всего ваша карма из прошлых воплощений настолько отяжелела, что придется усиленно поработать над очищением своей души, мыслей. Отличаетесь жестокостью, вспыльчивостью, властностью по отношению к окружающему миру. Желаете, чтобы весь мир плясал под вашу дудку.  Навязываете другим людям свою волю.
<br><br>Вы узко мыслите и не стремитесь как-либо развиваться. Не хотите принимать разнообразные идеи и мнения. Проявляете предвзятость по разным вопросам и темам. Вашему развитию мешает страх оказаться неправым, страх неизвестного, страх каких-либо перемен. `
personalPanelItem.appendChild(paragraph);
break;
}
case 17: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(17) Вы постоянно мечтаете о славе и известности. Жаждете признания даже тогда, когда творчество не до конца реализовано вами. Часто никак не можете раскрыть в себе тот потенциал, который в вас заложен с рождения. Либо же вам не удается совместить творчество с материальной составляющей жизни. Ваше любимое дело не приносит вам денег. В вашей подсознании укоренилась установка: «Творчеством заработать у меня точно не получится».
<br><br>Проживаете свою жизнь тоскливо и уныло, постоянно вас одолевает скука. Ничего не цепляет ваш взгляд, ничем вы не интересуетесь. Часто впадаете в депрессивное состояние. Подвержены апатии и склонны считать себя непризнанным гением. Предпочитаете блеклый и незаметный стиль в одежде. «Серая мышь» - это про вас. Ходите на нелюбимую работу. Вас постоянно преследует ощущение, что жизнь пролетает мимо вас и в ней нет никакого смысла.
<br><br>Легко можете заболеть звездной болезнью – начинаете считать себя буквально Божеством. Ставите себя выше других людей, смотри на них свысока. Думаете, что вы избранная и уникальная личность. Общаетесь с окружающими свысока. Склонны зацикливаться на бытовых вопросах, цените лишь деньги и предметы роскоши. Желаете иметь все только гламурное, дорогое и брендовое.
<br><br>Нуждаетесь в постоянной подпитке в виде поддержки со стороны близких. Предпочитаете не делиться своими наработками, щепетильно подходите к охране своего творения от посторонних глаз. Склонны выражать чрезмерную гордость и заносчивость.
<br><br>Становитесь эгоистичными и истеричными, порой даже жестокими. У вас возникают проблемы с тем, чтобы организовать себя. Начинаете вести беспорядочный образ жизни. Не можете сконцентрироваться на чем-то одном, из-за чего сложно добиться успеха.
<br><br>Вы с детства подаете большие надежды, а вот во взрослой жизни становитесь заурядным человеком с задатками способностей, которые вы не развиваете в себе. Склонны разбрасываться временем. Ваша неорганизованность, капризность, апатия – все это мешает вам реализоваться в социуме. У вас часто бывают творческие кризисы.. Не принимаете помощь близких людей и родственников, закрываетесь от всего мира. `
personalPanelItem.appendChild(paragraph);
break;
}
case 18: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(18) Ваши мысли легко материализуются, поэтому негативное мышление сводит на нет все ваши природные преимущества. Отрицательная энергия влияет на ваше окружение. Часто чувствуете себя дискомфортно. Вас может тянуть к черной магии, колдовству. Можете делать привороты и насылать порчу на других людей. Регулярно ходите к гадалкам, экстрасенсам. Хотите знать будущее и уметь влиять на других людей с помощью различных ритуалов. Однако вам они даже не нужны по большей мере. Достаточно лишь подумать или сказать в сторону человеку что-то, и оно обязательно сбудется – настолько сильная у вас энергетика и сила мысли. Для вас характерно бездействовать и лениться, пребывать в инертном состоянии. Не планируете что-то менять в себе, все равно все заполучите благодаря магическим ритуалам.
<br><br>Вы глазливые, обидчивые и злопамятные. Утаиваете злобу и чувства огорчения долго время. Вам очень трудно забыть, а уж тем более простить обидчика. Нанесенные вам оскорбления все еще свежи в вашей памяти, хоть они и произошли уже давно. Мечтаете расквитаться с теми, кто, по вашему мнению, является виновником вашего горя. Однако, сделанное вами зло, обязательно вернется к вам в удвоенном размере.
<br><br>Вам не сладко живется в этой жизни, как и вашим детям. Так и будете притягивать в свою жизнь несчастья, если не начнете меняться в лучшую сторону. Вам необходимо закрыть кармические долги прошлого воплощения. У вас очень много страхов, вы постоянно о них думаете. Ваши опасения легко воплотятся в реальности, потому как сила мысли так же притягивает и негативные последствия для вас самих. Иногда страхи осознанные, и вы напрямую заявляете, чего боитесь. Например, поменять место работы, отношений, страх умереть от неизлечимой болезни.
<br><br>Вам нечем дышать и хочется убежать подальше от необходимости поддерживать беседу с людьми. Различные страхи и сомнения мешают вашему развитию. Из-за чрезмерной мнительности закрываетесь в себе и не принимаете никакой помощи от близких и родственников.
<br><br>Впадаете в депрессивное состояние, из которого потом будет очень сложно выбраться. Зачастую приходится обращаться за помощью к специалистам. Не умеете слушать самого себя и не управляете своими силами и сознанием. Стремитесь почувствовать власть над миром и, когда вам это удается, появляется риск встать на сторону зла и подчистую забыть главное правило жизни – не навреди. Вы боитесь, что вас разоблачат, что способствует появлению различных фобий. Они могут загнать вас в угол и трансформировать из сильной и подавляющей личности в беспомощного младенца. Потерявшись в своих сомнениях, вообще можете перестать что-либо делать. Нереализованные желания и потребности продолжают вас мучать и истощать энергетически. `
personalPanelItem.appendChild(paragraph);
break;
}
case 19: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(19) Вы проявляете повышенную требовательность. У вас появляется навязчивое желание постоянно быть в центре внимания, развивается тщеславие. Вам очень сложно взять под контроль свои эмоции, ведь жажда власти над другими сильнее. Стремитесь навязать свое видение и мнение другому человеку, хотите все и всех контролировать. Окружающие часто говорят о том, что вас «слишком много».  Они быстро устают от вашего чрезмерного внимания и поручений. Вам не хватает тонкости, корректности, вежливости и умения слушать.
<br><br>Вы очень прямолинейны, эгоцентричны, вспыльчивы, экстравертны и ненасытны. Думаете только о себе. Вам сложно добиться признания, славы и уважения. Зациклены только на материальном, забывая при этом о собственном процветании в других сферах. Вы та самая женщина, которая регулярно берет на себя мужские обязанности и все несет на своих хрупких плечах, а потом жалуется на то, что мужики уже не те, что были раньше.
<br><br>Постоянно подвержены чувству вины. Не можете от него избавиться, выжигаете себя изнутри. Не можете простить себе каких-то ошибок и неудач, тем самым притягиваете в свою жизнь ситуации, в которых вам приходится терпеть унижения и наказание. У вас часто повышается температура, возникают различные пожары и короткие замыкания. Вы стремитесь вступить в благотворительные организации только лишь для того, чтобы забрать все денежные средства себе. Очень легко поддаетесь искушениям, вам сложно им противостоять. Точнее, вы даже не пытаетесь с ними бороться.
<br><br>При случаях, когда вам некуда слить всю свою энергию и кипучую деятельность, вы легко можете впасть в депрессивное состояние. Выбираете для себя одно дело и копаетесь в нем до последнего, возвращаетесь к нему снова и снова, забывая при этом о жизни вообще. Перестаете замечать окружающих, мало спите и много работаете. Если что-то идет не так, как задумано, начинаете тут же винить себя. Раз планы ваши порушились, значит проблема в вас самих – так вы думаете. Начинаете все больше и больше копаться в себе.
<br><br>У вас может возникнуть безразличие ко всему происходящему вокруг вас и нежелание заниматься чем-либо вообще. Для вас характерно полностью фокусироваться и зацикливаться на одном человеке. Обрушиваете на себя всю свою энергию и заботу. Требуете его постоянного внимания к своей персоне. Вам необходимо регулярно быть с этим человеком. Начинаете контролировать личную переписку, вплоть до отслеживания его расписания. Затем вы лишь удивляетесь, когда этот человек сбегает от вас подальше.
<br><br>Мучаетесь от постоянных перепадов настроения. Подавляющее большинство воспринимают как деспота.`
personalPanelItem.appendChild(paragraph);
break;
}
case 20: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(20) Используя имеющиеся у вас навыки и способности, можете начать подчинять своей воле других людей достаточно агрессивно. Проявляете нетерпение и неуважение к самым близким. Вам не чуждо наносить телесные повреждения либо использовать физическую силу в порыве гнева. Не готовы признавать свои ошибки и недостатки.
<br><br>В своих взаимоотношениях с близкими и родственниками склонны впадать из крайности в крайность – ибо вы зациклены на семье и боитесь их потерять, либо провоцируете скандалы, при этом выражая абсолютное неуважение, гордыню, что приводит к плохим отношениям. Может дойти даже до судебных разбирательств. Жаждете во всем их поучать, потому что считаете себя умнее и лучше их во всем. Копите обиды на протяжении всей своей жизни. Регулярно критикуете родителей по любому поводу – за их слова и поступки. Вам очень сложно принять их такими, какие они есть на самом деле. Из ваших уст можно услышать такие фразы: «Я не понимаю, почему ты поступила\\поступила именно так?», «Как можно было прожить свою жизнь так бездарно?».
<br><br>Подвергаетесь различным страхам, обидам, чувству вины, депрессиям.
<br><br>Практически не скрываете свою тягу к материальным благам, концентрируетесь на финансовых возможностях. Стараясь заполучить как можно больше, склонны забывать о нравственной стороне достижения богатства. Вы жадный и меркантильный человек, боитесь потерять статус финансовой независимости.
<br><br>Вы человек осуждающий и непримиримый. Вы повержены кармическим заболевания и, как правило, не имеете цели в жизни, поэтому «ломаете» голову над тем, как же ее обрести. Вы не понимаете, в чем заключается смысл бытия и для чего вы были рождены. У вас спутанное сознание и ничего не цепляет ваш взгляд. Вы ничем не интересуетесь в жизни.`
personalPanelItem.appendChild(paragraph);
break;
}
case 21: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(21) Вы вечно всем недовольны, критикуете религии других людей, все государственные и юридические системы, власть и оппозицию. Вы глобально не довольны всей системой мироздания. Часто сетуете на то, что вашим планам и целям не суждено сбыться, поскольку вы родились не в то время и не в том месте. По вашему мнению, вы родились не в «нормальной» стране. Вы уверены, что в ваших бедах и проблемах виновато правительство, соседи, родители, неправильный строй и те, кто пытается вас как-то изменить. Ваше недовольство порой зашкаливает, нередко проявляете агрессию и участвуете в различных войнах.
<br><br>Вы сами для себя ментально установили, что мир очень опасное место и добиться чего-то возможно только лишь использовав кулаки. Вам кажется, что за вас никто и никогда не постоит, ведь Вселенная очень враждебная среда. Вы недовольны тем, что имеете, вам всегда всего мало. Даже не задумываетесь о том, чтобы поблагодарить высшие силы за те блага, которые уже имеете. Ваша неблагодарность блокирует приход в вашу жизнь новых возможностей и разного рода благ. У вас очень узкое мышление, вам сложно выйти из своих рамок и ограничений. Жаждете иметь все и сразу. Нетерпеливы и не умеет двигаться вперед к своей цели поэтапно, потому что неспособны довести дело до логического завершения. Если вы не получаете желаемое мгновенно, склонны отпустить руки и перестать верить в себя. Вы буквально несете разрушения в мир, из-за вас, вполне возможно, пострадает множество людей. Вы имеете склонность к гомосексуализму, относитесь к этому как к эксперименту. При этом имеете ограничивающие убеждения против секс меньшинств. Осуждаете и не принимаете, что лично вам кажется плохим, аморальным и не правильным.
<br><br>В своем худшем расположении духа вместо объединения людей вы способствуете разлад и несете разрушения. Не умеете вовремя остановить себя в словесном поединке, причиняя окружающим страдания. Легко замыкаетесь в себе и самостоятельно раздуваете скандалы и конфликты.`
personalPanelItem.appendChild(paragraph);
break;
}
case 22: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(22) Вы целиком и полностью упустили свою свободу. Теперь ведете несвободный образ жизни: по болезни, по отсутствию финансов, по ревности, из-за привязки к наркотикам и алкоголю, секты, ограниченность в передвижении. Есть вероятность того, что вы попадете в место лишения свободы. Возможны заключения в тюрьму. Вы безответственны и ленивы. Не хотите брать на себя какие-либо обязанности либо обязательства. Презираете правила и законы. Думаете, что все вокруг такие же, как и вы. Склонны избегать серьезных отношений, потому что опасаетесь, что ваш партнер ограничит вас в свободе.
<br><br>Вы часто опаздываете либо вообще не приходите в назначенное место встречи. Люди считают вас ненадежным партнером, ведь вы легко можете утерять важную документацию. Живете одним днем и не думаете о будущем. Им хорошо здесь и сейчас, в настоящем времени, а дальше – будь что будет. Склонны тратить свои последние сбережения на какую-то чепуху. Вам свойственно принимать необдуманные решения, за последствия которых вы отвечать отказываетесь.
<br><br>Иногда пытаетесь обрести свободу через болезнь. Думаете, что раз вы заболели и чувствуете себя плохо, то вы никому и ничего не должны. Ведете разгульный образ жизни, прожигая ее. Не стремитесь ни к каким целям. Буквально размениваете свою жизнь по пустякам. Проявляете чрезмерную зацикленность на деньгах, материальных благах, предметах роскоши. Можете работать в поте лица на нелюбимой работе, лишь потому, что там вам хорошо платят. Игнорируете свои творческий потенциал и свою духовность. Можете быть очень ревнивым, властным и деспотичным человеком. Навязываете другим людей свои правила игры. Не освободились от собственных ограничений и рамок, теперь стремитесь окружающих загнать в них же.`
personalPanelItem.appendChild(paragraph);
break;
}}
}}
}
if(index===2){
if(isCommunicationTitleOpened){
isCommunicationTitleOpened = !isCommunicationTitleOpened;
const text=document.createElement('p');
text.innerHTML='В общении';
text.style.fontWeight='700';
personalPanelItem.appendChild(text);
}
switch (item){
case 1: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(1) Вы, стараетесь держать всех на расстоянии и не впускать их в свое личное пространство. Не откроетесь никому до самого конца, либо сделаете видимость того, что подпустили кого-то достаточно близко.
<br><br> Ваши действия не бывают хаотичными, случайными и нелогичными – вы ЗНАЕТЕ, что делаете. Другие люди стремятся быть такими же, как и вы. Для них ваша личность – самый подходящий пример для подражания. Они хотят научиться у вас вашему оптимизму и авантюрности. Им нравится вести с вами беседы, так как вы обладаете прекрасными ораторскими способностями и легко можете поддержать любой разговор. Вы готовы в любой момент завязать с кем-нибудь диалог. Люди, которые соприкоснулись с вами, вдохновляются вашей личностью и начинают двигаться к собственному саморазвитию. Разговор с вами оставит неизгладимый отпечаток у них в памяти.
<br><br>Вам нравится быть властным и подавлять своим присутствием всех остальных. Не любите идти на уступки, слишком уж привыкли диктовать свои правила игры. Вам сложно работать в команде, где приходится учитывать интересы каждого человека.  Бывает такое, что вы проявляете агрессию по отношению к людям, заставляя их подчиниться собственной воле. Ваше неумение слушать и слышать окружающих, может привести вас, к полному одиночеству и в работе, и в личной жизни.
<br><br>Постарайтесь быть добрее и терпимее к людям, которые вас окружают. Взвешивайте каждое свое слово не только для того, чтобы ненароком никого не обидеть, но и сказать ближайшему своему другу, родственнику приятное слово. Позаботьтесь об отношениях с родственниками и ровесниками.`
personalPanelItem.appendChild(paragraph);
break;
}
case 2: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(2) Вам очень нравится заводить новые знакомства, потому как вы способны их интуитивно понимать. Можете изначально проработать у себя в голове диалог, а потом следовать ему при налаживании контактов.  Люди хотят завести с вами дружбу, пообщаться. Они вам доверяют, готовы делиться сокровенными тайнами. Ваш богатый внутренний мир привлекает к вам повышенное внимание.
<br><br>Вам очень нравится быть в курсе всех событий. Вы хотите первыми узнавать о произошедшем вокруг вас. Вам хочется быть тем человеком, которому окружающие будут прибегать рассказывать о событиях, произошедших с ними. Однако бывает, что вам хочется сразу же рассказать всему миру о том, что вы узнали.
<br><br>Сдержите в себе этот порыв.
<br><br>Вы полностью отдаете себя человеку в плане заботы. Рветесь уделить ему должное внимание, желаете помочь. Вы готовы творить добро безвозмездно, лишь бы человек почувствовал себя лучше. Если вам удалось поднять настроение ему, даже на короткое мгновенье, вы уже гордитесь собой и своим чутьем. Проявляете заботу инстинктивно, а внимание, как правило, оказываете целенаправленно. Отлично развитое чувство эмпатии помогает вам в определении того, кому необходима помощь. Легкое понимание чувств и проблем людей позволяет давать мудрые советы. Поэтому они тянутся к вам также на интуитивном уровне, как светлячки к свету.
<br><br>Кроме того, забота содержит в себе и негативные мотивы, например, страх. Боязнь утратить свои связи с важным для вас человеком сейчас или в будущем. Сплетни засоряют вашу жизнь и активно уничтожают все хорошее в ваших взаимоотношениях с людьми.  Вам страшно, что вас обидят, предадут. Если вы хотите научиться доверять другим людям, то вам стоит позабыть весь предыдущий негативный опыт.`
personalPanelItem.appendChild(paragraph);
break;
}
case 3: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(3) Женщина
<br><br>Состояние порядка и структурирования. В окружении красивых дорогих,  качественных вещей. На первый план для вас выходит чувство прекрасного и эстетика. Вы имеете идеальный вкус, знания о том, как сделать жизнь богаче и ярче. Попробуйте в медитации увидеть себя сидящей на троне в огромном зале, в величественной королевской одежде, с большим количеством украшений, со скипетром в руке, а вокруг много народу, они вам преклоняются – Вы их королева. В душе должно быть состояние изобилия. Наша земля плодовита, и всего хватит всем, и вам обязательно всего хватит! Возможно вам понравится перебирать гардероб, драгоценности, ухаживать за телом.
<br><br>
<br><br>Мужчина
<br><br>Черпает силу, находясь в женском обществе (и чем больше женщин, тем лучше). Когда у него гармоничные отношения между его внутренней мужчиной и женщиной, тогда он понимает, чего хотят женщины, а мужчины 3-ки – это единственные мужчины, которые это знают. Для такого мужчины очень важно осознанно контролировать энергии 4-го мужского канала.  Для роста возможностей круг общения необходимо постоянно расширять. Нежелательно ограничиваться общением только с высоко стоящими на социальной лестнице людьми.`
personalPanelItem.appendChild(paragraph);
break;
}
case 4: {
let paragraph=document.createElement('p');
if(gender==='М'){
paragraph.innerHTML=`(4) Вашим ключом к душевному комфорту выступают духовная пробужденность, структура планов, способность договориться, соединить людей и информацию. Вы черпаете силы в состоянии, когда вы понимаете, что всегда можете помочь ближнему, когда именно вы – то самое сильное плечо, на которое можно положиться.
<br><br> При создании вокруг обстановки достатка и материального благополучия не стоит забывать и о духовном развитии, чтобы иметь возможность двигаться дальше к своей цели, прорабатывая свои негативные проявления.`
}
if(gender==='Ж'){
paragraph.innerHTML=`(4) Вы хорошо себя чувствуете в обществе мужчин, прекрасно ладите с ними и находите общий язык. А в детстве – своя «в доску» и «рубаха- парень» среди дворовых мальчишек. В вашей судьбе может появиться покровитель, который будет заботиться о вас. Прекрасные взаимоотношения с отцом и, как следствие, со всеми остальными представителями мужского пола.  Вам придется больше потрудиться над наработкой мягкости и гибкости. Необходимо научится женской силе в слабости. Прокачать женскую энергию, любить и заботиться о себе любимой.`
}
personalPanelItem.appendChild(paragraph);
break;
}
case 5: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(5) В вашем случае душевный комфорт достигнут, когда вы добываете новые знания, умения, навыки. Вы нуждаетесь в постоянном саморазвитии, росте, поиске нового, чтобы обрести счастье и гармонию в душе. Не стоит забывать, что саморазвитие – процесс переустановки жизненных целей, ценностей, для того, чтобы максимально реализовать свой потенциал.  Уделяйте внимание всем сферам жизни`
personalPanelItem.appendChild(paragraph);
break;
}
case 6: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(6) Вы  восполняете энергию от общения с любимыми людьми, когда занимаетесь любимым делом. Когда наблюдает красоту: в людях, в природе, в искусстве. Вас наполняет поддержка и похвала людей, вы буквально нежитесь в энергии обожания и люби. Любите принимать гостей, создавать ощущение праздника и красоты вокруг. Очень важно научиться ощущать и принимать любовь Бога, Вселенной. Осознание того, что «Бог меня любит» может наполнить вас энергией.`
personalPanelItem.appendChild(paragraph);
break;
}
case 7: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(7) Вы являетесь одной из составляющих частей изменения мира с помощью собственных успехов, профессиональной деятельности, карьеры и получения признания. Вас должны видеть другие люди, как и результаты ваших трудов. Для достижения душевного комфорта вам лишь стоит научиться гордиться своими деяниями. Получаете энергию в движении к цели, динамике, триумфе победы. Путешествия, активные виды отдыха, вождение автомобиля, стрельба. Активная социальная жизнь и новые знакомства. Командные спортивнее игры и обязательно выигрывать.
<br><br>Важно научиться релаксации и медитации, т.к. телу тоже нужно давать отдых и комфорт.`
personalPanelItem.appendChild(paragraph);
break;
}
case 8: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(8) Вы получаете энергию, в нахождении внутреннего равновесия в любой ситуации и гармонии с миром. Когда все ясно и понятно, когда принимают закон причины и следствия. Тема социальной справедливости очень важна для вашего душевного комфорта. В изучении эзотерики, духовный путь, творчество, личность, родительские программы, партнерские взаимоотношения, здоровое тело, материальный комфорт.`
personalPanelItem.appendChild(paragraph);
break;
}
case 9: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(9) Ключом вашего душевного комфорта выступает духовное развитие и неустанная работа над самим собой – изучение тайных знаний. Уединение с собой и со своей природой дает большой источник сил и энергии, к вам приходят самые сокровенные мысли и озарения. Вы любите природу, животных, с удовольствием гуляете со своими домашними питомцами. Это так же дает вам энергию.`
personalPanelItem.appendChild(paragraph);
break;
}
case 10: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(10) Получаете энергию, когда вливаетесь в счастливый поток, драйв от потока. Когда понимаете, что вселенная несет вас на руках. Вам нужно принимать цикличность жизни и смело отпускать ситуации, отдаться потоку. Душевный комфорт вам приносит необычная творческая деятельность. Отдых и работа в команде единомышленников.`
personalPanelItem.appendChild(paragraph);
break;
}
case 11: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(11) Вы получаете энергию из любимого дела (хобби, работа), позитивности, потока. Заканчивать начатое. Важно делать то что любишь, или любить то, что делаешь. Еще вы получаете энергию из чувства удовлетворения, когда делаете что-то такое, чего не умеют другие. Именно понимание (осознание)того, что – «Да! Я это могу!». Поэтому важно научиться расслабляться, ведь телу нужен комфорт и отдых.Ваш ключ к вашему душевному комфорту – быть сильным духом, а не телом.`
personalPanelItem.appendChild(paragraph);
break;
}
case 12: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(12) Вы получаете энергию из всего нового (знания, умения, навыки, люди, страны, события, творчество). Природа, путешествия, активные отдых помогут настроиться на поток и гармонизировать свой внутренний мир. Расширяйте свой кругозор, найдите свое место силы, даже если он покажется странным окружающим`
personalPanelItem.appendChild(paragraph);
break;
}
case 13: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(13) Вашим ключом душевного комфорта является трансформация себя и окружающего мира. Вы черпаете энергию из состояния между жизнью и смертью. Все полярные понятия и действия вас заряжают. Экстрим, адреналин, активный спорт -ваша естественная среда. Дать жизнь старым вещам - одна из потребностей. Иногда новое начало – это все, в чем вы нуждаетесь.`
personalPanelItem.appendChild(paragraph);
break;
}
case 14: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(14) Вы достигаете душевного комфорта, когда занимаетесь каким-нибудь творчеством. Наполняетесь энергией через искусство, креатив, посещение красивых мест, путешествий. Все что связанно с водой, вдохновит и восстановит душевную гармонию.`
personalPanelItem.appendChild(paragraph);
break;
}
case 15: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(15) Для вашего комфорта любимое дело имеет большое значение. Оно является источником вашей радости, достижения гармонии и других положительных эмоций. Вы получаете энергию над проработкой своих слабых сторон. Заряжаетесь и буквально светитесь изнутри, когда видите, собственный рост.
`
personalPanelItem.appendChild(paragraph);
break;
}
case 16: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(16) Вы черпаете силу в состоянии единства с богом. Жизнь в осознанности, проживать жизнь в мгновении – здесь и сейчас. Медитации и духовные практики – ваш путь к восстановлению и гармонизации души. Создание с нуля чего-то нового.Обустройство дома и быта, строительство. `
personalPanelItem.appendChild(paragraph);
break;
}
case 17: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(17) Вы черпаете энергию в природе, в  единении с Богом, когда каналы открыты небу. Там, где они на виду и на слуху. Когда вы в центре внимания. В дружбе и творческой самореализации. Гармонизирую душу медитации, практики, обращенные к небу, молитвы. Визуализируйте себя звездой (в любой сфере)
`
personalPanelItem.appendChild(paragraph);
break;
}
case 18: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(18) Черпаете энергию из своей интуиции, мистицизма, веры в чудеса, знание законов энергетики. Научитесь ч получать  силы из природных четырех стихий: вода, огонь, земля и воздух. Ритуалы и обряды, карты, руны, оракулы. Чаще контактировать с водой, побольше пить.`
personalPanelItem.appendChild(paragraph);
break;
}
case 19: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(19) Черпаете силы в общественной деятельности, благотворительности. Важно найти широкую сферу деятельности. Что бы светить всем понемногу. Духовные практики на рассвете, медитации. Творческая реализация
`
personalPanelItem.appendChild(paragraph);
break;
}
case 20: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(20) Черпаюте силу из связи с родом. От получения новых знаний. Когда проходите отработку родовых задач. От контакта с учителями высшими силами. Духовное развитие.
`
personalPanelItem.appendChild(paragraph);
break;
}
case 21: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(21) Черпаете энергию из состояния миротворчества, глобальных проектов,творческого самовыражения, помощи мира, т.е. из ощущения, что весь мир вам помогает. Гармонизация в путешествиях, в расширении кругозора, в мечтах.
`
personalPanelItem.appendChild(paragraph);
break;
}
case 22: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(22) Получаете силу из ощущения свободы и единения с богом. На природе, в дали от города. В путешествиях и расширении кругозора. В духовных практиках. Творческая самореализация, когда вы становитесь примером для других.
`
personalPanelItem.appendChild(paragraph);
break;
}}
}
if(index===2){
switch (item){
case 3: {
if(isSuperPowerTitleOpened){
isSuperPowerTitleOpened = !isSuperPowerTitleOpened;
const text=document.createElement('p');
text.innerHTML='Ваша супер сила';
text.style.fontWeight='700';
personalPanelItem.appendChild(text);
}
let paragraph=document.createElement('p');
paragraph.innerHTML=`(3) Точка входа: До наступления возраста зрелости нужно родить ребенка и заниматься его воспитанием лично. Либо работать в педагогической сфере и заниматься воспитанием детей - регулярно!
<br>Личная сила:
<br>- Успехи в творчестве.
<br>- Успех в воспитании, педагогике.
<br>- Успех в женском коллективе.
<br>- Талантливые, неординарные дети.
<br>- Дети приносят материальные блага с юных лет (выигрывают конкурсы).
<br>- Блага, полученные через мужчин (через женщин для мужчин).
<br>- Богатый урожай (овощи, ягоды, даже цветы на окнах растут).
<br>- Здоровые органы МПС (мочеполовая).
<br>- Материальный достаток.
<br>- Женская сила и власть (власть над женскими сердцами).`
personalPanelItem.appendChild(paragraph);
break;
}
case 4: {
if(isSuperPowerTitleOpened){
isSuperPowerTitleOpened = !isSuperPowerTitleOpened;
const text=document.createElement('p');
text.innerHTML='Ваша супер сила';
text.style.fontWeight='700';
personalPanelItem.appendChild(text);
}
let paragraph=document.createElement('p');
paragraph.innerHTML=`(4) Точка входа: Стать лучшим профессионалом в одной или нескольких областях.<br>
Личная сила:
<br>- Успех в бизнесе, карьере.
<br>- Высокий доход.
<br>- Высокий профессионализм.
<br>- Быстрое освоение любой профессии.
<br>- Успех в переговорах.
<br>- Уважение подчиненных и бизнес партнеров.
<br>- Гарантированные результаты.
<br>- Ответственность за других (больше 10 человек. Либо большая семья).
<br>- Безупречная репутация в профессиональном сообществе.
<br>- Власть авторитета.`
personalPanelItem.appendChild(paragraph);
break;
}
case 5: {
if(isSuperPowerTitleOpened){
isSuperPowerTitleOpened = !isSuperPowerTitleOpened;
const text=document.createElement('p');
text.innerHTML='Ваша супер сила';
text.style.fontWeight='700';
personalPanelItem.appendChild(text);
}
let paragraph=document.createElement('p');
paragraph.innerHTML=`(5) Точка входа: Создать гармоничные отношения с отцом.<br>
Личная сила:
<br>- Успех в мужском коллективе.
<br>- Счастливая семья.
<br>- Вас считают духовным центром семьи/коллектива.
<br>- К вам идут за советом.
<br>- Покровитель – мужчина.
<br>- Раскрытие экстрасенсорных способностей (здоровый образ жизни, вдруг хочется заниматься своим здоровьем, питанием).
<br>- Здоровый образ жизни.
<br>- Обновление клеток организма (вдруг помолодел).
<br>- Успех в науке, эзотерике или искусстве.
<br>- Свое направление, школа, ученики.`
personalPanelItem.appendChild(paragraph);
break;
}
case 6: {
if(isSuperPowerTitleOpened){
isSuperPowerTitleOpened = !isSuperPowerTitleOpened;
const text=document.createElement('p');
text.innerHTML='Ваша супер сила';
text.style.fontWeight='700';
personalPanelItem.appendChild(text);
}
let paragraph=document.createElement('p');
paragraph.innerHTML=`(6) Точка входа: Создание семьи, гармоничные отношения с супругом и его
родителями, родственниками.<br>
Личная сила:
<br>- Абсолютный успех в семейной жизни.
<br>- Верность, любовь и гармония в отношениях с супругом (ой).
<br>- Поддержка и любовь родственников супруга (и).
<br>- Успех в любом партнерстве.
<br>- Здоровое сердце, нормальное давление.
<br>- Надежные и верные друзья.
<br>- Внешняя и внутренняя красота.
<br>- Красивый и уютный дом.
<br>- Успех в сфере красоты, дизайна, искусства.`
personalPanelItem.appendChild(paragraph);
break;
}
case 7: {
if(isSuperPowerTitleOpened){
isSuperPowerTitleOpened = !isSuperPowerTitleOpened;
const text=document.createElement('p');
text.innerHTML='Ваша супер сила';
text.style.fontWeight='700';
personalPanelItem.appendChild(text);
}
let paragraph=document.createElement('p');
paragraph.innerHTML=`(7) Точка входа: Переезд в другой город/страну/ основание там семьи или обучение в другом городе. Потом вернуться на родину и применить эти знания.<br>
Личная сила:
<br>- Реактивный успех в карьере.
<br>- Успех в сфере образования, науки и инноваций, транспорта, туризма.
<br>- Успех в переездах, в том числе за границу.
<br>- Успех в путешествиях.
<br>- Безаварийное вождение автомобиля.
<br>- Здоровый опорно<br>-двигательный аппарат.
<br>- Уважение и признание коллег.
<br>- Неформальное лидерство в любом коллективе.
<br>- Управление эмоциями, агрессией.
<br>- Лидерство в профессиональной сфере вместо конкуренции (нет борьбы, есть коллеги).`
personalPanelItem.appendChild(paragraph);
break;
}
case 8: {
if(isSuperPowerTitleOpened){
isSuperPowerTitleOpened = !isSuperPowerTitleOpened;
const text=document.createElement('p');
text.innerHTML='Ваша супер сила';
text.style.fontWeight='700';
personalPanelItem.appendChild(text);
}
let paragraph=document.createElement('p');
paragraph.innerHTML=`(8) Точка входа: Безупречное соблюдение закона и взятых на себя обязательств.<br>
(Уплата налогов, платежек, не подделка документов).<br>
<br>Личная сила:
<br> - Абсолютный успех в решении любых правовых вопросов, чувствование законов.
<br>- Успех в юридической карьере.
<br>- Организаторские способности, успех в организации, координации любых процессов.
<br>- Покровительство среди чиновников.
<br>- Получение наследства, выигрыши.
<br>- Выигрыши в суде, в переговорах.
<br>- Отличное понимание причинно-следственных законов.
<br>- Авторитет справедливого человека уважение к альтернативному мнению.
<br>- Уважение к альтернативному мнению.
<br>- Здоровые почки, легкие, яичники и другие парные органы.`
personalPanelItem.appendChild(paragraph);
break;
}
case 9: {
if(isSuperPowerTitleOpened){
isSuperPowerTitleOpened = !isSuperPowerTitleOpened;
const text=document.createElement('p');
text.innerHTML='Ваша супер сила';
text.style.fontWeight='700';
personalPanelItem.appendChild(text);
}
let paragraph=document.createElement('p');
paragraph.innerHTML=`(9) Точка входа: Помощь близким в болезни или беде. (Бывают ситуации, когда братья, тети нуждаются именно в вашем участии).
<br>Личная сила:
<br>- Успех в реализации любых личных задач человека.
<br>- Учителя и наставники (везет на учителей).
<br>- Есть близкие люди (супруг, дети, родные, друзья).
<br>- Теплые отношения с близкими.
<br>- Есть возможность к наполняющему уединению (уходить в лес, в гараж, помечтать, отдохнуть).
<br>- Раскрытие экстрасенсорных способностей (находите сакральные знание в книгах, в мечтах).
<br>- Раскрытие сакральных знаний.
<br>- Есть ученики.
<br>- Здоровый ЖКТ (желудок).
<br>- Материальный достаток.`
personalPanelItem.appendChild(paragraph);
break;
}
case 10: {
if(isSuperPowerTitleOpened){
isSuperPowerTitleOpened = !isSuperPowerTitleOpened;
const text=document.createElement('p');
text.innerHTML='Ваша супер сила';
text.style.fontWeight='700';
personalPanelItem.appendChild(text);
}
let paragraph=document.createElement('p');
paragraph.innerHTML=`(10) Точка входа: Регулярная финансовая помощь (содержание) любому человеку
(детям). Не один раз, а на постоянной основе. Или у вас бизнес и вы выплачиваете зарплату работникам.
<br>Личная сила:
<br>- Успех в финансовых вопросах.
<br>- Жизнь без долгов и кредитов.
<br>- Подписание крупных сделок.
<br>- Успех в бизнесе, фрилансе.
<br>- Дело «по душе», которое приносит отличныхй доход.
<br>- Удача, везение, выигрыши.
<br>- Безкпречная репутация честного и обязательного партнера.
<br>- Успех в необычных сферах деятельности (где другие не могут).
<br>- Деньги даются легко.
<br>- Достаточно любых ресурсов (нужна информация – она приходит, нужен
работник – он находится).`
personalPanelItem.appendChild(paragraph);
break;
}
case 11: {
if(isSuperPowerTitleOpened){
isSuperPowerTitleOpened = !isSuperPowerTitleOpened;
const text=document.createElement('p');
text.innerHTML='Ваша супер сила';
text.style.fontWeight='700';
personalPanelItem.appendChild(text);
}
let paragraph=document.createElement('p');
paragraph.innerHTML=`(11) Точка входа: Помощь слабым (людям, животным). Оказание медицинской помощи, опека и забота.
<br>Личная сила:
<br>- Крепкое физическое здоровье у вас.
<br>- Целительские способности (руки приложили – легче стало, колыбельную спели – уснул).
<br>- Очередь клиентов к вам.
<br>- Чувствование физического состояния других людей.
<br>- Успех в любой конкурентной борьбе.
<br>- Управление эмоциями, агрессией.
<br>- Способность заряжать своей энергией.
<br>- Крепкое психическое здоровье.
<br>- Получение квалифицированной врачебной помощи.
<br>- Успешные операции (или не было вовсе, удачные роды).`
personalPanelItem.appendChild(paragraph);
break;
}
case 12: {
if(isSuperPowerTitleOpened){
isSuperPowerTitleOpened = !isSuperPowerTitleOpened;
const text=document.createElement('p');
text.innerHTML='Ваша супер сила';
text.style.fontWeight='700';
personalPanelItem.appendChild(text);
}
let paragraph=document.createElement('p');
paragraph.innerHTML=`(12) Точка входа: Бесплатная психологическая помощь людям, оказавшимся в сложной жизненной
ситуации. Или занимаетесь профессионально и не отказываете в бесплатной консультации.
<br>Личная сила:
<br>- Развитая интуиция.
<br>- Понимание нужд других людей, умение помочь.
<br>- Успех в области психологии.
<br>- Успех в благотворительных проектах (если занимаетесь бизнесом, для его развития
отдавайте часть дохода другим).
<br>- Быстрый публичный успех.
<br>- Очередь благодарных клиентов.
<br>- Успех в креативных проектах.
<br>- Успех в любых переговорах.
<br>- Авторитет отличного психолога и бескорыстного человека.
<br>- Материальное благополучие.`
personalPanelItem.appendChild(paragraph);
break;
}
case 13: {
if(isSuperPowerTitleOpened){
isSuperPowerTitleOpened = !isSuperPowerTitleOpened;
const text=document.createElement('p');
text.innerHTML='Ваша супер сила';
text.style.fontWeight='700';
personalPanelItem.appendChild(text);
}
let paragraph=document.createElement('p');
paragraph.innerHTML=`(13) Точка входа: Спасение или трансформация жизни человека. (Словом, делом, реальная помощь).<br>
Личная сила:
<br>- Создание новых технологий (в науке, в обучении).
<br>- Успех в нестандартных задачах.
<br>- Кардинальная трансформация жизни людей, компании, семей.
<br>- Умение выполнить много задач одновременно. Успех в нескольких разных сферах. Трудно выполнять монотонную работу.
<br>- Успех в реставрации, реанимации и создании новой жизни.
<br>- Высокая эффективность в экстремальных ситуациях.
<br>- Способность спасать жизни людей.
<br>- Способность открывать новые дороги и вести за собой людей.
<br>- Дар гипноза (чтобы повести за собой надо убедить).
<br>- Успешное прохождение любых кризисов (в стране кризис – у вас в бизнесе подьем).`
personalPanelItem.appendChild(paragraph);
break;
}
case 14: {
if(isSuperPowerTitleOpened){
isSuperPowerTitleOpened = !isSuperPowerTitleOpened;
const text=document.createElement('p');
text.innerHTML='Ваша супер сила';
text.style.fontWeight='700';
personalPanelItem.appendChild(text);
}
let paragraph=document.createElement('p');
paragraph.innerHTML=`(14) Точка входа: Ведение сельскохозяйственной деятельности (даже дома в горшочке).
Проращивать плоды. Проявлять щедрость и благодарность.
<br>Личная сила:
<br>- Абсолютная гармония и стабильность (все проблемы проходят мимо, никаких душевных переживаний).
<br>- Исполняются любые желания, связанные с бытом (находится парковка, есть горячая вода).
<br>- Раскрытие таланта, который рождается наедине с собой (писательство, художество).
<br>- Успех в бизнесе или ремесле, который человек начинает с нуля.
<br>- Успех в сельскохозяйственной деятельности.
<br>- Авторитет самостоятельного и щедрого человека, опоры и надежды семьи (опора и
надежда своих близких).
<br>- Быстрое достижение целей.
<br>- Здоровые сосуды, давление в норме.
<br>- Дети, готовые преумножать семейный капитал.
<br>- Высокий доход (его следует передать потомкам).`
personalPanelItem.appendChild(paragraph);
break;
}
case 15: {
if(isSuperPowerTitleOpened){
isSuperPowerTitleOpened = !isSuperPowerTitleOpened;
const text=document.createElement('p');
text.innerHTML='Ваша супер сила';
text.style.fontWeight='700';
personalPanelItem.appendChild(text);
}
let paragraph=document.createElement('p');
paragraph.innerHTML=`(15) Точка входа: Помочь человеку избавиться от зависимостей (алкгольной, наркотической, сексуальной).
<br>Личная сила:
<br>- Обладание властью.
<br>- Полная финансовая обеспеченность.
<br>- Отменное чувство юмора.
<br>- Обладание харизмой.
<br>- Умение владеть своей сексуальной энергией.
<br>- Умение очищать и трансформировать личность через искушение и вскрытие всех пороков.
<br>- Способность выживать в самых сложных ситуациях, «восставать из пепла».
<br>- Способность «делать деньги» и выстраивать связи.
<br>- Диагностика и исцеление (дар видеть суть, мельчайшие детали, ясновидение).
<br>- Умение вытащить из тяжелейших зависимостей и состояний на грани.`
personalPanelItem.appendChild(paragraph);
break;
}
case 16: {
if(isSuperPowerTitleOpened){
isSuperPowerTitleOpened = !isSuperPowerTitleOpened;
const text=document.createElement('p');
text.innerHTML='Ваша супер сила';
text.style.fontWeight='700';
personalPanelItem.appendChild(text);
}
let paragraph=document.createElement('p');
paragraph.innerHTML=`(16) Точка входа: Помощь в обретении жилья (как риелтор, отдали часть своего
жилья) редко бывает в коде личной силы, эти люди необычны.
<br>Личная сила:
<br>- Успех в деньгах, в бизнесе.
<br>- Успех в строительстве, недвижимости.
<br>- Успех в приобретении строительства, недвижимости.
<br>- Выход на новые уровни жизни (каждые 9 лет).
<br>- Быстрый успех при кардинальных переменах в жизни.
<br>- Авторитет духовного лидера.
<br>- Авторитет человека, прошедшего через огонь, воду и трубы.
<br>- Полное доверие к Вам и готовность идти за вами у людей.
<br>- Целостный организм (отсутствие травмированных и удаленных органов).
<br>- Сильный организм, готовый выдержать любые аскезы и испытания.`
personalPanelItem.appendChild(paragraph);
break;
}
case 17: {
if(isSuperPowerTitleOpened){
isSuperPowerTitleOpened = !isSuperPowerTitleOpened;
const text=document.createElement('p');
text.innerHTML='Ваша супер сила';
text.style.fontWeight='700';
personalPanelItem.appendChild(text);
}
let paragraph=document.createElement('p');
paragraph.innerHTML=`(17) Точка входа: Помощь талантам. Надо помогать талантливым людям. (Редкие люди).
<br>Личная сила:
<br>- Успех в искусстве и творчестве.
<br>- Раскрытие своих потенциалов.
<br>- Публичный успех, узнаваемость, слава.
<br>- Успех на сцене (понятие условно, в телевизоре, в интернете).
<br>- Поклонники и почитатели таланта вашего.
<br>- Здоровые органы дыхания.
<br>- Авторитет честного человека с безупречной репутацией.
<br>- Внешняя и внутренняя красота.
<br>- Успех во всех профессиональных областях, связанных с развитием талантов (школа пения, рисования).
<br>- Признание коллег (без конкуренции, они признают тебя).`
personalPanelItem.appendChild(paragraph);
break;
}
case 18: {
if(isSuperPowerTitleOpened){
isSuperPowerTitleOpened = !isSuperPowerTitleOpened;
const text=document.createElement('p');
text.innerHTML='Ваша супер сила';
text.style.fontWeight='700';
personalPanelItem.appendChild(text);
}
let paragraph=document.createElement('p');
paragraph.innerHTML=`(18) Точка входа: Освоение ремесла на высоком профессиональном уровне. (Даже если
кулинария – то продажа тортиков по всему городу).
<br>Личная сила:
<br>- Умение чувствовать другого человека.
<br>- Открытие магических способностей (домашняя магия).
<br>- Талант в рукоделии.
<br>- Создание комфорта и уюта в делах и в отношениях.
<br>- Авторитет великодушного человека (умение прощать, принимать).
<br>- Авторитет честного человека.
<br>- Открытие целительских способностей.
<br>- Открытие сакральных знаний.
<br>- Быстрая материализация любых желаний.
<br>- Способность «запечатывать» энергию в предметах (рисуешь картину и посыл
который вкладываешь будет доходить до людей).`
personalPanelItem.appendChild(paragraph);
break;
}
case 19: {
if(isSuperPowerTitleOpened){
isSuperPowerTitleOpened = !isSuperPowerTitleOpened;
const text=document.createElement('p');
text.innerHTML='Ваша супер сила';
text.style.fontWeight='700';
personalPanelItem.appendChild(text);
}
let paragraph=document.createElement('p');
paragraph.innerHTML=`(19) Точка входа: Помочь человеку в процветании, подняться по карьерной лестнице
<br>Личная сила:
<br>- Высокий статус в обществе.
<br>- Авторитет для многих в рабочей сфере.
<br>- Иметь возможность помогать другим в реализации.
<br>- Состояние счастья от того, чем обладает.
<br>- Умение делать деньги, удача и хорошее финансовое вознаграждение в любой деятельности.
<br>- Успех во многих делах (правило - с третьей попытки).
<br>- Вдохновение своим примером других.
<br>- Способность оставаться ребенком.
<br>- Блистание на сцене (телевидение, интернет).
<br>- Благотворительность.`
personalPanelItem.appendChild(paragraph);
break;
}
case 20: {
if(isSuperPowerTitleOpened){
isSuperPowerTitleOpened = !isSuperPowerTitleOpened;
const text=document.createElement('p');
text.innerHTML='Ваша супер сила';
text.style.fontWeight='700';
personalPanelItem.appendChild(text);
}
let paragraph=document.createElement('p');
paragraph.innerHTML=`(20) Точка входа: Оказание финансовой помощи родственникам (отцу, маме,
брату. Не детям. Либо разовая большая, либо регулярная)
<br>Личная сила:
<br>- Полная защита рода (на астральном уровне).
<br>- Абсолютное раскрытие династических талантов.
<br>- Удача в делах.
<br>- Реализуются любые мечты и не только бытовые.
<br>- Успех в династических профессиях.
<br>- Успех в новых для рода профессиях.
<br>- Авторитет отличного семьянина.
<br>- Исцеление генетического заболевания (у мамы и папы был диагноз, у вас на
начальном этапе подтвердился, но потом исчез).
<br>- Успех во всех областях помощи другим семьям (или свой семейный бизнес).
<br>- Поддержка государственных структур (подавайте на гранты).`
personalPanelItem.appendChild(paragraph);
break;
}
case 21: {
if(isSuperPowerTitleOpened){
isSuperPowerTitleOpened = !isSuperPowerTitleOpened;
const text=document.createElement('p');
text.innerHTML='Ваша супер сила';
text.style.fontWeight='700';
personalPanelItem.appendChild(text);
}
let paragraph=document.createElement('p');
paragraph.innerHTML=`(21) Точка входа:  Создание глобального проекта (мероприятие для всего города, проект между несколькими странами)
<br>Личная сила:
<br>- Быть полезным своей родине.
<br>- Путешествовать по миру, жить в другой стране, но тепло относиться к своей истории.
<br>- Знание одного или несколько иностранных языков.
<br>- Реализация глобальных проектов (детский утренник – для всего района, UTybe канал – для тысяч подписчиков).
<br>- Способность обогащать культуру своей семьи, компании, страны за счет других культур.
<br>- Представлять интересы своей школы, района, города, страны на других площадках, в других странах.
<br>- Участие в патриотических мероприятиях.
<br>- Активно пользоваться ресурсами интернета (продвигать свой продукт, подключать других людей, расширяться).
<br>- Участие в акциях на очищение города, исцеление планеты.
<br>- Дружба, брак с иностранцем.`
personalPanelItem.appendChild(paragraph);
break;
}
case 22: {
if(isSuperPowerTitleOpened){
isSuperPowerTitleOpened = !isSuperPowerTitleOpened;
const text=document.createElement('p');
text.innerHTML='Ваша супер сила';
text.style.fontWeight='700';
personalPanelItem.appendChild(text);
}
let paragraph=document.createElement('p');
paragraph.innerHTML=`(22) Точка входа: (большая редкость) Особенная задача – рождение ребенка, а
лучше трех. Они не очень хотят детей (это зрелые души, они наигрались
уже во все роли, хотят им обязательно свой опыт передать).
<br>Личная сила:
<br>- Многоплановая реализация.
<br>- Решение нескольких вопросов одновременно.
<br>- Человек способен наладить контакт с любым человеком.
<br>- Материальное благополучие.
<br>- Свобода передвижения по миру.
<br>- Рождение 3 или более детей.
<br>- Здоровье МПС (мочеполовой).
<br>- Благополучие через детей.
<br>- Обеспеченная зрелость.`
personalPanelItem.appendChild(paragraph);
break;
}}
}})
}
personalPanelContentCreate([A, B, X])
const talentsPanelItem=document.querySelector('#talents_panel');
let isTalentsTitleFirstOpened=true;
let isTalentsTitleSecondOpened=true;
let isTalentsTitleThirdOpened=true;
function talentsPanelContentCreate(numbers, status){
const unicalNumbers=new Set(numbers);
if(status===1&&isTalentsTitleFirstOpened&&unicalNumbers.size!==0){
isTalentsTitleFirstOpened = !isTalentsTitleFirstOpened;
const text=document.createElement('p');
text.innerHTML='Талант от Бога';
text.style.fontWeight='700';
talentsPanelItem.appendChild(text);
}
if(status===2&&isTalentsTitleSecondOpened&&unicalNumbers.size!==1){
isTalentsTitleSecondOpened = !isTalentsTitleSecondOpened;
const text=document.createElement('p');
text.innerHTML='Талант от Отца';
text.style.fontWeight='700';
talentsPanelItem.appendChild(text);
}
if(status===3&&isTalentsTitleThirdOpened&&unicalNumbers.size!==1){
isTalentsTitleThirdOpened = !isTalentsTitleThirdOpened;
const text=document.createElement('p');
text.innerHTML='Талант от Матери';
text.style.fontWeight='700';
talentsPanelItem.appendChild(text);
}
Array.from(unicalNumbers).map((item, index, array)=> {
switch (item){
case 0: {
break;
}
case 1: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(1) Высокий интеллект и способности быстро учиться, усваивать большие объёмы информации и умений. Умение адаптироваться в быстро меняющемся мире и моментально принимать важные решения. Вы отличаетесь остротой в своих оценках и мнениях. Навык находить контакт с людьми, умение рисковать, умение воплощать свои способности, являются гарантией успеха в той области, где вы захотите себя реализовать. Ваше красноречие, попадает в сердца других людей. Окружающие видят в вас яркую, харизматичную, одаренную личность, блеск и глубину вашего разума. Эмпатия - вы считываете их эмоции на интуитивном уровне. Лидерство - вы легко можете вести людей за собой по новым дорогами и уверенно справляетесь с любыми трудностями. Высокие планки всегда ставите себе (и своему окружению) и упорно идете к цели. Умение материализовать энергию в оберегах, талисманах, которые дают доступ к древним знаниям, легко «впитываются» вашим мозгом. Энергетически притягиваете желаемое. Первооткрыватель - всегда имеете множество идей для новых проектов для открытия новых дорог. Умеете доступно передавать знания другим людям. Талант к достижению вершин мастерства в максимально короткие сроки.`;
talentsPanelItem.appendChild(paragraph);
break;
}
case 2: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(2) Считывание информации из пространства, получение абсолютного знания. С легкостью отделяете нужную для вас информацию от всего остального потока ненужного. Ваш зоркий взгляд цепляется и точно определяет саму суть того, что вы анализируете. Целительство, способность чувствовать и лечить чужую боль. Эмпатия. Способности в сфере эзотерики: великолепно можете чувствовать энергии, заниматься астрологией, рунами, - словом, предсказывать будущее. Милосердие - сострадание, желание бескорыстно помогать людям, отдавать энергию и время. Тонкий слух, яснослышание и красивый голос, врожденное ораторское мастерство. Умеете слышать свой внутренний голос. Дипломатия, способность примерить любой конфликт, приспособиться к любой ситуации, умение разбираться в людях и находить с ними общий язык. Актерский талант - умение играть роли, харизма, навык убеждения. Управление через информацию, информационная власть. Являетесь проводником знаний.
`;
talentsPanelItem.appendChild(paragraph);
break;
}
case 3: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(3) Плодородие, рождение нового, непрерывное изменение жизни, вынашивание идей, преумножение материи, новая жизнь. Женская власть, умение вдохновлять творцов, умеете построить доверительные, заботливые, чувственные отношения. Получение благ пассивным путем в состоянии умиротворённости, пассивности, принятия. У вас замечательное чутье, с одной стороны, на финансовые подвохи, а с другой – на удачные вложение и приобретения. Лидерство - вы можете достойно организовать свой бизнес, быть руководителем предприятия, занимать лидирующие позиции. Творчество, рукоделие, создание гармонии, красоты, которой можно любоваться, создавать красивые вещи у ют. Хороший вкус, благодаря которому все, к чему вы прикасаетесь - будь то одежда, интерьер, еда, выполненная работа, - выглядят безупречно.
`;
talentsPanelItem.appendChild(paragraph);
break;
}
case 4: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(4) Энергия освоения нового пространства, создание новых направлений, предприятий. Власть - способность изменять законы и физический мир. Власть над поступками людей. Умение выстроить людей, дать задания, спросить с них результат. Профессионализм - способность быстро становиться профи в любой области. Управление - стратегическое и системное мышление. Решительность. Обладание внутренней мудростью, уравновешивающей ваши оценки и решения. Бизнес-переговоры - способность брать ответственность за других. Дипломатия, умение добиваться поставленных целей финансы. Способность делать большие деньги.
`;
talentsPanelItem.appendChild(paragraph);
break;
}
case 5: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(5) Учитель от бога. Способность передать информацию доступно, обучать умениям и навыкам, говорить просто о сложном, делиться опытом. Системность. Умение структурировать, выстраивать схемы, планы, раскладывать по полочкам, создавать правила и регламенты в любой деятельности, архивирование. Лидерство. Умение объединить людей вокруг себя, создавая общие цели и ценности, атмосферу, вводить новое видение, правила и обучая жить по этим правилам. Красноречие - умение заинтересовать человека своей речью, ораторские способности. Талант к получению знаний - быстро впитывать информацию, фильтровать, анализировать и запоминать, соблюдать традиции. Экстрасенсорный талант - власть над сознанием людей. Целительство, врачевание, психология. Создание атмосферы - целостность. Развитая духовность и понимание высших сил исключить!! Беспорядок, неуважение к старшим, к учителям, у отцу.
`;
talentsPanelItem.appendChild(paragraph);
break;
}
case 6: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(6) Привлекательность. Способность обольщать, очаровывать, привлекать к себе людей, естественная артистичность
<br>Создание отношений. Любви и гармонии между людьми. Мужчины рядом с вами становятся мужественными, а женщины женственными.
<br>Коммуникабельность. Умение легко устанавливать, поддерживать и сохранять позитивные контакты в общении и взаимодействии с окружающими, добиваться желаемого
<br>Создание гармонии пространства, разума и интуиции.
<br>Талант дружить и создавать связи, отдавать энергию и заботиться о близких
<br>Тонкий вкус, эстетическое чутье, создавать красоту вокруг себя
<br>Рукоделие и развитое творческое начало
<br>ИСКЛЮЧИТЬ!! Идеализация, гордыня, измены `;
talentsPanelItem.appendChild(paragraph);
break;
}
case 7: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(7) Целеустремленность - преодоление любых преград, настойчивость, способность изменять мир
<br>Движение - умение уверенно вести людей вперед и вверх. Заряжать их на результат.
<br>Лидерство - умение вдохновлять, создавать команду и контролировать процессы, многозадачность.
<br>Способность к обучению, интеллектуальному развитию, науке, философии, изобретательству.
<br>ИСКЛЮЧИТЬ!!! Идти по головам, мешать другим реализовываться, ставить палки в колеса`;
talentsPanelItem.appendChild(paragraph);
break;
}
case 8: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(8) Способность управлять людьми, процессами и даже природой при помощи мощного сознания, интуиции и знаний божественных законов.
<br>Справедливость - умение восстанавливать справедливость мирным путем, судить безоценочно.
<br>Понимание и видение кармических законов, причинно-следственных связей.
<br>Организаторский талант, координация, брать ответственность за результат, взаимосвязи и систематизация процессов.
<br>Талант само презентации, понятное донесение информации
<br>ИСКЛЮЧИТЬ! Обман, лицемерие, нарушение закона, обязательств
`;
talentsPanelItem.appendChild(paragraph);
break;
}
case 9: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(9) Передача знаний - преподавание, передача практических (сокральных) знаний, умений и навыков из рук в руки достойным людям.
<br>Мудрость - открытие сокровенных знаний. Интеллектуальный труд - Наука, философия, эзотерика.
<br>Целостность - Гармоничное единство ее телесной, душевной и духовно-нравственной жизни. Способность быть мудрым и самодостаточным.
<br>Целительство - экстрасенсорные способности, трансформация прошлого опыта, переосмысление жизни.
<br>Верность партнеру. Приверженность традиционным ценностям
<br>ИСКЛЮЧИТЬ! Отшельничество, непочтение к старшим, к учителям`;
talentsPanelItem.appendChild(paragraph);
break;
}
case 10: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(10) Способность управлять судьбой - трансформировать реальность и события, привлекать желаемое. Развитая интуиция - везение, талант ловить поток и управлять им, способность приносить удачу другим. Связь со вселенной - вас слышат и отвечают. Коммуникабельность и умение работать в команде. Талант легко зарабатывать деньги - обеспечить себя и семью, вести бизнес, нестандартные проекты. Исключить! Тяжелый труд, зацикленность на материальных благах.
`;
talentsPanelItem.appendChild(paragraph);
break;
}
case 11: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(11) Управление энергией - способность быть проводником, заряжать людей, энергетическое целительство. Лидерство - вести за собой людей, брать ответственность. Занимать первые места способность защитить. Удача в делах, реализованность в социуме, интуиция, высокая выносливость и работоспособность. Низкий болевой порок. Способность долго не уставать. Крепкое здоровье. Сила духа. Исключить! Физическая и психическая агрессия, подавление слабых.
`;
talentsPanelItem.appendChild(paragraph);
break;
}
case 12: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(12) Эмпатия - способность понимать других людей как себя, и помогать им найти свой путь.
<br>Милосердие - способность жертвовать ради высоких целей и ради других людей.
<br>Духовность - иное видение и понимание сути вещей, событий, людей и явлений.
<br>Способность получить все блага мира, ничего не производя, за безусловную любовь и помощь людям.
<br>Креативность - неординарный взгляд на вещи, оригинальность.
<br>Красивый голос - артистичность, музыкальные способности.
<br>ИСКЛЮЧИТЬ! Жертвенность. Неумение отказывать`;
talentsPanelItem.appendChild(paragraph);
break;
}
case 13: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(13) Перерождение - обнуление всего старого, отжившего. Построение нового и лучшего.
<br>Трансформация пространства и мышления. Прокладывание новых путей.
<br>Сверхэффективность в экстремальных условиях и нестандартных ситуациях.
<br>Выживание и новая жизнь через кризис, адаптация с выгодой для себя.
<br>Дар гипноза и внушения.
<br>Структурность и системный хладнокровный подход.
<br>Рост через кризис.
<br>ИСКЛЮЧИТЬ! сопротивление переменам, инертность`;
talentsPanelItem.appendChild(paragraph);
break;
}
case 14: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(14) Творчество, которое раскрывается наедине с собой, в состоянии гармонии.
<br>Гармонизация людей и пространства, создание атмосферы.
<br>Целительство натуральными средствам, связь с природой.
<br>Духовность. Способность взаимодействовать со вселенной. Ясновидение.
<br>Способность увидеть, вдохновить и пробудить в людях лучшее.
<br>Дипломатия и навык дружить и создавать связи.
<br>Тонкий вкус, эстетическое чутье.
<br>ИСКЛЮЧИТЬ! Неблагодарность. Зацикленность на материальном.`;
talentsPanelItem.appendChild(paragraph);
break;
}
case 15: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(15) Очищение и трансформация людей через искушение и вскрытие пороков.
<br>Харизма, влияние, сексапильность.
<br>Способность выживать в самых сложных ситуациях, начинать с нуля.
<br>Диагностика и исцеление. Дар видеть суть, мельчайшие детали, ясновидение, оккультная способность.
<br>Талант делать деньги. Обеспечить себя, семью, создать капитал.
<br>Способность вытащить из тяжелейших зависимостей и состояний на грани.
<br>Выстраивать связи, легко коммуницировать, красноречиво доносить мысли.
<br>Эмпатия - умение чувствовать, понимать людей и видеть насквозь.
<br>Чувство юмора.
<br>ИСКЛЮЧИТЬ! Манипуляции и зависимости. Агрессию`;
talentsPanelItem.appendChild(paragraph);
break;
}
case 16: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(16) Способность исцелять карму с помощью энергетики.
<br>Дар созидательного разрушения. Способность все мгновенно разрушить, чтобы на обломках возвести новое, духовное и гармоничное.
<br>Духовная свобода. Способность отказаться от материальных благ и любых зацепок.
<br>Ясновидение, предсказания. Вселенная слышит и дает желаемое.
<br>Целительные способности.
<br>Способность к прорывам, осознанию через ограничения, медитации, практики.
<br>ИСКЛЮЧИТЬ! Консерватизм, агрессию.`;
talentsPanelItem.appendChild(paragraph);
break;
}
case 17: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(17) Энергопроводимость - способность передавать энергию большому количеству людей.
<br>Быть в центре, на сцене - талант, который раскрывается на людях.
<br>Уникальная судьба, которая является примером для многих.
<br>Сексуальность. Артистизм. Харизма.
<br>Способность делать деньги на любимом деле.
<br>Интуитивные и экстрасенсорные способности.
<br>Способность совмещать несовместимые направления и создавать новое и востребованное.
<br>Демонстрация своей жизни и мыслей людям, зрителям, поклонникам.
<br>ИСКЛЮЧИТЬ! Гордыня. Высокомерие.`;
talentsPanelItem.appendChild(paragraph);
break;
}
case 18: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(18) Умение видеть и читать знаки судьбы, символизм, подсказки высших сил.
<br>Интуиция и экстрасенсорика, умение видеть прошлое и будущее, вещие сны.
<br>Чувствование своего пути, предназначения и способность идти своим путем даже в одиночку и преодолевая любые преграды.
<br>Дар материализации через образное мышление(визуализацию).
<br>Артистизм. Богатое творческое воображение.
<br>Исцеление фобий, страхов у себя и у других людей.
<br>Таланты в рукоделии, кулинарии, дизайне и других творческих ремеслах.
<br>ИСКЛЮЧИТЬ! Обман и страхи. Иллюзии.`;
talentsPanelItem.appendChild(paragraph);
break;
}
case 19: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(19) Лидерство, ведение за собой людей, ответственность, решимость, вдохновение своим примером.
<br>Энергопроводимость – талант делиться бескорыстно и получать удовольствие от процесса.
<br>Талант быть в моменте и наслаждаться им, способность радоваться всем проявлениям жизни.
<br>Навык делать деньги, удача и хорошее финансовое вознаграждение в любой деятельности.
<br>Способность сохранять детскую непосредственность при любых, даже сложных обстоятельствах.`;
talentsPanelItem.appendChild(paragraph);
break;
}
case 20: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(20) Ясновидение, пророческие сновидения, общение с умершими родственниками во сне, развитая интуиция.
<br>Способность исцелить и укрепить карму своего рода, воссоединить семьи.
<br>Ясное понимание систем, людей и предметов, воссоздание их энергетической целостности.
<br>Способность сохранять знания, передавать и развивать традиции следующим поколениям.
<br>Дипломатия и структурированная передача знаний другим людям.
<br>ИСКЛЮЧИТЬ! Обиды на родных, отказ им в помощи.`;
talentsPanelItem.appendChild(paragraph);
break;
}
case 21: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(21) Талант к изучению иностранных языков, культуры, легкая адаптация в любой точке планеты.
<br>Дипломатия и способность быть достойным представителем интересов своей страны.
<br>Умение объединять людей, способствовать установлению мира.
<br>Способность создать и вести масштабные проекты. Амбициозность.
<br>Глобальное мышление, гибкость, вариативность. Креативность.
<br>Способность обогащать культуру своего окружения, компании, страны.
<br>ИСКЛЮЧИТЬ!! Неуважение к своей стране и мирозданию.`;
talentsPanelItem.appendChild(paragraph);
break;
}
case 22: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(22) Свобода от границ и ограничений. Мобильность, многогранность.
<br>Способность адаптироваться к любым ситуациям и быть успешным даже в самых сложных обстоятельствах.
<br>Творческие способности и креативный взгляд на мир.
<br>Отличная обучаемость, даже в абсолютно новых областях.
<br>Легкость в общении с людьми, способность вдохновлять на перемены.
<br>Талант воспитателя, учителя. Способности работы с детьми.
<br>ИСКЛЮЧИТЬ! Нарушение свободы воли.`;
talentsPanelItem.appendChild(paragraph);
break;
}}
})
}
let E2=calculation(E+Y);
let E1=calculation(E+E2);
let F2=calculation(F+Y);
let F1=calculation(F+F2);
let E_duplicate=E;
let E1_duplicate=E1;
let E2_duplicate=E2;
let F_duplicate=F;
let F1_duplicate=F1;
let F2_duplicate=F2;
if(E===B||E===B1||E===B2){
E_duplicate=0;
}
if(E1===B||E1===B1||E2===B2){
E1_duplicate=0;
}
if(E2===B||E2===B1||E2===B2){
E2_duplicate=0;
}
if(F===B||F===B1||F===B2||F===E||F===E1||F===E2){
F_duplicate=0;
}
if(F1===B||F1===B1||F1===B2||F1===E||F1===E1||F1===E2){
F1_duplicate=0;
}
if(F2===B||F2===B1||F2===B2||F2===E||F2===E1||F2===E2){
F2_duplicate=0;
}
talentsPanelContentCreate([B, B1, B2], 1);
talentsPanelContentCreate([E_duplicate, E1_duplicate, E2_duplicate], 2);
talentsPanelContentCreate([F_duplicate, F1_duplicate, F2_duplicate], 3);
const pastLivesPanelItem=document.querySelector('#past_lives_panel');
function pastLivesContentCreate(D2, D1, D){
if(D2===3&&D1===7&&D===22){
let title=document.createElement('p');
title.style.fontWeight='700';
title.innerHTML='Названия Кармичесткого Хвоста: Узник';
let paragraph=document.createElement('p');
paragraph.innerHTML=`<strong>(3-7-22) В прошлой жизни</strong><br>Человек был в заточении. Был в плену или в тюрьме. Возможно там умер.<br>
Были возможны зависимости от алкоголя, еды,<br> наркотиков, азартных игр. Или был в плену у партнера (многоженство, роковая женщина, муж тиран)
Так же могла быть несвобода по состоянию здоровья.<br><br>
<b>С чем пришел в эту жизнь:</b> <br>Нахождение в золотой клетке. Желание ощутить свободу.<br>
Скорее всего в окружении присутствуют сидевшие. Человек мог быть очень ревнивым и перенести<br>
качество в это воплощение. Выбирает деятельность близкую к этой теме - адвокаты, прокуроры, судьи, надзиратели и тд.<br>
<br><br>
<b>Проработка кармы:</b> <br>Осознать, что можно быть свободным в любых условиях. Достойно пройти такие испытания, не дать сломить свой дух. Помогать другим, обрести свободу или не попасть в тюрьму.<br>
`;
pastLivesPanelItem.appendChild(title);
pastLivesPanelItem.appendChild(paragraph);
}
if(D2===3&&D1===13&&D===10){
let title=document.createElement('p');
title.style.fontWeight='700';
title.innerHTML='Названия Кармичесткого Хвоста: Суицид';
let paragraph=document.createElement('p');
paragraph.innerHTML=`<strong>(3-13-10) В прошлом воплощении</strong><br>У вас был добровольный отказ от жизни. Это очень редкая карма.
<br><br>
<b>С чем пришел в эту жизнь:</b><br>С самого детства есть склонность к экстриму, ситуации происходят всегда на грани (вы не дорожите свое жизнью и это пугает родных и близких людей)
<br><br>
<b>Как происходит развитие души:</b><br>
Нужно научиться ценить жизнь. Проживать эту жизнь не прошлом, не в фантазиях, а здесь и сейчас.<br>
Забота о своей жизни, так же поможет облегчить жизнь вашим родным и близким.`;
pastLivesPanelItem.appendChild(title);
pastLivesPanelItem.appendChild(paragraph);
}
if(D2===3&&D1===22&&D===19){
let title=document.createElement('p');
title.style.fontWeight='700';
title.innerHTML='Названия Кармичесткого Хвоста: Нерожденное Дитя';
let paragraph=document.createElement('p');
paragraph.innerHTML=`<strong>(3-22-19) В прошлом воплощении:</strong><br>В прошлом воплощении был ранней уход из жизни, добровольный отказ в возрасте до 8 лет. Родители не смогли уберечь своего ребёнка и он погиб при нелепых обстоятельствах. Это очень редкая карма.
<br><br>
<b>С чем пришел в эту жизнь:</b><br>Душа пришла с обидой на самого близкого человека, на свою маму. Всю жизнь ищет свою маму (образно). С ней довольно сложные отношения, возможно так складываются обстоятельства. Есть чувство, что нужно все успеть, очень торопиться жить, хочется быстро закончить школу и получить образования и найти работу.
<br><br>
<b>Как происходит развитие души:</b><br>Прожить второе детство. Наиграться с племянниками, со своими детками, выбрать профессию связанную с детьми. Нужно понять женщин, которые делают аборт и простить их мысленно.<br>`;
pastLivesPanelItem.appendChild(title);
pastLivesPanelItem.appendChild(paragraph);
}
if(D2===6&&D1===5&&D===17){
let title=document.createElement('p');
title.style.fontWeight='700';
title.innerHTML='Названия Кармичесткого Хвоста: Гордыня';
let paragraph=document.createElement('p');
paragraph.innerHTML=`<strong>(6-5-17) В прошлом воплощении</strong><br>Вы были очень талантливы, обладали особенными качествами и чертами характера. Из-за этого и возгордились, считали себя лучше других и часто смотрели на людей с верху вниз.<br>
<br><br>
<b>С чем пришел в эту жизнь:</b><br>В этой жизни, у вас есть стремление получить все просто так, по праву рождения. У вас есть и талант и хорошая внешность. Хочется получить все и сразу по максимуму, если это работа то сразу в начальники (на должность по блату на хорошее место). Имейте ввиду, что избрав такой путь продвижения по карьерной лестнице, вам придется пройти ситуации унижения (коллеги будут издеваться, начальство станет принижать). Если гордыня не будет исцелена - начнутся уроки (унижения).
<br><br>
<b>Как происходит развитие души:</b><br>Исцелить гордыню можно только при правильно подходе, это значит, что нужно идти к своей цели шаг за шагом, учиться добиваться результата своим трудом (желательно с самого детства). Относится с уважением и не считать других людей ничтожными.<br>И только тогда в вас сможет раскрыться звезда. Действовать медленно, интуитивно это будет ваш лучший подход. Время и труд это ваши лучше друзья.<br>
`;
pastLivesPanelItem.appendChild(title);
pastLivesPanelItem.appendChild(paragraph);
}
if(D2===6&&D1===8&&D===20){
let title=document.createElement('p');
title.style.fontWeight='700';
title.innerHTML='Названия Кармичесткого Хвоста: Разочарование Рода';
let paragraph=document.createElement('p');
paragraph.innerHTML=`<strong>(6-8-20) В прошлом воплощении</strong><br>Вы опозорили свой род проиграли ваше имущество в карты , опозорили свою честь, женились не по статусу, не оправдали надежды главы семьи и т.д. К примеру, в прошлой реинкарнации вы могли раскулачивать односельчан, забирали у них все ими нажитое непосильным трудом. Теперь воплотились в роду, в котором раскулачены предки, и на уровне подсознания на вас влияет родовая программа: «деньги-зло», «иметь деньги-опасно».
<br><br>
<b>С чем пришел в эту жизнь:</b><br>Вы воплотились в том же роду. В прошлой жизни, стремления к большим деньгам принесли вам лишь страдания и теперь у вас есть материальные трудности. Как только деньги попадают в руки (заработали), то сразу появляется желание активно от них избавиться (потратить). Также у вас есть огромный набор талантов, есть четкое стремление быть лучшим, пытаетесь найти себя во многих направлениях. Ваши родные возлагают на вас большие надежды, и могут придираться. Вы пытаетесь учится, расти и побеждать но ваша мать все еще разочаровывается. Разочарования матери это ваш главный мотиватор, вы будете пытаться пока не угодите.<br>
<br><br>
<b>Как происходит развитие души:</b><br>Ваша задача в этом воплощении - прославить свой род! Твердо и ясно, вы должны отыграть в этой жизни все, что потеряли в прошлой. Это даст вам цель на всю жизнь, вас будут ставить в пример. Вы станете гордостью своего рода, если сможете добиться высокого результата.`;
pastLivesPanelItem.appendChild(title);
pastLivesPanelItem.appendChild(paragraph);
}
if(D2===6&&D1===14&&D===8){
let title=document.createElement('p');
title.style.fontWeight='700';
title.innerHTML='Названия Кармичесткого Хвоста: Диктатор';
let paragraph=document.createElement('p');
paragraph.innerHTML=`<strong>(6-14-8) В прошлом воплощении</strong><br>Вы были диктатором. Это мало изученная карма (новая карма). Скорее всего, вы любили власть и подчинять себе мнения остальных, плохо относились к женщинам.
<br><br>
<b>С чем пришел в эту жизнь:</b><br>У вас мощная энергетика и сильное физическое тело. Но зачастую проживаете серой жизнью, работайте на заводе, конторе и т.п. Ваша работа вас не устраивает, но вы нечего не делайте с этим.<br>
<br><br>
<b>Как происходит развитие души:</b><br>Нужно будет проявить себя через добро и помощь людям. Никого не винить в ваших бедах, а их будет немало.<br>
`;
pastLivesPanelItem.appendChild(title);
pastLivesPanelItem.appendChild(paragraph);
}
if(D2===6&&D1===17&&D===11){
let title=document.createElement('p');
title.style.fontWeight='700';
title.innerHTML='Названия Кармичесткого Хвоста: Загубленный Талант';
let paragraph=document.createElement('p');
paragraph.innerHTML=`<strong>(6-17-11) В прошлом воплощении</strong><br>Человек был наделен творческими талантами. Этот талант мог сделать его не только успешным финансово, но и полезным людям.
Однако по каким-то причинам человек не реализовал его.
Не успел, забоялся, не смог, выбрал обычную жизнь, физический труд. Возможно «зазвездился» и переоценил себя.
<br><br>
<b>С чем пришел в эту жизнь:</b><br>В настоящей жизни вам снова даётся такое испытание. В этом воплощении вы также наделены талантом, но работаете на обычной работе (возможно связана с деньгами: бухгалтер, экономист, менеджер).
Когда поступали, родители сказали – этим ты всегда заработаешь на кусок хлеба. Вам очень сложно услышать себя. Вы все время ищете, пробуете учиться, хотите заняться чем-то особенным, однако вас все время отвлекают обстоятельства, искушения. И снова откладывается поиск себя на потом, не делая выбор в сторону своего предназначения.
Вы словно компенсируете свой прошлый трудоголизм и часто отказываетесь работать в полную силу и максимально экономите энергию. Когда становитесь родителем – пытаетесь через детей исполнить мечту реализации таланта, водя их на разнообразные кружки и предоставляя множество возможностей для развития. Т.е. складываются обстоятельства, что вы можете открывать таланты в других людях, но не в себе.<br>При этом сами ведете скромный образ жизни.<br>
<br><br>
<b>Как проработать карму:</b></br>Отказаться от обычной жизни, допустить, что талант есть! И поставить задачу найти себя.
Стоит оставить детей в покое и дать им возможность прожить свою жизнь и беззаботное детство.<br>
Вкладывайте больше времени и сил в свое саморазвитие. Время не ушло, если человек в возрасте (это наоборот вдохнет новый вкус к жизни). Сейчас жизненно важно понять в чем ваша особенность, талант и уйти от рутины. Реализоваться через весь свой творческий потенциал.<br> Не бояться светить и сиять на людях и создать нечто новое.
Ответе себе честно на вопрос что вы любите? Туда и идите.`;
pastLivesPanelItem.appendChild(title);
pastLivesPanelItem.appendChild(paragraph);
}
if(D2===6&&D1===20&&D===14){
let title=document.createElement('p');
title.style.fontWeight='700';
title.innerHTML='Названия Кармичесткого Хвоста: Душа, Которую Принесли В Жертву';
let paragraph=document.createElement('p');
paragraph.innerHTML=`<strong>(6-20-14) В прошлом воплощении</strong><br>Вас использовали в качестве жертвоприношения. И люди глядя на процесс, пробуждались и понимали, что это все не правильно. (Редкая карма)
<br><br>
<b>С чем пришел в эту жизнь:</b><br>В этой жизни, ваше окружение теперь чувствует себя виноватыми перед вами, и отдают благо просто так, ни за что. Делают подарки и помогают чем только могут, вам не когда не отказывают в помощи и как правило, они сами предлагают помочь еще до того как вы попросите.
<br><br>
<b>Как происходит развитие души:</b><br>Для развития души, вам придется научиться довольствоваться малым, быть благодарным малому, не просить больше, чем положено. Вам нужно осознать, что в прошлом, ваша душа отдала свою жизнь ради благополучия других и теперь вам все мало, желаете заполучить все больше, не отдавая нечего взамен, как должное.`;
pastLivesPanelItem.appendChild(title);
pastLivesPanelItem.appendChild(paragraph);
}
if(D2===9&&D1===3&&D===21){
let title=document.createElement('p');
title.style.fontWeight='700';
title.innerHTML='Названия Кармичесткого Хвоста: Надзиратель';
let paragraph=document.createElement('p');
paragraph.innerHTML=`<strong>(9-3-21) В прошлом воплощении</strong><br>Вы были стражем в темнице, охранником в остроге, держали людей в заключении, то есть были тем, кто физически ограничивал свободу других людей. Более того, Вам нравилась Ваша работа, то есть Вам было комфортно в том месте, где другие люди были заключёнными, узниками или пленными.
<br><br>
<b>С чем пришел в эту жизнь:<b><br>Вы стремитесь контролировать весь мир, людей и их жизни. Любите управлять, подчинять и ограничивать свободу других людей. Все , кто оказывается под Вашим влиянием, должны, как в тюрьме исполнять Ваши приказы и жить по установленному Вами расписанию. Вы всегда считаете себя правым, проявляете злорадство, желаете, чтобы больше людей зависело от Вас. Если не получается кого-то контролировать, то уходите в осуждение, то есть выступаете по отношению к этому человеку в роли прокурора, обвиняя и нередко угрожая. Судьба может сурово наказать за это. Люди начнут отворачиваться от Вас, Вы останетесь без<br> второй половины, друзей и родственников. Кроме того пострадает и финансовая сфера Вашей жизни<br> - потеря работы, трудности с трудоустройством, кредиты, долги.<br> Если Вы не осознаете причины происходящих негативных событий, не встанете на другой путь, не перестанете ограничивать других людей, то начнутся проблемы со здоровьем вплоть до самых страшных диагнозов.
<br><br>
<b>Как происходит развитие души:</b><br>Вам необходимо уважать и не нарушать чужие границы, ни за кем не следить и не подчинять своей воле, не требовать от других ничего, давать им право жить своей жизнью, отпустить контроль всего. Пoчaщe пpoявляйтe великодушие, занимайтесь блaгoтвopитeльнocтью. Baм нe xвaтaeт гибкocти, вырабатывайте её. Пoмнитe, чтo вы умeeтe opгaнизoвaть людeй бeз пoдaвлeния. Работайте над собой. Доверьтесь этому миру. Принимайте других такими, какие они есть, со всеми недостатками, не пытаясь воспитать и переделать. `;
pastLivesPanelItem.appendChild(title);
pastLivesPanelItem.appendChild(paragraph);
}
if(D2===9&&D1===12&&D===3){
let title=document.createElement('p');
title.style.fontWeight='700';
title.innerHTML='Названия Кармичесткого Хвоста: Одинокая Женщина';
let paragraph=document.createElement('p');
paragraph.innerHTML=`<strong>(9-12-3) В прошлом воплощении</strong><br>Вы были женщиной, которая безграничной всепоглащающей любовью полюбила мужчину, и готова была ради этого мужчины отказаться от всего и вся, растворясь в нём полностью. Для Вас не существовало иного мира, чем этот мужчина. Он и был всем Вашим миром. Но Вам не суждено было быть с ним вместе, он исчез из Вашей жизни, оставив Вас в глубокой скорби и с сердцем полным боли.
<br><br>
<b>С чем пришел в эту жизнь:</b><br>С самой юности и на протяжении всей Вашей жизни Вас преследуют травмирующие отношения с противоположным полом. Вам часто приходится переживать расставания. Испытывая глубокую привязанность к партнёру, Вы не желаете его отпускать, а если он всё таки уходит, то постоянно осуществляете попытки вернуть его. Часто попадаете в зависимость от партнёра, идеализируете его, не видите очевидного. Либо вступаете в отношения с женатыми/замужними людьми. Сильная любовь к партнёру перемешивается с паническим страхом остаться без него. Поэтому нередко ему прощается всё, а он, осознавая это, начинает этим пользоваться.
Либо Вы находитесь в отношениях на расстоянии, причём и до и после заключения брака. Например, у партнёра длительные командировки, вахтовый метод работы. Или он живёт в другой стране, а ваш брак становится гостевым. При этом, у партнёра появляется вторая семья, но Вы закрываете на это глаза, что бы он окончательно не исчез из Вашей жизни. Могут преследовать разводы, а так же смерть второй половинки.
<br><br>
<b>Как происходит развитие души:</b><br>Развивайте самодостаточность и самостоятельность. Осознайте, что самое главное и ценное в Вашей жизни - это Вы сами. В первую очередь нужно полюбить себя. Заботьтесь о себе, о своём психическом и физическом состоянии. Вам предстоит долгая и кропотливая работа над собой. Уважайте себя и партнёра. Не унижайтесь, не пытайтесь заслужить любовь, каждый достоин любви и Вы тоже. Ищите любовь в себе, в первую очередь полюбите себя, Затем Бога, и только потом дарите любовь партнёру.
`;
pastLivesPanelItem.appendChild(title);
pastLivesPanelItem.appendChild(paragraph);
}
if(D2===9&&D1===15&&D===6){
let title=document.createElement('p');
title.style.fontWeight='700';
title.innerHTML='Названия Кармичесткого Хвоста: Мир Страстей И Сказок';
let paragraph=document.createElement('p');
paragraph.innerHTML=`<strong>(9-15-6) В прошлом воплощении</strong><br>Перед Вами встал выбор - прочные стабильные спокойные отношения с любимым человеком либо огненная пучина страстей с покорителями женских сердец. И Вы выбрали второе. Вы отказались от любви во имя разнообразия, экспериментов, страсти, нарисовав в своей голове картину ярчайшей как Солнце жизни. Ведь Вы хотели именно этого - праздника, фейерверка, а стабильность с любимым человеком Вас тяготила, утомляла, сгоняла в унынии. Вы бросили любимого человека, растоптав его чувства.
<br><br>
<b>С чем пришел в эту жизнь:</b><br>Вы - человек в розовых очках с воздушными замками в голове, который не хочет и не может представить свою жизнь с простым человеком. Вас преследуют мысли о прекрасной жизни,<br> а к реальной Вашей жизни у Вас множество претензий.<br> Вы обладаете богатой фантазией, но фантазий у Вас больше, чем практических дел. А ведь могли бы стать писателем-фантастом или художником-сюрреалистом.
У Вас часто будут возникать испытания страстью. Перед Вами будет стоять выбор: любовь или страсть. И обладая сильным сексуальным потенциалом, Вам будет сложно сделать выбор. Ведь он требует выхода и его сложно усмирить. Ваша полигамность, бурная сексуальная фантазия и тяга к экспериментам будут заставлять Вас делать выбор не в пользу любви.
<br><br>
<b>Как происходит развитие души:</b><br>Вам нужно понять, что духовное первостепенно, а физическое второстепенно. Вам важно научиться любить. А настоящая любовь начинается внутри. Любовь к себе – это первое требование, если вы хотите научиться любить кого-то другого. Вам нужно беречь себя, питать свое тело и душу и ощущать себя счастливой. Кроме того, чтобы научиться любить, нужно познать, что такое подлинная забота, уважение к другому человеку, узнавать его и активно участвовать в его развитии и росте. Научитесь отдавать, не ожидая ответа. Научитесь усмирять свои страсти. Займитесь делом, которое будет делать Вас счастливым, и тогда не придётся фантазировать и рисовать в своей голове разные картинки жизни, и тогда не придётся выбирать между любовью и страстью, ведь любовь будет внутри Вас. `;
pastLivesPanelItem.appendChild(title);
pastLivesPanelItem.appendChild(paragraph);
}
if(D2===12&&D1===16&&D===4){
let title=document.createElement('p');
title.style.fontWeight='700';
title.innerHTML='Названия Кармичесткого Хвоста: Император';
let paragraph=document.createElement('p');
paragraph.innerHTML=`<strong>(12-16-4) В прошлом воплощении</strong><br>Вы были деспотичным, властным и жестоким человеком. У Вас был высокий статус и богатство. При этом Вы не могли грамотно распоряжаться этим богатством либо были слишком жадным и алчным. Все Ваши черты характера убивали Вас самого. Вы не уважали людей, которые Вас окружали, подавляли их, не давая свободы выбора.
<br><br>
<b>С чем пришел в эту жизнь:</b><br>Вы строго контролируете и держите в ежовых рукавицах всех, кто Вас окружает. Но не забывайте, что за чрезмерным контролем последуют беды. Женщина-император очень сильная натура.
<br><br>
<b>Как происходит развитие души:</b><br> Вам необходимо особое внимание уделить работе с агрессией и жестокостью. В Вас очень много этих разрушительных эмоций. И именно они мешают Вам идти вперёд, развиваться, строить гармоничные отношения и проживать счастливую жизнь. Любите и уважайте окружающих Вас людей, будьте к ним милосердны и терпеливы, не подавляйте, не унижайте, не оскорбляйте, не получайте. Они не заслуживают холода и жёсткости, равнодушия и безразличия, постоянной критики и недовольства. Вам необходимо стать мягче и спокойнее. Поверьте, окружающим очень не хватает Вашего тепла и проявлений заботы. Согрейте их хотя бы парой ласковых слов. Проявляйте щедрость и доброту. Дополнительно для женщин следует отметить, что женщина должна воспитать в себе женственность, научиться уступать и идти на компромиссы, научиться доверять мужчинам. `;
pastLivesPanelItem.appendChild(title);
pastLivesPanelItem.appendChild(paragraph);
}
if(D2===12&&D1===19&&D===7){
let title=document.createElement('p');
title.style.fontWeight='700';
title.innerHTML='Названия Кармичесткого Хвоста: Воин';
let paragraph=document.createElement('p');
paragraph.innerHTML=`<strong>(12-19-7) В прошлом воплощении</strong><br>Вы были воином, человеком, который участвовал в военных действиях, в борьбе. От Ваших решений зависели жизни других людей. Очевидно, что вы совершали убийства. Могли и сами погибнуть на войне.
<br><br>
<b>С чем пришел в эту жизнь:</b><br>Вы - обладатель агрессивного и воинственного характер с желанием конкурировать, бороться, побеждать.
Вы часто спорите, иногда спорите, что бы просто поспорить. Для Вас принципиально важно, чтобы последнее слово осталось за Вами. Часто копите в себе агрессию, а потом выплескиваете её на близких людей. Стремитесь к успеху. Беретесь делать одновременно много дел. Достаточно жёстко реагируете на мнения, с которыми не согласны, часто «продавливаете» других людей, у которых не такое мнение, как у Вас. Не любите никому подчиняться. Для Вас подчиниться, значит проявить слабость. Всем пытаетесь что-то доказать. Вам всегда надо быть успешным, первым, лучшим.
Но в постоянной борьбе Вам рано или поздно становится сложно, Вы выматываетесь, начинаете делать ошибки, энергетически опустошаетесь. Ваша чрезмерная агрессивность начнёт блокировать продвижение вперёд и социальную реализацию. За любое проявление агрессии будет следовать наказание. Воины в большинстве своем отлично стреляют, хорошо обращаются с оружием. Боятся поначалу сесть за руль, но потом обожают ощущение скорости.
<br><br>
<b>Как происходит развитие души:</b><br>Научитесь не вступать в конфликты, озвучивайте все свои претензии спокойно без агрессии. Перестаньте постоянно спорить, просто выскажите своё мнение. Научитесь разбираться в себе, а не агрессировать в сторону другого человека. Прислушивайтесь к мнению других людей, пытайтесь понять их.
Откажитесь от борьбы и постепенно все станет налаживаться: появится новый взгляд на прощение; будете легко уходить от конфликтных ситуаций; осознаете, что ресурсов достаточно и нужно ставить цели и не бороться, а просто допустить, что всему свое время.
Созидание, сотрудничество и любовь приносят намного больше плодов, чем соперничество и война.
`;
pastLivesPanelItem.appendChild(title);
pastLivesPanelItem.appendChild(paragraph);
}
if(D2===15&&D1===5&&D===8){
let title=document.createElement('p');
title.style.fontWeight='700';
title.innerHTML='Названия Кармичесткого Хвоста: Предательства И Страсти В Семье';
let paragraph=document.createElement('p');
paragraph.innerHTML=`<strong>(15-5-8) В прошлом воплощении</strong><br>Вы предавали своих любимых, свою семью и не думали об их чувствах. Это могла быть измена или любое другое предательство. Возможно увлекались алкоголем или азартными играми и тем самым, причинили очень много страданий своим близким. То есть, в Вашей жизни были какие-то зависимости, а страдала Ваша семья. Или сами страдали в буквальном смысле - от боли. И не приняли эти страдания, сетовали на Бога.
<br><br>
<b>С чем пришел в эту жизнь:</b><br>В молодом возрасте будут искушения зависимостями, придётся делать выбор между хорошим и плохим. И тут главное - выбрать хорошее. Тогда далее в течение жизни, негативных событий может уже и не быть.
Ещё один из вариантов - Вы сами можете быть преданными. То есть Вы меняетесь ролями с теми, кого предавали и кому причиняли боль в прошлой своей жизни. Важно понять и простить того, кто Вам сейчас причиняет боль. Если Вы искренне поймете и простите, то всё сразу же образуется. Ни в коем случае, не начинать играть роль жертвы, осуждать, обвинять, критиковать, упрекать. У Вас может присутствовать сильный страх физических страданий. Боязнь за близких.
<br><br>
<b>Как происходит развитие души:</b><br>Чтобы эту карму излечить, следует понять и простить всех, кто причинял Вам в жизни страдания. Возродить любовь, верность, доверие, чистоту отношений в семье, выйти на новый уровень любви и взаимопонимания. Научиться экологичному проживанию разных жизненных ситуаций. Очень важно исцелиться, и оставить всю неприязнь и обиды.
<br><br>`;
pastLivesPanelItem.appendChild(title);
pastLivesPanelItem.appendChild(paragraph);
}
if(D2===15&&D1===8&&D===11){
let title=document.createElement('p');
title.style.fontWeight='700';
title.innerHTML='Названия Кармичесткого Хвоста: Физическая Агрессия';
let paragraph=document.createElement('p');
paragraph.innerHTML=`<strong>(15-8-11) В прошлом воплощении</strong><br>Вы были сильным человеком, который обижал слабых. Вы проявляли физическую агрессию к окружающим Вас людям. Вы подчиняли себе людей, стремились к абсолютной власти над ними. Вы брали силой, ничего не отдавая взамен. Вас боялись и Вас это вполне устраивало.
<br><br>
<b>С чем пришел в эту жизнь:</b><br>В детском возрасте, Вы можете чувствовать себя мишенью агрессии, это может быть как в детских коллективах (д/сад, школа, секции), так и дома. Самое интересное, что Вы можете быть жертвой издевательств со стороны тех, кто старше Вас, но при этом и сами же можете издеваться над теми, кто младше Вас. То есть Вы можете играть сразу две роли - и жертвы, и обидчика. У Вас может быть жёсткое воспитание и жёсткие родители. Девочки могут столкнуться
с насилием. Насилие происходит из-за того, что внутри сидит агрессия из прошлого и
притягивает агрессивных людей к себе. Во взрослой жизни женщины могут выйти замуж за тирана и жить по армейскому режиму, под постоянной критикой, давлением и требованиями,<br> постоянно испытывая физическую агрессию в свою сторону. При этом у них самих внутри тоже может быть много агрессии, которую они выплескивают на слабых, например, на детей. Вы также можете направлять агрессию на самого себя и это будет проявляться в необъяснимых болезнях, то есть Вы сами себе можете наносить физический вред. Вы можете захотеть стать сильнее физически, потому что считаете, это единственным способом отстоять себя, свои потребности и получить уважение со стороны окружающих. На деле же, можете ощущать беспомощность. Эталоном для Вас будут являться сильные, харизматичные мужчины, военные, боксёры. Можете презирать слабых.
<br><br>
<b>Как происходит развитие души:</b><br>Избавьтесь от внутренней агрессии, а если не можете избавиться, то подружитесь с ней, управляйте ею. Чтобы контролировать эту силу, практикуйте йогу, медитации, отказ от вредных привычек, позитивное мышление, контроль эмоций. Станьте мягче, добрее, спокойнее. Не обижайте тех, кто слабее вас.
`;
pastLivesPanelItem.appendChild(title);
pastLivesPanelItem.appendChild(paragraph);
}
if(D2===15&&D1===20&&D===5){
let title=document.createElement('p');
title.style.fontWeight='700';
title.innerHTML='Названия Кармичесткого Хвоста: Бунтарь';
let paragraph=document.createElement('p');
paragraph.innerHTML=`<strong>(15-20-5) В прошлом воплощении<strong><br>Вы совершали те или иные поступки против воли своих родителей и были исключены из семьи, либо сами, оставшись в семье непонятыми, ушли из неё. То есть Вы находились в конфликте с Родом, жили без связи с родными. Возможно, осуждали, держали на них обиду и злость.
<br><br>
<b>С чем пришел в эту жизнь:</b><br>Вы можете чувствовать себя в семье была белой вороной. Уже с раннего детства у Вас может быть свой взгляд на многие вещи и свое исключительное<br> мнение. Вы, будучи ещё ребёнком, можете постоянно спорить с родителями, быть отщепенцем в семье, чувствовать себя постоянно изгоем. Повзрослев, можете уйти из дома и совсем не общаться с родителями какое-то время.
Оставшись в семье, Вы можете заметить, что никто не поддерживает Ваше стремление заниматься, например, творческим трудом, а родители хотят, чтобы Вы занимались семейным бизнесом. Вам может казаться, что Вам нужно заслужить любовь семьи и долгое время Вы пересиливаете себя, занимаясь тем, чем велит родня. Вы начинаете бороться с ними, не хотите признавать роль родителей, их авторитет, не в состоянии принимать их такими, какие они есть, принять их любовь и заботу,<br> быть благодарным. Вы осуждаете свою родню, держите на них обиду. Чувствуете себя оторванным от семьи. Вы можете разорвать отношения с кем-то из родственников, например, с отцом. Нередко бунтари воспитываются без родителей, если их, например, по каким-то причинам отдали на воспитание бабушке. Бунтари воплощаются из раза в раз в одном и том же роду и именно в тот момент, когда роду необходима помощь.
<br><br>
<b>Как происходит развитие души:</b><br>Вы должны принять, что мыслите и ощущаете мир по-другому, чем родители и семья. При этом Вы должны научиться их принимать и уважать их выбор<br> жить именно так, как нравится им. А также спокойно принимать их мнение относительно того, как стоит жить Вам, и воспринимать это как заботу и любовь. Ведь они хотят Вам только добра. После того, как вы поймете и примите роль родителей, всё в Вашей семье наладится и сама семья станет относится к Вам иначе.
Вы можете записать все сведения о своем Роде в отдельную книгу и передать их своим детям, построить так же Древо Рода. Придётся совершить много работы в этом направлении, пройти родовые практики, медитации, молитвы. Но всё это необходимо для раскрытия потока любви в Вашем Роду и в Вас. Вы можете на расстоянии объединить родственников и поколения предков, создать особое родовое пространство. Например, можете создать для всех родственников сообщество в соц.сетях, где будете делиться с ними своими находками по Генеалогии и Родологии для семейного архива, вести семейный альбом, семейный календарь, семейную летопись и книгу Рода. Всё это будет объединять родственников, а Вы будете чувствовать единство Рода, чтобы росла его сила во благо его процветания.
Так же Вам предстоит найти исключенного из семьи и вернуть ему её любовь. Также бунтарь должен родить и воспитать здоровое, крепкое потомство. Заниматься прославлением своего Рода.
`;
pastLivesPanelItem.appendChild(title);
pastLivesPanelItem.appendChild(paragraph);
}
if(D2===18&&D1===3&&D===12){
let title=document.createElement('p');
title.style.fontWeight='700';
title.innerHTML='Названия Кармичесткого Хвоста: Физические Страдания';
let paragraph=document.createElement('p');
paragraph.innerHTML=`<strong>(18-3-12) В прошлом воплощении</strong><br>Вы страдали в буквальном смысле от физической боли, тело имело изъяны, очень сильно болели либо были калекой. Но Вы не смогли смириться и принять эти страдания, обвиняли в них Бога и всех вокруг, сетовали на судьбу, накопили в себе обиду и злобу на этот мир, не думали о своей душе, зациклившись исключительно на физическом теле.
<br><br>
<b>С чем пришел в эту жизнь:</b><br>Вы на подсознательном уровне сильно боитесь физических страданий и физической боли. Ваше сердце и душа сжимаются, когда Вы только думаете о том, что Вы будете испытывать физическую боль. Начинается паника при любой угрозе здоровью. А всё потому что Вы из прошлой жизни помните, как это тяжело столкнуться с физической болью и терпеть её долгое время. Но Вы боитесь не только за себя, но и за Ваших близких, боитесь, что им тоже придётся столкнуться с физическими страданиями. И от этого страха Ваши сердце и душа сжимаются ещё сильнее. То есть за близких Вы боитесь ещё сильнее чем за себя.
<br><br>
<b>Как происходит развитие души:</b><br>Ваша задача помочь людям принять свою болезнь и обратить особое внимание на свои душевные качества (силу духа и стойкость), не давать людям падать духом и поддерживать их морально, показать им, что болезнь — это не наказание, а возможность. Вы можете ухаживать за тяжело больными, идти туда, где будут беспомощные, ухаживать за ними. Вам будет страшно, но нужно пересилить себя и идти туда, где очень страшно, только тогда произойдёт исцеление и душевный рост.
`;
pastLivesPanelItem.appendChild(title);
pastLivesPanelItem.appendChild(paragraph);
}
if(D2===18&&D1===6&&D===6){
let title=document.createElement('p');
title.style.fontWeight='700';
title.innerHTML='Названия Кармичесткого Хвоста: Любовная Магия';
let paragraph=document.createElement('p');
paragraph.innerHTML=`<strong>(18-6-6) В прошлом воплощении</strong><br>Ваша душа так сильно любила другого человека, что не могла представить разлуки с ним, и Вы либо сделали приворот, либо невольно силой своей любви привязала человека к себе.
<br><br>
<b>С чем пришел в эту жизнь:</b><br>Вы можете испытывать страх с детства, который так и не сможете проработать в себе, не сможете принять любовь, полюбить, создать свою семью и проживете в одиночестве, так как будете ассоциировать любовь с несчастьем и негативом. С детства не любите себя, испытываете кучу комплексов, обладаете низкой самооценкой, обижаетесь на родителей,<br> считая, что они Вас не любят. Пытаетесь заслужить любовь других. Ищите любовь из вне. Ощущаете пустоту, ненужность, недолюбленность. Ищите любовь, но боитесь быть в серьёзных отношениях, меняете партнёров одного за другим. При этом часто находитесь в зависимых отношениях - не любите человека и не хотите быть с ним, но и расстаться с ним не можете. Часто вступаете в отношения с несвободными людьми, пытаетесь увести их из семьи и от партнёра. При этом сами можете оказаться в роли того, у кого увели мужчину/женщину.<br> Рано или поздно, чаще уже в подростковом возрасте возникнет желание приворожить любимого. Но даже если любовь получите, все равно будет казаться, что Вас любят не так, и всегда будет мало.
<br><br>
<b>Как происходит развитие души:</b><br>Вы должны проработать все свои страхи, стать уверенным, свободным, полюбить себя безусловно, таким какой Вы есть, создать гармоничный, красивый и крепкий союз, который станет примером для всех и дарить свою безусловную любовь своему партнёру, своей семье и делиться ею с окружающими. Учитесь заботиться о себе, ценить себя, ставить границы, наполняйте себя. Ни в коем случае не делать привороты, иначе душа не пройдёт испытание.
`;
pastLivesPanelItem.appendChild(title);
pastLivesPanelItem.appendChild(paragraph);
}
if(D2===18&&D1===6&&D===15){
let title=document.createElement('p');
title.style.fontWeight='700';
title.innerHTML='Названия Кармичесткого Хвоста: Темный Маг';
let paragraph=document.createElement('p');
paragraph.innerHTML=`<strong>(18-6-15) В прошлом воплощении</strong><br> Вы обладали мощными магическими знаниями и способностями, но использовали их только во вред людям и для злых дел. Вы были на тёмной стороне, совершенно не заботясь о своей душе.
<br><br>
<b>С чем пришел в эту жизнь:</b><br>Вы родились с магическими данными, магия - Ваш постоянный спутник с детства. В детстве Вы могли видеть сущностей, странные сны, страдать лунатизмом, интересоваться всем потусторонним. У Вас может быть четкое ощущение, что Вас ""ведут"" по жизни, помогая проходить уроки наилучшим образом. Ваша любовь ко всему магическому прекрасно уживается с набожностью. Вы можете быть добрым и позитивным человеком, но при этом если происходит нечто такое, что противоречит Вашим принципам, моральным нормам, что, по Вашему мнению, не должно существовать, Вы можете резко превратиться в ""воплощение зла"", мысленно или вслух пожелать ""всех благ"" и это часто приводит, как минимум, к неприятностям у людей, которые вызвали Ваш гнев. Вы можете обладать обострённым чувством справедливости, ощущением, что в Вашей власти - проучить, наказать других людей за их деяния. Но когда Вы так делаете, люди начинают от Вас отворачиваться, закрываться. Так же в Вашей жизни бывает и немотивированная агрессия, присутствуют гордыня, зависть, алчность, сквернословие. Вы можете ощущать, что Вас постоянно разрывает в противоположные стороны, испытываете внутренний конфликт света и тени. Вас постоянно кидает в крайности, то подъём и уверенность в себе и своих силах, то и спад и депрессия. Вы можете обладать целительскими способностями.
<br><br>
<b>Как происходит развитие души:</b><br> Вам нужно жить в гармонии с собой, с миром, с другими людьми. Можете начать изучать любые эзотерические учения, чтобы понять и принять свои способности, и научиться ими пользоваться во благо себя и других людей. Главное, не поддаться искушению уйти на тёмную сторону, это приведёт к ещё большему отягощению Вашей кармы. Любые Ваши действия не должны причинять вред этому миру, другому человеку. Ваши способности позволяют Вам спасать и исцелять людей, так займитесь именно этим. Контролируйте свои негативные эмоции, ведь ими Вы можете навредить людям.
<br>
`;
pastLivesPanelItem.appendChild(title);
pastLivesPanelItem.appendChild(paragraph);
}
if(D2===21&&D1===4&&D===10){
let title=document.createElement('p');
title.style.fontWeight='700';
title.innerHTML='Названия Кармичесткого Хвоста: Угнетенная Душа';
let paragraph=document.createElement('p');
paragraph.innerHTML=`<strong>(21-4-10) В прошлом воплощении</strong><br>Вы были человеком,
которого угнетали, на которого оказывалось давление, которого эксплуатировали, унижали, не давали свободы выбора, подавляли, притесняли. Вы не смогли освободиться от этих оков или не захотели. Так и остались сломленным и ущемленным.
<br><br>
<b>С чем пришел в эту жизнь:</b><br>Имея хорошее образование, Вы даже не пытаетесь найти престижную работу, думая, что не справитесь. Работаете на работе, где нет карьерного роста и не нужно ни к чему стремиться. Вам удобно работать с напарником, ведь на него можно переложить ответственность. Если рядом на работе или в любой компании есть тот, кто более авторитетен или уверен в себе, то Вы становитесь ""ребёнком"" рядом с ним. Никогда не проявляете инициативу, можете по месяцу трястись от страха прежде, чем предложить какую-то свою идею. У Вас очень сильный комплекс самозванца, считаете, что другие лучше всё сделают, а Вы не справитесь. Любите находиться под защитой и опекой кого-либо. Временами пытаетесь отправиться в самостоятельную жизнь, но из-за страха возвращаетесь под крыло другого человека. Боитесь ошибиться, поэтому живёте по принципу ""чем меньше делать, тем меньше будет ошибок"". Боитесь высказывать своё мнение.
<br>В детстве могли считать себя ничтожеством, считать, что все люди лучше Вас, при этом пряталась и ненавидели весь мир за это.
<br><br>
<b>Как происходит развитие души:</b><br>Отправьтесь наконец-то в свободное плавание, начните кайфовать от жизни по полной, начните заниматься своим делом в удовольствие, оттачивайте все Ваши умения и навыки, масштабируйтесь, воплощайте свои идеи и желания в жизнь, ставьте цели, не бойтесь ошибаться, не зависьте ни от кого, доводите дело до конца. Поймите, что Ваша жизнь - это Ваша ответственность. Верьте в себя!
`;
pastLivesPanelItem.appendChild(title);
pastLivesPanelItem.appendChild(paragraph);
}
if(D2===21&&D1===7&&D===13){
let title=document.createElement('p');
title.style.fontWeight='700';
title.innerHTML='Названия Кармичесткого Хвоста: Разрушение И Смерть Многим Душам';
let paragraph=document.createElement('p');
paragraph.innerHTML=`<strong>(21-7-13) В прошлом воплощении</strong><br>Вы были человеком, который был виновен в массовой гибели людей. Вы были тем, кто негативно воздействовал на весь мир, убивал этот мир, разрушал общество. Вы могли торговать оружием, наркотиками, некачественным алкоголем, торговали людьми, убивали животных(браконьерство).
<br><br>
<b>С чем пришел в эту жизнь:</b><br> Вы можете стремиться к тихой и простой работе, жить без амбиций и высоких целей, стараться себя не проявлять. Но может возникнуть искушение начать заниматься тем, что опять будет наносить вред людям или окружающей среде. Вы не должны поддаваться этому искушению ни в коем случае. Все такие варианты Вы должны обходить стороной и никогда на них не соглашаться. Точно так же Вам не подходит и простая работа, которая не несёт прямую ценность для большого количества людей.
<br><br>
<b>Как происходит развитие души:</b><br>Вам необходимо исцелять души и спасать жизни людей, причём делать это массово. Точно так как Вы причиняли вред огромному количеству людей, точно так же Вы должны нести благо такому же огромному количеству. Вы можете исцелить свою карму, работая врачом (хирург, акушер-гинеколог, реаниматолог), психологом, спасателем, пожарным, социальным работником, избавлять людей от наркотической<br><br> и иной зависимости.
`;
pastLivesPanelItem.appendChild(title);
pastLivesPanelItem.appendChild(paragraph);
}
if(D2===21&&D1===10&&D===7){
let title=document.createElement('p');
title.style.fontWeight='700';
title.innerHTML='Названия Кармичесткого Хвоста: Воин Веры';
let paragraph=document.createElement('p');
paragraph.innerHTML=`<strong>(21-10-7) В прошлом воплощении</strong><br>Вы были человеком, который насаждал свою веру, свою культуру, свой образ жизни, применяя насилие, то есть против воли человека.
<br><br>
<b>С чем пришел в эту жизнь:</b><br> Вы часто спорите, принципиально отстаивая свою точку зрения, подчёркивая, что Вы знаете лучше, чем другие, и всегда уверены в своей правоте. Постоянно критикуете других людей, убеждая их, что они живут неправильной жизнью. Вы принципиально тверды в своих жизненных убеждениях, что часто создаёт для Вас трудности в общении с другими людьми. Вам не хватает гибкости и доброты, вы слишком категоричны и принципиально. Часто бываете непримиримы, с пеной у рта доказывая что-то другому человеку. Даёте советы без спросу и думаете, что мнение может быть правильное только одно, и если Вы в чём-то убеждены, значит, так оно и есть.
<br><br>
<b>Как происходит развитие души:</b><br> Нужно контролировать свою одержимость и убеждённость, не навязывая Ваше мировоззрение, взгляды, мысли, знания другим людям. Вы должны научиться спокойно выслушивать и принимать другую точку зрения. Вы должны проявлять терпимость. Вы должны стать примером служения людям без агрессии и насилия. Важно принятие и уважение к людям – себе равным. Нужно понять, что мы все разные и в тоже время ЛЮБИМЫ Богом, Творцом – Создателем, и все равны перед ним. И все созданы по его образу. У каждого из нас есть право думать по-своему. `;
pastLivesPanelItem.appendChild(title);
pastLivesPanelItem.appendChild(paragraph);
}
if(D2===21&&D1===10&&D===16){
let title=document.createElement('p');
title.style.fontWeight='700';
title.innerHTML='Названия Кармичесткого Хвоста: Духовный Жрец';
let paragraph=document.createElement('p');
paragraph.innerHTML=`<strong>(21-10-16) В прошлом воплощении</strong><br>Вы обладали колоссальными знаниями относительно многих сфер жизни. Вы были в каком-то роде гением, уникумом. Ваш мозг имел безграничные возможности, Ваш интеллект превосходил интеллект абсолютного большинства, Вы обладали отличной памятью, которая помогла Вам хранить все Ваши знания самым надёжным образом. Но по какой-то причине не смогли принести пользу человечеству, поделиться этими знаниями. Не захотели сами, либо Вам не дали это сделать.
<br><br>
<b>С чем пришел в эту жизнь:</b><br>Вы можете изучать самые разные науки, сделать множество открытий, стать автором множества изобретений, написать ученые труды и преподавать в университетах. В Ваших силах стать выдающимся учёным, исследователем, конструктором, обладателем энциклопедических знаний по химии, физике, географии, экономике, медицине. Кроме того, Вы можете стать духовным лидером для миллионов.
<br><br>
<b>Как происходит развитие души:</b><br>нести духовные знания людям (психология, астрология, знаковые системы).
`;
pastLivesPanelItem.appendChild(title);
pastLivesPanelItem.appendChild(paragraph);
}
if(D2===18&&D1===9&&D===9){
let title=document.createElement('p');
title.style.fontWeight='700';
title.innerHTML='Названия Кармичесткого Хвоста: Волшебник';
let paragraph=document.createElement('p');
paragraph.innerHTML=`<strong>(18-9-9) В прошлом воплощении</strong><br>Вы были кладезем ценной и полезной информации, обладали знаниями, которые могли бы изменить жизнь не только отдельно взятого человека, но и человечества в целом. Могли своими знаниями изменить ход истории. Но Вы не смогли, не захотели или не успели их передать. Эти знания так и остались запечатаны внутри Вас.
<br><br>
<b>С чем пришел в эту жизнь:</b><br>С детства Вы были по сути одиноки, и очень глубоки в себе, постоянно учились, а близких людей даже среди родных почти не было. Вы были мудры не по годам. Вы не умеете получать удовольствия от жизни, не умеете радоваться, не умеете просить о помощи. Вечная неуверенность в себе и своих силах. При всём при этом чувствуете внутри очень мощный потенциал, но не можете его понять, разгадать, раскрыть. Страдаете от нереализованности именно потому, что чувствовали этот потенциал, но не могли им воспользоваться. Страдаете от своей интеллектуальной гордыни, всегда чувствовали себя особенным, самым знающим, самым умным. Можете давать себе множество внутренних обетов. Всю жизнь можете учиться и развиваться, но больше накапливаете в себе, чем передаёте другим. Не можете или не хотите понять, что обладаете какими-то знаниями, гОните эти мысли от себя. Зная про свой целительский Дар, все равно его не используете, боитесь его, не уверены в своих силах.
<br><br>
<b>Как происходит развитие души:</b><br>Вам нужно доверять своему внутреннему чутью, интуиции. Научиться передавать свои магические знания другим людям, не утаивая их и не скрывая. А для начала нужно их распаковать через различные практики раскрытия способностей, принять их, не сомневаться в их значимости, силе и пользе для других. Объедините духовное и материальное, научитесь жить в балансе без перекосов. Ведь чтобы помогать людям, не нужно отказываться от благ. Будьте открытым миру и людям.
`;
pastLivesPanelItem.appendChild(title);
pastLivesPanelItem.appendChild(paragraph);
}
if(D2===9&&D1===18&&D===9){
let title=document.createElement('p');
title.style.fontWeight='700';
title.innerHTML='Названия Кармичесткого Хвоста: Волшебник';
let paragraph=document.createElement('p');
paragraph.innerHTML=`<strong>(9-18-9) В прошлом воплощении</strong><br>Вы были кладезем ценной и полезной информации, обладали знаниями, которые могли бы изменить жизнь не только отдельно взятого человека, но и человечества в целом. Могли своими знаниями изменить ход истории. Но Вы не смогли, не захотели или не успели их передать. Эти знания так и остались запечатаны внутри Вас.
<br><br>
<b>С чем пришел в эту жизнь:</b><br>С детства Вы были по сути одиноки, и очень глубоки в себе, постоянно учились, а близких людей даже среди родных почти не было. Вы были мудры не по годам. Вы не умеете получать удовольствия от жизни, не умеете радоваться, не умеете просить о помощи. Вечная неуверенность в себе и своих силах. При всём при этом чувствуете внутри очень мощный потенциал, но не можете его понять, разгадать, раскрыть. Страдаете от нереализованности именно потому, что чувствовали этот потенциал, но не могли им воспользоваться. Страдаете от своей интеллектуальной гордыни, всегда чувствовали себя особенным, самым знающим, самым умным. Можете давать себе множество внутренних обетов. Всю жизнь можете учиться и развиваться, но больше накапливаете в себе, чем передаёте другим. Не можете или не хотите понять, что обладаете какими-то знаниями, гОните эти мысли от себя. Зная про свой целительский Дар, все равно его не используете, боитесь его, не уверены в своих силах.
<br><br>
<b>Как происходит развитие души:</b><br>Вам нужно доверять своему внутреннему чутью, интуиции. Научиться передавать свои магические знания другим людям, не утаивая их и не скрывая. А для начала нужно их распаковать через различные практики раскрытия способностей, принять их, не сомневаться в их значимости, силе и пользе для других. Объедините духовное и материальное, научитесь жить в балансе без перекосов. Ведь чтобы помогать людям, не нужно отказываться от благ. Будьте открытым миру и людям.
`;
pastLivesPanelItem.appendChild(title);
pastLivesPanelItem.appendChild(paragraph);
}
if(D2===9&&D1===9&&D===18){
let title=document.createElement('p');
title.style.fontWeight='700';
title.innerHTML='Названия Кармичесткого Хвоста: Волшебник';
let paragraph=document.createElement('p');
paragraph.innerHTML=`<strong>(9-9-18) В прошлом воплощении</strong><br>Вы были кладезем ценной и полезной информации, обладали знаниями, которые могли бы изменить жизнь не только отдельно взятого человека, но и человечества в целом. Могли своими знаниями изменить ход истории. Но Вы не смогли, не захотели или не успели их передать. Эти знания так и остались запечатаны внутри Вас.
<br><br>
<b>С чем пришел в эту жизнь:</b><br>С детства Вы были по сути одиноки, и очень глубоки в себе, постоянно учились, а близких людей даже среди родных почти не было. Вы были мудры не по годам. Вы не умеете получать удовольствия от жизни, не умеете радоваться, не умеете просить о помощи. Вечная неуверенность в себе и своих силах. При всём при этом чувствуете внутри очень мощный потенциал, но не можете его понять, разгадать, раскрыть. Страдаете от нереализованности именно потому, что чувствовали этот потенциал, но не могли им воспользоваться. Страдаете от своей интеллектуальной гордыни, всегда чувствовали себя особенным, самым знающим, самым умным. Можете давать себе множество внутренних обетов. Всю жизнь можете учиться и развиваться, но больше накапливаете в себе, чем передаёте другим. Не можете или не хотите понять, что обладаете какими-то знаниями, гОните эти мысли от себя. Зная про свой целительский Дар, все равно его не используете, боитесь его, не уверены в своих силах.
<br><br>
<b>Как происходит развитие души:</b><br>Вам нужно доверять своему внутреннему чутью, интуиции. Научиться передавать свои магические знания другим людям, не утаивая их и не скрывая. А для начала нужно их распаковать через различные практики раскрытия способностей, принять их, не сомневаться в их значимости, силе и пользе для других. Объедините духовное и материальное, научитесь жить в балансе без перекосов. Ведь чтобы помогать людям, не нужно отказываться от благ. Будьте открытым миру и людям.
`;
pastLivesPanelItem.appendChild(title);
pastLivesPanelItem.appendChild(paragraph);
}}
pastLivesContentCreate(D2, D1, D);
const healthPanelItem=document.querySelector('#health_panel');
function healthPanelContentCreate(numbers, title, description){
const uniqNumbers=new Set(numbers);
if(uniqNumbers.size!==1){
let topic=document.createElement('p');
topic.style.fontWeight='700';
topic.innerHTML=`${title}`;
healthPanelItem.appendChild(topic);
}
let p=document.createElement('p');
p.innerHTML=`${description}`;
healthPanelItem.appendChild(p);
Array.from(uniqNumbers).map((item)=> {
switch (item){
case 1: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(1) Вы получаете жизненную энергию, которую необходимо использовать ради достижения важной глобальной идеи. Если не видите цели своей жизни, направления для приложения этой энергии, то она задерживается в организме. Происходят сбои в жизненно важных системах, особенно часто страдает опорно-двигательный аппарат, нередко ноги или нервная система.
`;
healthPanelItem.appendChild(paragraph);
break;
}
case 2: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(2) Вы должны работать с информацией не глубоко, а достаточно поверхностно, передавая ее дальше. При невыполнении этого условия (слишком глубокое погружение в информацию, удерживание ее в себе, отсутствие передачи) страдают органы, которые принимают информацию из внешнего мира. Это глаза, нос, уши, язык, слизистые оболочки и кожные покровы. Для снятия проблемы не стоит углубляться в важные сведения, поглощать слишком много информации. Обязательно передавать важные сведения дальше. В целом стоит смотреть на жизнь проще, позволять себе больше развлечений, смотреть легкие фильмы и читать книжки популярного плана.
`;
healthPanelItem.appendChild(paragraph);
break;
}
case 3: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(3) Ваша жизнь нацелена на рост, плодородие, создание и увеличение земных благ. Если не заниматься созиданием или делать что-то, а потом удерживать результаты, не давать делу развиваться самостоятельно в нужный момент, то возникают проблемы в различных областях. Тормозится ваше развитие, наступает бессилие, возможны депрессии. Для улучшения общего состояния хорошо сделать хотя бы небольшое дело с наглядным изменением. Например, посадите цветок, так чтобы можно было наблюдать его рост.
`;
healthPanelItem.appendChild(paragraph);
break;
}
case 4: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(4) Вам важно всегда контролировать ситуацию. Когда это невозможно, вы начинаете ставить блоки и ограничения для людей, обстоятельств. Обычно это не имеет желаемого результата, но отражается на физическом состоянии в виде возникновения нарывов, абсцесса, опухолей разного рода. Для вас бесполезно контролировать определенную узкую область, не отпускать что-то. Более правильным будет запуск проектов глобального масштаба, неких сверхзадач. Так можно чувствовать себя более комфортно и предсказуемо, не отвлекаясь на контроль текущих мелочей.
`;
healthPanelItem.appendChild(paragraph);
break;
}
case 5: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(5) Значительное углубление в суть вещей и событий, в информацию для понимания и передачи опыта - ваше жизненное кредо. Если вы не делаете этого, поверхностно смотрите на ситуацию, не углубляетесь ни в один вопрос по-настоящему, в организме могут начаться сильные сбои вплоть до болезней внутренних органов, для лечения которых применяют оперативное вмешательство. Вам необходим более глубокий взгляд на вещи, рассмотрение проблем с разных ракурсов для правильного точечного решения. Сама жизнь может помогать вам, предоставляя интересные встречи с нужными людьми, давая возможность читать полезные книги.
`;
healthPanelItem.appendChild(paragraph);
break;
}
case 6: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(6) Ваша задача в жизни - воссоединение, центрирование информации, энергии, усилий людей. Хорошо делать командную работу, направлять коллектив. В противном случае возможно возникновение сразу нескольких нарушений в организме. При этом понадобится консультация одновременно многих специалистов с разными взглядами. Важно выявить все проблемы со здоровьем и решать их централизованно, так как они идут от одного корня. В этом случае также поможет команда для устранения глубинной причины разнообразных проблем в организме.
`;
healthPanelItem.appendChild(paragraph);
break;
}
case 7: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(7) Для вас просто необходимо выбрать уникальный вектор своего развития и неуклонно следовать ему, поверить в себя и свое самоопределение. Иначе при отсутствии движения жизнь станет ставить вам препятствия в виде различных ограничений. Чаще всего проблемы связаны с ногами, могут возникать различные травмы. Также бывают нарушения зрения, функционирования головного мозга. Тогда, оказавшись временно без движения, которое раньше не ценилось, вы будете вынуждены побыть наедине с собой, углубиться в себя и прислушаться к внутреннему голосу интуиции. Переосмыслив таким образом свою жизнь, сможете начать ценить ее, свою особость, мысли и переживания, стремления. Обретя уверенность, начинайте двигаться вперед. Тогда станут решаться и проблемы со здоровьем.
`;
healthPanelItem.appendChild(paragraph);
break;
}
case 8: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(8) Для вас важно существование в рамках системы, от которой вы чувствуете стабильность и защиту. Это может быть, как большая семья, так и коллектив на работе. Если по какой-то причине вы живете уединенно, не принадлежа обществу, не входя в крупную систему, могут начаться проблемы со здоровьем. То же самое происходит, если вы вынуждено выпали из системы (развод, увольнение или сокращение на работе). Тогда случаются гормональные сбои, заболевания иммунной системы. Чтобы преодолеть это, необходимо осознать свое положение, свою важность и роль для системы, семейные ценности и родовые программы. Подумайте, для какой новой сферы вы можете быть полезны, применяя свои навыки и знания. Необходимо не чувствовать себя брошенным за борт, а принять, что лодка может быть другой, как и команда гребцов в ней. Найдите свое место в новой системе и живите дальше.
`;
healthPanelItem.appendChild(paragraph);
break;
}
case 9: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(9) Для вас характерно состояние уединения, внутренняя глубинная работа интеллекта и души, отсюда часто нежелание меняться. При этом вы и боитесь уединения, и одновременно ищете его. Интуитивно вы понимаете, что следует соблюдать баланс между спокойствием, одиночеством рабочего процесса и общением в другое время, передачей знаний и обмена опытом с людьми. Если вы считаете себя слишком самодостаточным, избегаете общения, то развития не происходит. Вам все сложнее открывать новые знания, так как глубина погружения в них не помогает, нужно расширять кругозор. Вы можете дойти до того, что начнете терять энергию, угасать, при этом не понимая, что происходит. Видимых причин вашим недомоганиям нет, а диагноз сразу поставить сложно. Проблемы, как правило, возникают с работой внутренних органов. Вам нужен круг единомышленников, который поможет разобраться в себе, выйти из замкнутости, понять свое предназначение и начать двигаться дальше, делясь полученными знаниями.
`;
healthPanelItem.appendChild(paragraph);
break;
}
case 10: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(10) Вам важно в жизни научиться принимать помощь извне от людей, коллег, приятелей, а особенно от своего рода, семьи. Если намеренно отгораживаться, проявлять свою независимость, могут начаться самые серьезные проблемы со здоровьем вплоть до образования злокачественных опухолей. Возможны и другие заболевания, которые ограничивают свободу передвижения, полноценность жизни, так что вам вынужденно придется научиться просить помощь близких. Научитесь доверять людям, осознавать себя частью семьи, чувствовать помощь и защиту. Не оставайтесь наедине с проблемами, принимайте помощь с благодарностью. Тогда здоровье начнет поправляться.
`;
healthPanelItem.appendChild(paragraph);
break;
}
case 11: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(11) Вам дается большая энергия для выполнения масштабных проектов, решения больших вопросов. Если вы накапливаете ее, но не отдаете, или много расходуете, а потом не можете принять, наполнить себя, то резко развиваются заболевания внутренних систем организма. Особенно страдают отдельные органы, по которым неправильно распределенная энергия бьет, как молния. Важно научиться управлять своей энергией, аккумулировать и правильно распределять, вовремя направлять на стратегически важные решения. Действуйте не по всплескам физической активности и не тратьте энергию понапрасну. Важно уметь как грамотно распоряжаться своим внутренним потенциалом, так и заполнять себя силами для дальнейшей активности. Справиться с избыточной энергией может помочь спортзал, а зарядиться - время на природе.
`;
healthPanelItem.appendChild(paragraph);
break;
}
case 12: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(12) Ваше физическое тело служит как некий инструмент для взаимодействия других, объединения людей, демонстрации общего состояния в группе и возможных проблем. Вы можете испытывать разные недуги, жаловаться на недомогание. При этом все сразу собираются вокруг вас и начинают проявлять лучшие качества, в том числе и друг к другу (не только к вам). Так вскрываются и решаются внутренние проблемы, выясняются сложности во взаимоотношениях.Вы являетесь  своеобразным помощником людям, служите им, сигнализируя своими болезнями, что вокруг все плохо.Чтобы предотвратить собственные недомогания, надо работать с окружением, вовремя вскрывать и показывать проблемы.`;
healthPanelItem.appendChild(paragraph);
break;
}
case 13: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(13) Ваша роль в этой жизни - менять процессы, перестраивать работу целых коллективов, ломать старое, пересматривать ценности и начинать все с нуля. Когда в вашей собственной жизни все становится скучно, пресно и однообразно, тяготит, но при этом вы не можете серьезно что-то изменить, включаются болезни. Они как бы показывают, что надо кардинально отказаться ото всего старого (от изменения веса, обрезки волос до смены страны места жительства). Болезнь может лишить вас жизни, если не провести значительные трансформации в своем образе жизни, взглядах на мир, не изменить свое тело.
`;
healthPanelItem.appendChild(paragraph);
break;
}
case 14: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(14) Для вас важна некоторая степень внутренней свободы от материальности мира, наполнение энергией, жизнь эмоциями, которые можно выражать в творчестве. Если жить обычной жизнью, не настраиваясь на ритмы энергий окружающего мира, без духовного развития, начинаются проблемы с энергетическим наполнением тела. От этого страдают различные жидкостные системы: кровеносная, лимфатическая. На начальном этапе, до проявления болезней, вас может начать мучить вопрос о своем предназначении. Важно в этот момент прислушаться к себе, найти в жизни свой путь, начать что-то творческое, выйти из рутины, чтобы жить не как все. Тогда проблем со здоровьем можно избежать. Научитесь чувствовать тонкие энергии и получать вдохновение извне, прислушивайтесь к себе. Материализуйте энергетические послания и важную информацию в виде картин, стихов и других произведений искусства.
`;
healthPanelItem.appendChild(paragraph);
break;
}
case 15: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(15) Как для личности, для вас необходима власть над материальным миром, тотальный контроль над окружающими и системой. Для этого вам нужна твердая основа, но вы можете часто не дотягивать до своих желаний и амбиций. Если вы не получаете значимых результатов в материальном мире в виде денег и благосостояния, начинаются внутренние проблемы. <br>Приходят проблемы с опорно-двигательным аппаратом, позвоночником. Могут быть задействованы буквально все системы организма. Возможно, вы вкладываете недостаточно энергии или не имеете должного уровня компетенции, поэтому и не хватает энергии для создания материальных благ и получения видимого результата. Чтобы решить проблемы со здоровьем, надо развиваться духовно, как личность. Так можно получать тонкую энергию из окружающего мира, которая и даст возможность контролировать ситуации и добиваться успеха.`;
healthPanelItem.appendChild(paragraph);
break;
}
case 16: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(16) Для вас характерна жизнь по циклам спадов и подъемов, вы движетесь резкими рывками. Это неминуемо отражается и на вашем здоровье в виде частых травм, переломов. Рвутся самые тонкие и уязвимые места в организме очень внезапно. У вас есть что-то проблемное внутри, что мешает жить и двигаться нормально. Вы очень боитесь перемен, но периодически возникает необходимость в них. Если не следовать обновлению, нормальным циклам жизни, то организм сам запускает механизм саморазрушения, чтобы перевернуть жизнь с ног на голову. Важно своевременно отслеживать такие моменты необходимости перемен и причины, мешающие им. Двигайтесь вперед хотя бы маленькими шажками, если все новое пугает.
`;
healthPanelItem.appendChild(paragraph);
break;
}
case 17: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(17) Вы обладаете важной способностью верно оценивать любую ситуацию, понимать потенциал, но при этом многое замалчиваете. То же самое происходит и тогда, когда в вашей собственной жизни появляются проблемы. Выход из них становится возможным только при широкой огласке проблемы. Важно заявить о ней, привлечь внимание. Очень часто вы отказываетесь даже от реально действующей панацеи для организма, потому что точно знаете, как вам будет лучше. Важно консультироваться со специалистами, излагать свой взгляд на проблемы со здоровьем. Иначе при замалчивании и утаивании проблемы могут возникнуть серьезные осложнения и обострения течения заболеваний.
`;
healthPanelItem.appendChild(paragraph);
break;
}
case 18: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(18) Необходимо ясное понимание желаний. Глубинные причины процессов, принятие двух мнений в единое целое - ваше кредо. Если происходит проявление на физическом уровне, значит человек “потерялся” (сегодня проснулся - одна картинка мира, завтра другая). <br>Сегодня рука болит, а завтра нет, а послезавтра не понимает, болит или нет. Нет понимания того, что происходит, сложно выделить и нарисовать общую картину процессов. Всегда есть две стороны, два человека, которые что-то советуют: два родственника, две фазы, две болезни. <br>В какой-то сфере жизни существует двоякость, непонятные ощущения, отчего в голове возникает путаница. В результате сегодня происходит так, завтра по-другому. Важно прислушаться к себе, найти силы услышать оба мнения и найти единственно верную золотую середину.
`;
healthPanelItem.appendChild(paragraph);
break;
}
case 19: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(19) Вам дается жизненная энергия сразу и в большом количестве для принятия быстрых и легких решений или действия в экстремальной ситуации. Это происходит как внезапная вспышка, озарение, когда вы одни понимаете, что нужно и как действовать. Если не использовать этот потенциал, уходить от верного данного вам жизнью направления, могут возникать воспалительные заболевания, резкий подъем температуры, быстро текущие опасные болезни. Так судьба пытается проявить у вас вкус к жизни и занятиям, в которых вы можете быть наиболее полезны. Если не использовать эту дающуюся вам энергию, то возможно быстрое сгорание от болезни или несчастный случай (очень внезапный уход из жизни).
`;
healthPanelItem.appendChild(paragraph);
break;
}
case 20: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(20) Вы можете проходить глубинные процессы изменений во всех системах. Для этого понадобится большая работа, длительная трансформация образа жизни и вашего сознания. <br>Вас слишком многое тянет в прошлое. Плохо, если настанет момент, когда оглянетесь назад и поймете, что прожили правильную, но очень стандартную, скучную жизнь, не привнеся в мир ничего ценного, запоминающегося. Тогда начинаются проблемы с физическим и эмоциональным здоровьем. Вы можете освободиться от этого и излечиться при поддержке своих родных, сделав рывок и усилие над собой. С любовью близких вам доступны значительные трансформации жизни. Все в ваших руках (особенно когда терять становится нечего) от перемены места жительства до вероисповедания. С вашего перерождения начнется и новый этап жизни окружающих вас людей.
`;
healthPanelItem.appendChild(paragraph);
break;
}
case 21: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(21) Вы человек мира, который не должен зацикливаться на одних взглядах или месте проживания. Для решения проблем придется подняться на более широкий уровень, чем привычно. Если придерживаться узких рамок, закоснелых взглядов, начинаются серьезные проблемы со здоровьем (вплоть до онкологии и серьезных наследственных заболеваний). Вылечиться традиционными методами может быть сложно либо врачи могут неправильно диагностировать болезнь, выписывать не те лекарства. Это происходит, чтобы вы убрали внутренние рамки и начали взаимодействовать с миром, искать нетрадиционные способы лечения для решения ваших проблем со здоровьем. Вы должны понять, что вариант для вашего исцеления есть всегда. Не нужно останавливаться на одной больнице, враче или рекомендациях по лечению.
`;
healthPanelItem.appendChild(paragraph);
break;
}
case 22: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(22) Вам необходимо проще относиться ко всему материальному, жить легче с открытым сердцем, не принимать близко к душе проблемы. Наслаждайтесь настоящим моментом, проводите время веселее, не привязывайтесь к материальному и помните о вечности духовного. Если слишком важное место отдавать материальному миру, то могут начаться потери именно того, на чем акцентируется внимание, в том числе и здоровья. Не исключены болезни, связанные с ограничением передвижения, инвалидность. Выйти за рамки физической несвободы поможет духовное освобождение. Нужно понять и принять свое состояние и прийти к тому, что у вас много возможностей для развития и нормальной жизни, вы свободны душой и разумом, а значит - границ не существует.
`;
healthPanelItem.appendChild(paragraph);
break;
}}
})
}
let B1_duplicate=B1;
let A1_duplicate=A1;
let K6_duplicate=K6;
let B2_duplicate=B2;
let A2_duplicate=A2;
let K5_duplicate=K5;
let B3_duplicate=B3;
let A3_duplicate=A3;
let K4_duplicate=K4;
let X_duplicate=X;
let Y_duplicate=Y;
let K3_duplicate=K3;
let D1_duplicate=D1;
let C1_duplicate=C1;
let K2_duplicate=K2;
let D_duplicate=D;
let C_duplicate=C;
let K1_duplicate=K1;
if(B1===B||B1===A||B1===E){
B1_duplicate=0;
}
if(A1===B||A1===A||A1===E){
A1_duplicate=0;
}
if(K6===B||K6===A||K6===E){
K6_duplicate=0;
}
if(B2===B||B2===A||B2===E||B2===B1||B2===A1||B2===K6){
B2_duplicate=0;
}
if(A2===B||A2===A||A2===E||A2===B1||A2===A1||A2===K6){
A2_duplicate=0;
}
if(K5===B||K5===A||K5===E||K5===B1||K5===A1||K5===K6){
K5_duplicate=0;
}
if(B3===B||B3===A||B3===E||B3===B1||B3===A1||B3===K6||B3===B2||B3===A2||B3===K5){
B3_duplicate=0;
}
if(A3===B||A3===A||A3===E||A3===B1||A3===A1||A3===K6||A3===B2||A3===A2||A3===K5){
A3_duplicate=0;
}
if(K4===B||K4===A||K4===E||K4===B1||K4===A1||K4===K6||K4===B2||K4===A2||K4===K5){
K4_duplicate=0;
}
if(X===B||X===A||X===E||X===B1||X===A1||X===K6||X===B2||X===A2||X===K5||X===B3||X===A3||X===K4){
X_duplicate=0;
}
if(Y===B||Y===A||Y===E||Y===B1||Y===A1||Y===K6||Y===B2||Y===A2||Y===K5||Y===B3||Y===A3||Y===K4){
Y_duplicate=0;
}
if(K3===B||K3===A||K3===E||K3===B1||K3===A1||K3===K6||K3===B2||K3===A2||K3===K5||K3===B3||K3===A3||K3===K4){
K3_duplicate=0;
}
if(D1===B||D1===A||D1===E||D1===B1||D1===A1||D1===K6||D1===B2||D1===A2||D1===K5||D1===B3||D1===A3||D1===K4||D1===X||D1===Y||D1===K3){
D1_duplicate=0;
}
if(C1===B||C1===A||C1===E||C1===B1||C1===A1||C1===K6||C1===B2||C1===A2||C1===K5||C1===B3||C1===A3||C1===K4||C1===X||C1===Y||C1===K3){
C1_duplicate=0;
}
if(K2===B||K2===A||K2===E||K2===B1||K2===A1||K2===K6||K2===B2||K2===A2||K2===K5||K2===B3||K2===A3||K2===K4||K2===X||K2===Y||K2===K3){
K2_duplicate=0;
}
if(D===B||D===A||D===E||D===B1||D===A1||D===K6||D===B2||D===A2||D===K5||D===B3||D===A3||D===K4||D===X||D===Y||D===K3||D===D1||D===C1||D===K2){
D_duplicate=0;
}
if(C===B||C===A||C===E||C===B1||C===A1||C===K6||C===B2||C===A2||C===K5||C===B3||C===A3||C===K4||C===X||C===Y||C===K3||C===D1||C===C1||C===K2){
C_duplicate=0;
}
if(K1===B||K1===A||K1===E||K1===B1||K1===A1||K1===K6||K1===B2||K1===A2||K1===K5||K1===B3||K1===A3||K1===K4||K1===X||K1===Y||K1===K3||K1===D1||K1===C1||K1===K2){
K1_duplicate=0;
}
healthPanelContentCreate([B,A,E], 'Сахасрара - отвечают за головной мозг, волосы, верхняя часть черепа.', `<b>Проблемы со здоровьем:</b><br>
Заболевания могут быть как косметического характера (проблемы с волосами), так и более серьезного уровня - проблемы со здоровьем в черепном отделе, нарушения функций мозга и так далее. В быту вы ведете себя хаотично, много беспокойства. Не понимаете отдельных вещей и постоянно требуете строгой конкретики.<br>
<br><b>Причины:</b> <br>
Жить полноценной жизнью вам мешают материальные привязки. Вы разочаровались в своих духовных идеалах и стали жестким прагматиком. Верите только себе и рассчитываете только на себя. К окружающим нередко проявляете злость и нетерпение, пытаетесь поучать и воспитывать в духе своих убеждений. Можете навязывать свое мнение и не принимаете позицию собеседника. Вы не видите своего пути и глобальной миссии, поэтому все силы направляете на достижение исключительного материального благополучия. При этом испытываете проблемы, отсутствие энергии, так как мыслите узко и не готовы принимать помощь от судьбы.<br>
<br><b>Решение проблемы:</b> <br>
Придется постигнуть высшие законы вселенной, разобраться в своем жизненном пути и предназначении. Так же хорошо помогать в этом другим людям со сходными проблемами. Определитесь со своей главной миссией и следуйте ей. Важно не просто зарабатывать ради своего комфорта и процветания, а выполнять работу, которая поможет и другим людям, будет служить важной идее. Относитесь к проблемам в жизни проще, воспринимая их как полезный опыт. Хорошо жить в режиме, питаться, заниматься физическими упражнениями, работой и отдыхать регулярно. Составьте график и следуйте ему. Полезно вести довольно строгий и умеренный образ жизни, не предаваться излишествам, заниматься энергетическими и духовными практиками.
`);
healthPanelContentCreate([B1_duplicate,A1_duplicate,K6_duplicate], 'Аджна - отвечают за затылочные и височные доли мозга, глаз, уши, нос, лицо, верхняя челюсть, зубы верхней челюсти, зрительный нерв, кора головного мозга.', `<b>Проблемы со здоровьем:</b> <br>
В вашей ситуации встречаются заболевания глаз, ушей, частые проблемы с зубами. Потеря здоровья может быть связана с затылочной областью или проблемами в зоне лица. В более широком плане это выражается в проблемах при общении, отсутствии друзей, недостатке логики, постоянных протестах против систем, в которых находитесь (работа, семья, страна).<br>
<br><b>Причины:</b> <br>
Вы живете собственными иллюзиями и сильно оторваны от реальности. Часто настолько отдаетесь выражению протеста против внешнего мира, что забываете о работе и семейных обязанностях. У вас не хватает времени часто даже на самое необходимое. При этом вы рассуждаете и мечтаете о глобальных вещах, которые не в силах поменять. Свою же жизнь не принимаете и не можете выстроить будущее, заняться своей судьбой. Живете как живется, словно плывете по течению. При этом вас тревожит ощущение существования не своей жизнью (в профессии, месте жительства, в личных отношениях). Вы словно раздвоены, так как ваш внутренний мир не соответствует внешним ценностям. Отсюда неустроенность жизни, разлад между глубинными желаниями (которые боитесь даже постигнуть) и навязанными стереотипами общества. Могут возникнуть проблемы с психическим состоянием.<br>
<br><b>Решение проблемы:</b> <br>
Вам нужно расширить свой кругозор и принимать информацию из разных источников. Помогайте благоустройству общества, работайте со своим внутренним “я” и глубинным сознанием. Важно найти свое предназначение в жизни, свой особый энергетический поток и следовать ему. Возможно, придется полностью сменить систему ценностей, отказаться от иллюзий, за которые держались раньше. Не бойтесь остаться наедине с собой для глубокого постижения своей миссии в жизни. Осознайте свою роль, откажитесь от вредных привычек, научитесь грамотно распределять время и деньги. Самодисциплина станет важным шагом к переустройству жизни. Не забывайте о постоянном развитии своей личности.
`);
healthPanelContentCreate([B2_duplicate,A2_duplicate,K5_duplicate], 'Вишудха - отвечают за щитовидная железа, трахея, бронхи, горло, голосовые связки, плечи, руки, седьмой шейный позвонок, все шейные позвонки, нижняя челюсть, зубы нижней челюсти.', `<b>Проблемы со здоровьем:</b> <br>
Часто повторяются заболевания горла, могут возникнуть проблемы с щитовидкой, нижней челюстью. Нередко болят плечи или руки. На бытовом уровне вы не говорите правду, лжете себе и другим, возможно неумение выражать мысли, некоммуникабельность или наоборот - постоянное перебивание собеседника.<br>
<br><b>Причины:</b> <br>
Вы боитесь говорить правду, даже ту информацию и знания, в которых уверены, пережили на собственном опыте. Делиться хочется и одновременно страшно, потому что последствия могут быть в будущем. Вы ведете себя шаблонно и так же мыслите, не готовы проявлять свое творческое начало, уникальную личность. Боитесь осуждения и неодобрения, а отсюда проблемы в общении, замкнутость, заниженная самооценка, неумение выражать себя и говорить в буквальном смысле (глотание слов, сбивчивый голос). Вы стараетесь следовать всем понятным догмам, имеете множество распространенных в обществе предрассудков, боитесь отличаться от других. При этом много фантазируете и говорите неправду, а отсюда сразу начинаются проблемы со здоровьем. Лжете не только другим, но даже себе.<br>
<br><b>Решение проблемы:</b> <br>
Нужно пересмотреть и проанализировать опыт прошлого. Передать всю его ценность и постигнутые вами истины людям в любой словесной, устной форме. Вам важно начать говорить, это может быть видео ролик на ютубе, песня в караоке, первый в жизни тост в большой компании. Высказывайтесь на собраниях и на работе при принятии коллективных решений, просто пойте в ванной, рассказывайте что-то в кругу друзей. Но обязательно начинать проговаривать свои мысли, опыт и мнение. Говорите правду и избегайте лжи в любой форме. Для успеха используйте подсказки жизни и больше прислушивайтесь к себе. Занимайтесь творческим самовыражением.
`);
healthPanelContentCreate([B3_duplicate,A3_duplicate,K4_duplicate], 'Анахата - отвечают за сердце, кровеносная система, органы дыхания, легкие, бронхи, грудной отдел позвоночника, рёбра, лопаточная зона спины, грудь.', `<b>Проблемы со здоровьем:</b> <br>
Проблемы обычно наблюдаются с сердцем, легкими, бронхами. Возможны травмы ребер и все заболевания, связанные с областью грудной клетки. Это проявляется и на бытовом уровне: вам словно что-то мешает расправить грудь и дышать в полную силу. Много планов, но нет энергии на их реализацию.<br>
<br><b>Причины:</b> <br>
Вы находитесь в глубочайшей депрессии и словно полностью обесточены. Нет сил двигаться вперед, все время обращаетесь к какому-то случаю в прошлом. Нередко испытываете чувство вины и раскаяния. Вы хотите словно застраховаться от неприятностей, но не знаете как. Поэтому страшно идти дальше, реализовывать свои идеи, помогать другим создавать лучшее будущее. В то же время и внутри вы недостаточно испытываете любви к окружающим, словно ничем не наполнены. Настоящее вас не радует, непонятно, как дальше жить и выходить из состояния глубокого физического и душевного упадка. Это может выражаться как в полном равнодушии и желании, чтобы вас все оставили в покое, так и в излишней жертвенности по отношению к другим. Вы много отдаете, но ничего не получаете взамен, энергия тратится впустую, вы не чувствуете удовлетворения. Порой сами ждете чудесной помощи извне, решения ваших проблем.<br>
<br><b>Решение проблемы:</b><br>
Единомышленниками или психологом. Пусть это будет своеобразная исповедь, раскрытие своих плохих поступков и черт характера, за которые вам стыдно. Вы можете таким образом даже самостоятельно создавать группы для обмена знаниями и опытом в построении счастливых, гармоничных отношений. Вам необходимо построить для себя новую картину мира, научиться верить и любить взаимно и счастливо. Учитесь чему-то новому и всегда имейте пространство комфорта, где можно быть собой и просто расслабиться с близкими. Проанализируйте свое окружение и общайтесь с истинными друзьями, не тратя время на пустые контакты. Будьте настоящим, старайтесь выражать свои эмоции открыто. Переведите фокус со своих проблем на общие задачи своего круга общения. Научитесь принимать людей и себя со всеми светлыми и темными сторонами. Так в нужный момент вы сможете собраться и стать самодостаточным, без обвинений себя и окружающих, без зависимости от чужого одобрения или помощи.
`);
healthPanelContentCreate([X_duplicate,Y_duplicate,K3_duplicate], 'Манипура - отвечают за ЖКТ, органы брюшной полости, поджелудочная железа, селезёнка, печень, желчный пузырь, тонкий кишечник, центральная часть позвоночника.', `<b>Проблемы со здоровьем:</b> <br>
Заболевания могут быть в области желудочно-кишечного тракта. Нередко поражается средняя часть позвоночника. На поведенческом уровне это выражается в агрессии, раздражительности, неадекватности. Равнодушие может резко переходить в злобу и требовательность. Вы теряете что-то важное и делаете все, чтобы удержать это, в том числе незаконными методами, нарушая все нормы морали и права.<br>
<br><b>Причины:</b> <br>
Вы испытываете слишком сильную привязанность в отношении к человеку, либо вещам, обстоятельствам, образу жизни. При этом сами наделяете их исключительными, ценными для себя свойствами. Для вас важно контролировать и обладать. Вы часто высокомерны и амбициозны, любите показывать свою парадную сторону жизни и гордиться успехами. Ради результата не видите недостойных средств. В то же время можете быть безответственны. С людьми ниже вас по социальной лестнице, зависимыми (например, подчиненные на работе) не контактируете совсем. В какой-то момент жизнь начинает отнимать самое важное, чтобы вы начали действовать, развиваться, выходить из привычной зоны комфорта. Но вместо этого вы жалуетесь или проявляете агрессию. Не хотите меняться и хватаетесь за то, что у вас отбирают, любыми путями. Придется столкнуться с собой внутренним и понять, что не все зависит от вас и подвластно вашему влиянию. Как только сможете отпустить это - угроза потери минует.<br>
<br><b>Решение проблемы:</b> <br>
Определите новые границы жизни, уберите прежние рамки, вы должны развиваться. Переоцените окружение и принимайте мир таким, как он есть, без гордости и высокомерия. Совершайте спонтанные поступки и избавляйтесь от собственных комплексов. Сделайте что-то несвойственное кардинальная смена имиджа). Начните выстраивать отношения с разными людьми, а не только с теми, кто вам выгоден. Неплохо начать заниматься благотворительностью. Дисциплинируйте себя и развивайте волю через спорт, правильное питание, соблюдение режима. Так вы сможете освободиться от рамок и собственного недовольства, разочарования, агрессии. Станьте хозяином своего тела и эмоций.
`);
healthPanelContentCreate([D1_duplicate,C1_duplicate,K2_duplicate], 'Свадхистана - отвечают за надпочечники, матка и яичники, почки, кишечник, предстательная железа у мужчин, поясничный район позвоночного столба.', `<b>Проблемы со здоровьем:</b> <br>
В физическом плане можно страдать от заболевания таких органов, как почки, печень, толстый кишечник, половая сфера, надпочечники, поясничный отдел. На бытовом уровне это отражается в чувстве постоянной вины, ощущения нехватки любви, раздражительности, отсутствии радости от о всего. Вы можете ответственности или чрезмерно искать выгоду во всем при недостатке плодов от вашей деятельности. Не повышают зарплату, нет заказов, вы начинаете экономить и выгадывать, впадаете в еще большую депрессию.<br>
<br><b>Причины:</b> <br>
Часто все идет из детства, когда родители недостаточно уделяли внимания, где- то недооценили, недолюбили. Когда во взрослой жизни сталкиваетесь с подобной ситуацией, внутри просыпается тот обиженный ребенок. И вы моментально ставите себе блок, отказываетесь от дальнейших действий. Вслед за этим возникает чувство вины, что не выполнили обязательства, поступили неправильно. И так повторяется много раз вплоть до серьезного крушения в жизни (как потеря работы). У вас нет сил для творчества, создания каких-то плодов деятельности. Не заводите детей, ведь внутренне еще сами довольно инфантильны и не дали достаточно ребенку в себе. Нет энергии, сил и знаний откуда взять вдохновение для жизненного толчка.<br>
<br><b>Решение проблемы:</b> <br>
Примите своих родителей и полюбите в себе того недолюбленного ребенка. Позвольте себе жить как хочется, реализуйте свои желания одно за другим. Найдите единомышленников, заведите друзей, с которыми можно проговаривать и решать свои эмоциональные проблемы. Откажитесь от крайностей - чрезмерного шопоголизма или фанатичного накопления ценностей. Избавьтесь от внутреннего стыда перед собой и близкими. Позвольте реализоваться себе творчески. Ищите источник энергии для себя в приятных вещах. Это может быть массаж, организация мероприятий, забота о внешности, любой вид отдыха. Важно найти любимое занятие и работать в комфортной зоне, где сможете максимально раскрыться.
`);
healthPanelContentCreate([D_duplicate,C_duplicate,K1_duplicate], 'Муладхара - отвечают за Мочеполовая система, нижние конечности, толстый кишечник, копчик, крестец, ноги.', `<b>Проблемы со здоровьем:</b> <br>
На физическом плане начинаются проблемы с ногами, мочеполовой системой, областью крестца. В жизненном плане материальным голодом, крушением жизни, постоянной нехваткой брошенности и неоцененности. Вы испытываете усталость и чувство безнадежности ситуации.<br>
<br><b>Причины:</b> <br>
Вы слишком зациклены на прошлом, живете в нем, постоянно возвращаетесь туда воспоминаниями. Здесь возможно два варианта. Когда-то было очень хорошо - благополучие, счастье, достаток. А сейчас - плохо, и вы не можете принять ситуацию, живете воспоминаниями о прошлом. Или наоборот - в прошлом было несколько повторяющихся ситуаций с проблемами, неудачами, предательством. Вы не можете этого забыть и двигаться вперед. Постоянно крутитесь как белка в колесе, но ничего не меняется. От этого усталость, страх на грани выживания, вы экономите на всем и постоянно себя сдерживаете. Хочется просто уже отказаться от движения, так как нет энергии и результата. Ждете “волшебной палочки”, которая решит все за вас.<br>
<br><b>Решение проблемы:</b> <br>
Пересмотрите свои ценности и отношение к прошлому. Умейте видеть хорошее в настоящем. Даже в самом неудачном прошлом тоже найдите позитивные примеры и уроки. Нужно быть готовым к переменам. Сделайте для себя настоящее более ценным, чем прошлое. Все проблемы не навсегда, жизнь течет, а ситуации меняются. Будьте готовы поймать благоприятный момент. Полезно заняться чем-то увлекательным и интересным, пусть даже вначале не приносящим больших денег. Освободитесь от прошлого и на элементарном, бытовом уровне. По возможности, сделайте ремонт или поменяйте часть обстановки, уберите старые фото и вещи.
`);
const purposePanelItem=document.querySelector('#purpose_panel');
function purposePanelContentCreate(LP1, LP2, LP3){
const uniqLP1=new Set(LP1);
const uniqLP2=new Set(LP2);
const uniqLP3=new Set(LP3);
let isPurposeTitleFirstOpened=true;
let isPurposeTitleSecondOpened=true;
let isPurposeTitleThirdOpened=true;
if(isPurposeTitleFirstOpened){
const text=document.createElement('p');
text.innerHTML='Предназначение (20-40 лет)';
text.style.fontWeight='700';
purposePanelItem.appendChild(text);
}
Array.from(uniqLP1).map((item)=> {
switch (item){
case 1: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(1) Ваша задача заключается в помощи братьям, сестрам, близкому кругу людей. Вы для них должны стать примером, опорой и учителем! Отдавать больше энергии людям. Так, вы научитесь жить в гармонии с самим собой и сможете отыскать свое истинное «я».
<br>В течении всей жизни вам необходимо совершенствоваться и развивать свои таланты и знания в разных сферах жизни. Тестировать направления. Нельзя бросать обучение на половине пути и отказываться от него.  Применять свой мощный энергетический потенциал(физический и ментальный) на решение жизненных задач. Вам категорически запрещено жить в застое. `;
purposePanelItem.appendChild(paragraph);
break;
}
case 3: {
let paragraph=document.createElement('p');
if(gender==='М'&&parseInt(age.innerHTML) <=40){
paragraph.innerHTML=`(3) Вам следует научиться отстаивать свою точку зрения, выйти из-под контроля и опеки матери и/или жены. Вырабатывать в себе силу духа, стойкость, твёрдость и решительность. Научиться зарабатывать деньги и обеспечивать свою семью, при этом ставя на первый план именно семью, а не материальные блага. Для Вас важно уметь прислушиваться к мнению других, признавать свою неправоту. Вы должны стать надёжной опорой, защитником и верным спутником для своей половинки.`
}
if(gender==='Ж'&&parseInt(age.innerHTML) <=40){
paragraph.innerHTML=`(3) Вам необходимо научиться работать со своими эмоциями, уметь подавлять раздражение и вспыльчивость. Необходимо научиться доверять людям, слушать и слышать их, не навязывая исключительно свою точку зрения. Перестать контролировать всё и всех, дать окружающим возможность самим выбирать свой путь и иметь право голоса. Очень важно бороться с такими качествами, как зависть и тщеславие, а амбиции должны быть здоровыми.<br> Излишняя зацикленность на деньгах может негативно сказаться на психическом и физическом здоровье, разрушить отношения с близкими людьми.
`
}
purposePanelItem.appendChild(paragraph);
break;
}
case 4: {
let paragraph=document.createElement('p');
if(gender==='М'&&parseInt(age.innerHTML) <=40){
paragraph.innerHTML=`(4) Вам необходимо всегда брать власть и инициативу в свои руки, но при этом не перегибать палку и не становиться диктатором. Вы пришли в этот мир прирождённым руководителем, но при этом руководите людьми, не подавляя их, проявляйте лояльность, прислушивайтесь к их мнению. Станьте хозяином, отцом, защитником, покровителем, обеспечивая всем необходимым своих близких. Зарабатывайте и преумножайте Ваше благосостояние. Учитесь управлять своими негативными эмоциями, подавляйте агрессию, злость, гнев и раздражение. Давайте самым близким людям право выбора, не диктуйте как им жить и что делать. В семье, как и на работе категорически нельзя становится диктатором и требовать беспрекословно выполнять все Ваши требования. Имея достаточное количество материальных благ в своей жизни, не зацикливайтесь на них, иначе это будет разрушать. Если придавать слишком большое значение деньгам, то рано или поздно они уйдут. Продолжайте учиться всему новому, не думать, что уже достаточно знаний и умений. Ведь нет предела совершенству, а любое новое знание и умение - это всегда шаг вперёд.`
}
if(gender==='Ж'&&parseInt(age.innerHTML) <=40){
paragraph.innerHTML=`(4) Вы должна постоянно контролировать свои мыслями относительно мужчин и Ваше поведение рядом с сильным полом. Ведь Ваша главная кармическая задача — быть мягкой, мудрой и гибкой в отношениях с мужчинами. Для Вас важно передать бразды правления в семье мужчине, а не занимать его место. Вам нужно приложить максимум усилий, чтобы убрать категоричность, а так же претензии к мужчинам. Необходимо избавиться от мыслей, что «я знаю лучше, как надо», от желания поучать и
постоянно вмешиваться в дела мужа. Вам предстоит постоянно держать руку на пульсе, чтобы вовремя отслеживать мужские черты в характере и трансформировать их в женские. Если есть претензии к отцу или бывшим партнерам, рекомендуем от них освободиться, для этого позаниматься практиками на прощение. Иначе эти обиды будут автоматически транслироваться на сыновей и других партнёров, сильно усложняя отношения с ними.`
}
purposePanelItem.appendChild(paragraph);
break;
}
case 5: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(5) Личное предназначение.
<br>Для обретения гармонии с собой и с этим миром Вам в первую очередь нужно понять, что Вы - вечный ученик и Вам всю жизнь следует постигать всё новое и новое, получать новые знания и новый опыт, открывать в себе новые способности, получать новые навыки, собирать и анализировать новую информацию, расширять свой кругозор и мировоззрения. Много читайте, получайте дополнительное образование. Вам жизненно вaжнo нaпoлнять ceбя нoвым, чтoбы впocлeдcтвии пoдeлитьcя этим c миpoм. Вы можете также научиться учить других людей, но не забывайте, что Вам предначертано учить, а не поучать, не путайте эти понятия, и не переходите эту грань. Для этого Вам необходимо приобрести такие черты характера, как терпимость, гибкость, умение признавать разные точки зрения, слушать и слышать окружающих, ничего не навязывать другим, даже если оно светлое, доброе и хорошее. Запомните, что помогать стоит только, если обратились за помощью. А если не просят, не вмешивайтесь в чужую жизнь, не нарушайте личных границ, ведь каждый должен получить свой собственный опыт. Делитесь своими знаниями, умениями, навыками, опытом, которые пойдут на благо человеку. Делитесь своими открытиями и наработками, не жадничая и не скрывая, думая, что кто-то потом составит конкуренцию. Чем больше будете отдавать, тем больше будете получать нового и удивительного. Будьте уверенным в себе и своих знаниях, не судить себя строго, если что-то не получилось. Еще одна из задач — уважительно относиться к людям с разными уровнями духовного и личностного развития без проявления высокомерия и раздражения. Если Вы - родитель, научитесь отпускать своих детей, давать им свободу, пусть они набивают свои шишки и идут своей дорогой, познавая жизнь. Если Вы - ребёнок, то Вам нужно уходить из родовой системы, открываться миру, учиться быть самостоятельными и жить своей жизнью, а не жизнью своих родителей, выполнять свои желания, а не их, при этом обязательно сохранять уважение к ним.
`;
purposePanelItem.appendChild(paragraph);
break;
}
case 6: {
let paragraph=document.createElement('p');
if(parseInt(age.innerHTML) <=40){
paragraph.innerHTML=`(6) Личное предназначение (условно до 40 лет)
<br>Вам необходимо создавать вокруг себя прекрасное, окружать себя красивыми вещами, но при этом не цепляться за материальное и только внешнюю красоту. Вам важно нравиться окружающим, но избегайте зависимости от их мнения и их суждений о Вас. Важно помнить, что всем мил не будешь. Двигайтесь своей дорогой, туда, куда подсказывает Ваше сердце, даже если это не нравится окружающим, ведь это Ваша жизнь, а не их. Не зацикливайтесь на своей внешности, примите и полюбите себя таким, какой Вы есть. Не стремитесь быть идеальным, ведь идеалов нет, просто живите и каждый день делайте что-то для улучшения своего характера и судьбы. А если не получается, не вините себя. Боритесь со своей мнительностью, ранимостью, недоверчивостью, ленью, обидчивостью. Снимите розовые очки и не бойтесь увидеть и принять мир и людей такими какие они есть. Не цепляйтесь за прошлые отношения, впустите новую любовь в свою жизнь, поверьте в то, что искренние и настоящие отношения между мужчиной и женщиной существуют. Если отношения (дружба или любовь) не приносят радости, отпустить их. Если человек уходит, не держите его. Ведь чем быстрее его отпустить, тем легче будет жизнь и в нее сразу же придут новые отношения. Научитесь любить не за что-то, а просто так, безусловной любовью. Любите и будьте любимы. Поверьте в то, что Бог Вас любит, и научитесь ощущать и принимать его любовь.
`;
}
purposePanelItem.appendChild(paragraph);
break;
}
case 7: {
let paragraph=document.createElement('p');
if(parseInt(age.innerHTML) <=40){
paragraph.innerHTML=`(7) Личное предназначение (условно до 40 лет):
<br>Для Вас очень важно реализоваться и получить признание. Вам важно знать Вашу основную цель и, составляя план действий, сконцентрировано двигаться только в нужном направлении. Контролируйте свою агрессивность, враждебность и воинственный настрой. Не перенапрягайтесь, не перерабатывайте, ведь от Вашего трудоголизма пострадаете не только Вы, но и Ваши близкие. Не придирайтесь к себе излишне, цените свои достижения. Вам неплохо будет обучиться релаксации и медитации, чтобы уметь расслабляться. Не забывайте о здоровье своего тела, укрепляйте костно-мышечную систему и заботьтесь о здоровье суставов. Вам необходимо направлять свою бушующую энергию в мирное русло — на созидание и
помощь другим, тогда Ваша сила будет только приумножаться. Вы пришли на Землю,
чтоб оставить после себя глубокий след, так пусть же он будет ярким и красивым.
<br>Поймите, что жизнь — не борьба, она не злая и не жестокая, а удивительный божественный дар. И как его использовать, зависит только от Вас.
`;
}
purposePanelItem.appendChild(paragraph);
break;
}
case 8: {
let paragraph=document.createElement('p');
if(parseInt(age.innerHTML) <=40){
paragraph.innerHTML=`(8) Предназначение личное (условно до 40 лет).
<br>Вам очень важно понять, что всё, что происходит в жизни, - справедливо, поскольку имеет корни в прошлом. Если Вы это поймете, то будете быстро извлекать уроки из всех, даже самых негативных ситуаций, и быстро переводить их в позитив.
<br>Обладая обострённым чувством справедливости, Вам необходимо стоять на защите законности, справедливости, чести и достоинства. Необходимо иметь свою точку зрения, всегда следовать внутренним нравственным ориентирам. Но не следует осуждать других, ввязываться в борьбу и споры, отстаивая свою позицию и доказывая свою правоту. Не допускайте ссор, оскорблений, унижений, безнравственности и непорядочности вокруг Вас. Для Вас важно соблюдать баланс и внутреннюю гармонию. Не обвиняйте в своих бедах всех вокруг, возьмите ответственность за свою жизнь на себя. К примеру, если постоянно попадаются ненадежные партнеры, то дело в Вас и Вашей ненадёжности, а не в них. Или, возможно, в каких-то серьезных проектах или задачах Вы очень ответственны и исполнительны, но при этом не придаете значения мелочам. Например, обещали перезвонить маме, но забыли. Кому-то ответить на письмо надо было сегодня, а вы об этом вспомнили только в конце недели. Это кармические «семена», которые потом всходят в вашей реальности в виде определенных событий. И если в Вашей жизни часто повторяются одни и те же отрицательные ситуации, это значит, что Вы не извлекли уроки из предыдущих случаев. Вы будете проживать одни и те же сценарии до тех пор, пока не поймете причинно - следственный закон бытия. Сохраняйте спокойствие, не видитесь на провокации других людей. Избавьтесь от возмущения и агрессии. Ведь любой негатив можно перевести в позитив через принятие, прощение, любовь и благодарность.
<br>Ещё одной Вашей задачей является научиться принимать чужие точки зрения, осознать, что у каждого человека «своя справедливость», своя реальность. Избавьтесь от всех негативных мыслях об окружающих, и тогда и Ваша реальность преобразится.`;
}
purposePanelItem.appendChild(paragraph);
break;
}
case 9: {
let paragraph=document.createElement('p');
if(parseInt(age.innerHTML) <=40){
paragraph.innerHTML=`(9) Предназначение личное (условно до 40 лет).
<br>Прежде всего Вам необходимо научиться доверять людям и этому миру, побороть свою замкнутость, осторожность и временами пугливость. Не закрываетесь в себе, откройтесь миру и людям, чтобы передать им свои ценные знания.<br> Избавьтесь от гордыни, осуждения людей, возвышения над ними, не считайте себя самым умным, а других глупыми. Откажитесь от деления людей по признаку «умный–глупый». Питайте не только свой мозг, но и тело, заботьтесь о своём здоровье и внешнем виде, заботьтесь о чистоте и порядке в своём доме. Полюбите себя, раскрепоститесь, наладьте сексуальную жизнь и получайте от нее удовольствие, разрешить себе наслаждаться земными благами, Вы - человек, и Вам это нужно. Поймите, что соединить в себе духовное и материальное - возможно, и так же возможно жить в балансе между этими двумя мирами. Поверьте в себя, в свои знания, интеллект, раскройте свои таланты людям. Ваше духовное развитие должно идти в соответствие с традициями рода, для этого Вам нужно взаимодействовать с родственниками
старшего возраста, изучать историю Вашей семьи, историю своего рода. Изучайте древние культуры, цивилизации, миры, начните изучение любого изотерического направления.
`;
}
purposePanelItem.appendChild(paragraph);
break;
}
case 10: {
let paragraph=document.createElement('p');
if(parseInt(age.innerHTML) <=40){
paragraph.innerHTML=`(10) Личное предназначение (условно до 40 лет)
<br>Самое первое, что Вы должны сделать - это перестать напрягаться. Ведь когда Вы напрягаетесь, Ваша жизнь идёт либо совсем не в том направлении, либо вообще стоит на месте. Поэтому Вам нужно расслабиться и получать удовольствие, радоваться каждому прожитому дню, отпустить контроль, перестать волноваться. Но остерегайтесь уйти в пассивность и лень. Двигайтесь вперёд, но легко и с благодарностью за то, что уже имеется, живите в моменте здесь и сейчас, и верьте, что завтра будет ещё лучше, чем сегодня. Тогда Ваша жизнь будет складываться самым лучшим образом. Доверяйте Высшим Силам, они точно на Вашей стороне.
<br>Путешествуйте, творите, работайте, живите в радость, не усложняйте, не придумывайте проблем, будьте в мире с окружающими, плывите по реке жизни и она сама Вас будет нести только к хорошему. Научитесь прислушиваться к себе и своему сердцу, слышать себя и свои желания, идти туда, куда ведет Вас Ваша душа, а не туда, куда советуют окружающие.
`;
}
purposePanelItem.appendChild(paragraph);
break;
}
case 11: {
let paragraph=document.createElement('p');
if(parseInt(age.innerHTML) <=40){
paragraph.innerHTML=`(11) Личное предназначение (условно до 40 лет)
<br>Природа наградила Вас необычайной силой, и Ваша главная задача — научиться этой силой управлять и пользоваться на благо. Для этого Вам необходимо контролировать свою агрессию, грубость, бескомпромиссность; избавиться от желания осуждать, навязывать свои принципы и оказывать давление. Поверьте в свой внутренний потенциал, научитесь раскрывать свои творческие способности (да, они тоже у Вас есть), занимайтесь спортом, развивайте свои лидерские способности. Не предъявляйте к другим людям слишком завышенные требования, они не такие как Вы, они не одарены такой силой, какая есть у Вас, они не могут делать то, что делаете Вы. Важно это понять, принять и не обижаться на окружающих. Вы - вихрь, ураган, а временами торнадо, а они - лёгкий летний ветер. У вас разные темы жизни, энергии, кармические задачи, миссии и цели. Не пытайтесь привнести свою силу в чужую жизнь, не нарушайте личные границы, не спешите оказать помощь, если Вас о ней не просят.
`;
}
purposePanelItem.appendChild(paragraph);
break;
}
case 12: {
let paragraph=document.createElement('p');
if(parseInt(age.innerHTML) <=40){
paragraph.innerHTML=`(12) Личное предназначение (условно до 40 лет).
<br>Прежде всего Вам нужно полюбить себя и избавиться от излишней жертвенности. Не навязывайте свою заботу и внимание, не посвящайте абсолютно всё своё время близким людям, не забывайте о себе и своей жизни. Своё умение слушать и понимать других людей Вам необходимо использовать для помощи им. НО не погружайтесь полностью в чужие проблемы, не перекладывайте их на себя, не привязывайтесь чрезмерно к человеку, которому оказываете помощь, не помогайте в ущерб себе. Иначе Вас постигнет депрессия и апатия. Не бойтесь отказать или сказать нет. Умейте отпускать и начинать что-то новое. Учитесь и развивайтесь. Боритесь с негативным мышлением, не зависайте в старых эмоциях, ситуациях и обстоятельствах, смело идите вперёд.
`;
}
purposePanelItem.appendChild(paragraph);
break;
}
case 13: {
let paragraph=document.createElement('p');
if(parseInt(age.innerHTML) <=40){
paragraph.innerHTML=`(13) Личное предназначение (условно до 40 лет).
<br>В первую очередь Вам необходимо побороть свои страхи, в том числе страх смерти, избавиться от излишней резкости, жестокости и агрессии, стать более ответственными, научиться доводить начатое до конца.<br> Смотрите на себя нового, попрощайтесь с собой старым, помните, что всё равно или поздно уйдёт. Будьте готовы меняться после каждого испытания, они Вам и даны для внутренней трансформации. Важно не стоять на месте, двигаться вперёд, не зависать подолгу на чём-то одном, научиться переключаться. И самое главное, пробудить внутреннее желание перемен.<br> Делитесь своими интересными идеями и необычными взглядами на
жизнь с другими, не проходите мимо чужой беды, помогайте людям бескорыстно. Все время совершенствуйтесь и стремитесь к новым целям.
`;
}
purposePanelItem.appendChild(paragraph);
break;
}
case 14: {
let paragraph=document.createElement('p');
if(parseInt(age.innerHTML) <=40){
paragraph.innerHTML=`(14) Личное предназначение (условно до 40 лет).
<br>Вам нужно стремиться к гармонии в своей жизни и вносить гармонию в жизнь окружающих. Не менее важно выполнять взятые на себя обязательства, ценить то, что уже есть, и только тогда Вы получите больше. Ведите гармоничный и умеренный образ жизни, будьте сконцентрированы только на своей семье, станьте её опорой и центром, помогайте, вдохновляйте и заботьтесь о всех её членах. Станьте примирителем, миротворцем, посредником между людьми. Вам важно достичь внутреннего состояния гармонии, красоты и целостности, построить связь между умом и душой.
`;
}
purposePanelItem.appendChild(paragraph);
break;
}
case 15: {
let paragraph=document.createElement('p');
if(parseInt(age.innerHTML) <=40){
paragraph.innerHTML=`(15) Личное предназначение (условно до 40 лет).
<br>Старайтесь быть открытым и любящим, уважайте людей, стремитесь помочь, а не делать больно. Поддерживайте слабых и помогайте нуждающимся. Научите людей ценить земные радости, но не цепляться за материальное. Умейте прощать, избавьтесь от агрессии, проявляйте щедрость. Живите правильно, боритесь с соблазнами. Ведь от того, как вы проживете эту жизнь, будет зависеть следующая. Нельзя вступать в конфликты, быть зачинщиком конфликта, изменять, применять физическую силу, злоупотреблять алкоголем, обращаться за помощью к черным магам, иначе темная сторона может завладеть вами. Вы способны очень глубоко и тонко видеть суть вещей, людей на уровне интуиции. Уделите внимание духовному росту.
`;
}
purposePanelItem.appendChild(paragraph);
break;
}
case 16: {
let paragraph=document.createElement('p');
if(parseInt(age.innerHTML) <=40){
paragraph.innerHTML=`(16) Личное предназначение (условно до 40 лет).
<br>Вы преодолели все испытания и пришли к Богу в сердце. И Ваша главная миссия - помочь другим людям пройти такой же путь. Вы – проводник человечества в новый высоко духовный мир. Ваша цель - это духовное пробуждение людей. Улыбайтесь, будьте решительными, радуйтесь и учите этому других, и тогда они, как и вы, получат от Вселенной всё, что захотят. Научите людей жить иначе, отойти от всего старого, от всего того, что себя изжило. Научите открывать новые грани и горизонты в своей жизни. Нужно освободить жизнь для нового, перспективного и актуального. Вы - птица Феникс, возрождённая из пепла и начавшая жизнь с чистого листа. Покажите людям, что для них это тоже возможно.
`;
}
purposePanelItem.appendChild(paragraph);
break;
}
case 17: {
let paragraph=document.createElement('p');
if(parseInt(age.innerHTML) <=40){
paragraph.innerHTML=`(17) Личное предназначение (условно до 40 лет).
<br>Вы обязаны поверить в свои творческие способности, поверить в себя. Избавьтесь от медлительности и нерешительности. Усмирите свою гордыню. Ваша основная задача - развиваться творчески, развивать свои таланты, артистизм, работать над проявлением себя, над собой. Мир ждёт Ваши творческие произведения, даже если это лишь небольшое четверостишие. Начните с малого и так, шаг за шагом, вы встанете на путь создания классических произведений искусства. Если для Вас это кажется недостижимым, то придумайте, например, красивый дизайн дома. Главное, не забывать, что Вы должны проявиться творчески и явить своё творчество этому миру.
<br>Налаживайте и поддерживайте дружеские контакты, умейте любоваться красотой человека, как внешней так и внутренней. Как уже отмечалось, Ваша цель — найти и развить свой талант, но Вы также можете находить таланты в других людях и помогать раскрывать им эти таланты.
`;
}
purposePanelItem.appendChild(paragraph);
break;
}
case 18: {
let paragraph=document.createElement('p');
if(parseInt(age.innerHTML) <=40){
paragraph.innerHTML=`(18) Личное предназначение (условно до 40 лет).
<br>Вам очень важно бороться с своими страхами, потому что как и хорошее, Вы можете притянуть к себе и плохое, и все Ваши страхи станут явью. Визуализируйте позитивные моменты и события и они обязательно произойдут. Развивайте свою интуицию и креативные способности, пишите стихи, музыку или рисуйте. Живите настоящим, не цепляясь ни за прошлое, ни за будущее. Создавайте комфорт для других, чувствуйте чужие потребности, проявляйте заботу о своих близких, вовремя оказывая им помощь. Научитесь профессионально готовить, пройдите курсы по стилю, чтобы самостоятельно подбирать себе гардероб. Путешествуйте, ходите по выставкам и театрам.
`;
}
purposePanelItem.appendChild(paragraph);
break;
}
case 19: {
let paragraph=document.createElement('p');
if(parseInt(age.innerHTML) <=40){
paragraph.innerHTML=`(19) Личное предназначение (условно до 40 лет).
<br>Вам следует научиться следить за своими эмоциями и мыслями, так как они имеют мощный энергетический посыл в этот мир. Старайтесь избавиться от обид и других отрицательных эмоций. Боритесь с властностью и гордыней, агрессией и жестокостью. Не возвышайтесь над людьми. Не цепляйтесь за прошлое. Не ставьте перед собой корыстные цели. Станьте мудрым и справедливым лидером. Научитесь искренне наслаждаться жизнью. Верьте в себя и в свой успех и тогда Вас ждут блистательные победы в жизни. Но избегайте самодовольства и излишней самоуверенности. Несите людям хорошие вести и радость. Работайте с людьми на всеобщее благо. Согревайте окружающих теплотой своих чувств, помогайте им мудростью.
`;
}
purposePanelItem.appendChild(paragraph);
break;
}
case 20: {
let paragraph=document.createElement('p');
if(parseInt(age.innerHTML) <=40){
paragraph.innerHTML=`(20) Личное предназначение (условно до 40 лет).
<br>Для обретения счастья и умиротворения в этой жизни Вам необходимо раз и навсегда прекратить осуждение родителей и родственников в целом, Вам необходимо бороться с отрицательными эмоциями в их адрес - агрессией, раздражением и злостью; не пытаться изменить их, проработать различные страхи с психологом. Кроме того, вы должны помогать всем членам Вашей семьи обрести материальные и духовные блага, а так же выступать хранителем семейных традиций и ценностей. Собирая в своём доме родственников, становясь центром семьи, Вы восстанавливаете память о своём роде. Не забывайте об умерших, следите за их могилами. Вся Ваша жизнь подчинена жизни семьи. Вы связаны единой кармой со своими предками, а это значит, что Вам предстоит отработать карму своего рода. То есть основная Ваша задача - разобраться с кармическими проблемами своего рода и восстановить семейные связи. Как только Вы это сделаете, Ваша жизнь гармонизируется, а в профессиональной и личной сфере произойдут счастливые события.
`;
}
purposePanelItem.appendChild(paragraph);
break;
}
case 21: {
let paragraph=document.createElement('p');
if(parseInt(age.innerHTML) <=40){
paragraph.innerHTML=`(21) Личное предназначение (условно до 40 лет).
<br>Чтобы обрести гармонию с собой и этим миром, Вам прежде всего нужно выработать в себе такие качества как терпение, мягкость, снисходительность, терпимость, либеральность, нетребовательность. Будьте открыты всему новому и необычному, сами открывайте новое, новые пространства и возможности, умейте увидеть новые горизонты на Вашем пути. Боритесь с консервативностью, рутинностью, «заболоченностью», зашоренностью. Вам просто необходимо много путешествовать по миру, общаться с людьми разных стран и культур, быть всегда у всех на виду, в
центре внимания, стремиться объединять культуры, вкусы, взгляды и даже инновации разных стран, сплачивать народы. Станьте «гражданином мира». Вам предначертан переезд в другую страну или работа с иностранцами. Важно ощутить внутри себя желание расширения, глобализма и начать движение в эту сторону, воплощая эти желания в жизнь. Именно так укрепится Ваш внутренний стержень, обретётся внутренняя сила. Отпустите прошлое и откройтесь миру. Вся наша планета для Вас - родной дом, Вам везде будет комфортно и спокойно.`;
}
purposePanelItem.appendChild(paragraph);
break;
}
case 22: {
let paragraph=document.createElement('p');
if(parseInt(age.innerHTML) <=40){
paragraph.innerHTML=`(22) Личное предназначение (условно до 40 лет).
<br>Ваша главная задача - быть открытым для людей и мира, дружелюбным, отзывчивым, по-детски наивным человеком, надежным другом, опорой для своих близких. Вам необходимо гасить в себе негативные эмоции - беспокойство, агрессию, обиду,
злость, раздражение, гнев, страх. Пусть за Вашей спиной вырастут крылья и Вы почувствуете свободу, увидите безграничные просторы этого мира, красоту родного края, силу океанов и морей, спокойное величие гор. Как только Вы ощутить свободу каждой клеточкой своего тела, она начнёт питать, снимет ограничения и все запреты, освободит от зацепок за прошлое и Вы устремите свой взор в прекрасное и светлое будущее. Воспринимайте свою жизнь как дорогу, которую нужно пройти легко и весело, не сгибаясь перед сложностями и проблемами, не спуская со своего лица улыбу. Поймите, что перед Вами открыт весь мир, все пути, все океаны и континенты. Вы - путешественник, Вы - человек мира, Вы - человек Вселенной. Освободите свой разум, своё сознание и своё тело от всех ограничений. И будьте счастливы.
`;
}
purposePanelItem.appendChild(paragraph);
break;
}}
})
if(isPurposeTitleSecondOpened){
const text=document.createElement('p');
text.innerHTML='Предназначение (40-60 лет)';
text.style.fontWeight='700';
purposePanelItem.appendChild(text);
}
Array.from(uniqLP2).map((item)=> {
switch (item){
case 1: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(1) Оставить отпечаток собственной личности в этом мире – то, что вас мотивирует для участия в различных экспериментах. Данное предназначение посвящается целиком и полностью вам и вашему обустройству в социуме.
<br>Вы должны делиться заложенными в вас знаниями и потенциалом - в устной или письменной форме, стать учителем для широкого круга людей. Вы не можете избегать активного общения с людьми, ведь вы являетесь тем человеком, мнение которого является особо важным для других. Пренебрегать своими способностями не стоит, обычно люди с такой задачей очень часто боятся выходить на публику. С этим страхом неуверенности нужно работать и необходимо справляться с задачей.
<br>Вам необходимо проявлять лидерские качества, целеустремлённость, решительность, не бойтесь рисковать и вести за собой людей.`;
purposePanelItem.appendChild(paragraph);
break;
}
case 3: {
let paragraph=document.createElement('p');
if(gender==='М'){
paragraph.innerHTML=`(3) Вы способны показать людям пример настоящего мужчины - любящего, верного, отвечающего за свои слова и действия, заботливого. Кроме того, Вы можете нести знания психологии для женщин, нести женщинам красоту, привнести в этот мир гармонию, порядок и безопасность.`
}else{
paragraph.innerHTML=`(3) Вы рождены, чтобы нести в этот мир красоту, женственность, эстетику, свой стиль и элегантность. Обладая добротой и щедростью, Вы очень отзывчивы и оказываете помощь всем нуждающимся. Вы способны показать людям пример, как можно быть женственной, как научиться вдохновлять мужчин, как можно совмещать работу и
дом, как стать реализованной во всех сферах женщиной, можете нести знания психологии для женщин. Ваше предназначение и цель в жизни – созидание материального плана на Земле в любых сферах Мира Материи, чтобы жизнь стала
богаче и плодороднее во всех ее земных проявлениях, обеспечение людей достойным материальным достатком и уровнем жизни. Ваша задача – научить людей планеты любить Землю, любить земные блага, быть процветающим и успешным и с благодарностью относиться к Матушке Земле и ко всему тому, что она дает.`
}
purposePanelItem.appendChild(paragraph);
break;
}
case 4: {
let paragraph=document.createElement('p');
if(gender==='М'){
paragraph.innerHTML=`(4) Обладая врождёнными организаторскими способностями, Вы сможете упорядочить процессы в любом деле и стать прекрасным руководителем, политиком или военным. Вам открыты большие возможности, поэтому Вы должны показать миру пример настоящего мужчины, учить людей ответственности, решительности, умению принимать решения, находить выход из любой ситуации, не паникуя и не суетясь. Кроме того, Вы способны показать, как можно зарабатывать, строить бизнес.
`
}else{
paragraph.innerHTML=`(4) Вы способны и должны показать людям пример того, как можно и одновременно важно оставаться женственной и мягкой, оставаясь сильной по-женски. Так же Вы должны показать, как уметь вдохновлять мужчин, как можно совмещать работу и дом, как стать реализованной во всём женщиной. Вы можете учить людей зарабатывать и строить бизнес.
`
}
purposePanelItem.appendChild(paragraph);
break;
}
case 5: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(5) Природа наградила Вас талантом учительства, убеждения и красноречия. Поэтому Вы обязаны стать учителем для людей, учить их чему-то новому, обучать сотрудников или нести знания новым людям. В современном мире это не только как учитель в школе, это могут быть тренинги, мастер-классы, семинары, курсы, обучающие материалы,
правила, регламенты, онлайн или живое обучение. Кроме того, обладая такими качествами, как надёжность, ответвенность, любовь к порядку, Вы можете стать хорошими руководителями и управленцами.
`;
purposePanelItem.appendChild(paragraph);
break;
}
case 6: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(6) Вы способны урегулировать любые конфликты и сгладить острые углы. Вы цените искусство, красоту, обладаете утончённым вкусом, и Вы можете делиться этим с людьми. Вы несёте им красоту, учите людей выглядеть красиво, можете прекрасно организовывать мероприятия и праздники, помогать людям разобраться в своих личных отношения и с другими людьми. Таким образом, Вы можете стать прекрасным организатором праздников и любых других мероприятий, специалистом в сфере красоты или дизайна (модельер, визуализатор и др.), ведущим концертов, коучем по эмоциям, психологом.
`;
purposePanelItem.appendChild(paragraph);
break;
}
case 7: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(7) Вы - лидер и человек команды, вдохновляете и ведёте людей за собой. Вам нужно лишь задать вектор движения, а ваша команда немедленно приступит к выполнению задач. Но люди тянутся к Вам не только из-за того, что вы профессионал своего дела, но и надёжный друг, прекрасные собеседник и помощник во многих делах. Вы прекрасно реализуетесь в бизнесе, управлении, спорте, армии, правоохранительных органах, а так же во всём, что связано с перевозками, движением и транспортом.
`;
purposePanelItem.appendChild(paragraph);
break;
}
case 8: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(8) Изучая законы мироздания, Вы можете внести ясность в любую, даже самую сложную ситуацию. Сможете помочь, так как Вы всегда ориентированы на помощь и поддержку. При этом старайтесь не вмешиваться туда, где этого не требуется. Вы способны помогать людям понять причинно-следственную связь, почему с ними что-то происходит. Старайтесь донести до понимания людей истины кармического закона. Так же Вы можете учить людей смирению, принятию. Координировать, направлять людей. Быть примером справедливости, честности. Подавать пример закона юридического или законов вселенной, жизни. Вы станете прекрасным специалистом в структурах закона, порядка, власти.
`;
purposePanelItem.appendChild(paragraph);
break;
}
case 9: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(9) Вы можете стать отличным целителем души и тела, так как всегда отзывчивы к боли других людей, умеете слушать и слышать человека, мягко направляя по правильному пути. Для каждого Вы сумеете найти нужное слово и дать совет. Вы наделены целительными способностями от рождения, способны исцелять словом, поэтому используйте этот дар во благо людям. Делитесь знаниями и своим опытом с людьми. Вы способны помочь человеку понять, что нужно делать именно ему, чтобы достичь желаемых целей. Вы можете консультировать, обучать, проводить мастер-классы, семинары, тренинги, онлайн-обучение, быть блогерами, писать книги, лечить людей и др. Вы способны достичь успеха в абсолютно любой деятельности.
`;
purposePanelItem.appendChild(paragraph);
break;
}
case 10: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(10) Вы прекрасно работаете в коллективах и командах. Вас сложно назвать лидером, но Вы можете стать незаменимым помощником лидера, его правой рукой и опорой. Приходя работать на новое место, Вы приносите с собой свежую струю, легко находите общий язык с начальством, становитесь душой компании. Вы заряжаете людей оптимизмом, показываете им, какая жизнь легкая, интересная и чудесно-волшебная. Вы притягиваете к себе людей своей удачей и везением, и делитесь ими с ними. Можете дать совет и поддержать в трудной ситуации. Привносите в жизни людей новые краски, с Вашим приходом жизнь открывает для них новые двери. Вы помогать людям жить в свое удовольствие, легко, в потоке, учите загадывать желания, управлять силой мысли.
`;
purposePanelItem.appendChild(paragraph);
break;
}
case 11: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(11) Обладая неимоверной силой, Вы способны работать в несколько раз больше остальных, выполняя не только свои задачи, но и помогая другим выполнять свои.<br> У Вас выраженная энергия лидерства, Вы умеете брать на себя ответственность, а поэтому можете вести за собой людей, вдохновлять их, мотивировать, укреплять в них силу духа, физическую силу. Вы можете быть наставниками, тренерами, предпринимателями. Вы можете быть руководителем крупной компании, вести несколько сложных проектов одновременно, командовать войсками. Запомните, что вы должны вдохновлять, а не подавлять, использовать силу, а не насилие. Кроме того, у Вас есть потрясающая способность: Вы можете помогать другим раскрывать их потенциал, учить верить в себя и действовать, идти вперёд и достигать своих целей.
`;
purposePanelItem.appendChild(paragraph);
break;
}
case 12: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(12) Ваша задача принести больше добра, милосердия и сострадания в жизнь, а потому Вам необходимо заниматься благотворительностью, работать непосредственно с людьми, быть для них примером бескорыстия и отдачи. Ваши нестандартные взгляды учат и других видеть и воспринимать мир под другим углом. Являясь кладезем полезной информации, Вы обязаны делиться ей с окружающими. Вы всегда нацелены на взаимопомощь, и люди, чувствуя это, обращаются к Вам. Вы способны быть
наставниками или создавать креативные проекты типа продюсеры, режиссеры, любые работы, связанные с изобретениями, творчеством, креативом для людей. Вы можете стать прекрасным психологом, врачом, педагогом, сможете принести много блага, работая в социальных службах.
`;
purposePanelItem.appendChild(paragraph);
break;
}
case 13: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(13) Помогайте людям не стоять на одном месте, а двигаться вперёд. Помогайте им перестать заниматься неинтересным и скучным делом, а попробовать что-то новое и интересное. Покажите людям, как важно и нужно проявлять интерес к жизни. Научите людей отсекать старое и никогда к нему не возвращаться. Ваша миссия на Земле - помогать людям меняться, извлекать уроки из трудностей, отпускать старое, не цепляться за прошлое, смотреть без страха в будущее, идти в ногу со временем.
`;
purposePanelItem.appendChild(paragraph);
break;
}
case 14: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(14) С Вами интересно, ведь Вы - интеллектуал, начитанный и много знающий, Вы легко поддерживаете беседу. В общении с людьми Вы прежде всего хотите увидеть его душу и его суть, внутреннее для Вас главнее внешнего. Людям это нравится, они чувствуют это и тянутся к Вам. Вы искренне делитесь с ними своими знаниями и взглядами, а они отвечают Вам взаимностью, даря свою позитивную энергию. Людям с Вами хорошо и спокойно.
`;
purposePanelItem.appendChild(paragraph);
break;
}
case 15: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(15) Вы - проявитель человеческих несовершенств. Стоит Вам появиться в каком-то коллективе, так люди сразу начинают показывать весь свой негатив. Слабые лично боятся Вас, а сильные<br> уважают и берут с Вас пример. Вам важно осознать и принять способность проявлять в других их сущность, научиться управлять этой силой, и тогда Вы сможете показать людям путь к свету и добру. Видя «темноту» в душе другого, Вы протягиваете руку помощи и вселяете надежду на перемены.
`;
purposePanelItem.appendChild(paragraph);
break;
}
case 16: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(16) Разрушать старые представления и взгляды - это и Ваша способность от природы и Ваша обязанность. Вы дадите людям новое видение и понимание, а это поможет начать им новую более осознанную и духовную жизнь. Вы покажите им отрицательное воздействие земных зацепок, привязок и зависимостей. Вы превносите в жизнь окружающих большие перемены и помогаете человеку начать новый путь. Обладая добрым сердцем и желанием помочь, Вы показываете людям выход к свету и пробуждению, помогаете бороться с их негативными качествами и проявлениями.
`;
purposePanelItem.appendChild(paragraph);
break;
}
case 17: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(17) Обладая ярко-выраженной индивидуальностью, Вы не можете остаться незамеченными. С Вами интересно общаться, Вы притягиваете к себе людей, позитивно на них влияя. Вы можете помочь людям раскрыть их таланты, стать известными, быть для них путеводной звездой. Вы можете исцелить и стать духовным наставником. Можете отдать последнее тем, кто нуждается.
`;
purposePanelItem.appendChild(paragraph);
break;
}
case 18: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(18) В Ваши обязанности входит помогать людям, используя свой творческий талант, раскрыв свои магические способности. Исцеляйте людей, несите свет и добро. Вы способны помочь людям избавиться от их темных, негативных проявлений и зависимостей.
`;
purposePanelItem.appendChild(paragraph);
break;
}
case 19: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(19) Обладая ярким внутренним светом, Вы пришли в этот мир отдавать людям свои творческие способности и энергию. Вы, как Солнце, светите абсолютно всем, собираю вокруг своего света множество людей. У Вас глобальные задачи по распространению среди людей знаний, добра, света, тепла. Вы должны помогать людям развиваться, нести им материальное процветание, вдохновлять их, мотивировать, просвещать, помогать увидеть свою силу и потенциал. Из Вас выйдет отличный организатор, общественник, справедливый и заботливый руководитель. Вы сможете занять высочайшие общественные должности, стать кумиром для многих. Вашей масштабной миссией является нести развитие и рост всей планете.
`;
purposePanelItem.appendChild(paragraph);
break;
}
case 20: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(20) Являясь прирождённым новатором, Вы стремитесь к развитию и совершенствованию окружающего мира, к избавлению людей от всего устаревшего и ненужного, желая заменить это на новое и неординарное. Вы - прирождённый миротворец, видящий людей насквозь и предугадывающий их поступки, а поэтому Вы способны примирить даже самых заклятых врагов. Обладая целительскими и экстрасенсорными способностями, Вы можете исцелять, лечить, помогать людям прорабатывать
карму рода, родовые задачи, сценарии. Из Вас выйдет прекрасный медиум, врач, криминалист, археолог.
`;
purposePanelItem.appendChild(paragraph);
break;
}
case 21: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(21) Вы способны урегулировать любые конфликты между людьми, пользуйтесь этой способностью, неся мир и спокойствие людям. Вы способны принести им и много иного блага. Сосредоточась на благих делах, Вы сможете повести этих людей за собой, помогая им расширяться и масштабироваться. Вы способны заниматься духовными практиками, нести людям духовное пробуждение и исцеление. Можете помогать другим переезжать в другие города, страны либо путешествовать. Кроме того, Вам суждено быть участником глобальных проектов, помогая экологии и исцелению всей планеты.
`;
purposePanelItem.appendChild(paragraph);
break;
}
case 22: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(22) В Вас есть способность показывать людям, опираясь на свой пример, новые пути и дороги. Учить их не цепляться за материальное, а заботиться больше о своём духовном наполнении. Будьте весёлым и радостным, и делитесь этим весельем и радостью с близкими. Ваше отзывчивое сердце и открытая душа исцелят любые души. Помогайте людям выйти за границы и рамки, придуманные ими самими. Покажите им этот мир, свободу, покажите им себя в этом мире. Но при этом не забывайте, что Вы живёте в социуме и должны уважать и вписываться в определённые правила и порядки. Вы сможете прекрасно реализовать себя в туризме, творчестве, целительстве, искусстве, журналистике. Кроме того, Вы в состоянии помочь людям стать более осознанными, просветленными,
духовно пробудиться. Сможете научить, как жить в удовольствие, в путешествиях, быть свободными. Вы сами свободны и счастливы и учите этому других.
`;
purposePanelItem.appendChild(paragraph);
break;
}}
})
if(isPurposeTitleThirdOpened){
const text=document.createElement('p');
text.innerHTML='Предназначение (общие)';
text.style.fontWeight='700';
purposePanelItem.appendChild(text);
}
Array.from(uniqLP3).map((item)=> {
switch (item){
case 1: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(1) Вам необходимо понять и поверить, что Вселенная наделила вас при рождении, даром  мощной материализации. Вы можете творить реальность силой мысли. Поэтому необходимо выработать в себе позитивное мышление и принятие себя. Научиться мыслить шире, перестать сомневаться. Верить в чудеса в жизни. Где бы ни оказались, и чтобы ни делали, помнить о своей чудотворной звезде!
<br>Когда вы идете во что-то новое, происходит как бы, подсоединение к самому каналу Божественного. И ведут вас очень сильно. Главное сделать шаг – и тогда подключится энергия потока. Не сопротивляйтесь.
<br>Научитесь практикам медитаций, молитв и ритуалов.  Кундалини йога и/или рейки вам поможет найти гармонию и перенаправить энергию в благое русло. Слушайте свое сердце и интуицию, они обязательно вас направят на истинный путь. Следите и ухаживайте за своим физическим телом, ведь оно выступает в роли храма для вашей души. Только лишь светлый и просторный храм способен созидать волшебство. Перестаньте сомневаться в том, что чудеса существуют. Только тогда вы увидите всю картину своей жизни. Не бойтесь, у вас в жизни все произойдет вовремя и правильно. `;
purposePanelItem.appendChild(paragraph);
break;
}
case 3: {
let paragraph=document.createElement('p');
if(gender==='М'){
paragraph.innerHTML=`(3) Вам следует стремиться обладать всеми благами, но при этом как и женщине сходной энергетики не нужно держаться за материальное. Вам нужно стараться жить легко, не цепляясь за прошлое, давая близким людям свободу и право выбора, но при этом выступать гарантом их счастливого будущего. Делая мир вокруг себя лучше, возможно изменить к лучшему всю Вселенную.
`
}else{
paragraph.innerHTML=`(3) Вам необходимо стремиться быть шикарной, успешной, процветающей во всех аспектах жизни. Не забывать, что возможно достичь всего, что только пожелаете. При этом не держаться за материальное. Стараться жить легко, умея отпускать лишние заботы и переживания. Обладая большим и любящим сердцем, Вам легко окружить светом своих близких, даря им заботу, тепло и уверенность в будущем. Создавая вокруг себя красоту и комфорт, Вы способны менять этот мир и жизни людей к лучшему.
`
}
purposePanelItem.appendChild(paragraph);
break;
}
case 4: {
let paragraph=document.createElement('p');
if(gender==='М'){
paragraph.innerHTML=`(4) Ваш внутренний огонь не должен причинить кому-то вред, а должен наоборот согревать и защищать. Обладая большим сердцем, дарите заботу и любовь людям, которые Вас окружают, помогайте людям, которым нужна помощь. Можно и нужно участвовать в благотворительности. Необходимо уважать людей и принимать их такими, какие они есть. Ваша миссия на Земле - нести власть с миром, управлять с позиции справедливости, отказавшись от гнева и иного негатива. Власть, данная от Бога, должна быть использована во имя добра.
`
}else{
paragraph.innerHTML=`(4) Ваши лидерские качества Вы должны реализовывать в карьере, а в семье оставаться просто хорошей хозяйкой, любящей женой и заботливой мамой. Вы должны всегда оставаться Женщиной, успешной, хорошо зарабатывающей, щедрой,
женственной, заботящейся о близких и подчиненных, имеющей покровительство мужчины. Вам никогда не стоит хвататься за мужские дела, за них отвечает мужчина. Вы - Женщина, и этим всё сказано.
`
}
purposePanelItem.appendChild(paragraph);
break;
}
case 5: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(5) Вам важно передавать всё то, что Вы знаете. Будет лучше, если Вы будете делать это безвозмездно. Являетесь авторитетом для окружающих. Не бойтесь менять свои взгляды и расширять своё сознание, что бы идти в ногу со временем. Вы умны и рассудительны, поэтому всегда взвешиваете за и против, а уж потом принимаете решение.
`;
purposePanelItem.appendChild(paragraph);
break;
}
case 6: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(6) Вам дано с рождения ощущение красоты и праздника жизни, а ведь именно в радости и свете рождается любовь ко всему вокруг. Вы способны научить людей любить весь этот мир. Ощущая праздник внутри себя, делитесь им с окружающими, делитесь радостью, лёгкостью, счастьем, красотой, любовью, смейтесь, шутите, дурачьтесь. Стремитесь создавать лучшее, но не стремитесь к идеальному, ведь идеального нет. Вы любите этот мир, но не забывайте любить и себя в этом мире.
`;
purposePanelItem.appendChild(paragraph);
break;
}
case 7: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(7) Вам дана энергия воина и победителя, Вы способны вести за собой людей. И очень важно подумать, что полезного Вы можете сделать для этих людей, чем Вы можете их вдохновить. Будьте для них примером для подражания, рассказывайте им о своих достижениях и следующих целях, делитесь своим опытом. Делитесь добром и Вы соберёте вокруг себя близких по духу людей, удача которых присоединится к Вашей и приумножит её. А если Вы научитесь медитировать, то к Вам обязательно придут интереснейшие идеи и видения, а ваша судьба приобретёт ещё более глубокий смысл.
`;
purposePanelItem.appendChild(paragraph);
break;
}
case 8: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(8) Вам от природы дана глубинная связь с кармическим законом Вселенной, причинно-следственным законом, именно поэтому именно Вы можете распознать истинную причину возникновения тех или иных событий в Вашей жизни и жизни других людей. Вам необходимо глубже изучать причинно-следственный закон бытия, закон мироздания. Вам необходимо развивать способности интуитивного видения и знания, заниматься медитациями. Будьте всегда открыты новым знаниям, учитесь и развивайтесь и перед Вами откроются безграничные возможности познания истины, способность исцеления любых событий и ситуаций. Ваша задача - это понимание божественных законов, равновесие, гармония, стабильность, баланс. Главная задача прийти к смирению – это критично важно, если этого не сделать, то судьба просто будет погружена в вечную борьбу непонятно за чьи права, нужно не нужно, сразу даже этого не разобрать, так можно увлечься процессом, где поделится все на друзей и врагов, завернут такие события, которые затем обернутся против.
`;
purposePanelItem.appendChild(paragraph);
break;
}
case 9: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(9) Вы всю жизнь будете познавать самого себя, изучать бездонные глубины своей личности, накапливать знания и мудрость, а затем делиться всем этим с людьми. Будет очень плохо, если Вы будете накапливать знания в себе, не отдавая при этом их людям. Ваша главная цель - понять главный смысл устройства Вселенной. Не забывайте каждый день побыть наедине с собой, возможно, на природе, это поможет Вам восстановить энергию и эмоциональное равновесие.
`;
purposePanelItem.appendChild(paragraph);
break;
}
case 10: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(10) Самое главное для Вас - это научиться видеть знаки на своём пути, ведь Вселенная их посылает Вам постоянно. Вам лишь следует больше ей доверять, постоянно держать связь с небесными покровителями и ангелами-хранителями через медитации и молитвы. Не распыляйтесь на многое, выберете что-то одно и развивайтесь в этом направлении. Работайте над своей духовной грамотность, но не забывайте и про физическое тело, ведите здоровый образ жизни. Для Вас важна дисциплина. Верьте в свои возможности. Учитесь чувствовать и вписываться в энергию потока, а поток может быть разный - поток вдохновения, поток радости, поток любви, поток света. И Ваша жизнь всем этим согрета.
`;
purposePanelItem.appendChild(paragraph);
break;
}
case 11: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(11) Вам дана необычайная духовная и физическая сила, которые должны быть направлены на совершение добрых дел. Научитесь управлять своей силой и направлять её в нужное русло, во благо людей. Обладая способностью вести за собой людей, станьте для них примером, передавая свой положительный жизненный опыт. И люди, глядя на Вас, будут стремиться изменить свою жизнь к лучшему. Не навязывайте свою силу и свой опыт, только через личный пример действуйте на окружающих. Не требуйте от людей много, дайте им дорасти до Вас. Ваша внутренняя сила растёт в состоянии лёгкости. Не нагнетайте, не усложняйте, не создавайте себе проблем, двигайтесь вперёд легко и просто. Не забывайте о себе, не забывайте остановиться и отдохнуть. Тогда к Вам придёт ещё больше силы.
`;
purposePanelItem.appendChild(paragraph);
break;
}
case 12: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(12) Ваше большое и отзывчивое сердце и добрая душа готовы согреть теплом и помочь окружающим. Вам нужно бескорыстно делиться любовью, заботой и вниманием с людьми. Всё мистическое и загадочное притягивает Вас, и не старайтесь избавиться от этого, а развивайте это в себе, посещая тренинги по духовному развитию. А затем несите людям новые видения и знания об этом мире. Ваша главная миссия - это миссия служения, служения людям, миру, Вселенной, Богу. Вы - проводник между Божественной Вселенной и людьми, между волей Бога и людьми. Любите, служите, помогайте, делитесь и мир откроется перед Вами самым интересным образом.
`;
purposePanelItem.appendChild(paragraph);
break;
}
case 13: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(13) Вы - ветер перемен, несущий эти перемены туда, где, казалось, уже невозможно что-то изменить. Двигайтесь вперёд и показывайте своим примером открытость всему новому.
`;
purposePanelItem.appendChild(paragraph);
break;
}
case 14: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(14) Раскрывая свои творческие способности и приобщаясь к прекрасному, стремитесь показать красоту жизни другим людям. Своей энергией Вы способны исцелить и пробудить человеческую душу. Но Вы способны исцелить не только душу, но и тело - ведь Вам от рождения дана целительная сила. Вы способны в простых вещах увидеть прекрасное, и поделитесь этим прекрасным с другими, покажите то, что увидели Вы. Вы тонко чувствуете этот мир, у вас богатая душа, делитесь этим богатством с миром.
`;
purposePanelItem.appendChild(paragraph);
break;
}
case 15: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(15) Обладая способностью видеть все человеческие слабости, Вы, сами не осознавая, провоцируете человека проявить все его негативные черты, чтобы он сам их увидел и осознал. Вы призваны искушать человека и проверять его на прочность, но делаете это из благих побуждений, чтобы человек, увидя свои слабые стороны, проработал их и духовно вырос. Вы, своими действиями, меняете людей в лучшую сторону.
Вы наделены сильным телом и духом, ведь Вам дано на себе испытать всю силу негативных разрушительных ситуаций, справиться с ними и передать свой опыт другим людям.
`;
purposePanelItem.appendChild(paragraph);
break;
}
case 16: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(16) Начните с себя и Вы станете примером для многих - пробудитесь духовно и Вы запустите духовное пробуждение других людей, а ведь именно это и является Вашей миссией на Земле. Занимайтесь духовной работой, медитируйте на исцеление планеты и людей, живущих на ней. Очищайте не только мысли, но и тело. Живите осознанно, в согласии со своей душой, не привязывайтесь к материальному.
`;
purposePanelItem.appendChild(paragraph);
break;
}
case 17: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(17) Вы рождены под счастливой звездой, у вас очень яркие способности и таланты. И Вы просто обязаны раскрыть их для людей, став известным человеком, чтобы как можно
больше людей могли познакомиться с Вашим творчеством. Ваша большая и добрая душа способна к энергетическому исцелению людей. Будьте проводником Божественных энергий, развивайтесь духовно и несите людям духовное просвещение и исцеление.
`;
purposePanelItem.appendChild(paragraph);
break;
}
case 18: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(18) Мистичны и притягательны, загадочны и энергетически сильны, глубина Вашей души завораживает, Ваши мысли материализуются - Вы пришли в этот мир создать новую реальность для себя и окружающих Вас людей, притягивая в свою жизнь всё то, о чём думаете. Не забывайте благодарить Вселенную за это. Ваша магическая сила должна идти исключительно на благо. Вы должны раскрыть свои творческие, целительские и экстрасенсорные способности. Делитесь ими и своими знаниями с другими людьми.
<br>`;
purposePanelItem.appendChild(paragraph);
break;
}
case 19: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(19) Обладая мощнейшим потенциалом свечения, научитесь светить людям, не обжигая их. Вы аккумулируете энергию и делитесь ей со множеством людей. Вы - Солнце. Вас ждут, вы руководите всеми процессами в этом мире, вы нужны всем без исключения живым существам на Земле. Делитесь своим светом, теплом и энергией. Направьте всю свою кипучую деятельность на развитие людей и помощь им, направляя на благотворительность часть своих доходов.
`;
purposePanelItem.appendChild(paragraph);
break;
}
case 20: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(20) Вы - ясновидящий, яснослышащий, целитель. Умеете подключаться к информационному полю земли и черпать оттуда нужные сведения. Вы - мостик между миром мёртвых и высшими небесными сферами. Вам необходимо прийти к позитивному мышлению, так как Ваши мысли материализуются очень быстро. Небо слышит Вас! Ангелы с ними рядом и Вы способны стать проводником Бога. Кроме того у Вас назначение - представлять людям новые знания, соответствующие современному миру.
`;
purposePanelItem.appendChild(paragraph);
break;
}
case 21: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(21) Вы наделены сильной связью со всей Вселенной, со всеми людьми планеты Земля. Вы глубоко чувствуете, наделены экстрасенсорными способностями и можете исцелять энергией Вселенной.<br> Ваше большое сердце бьётся на благо многих людей. Вы можете объединить весь мир, все религии, все культуры и народы. Старайтесь донести до большего числа людей, что мы все - братья и сестры, а наша планета для всех нас - наш дом, который мы должны беречь для наших потомков и делать всё возможное для его процветания. Если 21 числа каждого месяца в 21 час 21 минуту вы будете медитировать на исцеление планеты и живущих на ней людей, то непременно вы сможете повлиять на существование Земли и нашей цивилизации в лучшую сторону.
`;
purposePanelItem.appendChild(paragraph);
break;
}
case 22: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(22) В Вас скрыты прекрасные творческие способности, и для Вас очень важно выпустить их наружу, не пряча, не заглушая их, не стараясь от них избавиться. Творческое самовыражение подарит Вам дополнительную энергию и счастью. Изучайте этот мир, его историю, географию, языки, страны, путешествуйте. Всё это - Ваше предназначение. Вам дана свобода от любых догм и ограничений, вся Ваша жизнь - это большое путешествие.<br> Имея всё, Вы не привязаны ни к чему. Продолжайте в том же духе, живите духовным, не привязывайтесь к вещам, познавайте мир, расширяйте своё сознание, и тогда вы сможете узнать все тайны Вселенной, прийти к просветлению, стать свободными внутренне и внешне.
`;
purposePanelItem.appendChild(paragraph);
break;
}}
})
}
let LP2=calculation(E+G+H+F);
purposePanelContentCreate([LP1], [LP2], [LP3]);
const testsPanelItem=document.querySelector('#tests_panel');
function testsPanelContentCreate(item){
switch (item){
case 1: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(1) Жизнь постоянно будет ставить Вас перед выбором:
<br>— Надавить на других людей или уступить;
<br>— Поверить в себя, начать действовать или сидеть со своими идеями, сложа руки, в гордом одиночестве;
<br>— Осознать свои магические способности, научиться управлять ими или сделать вид, что их нет;
<br>— Направить свои магические способности на созидание или же на разрушение;
<br>— Работать в команде или в одиночку
Что вы выбираете — быть в «плюсе» или в «минусе»?`;
testsPanelItem.appendChild(paragraph);
break;
}
case 2: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(2) Жизнь постоянно будет ставить Вас перед выбором:
<br>— Сказать правду или соврать (даже, если вам кажется, что это во благо);
<br>— Честно проанализировать свою жизнь и что-то поменять в ней или спрятаться за отговорку: у меня и так
все хорошо;
<br>— Объединять, мирить людей или сплетничать за спиной;
<br>— Открыто заявлять о своих чувствах, проявляя честность, или избегать конфликтов, при этом обижаясь на
весь мир, на людей;
<br>— Отказаться от участия в «закулисных интригах» или стать их непосредственным участником и
подстрекателем;
<br>— Быть решительным, научиться брать ответственность на себя или тянуть с выбором, избегая высказывать
свое мнение.
Что вы выбираете — быть в «плюсе» или в «минусе»?`;
testsPanelItem.appendChild(paragraph);
break;
}
case 3: {
let paragraph=document.createElement('p');
if(gender==='М'){
paragraph.innerHTML=`(3) Жизнь постоянно будет ставить вас перед выбором:
<br>— Жить волком-одиночкой (или меняя партнерш как перчатки) или приложить максимум усилий для
построения гармоничных отношений с одной женщиной;
<br>— Проявить решительность, взять ответственность на себя или же быть «под каблуком» у женщины,
отдать ей полномочия в решении тех или иных задач;
<br>— Подружиться с женщинами всего мира или же воевать с ними, обвинять, сердиться, злиться,
агрессировать на них;
<br>— Проявлять щедрость или скупость;
<br>— Быть спокойным, уравновешенным и стойким или истеричным, эмоциональным, вспыльчивым.
Что вы выбираете — быть в «плюсе» или в «минусе»?`
}else{
paragraph.innerHTML=`(3) Жизнь постоянно будет ставить вас перед выбором:
<br>— Делегировать полномочия или все делать самой;
<br>— Положиться на других или все контролировать;
<br>— Мудро и с открытым сердцем руководить или упиваться своей властью, унижая и подавляя
подчиненных;
<br>— Быть жесткой, категоричной или мягкой, гибкой и покладистой;
<br>— Строить карьеру или семью (в идеале, совместить и социальную реализацию, и семейную жизнь)`
}
testsPanelItem.appendChild(paragraph);
break;
}
case 4: {
let paragraph=document.createElement('p');
if(gender==='М'){
paragraph.innerHTML=`(4) Жизнь постоянно будет ставить их перед выбором:
<br>— Проявить гибкость, прислушаться к мнению других или навязать свое;
<br>— Быть мудрым, понимающим своих подчиненных руководителем или жестким, авторитарным,
деспотичным;
<br>— Давать свободу выбора своей жене и детям или силой добиваться выполнения своих указаний;
<br>— Брать ответственность на себя, решать сложные жизненные задачи или избегать трудностей, пуская все
на самотек;
<br>— Научиться зарабатывать деньги, развивая предпринимательскую жилку, или оставаться в тени, в плену
своих ограничивающих установок и убеждений;
<br>— Жить в балансе материального и духовного или быть зацикленным только на деньгах и земных благах.
Что вы выбираете — быть в «плюсе» или в «минусе»?`
}else{
paragraph.innerHTML=`(4) Жизнь постоянно будет ставить перед выбором:
<br>— Быть снисходительной к своему мужчине, давать ему право на ошибку или постоянно указывать на его недостатки;
<br>— Хорошо думать и отзываться о мужчинах или критиковать сильную половину человечества, ругая на чем свет стоит;
<br>— Простить отца, своих партнеров, мужа или копить обиды годами;
<br>— Быть жесткой, категоричной или принимающей, мягкой и покладистой;
<br>— Строить гармоничные отношения с мужчиной или жить согласно философии «мне и одной хорошо»;
<br>— Научиться доверять мужчинам или постоянно все контролировать, перепроверять и делать по-своему,
думая, что «я знаю, как лучше».`
}
testsPanelItem.appendChild(paragraph);
break;
}
case 5: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(5) Жизнь постоянно будет ставить перед выбором:
<br>— Учиться чему-то новому или же цепляться за старое, думая, что вы и так уже все знаете;
<br>— Жить своей жизнью или проблемами своей семьи;
<br>— Быть гибким или навязывать свое единственно правильное мнение;
<br>— Отдавать знания другим или бояться конкуренции;
<br>— Обучать людей или думать, что вы до сих пор недостаточно хороши;
<br>— Выходить за свои рамки или быть рабом своих ограничивающих убеждений;
<br>— Общаться со всеми на равных или идти на поводу у своей «духовной» гордыни;
<br>— Учить или поучать.
<br>— Учиться быть самостоятельным или постоянно надеяться на то, что мама и папа решат все проблемы;
<br>Что вы выбираете — быть в «плюсе» или в «минусе»?`;
testsPanelItem.appendChild(paragraph);
break;
}
case 6: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(6) Жизнь постоянно будет ставить Вас перед выбором:
<br>— Идти за своим сердцем, не слушая никого, или постоянно думать: «Что обо мне скажут другие люди?»
<br>— Отпустить старые отношения или вязнуть в них, все больше накапливая обиды и претензии;
<br>— Принять и полюбить себя таким, какой ты есть, или постоянно придираться к себе, быть критичным,
«клевать» себя за каждый промах;
<br>— Давать людям право на ошибку, принять их с «плюсами» и «минусами» или постоянно идеализировать
и разочаровываться в них;
<br>— Видеть внутреннюю красоту человека, его глубину или оценивать только по одежке;
<br>— Впустить любовь в свою жизнь, отдаться ей полностью или не доверять партнеру, всячески избегать
полноценного проживания чувств.
<br>Что вы выбираете — быть в «плюсе» или в «минусе»?`;
testsPanelItem.appendChild(paragraph);
break;
}
case 7: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(7) Жизнь постоянно будет ставить перед выбором:
<br>— Идти вперед к достижению своих целей или отказываться от них;
<br>— Двигаться легко или с напряжением, в состоянии войны;
<br>— Думать, что «весь мир поддерживает меня» или «вся жизнь — борьба»;
<br>— Проявить лояльность и терпимость или надавить на окружающих ;
<br>— Понять сакральный смысл дуальности мира или продолжать ожесточенно делить его на «черное» и «белое»;
<br>— Простить себя или продолжать бороться с самим собой;
<br>— Учиться радоваться полученным результатам или постоянно испытывать недовольство, что «еще так мало
сделано»;
<br>— Быть «женщиной-амазонкой» или просто Женщиной.
<br>Что вы выбираете — быть в «плюсе» или в «минусе»?`;
testsPanelItem.appendChild(paragraph);
break;
}
case 8: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(8) Жизнь постоянно будет ставить Вас перед выбором:
<br>— Отказаться от борьбы за справедливость или постоянно в нее ввязываться;
<br>— Прислушиваться к мнению других или проявлять категоричность;
<br>— Изучить законы причины и следствия или же продолжать быть уверенным, что «мир несправедлив»;
<br>— Пребывать в гармонии и балансе или быть марионеткой в руках обстоятельств, поддаваясь внешним
провокациям;
<br>— Быть надежным даже в мелочах или делать поблажки себе, при этом выдвигая высокие требования к другим.
<br>Что вы выбираете — быть в «плюсе» или в «минусе»?`;
testsPanelItem.appendChild(paragraph);
break;
}
case 9: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(9) Жизнь постоянно будет ставить перед выбором:
<br>— Верить в себя или сомневаться в своих знаниях и умениях;
<br>— Быть открытым или замкнутым;
<br>— Впустить любовь/дружбу в свою жизнь или закрываться от отношений;
<br>— Любить себя и баловать или постоянно экономить на себе, довольствуясь малым;
<br>— Общаться с людьми на равных или испытывать раздражение по поводу их «недалекости» и ограниченности;
<br>— Получать удовольствие от секса или считать интимные отношения «грязными»;
<br>— Доверять людям или быть подозрительным;
<br>— Развивать свою чувственность или быть холодным, неприступным;
<br>— Выражать свои эмоции и чувства или все копить в себе;
<br>— Отдавать миру свои знания или же «консервировать» все таланты.
<br>Что вы выбираете — быть в «плюсе» или в «минусе»?`;
testsPanelItem.appendChild(paragraph);
break;
}
case 10: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(10) Жизнь постоянно будет ставить перед выбором:
<br>— К чему-то стремиться или «лежать калачиком» на диване;
<br>— Пребывать в состоянии спокойствия и доверия к Вселенной или напрягаться, нервничать, переживать;
<br>— Отпустить все на волю Бога, плыть в потоке жизни или бороться с обстоятельствами;
<br>— Получать удовольствие, замечая позитивные моменты, или сетовать на нехватку чего-либо, фокусируя свое
внимание на негативе;
<br>— Реализовывать свои собственные цели или быть пешкой в чужой игре;
<br>— Быть в постоянном движении или поддаться лени и инертности.
<br>Что вы выбираете — быть в «плюсе» или в «минусе»?`;
testsPanelItem.appendChild(paragraph);
break;
}
case 11: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(11) Жизнь постоянно будет ставить перед выбором:
<br>— Нарабатывать мягкость и гибкость или подавлять, приказывать, требовать;
<br>— Равноценно распределять силы между работой и отдыхом или работать на износ, без выходных и отпусков;
<br>— Разговаривать корректно и вежливо или грубо, с претензиями и «наездом»;
<br>— Относиться ко всему спокойно или проявлять нетерпение, изводить себя и окружающих;
<br>— Видеть в других силу и потенциал или унижать их, подчеркивать их никчёмность;
<br>— Направить всю свою энергию в созидательную и полезную деятельность или в разрушительную.
<br>Что вы выбираете — быть в «плюсе» или в «минусе»?`;
testsPanelItem.appendChild(paragraph);
break;
}
case 12: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(12) Жизнь постоянно будет ставить перед выбором:
<br>— Бескорыстно творить добро и забывать об этом или же, помогая другим, постоянно ждать благодарности и
огорчаться, не получая ее;
<br>— Пребывать постоянно в движении или «зависать» в бездействии, жить в полусонном состоянии;
<br>— Сказать другим «нет», когда это уместно и необходимо, или жертвовать собой в угоду другим;
<br>— Быть гибким по отношению к другим или же агрессивным, делая окружающих жертвами;
<br>— Смело заявлять о стоимости своей работы или же трудиться за копейки/бесплатно;
<br>— Отпустить все обиды или копить их в душе годами;
<br>— Любить себя или не любить.
<br>Что вы выбираете — быть в «плюсе» или в «минусе»?`;
testsPanelItem.appendChild(paragraph);
break;
}
case 13: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(13) Жизнь постоянно будет ставить перед выбором:
<br>— Быть корректным в разговоре или резким, агрессивным, прямолинейным;
<br>— Ценить жизнь или пренебрегать ею, рисковать;
<br>— Быть решительным или долго думать перед тем, как что-то изменить;
<br>— Бесстрашно идти навстречу переменам или избегать их;
<br>— Нарабатывать состояние спокойствия или постоянно суетиться;
<br>— Понять философию жизни и смерти, отпустить умерших или продолжать горевать об их уходе;
<br>— Легко завершать одни жизненные циклы и начинать другие или же бояться выйти из зоны комфорта.
<br>Что вы выбираете — быть в «плюсе» или в «минусе»?`;
testsPanelItem.appendChild(paragraph);
break;
}
case 14: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(14) Жизнь постоянно будет ставить перед выбором:
<br>— Слушать свою душу или поддаваться мнению, влиянию окружающих;
<br>— Развивать в себе творческий потенциал или отказаться от него;
<br>— Вести здоровый образ жизни или поддаться искушениямзависимостям;
<br>— Видеть искру Божью в каждом человеке, его душу или придавать значение только внешним атрибутам —
деньгам, статусу, внешности;
<br>— Заниматься любимым делом, тем, что душа желает, или быть там, где более престижно, солидно, больше
платят;
<br>— Нарабатывать в себе мягкость, душевность, нежность или проявлять грубость, черствость, эгоизм;
<br>— Верить в Бога, Ангелов, Вселенную, законы мироздания или стать материалистом, атеистом.
<br>Что вы выбираете — быть в «плюсе» или в «минусе»?`;
testsPanelItem.appendChild(paragraph);
break;
}
case 15: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(15) Жизнь постоянно будет ставить перед выбором:
<br>— Проявить терпение или «надавить», нахамить, накричать;
<br>— Помогать другим или думать только о себе;
<br>— Спокойно принимать свои успехи или хвастаться достижениями;
<br>— Простить или обидеться;
<br>— Доверять партнеру или ревновать;
<br>— Прислушиваться к мнению других или навязывать свое видение;
<br>— Освободиться от зависимостей или поддаться искушениям, оправдывая свои слабости;
<br>— Относиться к людям, как к равным, или думать, что вы лучше других;
<br>— Легко принимать и отдавать деньги или постоянно копить, экономить;
<br>— Быть спокойным или агрессивным;
<br>— Быть гибким или категоричным;
<br>— Быть сострадательным и чутким к чужим проблемам или эгоистичным.
<br>Что вы выбираете — быть в «плюсе» или в «минусе»?`;
testsPanelItem.appendChild(paragraph);
break;
}
case 16: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(16) Жизнь постоянно будет ставить перед выбором:
<br>— Простить людей или обозлиться;
<br>— Стать сильнее духом через испытания или сломаться;
<br>— Видеть за ситуациями возможность для личностного роста и духовного пробуждения или же сетовать на
судьбу-злодейку;
<br>— Развивать в себе оптимизм или поддаваться пессимизму.
<br>Что вы выбираете — быть в «плюсе» или в «минусе»?`;
testsPanelItem.appendChild(paragraph);
break;
}
case 17: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(17) Жизнь постоянно будет ставить перед выбором:
<br>— Заниматься творческим и интересным делом или ходить на нелюбимую работу;
<br>— Поверить в себя или страдать от непризнанности;
<br>— Быть «звездой» или «серой мышкой»;
<br>— Общаться с людьми на равных или возгордиться своими успехами;
<br>— Помнить, что ты — проводник Бога, или думать, что ты — Бог, и тебе все подвластно;
<br>— Развивать в себе целительские способности или бояться духовных знаний, блокировать в себе этот дар.
<br>Что вы выбираете — быть в «плюсе» или в «минусе»?`;
testsPanelItem.appendChild(paragraph);
break;
}
case 18: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(18) Жизнь постоянно будет ставить перед выбором:
<br>— Идти вперед в новое и неизведанное или оставаться на месте, в своей зоне комфорта, поддаваясь
сомнениям;
<br>— Использовать свои магические способности во благо или для манипуляций, власти над другими людьми;
<br>— Быть активным, целеустремлённым или пассивным, ленивым, инертным;
<br>— Научиться работать со своими страхами или жить в них;
<br>— Духовно работать над собой, исцелять свою карму или плыть по течению, сетуя на то, что жизнь и люди
несправедливы.
<br>Что вы выбираете — быть в «плюсе» или в «минусе»?`;
testsPanelItem.appendChild(paragraph);
break;
}
case 19: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(19) Жизнь постоянно будет ставить перед выбором:
<br>— Греть или выжигать;
<br>— Заниматься благотворительностью или зарабатывать деньги только для себя;
<br>— Распылять свою энергию на множество полезных дел или зациклиться на чем-то/ком-то одном;
<br>— Служить большому количеству людей или замыкаться только на своих интересах;
<br>— Изучать законы Вселенной, заниматься духовными практиками или интересоваться только земными
делами;
<br>— Простить себя, полюбить таким, какой ты есть, или сжигать себя чувством вины;
<br>— Работать над своим спокойствием, гибкостью или быть агрессивным, властным;
<br>— Давать свободу другим или преследовать своей любовью, повышенной опекой и вниманием;
<br>— Работать над женскими энергиями (для женщин) или занимать мужскую, лидерскую позицию в семье;
<br>— Брать свои эмоции под контроль или быть вспыльчивым, постоянно «срываться», заводиться с полоборота;
<br>Что вы выбираете — быть в «плюсе» или в «минусе»?`;
testsPanelItem.appendChild(paragraph);
break;
}
case 20: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(20) Жизнь постоянно будет ставить перед выбором:
<br>— Простить своих родителей или копить в себе обиды;
<br>— Идти на контакт со своим родом или же отгораживаться от него, думая, что ты «сам по себе»;
<br>— Развивать в себе способности к яснознанию или игнорировать их;
<br>— Стремиться к духовному развитию или думать, что мир только материален и невидимой реальности не
существует;
<br>— Прожить жизнь не так, как прожили родители, благодарить их за полученный опыт или же критиковать и
осуждать отца и мать, обрекая себя проживать повторяющиеся сценарии рода.
<br>Что вы выбираете — быть в «плюсе» или в «минусе»?`;
testsPanelItem.appendChild(paragraph);
break;
}
case 21: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(21) Жизнь постоянно будет ставить перед выбором:
<br>— Иметь мечты и цели глобальные или мелкие, ничтожные;
<br>— Постоянно расширять свою зону комфорта или жить в ограничениях;
<br>— Любить весь мир, уважать все религии, нации, страны или критиковать и быть
недовольным происходящим в мире;
<br>— Выбрать профессию, работу «миротворческую» или «антимиротворческую»;
<br>— Научиться поэтапно двигаться к целям или бросать все на полпути;
<br>— Жить по принципу «Весь мир меня поддерживает в мечтах и целях» или «Добро должно быть с
кулаками».
<br>Что вы выбираете — быть в «плюсе» или в «минусе»?`;
testsPanelItem.appendChild(paragraph);
break;
}
case 22: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(22) Жизнь постоянно будет ставить перед выбором:
<br>— Давать свободу другим или ограничивать ее;
<br>— Доверять своему партнеру или ревновать;
<br>— Пользоваться всеми благами мира и не цепляться за них или считать, что они твоя собственность,
придавать им большое значение;
<br>— Жить так, как ты хочешь, или быть рабом «системы»;
<br>— Относиться ко всему легко, с юмором, или носить маску серьезного человека;
<br>— Уметь брать ответственность или выжидать, «когда само все решится».
<br>Что вы выбираете — быть в «плюсе» или в «минусе»?`;
testsPanelItem.appendChild(paragraph);
break;
}}
}
testsPanelContentCreate(X);
const childrenPanelItem=document.querySelector('#children_panel');
function childrenPanelContentCreate(numbers){
const uniqNumbers=new Set(numbers);
Array.from(uniqNumbers).map((item)=> {
switch (item){
case 1: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(1) <b>Ошибки по отношению к детям</b><br>
Считать правым только себя. Держать фокус на себе. Эгоизм<br>
Дистанция. Запрет на проявление чувств. Высокомерие<br>
Требование быть первым, лучшим. Ставить статус ребенка выше личности<br>
Любить за достижения.<br>
<br>
<b>К чему прийти?</b><br>
Быть внимательнее к другим людям<br>
Стать терпимее и мягче<br>
Быть на «равных», командному духу<br>
<br>
<b>Чему пришел научить ребенок?</b><br>
Развить терпение и фокус. Направить свои магические способности на созидание, а не разрушение.<br>
Работать в команде. Вести за собой своим примером. Дружить, сотрудничать, договариваться, а не бороться.<br>
Стремиться к взаимопониманию, научится слушать и уважать чужое мнение`;
childrenPanelItem.appendChild(paragraph);
break;
}
case 2: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(2) <b>Ошибки по отношению к детям</b><br>
<br>Противоречие в поступках и словах, непоследовательность, ложь или утаивание истинных чувств и эмоций. Например, мама на людях хвалит ребёнка, хвастается его успехами, но при общении с ребёнком постоянно критикует, ругает, обесценивает, унижает. Или в семье создаётся видимость равноправия, но мнение детей не учитывается.
<br>Абсолютное недоверие к ребёнку. Либо родитель притворяется, создает образ и предъявляет его ребёнку, пряча за ним истинное «Я». Например, демонстрирует радость, в то время как на душе ""кошки скребут"". И наоборот бывает - на душе все спокойно, но зачем-то изображает трагедию.
<br>
<br><b>К чему прийти?</b>
<br>Всегда быть собой с ребёнком и другими.
<br>Быть честным с самим собой, ребёнком и окружающими.
<br>Научиться доверять ребёнку, людям, этому миру.
<br>
<br><b>Чему пришел научить ребенок?</b>
<br>""Ложь, откровенная или уклончивая, высказанная или нет, всегда остается ложью"". Ч. Диккенс. Ребёнок пришёл научить Вас всегда говорить правду, ведь ложь не является выходом из ситуации. Честно и откровенно признаться самому себе и окружающим о своих чувствах, мыслях, намерениях, переживаниях, поступках; открыть свою душу перед самим собой и этим миром. Уметь просить помощь, когда она необходима.
`;
childrenPanelItem.appendChild(paragraph);
break;
}
case 3: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(3) <b>Ошибки по отношению к детям</b><br>
<br>Со стороны женщин - отказ от материнских функций из-за стремления к карьерному росту или нежелания жертвовать личным пространством и временем; ребёнок ушёл на второй план тогда, как карьера, личная жизнь заняли первое место; отказ от женственности и женского счастья.
<br>Со стороны мужчин - оскорбления, грубость и унижение по отношению к женщинам, принуждение к прерыванию беременности.
<br><br>
<b>К чему прийти?</b>
<br>Исполнять женские роли в семье - быть дочерью, сестрой, мамой. Не забывать, что природа создала Вас женщиной. Развивать женские черты, строя счастливую жизнь.
<br>
<br><b>Чему пришел научить ребенок?</b>
<br>Думать, чувствовать и поступать как женщина. Принимать свой женский образ, свое тело, осознавать свои желания, потребности, свою сексуальность, чувственность, ответственность за свою счастливую жизнь, силу и власть быть женщиной. Отдавать мужчине право быть главой семьи и её опорой. Делегировать обязанности, доверять окружающим. Наслаждаться ролью матери, безусловно любя своих детей.
`;
childrenPanelItem.appendChild(paragraph);
break;
}
case 4: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(4) <b>Ошибки по отношению к детям</b><br>
<br>Со стороны женщин - доминирующая роль в паре и семье, центр власти сосредоточен в её руках, она - и кормилец, и поилец, и защитник; утрата уважения к мужчине, страх перед мужчинами и отсутствие доверия им.
<br>Со стороны мужчин - пример безволия, слабохарактерности, трусости, неумения принимать решения и обеспечивать свою семью.
<br><br>
<b>К чему прийти?</b>
<br>Женщине - патриархат в семье, уважение к мужчине, отказаться или хотя бы поделиться своей властью.
<br>Мужчине - патриархальный уклад семьи мужчина - глава, добытчик, каменная стена и центр принятия решений, его женщина ЗАмужем.
<br><br>
<b>Чему пришел научить ребенок?</b>
<br>Мужчина – носитель морального авторитета, отвечающий за честь рода. Мужчина практически полностью несет ответственность за женщину и детей. Муж материально обеспечивает жену. Женщина всё это принимает и не перетягивает одеяло на себя. Мужчина уважает супругу, а она – его. Женщина - вдохновение и поддержка для мужчины, мягкая, тёплая и заботливая.
`;
childrenPanelItem.appendChild(paragraph);
break;
}
case 5: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(5) <b>Ошибки по отношению к детям</b><br>
Жесткие правила и ограничения - вставать в 8, ложиться в 22, получать пятерки, не дружить с теми, кто не соблюдает похожие правила, отслеживание местоположения, проверка переписки и постоянные допросы. Постоянные нравоучения и завышенные требования. При разводе разрыв отношений с ребёнком.
<br><br>
<b>К чему прийти?</b><br>
Воспитание - это личный пример, поэтому стать хорошим примером для своих детей. Самому учиться у детей и своих родителей. Соблюдать семейные традиции.
<br><br>
<b>Чему пришел научить ребенок?</b>
<br>Передавать знания, а не навязывать свое мнение и суждение о чем-либо. Не только указывать на ошибки, но и подсказывать, как их исправить.  Признать важность и значимость ребёнка. Семейные традиции призваны способствовать сближению членов семьи. Обеспечить связь поколений, их гармоничное взаимодействие. Семья - это труд, надо трудиться, чтобы её сохранить. Чаще собирать всю семью вместе. Быть гибкой и не навязывать свое единственное мнение.
`;
childrenPanelItem.appendChild(paragraph);
break;
}
case 6: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(6) <b>Ошибки по отношению к детям</b><br>
Отсутствие или нехватка родительской любви. Давать ребенку понять, что его будут любить только при определённых условиях (отличная учёба, полное послушание). Убеждённость в том, что ребенок должен соответствовать некоему идеалу, сформированному в голове родителя. Внушения, направленные на развитие чувств стыда и вины. Это могут быть как послания о неполноценности: ""Ты плохой"", ""Ты не соответствуешь нашим ожиданиям"", ""Ты не достоин любви"", так и непреднамеренные попытки указать ребёнку на ""его место"". Высокомерие по отношению к ребёнку. Отсутствие желание признавать неправоту и просить прощения у ребёнка.
<br><br>
<b>К чему прийти?</b>
<br>Научиться принимать себя, ребёнка и близких такими, какие есть. Полюбить ребёнка и близких безусловной любовью. Гармоничные отношения с самим собой, ребёнком, другими членами семьи, с миром.
<br>
<br><b>Чему пришел научить ребенок?</b>
<br>Не идеализировать других, увидеть, понять и принять все их недостатки и отрицательные черты, и несмотря на них любить их безусловной любовью, не пытаясь переделать. Через общения и разговоры с человеком научиться видеть его внутреннюю красоту. Не строить воздушные замки, а жить в реальности, трещат оценивая окружающий мир вокруг Вас.
`;
childrenPanelItem.appendChild(paragraph);
break;
}
case 7: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(7) <b>Ошибки по отношению к детям</b>
<br>Нарушение личного пространства и границ. Насильное навязывание своего мнения и взглядов. Запрет на проявление эмоций (нельзя плакать). Лишение свободного времени. Желание постоянно пристыдить и унизить. Физические наказания. Желание подавить ребёнка, лишив его права голоса. Нетерпимость.
<br>
<br><b>К чему прийти?</b>
<br>Авторитет через уважение, а не через страх. Компромиссы. Уважение ребёнка и его личных границ. Мирное урегулирование конфликтов в семье. Табу на физическое наказание.
<br>
<br><b>Чему пришел научить ребенок?</b>
<br>Создание безопасного пространства внутри семьи, соблюдение личных границ каждого её члена. Взаимоуважение и доверительные отношения в семье. Нахождение в контакте с ребенком и правильная забота о его нуждах. Поощрения, а не наказания. Способность хвалить, и говорить о достижениях. Совместная деятельность и совместное времяпрепровождение. Поддержание диалога в конфликтных ситуациях и их мирное урегулирование.
`;
childrenPanelItem.appendChild(paragraph);
break;
}
case 8: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(8) <b>Ошибки по отношению к детям</b>
<br>Привычка не брать на себя ответственность, а перекладывать ее на других. Уклонение от родительских обязанностей. Злоупотребление родительскими правами. Умышленное нанесение физического или психологического вреда. Халатное отношению к здоровью ребенка, поощрение хулиганских действий, игнорирование школьных собраний. Уклонение от обязательств по обеспечению, обучению и воспитанию. В случае развода
сокрытие места нахождения ребёнка от второго родителя или его похищение. Ежедневная ложь.
<br>
<br><b>К чему прийти?</b>
<br>Соблюдение закона. Понимание причинно-следственных связей происходящих событий. Неуклонное исполнение юридических и общечеловеческих законов.
<br><br>
<b>Чему пришел научить ребенок?</b>
<br>Показывать детям, что не нужно бояться говорить правду, за неё никто ругать не собирается, но нужно взять ответственность за свой поступок и всё исправить, и в этом готовы помочь самые близкие для него люди. Исполнение обязанностей, обязательств и обещаний. Всё в жизни справедливо, принять эту справедливость и жить, её сохраняя. Понять причинно-следственные связи между явлениями во Вселенной. Принять, что всё, что с нами происходит является неизбежным следствием, вытекающим из заложенной в прошлом причины. Осознать, что у Вселенной нет случайностей. Табу на ложь и несправедливое отношение.
`;
childrenPanelItem.appendChild(paragraph);
break;
}
case 9: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(9) <b>Ошибки по отношению к детям</b>
<br>Замкнутость, закрытость, скрытность, отсутствие тепла и общения, желание отстраниться и уединить. Молчаливость, привычка скрывать свои эмоции, трудность в высказывании своего мнения или отношения к чему-либо, дистанцирование от других членов семьи на семейных праздниках и иных семейных мероприятиях, преимущественно однозначные (да/нет) или лаконичные ответы на вопросы, нежелание присоединяться и поддержать разговор. Отказ от материальных ценностей. Уход из семьи.
<br>
<br><b>К чему прийти?</b>
<br>Открыться семье и стать её частью. Доверять близким. Наслаждаться жизнью и получать удовольствие от земных благ.
<br>
<br><b>Чему пришел научить ребенок?</b>
<br>Быть открытыми и искренними, чтобы иметь возможность устанавливать связи с другими людьми, заводить настоящих друзей и комфортно себя чувствовать в обществе.
<br>Не бояться проявлять чувства и эмоции. Больше общаться и рассказывать о себе и своей жизни. Интересоваться жизнью и делами ребёнка и других людей. Не бояться cкaзaть чeлoвeку тo, чтo ecть нa cамом дeлe. Быть собой. Стать позитивным и радостным. Принять материальный мир и стремится получать удовольствие от пользования материальными благами.
`;
childrenPanelItem.appendChild(paragraph);
break;
}
case 10: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(10) <b>Ошибки по отношению к детям</b>
<br>Родители живут жизнью детей, а не своей собственной жизнью. Потребительство (покрытие своих нужд за счёт детей). Занимаясь изнуряющим физическим трудом, заставляют ребёнка также трудиться. Либо наоборот сами ленятся, а заставляют ребёнка работать. Сетуют на судьбу, невезенье, неудачу, обстоятельства.
<br>
<br><b>К чему прийти?</b>
<br>Жить своей жизнью, занимаясь любимым делом. Прислушиваться к себе и понимать свои потребности и желания. Доверять силам Вселенной и свои внутренним ощущениям.
<br>
<br><b>Чему пришел научить ребенок?</b>
<br>Жить с мыслью: «Моя Вселенная заботится обо мне!». Иметь свободу, внешнюю и внутреннюю, выбирать и делать то, что приносит удовольствие, радость и изобилие. Найти свою цель, которая превращает жизнь в праздник, и наслаждаться этим. Быть расслабленным и в радости, и в печали. Быть в потоке. Быть на волне удачи, легко выбирая из многообразия то, чего хочется в данный момент. Жить в согласии с собой и с окружающим миром. Искать и находить во всем только хорошее. Отпускать обиды и негативный опыт, оставаться свободным от каких-либо установок и рамок и поступать так, как считаешь единственно правильным, в согласии Разума и Души. Заботиться о психические и физические здоровья ребёнка, не перекладывая на него свои обязанности.
`;
childrenPanelItem.appendChild(paragraph);
break;
}
case 11: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(11) <b>Ошибки по отношению к детям</b>
<br>На ребёнка наседают, диктуют правила,
запрещают быть собой и любыми способами пресекают свободу самовыражения и любые стремления ребёнка в достижении целей, которые родителям кажутся «неправильными», «глупыми», «ненужными» и «бесполезными». Постоянные издевки, унижения, высмеивание, подзатыльники, запреты, агрессия. Втягивание ребёнка в тяжёлый физический труд, предъявление высоких требований к их работоспособности и работоспособности других людей. Не доведение начатых дел до конца.
<br>
<br><b>К чему прийти?</b>
<br>Управлять негативными эмоциями. Трезво оценивать свою силу и силу и способности других людей. Направлять силу и энергию в мирное русло. Уметь замедляться и отдыхать.
<br>
<br><b>Чему пришел научить ребенок?</b>
<br>Не принуждать других идти туда и делать то-то и так-то, а мягко направлять. Быть мягким, гибким и отзывчивым к потребностям других, легко откликаться на их просьбы и пожелания, не переоценивая их возможности. Трансформировать негатив в позитив. Планировать своё время и определять периоды труда и отдыха. Понять границы своей работы, устанавливать задачи и работать в рамках именно этих задач, не беря на себя слишком многое, тогда все дела будут доделаны до конца.
`;
childrenPanelItem.appendChild(paragraph);
break;
}
case 12: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(12) <b>Ошибки по отношению к детям</b>
<br>Стремление манипулировать. Игра на чувстве вины и жалости. Обвинения ребенка в проблемах взрослых. Постоянное напоминание о прошлых ошибках. Заявления, что ребёнок недостаточно хороший член семьи. Постоянные упрёки тем, что сделали и чем пожертвовали ради него. Попытки возложить на него вину за свои чувства. Обесценивание чувств, действий и желаний ребёнка. Требования любви, при этом постановка условий, при выполнении которых будут любить сами (ребёнок должен заслужить любовь).
<br>
<br><b>К чему прийти?</b>
<br>Безусловная любовь к ребёнку и близким людям. Бескорыстие, щедрость. Умение расставлять свои границы и не нарушать чужие. Уважение к чувствам и желаниям ребёнка.
<br>
<br><b>Чему пришел научить ребенок?</b>
<br>Научиться делать добро, не выискивая выгоду, похвалу или награду взамен. Жить по принципу «Сделал добро – забудь о нем». Вовремя отпускать от себя ребёнка. Уметь правильно оценивать, сколько времени тратиться на себя, а сколько на посторонних людей и служение их интересам. Уметь сказать нет и защитить свои границы. Научиться отступать от шаблонов и быстро перестраиваться, в зависимости от обстоятельств. Не совершать поступков, которые отрицают, сдерживают или обесценивают мысли и чувства детей. Воспитывать детей в атмосфере заботы и поощрения.
`;
childrenPanelItem.appendChild(paragraph);
break;
}
case 13: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(13) <b>Ошибки по отношению к детям</b>
<br>Страх потери близкого человека и транслирование этого страха на ребёнка.
<br>Боязнь любых изменений и игнорирование их необходимости. Регулярное внушение ребенку различного рода опасений: «Не делай, поскольку мир страшен, и действия могут привести к негативным последствиям». Утверждение, что лучше ничего не предпринимать, а плыть по течению, поскольку нынешнее положение – самое стабильное, а изменения могут быть опасными и страшными. Убеждать ребёнка довольствоваться тем, что есть, и не делать шагов для изменения ситуации.
<br>
<br><b>К чему прийти?</b>
<br>Освободиться от страхов. Понять важность изменений и стремления ко всему новому. Понять, что прогресс и развитие цивилизации неизбежны.
<br>
<br><b>Чему пришел научить ребенок?</b>
<br>Рисковать, выходить из зоны комфорта. Набраться сил и смелости, заручиться поддержкой близких и, чётко определив цель, начать двигаться вперёд. Не останавливаться на достигнутом, стремиться к большему. Развивать себя. Понять, что новое через некоторое время станет привычным. Избавляться от старых ненужных вещей.
`;
childrenPanelItem.appendChild(paragraph);
break;
}
case 14: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(14) <b>Ошибки по отношению к детям</b>
<br>Алкоголизм и другие зависимости и основанные на них грубость, невнимательность по отношению к ребёнку и другим членам семьи. Нереализованность собственных талантов и способностей и как следствие неверие в таланты и способности ребёнка: ""Не получилось у меня, не получится и у тебя"". Неспособность преодолевать жизненные трудности и испытания т всё то же: ""Не получилось у меня, не получится и у тебя"". Неспособность гасить внутри себя негативные эмоции, душевную боль, желания и др. Отсутствие терпения и терпимости к ребёнку. Убеждение ребёнка в отсутствии высших сил и Бога.
<br>
<br><b>К чему прийти?</b>
<br>Избавление от зависимостей. Диалог с душой. Развитие терпимости по отношению к ребёнку.
<br>
<br><b>Чему пришел научить ребенок?</b>
<br>Идти туда, куда ведет сердце и самые искренние стремления. Ни под кого не подстраиваться, никого не бояться, выражать то, что думаешь и чувствуешь, общаться с теми, кто нравится, делать то, что вдохновляет. Научиться слышать душу и идти по своему пути: делать, что любишь и отстаивать свою истину — ту, которая в душе. Во всем видеть Бога, Его Промысл, Его действие, Его заботу и любовь. Реализовать свои способности и таланты и помочь ребёнку реализовать свои.
`;
childrenPanelItem.appendChild(paragraph);
break;
}
case 15: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(15) <b>Ошибки по отношению к детям</b>
<br>Налаживать личную жизнь на глазах у ребёнка, постоянно приводить домой новых партнёров, знакомить с ними, а потом при расставании жаловаться и ругаться на них ребёнку. Сделать из ребёнка подружку или друга и откровенно делиться неудачами на любовном фронте, погружая ребёнка в подробности, не соответствующие его возрасту. Выяснение отношение в присутствии ребёнка, взаимные обвинения, оскорбления и упрёки между родителями. Проявление агрессии и другого негатива в адрес ребёнка. Подчинение его своей воли, манипуляции. Алкогольная и другие зависимости.
<br>
<br><b>К чему прийти?</b>
<br>Обуздать свои пороки и усмирить зависимости. Развиваться духовно. Принять то, что ребёнок - дар Божий, и требует трепетного и заботливого отношения.
<br>
<br><b>Чему пришел научить ребенок?</b>
<br>Уметь преодолевать свои пороки, уметь справляться с ними, бороться со своими дурными пристрастиями. Знать силы, которые есть, и направлять их на благо. Уметь стоять на страже своих поступков, мыслей, желаний, умение контролировать их, понимать, откуда они приходят, к чему ведут. Укрощать гордыню(тщеславие), алчность (жадность), зависть, гнев, похоть (блуд, прелюбодеяние), чревоугодие (обжорство), уныние (печаль, лень). Научиться прощать. Научиться радоваться успехам и достижениям других. Видеть в людях хорошее, принимать их недостатки.
`;
childrenPanelItem.appendChild(paragraph);
break;
}
case 16: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(16) <b>Ошибки по отношению к детям</b>
<br>Все вокруг кажется бессмысленным и серым, нет желания и мотивации что-либо делать, все валится из рук, есть чувство усталости, смутной грусти. Эмоциональное выгорание. Потеря веры в себя. Апатия. Потеря желания и интереса к каким-либо действиям. Неспособность получать удовольствие от тех вещей и занятий, что раньше приносили радость. Негативные тревожные мысли, излишняя самокритика, чувство собственной неполноценности (самобичевание). Панический страх лишиться материальных благ. Всё это транслируется ребёнку и передаются ему мысли о бессмысленности бытия.
<br>
<br><b>К чему прийти?</b>
<br>Обрести смысл и цели в жизни. Начать жить с чистого листа. Уметь подниматься и идти дальше после даже самых сложных неудач.
<br>
<br><b>Чему пришел научить ребенок?</b>
<br>Уметь преодолевать препятствия, бороться с трудностями в своей жизни, падать и снова вставать. Сосредотачиваться на тех ситуациях, которые можете контролировать и не бояться того, что изменить не в силах. Стать сильнее психологически, работая над позитивным мышлением. Выходить из зоны комфорта и идти навстречу изменениям и развитию. Расти духовно и побуждать людей к тому же, стать для них лидером и примером несгибаемости силы духа и желания развиваться.
`;
childrenPanelItem.appendChild(paragraph);
break;
}
case 17: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(17) <b>Ошибки по отношению к детям</b>
<br>Жить под девизом «Я лучше остальных и достоин особенного отношения». Причём это особенное отношение должно быть и со стороны детей. Отсутствие способности здраво оценить себя и свои возможности, в результате и ребёнок не может понять, какой его родитель. Проявление высокомерия, эгоизма, тщеславия, самолюбования, пренебрежительности, манипуляции, использования окружающих людей в своих целях, холодности, замкнутости. Усугубление этих качеств при нереализованных талантах и способностях. Неспособность поддержать ребёнка в развитии его талантов по причини неверия в них.
<br>
<br><b>К чему прийти?</b>
<br>Верить в таланты детей и развивать их. Самореализация. Борьба с гордыней и общение с людьми на равных.
<br>
<br><b>Чему пришел научить ребенок?</b>
<br>Проанализировать и принять свои и слабые и сильные стороны. Уйти в развитие сильных сторон, реализацию своего потенциала и творческих способностей. Погасить высокомерие по отношению к другим людям и самолюбование, ведь всё, что есть в тебе, сотворено и дано тебе Богом. Стать звездой, при этом не заболеть звёздной болезнью. Делиться своим творчеством с людьми. Помочь другим раскрывать свои таланты.
`;
childrenPanelItem.appendChild(paragraph);
break;
}
case 18: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(18) <b>Ошибки по отношению к детям</b>
<br>Негативные мысли о себе (Я-полное ничтожество), о своем текущем опыте (У меня ничего не получается) и о своем будущем (Меня не ждет ничего хорошего). Постоянное состояние тревоги, приводящее к мыслям о неизбежных катастрофах, которые непременно произойдут в ближайшем или далеком будущем.
<br>Мысли о собственной слабости, бесперспективности и ненормальности. Негативное мышление, приводящее к негативным эмоциям, которые выплескиваются на ребёнка. Ребёнок тоже начинает мыслить негативно, появляется страх перед жизнью, страх смерти, страх потери близких.
<br>
<br><b>К чему прийти?</b>
<br>Позитивное мышление. Проработка необоснованных тревог и стразов. Умиротворение.
<br>
<br><b>Чему пришел научить ребенок?</b>
<br>Окружать себя позитивными людьми. Наслаждаться позитивными моментами. Быть благодарным за то, что имеете. Не жаловаться слишком много. Не обобщать отрицательный опыт. Уметь отвлекаться. Верить в себя и ребёнка. Уметь контролировать эмоциональное состояние. Стремиться к самосовершенствованию, развитию своих способностей, в том числе магических. Донести до ребёнка, что жизнь - это дар Божий и она прекрасна и не опасна.
`;
childrenPanelItem.appendChild(paragraph);
break;
}
case 19: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(19) <b>Ошибки по отношению к детям</b>
<br>Испытывать вину и стыд за свои привязанности и зависимости, безденежье и нереализованность. Передавать детям все установки бедности.
<br>
<br><b>К чему прийти?</b>
<br>Самореализация. Богатство. Большое количество детей.
<br>
<br><b>Чему пришел научить ребенок?</b>
<br>Понять себя. Учесть свои ограничения, свои сильные и слабые стороны.
<br>Работать над собой. Развивать свои способности, минимизировать свои слабые стороны. Ставить цели, исходя из своих талантов и способностей.
<br>Заниматься любимым делом.  Верить в себя и свои силы. Осуществлять направленные действия к цели. Не сбавлять темп движения к цели. Действовать дальше при достижении промежуточных результатов, не «почивая на лаврах» и не замедляя выбранный темп. Достигать поставленные цели, процветать материально и духовно. Своим примером освещать путь других людей.
`;
childrenPanelItem.appendChild(paragraph);
break;
}
case 20: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(20) <b>Ошибки по отношению к детям</b>
<br>Обсуждение родственников, постоянные разговоры о том, какие они жадные, хитрые и т.д. Постоянные разговоры о том, как ""не повезло с родственниками"", их осуждение, критика, оскорбления. Разжигание с ними ссор и конфликтов, втягивание в эти конфликты ребёнка. Разрыв отношений с семьёй, запрет для ребёнка на общение с родственниками.
<br>
<br><b>К чему прийти?</b>
<br>Мир в семье. Уважение всех членов семьи. Соблюдение и передача традиций. Преемственность поколений.
<br>
<br><b>Чему пришел научить ребенок?</b>
<br>Семья - это малая церковь. Семья - это свято. Семья - это таинство. Семья - это ковчег. Ковчег любви, понимания, теплоты, доверия, взаимопонимания и взаимопомощи. Необходимо хранить и оберегать этот ковчег, заботиться о всех, кто в нём находится, проявляя мудрость, терпение и выдержку. Через безусловную любовь к родственникам и принятие всех их слабостей и недостатков идти навстречу своему духовному развитию.
`;
childrenPanelItem.appendChild(paragraph);
break;
}
case 21: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(21) <b>Ошибки по отношению к детям</b>
<br>Ограничение свободы, жёсткие рамки и правила, постоянный контроль. Манипуляции своим здоровьем или даже жизнью. Ограниченность мышления. Нежелание развиваться и идти вперёд. Денежные разбирательства, кредиты, долги.
<br>
<br><b>К чему прийти?</b>
<br>Гармония с собой, окружающими и Вселенной.
<br>Расширение сознания и пространства вокруг себя. Выступать в качестве миротворца.
<br>
<br><b>Чему пришел научить ребенок?</b>
<br>Иметь глобальные мечты и ставить глобальные цели. Постоянно развивать свои способности и расширять свою зону комфорта. Любить весь мир и мироустройство, уважать все религии, культуры, народы и страны. Быть человеком мира. Открыться этому миру. Путешествовать, впитывая всё, что увидите. Давать свободу детям и возможность прожить ими свою жизнь.
`;
childrenPanelItem.appendChild(paragraph);
break;
}
case 22: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(22) <b>Ошибки по отношению к детям</b>
<br>Ограничивают свободу ребенка, ограничивают свободу его выбора и решений.  Не доверяют ему, не верят в то, что он справится без их помощи, советов и подсказок. Диктуют, как следует поступить, с кем дружить, чем питаться, что носить. Делают выбор за ребёнка. Дают обещания, которые потом не выполняют. Не воспринимают ребёнка как полноценную личность, нарушают его границы.
<br>
<br><b>К чему прийти?</b>
<br>Уважение ребёнка и его право выбора. Соблюдение личных границ других людей, в том числе и прежде всего ребёнка. Избавление от своих внутренних ограничений.
<br>
<br><b>Чему пришел научить ребенок?</b>
<br>Ребёнок - это не бездумное продолжением своих родителей. Давать детям возможность контролировать ситуацию, принимать решения и делать выбор. Взрослые не всегда знают, как лучше. Ребёнок может справиться и самостоятельно. Уметь принимать негативные эмоции своих детей. Заменить ""Я должен"" на ""Что мне нужно? Что для меня важно? К чему я стремлюсь?"".  Поставить в центр своей жизни самореализацию (в профессии, любви, творчестве) и подумать о том, какие ресурсы (знания, навыки, образ жизни, чья-либо помощь) помогут в достижении этой цели. Не ругать себя. Развивать гибкость мышления.
`;
childrenPanelItem.appendChild(paragraph);
break;
}}
})
}
childrenPanelContentCreate([A,A1,A2]);
const managementPanelItem=document.querySelector('#management_panel');
function managementPanelContentCreate(numbers){
const uniqNumbers=new Set(numbers);
Array.from(uniqNumbers).map((item)=> {
switch (item){
case 1: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(1) В первую очередь Вам необходимо раз и навсегда избавиться от неверия в собственные силы и в самого себя, перестать недооценивать свои способности и преуменьшать положительные качества. Перестаньте в себе сомневаться и заниматься самокритикой, переживать из-за допущенных когда-то промахов и ошибок. Работайте над своей самооценкой. Верьте в то, что Вы достойны лучшего! Вы действительно достойны всего самого лучшего в этом мире, главное, не забывайте себе об этом повторять. Повторяйте утром и вечером. Повторяйте, когда идёте на работу или возвращаетесь домой. Концентрируйте свои мысли не на том, как «всё плохо», а на том, что «Вы достойны всего самого лучшего». И повторяйте, повторяйте и ещё раз повторяйте себе «Я достоин (а)».
<br><br>Найдите себе дело по душе. Возможно, вы любите танцевать или фотографировать, обязательно пойдите в школу танцев или фотошколу. Найдите занятие, которое будет приносить вам удовольствие, поднимать настроение и реализует, и разовьёт Ваши творческие способности.
Не бойтесь пробовать новые вещи и идти вперед, ведь отличительной чертой успешных людей является то, что они всегда стараются учиться чему-то новому. И сама первая энергия наделила Вас и способностью, и возможностью и обязанность быть успешным, быть первым, прокладывая новые пути и дороги для себя, а затем смело вести за собой людей. Для этого поборите свои страхи и тревоги, негативные эмоции и переживания. Природа – неисчерпаемый источник энергии и силы для Вас, поэтому необходимо чаще бывать там (можно просто гулять в лесу или медитировать на природе или просто даже работать на своём дачном участке, всё пойдёт Вам на пользу). Контактируйте со всеми четырьмя стихиями: расслабляйтесь, погружаясь в воду (море, водоём, река); разожгите костёр и созерцайте огонь; выйдите в поле и почувствуйте ветер, слышьте его, вдыхайте свежий воздух; лягте на землю и визуализируйте образы, которые имеют отношения к стихии земли, представляйте леса, поля, красивые пейзажи, горы и т.п.
`;
managementPanelItem.appendChild(paragraph);
break;
}
case 2: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(2) Вам необходимо знать и правильно применять основные Законы Вселенной, чтобы глубоко понимать собственную жизнь, управлять ей и добиваться успеха. Доверяйте Вселенной, соблюдая её законы, доверяйте себе, своему телу и своей интуиции. Чтобы научиться правильно и позитивно мыслить, и направить мысли в нужное русло прочтите книги Ронды Берн “Секрет” и книгу доктора Джо Диспенза ""Сила подсознания или Как изменить жизнь за 4 недели"". Пусть они помогут Вам прийти к гармонии внутри себя и станут отправной точкой на пути к Вашей новой жизни.
<br><br>Научитесь честно встречаться с самим собой, осознавать свои чувства, желания, научитесь быть в контакте с собой и не предавать себя. Научитесь быть честными и с другими. Примите честность как благодетель. Ложь никогда не избавит от проблем, она их лишь только замаскирует.   А с честностью, как перед самим собой, так и перед другими, можно избежать многих проблем.
Ведите активный образ жизни и занимайтесь спортом.  Можно заняться спортивной или скандинавской ходьбой, йогой, пилатесом, растяжкой. Если нет возможности делать это оффлайн, то можно найти много достойных спортивных приложений, в котором будут расписаны все тренировки, занятия и упражнения.
<br><br>Для разгрузки мозга и укрепления нервной системы научитесь медитировать. Можно найти и скачать приложения для медитации.
Начните заниматься дыхательными упражнениями, они помогут снять стресс, улучшить работу мозгу и даже снизить вес. Самые популярные среди них — это пранаяма (система дыхательных упражнений в йоге), цигун (древнекитайская духовная и дыхательная практика), бодифлекс (система аэробного дыхания для похудения), а также методики дыхательной гимнастики Стрельниковой и Бутейко. Все методики дыхания можно освоить в домашних условиях, например, по видео урокам, которые можно найти в свободном доступе в Интернете.
Берегите и будьте ближе к природе, пусть частички её всегда будут у Вас дома (используйте травяные подушки для сна, употребляйте травяные чаи, по возможности покупайте мебель из натуральных материалов, отдавайте предпочтение экологичным средствам для уборки, создавайте и украшайте квартиру гербариями, используйте натуральные средства в уходе за собой, выращивайте в квартире или дома комнатные и не только растения).
Раскройте свою сексуальную энергию.
`;
managementPanelItem.appendChild(paragraph);
break;
}
case 3: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(3) Ваша внешность - это Ваша визитная карточка, поэтому у Вас всегда должно быть чистое и ухоженное лицо с макияжем по случаю (дневной или вечерний, либо полно совсем отказаться от него, если ситуация позволяет), чистые волосы без посеченных концов и выцветших прядей, ухоженные руки и стопы с аккуратным маникюром и педикюром, подтянутое тело. Не забывайте про сияющий взгляд и хорошее настроение, а также современный стильный гардероб.
<br><br>Следите за своим поведением и речью. Вам необходимо научиться красиво говорить, излагать свои мысли, владеть интонацией. Помните, что сила женской речи в её мягкости. Если женщина выражается жёстко, то её начинают воспринимать как мужчину, а её женственность стирается.
""Смените гнев на милость"". В этом Вам прекрасно поможет книга Колина Типпинга “Радикальное Прощение”. Прочитав её, Вы поновому начнёте воспринимать мир и устраните в себе гнев, обиду и стыд.
<br><br>Если Вы - мужчина-обладатель третьей энергии, то начните с уважения женщин вокруг себя.
Наладьте отношения с мамой. Запомните, что маму изменить нельзя, а себя можно. Поэтому начните с себя. Закройте детские обиды. Ведите себя как взрослый человек. Установите правила (например, когда Вы с мамой встречаетесь, то исключите разговоры на болезненные для Вас темы, договоритесь об этом и сообщайте не нарушать договорённость).
<br><br>Природа - источник всего. Будьте к ней ближе. Конечно, идеально иметь свой домик в деревне, где выращивать для себя ягоды, фрукты и овощи. Но если такой возможности нет, то устройте огород на окне. Как минимум, зелёный лук и укроп вполне возможно вырастить.
Развивайте свои профессиональные навыки, проходите курсы повышения квалификации и иные обучающие мероприятия. Вам под силу реализовать себя на руководящих должностях.
<br><br>Развивайтесь не только профессионально, но и духовно.
Не ставьте во главу угла бытовые заботы. К примеру, не нужно каждый день протирать пыль. Расслабьтесь, разрешите себе лениться. Устраивайтесь ленивые дни, в которые Вы целый день будете лежать на диване и читать книги с чашечкой гречишного чая или пересматривать любимый сериал. Не считайте чем-то недостойным заказ еды на дом или пользоваться услугами клининговых служб.
Лучшим способом отдохнуть от рабочего процесса, справиться со стрессом и предупредить эмоциональное выгорание является любимое увлечение или хобби.
Проводите свободное время вне семьи - ходите с друзьями в кино, в фитнес-клуб, в СПА-центры.
`;
managementPanelItem.appendChild(paragraph);
break;
}
case 4: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(4) Вам следует перестать контролировать всё и всех. Примите тот факт, что не всё зависит от Вас. Делегируйте задачи и работайте в команде. Доверяйте людям. Перестаньте думать, что Вы всё знаете больше других, не навязывайте свою точку зрения. Относитесь с пониманием к ошибкам других.
<br><br>Развивайтесь духовно, меняйте свою жизнь к лучшему, открывая её новые грани. В этом Вам помогут книги Рами Блекта.
Развивайте своё шестое чувство.
<br><br>Прочтите книгу Колина Типпинга “Радикальное Прощение”, чтобы начать по-новому воспринимать мир и избавиться от негативных эмоций.
Заботьтесь о своём теле - занимайтесь спортом, правильно питайтесь, соблюдайте режим дня.
Благодарите за то, что у Вас уже есть, и тогда будет ещё больше тех благ, за которые Вы сможете благодарить жизнь.
Освойте техники, которые помогут Вам принять взвешенные решения с ""холодной головой"". Берите уроки эффективного менеджмента, изучайте инвестиции. Начните копить деньги по системе от 1 до 365.
И самое главное, наладьте тёплые и дружеские отношения с отцом. Если это невозможно, то примите его таким, какой он есть и простите все обиды.
`;
managementPanelItem.appendChild(paragraph);
break;
}
case 5: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(5) Перестаньте играть роль контроллера в Вашей семье, не диктуйте и не говорите, что и как должно быть сделано другими, не критикуйте и уважайте чужое мнение и взгляды. Перестаньте устанавливать исключительно Ваши порядки и правила. Дайте возможность членам Вашей семьи жить и поступать, как им хочется.
<br><br>Не ставьте Ваши знания выше знаний других. Какими бы уникальными и энциклопедическими они не были бы, во-первых, всегда есть тот, кто знает больше, а во-вторых, абсолютно всё знать невозможно. Передавайте Ваши знания другим, но делайте это гармонично и экологично, не навязывая и не поучая. Как вариант, делиться своими знаниями и умениями через социальные сети. Это может быть как блог о криптовалюте, так и о кулинарных секретах.
Будьте открытым новым источникам информации, читайте научную литературу, смотрите документальные и научные фильмы. Развивайте и тренируйте свой мозг. Например, можно его удивить и почистить зубы не правой рукой, как обычно, а левой. Или замените привычную вилку на китайские палочки. Ну и конечно, не забывайте решать головоломки, разгадывать кроссворды, собирать кубик Рубика.
<br><br>Поменяйте своё отношение к происходящим в жизни событиям. Вам нужно просто принять тот факт, что Ваша жизнь в целом была, есть и будет такой, какой Вы её видите и субъективно воспринимаете. Если Вы думаете, что все плохо и ничего хорошего в вашей жизни произойти не может, то так оно и будет. Поэтому важно мыслить позитивно. Если Вы будете думать, что все хорошо и в Вашей жизни произойдет еще много чего хорошего, то так оно и будет!
Развивайте ораторские способности. В этом Вам помогут следующие книги: И. Голуб «Искусство риторики. Пособие по красноречию», О. Болсунов «Ораторское искусство для начинающих», К. Бредемайер «Черная риторика».
<br><br>Изучайте своё родовое древо, это поможет Вам в самоопределении и самопознании, понимании своей причастности к чему-то большему, чем просто «я». Древо даст Вам силы и абсолютно новое ощущение жизни. И дополнительную ответственность за то, что останется после Вас. Чтите семейные традиции и храните семейные ценности.
`;
managementPanelItem.appendChild(paragraph);
break;
}
case 6: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(6) Избавьтесь от зависимости от чужого мнения и перестаньте постоянно размышлять о том, что о Вас думает тот или иной человек, научитесь фокусировать свое внимание на себе и текущей ситуации в Вашей жизни. Поймите, что все люди думают только о себе, своих делах, проблемах, заботах, радостях и неудачах. И Вы сконцентрируйтесь исключительно на своей жизни.
<br><br>Принимайте людей такими, какие они есть. Взглянуть по-новому на себя, своё окружение и свою жизнь поможет книга Колина Типпинга “Радикальное Прощение”.
Избавиться от негативных жизненных программ, внутренне очиститься, решить проблему с другими людьми и понять причину некоторых событий в жизни Вам поможет техника поклонов (информацию о ней Вы найдёте в свободном доступе в Интернете). Не игнорируйте эту возможность привнести гармонию в свою жизнь. Помогут обрести гармонию и письма прощения родителям.
<br><br>Любовь к себе — это фундамент, на котором мы строим всю свою жизнь. Чтобы этот фундамент у Вас был прочным, практикуйте аффирмации — позитивные утверждения, которые запрограммируют ваше подсознание. Напишите и повторяйте регулярно минимум 55 аффирмаций любви к себе: Я ЛЮБЛЮ и принимаю себя такой, какая я есть, Я ЛЮБЛЮ свою личность, Я ЛЮБЛЮ человека, которым я являюсь, Я ЛЮБЛЮ свое тело и т.д. Они помогут и снять чрезмерную требовательность к себе. Балуйте себя, хвалите, дарите себе подарки, делайте себе комплименты, ухаживайте за собой. Следите за модой, регулярно обновляйте Ваш гардероб.  Всё это пойдёт на пользу Вашей энергетике.
Будьте открыты для друзей, проводите вместе с ними время, приглашайте к себе в гости, путешествуйте семьями.
<br><br>Мыслите позитивно. Если Вы будете думать, что все хорошо и в Вашей жизни произойдет еще много чего хорошего, то так оно и будет! Разобраться со своими мыслями и понять их силу поможет книга доктора Джо Диспенза ""Сила подсознания или Как изменить жизнь за 4 недели"".  Книга Ронды Берн “Секрет” тоже поможет Вашей жизнь идти по принципиально иному пути.  Можете также посмотреть одноимённый фильм.
Познакомьтесь с методом принятия решений на основании квадрата Декарта, что бы лишний раз убедиться, что всё гениальное просто.
`;
managementPanelItem.appendChild(paragraph);
break;
}
case 7: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(7) Научитесь правильно ставить цели и эффективно достигать результат. Записывайте свои цели, ведь устно поставленная цель – это просто мысль, и только записанная на бумаге, конкретная формулировка является настоящим обязательством перед самим собой. Для этих целей используйте ежедневник или доску визуализации. Ставьте конкретную цель. Чем конкретнее цель, тем сильнее Вы сможете себя мотивировать. Разбивайте цель на максимальное количество подзадач. Записывайте свои успехи. Можно записывать не только успехи, но и планы на каждый конкретный день. Не бойтесь брать на себя ответственность.
<br><br>Управляйте своими негативными эмоции. Мыслите позитивно. В этом Вам помогут книга доктора Джо Диспенза ""Сила подсознания или Как изменить жизнь за 4 недели"", книга Ронды Берн “Секрет” и одноимённый фильм.
Занимайтесь спортом, активно отдыхайте, медитируйте.
`;
managementPanelItem.appendChild(paragraph);
break;
}
case 8: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(8) Боритесь со своим категоричным мышлением, не делите мир на черное и белое, не делите людей на хороших и плохих. Поймите, что в мире много цветов и полутонов, а люди разные и им свойственно быть разными в разных ситуациях. И сами ситуации не всегда такие однозначные, какими их видите Вы. Научитесь видеть целую палитру красок этого мира, а людей примите такими, какие они есть, научитесь видеть ситуацию со стороны другого человека. Не осуждайте, не боритесь за “высшую справедливость”. Всё в мире справедливо и без Вас, мир изначально был устроен справедливым, и Вы не привнесёте в него ничего иного лучшего. Ответы на многие Ваши вопросы и понимание бытия даст изучение законов мироздания. В изучении этих законов одним из Ваших помощников станет книга М. Роуча “Кармический менеджмент: эффект бумеранга в бизнесе и в жизни”.
<br><br>Осознайте и примите любые свои эмоции, Вы имеете право и на злость, и на обиду, и на гнев. И когда Вы их примите, сказав, например,:“Я зол”, тогда Вы и сможете их контролировать, сможете сохранять баланс между положительными и отрицательными эмоциями, сможете ими управлять. Осознание права на проявление эмоций даст Вам возможность понимать и эмоции других людей.
Полезно познакомиться с техникой “Колесо жизненного баланса”, она позволит со стороны посмотреть на свою жизнь и понять, в каком направлении двигаться далее.
<br><br>Соблюдайте законы в бизнесе и жизни - платите налоги, честно закрывайте кредиты, держите свои обещания.
`;
managementPanelItem.appendChild(paragraph);
break;
}
case 9: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(9) Откройте себя для себя и для этого мира. Откройте себя другим людям, делитесь с ними своими знаниями, умениями, способами преодоления трудностей и проблем. Пусть глядя на Вас, они думает о том, что если смог он, то смогу и я. Станьте для людей примером, мотиватором, вдохновителем.
<br><br>Занимайтесь тем, что Вам интересно, изучайте, постигайте, запоминайте, Впитывайте всю информацию, доберитесь до самой сути того или иного вопроса или темы. Развивайте в себе писательские способности. Делитесь своими текстами в социальных сетях. Там же можно и делиться эмоциями и впечатлениями от прочитанных книг.
Прислушивайтесь к своим эмоциям, потому что в них заложена важная информация, и управляйте ими, чтобы они не противоречили Вашим целям и ценностям и не мешали. Для этого Вам нужно понять, что Вы имеете полное право испытывать весь спектр эмоций — радоваться, бояться, злиться и грустить. После этого осознайте каждую эмоцию, которую Вы испытываете в ту или иную минуту, и назовите её словом: ""Я испытываю гнев/радость/печаль и т.д "". Вы можете озвучить это себе, или же другому человеку. Важно это озвучить, именно так Вы дадите возможность этой эмоции выплеснуться.
<br><br>Не бойтесь одиночества, оно даст Вам познание себя, силы и энергию для дальнейшего роста. Отличным решением будут прогулки на природе, там Вы не только побудете наедине с собой, но и наедине с природой.
Избавьтесь от страхов, боли и обид. Прочтите книгу Колина Типпинга “Радикальное Прощение”.
<br><br>Заботьтесь о своём здоровье - активный образ жизни, занятие спортом, правильное питание, здоровый сон, избавьтесь от вредных привычек. Балуйте себя покупками и путешествиями
Постарайтесь раскрыть в себе целительские способности.
`;
managementPanelItem.appendChild(paragraph);
break;
}
case 10: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(10) Воспринимайте жизнь как одну больную возможность, а не как одну большую проблему. ""Пессимист видит трудность в любой возможности, оптимист видит возможность в любой трудности"" (с) Уинстон Черчилль. Будьте оптимистом.  Радуйтесь каждому, даже самому маленькому, успеху и достижению. Ведь каждый из них это шаг на пути к чему-то большому. Очень актуально здесь будет упражнение Лестница успеха.
<br><br>Верьте в себя и свой успех. Помните, успех сопутствует уверенным в себе людям, которые верят в себя, в свои мечты и действуют, движутся к реализации задуманного.
Ведите активный образ жизни - избавьтесь от лени, больше двигайтесь и занимайтесь спортом, отдыхайте правильно (пикники на природе, купание в водоемах, различные спортивные игры, волейбол, бадминтон, танцы, походы), придерживайтесь здорового питания, соблюдайте питьевой режим. Знакомьтесь с новыми людьми, посещайте новые места, ходите на выставки, в театр, оперу, балет, концерты классической и джазовой музыки.
<br><br>Просите помощи у Вселенной - мысленно обратитесь к ней и озвучьте, что Вам в данной момент нужно. Развивайте свою интуицию, прислушайтесь к внутреннему голосу, и, основываясь на них, принимайте решения.
`;
managementPanelItem.appendChild(paragraph);
break;
}
case 11: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(11) Научитесь грамотно направлять и пользоваться своей силой и своим потенциалом. Подумайте, куда сейчас они направлены - на благо или во вред? Подумайте, что Вы несёте в этот мир и другим людям. Подумайте, что чувствуют люди, находящиеся рядом с Вами. Принимаете ли Вы их такими, какие они есть? Если нет, то исправляйте это в себе. Не забывайте, что каждый человек индивидуален и обладает свободой выбора. Общайтесь с людьми как с равными, не возвеличиваясь над ними, убирайте приказной тон и повелительное наклонение. Не сравнивайте других с собой, ведь той силой, которой обладаете Вы, их природа не наделила. И они просто не в состоянии работать в таком же темпе, как и Вы.
<br><br>Не беритесь за всё и сразу, не работайте на износ, отдыхайте регулярно и качественно, медитируйте для успокоения души и тела, занимайтесь спортом.
Во всём старайтесь видеть позитив. Запомните, что Вы либо побеждаете, либо приобретаете опыт, другого не дано. Нет негативного результата, есть бесценный опыт.
Занимайтесь саморазвитием.
`;
managementPanelItem.appendChild(paragraph);
break;
}
case 12: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(12) Начните смотрите на привычные вещи под другим углом. Умение задавать вопросы и смотреть на привычные вещи по-новому - это путь к Вашим новым знаниям. Существует множество фактов, действий, привычек, которые мы принимаем как данность и совершенно не задумываемся, почему именно так. Дойдите до сути вещей. Во-первых, это расширит ваши знания о мире, во-вторых, погрузит в научный мир, а в-третьих, позволит улучшить навык исследования.
<br><br>Займитесь своей самооценкой и верой в себя. И то, и другое нужно поднять. В этом Вам поможет правило 4П. Согласно нему Вам предстоит:
<br>1. Понять себя (Понять своё предназначение; понять, кто вы и зачем живёте;
<br>2. Простить себя (Убрать чувство вины);
<br>3. Полюбить себя и своё тело.
<br>4. Признать себя (признать себя Божественным созданием).
<br><br>Научитесь говорить нет. Не бойтесь получить негатив в свой адрес, потому что это значительно лучше, чем жертвовать своими силами и временем ради чужих интересов.
Цените своё время и свой труд. Запомните, что любая работа должна оплачиваться и это совершенно нормально брать деньги за свой труд даже с друзей.
Цените и искренне любите себя, всегда находите время для интересных Вам занятий, не идти наперекор своим убеждениям и моральным устоям. Балуйте себя, делайте себе подарки.
Учитесь и развивайтесь в том, что Вам интересно. Делитесь Вашими знаниями с другими людьми, например, через социальные сети. Начните вести блог по выбранной Вам теме, делитесь с людьми пользой, доносите до них свои ценности. Там же, в блоге, Вы можете развивать, тренировать и совершенствовать свои писательские способности, раскрывать Вашу уникальность.
<br><br>Изучить понятие треугольник Карпмана, понять, находитесь ли Вы в нём и какую роль играете. После этого предпринимать все усилия, чтобы выйти из него.
Чтобы реализовать ваше стремление помогать другим, участвуйте в социальных проектах, занимайтесь благотворительностью и волонтерством, помогайте нуждающимся.
Если Вы чувствуете, что Вас притягивает всё мистическое, то попробуйте поглубже окунуться в эту тему, почитайте соответствующую литературу, поприсутствуйте на бесплатных семинарах и лекциях. Если почувствуете, что это Ваше, продолжайте изучать эту тему глубже, станьте в ней специалистом и начните помогать людям.
`;
managementPanelItem.appendChild(paragraph);
break;
}
case 13: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(13) Концентрируйте внимание и энергию только на том, что действительно нужно. Записывайте Ваши цели на бумаге и пусть они всегда будут перед глазами. Чем конкретнее они сформулированы, тем лучше. Определите не более трёх задач, которые Вы хотите решить в первую очередь. Планируйте не более трех главных дела на день, причём именно тех, которые приближают Вас к поставленной цели. Научитесь отказывать.
<br><br>Избавляйтесь от всего старого и отжившего, очищайте пространство вокруг Вас от хлама. Ведь цепляясь за старые вещи, мы зачастую возвращаем старые мысли и старые ошибки.
Дрводите все начатые дела до конца, чтобы не испытывать чувство неудовлетворенности, вины и опустошенности.
Все неприятные ситуации рассматривайте как временное явление, не ищите долго причины проблем, а ищите пути их решения. Умейте жить настоящим, проявляйте осмысленность. Чаще расслабляйтесь. Подойдет йога, медитация, комплекс упражнений на дыхательную систему или простое принятие ванны. Научитесь благодарить. В конце каждого дня записывайте минимум 3 вещи, за которые стоит выразить благодарность. Каждый день делайте доброе дело. Представлайте прекрасное будущее, визуализируйте свои желания. Отталкивайте негативные мысли.
<br><br>Развивайте свой творческий потенциал, пробуйте разное, выберите то, что делает Вас счастливым и вдохновляет Вас.
Меняйте регулярно всё в Вашей жизни - от цвета ногтей до цвета обоев.
Устраивайте зелёные дни и дни тишины.
Добавьте адреналина в жизнь - прыгните с парашютом, постойте на гвоздях, устройте сплав по горной речке.
`;
managementPanelItem.appendChild(paragraph);
break;
}
case 14: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(14) Умейте распознавать и выражать свои эмоции. Если не научиться их контролировать и правильно их выражать, можно себя довести до стресса, а свой организм — до болезней. Очень важно заняться своими эмоциями, научиться не держать их в себе, при этом высказывать правильно, без скандалов, истерик и прочих неприятных последствий.
<br><br>Не поддавайтесь плохим привычкам, ведь чем чаще мы поддаемся плохой привычке, чем сильнее она закрепляется и не дает развиться правильной привычке. Именно поэтому Вам нужно одновременно ослаблять плохую и укреплять хорошую привычки. Например, убрать на завтрак белый хлеб, а вместо него начать есть цельно зерновой. Или жареные яйца заменить на овсяную кашу с фруктами.
Очищайте свой организм водой. Для этого нужно и пить заряженную позитивными словами воду. Или же окунаться в святых источниках или в купелях.
Прочтите книгу Колина Типпинга “Радикальное Прощение”, чтобы начать по-новому воспринимать мир и устранить в себе гнев, обиду и стыд.
<br><br>Научитесь медитировать, наполняйте свою душу позитивом, посещая театр, балет, оперу, концерты классической музыки, читайте классику мировой литературы, изучайте живопись, можете попробовать рисовать сами. Получайте знания о разных сферах жизни.
Перейдите на правильное питание, ограничьте употребление быстрых углеводов, увеличьте количество сложных, овощей, растительных жиров и белка. В Вашем рационе должно быть больше клетчатки и зелени, чистой питьевой воды. Пробуйте суперфуды - семена Чиа, ягоды Годжи и т.п.
Наполняйте свой организм энергией от природы и стихии воды. Выезжайте за город, проводите выходные на туристических базах, в палатках в лесу. Изучайте травничество.
`;
managementPanelItem.appendChild(paragraph);
break;
}
case 15: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(15) Примите мир таким, какой он есть, без осуждения и негатива. Не замечайте в людях недостатки, не завидуйте их достоинствам, радуйтесь простым вещам, не падайте духом при сложных жизненных обстоятельствах, помогайте слабым. Чтобы стать все более осознанным, постичь свою духовную природу, развиваться духовно, Вам важно помнить о том, что Вселенная устроена гармонично. Эта гармония поддерживается особыми законами. Изучите эти законы и живите, соблюдая их.
<br><br>Поступайте с людьми так же, как Вы хотели бы, что бы поступали с Вами. Для этого боритесь со своими негативными эмоциями, работайте над цинизмом, эгоизмом, внутренней агрессией и сарказмом. Не манипулируйте людьми, это отягощает Вашу карму. Стремитесь к чистоте и здоровью тела и души. Для этого очищайте физическое тело (устраивайте разгрузочные дни, практикуйте голодание, детокс-дни) и душу (работайте с психологом). Соблюдайте посты и тем самым укрепляйте свой дух.
Учитесь расслабляться, освойте медитацию, занимайтесь йогой.
<br><br>Раскройте свою сексуальную энергию, занимайтесь сексом в удовольствие, воплощайте в жизнь свои сексуальные фантазии. Балуйте себя красивым эротичным бельём.
`;
managementPanelItem.appendChild(paragraph);
break;
}
case 16: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(16) Живите здесь и сейчас, цените обычные минуты Вашей жизни. Время для счастья - сейчас, время действовать - сейчас, время любить - сейчас, время пробовать новое - сейчас, время идти вперёд - сейчас. Осознайте, что жизнь всегда происходит именно сейчас. Не цепляйтесь за прошлое и не витайте в местах о будущем.
<br><br>Приучите себя избавляться от старых вещей, от всего лишнего, тем самым Вы освободите место для нового с новой чистой энергетикой.
Работайте с негативными эмоциями, научитесь их принимать, контролировать и управлять ими. Важно не держать всё в себе, а грамотно выплёскивать, не нанося вред окружающим.
Устраивайте дни без соцсетей. В эти дни возьмите и сходите в зоопарк или аквапарк, встретьтесь с друзьями и сходите вместе в баню, навестите бабушку и проведите время с ней, почитайте новую книгу или найдите школу танцев рядом с Вашим домом и посетите первый пробный урок или начните изучать дизайн.
<br><br>Боритесь с негативным мышлением. Прочтите книгу доктора Джо Диспенза ""Сила подсознания или Как изменить жизнь за 4 недели"" и тогда всё встанет на свои места.
Берегите своё тело, заботьтесь о нём, занимайтесь спортом, правильно питайтесь, давайте ему полноценно отдыхать и расслабляться.
Внутри Вас скрыта энергия доброты и любви к близким людям, не держите её внутри себя, раскрывайте и мягким светом направляйте на тех, кого любите и тех, кто любит Вас.
`;
managementPanelItem.appendChild(paragraph);
break;
}
case 17: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(17) Чувствуйте себя особенным человеком, то есть неповторимым, уникальным и прекрасным. Ощущайте себя успешным, интересным и публичным, и ведите такую жизнь, которая соответствует Вашей высокой самооценке (да, да, самооценка у Вас непременно должна быть высокой, а если нет, то как можно быстрее поработайте над ней). Говорите так, будто абсолютно каждое Ваше слово интересно, идите так, будто каждый Ваш шаг снимают камеры. Следите за своим внешним видом. Выделяйте место для отдыха. Любите и цените публичность, активно ведите страницу в социальной сети, делитесь частичкой своей жизни (снимайте сториз, выходите в прямые эфиры, непрерывно общайтесь со своими подписчиками). Усердно работайте над своим образом. В результате этой целенаправленной работы у Вас должен сформироваться гармоничный гардероб и лаконичные манеры, позволяющие поддерживать нужный имидж. Не бойтесь быть ярким, запоминающимся и производящим впечатлением, не бойтесь экспериментов.
<br><br>Научитесь делать то, что хочется, а не переступайте через себя. Не делайте того, что не хочется. Поймите, что Вам нравится, а что нет. Вставая с утра, Вы должны испытывать радость от того, что впереди рабочий день. Найдите творчество по душе, развивайтесь ч нём.
Прислушивайтесь к своему сердцу, к своему внутреннему голосу, они не обманут. Развивайте интуицию, она поможет избежать многих проблем, неприятностей и опасных ситуаций.
Не забывайте, что всё, что Вы имеете - это дар Божий, а Вы - проводник Божественных, творческих и исцеляющих сил.
`;
managementPanelItem.appendChild(paragraph);
break;
}
case 18: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(18) Выпишите максимально подробный список страхов. Пишите абсолютно все Ваши страхи, которые вспомните. Чем больше будет список, тем лучше.  Выберите тот страх, который актуален на сегодняшний момент. И начинайте работать с ним. С остальными будете работать позже. Если страх слишком сильный и реально наносит вред качеству Вашей жизни, то обратитесь к психологу. Если страх не слишком Вас внутренне сковывает, то техники борьбы с таким страхом Вы можете найти в Интернете. Главное, проработать страхи и полностью от них избавится.
Развивайте и оттачивайте свою интуицию. Изучите законы мироздания и особенно уделите внимание закону притяжения Вселенной, который гласит, что подобное притягивает подобное. Именно поэтому важно избавиться от отрицательных мыслей и мыслить позитивно. Познакомиться глубже с законами мироздания и понять их суть вам помогут книги Ронды Берн “Секрет” и Майкла Роуча “Кармический менеджмент: эффект бумеранга в бизнесе и жизни”.
Следите за фазами Луны, Вы можете найти множество приложений, которые помогут Вам в этом. Наблюдайте за своим физическим и душевным состоянием в каждую из фаз Луны, записывайте свои наблюдения в дневник. Выявите закономерность в Вашем самочувствии и впоследствии скорректируйте свой график и режим, исходя из фаз Луны.
<br><br>Живите здесь и сейчас, в этом конкретном моменте, не нужно слишком много думать о будущем, анализировать и оценивать прошлое. В течение дня выполняйте короткие “медитации-передышки”, которые помогут почувствовать этот момент, сконцентрироваться на нём, понять свои мысли, чувства и ощущения в эту секунду. Во время такой “передышки” спросите себя: “Что я сейчас чувствую?”, “Мне сейчас хорошо или мне сейчас плохо?”, “Я счастлив?”, “Что я хочу сейчас и что я хочу в будущем?”.  Ощутите себя.
Доверяйте людям и сами будьте тем, кому можно доверять. Будьте искренне всегда, открыты, честны.
Взаимодействуйте со стихией воды, проводите больше время у водоёмов, отдыхайте на море или просто выбирайтесь на речку в выходные. Соблюдайте питьевой режим, Вы должны употреблять в достатке чистую питьевую воду, возможно заряженную словами или ионами серебра.
Визуализируйте свои желания, составляя карты желаний.
Развивайте свои экстрасенсорные способности, изучайте карты таро и руны,  но обходите стороной тёмную магию.
`;
managementPanelItem.appendChild(paragraph);
break;
}
case 19: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(19) Серьёзно займитесь раскрытием своего творческого потенциала. Прислушайтесь к себе, к своим желаниям, посмотрите, чем в свободное время занимаются родственники, друзья, коллеги. Выберите из этого то, что откликается Вами и попробуйте неделю этим позаниматься. Недели будет достаточно, чтобы понять Ваше это или нет. Если понимаете, что это не Ваше, пробуйте следующее. Но обязательно найдите творческое занятие по душе и уделяйте этому делу много времени. Это поможет вам направить Вашу энергию в мирное русло, и Вам и Вашему окружению станет легче и лучше.
Боритесь со своими самыми негативными эмоциями. Если Вы почувствовали накатывающие гнев или ярость, поменяйте положение тела. Например, если сидели, встаньте, если стояли, сядьте, поприседайте, поднимите стул, сделайте глубокий выдох, задержите дыхание, вдохните еще. Вам важно сделать сброс негативной энергии, чтобы она не причинила вред Вам и Вашим близким. Если приступы ярости и гнева повторяются регулярно, Вы не можете их контролировать и от этого страдают Ваши близкие люди, то поработайте с психологом.
<br><br>Реализуйте свои организаторские способности, занимайтесь активно общественной деятельностью, беря на себя руководящие обязанности. Вы это можете и именно это ваш путь. Участвуйте в социальных проектах, волонтёрских движениях, активно занимайтесь благотворительностью, регулярно перечисляя часть своего дохода на благие цели.
Взаимодействуйте с энергией Солнца. Когда есть возможность, встречайте рассвет и проговаривать на рассвете свои цели. Рассвет – это самое волшебное время для Вас. Прочитайте книгу Хэл Элрод “Магия утра” о том, как первый час дня определяет Ваш успех.
Развивайтесь духовно. Благодарите мир за то, что имеете, и это увеличится. А если Вы концентрируете своё внимание на том, чего у Вас нет, то Вам всегда не будет хватать. Вместо того, чтобы просить у высших сил что-то, просто помолитесь за то, что у вас есть сейчас.
<br><br>Занимайтесь активно спортом. Пусть он станет нормой Вашей жизни. Спорт улучшит самочувствие, поможет справляться со стрессом и обуздает Вашу внутреннюю энергию, давая возможность её безболезненно сбрасывать.
Работайте над своей речью, развивайте ораторские способности, чтобы уметь вдохновлять своими идеями и вести за собой людей, как в прямом, так и переносном смысле. Практикуйте убедительные публичные выступления. Можно начать с малого, например, попробуйте выходить в прямые эфиры в соцсетях.
`;
managementPanelItem.appendChild(paragraph);
break;
}
case 20: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(20) Развивайте Вашу духовность и Ваш разум, читая Библию и другие вдохновляющие книги. Каждый день молитесь вслух и просто мысленно, каждый день медитируйте. Думайте о Боге как о самом мудром, добром, сострадательном и любящем Отце, наставнике. Ваша предназначение - это служение Богу, связь с ним, с Ангелами, со всем небесным миром. Не прерывайте и поддерживайте эту связь.
Изучайте и практикуйте уроки по медитации, и Вы узнаете все аспекты духовного пути. Развивайте интуицию и способности к ясно знанию.
<br><br>Займитесь исцелением родовой кармы. Пересмотрите свои взгляды на жизнь, наполните ее добром и искорените зло, относитесь к миру и окружающим так, как Вам бы хотелось, чтобы они относились к вам. Нужно сделать так, чтобы хорошие поступки перевесили все то плохое, что сделали или случилось с членами Вашего рода. За счет добрых дел перевесьте чашу негатива, которую собрали ваши предки. Но такая работа с кармой должна стать образом жизни, и не только вашей, но и ваших родных и близких. Поэтому разговаривайте с Вашими родными о карме, об энергиях добра и зла, о законах мироздания. Прочтите сами и порекомендуйте родственникам книги Колина Типпинга “Радикальное Прощение”, Ронды Берн “Секрет” и книгу доктора Джо Диспенза ""Сила подсознания или Как изменить жизнь за 4 недели"". Изучите практику поклонов и выполняйте её в своей жизни, научите её своих близких. Изучите семейную историю, составьте генеалогическое древо, станьте хранителем семейных традиций и ценностей. Будьте с семьёй. Прочитайте книгу Майкла Ньютона ""Путешествие души"". Она поможет Вам отпускать ушедших в другой мир родственников, и Вы по-иному взглянете на многие вещи.
Живите в этом мире как духовный и вдумчивый человек. Читайте книги, общайтесь с людьми, делайте все возможное, чтобы быть полезным, и будьте настолько добры, насколько можете. Откажитесь от всего плохого, злого, греховного и примите всё хорошее, святое, праведное. Научитесь терпимости, научитесь прощать, научитесь принять человека таким, какой он есть, постараюсь понять, почему человек стал таким, какой он есть. Живите, делая то, что чисто и правильно. Будьте благодарны. Извинитесь перед всеми, кого обидел, и разрешите конфликты, которые есть.
`;
managementPanelItem.appendChild(paragraph);
break;
}
case 21: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(21) Боритесь с узостью мышления, не бойтесь выходить за рамки и из зоны комфорта. Поборите страх перед неизведанным, страх перемен, именно он заставляет Вас размышлять узко и прямолинейно. Выявите свои страхи и признайтесь себе в их существовании: ""Да, мне страшно пробовать новое, потому что я боюсь, что ничего не получится, боюсь, что обо мне подумают знакомые…."" и т. для. Определите, чего Вы боитесь больше всего, какие сомнения мешают Вам действовать. Научитесь смотреть страхам в глаза и их будет легче преодолеть. Поймите, что Ваш страх - это всего лишь неправильная установка, которая Вам мешает добиваться успеха. После того, как проработаете свои страхи, научитесь правильно ставить цели. Записывайте все цели письменно, и сделайте так, чтобы они всегда были у Вас перед глазами. Разбейте большую цель на микро цели и выполняйте их постепенно, шаг за шагом. Важно всегда двигаться вперёд. Важно всегда учиться чему-то новому, чтобы мозг работал, жизнь становилась интереснее, расширялось мировосприятие, развивались Ваши сильные и слабые стороны. Идите в ногу со временем. Участвуйте в глобальных проектах, например, по спасению нашей планеты, защите экологии, спасению редких видов животных, сохранению памятников культуры. Не бойтесь мечтать и строить большие планы, именно большие. Путешествуйте по миру, знакомьтесь с новыми странами, нациями, культурами, религиями. Изучайте иностранные языки, чтобы свободнее себя чувствовать в путешествиях. Увидьте и примите мир таким, какой он есть. Примите себя, как часть этого мира.
<br><br>Не забывайте о своей связи с Богом. Он прислал Вас на эту землю, что бы Вы несли мир, покой и умиротворение другим людям.
`;
managementPanelItem.appendChild(paragraph);
break;
}
case 22: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(22) Живите так, как Вы хотите. Избавьтесь от внутренних барьеров, ограничений и мыслей по типу ""Это невозможно"" или ""У меня не получится"". Не зацикливайтесь на каком-то одном отрезке жизни, переживая его раз за разом. Отпустите своё прошлое. Прекратите в себе сомневаться. Ставьте перед собой большие и амбициозные цели. Не ориентируйтесь на авторитеты, не живите по кем-то установленным правилам и шаблонам. Помните, что у Вас СВОЯ жизнь и СВОЙ путь. Перестаньте заниматься самокритикой, не стремитесь к совершенству, не оценивайте поступки других.
Поборите все свои страхи. Хороший путь справиться со страхами, это задать себе вопрос: "" А кто в этом мире может меня осуждать?"".  Правильный ответ ""никто"". Забудьте о чужом мнении о Вас, его попросту нет. Вы абсолютно свободны от мнения окружающих. Запомните, что Вы не совершаете ошибки, Вы приобретаете опыт. А опыта бояться нельзя.
<br><br>Будьте оптимистом, находитесь в постоянном состоянии позитивного отношения к жизни, верьте в лучшее. Заряжайте позитивом не только себя, но и окружающих. Будьте лёгким в общении и открытым для других людей. Чаще общайтесь и играйте с детьми. Общайтесь со своим внутренним ребёнком, дайте ему вволю проявить себя - смейтесь, веселитесь, удивляйтесь, радуйтесь, постигайте новое, займитесь чем-то интересным. Избавьтесь от токсичных людей в своём окружении. Много путешествуйте.
`;
managementPanelItem.appendChild(paragraph);
break;
}}
})
}
managementPanelContentCreate([A,B,X]);
const parentsPanelItem=document.querySelector('#parents_panel');
function parentsPanelContentCreate(numbers, status){
const uniqNumbers=new Set(numbers);
if(status===1){
const text=document.createElement('p');
text.innerHTML='Родовые программы по мужской линии';
text.style.fontWeight='700';
parentsPanelItem.appendChild(text);
Array.from(uniqNumbers).map((item)=> {
switch (item){
case 1: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(1) Эта энергия говорит о том, что в Вашем роду были те, кто, имея лидерские
качества, не принимал и не признавал их. Это были новаторы от рождения с сильным характером, целеустремленные и способные достигать всех своих целей. Они обладали не только сильным характером, но и сильной энергетикой. Есть вероятность, что люди обладали магическими и целительскими способностями. Но по каким-то причинам они отгородились от этих своих качеств, боялись поверить в них, раскрыть их, боялись идти вперед. Хотя именно это и было им суждено сделать. Они должны были идти вперёд и открывать всё новое, неизведанное и неизученное ранее, но именно страх новизны заставил их свернуть с пути, предначертанного им Богом. Вероятно, они могли испугаться своих магических способностей, поэтому просто запечатали их в себе. И теперь Вам нужно сделать всё то, что не сделали Ваши предки, наверстать всё упущенное ими. Вам нужно идти туда, где Вы сможете проявить себя как лидера, туда, где Вы будете первым. Важно именно осуществлять какую-либо новую деятельность, разрабатывать новые технологии и разработки, воплощать в жизнь новые идеи и решения. Важно делать то, что никто и никогда до Вас не делал. Вы должны стать первопроходцем и первооткрывателем в какой-то сфере либо отрасли. Вам нужно это делать прежде всего для самого себя. Вам не нужно бояться брать на себя ответственность, не отказываться, если кто-то захочет сделать Вас своим лидером. Для Вас принципиально важно общаться с людьми, которые выше Вас по уровню знаний и образования, дохода и достижений, которые уже реализовали и продолжают реализовывать программы, меняющие жизнь. Именно они будут Вас мотивировать на Ваши достижения, делясь своим потенциалом и неиссякаемой энергией. И вы сможете сделать квантовый скачок вперёд.
<br><br>Кроме того, если Вы чувствуете в себе какие-то магические, целительские, экстрасенсорные способности, но не бойтесь их развивать. Как для себя лично, так и для работы с другими людьми. `;
parentsPanelItem.appendChild(paragraph);
break;
}
case 2: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(2) Это энергия говорит о том, что в Вашем роду были люди с очень тяжёлым характером и они часто не могли найти общий язык с другими людьми. С их стороны было недоверие к партнеру и страх перед предательством. Но не доверяли они не только партнёру, но в целом людям и всему окружающему их миру. В их отношениях с внешним миром было много дисгармонии, они были закрыты от него. Постоянно находились в конфликтах с другими людьми. Могли быть достаточно лицемерными, то есть лично человеку говорить одно, а думать и говорить другим людям совершенно другое. При всём этом природа наделила их незаурядными дипломатическим способностями, но они ими не пользовались.
<br><br>¬Вам это говорит о том, что нужно общаться с людьми. Если Вы не умеете этого делать, то нужно учиться этому. Ведь общение с людьми – важная часть нашей жизни. Вы должны побороть то, что мешает Вам полноценно общаться с другими людьми. Это могут быть застенчивость, страх сказать глупость или быть неправильно понятым, боязнь высказывать свое мнение, низкая самооценка. Вы должны быть в постоянном контакте, в постоянном диалоге с окружающими. Искренне интересуйтесь другими людьми и они будут отвечать Вам взаимностью. Умейте слушать. Вы должны открыться внешнему миру. Необходимо понять, что в любых отношениях важно общение, это позволит вам избежать многих проблем. Не бойтесь заводить новые знакомства и поддерживать связь с новыми людьми. Общайтесь везде - дома, на работе, в любом другом месте. Вместе с тем всегда будьте в этом общении искренними и бескорыстными. Кроме того, чтобы быть успешным, Вам необходимо быть в единстве с собой, в гармонии со своим внутренним миром. Не забывайте использовать свои дипломатические качества. Соблюдая все эти рекомендации, Вы всегда будете счастливы.`;
parentsPanelItem.appendChild(paragraph);
break;
}
case 3: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(3) Если у Вас встретилась такая энергия, то в Вашем роду была женщина, которая не смогла исполнить своё истинно женское предназначение.
<br><br>По каналам мужчин - Для мужчин это означает, что они могут быть довольно мягкими, податливыми, уступчивыми, послушными, не умеющими самостоятельно принимать решения, отвечать за свои поступки; прячут голову в песок при малейших трудностях, не могут их преодолевать, боятся любой ответственности. При всём при этом у них прекрасные отношения с женщинами. У них много подруг, знакомых, приятельниц, которые охотно с ним общаются, нередко делясь самым сокровенным. То есть все эти женщины видят в нём родственную душу. Кроме этого, такие мужчины очень сильно привязаны к матери, у них очень близкие отношения. Часто они делают всё по её советам и указаниям. А временами это даже походит на зависимость от неё, подчинение её воли.
<br><br>Здесь же может быть и обратный вариант, при котором мужчины имели холодные отношения с женщинами, не могли проявлять по отношению к ним уважение и заботу, могли навредить им.
<br><br>В любом случае наличие этой энергии говорит о том, что мужчина должен сформировать в себе мужское начало, развить в себе мужские качества. Мужчина должен проявлять упорство, решительность, организованность, бесстрашие, активность. По отношению к женщинам он должен быть щедрым, великодушным, преданным и мудрым.
<br><br>По каналам женщин - Наличие этой энергии говорит, что женщины зачастую обладали не самыми лучшими мужскими качествами - деспотичностью и чёрствостью, грубостью и резкостью, вспыльчивостью и жестокостью. Всё это проявлялось и в сторону других женщин и в сторону мужчин, которых они вдобавок ко всему принижали, подавляли, пытались подчинить своей воли. Возможно они стали такими после предательств близких людей. Какими бы причины не были, эти женщины несли всю свою агрессию внутрь семьи, не желая реализовывать себя за её пределами. В семье они брали на себя все мужские обязанности, изматывая и себя и окружающих. Нередко ситуация усугублялась с появлением детей. Либо наоборот они становились ещё злее, когда у них не получилось стать матерью или потеряв ребёнка.
<br><br>В этом случае женщине нужно питать своё женское начало, занимаясь творчеством и исконно женскими занятиями (вышивание, вязание). Необходимо развивать в себе такие качества как доброту, вежливость, обаяние, открытость, умение прощать, естественность и искренность. `;
parentsPanelItem.appendChild(paragraph);
break;
}
case 4: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(4) Наличие этой энергии означает, что в роду были мужчины, обладающие властью, но использовавшие эту власть не во благо, а во вред тем, кто находился рядом с ними - это могут быть и подчинённые и члены семьи.  Мужчины, страдая очевидной тиранией, угнетали, подавляли, загоняли в установленные ими рамки окружающих их людей. Любили и в конечном итоге привыкли проявлять исключительно негативные черты характера - высокомерие, эгоизм, неспособность любить, жестокость, грубость, равнодушие, гнев, отсутствие уважения к другим.  Могли запросто втоптать в грязь любого, применить насилие, как к посторонним, так и к близким.
<br><br>Для женщин наличие этой энергии говорит о необходимо через обретение и развитие внутренней силы реализовать себя в чём-то важном.
<br><br>Для мужчин это говорит о том, что нужно направить свою силу и весь свой потенциал на развитие и реализацию себя, а не тратить свою энергию на выяснение отношений с другими людьми. Сосредоточьтесь на себе. `;
parentsPanelItem.appendChild(paragraph);
break;
}
case 5: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(5) Если эта энергия идет по роду на мужчинах, значит, что мужчины нарушали законы, как установленные обществом и государством, так и человеческие. Они могли воровать, убивать, вести незаконную деятельность, практиковать насилие в семье, быть плохими мужьями и отцами.
<br><br>Если эта энергия по роду на женщинах, то значит в роду были женщины, на которых обрушилось какое-то горе, например она могла потерять ребёнка или любимого мужчину. Могло вообще не быть ничего хорошего в жизни - семья разваливалась, имелись проблемы с законом, беспорядочные отношения. Либо в роду были люди, которые обладали мощным интеллектом и глубокими знаниями, но не передали эти знания тем, кому они предназначались. Возможно, им мешали это делать, а возможно, они сами не хотели это делать, так не верили в ценность и значимость этих знаний, а возможно боялись этими знаниями навредить, полагая, что они будут использоваться во вред. Большой объём знаний накапливался и разрушал их самих, и людей, которых их окружали. Вместо обучения, они поучали, навязывали свои взгляды, критиковали.
<br><br>Зная о наличии этой энергии, Вы должны постоянно развиваться и учиться. Но и этого будет недостаточно. Самое главное, Вы должны делиться своими знаниями с окружающими, с теми, кто в них нуждается. Не нужно судить об уровне и значимости Ваших знаний, важно просто передавать их.  `;
parentsPanelItem.appendChild(paragraph);
break;
}
case 6: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(6) Если энергия стоит по роду у женщин, то в роду была женщина, которая пережила несчастную безответную любовь, испытала боль разлуки с любимым, но и сама могла стать причиной боли у противоположного пола, разбив какому-то мужчине сердце.
<br><br>Если энергия стоит по роду у мужчин, то кто-то из мужчин не мог любить, либо же наоборот не любили его, предавал либо предавали его, заставлял женщину страдать либо страдал сам, не имел серьёзных отношений, самоутверждался за счёт большого количества партнёрш, жил на две семьи. Вполне возможно, что в роду были люди, которые не любили и не принимали себя, не ценили, занимались самоедством и самоуничтожением.
<br><br>Наличие этой энергии говорит о том, что нужно уметь любить и уметь уважать. Уметь любить себя, уметь любить других, не бояться любви, не закрываться.  Уважать и себя и других. Важно научиться доверять другим людям, научиться любить, не требуя ничего взамен, искренне и бескорыстно. Если речь идёт о любви к себе, то тут подразумевается полное принятие себя, и внешне и внутренне, забота о себе, о своей физической оболочке и о своей душе. Необходимо полюбить и весь мир и открыться ему. `;
parentsPanelItem.appendChild(paragraph);
break;
}
case 7: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(7) Эта энергия означает поражение и тяжёлые потери на войне, то есть военные действия, в которых человек из Вашего рода проиграл, пострадал, не смог выйти победителем. Могут быть и менее приземлённые трактовки - человек пострадал в драке, ссоре, ДТП, ничего абсолютно не добился в этой жизни, брался за 100 дел одновременно, но не заканчивал в итоге ни одного, метался из стороны в сторону, не мог определить и понять, что ему нужно, был недисциплинированным, непунктуальным, необязательным, не оставил на этой земле после себя абсолютно ничего, что жил. что не жил.
<br><br>Для Вас жизненно необходимо развивать в себе самодисциплину, самоорганизацию, умение планировать дела, ответственность, исполнительность.  Для Вас принесёт огромную пользу установление режима дня, режима труда и отдыха, режима питания. Всё в Вашей жизни должно быть структурировано и подчинено логике. Вы должны ставить перед собой цели, но тут важно, чтобы эти цели были реальными. Важно уметь и работать, и отдыхать. `;
parentsPanelItem.appendChild(paragraph);
break;
}
case 8: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(8) Восьмая энергия говорит о том, что кто-то из Ваших предков нарушил закон и был наказан. Был человеком фальшивым, непорядочным, нечестным. Были недоволен жизнью и людьми, которые ее населяют. Критиковал всех и вся, обвиняя в своих бедах и неприятностях. Про него можно сказать “в чужом глазу соринку видим, в своем бревна не замечаем”. Человек активно критиковал чужие недостатки, но абсолютно не замечал такие же в своём характере.
<br><br>
Вам ни в коем случае нельзя переходить границу закона, потому что даже незначительные правонарушения могут повлечь за собой серьезнейшие проблемы для Вас. Вы должны быть примером законопослушного гражданина, иначе при нарушении Вами общеустановленных законов Вы будете быстро наказаны высшими силами. Вы должны знать и понимать законы Вселенной, и законы, установленные людьми. Вы должны понимать, что одно событие или поступок порождает другое событие или поступок. Не должны забывать и о законе бумеранга.`;
parentsPanelItem.appendChild(paragraph);
break;
}
case 9: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(9) Эта энергия указывает на то, что некий человек в Вашем роду роду имел несчастье быть одиноким, сильно страдал от этого. Это могли быть и отшельники, но их отшельничество причиняло им очень болезненные и тяжелые страданиями. В целом, девятка означает карму одиночества. Но это мог быть и просто знающий и мудрый человек, которому эти знания и мудрость были даны свыше. Он мог посмотреть на человека и рассказать о нём всё. Он понимал, как устроен этот мир, и как устроены люди.  К нему обращались за советом, за откровением, за просветлением. При этом он не афишировал своими способностями ибо боялся непринятия, порицания и упрёков. Ведя закрытый образ жизни, он отказался от материального во имя духовной жизни, и вероятно сам принял решение уединиться вдали от людей. Но есть и кармический хвост 18/9/9 – это ведьмовская карма, означающая, что человек, обладал незаурядными способностями, не передал их из-за страха, что кто-то, когда получит эти знания, обойдёт его. Либо использовал эти способности во вред людям.
<br><br>Как сказал Бернард Шоу “Уметь выносить одиночество и получать от него удовольствие – великий дар.”  И Вы должны научиться этому. Ведь именно в одиночестве Вы осознаете всю суть и смысл жизни. Ведь именно в одиночестве Вам придут открытия, способные изменить не только Вашу жизнь. Развивайтесь духовно, получайте новые знания, наполняйте свою душу и сердце. Делитесь всем этим с другими с людьми. Но при этом не забывайте и о материальном. Найдите баланс между материальным и духовном. `;
parentsPanelItem.appendChild(paragraph);
break;
}
case 10: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(10) Эта энергия указывает на очень невезучего человека в Вашем роду. Все обстоятельства всегда складывались против него, ветер всегда дул не в ту сторону. От этого человека в большинстве своём ничего не зависело, он был заложником ситуаций, и никак не мог повлиять на развитие событий. Либо мог быть просто пессимистом, который не верил в хороший исход, видел во всём только проявления плохого, боялся других людей, боялся этого мира, боялся жить, ведь каждый день он ожидал чего-то плохого. Никому не верил и не доверял.
<br><br>В этом случае самым главным для Вас будет научиться доверять этому миру, людям, смотреть с оптимизмом в будущее. Поверить, что даже вслед за самой тёмной ночью придёт день и выйдет солнце. Принять, что чёрная полоса обязательно сменится белой, что жизнь не состоит только из плохого, что в ней есть много светлого, доброго, чистого, хорошего. Откройтесь этому миру и удача обязательно будет на Вашей стороне.`;
parentsPanelItem.appendChild(paragraph);
break;
}
case 11: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(11) Эта энергия означает, что в Вашем роду были люди, наделённые силой, но в какой-то момент начали использовать эту силу во вред другим людям, и даже во вред себе, разрушая всё вокруг. Например, применяли физическую силу в семье. Либо же были упрямыми трудоголиками, которые работали до изнеможения, не замечая ничего вокруг. Эти люди могли быть наделены не только физической силой, но и обладать мощной энергетикой. И этой энергетикой они притягивали негатив в свою жизнь, потому что на много в этой жизни они смотрели по-недоброму, во многом видели плохое, были очень язвительными и не уважали других.
<br><br>Надо запомнить, что мысли, которые появляются в Вашей голове, очень быстро могут материализоваться, а поэтому очень важно изменить мышление в позитивную сторону. Думайте о хорошем и это хорошее появится в Вашей жизни. Вы можете много работать. Но при этом во-первых, нужно уметь отдыхать и расслабляться, а во-вторых, работая, не забывать о семье. Отдыхать Вы должны и физически и морально. Самый лучший отдых для Вас - это отправиться в путешествие со своей семьей. Не забывайте заниматься спортом. Научитесь медитировать. Направьте Вашу силу в мирное русло.`;
parentsPanelItem.appendChild(paragraph);
break;
}
case 12: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(12) Эта энергия означает повешенного в роду. В прямом смысле слова. Но можно трактовать эту энергию и иначе. Например, был человек, на шею которого сели и поехали, человек, который жил жизнью других, решая все их проблемы, и не умеющий сказать нет, не думающий о себе.  Либо был человек, пострадавший физически(инвалид), морально или финансово.  При любом варианте это был человек, мыслящий иначе, чем все остальные, у него были необычные взгляды на жизнь, принципы и установки. Помогал много людям, бескорыстно делал работу, за которую мог бы брать деньги, но не делал этого, обесценивал и себя, и свой труд.
<br><br>Помогайте, но только не в ущерб себе. Помогайте, когда Вы действительно можете помочь, когда Вы этого хотите. Делайте этого из желания, а не из-за страха, что на Вас обидятся, если Вы откажете. Помогайте, если вас об этом просят.  Помогайте, если тот кому вы помогаете, готов большую часть действий (именно действий) делать сам и ему это правда нужна только помощь, а не нужно всё сделать за него. Применяйте в помощи правило Парето: 80% действий делает сам человек (физических, моральных, эмоциональных) и лишь 20% вашей помощи. Помогайте, только если сами в ресурсе. Если вы сами устали, раздражены, обессилены и недовольны жизнью, то ваша помощь будет через преодоление себя и, скорее всего, будет Вас разрушать. Ведь если у самого ноги сломаны, разве другого на себе донесешь?
<br><br>Не бойтесь иного взгляда на жизнь. Это Ваши мысли, Ваше мировоззрение и Вы имеете на них полное право.`;
parentsPanelItem.appendChild(paragraph);
break;
}
case 13: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(13) Каждый человек приходит в этот мир, чтобы выполнить определенную миссию, дело всей жизни, которое у каждого свое. Но кто-то не успевает это сделать, потому что не прожил свою жизнь до конца (погиб, умер насильственной смертью и т.д.). Эта энергия показывает, что именно такой человек был в Вашем роду - человек, который не смог выполнить предначертанное ему по причине ранней серии.  Потомкам этого человека нужно прожить жизнь за него, завершить цикл и исцелить ситуацию, иначе в роду будут продолжаться преждевременные смерти и трагедии. Этот человек своим преждевременных уходом закрыл своим потомкам дверь для всего нового. Впоследствии у его потомков были возможностей для смены страны, смены деятельности, смены образа жизни, они могли выйти на новый уровень жизни, но ничего из этого так и не произошло, помешали случайно вмешавшиеся обстоятельства или сами люди осознанно отказались от перемен. Они могли замечать, что как только соприкасались с кем-то или чем-то новым, то начинало всё рушиться. Также люди не могли отказываться от старых вещей, думая, что это когда-нибудь пригодится, тем самым захламляли пространство вокруг себя. А захламляя пространство вокруг себя, они захламляют и свою энергетику.
<br><br>Что Вам нужно делать?  Заходить во все двери, которые открываются на Вашем пути. Использовать все возможности, которые Вам представляются. Не испытывать страх перед всем новым. Пробовать разные сферы деятельности.  Не стоять на месте. Не бояться смены обстановки вокруг - это могут быть и переезды внутри страны, и переезды в другую страну. Не бойтесь мыслить иначе, чем Ваше окружении. Развивайтесь, меняйтесь, преображайтесь. Вы можете менять не только себя и свою жизнь, но Вы можете менять и других и их жизни. Если в жизни близкого человека под Вашим воздействием начали происходить события, но Вы считаете эти события негативными, то просто подождите, это только начало изменений, а дальше всё будет меняться исключительно в положительную сторону. Не бойтесь отпускать из Вашей жизни всё ненужное - от людей до вещей. Не бойтесь расставаться со старым. Всё старое несёт в себе негативную энергетику, которая отталкивает от себя хорошее новое.`;
parentsPanelItem.appendChild(paragraph);
break;
}
case 14: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(14) У Вас в роду были очень творческие люди, но они сомневались в своём таланте, не смогли донести своё творчество людям. Это были люди с тонкой душевной организацией, образованные и высококультурные личности, с утонченным внутренним миром. Их легко можно было обидеть, ранить душу. Они отлично разбирались в искусстве, литературе, музыке. Они были одухотворены и наполнены внутренне. Они обострённо, возвышенно воспринимали мир, проявляли гибкий, тонкий ум, развитый, изысканный вкус, обладали чувствительной нервной организацией. Они были ценителями прекрасного. Прекрасное они находили не только в классических общепризнанных произведениях искусства и культурных ценностях, но и в обыденной повседневности. У них было большое открытое сердце. Они могли прекрасно раскрыть себя в искусстве, но по своим внутренним или внешним причинам не сделали этого.
<br><br>Так же эта энергия говорит о том, что в Вашем роду были люди, обладающие целительскими способностями, которые могли лечить людей с помощью трав и других народных средств. Но полноценно они не смогли открыть свои способности, так как боялись осуждения.
<br><br>Помимо всего прочего эта энергия говорит о том, что в Вашем роду были люди, зависимые от алкоголя или каких-то других запрещённых средств.
<br><br>Что Вам нужно сделать? Раскройте свой творческий потенциал, а так же научитесь зарабатывать на нем деньги, сделайте его популярным (это должно быть что-то, приносящее пользу другим людям).  Не нужно усыплять тягу к прекрасному, к искусству. Каким бы Вы ни были ранимым и чувствительным человек с тонкой душой, Вы должны использовать эти качества себе на пользу, а не во вред. Если Вы может почувствовать всю красоту и мощь классической музыки, разглядеть в обыденном красоту, то стоит эти качества научиться использовать во благо себе и другим.  Перестаньте осуждать людей, имеющих какие-либо зависимости, примите их, поймите, что их зависимость - это болезнь, требующая лечения, а не упрёков. Помогите им побороть свою зависимость. Вы можете помочь им преодолеть свою зависимость, не только оказывая моральную или материальную поддержку, но и применив свои целительские способности. Вы и в целом должны развивать Ваши целительские способности, углубиться в изучение лекарственных растений и других натуральных средств лечения. `;
parentsPanelItem.appendChild(paragraph);
break;
}
case 15: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(15) Наличие этой энергии говорит о том, что в Вашем роду был человек, склонный к физическому насилию в адрес других людей, а так же к осуществлению других противоправных действий. Этот человек просто не в состоянии был справиться со своей агрессией, испытывая алкогольную или наркотическую зависимость. Либо же люди в Вашем роду любили использовать сарказм для демонстрации недовольства или же просто с целью обидеть, оскорбить и унизить другого человека, высмеять его или высказать презрение. Общение с ними было очень неприятным процессом, поэтому они практически не имели друзей или просто даже хороших знакомых. Многие люди их избегали. Кроме того, эти люди могли быть провокаторами. Они пытались вывести на эмоции других людей, чтобы в порыве этих эмоций другие люди предприняли какие-то резкие, необдуманные действия, оголив свои негативные стороны. Плюс ко всему они были очень привязаны к материальным ценностям, любили роскошь и богатство.
<br><br>Вам нужно освободиться от сарказма, если он является Вашим частым спутником. Говорить с людьми прямо, без злорадства и намёков. Старайтесь никогда не травмировать ранимого человека, особенно того, который никогда не показывал вам своего неуважения. Думайте, прежде чем что–либо говорить. Проанализируйте то, что вызывает у Вас желание быть саркастичным и избегайте этого. Уважайте других людей.  Вы должны понять и принять, что несмотря на существующие индивидуальные различия, мы все равны. Не привязывайтесь сильно к материальному, не забывайте, что есть вещи, куда более важные, чем элитная недвижимость и дорогой автомобиль. `;
parentsPanelItem.appendChild(paragraph);
break;
}
case 16: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(16) Эта энергия означает присутствие в Вашем роду людей, которые своим поведением и отношением разрушали жизни других людей - провоцировали на конфликты, проецировали бесконечный негатив, игнорировали личные границы, подрывали уверенность в себе, постоянно критиковали, оказывали давление, высмеивали, не воспринимали всерьёз жизни других людей. Могли наносить и физический вред. Эти люди могли разрушать и сами себя - начинали себя ненавидеть, испытывали постоянную тревогу о будущем и сожалели о прошлом, постоянно себя критиковали, не давали поблажек, аккумулировали в себе негативные мысли и эмоции. Наносили вред своему здоровью алкоголем, наркотиками, неправильным питанием. Увлекались игроманией, опасными видами спорта, работали на износ, проявляли агрессия по отношению к окружающим, занимались опасными профессиями. Либо были люди, которая имея в своей душе тягу к духовному развитию, не смогли побороть искушение и окунулись с головой в пучину мирских страстей и материальных ценностей.
<br><br>Вам необходимо духовно развиваться. Чтобы начать это делать, нужно поставить себе цель стремиться к гармонии во всех сферах вашей жизни, будь то личные отношения, карьера или здоровье. Старайтесь больше читать. Занимайтесь любимыми делами, посвящайте время своим увлечениям. Ко всем жизненным ситуациям старайтесь подходить с чувством юмора. Если вам удалось посмеяться над проблемой, значит, Вы справитесь с ней. Смех помогает достичь покоя и наполнить мозг позитивными мыслями, а значит — улучшить связь с Вашим внутренним «я». Займитесь каким-нибудь творчеством или просто мастерите что-то руками. Освойте медитацию. Старайтесь определять, что мешает Вам идти вперед, что тянет Вас на дно, какие вредные установки у Вас есть, и боритесь с этими ограничениями. Сломайте Ваши внутренние барьеры. Цените то, что имеете. Откройте своё сердце любви. Когда Вы любите себя, других людей и окружающий мир, Ваш духовный рост идет особенно интенсивно. Любовь исцеляет душу и тело, она способна восстанавливать здоровье и силы. Заботьтесь о своём организме - занимайтесь спортом, придерживайтесь правильного питания, умейте отдыхать.`;
parentsPanelItem.appendChild(paragraph);
break;
}
case 17: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(17) “Зарыть свой талант в землю” - это известное словосочетание, произошедшее из библейского рассказа, как нельзя лучше описывает суть этой энергии. Эта энергия говорит о том, что в Вашем роду был очень одаренный человек, харизматичный, умный, талантливый. Ему суждено было иметь большое будущее. Но что-то пошло не так. Возможно, ему не хватило смелости и решительности. Возможно, он недооценивал свои возможности. Либо не захотел выходить из зоны комфорта, закрывался от новых возможностей и знакомств. Либо очень долго собирался показать свой талант окружающим и перегорел. Либо не было должной поддержки от окружающих, или же они совсем принижали его талант.  В итоге человек остался несчастлив, поскольку стал заниматься не тем, чем бы ему хотелось, общаться не с теми, с кем было бы приятно, да и являться не тем, кем есть внутри. А возможно, человек и достиг всех высот, но потерял всё, что имел - славу, деньги, любимого человека, друзей.
<br><br>Чтобы отработать эту энергию, Вам нужно поверить в свои способности, в свой талант.  Вместо того, чтобы говорить себе «Я недостаточно хорош», «Что если ничего не получится» и ничего не делать, просто берите и делайте это. Интересуйтесь окружающим Вас миром. Будьте открыты к новым концепциям, идеям, течениям. Открытость ко всему новому - это то, что отличает успешных людей. Анализируйте свой внутренний мир, предпочтения, возможности. Не зависите от мнения окружающих. Расширяйте свой кругозор. Не играйте чьи-то роли, будьте собой. Отнеситесь к своему таланту как к семечку, которое Вам нужно вырастить. Общайтесь с талантливыми людьми. Ведь они способны менять кругозор окружающим и развивать их. Верьте в свои силы, в свой талант, верьте в свою мечту, и тогда удача не обойдет Вас стороной. Помните, жизнь даётся один раз, и непростительно загубить свои таланты и способности. `;
parentsPanelItem.appendChild(paragraph);
break;
}
case 18: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(18) Эта энергия говорит о том, что в Вашем роду был человек, который владел основными магическими техниками и оккультными знаниями. При этом использовал свою магию для нанесения людям вреда, захвата под собственный контроль или убийства. То есть был тёмным магом, колдуном или ведьмой. Ещё как вариант это мог быть человек, который покончил жизнь самоубийством(утопился), он не справился с чем-то негативным в своей жизни, человек чувствовал негативное влияние и не мог ему противостоять.
<br><br>Вам нужно поверить в то, что Луна оказывает очень сильное влияние на наше здоровье, поведение и настроение, Луна оказывает воздействие на всё живое на планете. А фазы Луны играют важную роль во многих процессах, которые происходят в живом мире. Попробуйте строить свои планы в соответствии с Лунными фазами, отслеживайте то, что чувствуете, уровень своей энергии. Жизнь по Лунному календарю может стать гармоничнее и приятнее, если позволить ей идти в соответствии с естественными ритмами Вселенной.
<br><br>Если же почувствуете в себе дар ясновидения, ясно знания или любые другие способности, то не отказывайтесь от них. Отказ от дара может обернуться тяжёлыми последствиями. `;
parentsPanelItem.appendChild(paragraph);
break;
}
case 19: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(19) Эта энергия означает, что в Вашем роду были люди, которые пострадали от прямого воздействия тепла и высоких температур: это мог быть пожар, в котором пострадал сам человек или его жилище, это могла быть болезнь, протекающая с очень высокой температурой, а мог быть и банально алкоголизм. А мог быть и человек, добившийся большого успеха, занимающий высокое положение в обществе, обладающий авторитетом и богатством, но потерявший всё. Эта потеря передала его потомкам страх денег, богатства и авторитета. Они были нищими. В свою очередь те, кто прожил свою жизнь в нищите, передал своим потомках страх бедности. И те, в свою очередь, трудились, не покладая рук, чтобы обеспечить себя и не нуждаться ни в чём.
<br><br>В любом случае люди по природе своей были достаточно сильные, с мощной энергетикой, с большим творческим потенциалом. И должны были проявлять всё это в каких-то грандиозных проектах, выплёскивать всё это в работу и творчество. Вместо этого вся их сила и потенциал трансформировались в деспотизм и агрессию и выплескивалась на близких людей. Нереализованностью своего потенциала они уничтожали самих себя и тех, кто был рядом.
<br><br>Вам нужно реализовать весь Ваш потенциал, направив его в нужное русло. Человек с Вашей энергетикой способен достичь больших высот в жизни, но только если сумеет направить её в нужное русло.  Как это сделать? Во-первых, постараться понять что действительно Ваше, а что навязано извне и следовать своим путём. Во-вторых, заняться духовными практиками - не обязательно углубляться в магию, достаточно чего-то, что поможет Вам совладать с собой - работа над психикой, медитация и т.п. В-третьих - направьте вашу энергию куда-то, например в творчество, любое. Тогда энергия найдёт выход и не будет Вам мешать. Вам нужно заниматься деятельностью, при которой Вы будете взаимодействовать с большим количеством людей. Вы будете делиться с ними своей жгучей энергией, а Вашим близким будет доставаться тепло Вашей заботы, а не вспышки агрессии и жестокости.`;
parentsPanelItem.appendChild(paragraph);
break;
}
case 20: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(20) Эта энергия встречается нечасто, и означает очень неприятные ситуации и события именно внутри рода, внутри семьи. Вероятно, что кто-то из Ваших предков умер страшной смертью. Либо кто-то потерял родителей и рос сиротой. Либо эти родители были очень жестоки по отношению к своему ребёнку. Либо внутри семьи были какие-то неразрешимые и затяжные конфликты, взаимные обвинения, упреки. Так же были люди с целительскими способностями, которые не приняли их и отказались от них.
<br><br>Что требуется от Вас? Самое главное, Вы должны наладить отношения с родом и внутри него. Уделяйте внимание членам Вашей семьи. Можно даже выделить определённый день недели, который будете посвящать исключительно близким и родным людям. Поспособствуйте тому, что бы младшее поколение больше разговаривало со своими бабушками и дедушками, спрашивало их об истории своей семьи, интересовалось прошлым. Вы и сами расспрашивайте, интересуйтесь, уточняйте, записывайте и сохраняйте, передавая семейный архив своим детям. Уважайте всех членов семьи без исключения. Соблюдайте традиции. Существование традиций, которые чтут несколько поколений, помогает сохранить ощущение принадлежности к роду. Родных не выбирают, поэтому придётся общаться и находить общий язык даже с очень неприятными родственниками. Стремитесь сохранять спокойствие и вести себя уважительно. Изучите варианты взаимодействия, которые позволяют смягчить неприятные эмоции. Не поддавайтесь на провокации. Старайтесь слушать и слышать. Не пытайтесь никого изменить. Примите человека вместе со всеми сложностями. Задействуйте сопереживание. Откажитесь от оценочных суждений и уважайте родственника как личность, даже если не всегда согласны с ним. Планируйте приятные разговоры, ведь Ваши намерения влияют на качество общения. При этом устанавливайте личные границы и не давайте себя в обиду. Плюсом ко всему вышесказанному развивайте в себе целительские способности, получайте ценную информацию из пророческих снов, которые Вы можете видеть. `;
parentsPanelItem.appendChild(paragraph);
break;
}
case 21: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(21) Изначально эта энергия по роду означает, что кто-то из Ваших предков предал свою Родину, свой народ, например, участвуя в войне, перешёл на сторону врага. Либо воевал в другой стране и остался там, выбрал иную родину, не захотел возвращаться в свой дом, в свою семью. То есть это измена, предательство. Либо проявлял агрессию по отношению к своим, нарушил мирное существование своего поколения в семье. Так же наличие этой энергии говорит о рамках, запретах и слабоволии кого-то из Вашего рода. То есть люди, строя в мыслях огромные планы, ставя большие цели, не делали ровным счётом ничего для их осуществления, откладывали на потом, придумывая множество причин, почему они не могут начать действовать прямо сейчас.
<br><br>Что это означает для Вас? Слышали про синдром отложенной жизни? Вы как раз подвержены этому синдрому, постоянно откладывая реализацию собственных желаний на другое время, на потом, потому что сейчас ещё не время, а вот когда-то потом оно наступит. Вам нужно понять, что нужно жить здесь и сейчас. Поверьте в то, что все ограничения только у Вас в голове. Не бойтесь что-то менять. Не бойтесь мнения посторонних. Пришло время самовыражения, ярких индивидуальностей, впечатляющего личного бренда, причем не только для артистов и блогеров, но и для тренеров, психологов, преподавателей, врачей и представителей других профессий. При этом не нужно хотеть всё и сразу, ставьте перед собой последовательно реальные цели и добивайтесь их. Расширяйте своё сознание и увидите новые возможности. `;
parentsPanelItem.appendChild(paragraph);
break;
}
case 22: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(22) Наличие этой энергии говорит о том, в Вашем роду были те, кто имел проблемы с законом, и это всё закончилось для них тюремным заключением. Либо люди, которые имели любое другое ограничение свободы, имели зависимости, которые ими руководили и поэтому они не были свободны.  Так же это могли быть душевнобольные люди, сумасшедшие, люди, имеющие больное и искажённое мышление. При этом они могли вводить людей в заблуждение, выдавая себя за психически здоровых людей. Помимо этого, эта энергия говорит о неспособности начинать всё с чистого листа, страхе всего нового, наличии ограничивающих установок по типу “у меня не получится”, “это невозможно”. Также кто-то из Ваших предков был очень зажатым внутри, но что бы это компенсировать вели якобы свободную жизнь - вел разгульный образ жизни, употреблял алкоголь или наркотики, изменял партнёру. Тем самым занимался самообманом.
<br><br>Вам жизненно необходимо понять истинную свободу. Вы должны самостоятельно принимать решения; уметь отказаться от того, что Вам не нравится; уметь выразить протест, когда это необходимо; выбирать суждения, идеи, веру; брать на себя ответственность за свои решения и собственную жизнь. Вы должны иметь финансовую независимость и здоровую самооценку, которая строится на реальных достижениях, а не на словах случайных людей. Вы должны найти гармонию с самим собой и окружающим миром, быть открыты к изменениям, уметь учиться на своём опыте. Вы должны избавиться от внутренних противоречий и претензий к окружающему миру, стать целостным и самодостаточным человеком, которому хорошо и комфортно наедине с собой. Развивайтесь, путешествуйте, влюбляйтесь, любите, выбирайте как Вам жизнь. `;
parentsPanelItem.appendChild(paragraph);
break;
}}
})
}
if(status===2){
const text=document.createElement('p');
text.innerHTML='Родовые программы по женской линии';
text.style.fontWeight='700';
parentsPanelItem.appendChild(text);
Array.from(uniqNumbers).map((item)=> {
switch (item){
case 1: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(1) Эта энергия говорит о том, что в Вашем роду были те, кто, имея лидерские
качества, не принимал и не признавал их. Это были новаторы от рождения с сильным характером, целеустремленные и способные достигать всех своих целей. Они обладали не только сильным характером, но и сильной энергетикой. Есть вероятность, что люди обладали магическими и целительскими способностями. Но по каким-то причинам они отгородились от этих своих качеств, боялись поверить в них, раскрыть их, боялись идти вперед. Хотя именно это и было им суждено сделать. Они должны были идти вперёд и открывать всё новое, неизведанное и неизученное ранее, но именно страх новизны заставил их свернуть с пути, предначертанного им Богом. Вероятно, они могли испугаться своих магических способностей, поэтому просто запечатали их в себе. И теперь Вам нужно сделать всё то, что не сделали Ваши предки, наверстать всё упущенное ими. Вам нужно идти туда, где Вы сможете проявить себя как лидера, туда, где Вы будете первым. Важно именно осуществлять какую-либо новую деятельность, разрабатывать новые технологии и разработки, воплощать в жизнь новые идеи и решения. Важно делать то, что никто и никогда до Вас не делал. Вы должны стать первопроходцем и первооткрывателем в какой-то сфере либо отрасли. Вам нужно это делать прежде всего для самого себя. Вам не нужно бояться брать на себя ответственность, не отказываться, если кто-то захочет сделать Вас своим лидером. Для Вас принципиально важно общаться с людьми, которые выше Вас по уровню знаний и образования, дохода и достижений, которые уже реализовали и продолжают реализовывать программы, меняющие жизнь. Именно они будут Вас мотивировать на Ваши достижения, делясь своим потенциалом и неиссякаемой энергией. И вы сможете сделать квантовый скачок вперёд.
<br><br>Кроме того, если Вы чувствуете в себе какие-то магические, целительские, экстрасенсорные способности, но не бойтесь их развивать. Как для себя лично, так и для работы с другими людьми. `;
parentsPanelItem.appendChild(paragraph);
break;
}
case 2: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(2) Это энергия говорит о том, что в Вашем роду были люди с очень тяжёлым характером и они часто не могли найти общий язык с другими людьми. С их стороны было недоверие к партнеру и страх перед предательством. Но не доверяли они не только партнёру, но в целом людям и всему окружающему их миру. В их отношениях с внешним миром было много дисгармонии, они были закрыты от него. Постоянно находились в конфликтах с другими людьми. Могли быть достаточно лицемерными, то есть лично человеку говорить одно, а думать и говорить другим людям совершенно другое. При всём этом природа наделила их незаурядными дипломатическим способностями, но они ими не пользовались.
<br><br>¬Вам это говорит о том, что нужно общаться с людьми. Если Вы не умеете этого делать, то нужно учиться этому. Ведь общение с людьми – важная часть нашей жизни. Вы должны побороть то, что мешает Вам полноценно общаться с другими людьми. Это могут быть застенчивость, страх сказать глупость или быть неправильно понятым, боязнь высказывать свое мнение, низкая самооценка. Вы должны быть в постоянном контакте, в постоянном диалоге с окружающими. Искренне интересуйтесь другими людьми и они будут отвечать Вам взаимностью. Умейте слушать. Вы должны открыться внешнему миру. Необходимо понять, что в любых отношениях важно общение, это позволит вам избежать многих проблем. Не бойтесь заводить новые знакомства и поддерживать связь с новыми людьми. Общайтесь везде - дома, на работе, в любом другом месте. Вместе с тем всегда будьте в этом общении искренними и бескорыстными. Кроме того, чтобы быть успешным, Вам необходимо быть в единстве с собой, в гармонии со своим внутренним миром. Не забывайте использовать свои дипломатические качества. Соблюдая все эти рекомендации, Вы всегда будете счастливы.`;
parentsPanelItem.appendChild(paragraph);
break;
}
case 3: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(3) Если у Вас встретилась такая энергия, то в Вашем роду была женщина, которая не смогла исполнить своё истинно женское предназначение.
<br><br>По каналам мужчин - Для мужчин это означает, что они могут быть довольно мягкими, поддатливыми, уступчивыми, послушными, не умеющими самостоятельно принимать решения, отвечать за свои поступки; прячут голову в песок при малейших трудностях, не могут их преодолевать, боятся любой ответственности. При всём при этом у них прекрасные отношения с женщинами. У них много подруг, знакомых, приятельниц, которые охотно с ним общаются, нередко делясь самым сокровенным. То есть все эти женщины видят в нём родственную душу. Кроме этого, такие мужчины очень сильно привязаны к матери, у них очень близкие отношения. Часто они делают всё по её советам и указаниям. А временами это даже походит на зависимость от неё, подчинение её воли.
<br><br>Здесь же может быть и обратный вариант, при котором мужчины имели холодные отношения с женщинами, не могли проявлять по отношению к ним уважение и заботу, могли навредить им.
<br><br>В любом случае наличие этой энергии говорит о том, что мужчина должен сформировать в себе мужское начало, развить в себе мужские качества. Мужчина должен проявлять упорство, решительность, организованность, бесстрашие, активность. По отношению к женщинам он должен быть щедрым, великодушным, преданным и мудрым.
<br><br>По каналам женщин - Наличие этой энергии говорит, что женщины зачастую обладали не самыми лучшими мужскими качествами - деспотичностью и чёрствостью, грубостью и резкостью, вспыльчивостью и жестокостью. Всё это проявлялось и в сторону других женщин и в сторону мужчин, которых они вдобавок ко всему принижали, подавляли, пытались подчинить своей воли. Возможно они стали такими после предательств близких людей. Какими бы причины не были, эти женщины несли всю свою агрессию внутрь семьи, не желая реализовывать себя за её пределами. В семье они брали на себя все мужские обязанности, изматывая и себя и окружающих. Нередко ситуация усугублялась с появлением детей. Либо наоборот они становились ещё злее, когда у них не получилось стать матерью или потеряв ребёнка.
<br><br>В этом случае женщине нужно питать своё женское начало, занимаясь творчеством и исконно женскими занятиями (вышивание, вязание). Необходимо развивать в себе такие качества как доброту, вежливость, обаяние, открытость, умение прощать, естественность и искренность. `;
parentsPanelItem.appendChild(paragraph);
break;
}
case 4: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(4) Наличие этой энергии означает, что в роду были мужчины, обладающие властью, но использовавшие эту власть не во благо, а во вред тем, кто находился рядом с ними - это могут быть и подчинённые и члены семьи.  Мужчины, страдая очевидной тиранией, угнетали, подавляли, загоняли в установленные ими рамки окружающих их людей. Любили и в конечном итоге привыкли проявлять исключительно негативные черты характера - высокомерие, эгоизм, неспособность любить, жестокость, грубость, равнодушие, гнев, отсутствие уважения к другим.  Могли запросто втоптать в грязь любого, применить насилие, как к посторонним, так и к близким.
<br><br>Для женщин наличие этой энергии говорит о необходимо через обретение и развитие внутренней силы реализовать себя в чём-то важном.
<br><br>Для мужчин это говорит о том, что нужно направить свою силу и весь свой потенциал на развитие и реализацию себя, а не тратить свою энергию на выяснение отношений с другими людьми. Сосредоточьтесь на себе. `;
parentsPanelItem.appendChild(paragraph);
break;
}
case 5: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(5) Если эта энергия идет по роду на мужчинах, значит, что мужчины нарушали законы, как установленные обществом и государством, так и человеческие. Они могли воровать, убивать, вести незаконную деятельность, практиковать насилие в семье, быть плохими мужьями и отцами.
<br><br>Если эта энергия по роду на женщинах, то значит в роду были женщины, на которых обрушилось какое-то горе, например она могла потерять ребёнка или любимого мужчину. Могло вообще не быть ничего хорошего в жизни - семья разваливалась, имелись проблемы с законом, беспорядочные отношения. Либо в роду были люди, которые обладали мощным интеллектом и глубокими знаниями, но не передали эти знания тем, кому они предназначались. Возможно, им мешали это делать, а возможно, они сами не хотели это делать, так не верили в ценность и значимость этих знаний, а возможно боялись этими знаниями навредить, полагая, что они будут использоваться во вред. Большой объём знаний накапливался и разрушал их самих, и людей, которых их окружали. Вместо обучения, они поучали, навязывали свои взгляды, критиковали.
<br><br>Зная о наличии этой энергии, Вы должны постоянно развиваться и учиться. Но и этого будет недостаточно. Самое главное, Вы должны делиться своими знаниями с окружающими, с теми, кто в них нуждается. Не нужно судить об уровне и значимости Ваших знаний, важно просто передавать их.  `;
parentsPanelItem.appendChild(paragraph);
break;
}
case 6: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(6) Если энергия стоит по роду у женщин, то в роду была женщина, которая пережила несчастную безответную любовь, испытала боль разлуки с любимым, но и сама могла стать причиной боли у противоположного пола, разбив какому-то мужчине сердце.
<br><br>Если энергия стоит по роду у мужчин, то кто-то из мужчин не мог любить, либо же наоборот не любили его, предавал либо предавали его, заставлял женщину страдать либо страдал сам, не имел серьёзных отношений, самоутверждался за счёт большого количества партнёрш, жил на две семьи. Вполне возможно, что в роду были люди, которые не любили и не принимали себя, не ценили, занимались самоедством и самоуничтожением.
<br><br>Наличие этой энергии говорит о том, что нужно уметь любить и уметь уважать. Уметь любить себя, уметь любить других, не бояться любви, не закрываться.  Уважать и себя и других. Важно научиться доверять другим людям, научиться любить, не требуя ничего взамен, искренне и бескорыстно. Если речь идёт о любви к себе, то тут подразумевается полное принятие себя, и внешне и внутренне, забота о себе, о своей физической оболочке и о своей душе. Необходимо полюбить и весь мир и открыться ему. `;
parentsPanelItem.appendChild(paragraph);
break;
}
case 7: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(7) Эта энергия означает поражение и тяжёлые потери на войне, то есть военные действия, в которых человек из Вашего рода проиграл, пострадал, не смог выйти победителем. Могут быть и менее приземлённые трактовки - человек пострадал в драке, ссоре, ДТП, ничего абсолютно не добился в этой жизни, брался за 100 дел одновременно, но не заканчивал в итоге ни одного, метался из стороны в сторону, не мог определить и понять, что ему нужно, был недисциплинированным, непунктуальным, необязательным, не оставил на этой земле после себя абсолютно ничего, что жил. что не жил.
<br><br>Для Вас жизненно необходимо развивать в себе самодисциплину, самоорганизацию, умение планировать дела, ответственность, исполнительность.  Для Вас принесёт огромную пользу установление режима дня, режима труда и отдыха, режима питания. Всё в Вашей жизни должно быть структурировано и подчинено логике. Вы должны ставить перед собой цели, но тут важно, чтобы эти цели были реальными. Важно уметь и работать, и отдыхать. `;
parentsPanelItem.appendChild(paragraph);
break;
}
case 8: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(8) Восьмая энергия говорит о том, что кто-то из Ваших предков нарушил закон и был наказан. Был человеком фальшивым, непорядочным, нечестным. Были недоволен жизнью и людьми, которые ее населяют. Критиковал всех и вся, обвиняя в своих бедах и неприятностях. Про него можно сказать “в чужом глазу соринку видим, в своем бревна не замечаем”. Человек активно критиковал чужие недостатки, но абсолютно не замечал такие же в своём характере.
<br><br>Вам ни в коем случае нельзя переходить границу закона, потому что даже незначительные правонарушения могут повлечь за собой серьезнейшие проблемы для Вас. Вы должны быть примером законопослушного гражданина, иначе при нарушении Вами общеустановленных законов Вы будете быстро наказаны высшими силами. Вы должны знать и понимать законы Вселенной, и законы, установленные людьми. Вы должны понимать, что одно событие или поступок порождает другое событие или поступок. Не должны забывать и о законе бумеранга.`;
parentsPanelItem.appendChild(paragraph);
break;
}
case 9: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(9) Эта энергия указывает на то, что некий человек в Вашем роду роду имел несчастье быть одиноким, сильно страдал от этого. Это могли быть и отшельники, но их отшельничество причиняло им очень болезненные и тяжелые страданиями. В целом, девятка означает карму одиночества. Но это мог быть и просто знающий и мудрый человек, которому эти знания и мудрость были даны свыше. Он мог посмотреть на человека и рассказать о нём всё. Он понимал, как устроен этот мир, и как устроены люди.  К нему обращались за советом, за откровением, за просветлением. При этом он не афишировал своими способностями ибо боялся непринятия, порицания и упрёков. Ведя закрытый образ жизни, он отказался от материального во имя духовной жизни, и вероятно сам принял решение уединиться вдали от людей. Но есть и кармический хвост 18/9/9 – это ведьмовская карма, означающая, что человек, обладал незаурядными способностями, не передал их из-за страха, что кто-то, когда получит эти знания, обойдёт его. Либо использовал эти способности во вред людям.
<br><br>Как сказал Бернард Шоу “Уметь выносить одиночество и получать от него удовольствие – великий дар.”  И Вы должны научиться этому. Ведь именно в одиночестве Вы осознаете всю суть и смысл жизни. Ведь именно в одиночестве Вам придут открытия, способные изменить не только Вашу жизнь. Развивайтесь духовно, получайте новые знания, наполняйте свою душу и сердце. Делитесь всем этим с другими с людьми. Но при этом не забывайте и о материальном. Найдите баланс между материальным и духовном. `;
parentsPanelItem.appendChild(paragraph);
break;
}
case 10: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(10) Эта энергия указывает на очень невезучего человека в Вашем роду. Все обстоятельства всегда складывались против него, ветер всегда дул не в ту сторону. От этого человека в большинстве своём ничего не зависело, он был заложником ситуаций, и никак не мог повлиять на развитие событий. Либо мог быть просто пессимистом, который не верил в хороший исход, видел во всём только проявления плохого, боялся других людей, боялся этого мира, боялся жить, ведь каждый день он ожидал чего-то плохого. Никому не верил и не доверял.
<br><br>В этом случае самым главным для Вас будет научиться доверять этому миру, людям, смотреть с оптимизмом в будущее. Поверить, что даже вслед за самой тёмной ночью придёт день и выйдет солнце. Принять, что чёрная полоса обязательно сменится белой, что жизнь не состоит только из плохого, что в ней есть много светлого, доброго, чистого, хорошего. Откройтесь этому миру и удача обязательно будет на Вашей стороне.`;
parentsPanelItem.appendChild(paragraph);
break;
}
case 11: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(11) Эта энергия означает, что в Вашем роду были люди, наделённые силой, но в какой-то момент начали использовать эту силу во вред другим людям, и даже во вред себе, разрушая всё вокруг. Например, применяли физическую силу в семье. Либо же были упрямыми трудоголиками, которые работали до изнеможения, не замечая ничего вокруг. Эти люди могли быть наделены не только физической силой, но и обладать мощной энергетикой. И этой энергетикой они притягивали негатив в свою жизнь, потому что на много в этой жизни они смотрели по-недоброму, во многом видели плохое, были очень язвительными и не уважали других.
<br><br>Надо запомнить, что мысли, которые появляются в Вашей голове, очень быстро могут материализоваться, а поэтому очень важно изменить мышление в позитивную сторону. Думайте о хорошем и это хорошее появится в Вашей жизни. Вы можете много работать. Но при этом во-первых, нужно уметь отдыхать и расслабляться, а во-вторых, работая, не забывать о семье. Отдыхать Вы должны и физически и морально. Самый лучший отдых для Вас - это отправиться в путешествие со своей семьей. Не забывайте заниматься спортом. Научитесь медитировать. Направьте Вашу силу в мирное русло.`;
parentsPanelItem.appendChild(paragraph);
break;
}
case 12: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(12) Эта энергия означает повешенного в роду. В прямом смысле слова. Но можно трактовать эту энергию и иначе. Например, был человек, на шею которого сели и поехали, человек, который жил жизнью других, решая все их проблемы, и не умеющий сказать нет, не думающий о себе.  Либо был человек, пострадавший физически(инвалид), морально или финансово.  При любом варианте это был человек, мыслящий иначе, чем все остальные, у него были необычные взгляды на жизнь, принципы и установки. Помогал много людям, бескорыстно делал работу, за которую мог бы брать деньги, но не делал этого, обесценивал и себя, и свой труд.
<br><br>Помогайте, но только не в ущерб себе. Помогайте, когда Вы действительно можете помочь, когда Вы этого хотите. Делайте этого из желания, а не из-за страха, что на Вас обидятся, если Вы откажете. Помогайте, если вас об этом просят.  Помогайте, если тот кому вы помогаете, готов большую часть действий (именно действий) делать сам и ему это правда нужна только помощь, а не нужно всё сделать за него. Применяйте в помощи правило Парето: 80% действий делает сам человек (физических, моральных, эмоциональных) и лишь 20% вашей помощи. Помогайте, только если сами в ресурсе. Если вы сами устали, раздражены, обессилены и недовольны жизнью, то ваша помощь будет через преодоление себя и, скорее всего, будет Вас разрушать. Ведь если у самого ноги сломаны, разве другого на себе донесешь?
<br><br>Не бойтесь иного взгляда на жизнь. Это Ваши мысли, Ваше мировоззрение и Вы имеете на них полное право.`;
parentsPanelItem.appendChild(paragraph);
break;
}
case 13: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(13) Каждый человек приходит в этот мир, чтобы выполнить определенную миссию, дело всей жизни, которое у каждого свое. Но кто-то не успевает это сделать, потому что не прожил свою жизнь до конца (погиб, умер насильственной смертью и т.д.). Эта энергия показывает, что именно такой человек был в Вашем роду - человек, который не смог выполнить предначертанное ему по причине ранней серии.  Потомкам этого человека нужно прожить жизнь за него, завершить цикл и исцелить ситуацию, иначе в роду будут продолжаться преждевременные смерти и трагедии. Этот человек своим преждевременных уходом закрыл своим потомкам дверь для всего нового. Впоследствии у его потомков были возможностей для смены страны, смены деятельности, смены образа жизни, они могли выйти на новый уровень жизни, но ничего из этого так и не произошло, помешали случайно вмешавшиеся обстоятельства или сами люди осознанно отказались от перемен. Они могли замечать, что как только соприкасались с кем-то или чем-то новым, то начинало всё рушиться. Также люди не могли отказываться от старых вещей, думая, что это когда-нибудь пригодится, тем самым захламляли пространство вокруг себя. А захламляя пространство вокруг себя, они захламляют и свою энергетику.
<br><br>Что Вам нужно делать?  Заходить во все двери, которые открываются на Вашем пути. Использовать все возможности, которые Вам представляются. Не испытывать страх перед всем новым. Пробовать разные сферы деятельности.  Не стоять на месте. Не бояться смены обстановки вокруг - это могут быть и переезды внутри страны, и переезды в другую страну. Не бойтесь мыслить иначе, чем Ваше окружении. Развивайтесь, меняйтесь, преображайтесь. Вы можете менять не только себя и свою жизнь, но Вы можете менять и других и их жизни. Если в жизни близкого человека под Вашим воздействием начали происходить события, но Вы считаете эти события негативными, то просто подождите, это только начало изменений, а дальше всё будет меняться исключительно в положительную сторону. Не бойтесь отпускать из Вашей жизни всё ненужное - от людей до вещей. Не бойтесь расставаться со старым. Всё старое несёт в себе негативную энергетику, которая отталкивает от себя хорошее новое.`;
parentsPanelItem.appendChild(paragraph);
break;
}
case 14: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(14) У Вас в роду были очень творческие люди, но они сомневались в своём таланте, не смогли донести своё творчество людям. Это были люди с тонкой душевной организацией, образованные и высококультурные личности, с утонченным внутренним миром. Их легко можно было обидеть, ранить душу. Они отлично разбирались в искусстве, литературе, музыке. Они были одухотворены и наполнены внутренне. Они обострённо, возвышенно воспринимали мир, проявляли гибкий, тонкий ум, развитый, изысканный вкус, обладали чувствительной нервной организацией. Они были ценителями прекрасного. Прекрасное они находили не только в классических общепризнанных произведениях искусства и культурных ценностях, но и в обыденной повседневности. У них было большое открытое сердце. Они могли прекрасно раскрыть себя в искусстве, но по своим внутренним или внешним причинам не сделали этого.
<br><br>Так же эта энергия говорит о том, что в Вашем роду были люди, обладающие целительскими способностями, которые могли лечить людей с помощью трав и других народных средств. Но полноценно они не смогли открыть свои способности, так как боялись осуждения.
<br><br>Помимо всего прочего эта энергия говорит о том, что в Вашем роду были люди, зависимые от алкоголя или каких-то других запрещённых средств.
<br><br>
Что Вам нужно сделать? Раскройте свой творческий потенциал, а так же научитесь зарабатывать на нем деньги, сделайте его популярным (это должно быть что-то, приносящее пользу другим людям).  Не нужно усыплять тягу к прекрасному, к искусству. Каким бы Вы ни были ранимым и чувствительным человек с тонкой душой, Вы должны использовать эти качества себе на пользу, а не во вред. Если Вы может почувствовать всю красоту и мощь классической музыки, разглядеть в обыденном красоту, то стоит эти качества научиться использовать во благо себе и другим.  Перестаньте осуждать людей, имеющих какие-либо зависимости, примите их, поймите, что их зависимость - это болезнь, требующая лечения, а не упрёков. Помогите им побороть свою зависимость. Вы можете помочь им преодолеть свою зависимость, не только оказывая моральную или материальную поддержку, но и применив свои целительские способности. Вы и в целом должны развивать Ваши целительские способности, углубиться в изучение лекарственных растений и других натуральных средств лечения. `;
parentsPanelItem.appendChild(paragraph);
break;
}
case 15: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(15) Наличие этой энергии говорит о том, что в Вашем роду был человек, склонный к физическому насилию в адрес других людей, а так же к осуществлению других противоправных действий. Этот человек просто не в состоянии был справиться со своей агрессией, испытывая алкогольную или наркотическую зависимость. Либо же люди в Вашем роду любили использовать сарказм для демонстрации недовольства или же просто с целью обидеть, оскорбить и унизить другого человека, высмеять его или высказать презрение. Общение с ними было очень неприятным процессом, поэтому они практически не имели друзей или просто даже хороших знакомых. Многие люди их избегали. Кроме того, эти люди могли быть провокаторами. Они пытались вывести на эмоции других людей, чтобы в порыве этих эмоций другие люди предприняли какие-то резкие, необдуманные действия, оголив свои негативные стороны. Плюс ко всему они были очень привязаны к материальным ценностям, любили роскошь и богатство.
<br><br>Вам нужно освободиться от сарказма, если он является Вашим частым спутником. Говорить с людьми прямо, без злорадства и намёков. Старайтесь никогда не травмировать ранимого человека, особенно того, который никогда не показывал вам своего неуважения. Думайте, прежде чем что–либо говорить. Проанализируйте то, что вызывает у Вас желание быть саркастичным и избегайте этого. Уважайте других людей.  Вы должны понять и принять, что несмотря на существующие индивидуальные различия, мы все равны. Не привязывайтесь сильно к материальному, не забывайте, что есть вещи, куда более важные, чем элитная недвижимость и дорогой автомобиль. `;
parentsPanelItem.appendChild(paragraph);
break;
}
case 16: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(16) Эта энергия означает присутствие в Вашем роду людей, которые своим поведением и отношением разрушали жизни других людей - провоцировали на конфликты, проецировали бесконечный негатив, игнорировали личные границы, подрывали уверенность в себе, постоянно критиковали, оказывали давление, высмеивали, не воспринимали всерьёз жизни других людей. Могли наносить и физический вред. Эти люди могли разрушать и сами себя - начинали себя ненавидеть, испытывали постоянную тревогу о будущем и сожалели о прошлом, постоянно себя критиковали, не давали поблажек, аккумулировали в себе негативные мысли и эмоции. Наносили вред своему здоровью алкоголем, наркотиками, неправильным питанием. Увлекались игроманией, опасными видами спорта, работали на износ, проявляли агрессия по отношению к окружающим, занимались опасными профессиями. Либо были люди, которая имея в своей душе тягу к духовному развитию, не смогли побороть искушение и окунулись с головой в пучину мирских страстей и материальных ценностей.
<br><br>Вам необходимо духовно развиваться. Чтобы начать это делать, нужно поставить себе цель стремиться к гармонии во всех сферах вашей жизни, будь то личные отношения, карьера или здоровье. Старайтесь больше читать. Занимайтесь любимыми делами, посвящайте время своим увлечениям. Ко всем жизненным ситуациям старайтесь подходить с чувством юмора. Если вам удалось посмеяться над проблемой, значит, Вы справитесь с ней. Смех помогает достичь покоя и наполнить мозг позитивными мыслями, а значит — улучшить связь с Вашим внутренним «я». Займитесь каким-нибудь творчеством или просто мастерите что-то руками. Освойте медитацию. Старайтесь определять, что мешает Вам идти вперед, что тянет Вас на дно, какие вредные установки у Вас есть, и боритесь с этими ограничениями. Сломайте Ваши внутренние барьеры. Цените то, что имеете. Откройте своё сердце любви. Когда Вы любите себя, других людей и окружающий мир, Ваш духовный рост идет особенно интенсивно. Любовь исцеляет душу и тело, она способна восстанавливать здоровье и силы. Заботьтесь о своём организме - занимайтесь спортом, придерживайтесь правильного питания, умейте отдыхать.`;
parentsPanelItem.appendChild(paragraph);
break;
}
case 17: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(17) “Зарыть свой талант в землю” - это известное словосочетание, произошедшее из библейского рассказа, как нельзя лучше описывает суть этой энергии. Эта энергия говорит о том, что в Вашем роду был очень одаренный человек, харизматичный, умный, талантливый. Ему суждено было иметь большое будущее. Но что-то пошло не так. Возможно, ему не хватило смелости и решительности. Возможно, он недооценивал свои возможности. Либо не захотел выходить из зоны комфорта, закрывался от новых возможностей и знакомств. Либо очень долго собирался показать свой талант окружающим и перегорел. Либо не было должной поддержки от окружающих, или же они совсем принижали его талант.  В итоге человек остался несчастлив, поскольку стал заниматься не тем, чем бы ему хотелось, общаться не с теми, с кем было бы приятно, да и являться не тем, кем есть внутри. А возможно, человек и достиг всех высот, но потерял всё, что имел - славу, деньги, любимого человека, друзей.
<br><br>Чтобы отработать эту энергию, Вам нужно поверить в свои способности, в свой талант.  Вместо того, чтобы говорить себе «Я недостаточно хорош», «Что если ничего не получится» и ничего не делать, просто берите и делайте это. Интересуйтесь окружающим Вас миром. Будьте открыты к новым концепциям, идеям, течениям. Открытость ко всему новому - это то, что отличает успешных людей. Анализируйте свой внутренний мир, предпочтения, возможности. Не зависите от мнения окружающих. Расширяйте свой кругозор. Не играйте чьи-то роли, будьте собой. Отнеситесь к своему таланту как к семечку, которое Вам нужно вырастить. Общайтесь с талантливыми людьми. Ведь они способны менять кругозор окружающим и развивать их. Верьте в свои силы, в свой талант, верьте в свою мечту, и тогда удача не обойдет Вас стороной. Помните, жизнь даётся один раз, и непростительно загубить свои таланты и способности. `;
parentsPanelItem.appendChild(paragraph);
break;
}
case 18: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(18) Эта энергия говорит о том, что в Вашем роду был человек, который владел основными магическими техниками и оккультными знаниями. При этом использовал свою магию для нанесения людям вреда, захвата под собственный контроль или убийства. То есть был тёмным магом, колдуном или ведьмой. Ещё как вариант это мог быть человек, который покончил жизнь самоубийством(утопился), он не справился с чем-то негативным в своей жизни, человек чувствовал негативное влияние и не мог ему противостоять.
<br><br>Вам нужно поверить в то, что Луна оказывает очень сильное влияние на наше здоровье, поведение и настроение, Луна оказывает воздействие на всё живое на планете. А фазы Луны играют важную роль во многих процессах, которые происходят в живом мире. Попробуйте строить свои планы в соответствии с Лунными фазами, отслеживайте то, что чувствуете, уровень своей энергии. Жизнь по Лунному календарю может стать гармоничнее и приятнее, если позволить ей идти в соответствии с естественными ритмами Вселенной.
<br><br>Если же почувствуете в себе дар ясновидения, ясно знания или любые другие способности, то не отказывайтесь от них. Отказ от дара может обернуться тяжёлыми последствиями. `;
parentsPanelItem.appendChild(paragraph);
break;
}
case 19: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(19) Эта энергия означает, что в Вашем роду были люди, которые пострадали от прямого воздействия тепла и высоких температур: это мог быть пожар, в котором пострадал сам человек или его жилище, это могла быть болезнь, протекающая с очень высокой температурой, а мог быть и банально алкоголизм. А мог быть и человек, добившийся большого успеха, занимающий высокое положение в обществе, обладающий авторитетом и богатством, но потерявший всё. Эта потеря передала его потомкам страх денег, богатства и авторитета. Они были нищими. В свою очередь те, кто прожил свою жизнь в нищите, передал своим потомках страх бедности. И те, в свою очередь, трудились, не покладая рук, чтобы обеспечить себя и не нуждаться ни в чём.
<br><br>В любом случае люди по природе своей были достаточно сильные, с мощной энергетикой, с большим творческим потенциалом. И должны были проявлять всё это в каких-то грандиозных проектах, выплёскивать всё это в работу и творчество. Вместо этого вся их сила и потенциал трансформировались в деспотизм и агрессию и выплескивалась на близких людей. Нереализованностью своего потенциала они уничтожали самих себя и тех, кто был рядом.
<br><br>Вам нужно реализовать весь Ваш потенциал, направив его в нужное русло. Человек с Вашей энергетикой способен достичь больших высот в жизни, но только если сумеет направить её в нужное русло.  Как это сделать? Во-первых, постараться понять что действительно Ваше, а что навязано извне и следовать своим путём. Во-вторых, заняться духовными практиками - не обязательно углубляться в магию, достаточно чего-то, что поможет Вам совладать с собой - работа над психикой, медитация и т.п. В-третьих - направьте вашу энергию куда-то, например в творчество, любое. Тогда энергия найдёт выход и не будет Вам мешать. Вам нужно заниматься деятельностью, при которой Вы будете взаимодействовать с большим количеством людей. Вы будете делиться с ними своей жгучей энергией, а Вашим близким будет доставаться тепло Вашей заботы, а не вспышки агрессии и жестокости.`;
parentsPanelItem.appendChild(paragraph);
break;
}
case 20: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(20) Эта энергия встречается нечасто, и означает очень неприятные ситуации и события именно внутри рода, внутри семьи. Вероятно, что кто-то из Ваших предков умер страшной смертью. Либо кто-то потерял родителей и рос сиротой. Либо эти родители были очень жестоки по отношению к своему ребёнку. Либо внутри семьи были какие-то неразрешимые и затяжные конфликты, взаимные обвинения, упреки. Так же были люди с целительскими способностями, которые не приняли их и отказались от них.
<br><br>Что требуется от Вас? Самое главное, Вы должны наладить отношения с родом и внутри него. Уделяйте внимание членам Вашей семьи. Можно даже выделить определённый день недели, который будете посвящать исключительно близким и родным людям. Поспособствуйте тому, что бы младшее поколение больше разговаривало со своими бабушками и дедушками, спрашивало их об истории своей семьи, интересовалось прошлым. Вы и сами расспрашивайте, интересуйтесь, уточняйте, записывайте и сохраняйте, передавая семейный архив своим детям. Уважайте всех членов семьи без исключения. Соблюдайте традиции. Существование традиций, которые чтут несколько поколений, помогает сохранить ощущение принадлежности к роду. Родных не выбирают, поэтому придётся общаться и находить общий язык даже с очень неприятными родственниками. Стремитесь сохранять спокойствие и вести себя уважительно. Изучите варианты взаимодействия, которые позволяют смягчить неприятные эмоции. Не поддавайтесь на провокации. Старайтесь слушать и слышать. Не пытайтесь никого изменить. Примите человека вместе со всеми сложностями. Задействуйте сопереживание. Откажитесь от оценочных суждений и уважайте родственника как личность, даже если не всегда согласны с ним. Планируйте приятные разговоры, ведь Ваши намерения влияют на качество общения. При этом устанавливайте личные границы и не давайте себя в обиду. Плюсом ко всему вышесказанному развивайте в себе целительские способности, получайте ценную информацию из пророческих снов, которые Вы можете видеть. `;
parentsPanelItem.appendChild(paragraph);
break;
}
case 21: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(21) Изначально эта энергия по роду означает, что кто-то из Ваших предков предал свою Родину, свой народ, например, участвуя в войне, перешёл на сторону врага. Либо воевал в другой стране и остался там, выбрал иную родину, не захотел возвращаться в свой дом, в свою семью. То есть это измена, предательство. Либо проявлял агрессию по отношению к своим, нарушил мирное существование своего поколения в семье. Так же наличие этой энергии говорит о рамках, запретах и слабоволии кого-то из Вашего рода. То есть люди, строя в мыслях огромные планы, ставя большие цели, не делали ровным счётом ничего для их осуществления, откладывали на потом, придумывая множество причин, почему они не могут начать действовать прямо сейчас.
<br><br>Что это означает для Вас? Слышали про синдром отложенной жизни? Вы как раз подвержены этому синдрому, постоянно откладывая реализацию собственных желаний на другое время, на потом, потому что сейчас ещё не время, а вот когда-то потом оно наступит. Вам нужно понять, что нужно жить здесь и сейчас. Поверьте в то, что все ограничения только у Вас в голове. Не бойтесь что-то менять. Не бойтесь мнения посторонних. Пришло время самовыражения, ярких индивидуальностей, впечатляющего личного бренда, причем не только для артистов и блогеров, но и для тренеров, психологов, преподавателей, врачей и представителей других профессий. При этом не нужно хотеть всё и сразу, ставьте перед собой последовательно реальные цели и добивайтесь их. Расширяйте своё сознание и увидите новые возможности. `;
parentsPanelItem.appendChild(paragraph);
break;
}
case 22: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(22) Наличие этой энергии говорит о том, в Вашем роду были те, кто имел проблемы с законом, и это всё закончилось для них тюремным заключением. Либо люди, которые имели любое другое ограничение свободы, имели зависимости, которые ими руководили и поэтому они не были свободны.  Так же это могли быть душевнобольные люди, сумасшедшие, люди, имеющие больное и искажённое мышление. При этом они могли вводить людей в заблуждение, выдавая себя за психически здоровых людей. Помимо этого, эта энергия говорит о неспособности начинать всё с чистого листа, страхе всего нового, наличии ограничивающих установок по типу “у меня не получится”, “это невозможно”. Также кто-то из Ваших предков был очень зажатым внутри, но что бы это компенсировать вели якобы свободную жизнь - вел разгульный образ жизни, употреблял алкоголь или наркотики, изменял партнёру. Тем самым занимался самообманом.
<br><br>Вам жизненно необходимо понять истинную свободу. Вы должны самостоятельно принимать решения; уметь отказаться от того, что Вам не нравится; уметь выразить протест, когда это необходимо; выбирать суждения, идеи, веру; брать на себя ответственность за свои решения и собственную жизнь. Вы должны иметь финансовую независимость и здоровую самооценку, которая строится на реальных достижениях, а не на словах случайных людей. Вы должны найти гармонию с самим собой и окружающим миром, быть открыты к изменениям, уметь учиться на своём опыте. Вы должны избавиться от внутренних противоречий и претензий к окружающему миру, стать целостным и самодостаточным человеком, которому хорошо и комфортно наедине с собой. Развивайтесь, путешествуйте, влюбляйтесь, любите, выбирайте как Вам жизнь. `;
parentsPanelItem.appendChild(paragraph);
break;
}}
})
}
if(status===3){
const text=document.createElement('p');
text.innerHTML='Обиды на родителей';
text.style.fontWeight='700';
parentsPanelItem.appendChild(text);
Array.from(uniqNumbers).map((item)=> {
switch (item){
case 1: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(1) Самым губительным для детей с этой энергией является гиперопека со стороны родителей, их повышенное внимание, тотальный контроль действий и поступков. А так же стремление ограждать, защищать, ограничивая свободу, лишая возможности проявлять самостоятельность. Не на пользу идёт и чрезмерная озабоченность образованием, полная загруженность ребёнка несколькими кружками. Родителям необходимо перестать принимать все решения вместо сына или дочери, считая их беспомощными, безответственными людьми. Самое лучшее, что могут дать ребёнок родители - это путешествия, именно путешествия дают ребенку целостное представление о мире, вызывают жажду познания и раскрывают весь его потенциал. `;
parentsPanelItem.appendChild(paragraph);
break;
}
case 2: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(2) Человек с этой энергией нередко растёт в семье, в которой царят двойные стандарты: то, что требуется от одного человека, является необязательным для другого, либо то, что запрещается одним родителем, разрешается другим, либо родители в хорошем настроении что-то позволяет, а в плохом - нет. Всё это запутывает ребёнка, он не понимает, как на самом деле можно, с как нельзя, что на самом деле хорошо, а что плохо. В конечном итоге, просто он начинает вести себя так, чтобы быть удобным для всех, а любую похвалу в свой адрес начинает воспринимать за наигранность, не рассказывает о своих переживаниях и проблемах. Такой человек, когда станет взрослым, должен обязательно прислушиваться к себе, делиться сам с собой своими переживаниями и эмоциями, а потом и другим рассказывать о них, не играть какую-то роль, не подстраиваться под кого-то, начать доверять людям и миру. `;
parentsPanelItem.appendChild(paragraph);
break;
}
case 3: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(3) Скорее всего, Вы выросли в матриархальной семье, где мать была самым значимым членом семьи. Она сама (осознанно или неосознанно) взяла на себя мужские функции и обязанности. Смотря на подобную ситуацию всё детство, Вы можете брать пример с родителей. Мальчик в таком случае вырастет робким тихоней, а девочка копией своей матери. В целом, при матриархате мальчиков воспитывают, как девочек, пресекая их мужские проявления, а девочек учат деспотичности и строгости. Вы чувствовали себя рядом с матриархальной матерью под постоянным жестким контролем, боялись совершить ошибку, находились в страхе наказания, испытывали чувство вины, так как властная мать Вами постоянно манипулировала. Самым плохим последствием такого детства является то, что Ваша семейная жизнь в большем процентном соотношении благополучно не складывается, так как Вам не показали здоровых отношений между мужчиной и женщиной. Вам следует, если Вы женщина, научиться быть женщиной и с любовью и нежностью выполнять обязанности жены и матери. Если Вы мужчина, обратите в себе мужское начало, станьте в семье лидером и главой. `;
parentsPanelItem.appendChild(paragraph);
break;
}
case 4: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(4) Очевидно, Вы выросли в семье, где авторитарным органом была мать. Отец при этом работал в демократическом или попустительском стиле, иногда и вовсе самоустранялся из жизни ребенка. Зато мама взяла на себя роль тотального воспитателя и её поведение приобрело жёсткие черты. Она все время контролировала, читала нотации и вразумления, была агрессивно моральна: «Ты опять забыл телефон, не поел, не туда пошел, испачкал, испортил, нарушил!». С мамой не было никакой душевной близости. Вероятно, она не доверяла мужчинам ни в чем. И взвалила на свои плечи не только функции по воспитанию детей, но иные мужские обязанности. Во взрослой жизни Вам необходимо научиться доверять мужчинам, уважать их, выйти замуж, оберегая и развивая чисто женские черты характера, стать для детей не надзирателем, а любящей и понимающей мамой. В случае, если Вы мужчина, воспитывайте в себе ответственность за Ваших близких, станьте для них опорой и каменной стеной. `;
parentsPanelItem.appendChild(paragraph);
break;
}
case 5: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(5) Вы выросли в семье, где на первом месте у Ваших родители была дисциплина, упорный труд и контроль. Вы должны были отлично учиться, а удовольствие и психологический комфорт от учебы были неважны. Родители всё решали за Вас, были уверены в своей правоте и требовательны, так что угодить им было сложно. Хотели, чтобы и Вы и педагоги, обучающие Вас, выкладывались по полной. Они сами определяли цели, не спрашивая Вас. Точно такую же модель поведения Вы можете принести и в свою семью. Поэтому воспринимайте школу, лишь как ступеньку к будущей взрослой жизни. Ориентируйтесь на личностные особенности и интересы ребенка, стремитесь раскрыть его потенциал. Записывайте его на различные кружки и допзанятия, ища то, что ему действительно интересно. Найдите баланс между контролем и поддержкой. `;
parentsPanelItem.appendChild(paragraph);
break;
}
case 6: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(6) В детстве Вам казалось, что родители Вас не любят, что Вас не принимают, отвергают, что родители Вас не хотели. Вы не ощущали тепла, поддержки и собственной ценности. Вам казалось, что другие родители были бы для Вас лучше, что у других они лучше, а Вам с родителями не повезло. Всё это переросло в то, что у Вас много недоверия и опасливости и в то же время много внутреннего желания быть любимым. Во взрослой жизни это может обернуться большим количеством связей с противоположным полом, Вы будете искать того, кто Вас полюбит, вступая в отношения со всеми подряд. Так же у Вас могут не складываться отношения не только с партнером, но и с собственными детьми, когда они появятся, и с коллегами по работе. Вам важно простить, понять и принять своих родителей, избавиться от обид и претензий, полюбить их всем сердцем. Важно полюбить и себя. `;
parentsPanelItem.appendChild(paragraph);
break;
}
case 7: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(7) Очевидно, Вы выросли в семье, где родители всегда удовлетворяли свои амбиции за Ваш счёт, находились под прессингом ожиданий и требований. Вы с самого раннего возраста занимались всем, но не тем, что нравится, дружили с теми, кто нравится маме, а не Вам. Ваши родители могли выплескивать на Вас раздражение, злость, гнев, когда у них что-то не получалось. Любили нарушать Ваше личное пространство. Это всё отразилось на Вашем отношению к миру - Вы ему не доверяете, всё время ищите в чём-то подоплёку, настроены агрессивно, не верите в искренность других людей, Вам кажется, что всем от Вас что-то нужно. Вам нужно перестать негативно относиться к людям, научитесь доверять и верить, научитесь быть справедливым и мудрым по отношению к другим, контролируйте свои эмоции, берите на себя ответственность за самого себя и других, становитесь лидером, которого все уважают. `;
parentsPanelItem.appendChild(paragraph);
break;
}
case 8: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(8) В детстве Вам казалось, что родители несправедливы по отношению к Вам - не верят Вам, не доверяют, неправильно понимают, по-разному относятся к Вам и Вашему брату/сестре, наказывают на пустом месте, что-то запрещают. Вы часто держали на них обиду за это, временами сильно злились. Поэтому во взрослой жизни Вы всегда и всем стараетесь доказать свою правоту, Вам до сих пор кажется, что Вас несправедливо обвиняют, не так понимают. Вам нужно прежде всего простить своих родителей, ни в чем их не упрекать. Стараться и самому быть справедливым по отношению к ним и людям, которые Вас окружают. Стараться всегда поступать по совести, в соответствии с нормами морали, нравственности, жить, полагаясь на общепринятые принципы и истины, не отступать от правил и требований. Изучайте причинно-следственные связи Вселенной. `;
parentsPanelItem.appendChild(paragraph);
break;
}
case 9: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(9) Вы выросли в семье, где родители были вечно заняты своими делами (работой, личной жизнью), а Вам совершенно не уделяли внимания. Либо же могла быть совершенно-обратная ситуация в семье - всё внимание родителей было сосредоточено исключительно на Вас. Обе эти ситуации привели к тому, что Вы поспешно покинули родительский дом, как только стали взрослым, стремясь создать свою семью, в которой, как Вы думали, всё будете иначе. Однако не исключено, что Вы повторяете все ошибки своих родителей. Что сейчас следует Вам? Начните получать удовольствие от жизни, умейте делать себе приятное, наслаждайтесь каждым моментом, просто любите жизнь, не отказывайте себе ни в чём, балуйте и свою душу и своё тело, не проходите мимо материальных благ - они тоже важны для человека. `;
parentsPanelItem.appendChild(paragraph);
break;
}
case 10: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(10) Вы выросли в семье, где родители подавляли любую Вашу инициативу, считая неспособным ни к чему, называя то лентяем, то просто неумёхой. Вполне вероятно, что за Вас даже делали уроки или, к примеру, писали сочинение, не давая возможности проявить собственные мысли. Не приучали к домашним делам, потому что “он ещё маленький”, “он не справится”. Естественно, не хвалили Вас. Потому что было не за что - Вы же ничего не делали, так как то лентяй, то неумёха. Решали за Вас все Ваши проблемы, так как сами Вы, по их мнению, не справитесь. В конечном итоге, Вы приняли их точку зрения, то есть стали считать себя неумёхой и лентяем. Вам нужно научиться слышать и слушать себя, свои желания, ставит свои цели. Вы просто обязаны поверить в себя и заняться тем делом, которое Вас воодушевляет и вдохновляет, ведь даже просто Ваше хобби вполне может стать делом всей Вашей жизни, которым Вы будете гореть. Поверьте, удача на Вашей стороне, Вам лишь стоит поверить в это и начать проживать СВОЮ жизнью.`;
parentsPanelItem.appendChild(paragraph);
break;
}
case 11: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(11) Эта энергия означает, что Вы выросли в семье, где родители требовали от Вас быть всегда лучшим - учиться на пятёрки, побеждать во всех конкурсах и соревнованиях. Родители не признавали никаких других мест, кроме первого. Для Вас это обернулось тем, что во взрослой жизни Вы предъявляете высокие требования к людям, в части качества их поведения, профессионализма, исполнительности, ответственности, инициативы, культуры, взятых на себя обязательств. Вы не прощаете чужие слабости. Сами работая и делая очень многое, Вы требуете от других людей аналогичного, временами подавляете их.  Ваш трудоголизм изматывает Вас, приводя к физическому и моральному истощению. Вам нужно научиться расслабляться, останавливаться, наполняться силами, уметь отдыхать. Немаловажно научиться принимать других людей со всеми их слабостями и недостатками, не предъявлять завышенные требования. `;
parentsPanelItem.appendChild(paragraph);
break;
}
case 12: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(12) К сожалению, всё Ваше детство сводилось к тому, что вы должны были заслужить любовь родителей. Они, несомненно, Вас любили, но проявляли эту любовь только взамен на что-то. Например, чтобы получить мамины объятия, нужно было получить пятёрку за контрольную, а просто так объятия не раздавались. Или, чтобы пойти в парк с мамой, нужно было провести генеральную уборку во всём доме. Просто так проявления любви и заботы в семье не практиковались. А уж чтобы услышать простое “мы тебя любим”, нужно было и четверть на отлично закончить, и дома убраться, и сварить обед из трёх блюд. Всё это постоянное заслуживание привело к тому, что Вы и во взрослой жизни готовы прислуживать, лишь бы заслужить немного теплоты, ласки, добрых слов и доброго взгляда. Не можете отказывать и говорить “нет”. Вы не можете помогать людям бескорыстно, Вас непременно должны как-то отблагодарить. Вам нужно научиться любить, уважать себя и не жертвовать собой ради других. Не позволяйте людям использовать себя. Не перешагивайте через себя. Помогайте тогда, когда человеку действительно нужна ваша помощь. Но при этом делайте это бескорыстно, не требуя ничего взамен. Помогайте только тогда, когда Вы можете помочь. Соблюдайте чужие границы и обозначьте Ваши.  `;
parentsPanelItem.appendChild(paragraph);
break;
}
case 13: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(13) Вы выросли в семье с патриархальным укладом и традиционно-строгими взглядами на жизнь. Ваши родители в штыки принимали всё новое, пытаясь сохранить всё в таком виде, в котором всё было десятилетиями до этого. То есть Ваша семья соответствовала классическим представлениям о семье: муж - глава семьи, зарабатывает деньги, жена следит за хозяйством и детьми, дети - прилежные и воспитанные отличники. При этом жена не может зарабатывать больше мужа, не может ему перечить и т.д. На Вас это сказалось таким образом, что Вы также боитесь всего нового, боитесь изменений и перемен. Вы боитесь, потому что Вас прежде всего пугает неизвестность. Но что тогда делать? Идите в свой страх. Да, придется выбраться из зоны комфорта и начать действовать. Но после первых маленьких шагов, станет намного легче. Действуйте постепенно. Составьте план. Повышайте самооценку. Научитесь распознавать свои истинные желания и потребности, а не прятать их. Проработайте негативные установки, например, люди с менталитетом нищего часто боятся перемен и успешности. Поэтому начинать нужно с мышления. Возьмите ответственность за свою жизнь на себя. Сделайте всё это, и Ваша жизнь заиграет новыми яркими красками, в ней наступит гармония. `;
parentsPanelItem.appendChild(paragraph);
break;
}
case 14: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(14) У вас сохранились глубокие обиды на родителей. Возможно, со временем к ним добавились раздражение и злость из-за того, что они не смогли дать Вам такое будущее, при котором у Вас была бы возможность реализовать свой потенциал. Например, такое случается, когда родители страдают алкоголизмом. Вы можете чувствовать себя обездоленным, неуверенным в себе (отсутствие веры в себя, доверия к себе), Вас легко ранить и обидеть, Вы чувствуете, что упустили какие-то возможности, и Ваша жизнь идёт не по тому пути, по какому она могла бы пойти, то есть, всё должно было быть иначе и непременно хорошо. Что Вы можете и должны сделать? Первое, что вам нужно сделать – это принять Вашу текущую жизненную ситуацию. Вы должны примириться с тем, как выглядит Ваша жизнь на данный момент, и с вещами, которые привели к такой ситуации. Используйте прошлое не для того, чтобы упиваться своими неудачами, а чтобы мотивировать себя на достижение новых целей. Вся энергия, сила, мужество и уверенность находится внутри вас. Доверяйте и верьте себе. Посмотрите в лицо Вашим страхам, и не позволяйте им остановить Вас на пути достижения целей. Вы должны простить себя за любые неудачи или ошибки, которые вы совершили в прошлом, и двигаться дальше. Вы должны смотреть в будущее и перестать жить прошлыми неудачами. Будьте благодарны за то, кем Вы есть, и что имеете. Находите только хорошее в мире вокруг, тогда позитивные люди и положительные события наполнят вашу жизнь. Позвольте вашей жизни идти своим естественным чередом. Когда Вы научитесь следовать жизненному потоку, Вы поймете, что это прекрасный и мудрый советник. Если Вы позволите жизни вести Вас, она будет осыпать Вас своими дарами и богатствами.`;
parentsPanelItem.appendChild(paragraph);
break;
}
case 15: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(15) Вполне возможно, что Ваши родители вели достаточно свободный образ жизни - имели некие зависимости, не утруждали себя верностью и преданностью, любили веселье, развлечения и прочие удовольствия, жили исключительно в соответствии со своими желаниями и страстями. Нередко это приводит к тому, что и во взрослой жизни Вы неосознанно или осознанно (так привыкли) окружаете себя такими же людьми. В Вас и самом есть такая сторона. Вы любите хвастаться своими достижениями, а при их отсутствии безгранично злитесь на тех, у кого эти достижения есть. Вы любите пускать пыль в глаза и создавать образ успешного человека. Для того, чтобы улучшить свою жизнь, Вам необходимо раскрывать и реализовывать свои таланты, вести настоящий здоровый образ жизни, развивать в себе положительные качества характера, учиться контролировать свои эмоции и чувства, быть порядочным человеком и стремиться жить по совести, посещать храм, заняться духовными практиками, изучать священные писание или просто историю религии. Стремитесь стать высокодуховным человеком, откажитесь от низких человеческих пристрастий. `;
parentsPanelItem.appendChild(paragraph);
break;
}
case 16: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(16) Вы - прирожденный духовный лидер, но родились в семье слабохарактерных, нерешительных, закрытых от всего нового людей, не желающих развиваться и идти вперёд. В какой-то момент Вы переняли некоторые их черты и именно это мешает Вам постоянно двигаться вперёд, а для Вас это жизненно необходимо. Ведь Вы родились, чтобы двигаться вперёд и вести за собой других людей. Но вместо этого, копируя поведение своих родителей, вы начинаете стоять на месте, цепляться и привязываться к материальному. А судьба лишает Вас этого материального, давая понять, что Ваше предназначение совершенно в ином. Ведь привязанность к материальному является универсальным показателем нашего духовного развития. Чем сильнее привязанность, тем слабее духовное развитие. Для того чтобы побороть привязанность к чему-то, надо просто привязаться к другому. И пусть этим другим станет для Вас духовное развитие. Наполняйте свою душу новыми знаниями, делитесь ими с другими, станьте для них наставником и учителем - это Ваше предназначение. `;
parentsPanelItem.appendChild(paragraph);
break;
}
case 17: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(17) Вы родились очень талантливым человеком с огромным творческим потенциалом. Но родители не верили в Вас, не поддерживали, считая все Ваши творческие способности полнейшей ерундой, на которую не следует тратить время. В итоге Вы и сами перестали верить в свои силы, и у Вас действительно ничего не получилось. Сейчас Вам не остаётся ничего, кроме как повернуть время вспять и вновь поверить в себя. Развивайте свой талант и творческие способности, не бойтесь купить обучающие курсы, пройти бесплатные семинары, побывать на лекциях и тренингах. Поставьте цель показать Ваш талант другим людям и идите к ней. При этом не зазнавайтесь, чрезмерно не гордитесь, ведь ваш талант - это дар Бога, вы лишь должны придать ему огранку. `;
parentsPanelItem.appendChild(paragraph);
break;
}
case 18: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(18) В детстве родители окружили Вас гиперопекой, буквально тряслись над Вами, всего боялись. Обладая повышенной тревожностью, мнительностью и переживательностью, они передали эти качества Вам. Вы боитесь одиночества, боитесь потерять близких, боитесь много чего ещё, боитесь жить. Прежде всего Вам необходимо понять, что Ваши мысли материальны, а подобное притягивает подобное. Как сказал великий русский писатель М.А. Булгаков «Будьте осторожны со своими желаниями – они имеют свойство сбываться». Именно поэтому начинайте мыслить позитивно прямо сейчас. `;
parentsPanelItem.appendChild(paragraph);
break;
}
case 19: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(19) Одним из важных этапов взросления является сепарация (отделение) от родителей. Но бывает так, что мы физически давно выросли, а сепарации от родителей так и не происходит. Скорее всего, именно так и произошло с Вами. Если Вы обладаете низкой самооценкой, детскими обидами, неспособностью принять ответственность за свою жизнь и постоянной потребностью в одобрении, то это говорит о том, что Вы находитесь в сильной эмоциональной зависимости от родителей. А это, в свою очередь, создает Вашу психологическую незрелость и зависимые отношения с миром. Вы должны повзрослеть, ведь взрослая жизнь имеет гораздо больше преимуществ, чем жизнь ребенка. Устанавливайте свои правила, защищайте свои границы, дистанцируйтесь от родителей, возьмите паузу в общении, принимайте решения независимо от их одобрения, умейте говорить "нет", не испытывая потом чувства вины или других негативных эмоций, умейте просить и получать отказы без обид, умейте поддерживать глубокую эмоциональную связь с близкими людьми, сохраняя независимость суждений и поступков, будьте способны  позаботиться о себе материально, озвучивайте свое мнение в присутствии родителей, позволяет себе видеть мир не так, как видят его родители. И самое главное - реализуйтесь в социуме, обретя материальный достаток. Для Вас это важно.`;
parentsPanelItem.appendChild(paragraph);
break;
}
case 20: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(20) К сожалению, скорее всего, у Вас очень трудные отношения с родителями - полное непонимание, постоянные конфликты, взаимные обиды, упрёки и претензии. В детстве Вам не хотелось находиться дома, хотелось сбежать, исчезнуть. Конфликты могли распространяться не только на родителей, но и на всю семью. Вы могли чувствовать себя чужим в семье, могли чувствовать холодность и безразличие со стороны всех её членов. Но во взрослой жизни судьба может специально ставить в такие ситуации, когда Вы будете вынуждены просить помощи у семьи. Что бы этого не случалось, что бы в Вашей жизни не случалось неприятных ситуаций, Вам нужно наладить отношения со своей семьей.  И начните с себя. Если Вы хотите улучшить взаимоотношения с родителями, то безотлагательно начните работать в этом направлении со своей стороны уже сейчас. Будьте благодарны за то, что они подарили Вам эту жизнь. Научитесь оценивать ситуацию с точки зрения родителей, постарайтесь понять, почему они принимали то или иное решение, почему совершали те или иные поступки. Развивайте в себе самостоятельную личность. Постарайтесь понять причины проблем в отношениях. Проанализируйте, что именно беспокоит вас во взаимоотношениях с родителями. Проявляйте уважение. Даже если вы не согласны с родительским подходом, их ценностями или принципами, будьте тактичны. Не позволяйте проблемам усугубляться. Управляйте эмоциями - не будьте вспыльчивым при общении с родителями, чтобы не сказать ничего, о чем впоследствии пожалеете. Не забывайте улыбаться родителям. Демонстрируйте теплый и позитивный настрой. Показывайте, что Вы рады их видеть, что Вас беспокоит их благополучие. Будьте открыты и честны. Поймите, что, скорее всего, Вам не удастся кардинально изменить своих родителей, поэтому просто примите их такими, какие они есть и простите им все свои обиды. `;
parentsPanelItem.appendChild(paragraph);
break;
}
case 21: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(21) Постоянные ограничения со стороны родителей привели к тому, что Вы сами стали очень ограниченным и узко мыслящим человеком. Но чтобы добиться успеха, нужно мыслить шире. Выйдите из зоны комфорта. Не бойтесь своих чувств. Откажитесь от принятых рамок и чужих суждений. Определите бессмысленные вещи, которым придаете большое значение. Медитируйте. Доверяйте интуиции и развивайте ее. Путешествуйте, чтобы видеть и знать, как живут другие люди. Уберите блокировки. Соединитесь с природой. Прикоснитесь к сердцу мира, почувствуйте единство с ним и его дарами, в этом ощущении кроются ответы, которые вы ищете.`;
parentsPanelItem.appendChild(paragraph);
break;
}
case 22: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(22) Чрезмерный контроль со стороны Ваших родителей мог разрушить Вашу личность, подавив в Вас любую инициативность. В результате Вы превратились в безвольного человека, неспособного к принятию любых самостоятельных решений, не способного отвечать за свои поступки и держать обещания. Вам нужно усердно поработать над собой, чтобы обрести свободу и стать тем человеком, которым Вы должны были стать. Вам следует научиться осознанно принимать решения, понимать и принимать последствия своих собственных действий и решений, ставить цели, сформировать полезные привычки, быть искренним самим с собой. И самое главное - начните действовать. Развивайтесь, читайте, посещайте театры, открывайте новое, путешествуйте, общайтесь с разными людьми. Обретите свободу души и тела. `;
parentsPanelItem.appendChild(paragraph);
break;
}}
})
}}
let G2=calculation(G+Y);
let G1=calculation(G2+G);
let H2=calculation(H+Y);
let H1=calculation(H+H2);
parentsPanelContentCreate([E,E1,E2,X,G,G1,G2], 1);
parentsPanelContentCreate([F,F1,F2,X,H,H1,H2], 2);
parentsPanelContentCreate([A, A1, A2], 3);
let G4=calculation(C2+D2)
let L=calculation(D2+G4);
const lovesPanelItem=document.querySelector('#love_panel');
function lovesPanelContentCreate(numbers, G4){
const uniqNumbers=new Set(numbers);
if(gender==='М'){
const text=document.createElement('p');
text.innerHTML='Отношения у мужчин';
text.style.fontWeight='700';
lovesPanelItem.appendChild(text);
Array.from(uniqNumbers).map((item)=> {
switch (item){
case 3: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(3) Очень уступчивые, податливые мужчины, живут ради женщины, очень нежные и чуткие в сексе, заботятся об исполнении всех её желаний, которые ставят превыше своих. Для них женщина - это королева, а он её преданный слуга. Но здесь может и быть и совсем другая сторона - мужчина может стремиться к полигамности, может состоять в отношениях сразу с несколькими женщинами, он долго не может определиться с выбором спутницы на всю дальнейшую жизнь, а свои физиологические потребности пытается удовлетворить с каждой понравившейся особой. В этом случаем ему нужна женщина с сильной энергетикой и сильным характером, самодостаточная, целеустремлённая и независимая, такая женщина должна стать ярким лидером в отношениях, и именно такой женщине он не будет изменять, безгранично уважая, заботясь и исполняя все её желания. `;
lovesPanelItem.appendChild(paragraph);
break;
}
case 4: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(4) В отношениях главенствующая роль должна принадлежать мужчине, он должен принимать решения, брать на себя ответственность за себя и свою женщину, должен быть справедливым, последовательным и целеустремлённым, не на него можно положиться, он защитник и опора, полностью материально обеспечивает свою женщину, становясь для неё непререкаемым авторитетом.
<br>Знакомство, как правило, произойдёт в местах скопления сильной мужской энергетики, там, где мужчина проявляет самые сильные черты характера (это может быть какая-то структура Министерства обороны или Министерства внутренних дел или Министерства по чрезвычайным ситуациям, а может быть и спортивный зал, ориентированный на мужчин).
`;
lovesPanelItem.appendChild(paragraph);
break;
}
case 5: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(5) Партнёр будет сторонником только официально оформленных отношений, для него важно, чтобы всё было сделано по установленному ранее порядку - знакомство с родителями, их одобрение брака, классические обручальные кольца, свадьба, венчание. Для него неприемлемы гражданские браки и дети, рождённые вне брака. Если он долго не может убедить вторую половину поставить штамп в паспорте, то неминуемо последует расставание. Партнёр может быть учителем в школе или преподавателем в ВУЗе, непременно образованный, умный и мудрый. Способный стать заботливым наставником и мотиватором для своей второй половины. И знакомство может произойти именно там - в сфере образования, либо же в местах скопления религиозной силы (храмах, паломнических турах и т.п.). Здесь же очень важно, что такой партнёр никогда не допустит связи с несвободным человеком, то есть с женатым или замужним, так как для него законы совести так же много значат, как и законы гражданско-правовые. `;
lovesPanelItem.appendChild(paragraph);
break;
}
case 6: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(6) Чуткий и ласковый партнёр с большим и добрым сердцем, готовый окутать своим теплом и заботой, любящий устраивать романтические свидания, способный показывать и говорить о своей любви, устраивающий маленькие праздники, сюрпризы и подарки без повода для своей второй половинки. Знакомство может произойти там, где царит любовь и атмосфера праздника, например на свадьбе у друзей.
<br>Либо же вообще избранником может стать друг или хороший знакомый, на которого Вы иначе взглянете после какого-то спорного случая, он откроется по-новому и Ваше сердце откликнется. Но может быть и ситуация, в случае если эта энергия не уравновешена, когда нет серьёзных отношений, отношения без какого-либо внутреннего глубокого содержания, партнёр очень легкомысленный и неверный, пустые бессмысленные отношения без перспектив, и самое главное, без любви.
`;
lovesPanelItem.appendChild(paragraph);
break;
}
case 7: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(7) Очень целеустремленный, активный и деятельный партнёр, который постоянно находится в движении и потребует этого и от Вас. Он не стоит на месте, смело ставит цели и их достигает. В отношениях ему тоже нужны цели, тогда ему не будет скучно, и он будет доволен и счастлив. Он обладает положительными качествами, но напрочь лишён романтики и нежности, то есть ласка и мягкость - это не про него. И ищет такого же партнёра, Вы должны быть ему под стать - этаким достигатором. Гармония в отношениях будет тогда, когда Вы будете ставить общие цели и вместе их достигать.
<br>Знакомство с таким партнёром может произойти в одной из структур Министерства обороны или Министерства внутренних дел или Министерства по чрезвычайным ситуациям, а может произойти и в спортивном зале, ориентированном на мужчин, где занимаются пауэрлифтингом или боксом. Либо же на автогонках или выставках военной техники.
<br><br>
В целом, семёрка на линиях отношений говорит об очень нервных отношениях, люди находятся в постоянном стрессе и напряжении, скандалят, воюют, выясняют, разбираются, давят, соревнуются, меряются, угрожают, и в итоге, конечно, расходятся, потому что невыносимо уже даже физически становится жить рядом с человеком. Если скандалы в ваших отношениях только начались, остановитесь, отдохните друг от друга, уедете к родителям на несколько дней, или на выходные в дом отдыха, дайте друг другу возможность побыть одному. Перезагрузите отношения, поставьте общие цели, поделитесь мечтами и желаниями, найдите те, которые совпадают, и начинайте вместе их осуществлять, рука об руку. Поймите, что Вы друг другу партнёры, а не конкуренты и соперники. Вы вместе, чтобы строить, а не разрушать, вы вместе, чтобы любить, а не воевать.
`;
lovesPanelItem.appendChild(paragraph);
break;
}
case 8: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(8) Мудрый, честный, справедливый партнёр, который старается всегда беспристрастно и объективно смотреть на любые ситуации и события, терпим к другим людям и искренен с собой и окружающими. Он может быть адвокатом или прокурором, финансовым аналитиком или специалистом по взысканию просроченной задолженности. И скорее всего, именно там, где он исполняет свои профессиональные обязанности, и произойдёт знакомство. И тут самое главное учесть, в какой именно ситуации произошло это знакомство. Если, например, на суде, то и отношения зарядятся атмосферой, которая царила там. Если эта атмосфера была негативной, давящей, то и отношения будут такими. А если, например, знакомство, произошло на семинаре по финансовым продуктам, где царила спокойная и непринуждённая обстановка, то и отношения будут такими. То есть отношения заряжаются энергетикой того места и тех событий, при которых зародились.
<br><br>В целом, если восьмёрка на линиях отношений, то партнёр очень понятный, его поступки легко предвидеть, его реакции всегда понятны. Он и сам ни манипулирует, ни водит за нос, не обижается, не выясняет отношения. Здесь нет места романтики, но есть место стабильности, спокойствию, уверенности в завтрашнем дне, нередко такой партнёр просит заключить брачный договор, в котором всё будет прописано и расписано.
`;
lovesPanelItem.appendChild(paragraph);
break;
}
case 9: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(9) Мудрый и зрелый партнёр, который последователен в своих реакциях, понимает и себя и другого, способен и слушать и слышать, проявляет адекватные чувства и реакции, которые не боится и не стесняется выражать, даже если это грусть или страх, умеет радоваться и наслаждаться жизнью, не убегает от проблем в отношениях, а открыто о них говорит и ищет выход из ситуации. Он способен делиться своими знаниями и своей мудростью со своим партнёром, который в свою очередь будет его безгранично ценить и уважать.
<br>Знакомство может произойти в местах образования, медицины, научной деятельности. Партнёр может быть врачом, педагогом, психологом, научным сотрудником. Вероятно, будет старше. Этот человек любит одиночество, дом, скорее всего, он интроверт, не любящий шумных компаний и чрезмерное общение.
`;
lovesPanelItem.appendChild(paragraph);
break;
}
case 10: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(10) Партнёр, который позитивен в общении, приветлив, дружелюбен, быстро прощает, не обидчив. С ним можно поговорить и договориться обо всем. Он вселяет оптимизм и надежду. Не треплет своей половине нервы, не устраивает скандалы и разборки на пустом месте, не самоутверждается за чужой счет. При общении с ним не нужно подбирать слова, можно просто быть самим собой. И само общение оставляет приятное послевкусие. Он может быть ни к чему не привязан - ни к работе, ни к месту жительства, и именно это не только его плюс, но и его минус, и прежде всего для его второй половины, так как означает отсутствие стабильности.
<br>Знакомство с ним может произойти в путешествии, в парке аттракционов, на дне рождении, на любом праздничном мероприятии.
`;
lovesPanelItem.appendChild(paragraph);
break;
}
case 11: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(11) Партнёр, излучающий сексуальную энергию, вызывающий сексуальные чувства и желания в других, уверенный в себе, чувственный, пылкий, жгучий, притягивает к себе противоположный пол как магнит. Полностью понимает свою притягательность и сексуальность и может применить это во вред другим людям, то есть, например, соблазнить и бросить. В этом случае будет непременно наказан высшими силами, об этом надо помнить и не совершать низких и подлых поступков. Знакомство с избранником может произойти, в принципе, где угодно - на работе, в путешествиях, в фитнес-центрах.
<br><br>Если эта энергия в минусе, то партнёр грубый, упрямый, несговорчивый, холодный, равнодушный. Если она в плюсе, то партнёр открытый, добрый, заботливый, нежный и несомненно любящий и с этим человеком будет очень счастливый и крепкий союз.`;
lovesPanelItem.appendChild(paragraph);
break;
}
case 12: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(12) Своеобразные необычные отношения. В них один из партнёров может быть намного старше или намного младше другого. Либо же партнёр может быть другой религии и совершенно иного менталитета. Либо партнёры из совершенно разных слоёв населения, например, отличница и хулиган. Либо отношения на расстоянии, когда партнеры находятся на разных концах Земли и общаются по видеосвязи. Либо партнёр несвободен.
<br><br>
Если эта энергия в минусе, то появляются зависимые отношения, при которых зависимому партнеру хочется все делать вместе со своей половинкой, и он забывает о семье, друзьях, своем развитии, он всю свою жизнь подчиняет любимому и мысль о том, что это когда-то может закончится, вызывает у него панический страх.
<br>Если энергия в плюсе, то это может быть очень интересный самобытный партнёр, выделяющийся из толпы, очень самодостаточный и состоявшийся в любимом деле, не зависящий от мнения окружающих, способный сплотить вокруг себя людей и быть для них авторитетом.
`;
lovesPanelItem.appendChild(paragraph);
break;
}
case 13: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(13) Отношения-американские гонки, постоянный экстрим, адреналин, такие эмоциональные качели. Сильная эйфория и страсть сменяются глубоким отчаянием и болью. И люди «подсаживаются» на такие сильные эмоции, потому что, благодаря им, они чувствуют себя живыми. Знакомство, как правило, происходит там, где много этого самого адреналина и экстрима.
<br><br>
Если эта энергия в минусе, то знакомство может произойти при очень неприятных и болезненных обстоятельствах, например, на похоронах. В таком случае, чтобы эта неприятная энергия не потянулась в отношения, нужно будет больше проводить время там, где много позитива - в парках развлечений, в путешествиях и т.д. `;
lovesPanelItem.appendChild(paragraph);
break;
}
case 14: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(14) Крепкий и гармоничный союз двух любящих людей, построенный на взаимном уважении, понимании и, конечно, любви. Партнёр в таком случае будет обладать ясным разумом, чистой душой и светлыми мыслями, очень добрый и чувствующий свою половинку, понимающий её с полуслова. Знакомство может произойти там, где этот партнёр работает или отдыхает душой - в театре, на концерте классической музыки, в музее, либо же в путешествии по каким-то историческим местам. Также он может работать в медицине, либо же быть хорошим психологом.
<br><br>
Если эта энергия у человека в минусе, то партнёр может быть зависим от алкоголя или же иных запрещённых веществ, может строить из себя жертву, быть злым, агрессивным, вечно недовольным и постоянно принижающим достоинства другого человека, манипулировать своим здоровьем, проблемами, требовать деньги и заботу. `;
lovesPanelItem.appendChild(paragraph);
break;
}
case 15: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(15) В качестве партнёра может попасться психически нестабильный человек с разными формами сексуальных расстройств, сексуальных зависимостей и больными сексуальными фантазиями. Либо же человек с иными формами зависимостей, человек с искажённым и отчасти больным мировоззрением. Либо партнеры с нечистой совестью, либо вообще с её отсутствием, готовые на обман и преступления ради получения материальных благ. Такой партнёр может втянуть в самые неприятные истории с тяжёлыми последствиями. Находясь в отношениях с любым из вышеперечисленных типов партнёров, могут на ровном месте начаться серьёзнейшие проблемы с физическим и психическим здоровьем. Возможно, попадётся партнёр, который начнёт строить отношения для получения выгоды, материальных или иных благ, то есть в его голове будет сплошной расчёт и полное отсутствие любви или даже просто тёплых чувств. При этом он ещё и будет требовать разнообразный и нетривиальный секс и склонять партнёра к разного рода сексуальным экспериментам.
<br><br>
Если энергия в плюсе, нужно искать в партнёры успешного, состоявшегося и зрелого человека, который способен контролировать свои эмоции, желания и разного рода порывы, обладающий моральными ценностями и устоями. Главное, что бы он не подавлял и не требовал невозможное.
<br>Если энергия в минусе, то партнёр может быть они очень авторитарным и деспотичным, любящим контролировать и подавлять, а так же непрестанно требующий к себе повышенного внимания и гипер заботы (например, надо срочно уйти с работы, чтобы найти и погладить ему определённую рубашку или прямо сейчас он хочет пирог и надо срочно отпрашиваться с работы и бежать печь).
`;
lovesPanelItem.appendChild(paragraph);
break;
}
case 16: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(16) Партнёр может нести как хорошее, так и плохое. Всё зависит от того, в плюсе или минусе эта энергия.
<br><br>
Если энергия в плюсе, то это очень гармоничный и прочный союз двух светлых и добрых сердец, которые нашли друг друга, чтобы до наполнить жизни друг друга тем, чего не хватает, и идти рука об руку по жизни в полном взаимопонимании, любви и радости. Такие идеальные отношения даются только тем, кто прошёл через определенные трудности и испытания, которые подкидывала им судьба. Если испытания не пройдены, то энергия уходит в минус, и сам партнёр уходит в минус, обрастая отрицательными эмоциями и негативными реакциями на всё, что с ним происходит. Он становится злым, жестоким, непорядочным, лицемерным, с постоянными упрёками и претензиями, его всё больше и больше затягивают разного рода зависимости и больные фантазии.
<br><br>
Если энергия в плюсе, то знакомство с партнёром может произойти в местах духовного просвещения - на медитациях, йоге, тренингах и семинарах по психологии или духовному развитию и т. п.
`;
lovesPanelItem.appendChild(paragraph);
break;
}
case 17: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(17) Яркий, талантливый, творчески одарённый партнёр, обладающий индивидуальностью, который не боится быть непохожим на окружающих, любит себя и уверен в себе, его невозможно не заметить, часто это известная личность. Знакомство с ним происходит в каких-то публичных местах, на концертах и других схожих мероприятиях. Такой партнёр тянет свою половинку в свою жизнь, и через него она также получает свою минуту славы.
<br><br>
Если эта энергия в минусе, то отношения, скорее всего, не афишируются или даже скрываются одним из партнёров. Причины могут быть совершенно разные. Например, страх неодобрения со стороны родственников.
`;
lovesPanelItem.appendChild(paragraph);
break;
}
case 18: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(18) Есть большая вероятность получить в партнёры человека из самых низших слоёв населения, человека вне социума, преступника, алкоголика, маньяка, извращенца, человека с чёрной испорченной душой и жестоким сердцем. Естественно, от такого партнёра нужно бежать, не оглядываясь. Но тут важно понять то, что Вы сами могли своими мыслями притянуть такого человека. Подобное притягивает подобное, помните? Чем больше Вы чего-то боитесь и думаете об этом, с тем большей вероятностью оно и произойдёт. Перестаньте думать в негативном ключе о своих будущих отношениях, иначе это может закончится весьма и весьма плохо для Вас - от просто плохого окружения, в которое Вас затянет Ваш партнёр, до жёсткого насилия с его стороны. Здесь ещё может быть такой момент, что Вы можете просто не видеть, с кем имеете дело. Он может пудрить Вам мозги, говоря о вечной любви, искренней к Вам привязанности, благих намерениях и больших планах. И тут жизненно важно для Вас слушать людей, которым Вы не безразличны. Если всё Ваше окружение говорит о том, что Вы связались с аморальной и преступной личностью, то стоит прислушаться к ним и сделать выводы, разорвав отношения. Как только Вы начнёте позитивно мыслить, как только Вы очистите Вашу душу от негатива, впустите в неё Божественный свет, так сразу встретите достойного и положительного партнёра. Им окажется очень добросердечный человек, который достойно и без негатива проживает свою жизнь, окружен порядочными и искренними друзьями, такими же как и он сам.
<br>При любых вариантах нужно всегда смотреть на окружение партнера. По друзьям и окружению человека можно многое сказать и о нем. Если он играет роль положительного персонажа, а в его друзьях насильники и воры, то разумеется, что он отнюдь не положительный персонаж.
<br><br>
Так же эта энергия на отношениях означает, что вроде как отношения есть, но вроде как их и нет. Например, отношения на расстоянии, отношения с несвободным партнёром, отношения без перспектив перейти в полноценную семью. Оба партнёра затягиваются в такие отношения и могут годами ждать, например, когда партнёр разведётся со своей женой или своим мужем, захочет официально оформить отношения, родить детей, переехать жить в страну, где живёт его половинка. В таких ситуациях страдают оба партнёра. И нужно признать ненормальность существующих отношений, вывести их на другой уровень или разорвать.
`;
lovesPanelItem.appendChild(paragraph);
break;
}
case 19: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(19) Партнёр, преуспевающий во всех делах, развивающийся в любых выбранных им направлениях, материально обеспечен, обладает моральными ценностями, духовно развит, ему всегда сопутствует удача, он знает, чего он хочет, не тратит время на безделье или дела, которые не приносят пользы, умеет расставлять приоритеты и распределять время согласно целям. Несёт свет и благо людям, занимается благотворительностью либо иной деятельностью, связанной с оказанием помощи людям. Это, так скажем, его хобби. Нередко начиная с ним отношения, его вторая половинка ждёт от него не только взаимных чувств, но и некой помощи в развитии, карьерном росте и т.д. В этом нет ничего дурного, если на первом месте всё-таки стоят чувства, а не расчёт. Если же начинать отношения исключительно ради выгоды, то это негативно скажется на карме и принесёт проблемы, которые не сможет решить ни один партнёр. Оптимальным вариантом будет тот, при котором такой успешный партнёр станет тем, кто будет вдохновлять и мотивировать его половинку к развитию, дальнейшему обучению, духовному росту.
<br><br>
Если эта энергия находится в минусе, то может попасться партнёр - прожигатель жизни, без гроша за душой, который и Вас способен вогнать в долги. Либо же придется стать любовницей/любовником несвободного человека или какого-то влиятельного человека, связь с которым нельзя афишировать, чтобы не испортить ему репутацию.
`;
lovesPanelItem.appendChild(paragraph);
break;
}
case 20: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(20) Возможно Вас ожидают отношения с одним из Ваших родственников(двоюродные, троюродные), либо партнёр будет намного старше Вас и будет годиться Вам в отцы или матери, либо же модель отношений будет такая, при которой один из партнёров будет играть роль ребёнка, а другой выступать в роли его родителя. не исключены и отношения с иностранцем.
<br><br>
В любом случае, если данная энергия в минусе, то семья не принимает Ваш выбор и не хочет ничего знать о Вашем партнёре. Если данная энергия в плюсе, то семья безусловно принимает Ваш выбор и Ваш партнёр становится любимым всеми членом семьи. Здесь следует отметить, что если родственники принимают партнёра, то отношения удачно сложатся, а вот если они его не приняли, то, к сожалению, отношения обречены.
<br>Эта энергия так же означает, что партнёр сможет показать Вам весь мир, вы будете вместе много путешествовать, открывая новые страны и культуры, встречая и знакомясь с новыми людьми.
`;
lovesPanelItem.appendChild(paragraph);
break;
}
case 21: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(21) Партнёр, отличающийся от Вас взглядами, мировоззрением, менталитетом, религией. То есть он другой. С ним может быть две абсолютно разные ситуации. При отрицательном сценарии Вас ждут несчастливые отношения с партнёром-неудачником, Вас постигнет финансовая яма и отсутствие развития. При положительном сценарии Ваш партнёр будет обладать большими материальными и иными возможностями, сможет повлиять на многие процессы на этой планете, даст Вам возможность путешествовать и вместе познавать этот мир. Но такому партнёру нужна ровня, то есть тот, которого не придётся тянуть наверх, к развитию, деньгам, влиянию, славе, тот, кто сам сможет ни в чем не уступать ему. Познакомиться с партнёром из положительного сценария Вы сможете на международных выставках и ярмарках, международных кинофестивалях, участвуя в различных международных проектах по защите окружающей среды, в аэропорту, в самолёте по пути в другую страну, в другой стране, посещая какую-нибудь местную известную на весь мир достопримечательность. `;
lovesPanelItem.appendChild(paragraph);
break;
}
case 22: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(22) При минусе этой энергии Вам в партнёры может попасться человек из мест лишения свободы, либо человек, который там работает. Также здесь, может быть, и человек с психическими отклонениями и заболеваниями, человек с зависимостями (алкоголик, наркоман).
<br>Но может быть и просто человек, который пропагандирует свободные отношения без обязательств и обязанностей, либо же человек, живущий на две семьи и таким образом он ощущает себя более свободным, такая иллюзорная свобода, а по факту - обыкновенное предательство. Или же заядлый холостяк, которые будто любит свободу, но на самом деле просто боится ответственности, то есть свой страх прикрывает любовью к свободе. На самом же деле он более несвободен, чем человек, живущий в счастливом браке. Потому что находится в оковах своего страха, а токое сильнее любых других оков.
<br><br>
Но если энергия в плюсе, то здесь ожидает прекрасный и светлый союз двух людей, которые будут позитивно смотреть на жизнь, дарить друг другу тепло и заботу, будут вместе смеяться и путешествовать, вдохновлять и мотивировать друг друга, открывать новое и духовно развиваться. В этих отношениях будет царить лёгкость, отсутствие критики и ограничений, здесь будет та самая истинная свобода. Не исключено, что таким партнером может стать человек из другой страны.
`;
lovesPanelItem.appendChild(paragraph);
break;
}}
})
}
if(gender==='Ж'){
const text=document.createElement('p');
text.innerHTML='Отношения у женщин';
text.style.fontWeight='700';
lovesPanelItem.appendChild(text);
Array.from(uniqNumbers).map((item)=> {
switch (item){
case 3: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(3) Женщина может сама стать инициатором знакомства, просто подходя, представляясь и предлагая пообщаться. Либо же знакомство произойдёт в местах с сильной женской энергетикой (спа-центры, салоны красоты, детские игровые комплексы), либо там, где много женщин (женские коллективы на работе, мероприятия, рассчитанные на женщин - тренинги, семинары и т.п.) Либо познакомить с будущим партнёром может подруга, родственница, коллега по работе.
<br><br>
Тройка в плюсе - женщина ведет борьбу за доминирование в отношениях, то есть стремится занять лидирующее положение. Для неё важно быть объектом восхищения, хочет, чтобы к ней относились как к королеве. Она не будет строить отношения с мужчиной, который не может ей это дать.
""`;
lovesPanelItem.appendChild(paragraph);
break;
}
case 4: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(4) В отношениях главенствующая роль должна принадлежать мужчине, он должен принимать решения, брать на себя ответственность за себя и свою женщину, должен быть справедливым, последовательным и целеустремлённым, не на него можно положиться, он защитник и опора, полностью материально обеспечивает свою женщину, становясь для неё непререкаемым авторитетом.
<br>Знакомство, как правило, произойдёт в местах скопления сильной мужской энергетики, там, где мужчина проявляет самые сильные черты характера (это может быть какая-то структура Министерства обороны или Министерства внутренних дел или Министерства по чрезвычайным ситуациям, а может быть и спортивный зал, ориентированный на мужчин).
`;
lovesPanelItem.appendChild(paragraph);
break;
}
case 5: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(5) Партнёр будет сторонником только официально оформленных отношений, для него важно, чтобы всё было сделано по установленному ранее порядку - знакомство с родителями, их одобрение брака, классические обручальные кольца, свадьба, венчание. Для него неприемлемы гражданские браки и дети, рождённые вне брака. Если он долго не может убедить вторую половину поставить штамп в паспорте, то неминуемо последует расставание. Партнёр может быть учителем в школе или преподавателем в ВУЗе, непременно образованный, умный и мудрый. Способный стать заботливым наставником и мотиватором для своей второй половины. И знакомство может произойти именно там - в сфере образования, либо же в местах скопления религиозной силы (храмах, паломнических турах и т.п.). Здесь же очень важно, что такой партнёр никогда не допустит связи с несвободным человеком, то есть с женатым или замужним, так как для него законы совести так же много значат, как и законы гражданско-правовые. `;
lovesPanelItem.appendChild(paragraph);
break;
}
case 6: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(6) Чуткий и ласковый партнёр с большим и добрым сердцем, готовый окутать своим теплом и заботой, любящий устраивать романтические свидания, способный показывать и говорить о своей любви, устраивающий маленькие праздники, сюрпризы и подарки без повода для своей второй половинки. Знакомство может произойти там, где царит любовь и атмосфера праздника, например на свадьбе у друзей.
<br>Либо же вообще избранником может стать друг или хороший знакомый, на которого Вы иначе взглянете после какого-то спорного случая, он откроется по-новому и Ваше сердце откликнется. Но может быть и ситуация, в случае если эта энергия не уравновешена, когда нет серьёзных отношений, отношения без какого-либо внутреннего глубокого содержания, партнёр очень легкомысленный и неверный, пустые бессмысленные отношения без перспектив, и самое главное, без любви.
`;
lovesPanelItem.appendChild(paragraph);
break;
}
case 7: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(7) Очень целеустремленный, активный и деятельный партнёр, который постоянно находится в движении и потребует этого и от Вас. Он не стоит на месте, смело ставит цели и их достигает. В отношениях ему тоже нужны цели, тогда ему не будет скучно, и он будет доволен и счастлив. Он обладает положительными качествами, но напрочь лишён романтики и нежности, то есть ласка и мягкость - это не про него. И ищет такого же партнёра, Вы должны быть ему под стать - этаким достигатором. Гармония в отношениях будет тогда, когда Вы будете ставить общие цели и вместе их достигать.
<br>Знакомство с таким партнёром может произойти в одной из структур Министерства обороны или Министерства внутренних дел или Министерства по чрезвычайным ситуациям, а может произойти и в спортивном зале, ориентированном на мужчин, где занимаются пауэрлифтингом или боксом. Либо же на автогонках или выставках военной техники.
<br><br>
В целом, семёрка на линиях отношений говорит об очень нервных отношениях, люди находятся в постоянном стрессе и напряжении, скандалят, воюют, выясняют, разбираются, давят, соревнуются, меряются, угрожают, и в итоге, конечно, расходятся, потому что невыносимо уже даже физически становится жить рядом с человеком. Если скандалы в ваших отношениях только начались, остановитесь, отдохните друг от друга, уедете к родителям на несколько дней, или на выходные в дом отдыха, дайте друг другу возможность побыть одному. Перезагрузите отношения, поставьте общие цели, поделитесь мечтами и желаниями, найдите те, которые совпадают, и начинайте вместе их осуществлять, рука об руку. Поймите, что Вы друг другу партнёры, а не конкуренты и соперники. Вы вместе, чтобы строить, а не разрушать, вы вместе, чтобы любить, а не воевать.
`;
lovesPanelItem.appendChild(paragraph);
break;
}
case 8: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(8) Мудрый, честный, справедливый партнёр, который старается всегда беспристрастно и объективно смотреть на любые ситуации и события, терпим к другим людям и искренен с собой и окружающими. Он может быть адвокатом или прокурором, финансовым аналитиком или специалистом по взысканию просроченной задолженности. И скорее всего, именно там, где он исполняет свои профессиональные обязанности, и произойдёт знакомство. И тут самое главное учесть, в какой именно ситуации произошло это знакомство. Если, например, на суде, то и отношения зарядятся атмосферой, которая царила там. Если эта атмосфера была негативной, давящей, то и отношения будут такими. А если, например, знакомство, произошло на семинаре по финансовым продуктам, где царила спокойная и непринуждённая обстановка, то и отношения будут такими. То есть отношения заряжаются энергетикой того места и тех событий, при которых зародились.
<br><br>
В целом, если восьмёрка на линиях отношений, то партнёр очень понятный, его поступки легко предвидеть, его реакции всегда понятны. Он и сам ни манипулирует, ни водит за нос, не обижается, не выясняет отношения. Здесь нет места романтики, но есть место стабильности, спокойствию, уверенности в завтрашнем дне, нередко такой партнёр просит заключить брачный договор, в котором всё будет прописано и расписано.
`;
lovesPanelItem.appendChild(paragraph);
break;
}
case 9: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(9) Мудрый и зрелый партнёр, который последователен в своих реакциях, понимает и себя и другого, способен и слушать и слышать, проявляет адекватные чувства и реакции, которые не боится и не стесняется выражать, даже если это грусть или страх, умеет радоваться и наслаждаться жизнью, не убегает от проблем в отношениях, а открыто о них говорит и ищет выход из ситуации. Он способен делиться своими знаниями и своей мудростью со своим партнёром, который в свою очередь будет его безгранично ценить и уважать.
<br>Знакомство может произойти в местах образования, медицины, научной деятельности. Партнёр может быть врачом, педагогом, психологом, научным сотрудником. Вероятно, будет старше. Этот человек любит одиночество, дом, скорее всего, он интроверт, не любящий шумных компаний и чрезмерное общение.
`;
lovesPanelItem.appendChild(paragraph);
break;
}
case 10: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(10) Партнёр, который позитивен в общении, приветлив, дружелюбен, быстро прощает, не обидчив. С ним можно поговорить и договориться обо всем. Он вселяет оптимизм и надежду. Не треплет своей половине нервы, не устраивает скандалы и разборки на пустом месте, не самоутверждается за чужой счет. При общении с ним не нужно подбирать слова, можно просто быть самим собой. И само общение оставляет приятное послевкусие. Он может быть ни к чему не привязан - ни к работе, ни к месту жительства, и именно это не только его плюс, но и его минус, и прежде всего для его второй половины, так как означает отсутствие стабильности.
<br>Знакомство с ним может произойти в путешествии, в парке аттракционов, на дне рождении, на любом праздничном мероприятии.
`;
lovesPanelItem.appendChild(paragraph);
break;
}
case 11: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(11) Партнёр, излучающий сексуальную энергию, вызывающий сексуальные чувства и желания в других, уверенный в себе, чувственный, пылкий, жгучий, притягивает к себе противоположный пол как магнит. Полностью понимает свою притягательность и сексуальность и может применить это во вред другим людям, то есть, например, соблазнить и бросить. В этом случае будет непременно наказан высшими силами, об этом надо помнить и не совершать низких и подлых поступков. Знакомство с избранником может произойти, в принципе, где угодно - на работе, в путешествиях, в фитнес-центрах.
<br><br>
Если эта энергия в минусе, то партнёр грубый, упрямый, несговорчивый, холодный, равнодушный. Если она в плюсе, то партнёр открытый, добрый, заботливый, нежный и несомненно любящий и с этим человеком будет очень счастливый и крепкий союз.`;
lovesPanelItem.appendChild(paragraph);
break;
}
case 12: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(12) Своеобразные необычные отношения. В них один из партнёров может быть намного старше или намного младше другого. Либо же партнёр может быть другой религии и совершенно иного менталитета. Либо партнёры из совершенно разных слоёв населения, например, отличница и хулиган. Либо отношения на расстоянии, когда партнеры находятся на разных концах Земли и общаются по видеосвязи. Либо партнёр несвободен.
<br><br>
Если эта энергия в минусе, то появляются зависимые отношения, при которых зависимому партнеру хочется все делать вместе со своей половинкой, и он забывает о семье, друзьях, своем развитии, он всю свою жизнь подчиняет любимому и мысль о том, что это когда-то может закончится, вызывает у него панический страх.
<br>Если энергия в плюсе, то это может быть очень интересный самобытный партнёр, выделяющийся из толпы, очень самодостаточный и состоявшийся в любимом деле, не зависящий от мнения окружающих, способный сплотить вокруг себя людей и быть для них авторитетом.
`;
lovesPanelItem.appendChild(paragraph);
break;
}
case 13: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(13) Отношения-американские гонки, постоянный экстрим, адреналин, такие эмоциональные качели. Сильная эйфория и страсть сменяются глубоким отчаянием и болью. И люди «подсаживаются» на такие сильные эмоции, потому что, благодаря им, они чувствуют себя живыми. Знакомство, как правило, происходит там, где много этого самого адреналина и экстрима.
<br><br>
Если эта энергия в минусе, то знакомство может произойти при очень неприятных и болезненных обстоятельствах, например, на похоронах. В таком случае, чтобы эта неприятная энергия не потянулась в отношения, нужно будет больше проводить время там, где много позитива - в парках развлечений, в путешествиях и т.д. `;
lovesPanelItem.appendChild(paragraph);
break;
}
case 14: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(14) Крепкий и гармоничный союз двух любящих людей, построенный на взаимном уважении, понимании и, конечно, любви. Партнёр в таком случае будет обладать ясным разумом, чистой душой и светлыми мыслями, очень добрый и чувствующий свою половинку, понимающий её с полуслова. Знакомство может произойти там, где этот партнёр работает или отдыхает душой - в театре, на концерте классической музыки, в музее, либо же в путешествии по каким-то историческим местам. Также он может работать в медицине, либо же быть хорошим психологом.
<br><br>
Если эта энергия у человека в минусе, то партнёр может быть зависим от алкоголя или же иных запрещённых веществ, может строить из себя жертву, быть злым, агрессивным, вечно недовольным и постоянно принижающим достоинства другого человека, манипулировать своим здоровьем, проблемами, требовать деньги и заботу. `;
lovesPanelItem.appendChild(paragraph);
break;
}
case 15: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(15) В качестве партнёра может попасться психически нестабильный человек с разными формами сексуальных расстройств, сексуальных зависимостей и больными сексуальными фантазиями. Либо же человек с иными формами зависимостей, человек с искажённым и отчасти больным мировоззрением. Либо партнеры с нечистой совестью, либо вообще с её отсутствием, готовые на обман и преступления ради получения материальных благ. Такой партнёр может втянуть в самые неприятные истории с тяжёлыми последствиями. Находясь в отношениях с любым из вышеперечисленных типов партнёров, могут на ровном месте начаться серьёзнейшие проблемы с физическим и психическим здоровьем. Возможно, попадётся партнёр, который начнёт строить отношения для получения выгоды, материальных или иных благ, то есть в его голове будет сплошной расчёт и полное отсутствие любви или даже просто тёплых чувств. При этом он ещё и будет требовать разнообразный и нетривиальный секс и склонять партнёра к разного рода сексуальным экспериментам.
<br>Если энергия в плюсе, нужно искать в партнёры успешного, состоявшегося и зрелого человека, который способен контролировать свои эмоции, желания и разного рода порывы, обладающий моральными ценностями и устоями. Главное, что бы он не подавлял и не требовал невозможное.
<br><br>
Если энергия в минусе, то партнёр может быть они очень авторитарным и деспотичным, любящим контролировать и подавлять, а так же непрестанно требующий к себе повышенного внимания и гипер заботы (например, надо срочно уйти с работы, чтобы найти и погладить ему определённую рубашку или прямо сейчас он хочет пирог и надо срочно отпрашиваться с работы и бежать печь).
`;
lovesPanelItem.appendChild(paragraph);
break;
}
case 16: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(16) Партнёр может нести как хорошее, так и плохое. Всё зависит от того, в плюсе или минусе эта энергия.
<br><br>
Если энергия в плюсе, то это очень гармоничный и прочный союз двух светлых и добрых сердец, которые нашли друг друга, чтобы до наполнить жизни друг друга тем, чего не хватает, и идти рука об руку по жизни в полном взаимопонимании, любви и радости. Такие идеальные отношения даются только тем, кто прошёл через определенные трудности и испытания, которые подкидывала им судьба. Если испытания не пройдены, то энергия уходит в минус, и сам партнёр уходит в минус, обрастая отрицательными эмоциями и негативными реакциями на всё, что с ним происходит. Он становится злым, жестоким, непорядочным, лицемерным, с постоянными упрёками и претензиями, его всё больше и больше затягивают разного рода зависимости и больные фантазии.
<br><br>
Если энергия в плюсе, то знакомство с партнёром может произойти в местах духовного просвещения - на медитациях, йоге, тренингах и семинарах по психологии или духовному развитию и т. п.
`;
lovesPanelItem.appendChild(paragraph);
break;
}
case 17: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(17) Яркий, талантливый, творчески одарённый партнёр, обладающий индивидуальностью, который не боится быть непохожим на окружающих, любит себя и уверен в себе, его невозможно не заметить, часто это известная личность. Знакомство с ним происходит в каких-то публичных местах, на концертах и других схожих мероприятиях. Такой партнёр тянет свою половинку в свою жизнь, и через него она также получает свою минуту славы.
<br><br>
Если эта энергия в минусе, то отношения, скорее всего, не афишируются или даже скрываются одним из партнёров. Причины могут быть совершенно разные. Например, страх неодобрения со стороны родственников.
`;
lovesPanelItem.appendChild(paragraph);
break;
}
case 18: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(18) Есть большая вероятность получить в партнёры человека из самых низших слоёв населения, человека вне социума, преступника, алкоголика, маньяка, извращенца, человека с чёрной испорченной душой и жестоким сердцем. Естественно, от такого партнёра нужно бежать, не оглядываясь. Но тут важно понять то, что Вы сами могли своими мыслями притянуть такого человека. Подобное притягивает подобное, помните? Чем больше Вы чего-то боитесь и думаете об этом, с тем большей вероятностью оно и произойдёт. Перестаньте думать в негативном ключе о своих будущих отношениях, иначе это может закончится весьма и весьма плохо для Вас - от просто плохого окружения, в которое Вас затянет Ваш партнёр, до жёсткого насилия с его стороны. Здесь ещё может быть такой момент, что Вы можете просто не видеть, с кем имеете дело. Он может пудрить Вам мозги, говоря о вечной любви, искренней к Вам привязанности, благих намерениях и больших планах. И тут жизненно важно для Вас слушать людей, которым Вы не безразличны. Если всё Ваше окружение говорит о том, что Вы связались с аморальной и преступной личностью, то стоит прислушаться к ним и сделать выводы, разорвав отношения. Как только Вы начнёте позитивно мыслить, как только Вы очистите Вашу душу от негатива, впустите в неё Божественный свет, так сразу встретите достойного и положительного партнёра. Им окажется очень добросердечный человек, который достойно и без негатива проживает свою жизнь, окружен порядочными и искренними друзьями, такими же как и он сам.
<br>При любых вариантах нужно всегда смотреть на окружение партнера. По друзьям и окружению человека можно многое сказать и о нем. Если он играет роль положительного персонажа, а в его друзьях насильники и воры, то разумеется, что он отнюдь не положительный персонаж.
<br><br>
Так же эта энергия на отношениях означает, что вроде как отношения есть, но вроде как их и нет. Например, отношения на расстоянии, отношения с несвободным партнёром, отношения без перспектив перейти в полноценную семью. Оба партнёра затягиваются в такие отношения и могут годами ждать, например, когда партнёр разведётся со своей женой или своим мужем, захочет официально оформить отношения, родить детей, переехать жить в страну, где живёт его половинка. В таких ситуациях страдают оба партнёра. И нужно признать ненормальность существующих отношений, вывести их на другой уровень или разорвать.
`;
lovesPanelItem.appendChild(paragraph);
break;
}
case 19: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(19) Партнёр, преуспевающий во всех делах, развивающийся в любых выбранных им направлениях, материально обеспечен, обладает моральными ценностями, духовно развит, ему всегда сопутствует удача, он знает, чего он хочет, не тратит время на безделье или дела, которые не приносят пользы, умеет расставлять приоритеты и распределять время согласно целям. Несёт свет и благо людям, занимается благотворительностью либо иной деятельностью, связанной с оказанием помощи людям. Это, так скажем, его хобби. Нередко начиная с ним отношения, его вторая половинка ждёт от него не только взаимных чувств, но и некой помощи в развитии, карьерном росте и т.д. В этом нет ничего дурного, если на первом месте всё-таки стоят чувства, а не расчёт. Если же начинать отношения исключительно ради выгоды, то это негативно скажется на карме и принесёт проблемы, которые не сможет решить ни один партнёр. Оптимальным вариантом будет тот, при котором такой успешный партнёр станет тем, кто будет вдохновлять и мотивировать его половинку к развитию, дальнейшему обучению, духовному росту.
<br><br>
Если эта энергия находится в минусе, то может попасться партнёр - прожигатель жизни, без гроша за душой, который и Вас способен вогнать в долги. Либо же придется стать любовницей/любовником несвободного человека или какого-то влиятельного человека, связь с которым нельзя афишировать, чтобы не испортить ему репутацию.
`;
lovesPanelItem.appendChild(paragraph);
break;
}
case 20: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(20) Возможно Вас ожидают отношения с одним из Ваших родственников(двоюродные, троюродные), либо партнёр будет намного старше Вас и будет годиться Вам в отцы или матери, либо же модель отношений будет такая, при которой один из партнёров будет играть роль ребёнка, а другой выступать в роли его родителя. не исключены и отношения с иностранцем.
<br><br>
В любом случае, если данная энергия в минусе, то семья не принимает Ваш выбор и не хочет ничего знать о Вашем партнёре. Если данная энергия в плюсе, то семья безусловно принимает Ваш выбор и Ваш партнёр становится любимым всеми членом семьи. Здесь следует отметить, что если родственники принимают партнёра, то отношения удачно сложатся, а вот если они его не приняли, то, к сожалению, отношения обречены.
<br>Эта энергия так же означает, что партнёр сможет показать Вам весь мир, вы будете вместе много путешествовать, открывая новые страны и культуры, встречая и знакомясь с новыми людьми.
`;
lovesPanelItem.appendChild(paragraph);
break;
}
case 21: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(21) Партнёр, отличающийся от Вас взглядами, мировоззрением, менталитетом, религией. То есть он другой. С ним может быть две абсолютно разные ситуации. При отрицательном сценарии Вас ждут несчастливые отношения с партнёром-неудачником, Вас постигнет финансовая яма и отсутствие развития. При положительном сценарии Ваш партнёр будет обладать большими материальными и иными возможностями, сможет повлиять на многие процессы на этой планете, даст Вам возможность путешествовать и вместе познавать этот мир. Но такому партнёру нужна ровня, то есть тот, которого не придётся тянуть наверх, к развитию, деньгам, влиянию, славе, тот, кто сам сможет ни в чем не уступать ему. Познакомиться с партнёром из положительного сценария Вы сможете на международных выставках и ярмарках, международных кинофестивалях, участвуя в различных международных проектах по защите окружающей среды, в аэропорту, в самолёте по пути в другую страну, в другой стране, посещая какую-нибудь местную известную на весь мир достопримечательность. `;
lovesPanelItem.appendChild(paragraph);
break;
}
case 22: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(22) При минусе этой энергии Вам в партнёры может попасться человек из мест лишения свободы, либо человек, который там работает. Также здесь, может быть, и человек с психическими отклонениями и заболеваниями, человек с зависимостями (алкоголик, наркоман).
<br>Но может быть и просто человек, который пропагандирует свободные отношения без обязательств и обязанностей, либо же человек, живущий на две семьи и таким образом он ощущает себя более свободным, такая иллюзорная свобода, а по факту - обыкновенное предательство. Или же заядлый холостяк, которые будто любит свободу, но на самом деле просто боится ответственности, то есть свой страх прикрывает любовью к свободе. На самом же деле он более несвободен, чем человек, живущий в счастливом браке. Потому что находится в оковах своего страха, а токое сильнее любых других оков.
<br><br>
Но если энергия в плюсе, то здесь ожидает прекрасный и светлый союз двух людей, которые будут позитивно смотреть на жизнь, дарить друг другу тепло и заботу, будут вместе смеяться и путешествовать, вдохновлять и мотивировать друг друга, открывать новое и духовно развиваться. В этих отношениях будет царить лёгкость, отсутствие критики и ограничений, здесь будет та самая истинная свобода. Не исключено, что таким партнером может стать человек из другой страны.
`;
lovesPanelItem.appendChild(paragraph);
break;
}}
})
}
const text=document.createElement('p');
text.innerHTML='На выходе';
text.style.fontWeight='700';
lovesPanelItem.appendChild(text);
switch (G4){
case 3: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(3) прекращение отношений и расставания из-за измен.`;
lovesPanelItem.appendChild(paragraph);
break;
}
case 4: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(4) мужской авторитет сменяется авторитарность и деспотизмом, жестокостью, агрессией, подавлением и неуважением женщины, самодурством, что в конечном итоге приведёт к прекращению отношений. Также здесь может быть ситуацию, когда мужчина забывает, что он мужчина, не может обеспечить свою семью, стать поддержкой и опорой для своей женщины, мужчина как бы есть, но в то же время его и нет. `;
lovesPanelItem.appendChild(paragraph);
break;
}
case 5: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(5) Партнёр перегибает палку с постоянными нравоучениями, моралями, поучениями и критикой. Ему всегда всё не так, всегда всё не правильно, не так, как нужно. Душит своей "идеальностью" и "правильность". Это грозит расставанием. `;
lovesPanelItem.appendChild(paragraph);
break;
}
case 6: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(6) Отношения строятся на обмане и сопровождаются обманом, в них присутствуют хамство, неуважение, грубость, неверность, некрасивые поступки, всё это однозначно закончится расставанием. `;
lovesPanelItem.appendChild(paragraph);
break;
}
case 7: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(7) Отношения, в которых всегда есть конфликты, ссоры, разбирательства, взаимные упрёки и обвинения, выяснения, кто главный, кто кому и что должен. Любовь здесь уходит на второй план, а на первый выходит недовольство и агрессия. Неминуема окончательная потеря взаимопонимания и расставание. `;
lovesPanelItem.appendChild(paragraph);
break;
}
case 8: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(8) Ложь, обман и измены в отношениях, и как результат всего этого, тяжёлое расставание. Если отношения даны для отработки, то партнер, как правило, несвободен, живёт на две семьи, не уважает ни Вас, ни другого человека, использует и Вас и его, врёт, манипулирует, от таких отношений надо бежать без оглядки. `;
lovesPanelItem.appendChild(paragraph);
break;
}
case 9: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(9) Болезненная замкнутость, абсолютное равнодушие к близким людям, стойкое и сильное безразличие к материальным благам, непонимание нужд и чувств партнёра, нетерпимость, холодность, и как следствие, расставание. `;
lovesPanelItem.appendChild(paragraph);
break;
}
case 10: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(10) Тревожащая нестабильность, абсолютная неопределённость и неуверенность в завтрашнем дне, затянувшийся праздник, постоянное веселье, отсутствие серьёзного настроя и целей в жизни. В какой-то момент, начинаешь понимать, что непонятно, где вы будете завтра и что с вами будет происходить. По этим причинам отношения обречены. `;
lovesPanelItem.appendChild(paragraph);
break;
}
case 11: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(11) Чрезмерное давление в отношениях от кого-то из партнёров, нервные срывы, истерики, крайности во всём, резкость, хамство, цинизм, и неизбежное расставание. `;
lovesPanelItem.appendChild(paragraph);
break;
}
case 12: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(12) Модель отношений, при которой один из партнёров яростно выступает в роли жертвы, все время жалуется, страдает, просит о помощи, рассказывает о своих несчастьях и своём бессилии перед обстоятельствами, по этой причине стоит на месте, не развивается, и сами отношения в конечном итоге регрессируют и заканчиваются расставанием. `;
lovesPanelItem.appendChild(paragraph);
break;
}
case 13: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(13) Человек может столкнуться с потерей любимого человека, остаться вдовой или вдовцом. Либо же партнёр в погоне за адреналином может переходить черту и начинает играть со смертью, он становится адреналиновым наркоманом, не думая о чувствах и эмоциях близких людей. Здесь тоже только один исход - расставание. `;
lovesPanelItem.appendChild(paragraph);
break;
}
case 14: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(14) Алкоголизм, наркомания, игромания, измены, неспособность и нежелание себя реализовать, обвинения в адрес других людей в своих проблемах - всё это становится причиной прекращения нездоровых и мучительных отношений. `;
lovesPanelItem.appendChild(paragraph);
break;
}
case 15: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(15) Алкоголь, наркотики, игромания, насилие, ревность, это то, что убьёт отношения. `;
lovesPanelItem.appendChild(paragraph);
break;
}
case 16: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(16) Неудачи одного из партнёров стали причиной разрушения им отношений, он не смог с достоинством пройти все трудности, и самым лучшим выходом посчитал обвинения в адрес своей второй половины и разрыв отношений. Здесь же причиной разрыва может стать и то, что партнёр скатился в полностью аморальный образ жизни. `;
lovesPanelItem.appendChild(paragraph);
break;
}
case 17: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(17) Люди не сходятся темпераментами, один - экстраверт, жаждущий публичности, больших и шумных компаний, а другой - интроверт, любящий тишину, дом и уединение. В итоге они, так и не приспособившись к друг другу, расходятся. `;
lovesPanelItem.appendChild(paragraph);
break;
}
case 18: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(18) Сплошной негатив, алкоголь, наркотики, насилие, разврат, извращения, больная психика - всё это будет причиной расставания. `;
lovesPanelItem.appendChild(paragraph);
break;
}
case 19: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(19) Недостаток денег, постоянные кредиты, долги по ним, проблемы с трудоустройством, взаимное неуважение и взаимные обвинения, агрессия и злоба приведут к прекращению отношений. `;
lovesPanelItem.appendChild(paragraph);
break;
}
case 20: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(20) Всё банально - причиной расставания станут родственники, которые так и не смогут принять Ваш выбор, это негативно скажется на отношениях, начнутся недопонимания, обиды и последует расставание.`;
lovesPanelItem.appendChild(paragraph);
break;
}
case 21: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(21) Причины расставания в данном случае, достаточно разнообразны - от войны до долгов. И что интересно, причина расставания одного партнёра может не совпадать с причиной расставания другого партнёра. То есть, даже в этом у них могут быть расхождения, один будет считать, что причиной расставания стал невкусный борщ, а другой будет считать, что ей стала измена. А по большому счёту, причина всегда одна - отсутствие любви. `;
lovesPanelItem.appendChild(paragraph);
break;
}
case 22: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(22) Причиной расставания могут стать излишние ограничения и рамки, вечные попытки контролировать и руководить, а так же то, что не считаются с мнением, лишают права выбора. Здесь же причинами расставания может выступать абсолютная безответственность партнёра, измены, разгульный образ жизни, который выдаётся за свободу.
`;
lovesPanelItem.appendChild(paragraph);
break;
}}
if(gender==='М'){
const text=document.createElement('p');
text.innerHTML='Характер партнёра';
text.style.fontWeight='700';
lovesPanelItem.appendChild(text);
Array.from(uniqNumbers).map((item)=> {
switch (item){
case 3: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(3) Ищет женщину, которая и внешне и внутренне напоминала бы ему мать. Однако выбирает гламурную девушку, которая живёт в своём собственном мире, отличающемся от мира обычного человека. У неё на первом месте уход обществе, за собой, светские вечеринки и социальные сети, что никак не соответствует образу идеальной хозяйки, поэтому мужчина, поняв это, начинает новые поиски. В итоге выбирает женщину со стальным характером, сильную, целеустремлённую, успешную, независимую, знающую, чего она хочет от жизни. Именно с ней и сложатся наиболее гармоничные отношения.`;
lovesPanelItem.appendChild(paragraph);
break;
}
case 4: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(4) Умная, зрелая и серьёзная женщина, знающая чётко, что она хочет и как этого добиться. Амбициозная и умеющая зарабатывать хорошие деньги. Быстро двигается по карьерной лестнице, становясь в конечном итоге большим руководителем. Грамотно совмещает работу и дом. `;
lovesPanelItem.appendChild(paragraph);
break;
}
case 5: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(5) Умный, образованный партнер, который может стать наставником для своей половины и побудить идти вперёд, учиться и развиваться. Любит традиционный уклад семьи(патриархат) и порядок. Прекрасный семьянин и партнёр, которому можно доверять. `;
lovesPanelItem.appendChild(paragraph);
break;
}
case 6: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(6) Внешне привлекательный партнёр, которому важен свой внешний вид и образ, а потому он очень внимательно следит и за тем, и за другим. Общительный, легко находит общий язык с другими людьми. Но тут надо понять, что гармония в отношениях наступит только тогда, когда оба партнёра полностью погрузятся в отношения и перестанут сомневаться в сделанном выборе, начав работать над укреплением и развитием отношений. `;
lovesPanelItem.appendChild(paragraph);
break;
}
case 7: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(7) Человек, который движется к своей цели, всегда достигает её и способен повести других людей за собой. Лидер, мотиватор, победитель, руководитель. Не останавливается на достигнутом, всегда движется и только вперёд, любит жизнь, много путешествует. `;
lovesPanelItem.appendChild(paragraph);
break;
}
case 8: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(8) Человек, обладающий высоким статусом и положением в обществе. Нередко занимает руководящую должность или высокий пост в какой-то структуре, обладает авторитетом, влиянием и связями. Временами бывает властным и в семье, но в целом умный и сдержанный партнёр, который приходя домой снимает галстук и одевает белый плюшевый халат. `;
lovesPanelItem.appendChild(paragraph);
break;
}
case 9: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(9) Интроверт. Он не любит скопления людей, предпочитает тишину и спокойную обстановку. Ему необходимо временами побыть в полном одиночестве, чтобы восстановить энергию, которую он активно расходует, когда приходиться находится в больших и шумных компаниях.
<br>Много читает, может дать по-настоящему ценный совет.
`;
lovesPanelItem.appendChild(paragraph);
break;
}
case 10: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(10) Незаурядный и неординарный партнёр, который будет Вас вдохновлять. Обладает внутренней и внешней привлекательностью и харизматичностью, не зависит от чужого мнения, отличается своими мыслями и действиями от других. Нередко это творческая и свободная личность. Человек, который родился под счастливой звездой, которому всегда сопутствует удача, и который и сам станет для Вас источником удачи и своим светом осветит озарит Ваш путь. `;
lovesPanelItem.appendChild(paragraph);
break;
}
case 11: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(11) Человек, который не стоит на месте, он с лёгкостью готов принять участие во всех начинаниях и мероприятиях. Любит активно проводить время. Любит движение и жизнь. Он яркий и страстный. Трепетно относится к своему телу, занимаются спортом и следит за питанием. Его можно встретить в фитнес-центре или спортивном зале. Легко находит общий язык с детьми, любит с ними играть в подвижные игры. `;
lovesPanelItem.appendChild(paragraph);
break;
}
case 12: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(12) Чуткий, заботливый и внимательный человек с большим и добрым сердцем, всегда готов прийти на помощь всем, кто нуждается. Участник волонтёрских движений и благотворительных организаций.
<br>Способен неимоверно сильно полюбить, и поставить свою любовь превыше всего.
`;
lovesPanelItem.appendChild(paragraph);
break;
}
case 13: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(13) Человек, каждый раз удивляющий своим поведением, своими поступками и действиями, от него не знаешь, что ожидать. Любит рисковать, увлекается экстремальными видами спорта, гонками и всем тем, что приносит адреналин. Выбирает работу, которая позволит ему не сидеть на месте, а постоянно быть в напряжении, быстро принимать решения, выбирать, передвигаться с места на место. Не любит жить тощий и спокойной жизнью, ему нужны всегда новые впечатления и ощущения, любит перемены и живёт так, чтобы эти перемены были его спутниками жизни. `;
lovesPanelItem.appendChild(paragraph);
break;
}
case 14: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(14) Легко ранимый, впечатлительный и сентиментальный человек, который тонко чувствует этот мир. Творческий, чуткий, отзывчивый. Будет Вас понимать без слов и чувствовать Ваши эмоции всеми фибрами своей души. `;
lovesPanelItem.appendChild(paragraph);
break;
}
case 15: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(15) Пылкий и импульсивный партнёр, в нём бушует страсть и неосознанные сильные инстинкты добиваться и обладать. Для него важен качественный и разнообразный секс, полная отдача от партнёра. Он тонко считывает других людей, их желания и тайные мечты.
<br>Притягивает большие деньги и власть.
`;
lovesPanelItem.appendChild(paragraph);
break;
}
case 16: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(16) Человек, который способен вести за собой других людей, обладающий огромной внутренней силой и способностью быть лидером и брать ответственность за других. Он добр и терпелив к окружающим, обладает тягой к познанию всех тайн этого мира и смысла бытия, желает изменить этот мир в лучшую сторону. Он просвещает окружающих, делится накопленными знаниями и мудростью. Рядом с ними люди становятся заметно лучше. Такого партнёра не просто найти, но Вам нужен именно такой. Вы должны будете дорасти до него, обогатись духовно и ментально.`;
lovesPanelItem.appendChild(paragraph);
break;
}
case 17: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(17) Яркий и талантливый партнёр, достигший вершины успеха в какой-то области, даже возможно ставший известным и популярным среди широкого круга людей. Любит публичность и повышенное внимание. Временами бывает требователен и капризен. Одним словом, звезда. `;
lovesPanelItem.appendChild(paragraph);
break;
}
case 18: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(18) Человек с богатым и глубоким внутренним миром, который притягивает словно магнит. Умный, образованный, интеллигентный, прекрасно воспитан и обладает хорошими манерами. Благороден и порядочен. На него можно положиться и чувствовать себя с ним в полной безопасности. `;
lovesPanelItem.appendChild(paragraph);
break;
}
case 19: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(19) Человек с достаточным уровнем материального благосостояния, не испытывает нужды ни в чем, может многое себе позволить. Твёрдо стоит на ногах, инвестирует, вкладывает, создаёт финансовую подушку безопасности на будущее. Успешный и яркий, хороший руководитель, лидер, вдохновитель, любит быть в центре внимания. Не терпит критики в свой адрес и сомнений в своих решениях.
<br>При всём этом может радоваться мелочам, включать и вести себя как ребёнок.
`;
lovesPanelItem.appendChild(paragraph);
break;
}
case 20: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(20) Человек, заручившись поддержкой которого, Вы способны будете решить все проблемы Вашей семьи и Вашего рода. Он обладает необходимой мудростью и сильной исцеляющей энергетикой, которая привнесёт гармонию и мир в Ваши отношения с родственниками. `;
lovesPanelItem.appendChild(paragraph);
break;
}
case 21: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(21) Человек с иным менталитетом. Вероятно, родившийся и выросший в абсолютно другой культуре. Отличается от Вас и пониманием и видением этого мира. Для него не существует границ и преград, внутренних барьеров и ограничений. Он широко мыслит и ставит перед собой глобальные задачи, которые способны изменить ситуацию во всём мире. Вместе с ним вы откроете новые горизонты, научитесь смотреть на этот мир под другим углов, узнаете много интересного. `;
lovesPanelItem.appendChild(paragraph);
break;
}
case 22: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(22) Душа компании. Общительный, разносторонний, ценящий свободу и не признающий никаких рамок. Не зависит от чужого мнения, не цепляется за материальные ценности.  Искренний, любит правду, слушает своё сердце, при этом не сторонник официального оформления отношений. `;
lovesPanelItem.appendChild(paragraph);
break;
}}
})
}
if(gender==='Ж'){
const text=document.createElement('p');
text.innerHTML='Характер партнёра';
text.style.fontWeight='700';
lovesPanelItem.appendChild(text);
Array.from(uniqNumbers).map((item)=> {
switch (item){
case 3: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(3) Ласковый, чуткий и мягкий мужчина, который может окружить теплом и заботой. Такой мужчина не будет давить и подавлять, нарушать границы и предъявлять требования. Для него на первом месте семья, и он живёт ради семьи. Выбирает работу, связанную с заботой о людях, или работу, связанную с детьми, с ними он прекрасно ладит. `;
lovesPanelItem.appendChild(paragraph);
break;
}
case 4: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(4) Мужчина, который имеет хорошее материальное положение, высокий статус в обществе, крепко стоит на ногах, уверен в завтрашнем дне и может обеспечить стабильный доход для своей семьи. Умеет владеть эмоциями, не давая им выхода наружу в критический момент. В отношениях с членами семьи стоит вести себя именно как глава, а не как жестокий тиран. `;
lovesPanelItem.appendChild(paragraph);
break;
}
case 5: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(5) Умный, образованный партнер, который может стать наставником для своей половины и побудить идти вперёд, учиться и развиваться. Любит традиционный уклад семьи(патриархат) и порядок. Прекрасный семьянин и партнёр, которому можно доверять. `;
lovesPanelItem.appendChild(paragraph);
break;
}
case 6: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(6) Внешне привлекательный партнёр, которому важен свой внешний вид и образ, а потому он очень внимательно следит и за тем, и за другим. Общительный, легко находит общий язык с другими людьми. Но тут надо понять, что гармония в отношениях наступит только тогда, когда оба партнёра полностью погрузятся в отношения и перестанут сомневаться в сделанном выборе, начав работать над укреплением и развитием отношений. `;
lovesPanelItem.appendChild(paragraph);
break;
}
case 7: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(7) Человек, который движется к своей цели, всегда достигает её и способен повести других людей за собой. Лидер, мотиватор, победитель, руководитель. Не останавливается на достигнутом, всегда движется и только вперёд, любит жизнь, много путешествует. `;
lovesPanelItem.appendChild(paragraph);
break;
}
case 8: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(8) Человек, обладающий высоким статусом и положением в обществе. Нередко занимает руководящую должность или высокий пост в какой-то структуре, обладает авторитетом, влиянием и связями. Временами бывает властным и в семье, но в целом умный и сдержанный партнёр, который приходя домой снимает галстук и одевает белый плюшевый халат. `;
lovesPanelItem.appendChild(paragraph);
break;
}
case 9: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(9) Интроверт. Он не любит скопления людей, предпочитает тишину и спокойную обстановку. Ему необходимо временами побыть в полном одиночестве, чтобы восстановить энергию, которую он активно расходует, когда приходиться находится в больших и шумных компаниях.
<br>Много читает, может дать по-настоящему ценный совет.
`;
lovesPanelItem.appendChild(paragraph);
break;
}
case 10: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(10) Незаурядный и неординарный партнёр, который будет Вас вдохновлять. Обладает внутренней и внешней привлекательностью и харизматичностью, не зависит от чужого мнения, отличается своими мыслями и действиями от других. Нередко это творческая и свободная личность. Человек, который родился под счастливой звездой, которому всегда сопутствует удача, и который и сам станет для Вас источником удачи и своим светом осветит озарит Ваш путь. `;
lovesPanelItem.appendChild(paragraph);
break;
}
case 11: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(11) Человек, который не стоит на месте, он с лёгкостью готов принять участие во всех начинаниях и мероприятиях. Любит активно проводить время. Любит движение и жизнь. Он яркий и страстный. Трепетно относится к своему телу, занимаются спортом и следит за питанием. Его можно встретить в фитнес-центре или спортивном зале. Легко находит общий язык с детьми, любит с ними играть в подвижные игры. `;
lovesPanelItem.appendChild(paragraph);
break;
}
case 12: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(12) Чуткий, заботливый и внимательный человек с большим и добрым сердцем, всегда готов прийти на помощь всем, кто нуждается. Участник волонтёрских движений и благотворительных организаций.
<br>Способен неимоверно сильно полюбить, и поставить свою любовь превыше всего.
`;
lovesPanelItem.appendChild(paragraph);
break;
}
case 13: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(13) Человек, каждый раз удивляющий своим поведением, своими поступками и действиями, от него не знаешь, что ожидать. Любит рисковать, увлекается экстремальными видами спорта, гонками и всем тем, что приносит адреналин. Выбирает работу, которая позволит ему не сидеть на месте, а постоянно быть в напряжении, быстро принимать решения, выбирать, передвигаться с места на место. Не любит жить тощий и спокойной жизнью, ему нужны всегда новые впечатления и ощущения, любит перемены и живёт так, чтобы эти перемены были его спутниками жизни. `;
lovesPanelItem.appendChild(paragraph);
break;
}
case 14: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(14) Легко ранимый, впечатлительный и сентиментальный человек, который тонко чувствует этот мир. Творческий, чуткий, отзывчивый. Будет Вас понимать без слов и чувствовать Ваши эмоции всеми фибрами своей души. `;
lovesPanelItem.appendChild(paragraph);
break;
}
case 15: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(15) Пылкий и импульсивный партнёр, в нём бушует страсть и неосознанные сильные инстинкты добиваться и обладать. Для него важен качественный и разнообразный секс, полная отдача от партнёра. Он тонко считывает других людей, их желания и тайные мечты.
<br>Притягивает большие деньги и власть.
`;
lovesPanelItem.appendChild(paragraph);
break;
}
case 16: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(16) Человек, который способен вести за собой других людей, обладающий огромной внутренней силой и способностью быть лидером и брать ответственность за других. Он добр и терпелив к окружающим, обладает тягой к познанию всех тайн этого мира и смысла бытия, желает изменить этот мир в лучшую сторону. Он просвещает окружающих, делится накопленными знаниями и мудростью. Рядом с ними люди становятся заметно лучше. Такого партнёра не просто найти, но Вам нужен именно такой. Вы должны будете дорасти до него, обогатись духовно и ментально.`;
lovesPanelItem.appendChild(paragraph);
break;
}
case 17: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(17) Яркий и талантливый партнёр, достигший вершины успеха в какой-то области, даже возможно ставший известным и популярным среди широкого круга людей. Любит публичность и повышенное внимание. Временами бывает требователен и капризен. Одним словом, звезда. `;
lovesPanelItem.appendChild(paragraph);
break;
}
case 18: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(18) Человек с богатым и глубоким внутренним миром, который притягивает словно магнит. Умный, образованный, интеллигентный, прекрасно воспитан и обладает хорошими манерами. Благороден и порядочен. На него можно положиться и чувствовать себя с ним в полной безопасности. `;
lovesPanelItem.appendChild(paragraph);
break;
}
case 19: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(19) Человек с достаточным уровнем материального благосостояния, не испытывает нужды ни в чем, может многое себе позволить. Твёрдо стоит на ногах, инвестирует, вкладывает, создаёт финансовую подушку безопасности на будущее. Успешный и яркий, хороший руководитель, лидер, вдохновитель, любит быть в центре внимания. Не терпит критики в свой адрес и сомнений в своих решениях.
<br>При всём этом может радоваться мелочам, включать и вести себя как ребёнок.
`;
lovesPanelItem.appendChild(paragraph);
break;
}
case 20: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(20) Человек, заручившись поддержкой которого, Вы способны будете решить все проблемы Вашей семьи и Вашего рода. Он обладает необходимой мудростью и сильной исцеляющей энергетикой, которая привнесёт гармонию и мир в Ваши отношения с родственниками. `;
lovesPanelItem.appendChild(paragraph);
break;
}
case 21: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(21) Человек с иным менталитетом. Вероятно, родившийся и выросший в абсолютно другой культуре. Отличается от Вас и пониманием и видением этого мира. Для него не существует границ и преград, внутренних барьеров и ограничений. Он широко мыслит и ставит перед собой глобальные задачи, которые способны изменить ситуацию во всём мире. Вместе с ним вы откроете новые горизонты, научитесь смотреть на этот мир под другим углов, узнаете много интересного. `;
lovesPanelItem.appendChild(paragraph);
break;
}
case 22: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(22) Душа компании. Общительный, разносторонний, ценящий свободу и не признающий никаких рамок. Не зависит от чужого мнения, не цепляется за материальные ценности.  Искренний, любит правду, слушает своё сердце, при этом не сторонник официального оформления отношений. `;
lovesPanelItem.appendChild(paragraph);
break;
}}
})
}}
lovesPanelContentCreate([D2, L], G4);
let AE=calculation(A+E);
let AE1=calculation(A+AE);
let AE2=calculation(E+AE);
let AE3=calculation(A+AE1);
let AE4=calculation(AE+AE1);
let AE5=calculation(AE+AE2);
let AE6=calculation(E+AE2);
let EB=calculation(E+B);
let EB1=calculation(E+EB);
let EB2=calculation(B+EB);
let EB3=calculation(E+EB1);
let EB4=calculation(EB+EB1);
let EB5=calculation(EB+EB2);
let EB6=calculation(B+EB2);
let BF=calculation(B+F);
let BF1=calculation(B+BF);
let BF2=calculation(F+BF);
let BF3=calculation(B+BF1);
let BF4=calculation(BF+BF1);
let BF5=calculation(BF1+BF2);
let BF6=calculation(F+BF2);
let FC=calculation(F+C);
let FC1=calculation(F+FC);
let FC2=calculation(C+FC);
let FC3=calculation(F+FC1);
let FC4=calculation(FC+FC1);
let FC5=calculation(FC+FC2);
let FC6=calculation(C+FC2);
let CG=calculation(C+G);
let CG1=calculation(C+CG);
let CG2=calculation(G+CG);
let CG3=calculation(C+CG1);
let CG4=calculation(CG+CG1);
let CG5=calculation(CG+CG2);
let CG6=calculation(C+CG2);
let GD=calculation(G+D);
let GD1=calculation(G+GD);
let GD2=calculation(D+GD);
let GD3=calculation(G+GD1);
let GD4=calculation(GD+GD1);
let GD5=calculation(GD+GD2);
let GD6=calculation(G+GD2);
let DH=calculation(D+H);
let DH1=calculation(D+DH);
let DH2=calculation(H+DH);
let DH3=calculation(D+DH1);
let DH4=calculation(DH+DH1);
let DH5=calculation(DH+DH2);
let DH6=calculation(D+DH2);
let HA=calculation(H+A);
let HA1=calculation(H+HA);
let HA2=calculation(A+HA);
let HA3=calculation(H+HA1);
let HA4=calculation(HA+HA1);
let HA5=calculation(HA+HA2);
let HA6=calculation(A+HA2);
const yearsPanelItem=document.querySelector('#years_panel');
function yearsPanelContentCreate(){
let number;
const text=document.createElement('p');
text.innerHTML='Суть года, основной мотив';
text.style.fontWeight='700';
yearsPanelItem.appendChild(text);
switch (parseInt(age.innerHTML)){
case 1: {
number=AE3;
break;
}
case 2: {
number=AE3;
break;
}
case 3: {
number=AE4;
break;
}
case 4: {
number=AE4;
break;
}
case 5: {
number=AE;
break;
}
case 6: {
number=AE5;
break;
}
case 7: {
number=AE5;
break;
}
case 8: {
number=AE2;
break;
}
case 9: {
number=AE6;
break;
}
case 10: {
number=E;
break;
}
case 11: {
number=EB3;
break;
}
case 12: {
number=EB3;
break;
}
case 13: {
number=EB1;
break;
}
case 14: {
number=EB4;
break;
}
case 15: {
number=EB;
break;
}
case 16: {
number=EB5;
break;
}
case 17: {
number=EB5;
break;
}
case 18: {
number=EB2;
break;
}
case 19: {
number=EB6;
break;
}
case 20: {
number=B;
break;
}
case 21: {
number=BF3;
break;
}
case 22: {
number=BF3;
break;
}
case 23: {
number=BF1;
break;
}
case 24: {
number=BF4;
break;
}
case 25: {
number=BF;
break;
}
case 26: {
number=BF5;
break;
}
case 27: {
number=BF5;
break;
}
case 28: {
number=BF2;
break;
}
case 29: {
number=BF6;
break;
}
case 30: {
number=F;
break;
}
case 31: {
number=FC3;
break;
}
case 32: {
number=FC3;
break;
}
case 33: {
number=FC1;
break;
}
case 34: {
number=FC4;
break;
}
case 35: {
number=FC;
break;
}
case 36: {
number=FC5;
break;
}
case 37: {
number=FC5;
break;
}
case 38: {
number=FC2;
break;
}
case 39: {
number=FC6;
break;
}
case 40: {
number=C;
break;
}
case 41: {
number=CG3;
break;
}
case 42: {
number=CG3;
break;
}
case 43: {
number=CG1;
break;
}
case 44: {
number=CG4;
break;
}
case 45: {
number=CG;
break;
}
case 46: {
number=CG5;
break;
}
case 47: {
number=CG5;
break;
}
case 48: {
number=CG2;
break;
}
case 49: {
number=CG6;
break;
}
case 50: {
number=G;
break;
}
case 51: {
number=GD3;
break;
}
case 52: {
number=GD3;
break;
}
case 53: {
number=GD1;
break;
}
case 54: {
number=GD4;
break;
}
case 55: {
number=GD;
break;
}
case 56: {
number=GD5;
break;
}
case 57: {
number=GD5;
break;
}
case 58: {
number=GD2;
break;
}
case 59: {
number=GD6;
break;
}
case 60: {
number=D;
break;
}
case 61: {
number=DH3;
break;
}
case 62: {
number=DH3;
break;
}
case 63: {
number=DH1;
break;
}
case 64: {
number=DH4;
break;
}
case 65: {
number=DH;
break;
}
case 66: {
number=DH5;
break;
}
case 67: {
number=DH5;
break;
}
case 68: {
number=DH2;
break;
}
case 69: {
number=DH6;
break;
}
case 70: {
number=H;
break;
}
case 71: {
number=HA3;
break;
}
case 72: {
number=HA3;
break;
}
case 73: {
number=HA1;
break;
}
case 74: {
number=HA4;
break;
}
case 75: {
number=HA;
break;
}
case 76: {
number=HA5;
break;
}
case 77: {
number=HA5;
break;
}
case 78: {
number=HA2;
break;
}
case 79: {
number=HA6;
break;
}}
if(gender==='М'){
const text=document.createElement('p');
text.innerHTML='В плюсе';
text.style.fontWeight='700';
yearsPanelItem.appendChild(text);
switch (number){
case 3: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(3)  Если Вы одиноки, то Вам предстоит встреча со своей второй половинкой, начнутся отношения. Если Вы уже в отношениях, то Вас ожидает развитие отношений, вступление в брак, красивая свадьба. Если Вы уже в браке, то обретёте гармонию, мир и спокойствие в семье, откроете для себя новые грани семейное жизни, обретёте взаимопонимание в случае его отсутствия, то есть Ваша семейная жизнь заиграет новыми красками. Это период, когда Вы прислушаетесь к своей женской энергии и не пойдёте против неё, откроете для себя счастье отцовства или создадите неповторимый уют и тепло в доме, станете первоклассным хозяином, понимающим и заботливым отцом, любящим и заботливым мужем. Поймёте и примите всего себя таким, какой Вы есть. Начнёте вдохновлять  противоположный пол. Станете спокойным, сбалансированным и гармоничным. Сумеете грамотно сочетать работу и дом. Возможно, повышение на работе, открытие своего бизнеса, увеличение дохода, расширение сфер своего влияния. `;
yearsPanelItem.appendChild(paragraph);
break;
}
case 4: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(4) Благоприятный во всех смыслах период. Здесь может произойти квантовый скачок в развитии - будет достигнуто всё, к чему мужчина долго и упорно шёл, откроются новые горизонты, увеличатся многократно доходы, произойдёт расширение и укрепление бизнеса, быстрое продвижение по карьерной лестнице. Здесь же мужчина может стать главой семьи, отцом. Одним словом, в этот период мужчина себя полностью реализует во всех аспектах жизни.`;
yearsPanelItem.appendChild(paragraph);
break;
}
case 5: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(5) Период приятной бумажной волокиты - оформление каких-то важных документов, которые до этого долго не было возможности оформить, официальное оформление отношений, рождение детей и получение на них всех необходимых документов (свидетельство о рождении, полис, СНИЛС, оформление выплат и пособий, материнского капитала), разрешение споров в суде. Часто бывает, что всё перечисленное идёт вместе или быстро друг за другом с малыми промежутками во времени. В любом случае это хороший период, когда жизнь упорядочивается, жизнь обретает смысл и систему, всё в ней происходит поэтапно, всё налаживается.
<br>Также в этот период открываются двери для получения нового образования, продвижения на службе, обретения уважения и новых сфер влияния. `;
yearsPanelItem.appendChild(paragraph);
break;
}
case 6: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(6) Прекрасный период влюблённости, любви и проявления любых тёплых чувств. В этот период сердце замирает, наполняясь любовью, и бабочки летают в животе. Время романтики, цветов, подарков, праздничных мероприятий. В такие периоды случаются свадьбы, помолвки, а также любые другие мероприятия, участниками и организаторами которых выступают влюблённые люди, готовые дарить радость всем вокруг.
<br>Также это период активной общественной деятельности, бурного дружеского общения, весёлых вечеринок до утра.
<br>Это отличный период, чтобы начать жить в гармонии с собой, принять и полюбить себя, осознать свою ценность и значимость, заняться любимым делом, окружить себя красотой, создать уют в доме, заняться своей внешностью и обновить гардероб, добавив в него новые красивые и интересные вещи.
<br>В целом, это позитивная энергия дружбы, открытости и любви. Но чтобы обрести эту дружбу и любовь сначала предстоит пройти через предательства и разочарования, невозможно прийти к плюсу, не пройдя через минус. Здесь главное не закрывать глаза на эти предательства, не прятать голову в песок, делая вид, что всё хорошо, принять факт негатива в свою сторону, прожить это и тогда жизнь страну станет уходить в плюс.
`;
yearsPanelItem.appendChild(paragraph);
break;
}
case 7: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(7) Сильный и благоприятный период, во время которого мужчина добьётся успеха, ему будет сопутствовать удача, покорятся все вершины, будут достигнуты многие цели, будут показаны хорошие результаты в любой деятельности. Мужчина поистине проявит себя лидером и победителем. `;
yearsPanelItem.appendChild(paragraph);
break;
}
case 8: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(8) Период стабильности и размерности. Жизнь сложилась, есть почва под ногами, быт налажен. Период, когда воздаётся по заслугам, когда получают награды за свои труды, когда разрешаются давние споры и конфликты, период, когда всё налаживается. Здесь возможно документальное оформление каких-то событий, например, получение гражданства или визы, разрешений на что-то. Возможно приобретение недвижимости или других крупных покупок, требующих оформления. `;
yearsPanelItem.appendChild(paragraph);
break;
}
case 9: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(9) Период развития - интеллектуального и духовного. Период получения качественной информации извне, период изучения культуры и искусства, период определения, осмысливая и осознания происходящих вокруг событий,  период формирования нравственных идеалов и ценностей. Период анализа и познания этого мира. Период наполнения своего внутреннего мира всё новой и новой информацией, общаясь, учась, читая, смотря, слушая. Чем больше человек думает, тем лучше и эффективнее работает его мышление. В этот период надо стараться перерабатывать всю информацию, поступившую к Вам. Всё осмысливать, анализировать, сравнивать, делать выводы. То есть, применять все возможные мыслительные процессы. Этот период прекрасно подходит для развития воображения. Самый эффективный способ - мечтать и фантазировать. То есть, воображать все возможные и невозможные варианты развития событий. Но самый простой способ развития воображения - это чтение. Когда человек читает, он представляет то, о чём прочитал. То есть это период, когда человек наполняет свой внутренний мир и получает новые знания. В этот же период человек может начать делиться своими знаниями с другими, обрести единомышленников, сформировать узкий круг своих последователей.
`;
yearsPanelItem.appendChild(paragraph);
break;
}
case 10: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(10) Период чудесных радостных событий и удачных поворотов судьбы. Период, когда человек будет удачливым во всём, ему будет сопутствовать везение. Он будет легко добиваться в жизни всего, быстро достигнет желаемого, сможет избежать серьёзных опасностей и трудностей, выйдет из любых сложных жизненных ситуаций. И для всего этого ему не нужно будет прилагать больших усилий, всё уже предрешено высшими силами. Так же это период может ознаменоваться интересными путешествиями, новыми знакомствами с приятными людьми, морем положительных эмоций и незабываемых впечатлений. `;
yearsPanelItem.appendChild(paragraph);
break;
}
case 11: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(11) Очень продуктивный и активный период в жизни, когда получаешь несоизмеримо хорошую отдачу на приложенные усилия. Сила и энергия бьют через край, человек чувствует, что может свернуть горы. Всё получается. Любая работа даётся легко, в короткие сроки выполняются большие объёмы. Если речь идёт о бизнесе, то он стремительно развивается и масштабируется. Это могут быть и колоссальные творческие успехи и приличные спортивные результаты.
`;
yearsPanelItem.appendChild(paragraph);
break;
}
case 12: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(12) Период изменений и помощи другим. Этот период характеризуется событиями, которые вполне способны изменить ход жизни человека. И здесь нет никаких ограничений по тому, какими эти события могут быть - это может быть и прорыв в творчестве, когда человек запишет новый трек и взорвёт все чарты и музыкальные каналы. А может, человек захочет освоить новую профессию и приступит к обучению. Так же это период характеризуется активной помощью людям, здесь может быть и участие в волонтёрских движениях, и участие в благотворительных фондах, да и просто разовые пожертвования на восстановление храма или культурных достопримечательностей.`;
yearsPanelItem.appendChild(paragraph);
break;
}
case 13: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(13) Период кардинальных изменений, когда можно и нужно перевернуть жизнь. Человек внутренне готов поменяться(он нарастил решительность, обрёл внутреннюю зрелость и способность использовать обстоятельства), а толчком к переменам станет неожиданный поворот судьбы. Не нужно смотреть на него сквозь призму недовольства, а воспользовавшись обстоятельствами, важно изменить к лучшему собственную жизнь. Здесь может быть и смена места работы, и смена сферы деятельности в целом, смена места жительства, рождение детей, смена образа жизни (например, человек перешёл на ЗОЖ, стал вегетарианцем, начал заниматься спортом и т.п.). Чтобы сделать шаг вперёд, потребуется разрушить общепринятые шаблоны и стереотипы, мешающие правила и устоявшиеся стандарты мышления. Произведя радикальные перемены в жизни, человек совершит внезапный и мощный рывок вперед.`;
yearsPanelItem.appendChild(paragraph);
break;
}
case 14: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(14) Очень позитивный период в жизни, когда на душе светло и счастливо. Состояние полного счастья, человек доволен своей жизнью. При этом совершенно неважно, что является источником такого состояния. Для кого-то это гармония в семье, для другого – интересная работа. Каждый человек в этот период будет счастлив по-своему.
<br>Этот период характеризуется отличным настроением, положительными эмоциями, совершенным спокойствием, умиротворением, оптимизмом, гармонией, уверенностью в себе, достижением поставленных целей. `;
yearsPanelItem.appendChild(paragraph);
break;
}
case 15: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(15) Период материального процветания. В этот период значительно улучшается материальное состояние, получаются сверхприбыли, выигрываются лотереи, отдаются долги, приобретаются новые материальные ценности, то есть деньги нескончаемым потоком идут в руки. Меняется положение в обществе, расширяются сферы влияния, зарабатывается авторитет. Прекрасный период, чтобы научиться не впадать в зависимость от материального, научиться жить умеренно и сдержанно, начать проявлять щедрость, усилить связь с Богом и с его помощью побороть пороки и зависимости.
`;
yearsPanelItem.appendChild(paragraph);
break;
}
case 16: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(16) Период внутренних изменений. В этот период происходит изменение восприятия реальности, меняются привычные взгляды на жизнь. ""Человек способен изменить свою жизнь, меняя всего лишь свою точку зрения"" (с) Дж. Вильямс. Это выражение как нельзя лучше описывает данный период жизни.
<br>В этот период человек не боится бросить вызов самому себе, например, путешествовать в одиночку, переехать в новую страну или избавиться от какой-то зависимости. Он отказывается от старых правил и устанавливает новые, которые устраивают именно его. Меняются приоритеты - то, что было интересно в прошлом году, уже не актуально сейчас. Человек начинает одеваться для комфорта, а не для того, чтобы произвести впечатление. Больше не покупает вещи, которые не нужны, только потому, что они модные.
<br>Жизнь больше не воспринимается, как чёрное и белое. Прекращается осуждение других людей, так как приходит понимание, что это их жизнь и их опыт. Человек понимает, что для него важно и сосредотачивается именно на этом. Не зацикливается и не зависит от соцсетей. Человек приходит к пониманию того, что сам несёт ответственность за свою жизнь и свою судьбу.`;
yearsPanelItem.appendChild(paragraph);
break;
}
case 17: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(17) Период реализации всех способностей человека. Человек становится востребованным, высокооплачиваемым и успешным,  развивается, совершенствуется, обходит всех конкурентов, начинает буквально блистать среди своих коллег. Он достигает небывалых высот, становится эффектным и ярким, его становится невозможно не заметить. Он в центре внимания, о нём говорят, к его мнению прислушиваются, на него хотят быть похожим, он становится примером для многих. Это период подъёма, роста, развития, прогресса. Обретается гармония с окружающим миром и со своим внутренним «Я». `;
yearsPanelItem.appendChild(paragraph);
break;
}
case 18: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(18) Период смены окружения. На смену пессимистам и токсичным людям придут успешные и позитивно настроенные. За счёт энергетического обмена с ними и поддержки с их стороны будет происходить совершенствование и развитие. Общение с ними принесёт неоспоримую пользу в достижении целей и улучшит качество жизни.
<br>В этот период также может произойти и смена мышления - с негативного на позитивное; либо же человек может уйти в творчество, стать ближе к искусству, увлечься модой. `;
yearsPanelItem.appendChild(paragraph);
break;
}
case 19: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(19) Период успеха и благоприятных изменений в жизни. Человек добивается поставленных перед собой целей, доволен всеми своими достижениями, морально удовлетворён своим положением в обществе. Здесь он может получить новую интересную и высокооплачиваемую работу, о которой давно мечтал. Либо же может получить более высокую должность там, где уже работает. В любом случае, это увеличение материального достатка и материальных благ, обретение финансовой свободы, процветание, повышение социального статуса.
<br>Человек становится способным вдохновлять и мотивировать окружающих, становится авторитетным лидером, способным заставить других следовать за ним. `;
yearsPanelItem.appendChild(paragraph);
break;
}
case 20: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(20) Благоприятный период, связанный с приятными хлопотами в семье либо же переездом в другую страну. В семье происходят события, которые сплачивают её членов, приносят радость и счастье. Например, рождение детей. Возможно, приезд родственников, с которыми очень давно не виделись. Либо появляется тот, кого считали пропавшим. Здесь же может случиться и переезд в другую страну, знакомство и брак с иностранцем, работа в другой стране, либо же просто путешествия.
<br>Могут открыться новые возможности в творчестве и работе, которые принесут популярность (работа на телевидении, блог эксперта, начало своего бизнеса).`;
yearsPanelItem.appendChild(paragraph);
break;
}
case 21: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(21) В первую очередь в этот период может произойти переезд. Это может быть переезд из одного жилья в другое, может быть переезд из одного города в другой, а может быть и переезд в другую страну. Но определённо меняется привычное место жительства. Также этот период может быть связан с появлением новых людей в окружении, новые встречи, знакомства, связи, новое общение. Жизнь меняется, выходит на иной уровень. Появляется новая работа, открываются новые возможности. В этот период происходит развитие в человеке уверенности в себе, в своих способностях, в своем потенциале и в важности своих действий и решений, чтобы положительно влиять на свою жизнь.
<br>Это период положительных изменений и движения вперёд. `;
yearsPanelItem.appendChild(paragraph);
break;
}
case 22: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(22) Период начала новой жизни, когда все переживания и проблемы остаются в старой. Человек открывает себя по-новому - у него повышается самооценка, обретается уверенность в себе и желание следить за своим внешним видом и физическим здоровьем, уходит страх перемен и напрасные переживания, у него появляется сильное желание развиваться и двигаться вперёд, проходит зависть к другим, разрываются токсичные отношения, человек начинает жить здесь и сейчас. Появляется новая работа, завязываются новые отношения, появляются новые увлечения. Это период всего нового и интересного. Это так же может быть очень активный и жизнерадостный период путешествий, поездок, встреч с друзьями, участия в больших общественных проектах. Человек в этот момент чувствует себя абсолютно свободным и способным на всё. Это так и есть. `;
yearsPanelItem.appendChild(paragraph);
break;
}}
const text2=document.createElement('p');
text2.innerHTML='В минусе';
text2.style.fontWeight='700';
yearsPanelItem.appendChild(text2);
switch (number){
case 3: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(3) Тяжёлый период в отношениях и семейной жизни, подразумевающий начало проблем между мужчиной и женщиной. Уходят взаимопонимание и взаимоуважение, а на первый план выходят упрёки и недоверие, обиды и разочарование в партнёре, ссоры и унижения. Мужчина может узнать о предательстве со стороны женщины. В этот период он может остаться один - отношения прекратятся, а брак рухнет. Мужчина может разочароваться в любви, семейной жизни и женщинах, появятся проблемы с самооценкой и принятием своей внешности, будет казаться, что всё хорошее осталось позади, а впереди лишь одиночество и пустота. У мужчины могут возникнуть недопонимания и конфликты не только с женщиной, но и с детьми, они могут отдалиться от него, перестать нормально общаться и воспринимать как близкого человека. Здесь же может развиваться и ситуация, когда мужчина взваливает на свои плечи женские обязанности, начинает выполнять в семье женские функции, забывает о своём мужском начале, становится мягким, капризным, агрессивным, инфантильным  то есть она забывает, что он - мужчина. `;
yearsPanelItem.appendChild(paragraph);
break;
}
case 4: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(4) Период фатальных ошибок и неудач, период, когда жизнь проверяет мужчину на прочность. Здесь проблемы могут идти одна за другой, а могут обрушиться сразу все - проблемы на работе, потеря источника дохода, предательство со стороны коллег и друзей, проблемы с физическим и психическим здоровьем, распад или кризис в семье. Это период, когда мужчина теряет уверенность в себе, оказывается неспособным обеспечить свою семью, теряет материальные блага(например, попал в аварию и сильно разбил автомобиль), теряет самого себя. В этот период как никогда важно наладить отношения с родителями, потому что эти отношения напрямую влияют на его жизнь. Например, если мужчина держит обиды на мать, то у него отсутствует желание заботиться о любой женщине. В этот период важно собраться, взять всю свою волю в кулак, прочувствовать всю силу своего духа и идти напролом вперёд, не останавливаясь из-за неудач. `;
yearsPanelItem.appendChild(paragraph);
break;
}
case 5: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(5) Период крупных и мелких неудач. Могут возникнуть проблемы с законом, проблемы в семье - с женой, с детьми, разладятся отношения с родителями или другими родственниками, всплывут какие-то ошибки на работе (например, во время проверки или ревизии). Будет казаться, что всё рушится. Глобально ничего трагического не произойдёт, но череда не совсем приятных инцидентов изрядно попортит нервы. Важно будет не впадать в панику, с холодной головой посмотреть на происходящее и твёрдой рукой навести порядок во всём - дома, на работе, в отношениях с другими людьми. Важно начать жить по правилам и следовать определённому порядку, не бежать впереди паровоза, не поучать других, не брать на себя много, не врать, не жить двойными стандартами. Также большое значение имеет отношение с родителями, а в особенности, с отцом. Важно принять его таким, какой он есть, простить все обиды и открыть своё сердце для любви к нему. `;
yearsPanelItem.appendChild(paragraph);
break;
}
case 6: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(6) Неблагоприятный период, во время которого любимый человек может предать или совершить подлость; может изменить, сильно обидеть, не посчитаться с интересами и желаниями или же применить физическую силу; может ударить в самое больное место, не щадя главных ценностей и важных для человека моральных устоев. Во время этого периода очень часто происходят прекращения отношений и разводы.
<br>Этот период также характеризуется отсутствием положительных эмоций, отсутствием желания любить и ухаживать за собой, потерей гармонии в жизни. В этот период жизненно важно следить за своим здоровьем, особенно за здоровьем сердечно-сосудистой системы.
<br>Здесь же человек может оказаться перед трудным выбором, будет трудно принять решение, сделать шаг в ту или иную сторону.
<br>В целом, это позитивная энергия дружбы, открытости и любви. Но чтобы обрести эту дружбу и любовь сначала предстоит пройти через предательства и разочарования, невозможно прийти к плюсу, не пройдя через минус. Здесь главное не закрывать глаза на эти предательства, не прятать голову в песок, делая вид, что всё хорошо, принять факт негатива в свою сторону, прожить это и тогда жизнь страну станет уходить в плюс.`;
yearsPanelItem.appendChild(paragraph);
break;
}
case 7: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(7) Крайне неблагоприятный период болезней и неудач. Период, когда совершаются ошибки, принимаются неверные решения, теряется работа и уважение людей, преследуют поражения, предательства, появляются долги. Может произойти разрыв отношений с любимым человеком. В этот период можно стать жертвой насмешки, оскорбления и позора. `;
yearsPanelItem.appendChild(paragraph);
break;
}
case 8: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(8) Период несправедливости, обмана и предательства. В этот период так же возможны противозаконные действия в Ваш адрес. Почва уходит из-под ног, нарушается стабильность и привычный образ жизни, друзья предают, любимые люди изменяют, коллеги подставляют. В этот период, главное всё это принять и переждать, а не вступать в борьбу с ветряными мельницами. Если же вы начнёте вступать в противостояние, взывать к справедливости, то только усугубите ситуацию и получите удары пострашнее тех неприятностей, которые уже произошли. Только смирение и холодная голова смогут выравнить ситуацию и обернуть минус в плюс. Воспринимайте все проблемы как испытания. Если испытания пройдены с достоинством, то жизнь возвращается в привычное русло. Если же в этих испытаниях Вы потеряли своё лицо и себя, то они продолжатся и обрушатся на Вас с новой силой. `;
yearsPanelItem.appendChild(paragraph);
break;
}
case 9: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(9) Период болезней и одиночества. Начинаются проблемы с физическим здоровьем и здесь важно не пропустить момент, не запустить болезнь, а предпринять все меры для выздоровления. Также в этот период человек может остаться один на один со своими бедами, может остаться без работы, может лишиться семьи и поддержки родственников, может прекратить общения с друзьями. Главное, в этот период не уйти полностью в себя и не закрыться полностью от этого мира. `;
yearsPanelItem.appendChild(paragraph);
break;
}
case 10: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(10) Отчётливая чёрная полоса в жизни. Всё валится из рук, деньги утекают как вода, предают близкие люди, не везёт ни в чем. Даже в самых незначительных бытовых мелочах происходят всякие катаклизмы и неурядицы. Создаётся ощущение, что в один день кто-то пришёл и забрал удачу. Появляется разочарование в окружающем мире и себе, агрессивность к другим людям, неуверенность в своих силах, обида на весь мир, чувство опустошенности. Также в этот период может появиться плохое окружение, которое будет оказывать значительное негативное влияние, что, в свою очередь, ещё более затянет в вопреки неудач. `;
yearsPanelItem.appendChild(paragraph);
break;
}
case 11: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(11) Период работы на износ, физическое и моральное истощение, сильное эмоциональное выгорание, упадок сил, потеря мотивации, опустошение. Сильное разочарования в себе и своих силах, поскольку работа не приносит того результата, который хотелось бы. Работаешь и всё в пустую. На этой почве начинаются проблемы в семье, ссоры, обиды, непонимание, взаимные упрёки, проявляются негативные эмоции. Либо наоборот работа приносит результат, но всё время хочется больше - больше денег, больше недвижимости, больше власти. Человек всё больше и больше рвётся, именно уже рвётся, а не работает. Без отдыха, без расслабления. И загоняет себя в такую ситуацию, когда все заработанные блага не приносят удовольствия , так как усталость перекрывает  все остальные эмоции. При этом тоже начинаются проблемы в семье, поскольку семья его просто не видит. Нужно остановиться, вдохнуть-выдохнуть, понять, что есть вещи важнее материальных благ и что все деньги заработать невозможно. `;
yearsPanelItem.appendChild(paragraph);
break;
}
case 12: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(12) Очень несчастливый период, в который с человеком могут происходить различные несчастные случаи, наносящие существенный вред здоровью. Это могут быть и ДТП, и разного рода травмы - переломы, ожоги, отравления.
<br>Здесь же могут быть и ситуации, которые негативно влияют на эмоциональное состояние. Например, несправедливое отношение, оскорбления, предательства, обман. В этот период человек может попасть в отношения, в которых он будет выступать в роли жертвы, будет страдать морально, теперь унижения и манипуляции со стороны другого человека. Это могут быть и личные отношения, когда человек попадает в зависимость от своего избранника. Это могут быть и рабочие ситуации, при которых человек выполняет роль бесплатной рабочей силы для своего начальника.
<br>Также этот период может быть периодом застоя, когда человек закрывается от всего нового, боится перемен и отказывается двигаться вперёд. `;
yearsPanelItem.appendChild(paragraph);
break;
}
case 13: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(13) Достаточно тяжёлый период в жизни. Могут случиться болезненные потери и изменения, которые оставят далеко в прошлом привычную налаженную жизнь. Здесь можно столкнуться со смертью кого-то из близких людей и с этим человеком уйдёт и часть души, и часть жизни. Либо же могут произойти изменения, которые оставят лишь в воспоминаниях какие-то тёплые и душевные моменты в жизни. Например, продажа родительского дома и как следствие невозможно будет приехать туда, где прошло счастливое детство и где родители были молоды и здоровы.
<br>В этот период может настигнуть и внутренний кризис, когда приходит осознание, что нет особых достижений и жизнь могла бы сложиться намного лучше, кажется, что уже достигнут ""потолок"" и больше не будет изменений к лучшему. Человек сталкивается с апатией, упадком сил, нежеланием вообще что-либо делать. Нет сил принять те изменения, которые преподносит жизнь. Резко падает самооценка, появляется огромное количество комплексов, ощущение беспомощности. Кажется, что никто не понимает, навязчивое чувство одиночества приводит к депрессии. Происходит переоценка взглядов и все, что раньше было важно, теряет ценность. Происходит эмоциональное выгорание и нарушается психическое здоровье. Важно понимать, что всё, что происходит, это не конец жизни, а переход на другой, более качественный уровень, не нужно замыкаться в себе и следует начать смотреть на действительность под другим углом.`;
yearsPanelItem.appendChild(paragraph);
break;
}
case 14: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(14) Период, когда душа болит, а сердце плачет. В этот период человек может испытывать глубокие внутренние страдания, на душе катастрофически плохо. Часто это бывает вызвано развитием малоприятных событий, которые нарушают не только привычный уклад жизни, но и меняют взгляды на жизнь, опустошая при этом внутренний ресурс. В этот период ничего не мило, злят привычные вещи, нет желания ни с кем общаться.  Зачастую душевные переживания настигают человека, когда его личные представления не совпадают с тем, что происходит в реальной жизни и тогда человек попросту испытывает разочарование в этой жизни. Здесь может быть предательство любимого человека, или его смерть, когда душа разрывается от боли. Человек может начать глушить эту боль посредством алкоголя или запрещённых веществ, тем самым наносит ещё бОльший вред своей душе. `;
yearsPanelItem.appendChild(paragraph);
break;
}
case 15: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(15) Неблагоприятный период, когда тёмная сторона души человека может дать о себе знать. Проявляются такие качества как гнев, зависть, лживость, ревность, тщеславие, эмоциональная зависимость и так далее. Человек может начать нарушать закон, занимаясь мошенничеством и воровством, ведь им движет непреодолимая тяга к деньгам. Здесь же могут появиться и различного рода зависимости - алкогольная, наркотическая, игровая. Человек может находиться в состоянии какой-то нездоровой эйфории и не может отказать себе ни в чем, так теряются большие суммы денег, начинаются долги. Чтобы покрыть долги человек впутывается в новые и новые аферы, получает деньги, снова их прогуливает, снова аферы и так по кругу. `;
yearsPanelItem.appendChild(paragraph);
break;
}
case 16: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(16) Период регресса в жизни. Может произойти моральная деградация - человек откажется от тех моральных ценностей, которыми жил раньше, в угоду сомнительных удовольствий; его захватят негативные эмоции и качества(злость, зависть, агрессия, лицемерие, подлость). Этот период разрушения души и тела, отношений и карьеры, вся жизнь идёт под откос. Человек может остаться ни с чем. В этот период самое главное, не углубляться в темноту, суметь остановиться, достойно пройти испытания и тогда судьба сжалится. Если же человек полностью погрузится в темноту, то выйти из неё будет очень сложно, а иногда и невозможно.`;
yearsPanelItem.appendChild(paragraph);
break;
}
case 17: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(17) Это период спада, который характеризуется состоянием подавленности и опустошения, мрачными настроениями,  унынием и тоской. У человека снижаются общительность и активность, повышается ипохондричность (преувеличение проблем со здоровьем) и мнительность, возникают неудовлетворенность текущими событиями и собой, пессимизм и скептическое отношение ко всему. Человек не может себя реализовать, сидит и сожалеет об упущенных возможностях, вспоминает прежние переломные моменты в жизни, «пережевывает» собственные неудачи. Накрывает состояние безысходности и бесполезности. `;
yearsPanelItem.appendChild(paragraph);
break;
}
case 18: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(18) Период нахождения под влиянием плохого окружения. Это могут быть люди, которые постоянно генерируют негатив, независимо от внешних обстоятельств. Они всегда всем недовольны, им всегда все должны и все вокруг во всем виноваты. Это могут быть и обычные пессимисты, которые не могут справляться с событиями в своей жизни и сеют панику вокруг себя. Это могут быть и по-настоящему озлобленные люди, которые искренне ненавидят весь мир. А могут быть алкоголики и наркоманы. В любом случае, они излучают негативную энергетику, которая влияет на тех, кто находится с ними рядом. Начинаются проблемы со здоровьем, время тратится впустую, не получается радоваться жизни, нет движения вперёд, превращается развитие, снижается качество жизни.
<br>Также в этот период человек подвластен сглазам и порчам, потому как подобное притягивает подобное. Человек окружён негативной энергетикой и ей притягивает всё нехорошее. `;
yearsPanelItem.appendChild(paragraph);
break;
}
case 19: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(19) Неблагоприятный период, характеризующийся наплывом разного рода проблем: на работе, в семье, со здоровьем. Могут возникнуть большие денежные трудности, долги, большие непредвиденные расходы. Человек теряет своё прежнее положение в обществе, теряет авторитет и уважение, становится уязвимым для мнения окружающих, закрывается от людей, уходит в одиночеству. Если человек не впадает в панику, не начинает жить страхами(страх бедности, одиночества, непонимания), то этот период быстро проходит. Но если же страхи начинают есть его изнутри, то период может затянуться и закончиться непредсказуемо. `;
yearsPanelItem.appendChild(paragraph);
break;
}
case 20: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(20) Очень тяжёлый период, во время которого испытания суждено пройти не только человеку, но и его семье. Это может быть и тяжёлая болезнь кого-то из родственников, а может быть и смерть. Либо же могут возникать серьёзные конфликты и ссоры внутри семьи, непонимание, упрёки, обиды, оскорбления. В этот период семья по каким-то причинам может отвернуться, отказаться, лишить поддержки и человек останется один, его исключат из рода. В этот период и сам человек может оказаться между жизнью и смертью (болезнь, ДТП, тяжёлая травма). В этот период вся плохая карма рода проявляется и человеку предстоит её проработать. В этот день период человек не может реализовать свои планы, случаются неприятности, которые не дают ему идти вперёд. `;
yearsPanelItem.appendChild(paragraph);
break;
}
case 21: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(21) Этот период характеризуется трудными и болезненными для человека изменениями, которые он не хочет или не может принять, но вынужден это делать, так как именно так складываются обстоятельства, приходится переступать через себя, преодолевать, смириться. Человек выходит из зоны комфорта, где чувствовал себя относительно уверенно и спокойно. Это может быть понижение на работе, сокращение, потеря работы, вынужденный переезд в другой город, разрыв отношений и т.п.
<br>Если человек в душе примет все эти изменения, то жизнь быстро наладится. Если же он начнёт сопротивляться, воевать, ругать эту жизнь, то период может значительно затянуться. Нужно бороться с недовольством, быть благодарным за всё, что имеешь, быть открытым для этого мира и Бога, открытым для любви. `;
yearsPanelItem.appendChild(paragraph);
break;
}
case 22: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(22) Период ограничений и рамок. Ярко проявляются все негативные установки и представления о себе, которые препятствуют развитию и движению вперёд. ""Я не умею ладить с людьми"", ""У меня совсем нет способностей к бизнесу/пению/иностранным языкам"", ""Мне не дано…"", ""У меня ничего не получится"" и так далее. И исходя из этих убеждений строится жизнь. В этот же период человек может стать заложником каких-то обстоятельств, попасть в ситуацию, из которые кажется, что нет выхода, у человека может отсутствовать право выбора. То есть человек оказывается несвободным и неспособным действовать так, как ему хотелось бы.
<br>Может быть и совершенно негативная ситуация, когда человек попадает в места лишения свободы или на лечение(когда эта энергия в минусе, может открыться шизофрения или иные психические расстройства, требующие помещение человека в специальные учреждения). `;
yearsPanelItem.appendChild(paragraph);
break;
}}
}
if(gender==='Ж'){
const text=document.createElement('p');
text.innerHTML='В плюсе';
text.style.fontWeight='700';
yearsPanelItem.appendChild(text);
switch (number){
case 3: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(3) Раскрытие женского предназначения и женского потенциала. Если Вы одиноки, то Вам предстоит встреча со своей второй половинкой, начнутся отношения. Если Вы уже в отношениях, то Вас ожидает развитие отношений, вступление в брак, красивая свадьба. Если Вы уже в браке, то обретёте гармонию, мир и спокойствие в семье, откроете для себя новые грани семейное жизни, обретёте взаимопонимание в случае его отсутствия, то есть Ваша семейная жизнь заиграет новыми красками. Это период, когда Вы прислушаетесь к своей женской природе и не пойдёте против неё, откроете для себя счастье материнства или хранительницы очага, создадите неповторимый уют и тепло в доме, станете первоклассной хозяйкой, понимающей и заботливой матерью, любящей и заботливой женой. Поймёте и примите всю себя такой, какая Вы есть. Начнёте вдохновлять и станете музой для противоположного пола. Станете спокойной, сбалансированный и гармоничной. Станете Женщиной во всех её проявлениях. Сумеете грамотно сочетать работу и дом. Возможно, повышение на работе, открытие своего бизнеса, увеличение дохода, расширение сфер своего влияния. `;
yearsPanelItem.appendChild(paragraph);
break;
}
case 4: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(4) Неплохой период, в который женщина может обрести крепкое мужское плечо. Если женщина ещё не в отношениях, то встретит мужчину. Если же она в отношениях, то вполне вероятна смена партнёра. В обоих случаях женщине необходимо принять патриархальный тип отношений, при котором он - добытчик, а она - хранительница очага; стать для него музой, вдохновляющей его на подвиги, а он в ответ будет боготворить её. При таком типе отношений нет сомнений в силе, авторитете и последнем слове мужчины, нет места не уважительному отношению к нему, упрёкам, требованиям, контролю. Это отличный период для замужества. Также в этот период возможно продвижение на работе, благодаря протекции мужчины. Либо же женщина встретит свой идеал в лице мужчины-начальника и обретёт его покровительство, которое поможет ей исполнить давние желания и достичь целей, которые она не могла достичь в одиночку.`;
yearsPanelItem.appendChild(paragraph);
break;
}
case 5: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(5) Период приятной бумажной волокиты - оформление каких-то важных документов, которые до этого долго не было возможности оформить, официальное оформление отношений, рождение детей и получение на них всех необходимых документов (свидетельство о рождении, полис, СНИЛС, оформление выплат и пособий, материнского капитала), разрешение споров в суде. Часто бывает, что всё перечисленное идёт вместе или быстро друг за другом с малыми промежутками во времени. В любом случае это хороший период, когда жизнь упорядочивается, жизнь обретает смысл и систему, всё в ней происходит поэтапно, всё налаживается.
<br>Также в этот период открываются двери для получения нового образования, продвижения на службе, обретения уважения и новых сфер влияния. `;
yearsPanelItem.appendChild(paragraph);
break;
}
case 6: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(6) Прекрасный период влюблённости, любви и проявления любых тёплых чувств. В этот период сердце замирает, наполняясь любовью, и бабочки летают в животе. Время романтики, цветов, подарков, праздничных мероприятий. В такие периоды случаются свадьбы, помолвки, а также любые другие мероприятия, участниками и организаторами которых выступают влюблённые люди, готовые дарить радость всем вокруг.
<br>Также это период активной общественной деятельности, бурного дружеского общения, весёлых вечеринок до утра.
<br>Это отличный период, чтобы начать жить в гармонии с собой, принять и полюбить себя, осознать свою ценность и значимость, заняться любимым делом, окружить себя красотой, создать уют в доме, заняться своей внешностью и обновить гардероб, добавив в него новые красивые и интересные вещи.
<br>В целом, это позитивная энергия дружбы, открытости и любви. Но чтобы обрести эту дружбу и любовь сначала предстоит пройти через предательства и разочарования, невозможно прийти к плюсу, не пройдя через минус. Здесь главное не закрывать глаза на эти предательства, не прятать голову в песок, делая вид, что всё хорошо, принять факт негатива в свою сторону, прожить это и тогда жизнь страну станет уходить в плюс.`;
yearsPanelItem.appendChild(paragraph);
break;
}
case 7: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(7) Благоприятный период маленьких и больших побед, успехов и достижений. Женщина может выйти замуж, и непременно очень удачно. Может пойти вверх по карьерной лестнице. Может исполнить любые давно загаданные желания. `;
yearsPanelItem.appendChild(paragraph);
break;
}
case 8: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(8) Период стабильности и размерности. Жизнь сложилась, есть почва под ногами, быт налажен. Период, когда воздаётся по заслугам, когда получают награды за свои труды, когда разрешаются давние споры и конфликты, период, когда всё налаживается. Здесь возможно документальное оформление каких-то событий, например, получение гражданства или визы, разрешений на что-то. Возможно приобретение недвижимости или других крупных покупок, требующих оформления. `;
yearsPanelItem.appendChild(paragraph);
break;
}
case 9: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(9) Период развития - интеллектуального и духовного. Период получения качественной информации извне, период изучения культуры и искусства, период определения, осмысливая и осознания происходящих вокруг событий,  период формирования нравственных идеалов и ценностей. Период анализа и познания этого мира. Период наполнения своего внутреннего мира всё новой и новой информацией, общаясь, учась, читая, смотря, слушая. Чем больше человек думает, тем лучше и эффективнее работает его мышление. В этот период надо стараться перерабатывать всю информацию, поступившую к Вам. Всё осмысливать, анализировать, сравнивать, делать выводы. То есть, применять все возможные мыслительные процессы. Этот период прекрасно подходит для развития воображения. Самый эффективный способ - мечтать и фантазировать. То есть, воображать все возможные и невозможные варианты развития событий. Но самый простой способ развития воображения - это чтение. Когда человек читает, он представляет то, о чём прочитал. То есть это период, когда человек наполняет свой внутренний мир и получает новые знания. В этот же период человек может начать делиться своими знаниями с другими, обрести единомышленников, сформировать узкий круг своих последователей.
<br>Для женщин этот период может означать беременность, так как во время неё женщина начинает неосознанно глубже смотреть на многие вещи, закрывается в своём собственном мире, начинает иначе воспринимать этот мир. `;
yearsPanelItem.appendChild(paragraph);
break;
}
case 10: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(10) Период чудесных радостных событий и удачных поворотов судьбы. Период, когда человек будет удачливым во всём, ему будет сопутствовать везение. Он будет легко добиваться в жизни всего, быстро достигнет желаемого, сможет избежать серьёзных опасностей и трудностей, выйдет из любых сложных жизненных ситуаций. И для всего этого ему не нужно будет прилагать больших усилий, всё уже предрешено высшими силами. Так же это период может ознаменоваться интересными путешествиями, новыми знакомствами с приятными людьми, морем положительных эмоций и незабываемых впечатлений. `;
yearsPanelItem.appendChild(paragraph);
break;
}
case 11: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(11) Очень продуктивный и активный период в жизни, когда получаешь несоизмеримо хорошую отдачу на приложенные усилия. Сила и энергия бьют через край, человек чувствует, что может свернуть горы. Всё получается. Любая работа даётся легко, в короткие сроки выполняются большие объёмы. Если речь идёт о бизнесе, то он стремительно развивается и масштабируется. Это могут быть и колоссальные творческие успехи и приличные спортивные результаты.
<br>Для женщины - это может быть и беременность. `;
yearsPanelItem.appendChild(paragraph);
break;
}
case 12: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(12) Период изменений и помощи другим. Этот период характеризуется событиями, которые вполне способны изменить ход жизни человека. И здесь нет никаких ограничений по тому, какими эти события могут быть - это может быть и неожиданная беременность и прорыв в творчестве, когда человек запишет новый трек и взорвёт все чарты и музыкальные каналы. А может, человек захочет освоить новую профессию и приступит к обучению. Так же это период характеризуется активной помощью людям, здесь может быть и участие в волонтёрских движениях, и участие в благотворительных фондах, да и просто разовые пожертвования на восстановление храма или культурных достопримечательностей.`;
yearsPanelItem.appendChild(paragraph);
break;
}
case 13: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(13) Период кардинальных изменений, когда можно и нужно перевернуть жизнь. Человек внутренне готов поменяться(он нарастил решительность, обрёл внутреннюю зрелость и способность использовать обстоятельства), а толчком к переменам станет неожиданный поворот судьбы. Не нужно смотреть на него сквозь призму недовольства, а воспользовавшись обстоятельствами, важно изменить к лучшему собственную жизнь. Здесь может быть и смена места работы, и смена сферы деятельности в целом, смена места жительства, рождение детей, смена образа жизни (например, человек перешёл на ЗОЖ, стал вегетарианцем, начал заниматься спортом и т.п.). Чтобы сделать шаг вперёд, потребуется разрушить общепринятые шаблоны и стереотипы, мешающие правила и устоявшиеся стандарты мышления. Произведя радикальные перемены в жизни, человек совершит внезапный и мощный рывок вперед.`;
yearsPanelItem.appendChild(paragraph);
break;
}
case 14: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(14) Очень позитивный период в жизни, когда на душе светло и счастливо. Состояние полного счастья, человек доволен своей жизнью. При этом совершенно неважно, что является источником такого состояния. Для кого-то это гармония в семье, для другого – интересная работа. Каждый человек в этот период будет счастлив по-своему.
<br>Этот период характеризуется отличным настроением, положительными эмоциями, совершенным спокойствием, умиротворением, оптимизмом, гармонией, уверенностью в себе, достижением поставленных целей. `;
yearsPanelItem.appendChild(paragraph);
break;
}
case 15: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(15) Период материального процветания. В этот период значительно улучшается материальное состояние, получаются сверхприбыли, выигрываются лотереи, отдаются долги, приобретаются новые материальные ценности, то есть деньги нескончаемым потоком идут в руки. Меняется положение в обществе, расширяются сферы влияния, зарабатывается авторитет. Прекрасный период, чтобы научиться не впадать в зависимость от материального, научиться жить умеренно и сдержанно, начать проявлять щедрость, усилить связь с Богом и с его помощью побороть пороки и зависимости.
`;
yearsPanelItem.appendChild(paragraph);
break;
}
case 16: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(16) Период внутренних изменений. В этот период происходит изменение восприятия реальности, меняются привычные взгляды на жизнь. ""Человек способен изменить свою жизнь, меняя всего лишь свою точку зрения"" (с) Дж. Вильямс. Это выражение как нельзя лучше описывает данный период жизни.
<br>В этот период человек не боится бросить вызов самому себе, например, путешествовать в одиночку, переехать в новую страну или избавиться от какой-то зависимости. Он отказывается от старых правил и устанавливает новые, которые устраивают именно его. Меняются приоритеты - то, что было интересно в прошлом году, уже не актуально сейчас. Человек начинает одеваться для комфорта, а не для того, чтобы произвести впечатление. Больше не покупает вещи, которые не нужны, только потому, что они модные.
<br>Жизнь больше не воспринимается, как чёрное и белое. Прекращается осуждение других людей, так как приходит понимание, что это их жизнь и их опыт. Человек понимает, что для него важно и сосредотачивается именно на этом. Не зацикливается и не зависит от соцсетей. Человек приходит к пониманию того, что сам несёт ответственность за свою жизнь и свою судьбу.`;
yearsPanelItem.appendChild(paragraph);
break;
}
case 17: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(17) Период реализации всех способностей человека. Человек становится востребованным, высокооплачиваемым и успешным,  развивается, совершенствуется, обходит всех конкурентов, начинает буквально блистать среди своих коллег. Он достигает небывалых высот, становится эффектным и ярким, его становится невозможно не заметить. Он в центре внимания, о нём говорят, к его мнению прислушиваются, на него хотят быть похожим, он становится примером для многих. Это период подъёма, роста, развития, прогресса. Обретается гармония с окружающим миром и со своим внутренним «Я». `;
yearsPanelItem.appendChild(paragraph);
break;
}
case 18: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(18) Период смены окружения. На смену пессимистам и токсичным людям придут успешные и позитивно настроенные. За счёт энергетического обмена с ними и поддержки с их стороны будет происходить совершенствование и развитие. Общение с ними принесёт неоспоримую пользу в достижении целей и улучшит качество жизни.
<br>В этот период также может произойти и смена мышления - с негативного на позитивное; либо же человек может уйти в творчество, стать ближе к искусству, увлечься модой. `;
yearsPanelItem.appendChild(paragraph);
break;
}
case 19: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(19) Период успеха и благоприятных изменений в жизни. Человек добивается поставленных перед собой целей, доволен всеми своими достижениями, морально удовлетворён своим положением в обществе. Здесь он может получить новую интересную и высокооплачиваемую работу, о которой давно мечтал. Либо же может получить более высокую должность там, где уже работает. В любом случае, это увеличение материального достатка и материальных благ, обретение финансовой свободы, процветание, повышение социального статуса.
<br>Человек становится способным вдохновлять и мотивировать окружающих, становится авторитетным лидером, способным заставить других следовать за ним. `;
yearsPanelItem.appendChild(paragraph);
break;
}
case 20: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(20) Благоприятный период, связанный с приятными хлопотами в семье либо же переездом в другую страну. В семье происходят события, которые сплачивают её членов, приносят радость и счастье. Например, рождение детей. Возможно, приезд родственников, с которыми очень давно не виделись. Либо появляется тот, кого считали пропавшим. Здесь же может случиться и переезд в другую страну, знакомство и брак с иностранцем, работа в другой стране, либо же просто путешествия.
<br>Могут открыться новые возможности в творчестве и работе, которые принесут популярность (работа на телевидении, блог эксперта, начало своего бизнеса).`;
yearsPanelItem.appendChild(paragraph);
break;
}
case 21: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(21) В первую очередь в этот период может произойти переезд. Это может быть переезд из одного жилья в другое, может быть переезд из одного города в другой, а может быть и переезд в другую страну. Но определённо меняется привычное место жительства. Также этот период может быть связан с появлением новых людей в окружении, новые встречи, знакомства, связи, новое общение. Жизнь меняется, выходит на иной уровень. Появляется новая работа, открываются новые возможности. В этот период происходит развитие в человеке уверенности в себе, в своих способностях, в своем потенциале и в важности своих действий и решений, чтобы положительно влиять на свою жизнь.
<br>Это период положительных изменений и движения вперёд. `;
yearsPanelItem.appendChild(paragraph);
break;
}
case 22: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(22) Период начала новой жизни, когда все переживания и проблемы остаются в старой. Человек открывает себя по-новому - у него повышается самооценка, обретается уверенность в себе и желание следить за своим внешним видом и физическим здоровьем, уходит страх перемен и напрасные переживания, у него появляется сильное желание развиваться и двигаться вперёд, проходит зависть к другим, разрываются токсичные отношения, человек начинает жить здесь и сейчас. Появляется новая работа, завязываются новые отношения, появляются новые увлечение. Это период всего нового и интересного. Это так же может быть очень активный и жизнерадостный период путешествий, поездок, встреч с друзьями, участия в больших общественных проектах. Человек в этот момент чувствует себя абсолютно свободным и способным на всё. Это так и есть. `;
yearsPanelItem.appendChild(paragraph);
break;
}}
const text2=document.createElement('p');
text2.innerHTML='В минусе';
text2.style.fontWeight='700';
yearsPanelItem.appendChild(text2);
switch (number){
case 3: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(3) Тяжёлый период в отношениях и семейной жизни, подразумевающий начало проблем между мужчиной и женщиной. Уходят взаимопонимание и взаимоуважение, а на первый план выходят упрёки и недоверие, обиды и разочарование в партнёре, ссоры и унижения. Женщина может узнать о предательстве со стороны мужчины. В этот период она может остаться одна - отношения прекратятся, а брак рухнет. Женщина может разочароваться в любви, семейной жизни и мужчинах, появятся проблемы с самооценкой и принятием своей внешности, будет казаться, что всё хорошее осталось позади, а впереди лишь одиночество и пустота. У женщины могут возникнуть недопонимания и конфликты не только с мужчиной, но и с детьми, они могут отдалиться от неё, перестать нормально общаться и воспринимать как близкого человека. Здесь же может развиваться и ситуацию, когда женщина взваливает на свои плечи мужские обязанности, начинает выполнять в семье мужские функции, забывает о своём женском начале, становится категоричной, требовательной, агрессивной, грубой  то есть она забывает, что она женщина. `;
yearsPanelItem.appendChild(paragraph);
break;
}
case 4: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(4) Период, когда женщина остаётся без мужской поддержки. Здесь может быть и то, что мужчина в прямом смысле уходит и оставляет женщину одну. Либо же он начинает вести двойную жизнь, изменяя ей. Либо же мужчина номинально есть, но не может стать опорой для женщины, поскольку является слишком мягкотелым, слабохарактерным, безответственным, у него отсутствуют цели и какие-либо амбиции, он не может материально обеспечить женщину, позаботиться о ней и детях. Либо женщина вступает в отношения с мужчиной, но при этом не может открыто рассказать о нём, поскольку он, к примеру, женат, либо занимает какую-то должность и связь с ней может скомпрометировать его. В этот период женщине важно не терять связь с отцом, при проблемах в общении с ним, постараться их устранить, простить обиды и начать общаться с ним, как с одним из самых близких людей.
<br>Также несмотря на все трудности в отношениях с мужчинами, женщине в этот период важно не потерять уважение и доверие к мужскому полу, не потерять своё женское начало, не исключать возможность счастливых и гармоничных отношений с мужчинами. `;
yearsPanelItem.appendChild(paragraph);
break;
}
case 5: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(5) Период крупных и мелких неудач. Могут возникнуть проблемы с законом, проблемы в семье - с мужем, с детьми, разладятся отношения с родителями или другими родственниками, всплывут какие-то ошибки на работе (например, во время проверки или ревизии). Будет казаться, что всё рушится. Глобально ничего трагического не произойдёт, но череда не совсем приятных инцидентов изрядно попортит нервы. Важно будет не впадать в панику, с холодной головой посмотреть на происходящее и твёрдой рукой навести порядок во всём - дома, на работе, в отношениях с другими людьми. Важно начать жить по правилам и следовать определённому порядку, не бежать впереди паровоза, не поучать других, не брать на себя много, не врать, не жить двойными стандартами. Также большое значение имеет отношение с родителями, а в особенности, с отцом. Важно принять его таким, какой он есть, простить все обиды и открыть своё сердце для любви к нему. `;
yearsPanelItem.appendChild(paragraph);
break;
}
case 6: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(6) Неблагоприятный период, во время которого любимый человек может предать или совершить подлость; может изменить, сильно обидеть, не посчитаться с интересами и желаниями или же применить физическую силу; может ударить в самое больное место, не щадя главных ценностей и важных для человека моральных устоев. Во время этого периода очень часто происходят прекращения отношений и разводы.
<br>Этот период также характеризуется отсутствием положительных эмоций, отсутствием желания любить и ухаживать за собой, потерей гармонии в жизни. В этот период жизненно важно следить за своим здоровьем, особенно за здоровьем сердечно-сосудистой системы.
<br>Здесь же человек может оказаться перед трудным выбором, будет трудно принять решение, сделать шаг в ту или иную сторону.
<br>В целом, это позитивная энергия дружбы, открытости и любви. Но чтобы обрести эту дружбу и любовь сначала предстоит пройти через предательства и разочарования, невозможно прийти к плюсу, не пройдя через минус. Здесь главное не закрывать глаза на эти предательства, не прятать голову в песок, делая вид, что всё хорошо, принять факт негатива в свою сторону, прожить это и тогда жизнь страну станет уходить в плюс.`;
yearsPanelItem.appendChild(paragraph);
break;
}
case 7: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(7) Крайне неблагоприятный период болезней и неудач. Период, когда совершаются ошибки, принимаются неверные решения, теряется работа и уважение людей, преследуют поражения, предательства, появляются долги. Может произойти разрыв отношений с любимым человеком. В этот период можно стать жертвой насмешки, оскорбления и позора. `;
yearsPanelItem.appendChild(paragraph);
break;
}
case 8: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(8) Период несправедливости, обмана и предательства. В этот период так же возможны противозаконные действия в Ваш адрес. Почва уходит из-под ног, нарушается стабильность и привычный образ жизни, друзья предают, любимые люди изменяют, коллеги подставляют. В этот период, главное всё это принять и переждать, а не вступать в борьбу с ветряными мельницами. Если же вы начнёте вступать в противостояние, взывать к справедливости, то только усугубите ситуацию и получите удары пострашнее тех неприятностей, которые уже произошли. Только смирение и холодная голова смогут выравнить ситуацию и обернуть минус в плюс. Воспринимайте все проблемы как испытания. Если испытания пройдены с достоинством, то жизнь возвращается в привычное русло. Если же в этих испытаниях Вы потеряли своё лицо и себя, то они продолжатся и обрушатся на Вас с новой силой. `;
yearsPanelItem.appendChild(paragraph);
break;
}
case 9: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(9) Период болезней и одиночества. Начинаются проблемы с физическим здоровьем и здесь важно не пропустить момент, не запустить болезнь, а предпринять все меры для выздоровления. Также в этот период человек может остаться один на один со своими бедами, может остаться без работы, может лишиться семьи и поддержки родственников, может прекратить общения с друзьями. Главное, в этот период не уйти полностью в себя и не закрыться полностью от этого мира.
`;
yearsPanelItem.appendChild(paragraph);
break;
}
case 10: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(10) Отчётливая чёрная полоса в жизни. Всё валится из рук, деньги утекают как вода, предают близкие люди, не везёт ни в чем. Даже в самых незначительных бытовых мелочах происходят всякие катаклизмы и неурядицы. Создаётся ощущение, что в один день кто-то пришёл и забрал удачу. Появляется разочарование в окружающем мире и себе, агрессивность к другим людям, неуверенность в своих силах, обида на весь мир, чувство опустошенности. Также в этот период может появиться плохое окружение, которое будет оказывать значительное негативное влияние, что, в свою очередь, ещё более затянет в вопреки неудач. `;
yearsPanelItem.appendChild(paragraph);
break;
}
case 11: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(11) Период работы на износ, физическое и моральное истощение, сильное эмоциональное выгорание, упадок сил, потеря мотивации, опустошение. Сильное разочарования в себе и своих силах, поскольку работа не приносит того результата, который хотелось бы. Работаешь и всё в пустую. На этой почве начинаются проблемы в семье, ссоры, обиды, непонимание, взаимные упрёки, проявляются негативные эмоции. Либо наоборот работа приносит результат, но всё время хочется больше - больше денег, больше недвижимости, больше власти. Человек всё больше и больше рвётся, именно уже рвётся, а не работает. Без отдыха, без расслабления. И загоняет себя в такую ситуацию, когда все заработанные блага не приносят удовольствия , так как усталость перекрывает  все остальные эмоции. При этом тоже начинаются проблемы в семье, поскольку семья его просто не видит. Нужно остановиться, вдохнуть-выдохнуть, понять, что есть вещи важнее материальных благ и что все деньги заработать невозможно. `;
yearsPanelItem.appendChild(paragraph);
break;
}
case 12: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(12) Очень несчастливый период, в который с человеком могут происходить различные несчастные случаи, наносящие существенный вред здоровью. Это могут быть и ДТП, и разного рода травмы - переломы, ожоги, отравления. Может даже случиться замершая беременность.
<br>Здесь же могут быть и ситуации, которые негативно влияют на эмоциональное состояние. Например, несправедливое отношение, оскорбления, предательства, обман. В этот период человек может попасть в отношения, в которых он будет выступать в роли жертвы, будет страдать морально, теперь унижения и манипуляции со стороны другого человека. Это могут быть и личные отношения, когда человек попадает в зависимость от своего избранника. Это могут быть и рабочие ситуации, при которых человек выполняет роль бесплатной рабочей силы для своего начальника.
<br>Также этот период может быть периодом застоя, когда человек закрывается от всего нового, боится перемен и отказывается двигаться вперёд. `;
yearsPanelItem.appendChild(paragraph);
break;
}
case 13: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(13) Достаточно тяжёлый период в жизни. Могут случиться болезненные потери и изменения, которые оставят далеко в прошлом привычную налаженную жизнь. Здесь можно столкнуться со смертью кого-то из близких людей и с этим человеком уйдёт и часть души, и часть жизни. Либо же могут произойти изменения, которые оставят лишь в воспоминаниях какие-то тёплые и душевные моменты в жизни. Например, продажа родительского дома и как следствие невозможно будет приехать туда, где прошло счастливое детство и где родители были молоды и здоровы.
<br>В этот период может настигнуть и внутренний кризис, когда приходит осознание, что нет особых достижений и жизнь могла бы сложиться намного лучше, кажется, что уже достигнут ""потолок"" и больше не будет изменений к лучшему. Человек сталкивается с апатией, упадком сил, нежеланием вообще что-либо делать. Нет сил принять те изменения, которые преподносит жизнь. Резко падает самооценка, появляется огромное количество комплексов, ощущение беспомощности. Кажется, что никто не понимает, навязчивое чувство одиночества приводит к депрессии. Происходит переоценка взглядов и все, что раньше было важно, теряет ценность. Происходит эмоциональное выгорание и нарушается психическое здоровье. Важно понимать, что всё, что происходит, это не конец жизни, а переход на другой, более качественный уровень, не нужно замыкаться в себе и следует начать смотреть на действительность под другим углом.`;
yearsPanelItem.appendChild(paragraph);
break;
}
case 14: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(14) Период, когда душа болит, а сердце плачет. В этот период человек может испытывать глубокие внутренние страдания, на душе катастрофически плохо. Часто это бывает вызвано развитием малоприятных событий, которые нарушают не только привычный уклад жизни, но и меняют взгляды на жизнь, опустошая при этом внутренний ресурс. В этот период ничего не мило, злят привычные вещи, нет желания ни с кем общаться.  Зачастую душевные переживания настигают человека, когда его личные представления не совпадают с тем, что происходит в реальной жизни и тогда человек попросту испытывает разочарование в этой жизни. Здесь может быть предательство любимого человека, или его смерть, когда душа разрывается от боли. Человек может начать глушить эту боль посредством алкоголя или запрещённых веществ, тем самым наносит ещё бОльший вред своей душе. `;
yearsPanelItem.appendChild(paragraph);
break;
}
case 15: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(15) Неблагоприятный период, когда тёмная сторона души человека может дать о себе знать. Проявляются такие качества как гнев, зависть, лживость, ревность, тщеславие, эмоциональная зависимость и так далее. Человек может начать нарушать закон, занимаясь мошенничеством и воровством, ведь им движет непреодолимая тяга к деньгам. Здесь же могут появиться и различного рода зависимости - алкогольная, наркотическая, игровая. Человек может находиться в состоянии какой-то нездоровой эйфории и не может отказать себе ни в чем, так теряются большие суммы денег, начинаются долги. Чтобы покрыть долги человек впутывается в новые и новые аферы, получает деньги, снова их прогуливает, снова аферы и так по кругу. `;
yearsPanelItem.appendChild(paragraph);
break;
}
case 16: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(16) Период регресса в жизни. Может произойти моральная деградация - человек откажется от тех моральных ценностей, которыми жил раньше, в угоду сомнительных удовольствий; его захватят негативные эмоции и качества(злость, зависть, агрессия, лицемерие, подлость). Этот период разрушения души и тела, отношений и карьеры, вся жизнь идёт под откос. Человек может остаться ни с чем. В этот период самое главное, не углубляться в темноту, суметь остановиться, достойно пройти испытания и тогда судьба сжалится. Если же человек полностью погрузится в темноту, то выйти из неё будет очень сложно, а иногда и невозможно.`;
yearsPanelItem.appendChild(paragraph);
break;
}
case 17: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(17) Это период спада, который характеризуется состоянием подавленности и опустошения, мрачными настроениями,  унынием и тоской. У человека снижаются общительность и активность, повышается ипохондричность (преувеличение проблем со здоровьем) и мнительность, возникают неудовлетворенность текущими событиями и собой, пессимизм и скептическое отношение ко всему. Человек не может себя реализовать, сидит и сожалеет об упущенных возможностях, вспоминает прежние переломные моменты в жизни, «пережевывает» собственные неудачи. Накрывает состояние безысходности и бесполезности. `;
yearsPanelItem.appendChild(paragraph);
break;
}
case 18: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(18) Период нахождения под влиянием плохого окружения. Это могут быть люди, которые постоянно генерируют негатив, независимо от внешних обстоятельств. Они всегда всем недовольны, им всегда все должны и все вокруг во всем виноваты. Это могут быть и обычные пессимисты, которые не могут справляться с событиями в своей жизни и сеют панику вокруг себя. Это могут быть и по-настоящему озлобленные люди, которые искренне ненавидят весь мир. А могут быть алкоголики и наркоманы. В любом случае, они излучают негативную энергетику, которая влияет на тех, кто находится с ними рядом. Начинаются проблемы со здоровьем, время тратится впустую, не получается радоваться жизни, нет движения вперёд, превращается развитие, снижается качество жизни.
<br>Также в этот период человек подвластен сглазам и порчам, потому как подобное притягивает подобное. Человек окружён негативной энергетикой и ей притягивает всё нехорошее. `;
yearsPanelItem.appendChild(paragraph);
break;
}
case 19: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(19) Неблагоприятный период, характеризующийся наплывом разного рода проблем: на работе, в семье, со здоровьем. Могут возникнуть большие денежные трудности, долги, большие непредвиденные расходы. Человек теряет своё прежнее положение в обществе, теряет авторитет и уважение, становится уязвимым для мнения окружающих, закрывается от людей, уходит в одиночеству. Если человек не впадает в панику, не начинает жить страхами(страх бедности, одиночества, непонимания), то этот период быстро проходит. Но если же страхи начинают есть его изнутри, то период может затянуться и закончиться непредсказуемо. `;
yearsPanelItem.appendChild(paragraph);
break;
}
case 20: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(20) Очень тяжёлый период, во время которого испытания суждено пройти не только человеку, но и его семье. Это может быть и тяжёлая болезнь кого-то из родственников, а может быть и смерть. Либо же могут возникать серьёзные конфликты и ссоры внутри семьи, непонимание, упрёки, обиды, оскорбления. В этот период семья по каким-то причинам может отвернуться, отказаться, лишить поддержки и человек останется один, его исключат из рода. В этот период и сам человек может оказаться между жизнью и смертью (болезнь, ДТП, тяжёлая травма). В этот период вся плохая карма рода проявляется и человеку предстоит её проработать. В этот день период человек не может реализовать свои планы, случаются неприятности, которые не дают ему идти вперёд. `;
yearsPanelItem.appendChild(paragraph);
break;
}
case 21: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(21) Этот период характеризуется трудными и болезненными для человека изменениями, которые он не хочет или не может принять, но вынужден это делать, так как именно так складываются обстоятельства, приходится переступать через себя, преодолевать, смириться. Человек выходит из зоны комфорта, где чувствовал себя относительно уверенно и спокойно. Это может быть понижение на работе, сокращение, потеря работы, вынужденный переезд в другой город, разрыв отношений и т.п.
<br>Если человек в душе примет все эти изменения, то жизнь быстро наладится. Если же он начнёт сопротивляться, воевать, ругать эту жизнь, то период может значительно затянуться. Нужно бороться с недовольством, быть благодарным за всё, что имеешь, быть открытым для этого мира и Бога, открытым для любви. `;
yearsPanelItem.appendChild(paragraph);
break;
}
case 22: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(22) Период ограничений и рамок. Ярко проявляются все негативные установки и представления о себе, которые препятствуют развитию и движению вперёд. ""Я не умею ладить с людьми"", ""У меня совсем нет способностей к бизнесу/пению/иностранным языкам"", ""Мне не дано…"", ""У меня ничего не получится"" и так далее. И исходя из этих убеждений строится жизнь. В этот же период человек может стать заложником каких-то обстоятельств, попасть в ситуацию, из которые кажется, что нет выхода, у человека может отсутствовать право выбора. То есть человек оказывается несвободным и неспособным действовать так, как ему хотелось бы.
<br>Может быть и совершенно негативная ситуация, когда человек попадает в места лишения свободы или на лечение(когда эта энергия в минусе, может открыться шизофрения или иные психические расстройства, требующие помещение человека в специальные учреждения). `;
yearsPanelItem.appendChild(paragraph);
break;
}}
}
let newAge;
let number2;
if(parseInt(age.innerHTML) <=40){
newAge=parseInt(age.innerHTML) + 40;
}else{
newAge=parseInt(age.innerHTML) - 40;
}
switch (newAge){
case 1: {
number2=AE3;
break;
}
case 2: {
number2=AE3;
break;
}
case 3: {
number2=AE4;
break;
}
case 4: {
number2=AE4;
break;
}
case 5: {
number2=AE;
break;
}
case 6: {
number2=AE5;
break;
}
case 7: {
number2=AE5;
break;
}
case 8: {
number2=AE2;
break;
}
case 9: {
number2=AE6;
break;
}
case 10: {
number2=E;
break;
}
case 11: {
number2=EB3;
break;
}
case 12: {
number2=EB3;
break;
}
case 13: {
number2=EB1;
break;
}
case 14: {
number2=EB4;
break;
}
case 15: {
number2=EB;
break;
}
case 16: {
number2=EB5;
break;
}
case 17: {
number2=EB5;
break;
}
case 18: {
number2=EB2;
break;
}
case 19: {
number2=EB6;
break;
}
case 20: {
number2=B;
break;
}
case 21: {
number2=BF3;
break;
}
case 22: {
number2=BF3;
break;
}
case 23: {
number2=BF1;
break;
}
case 24: {
number2=BF4;
break;
}
case 25: {
number2=BF;
break;
}
case 26: {
number2=BF5;
break;
}
case 27: {
number2=BF5;
break;
}
case 28: {
number2=BF2;
break;
}
case 29: {
number2=BF6;
break;
}
case 30: {
number2=F;
break;
}
case 31: {
number2=FC3;
break;
}
case 32: {
number2=FC3;
break;
}
case 33: {
number2=FC1;
break;
}
case 34: {
number2=FC4;
break;
}
case 35: {
number2=FC;
break;
}
case 36: {
number2=FC5;
break;
}
case 37: {
number2=FC5;
break;
}
case 38: {
number2=FC2;
break;
}
case 39: {
number2=FC6;
break;
}
case 40: {
number2=C;
break;
}
case 41: {
number2=CG3;
break;
}
case 42: {
number2=CG3;
break;
}
case 43: {
number2=CG1;
break;
}
case 44: {
number2=CG4;
break;
}
case 45: {
number2=CG;
break;
}
case 46: {
number2=CG5;
break;
}
case 47: {
number2=CG5;
break;
}
case 48: {
number2=CG2;
break;
}
case 49: {
number2=CG6;
break;
}
case 50: {
number2=G;
break;
}
case 51: {
number2=GD3;
break;
}
case 52: {
number2=GD3;
break;
}
case 53: {
number2=GD1;
break;
}
case 54: {
number2=GD4;
break;
}
case 55: {
number2=GD;
break;
}
case 56: {
number2=GD5;
break;
}
case 57: {
number2=GD5;
break;
}
case 58: {
number2=GD2;
break;
}
case 59: {
number2=GD6;
break;
}
case 60: {
number2=D;
break;
}
case 61: {
number2=DH3;
break;
}
case 62: {
number2=DH3;
break;
}
case 63: {
number2=DH1;
break;
}
case 64: {
number2=DH4;
break;
}
case 65: {
number2=DH;
break;
}
case 66: {
number2=DH5;
break;
}
case 67: {
number2=DH5;
break;
}
case 68: {
number2=DH2;
break;
}
case 69: {
number2=DH6;
break;
}
case 70: {
number2=H;
break;
}
case 71: {
number2=HA3;
break;
}
case 72: {
number2=HA3;
break;
}
case 73: {
number2=HA1;
break;
}
case 74: {
number2=HA4;
break;
}
case 75: {
number2=HA;
break;
}
case 76: {
number2=HA5;
break;
}
case 77: {
number2=HA5;
break;
}
case 78: {
number2=HA2;
break;
}
case 79: {
number2=HA6;
break;
}}
const text2=document.createElement('p');
text2.innerHTML='Причины событий';
text2.style.fontWeight='700';
yearsPanelItem.appendChild(text2);
if(gender==='М'){
const text=document.createElement('p');
text.innerHTML='В плюсе';
text.style.fontWeight='700';
yearsPanelItem.appendChild(text);
switch (number2){
case 3: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(3) Раскрытие женского предназначения и женского потенциала. Если Вы одиноки, то Вам предстоит встреча со своей второй половинкой, начнутся отношения. Если Вы уже в отношениях, то Вас ожидает развитие отношений, вступление в брак, красивая свадьба. Если Вы уже в браке, то обретёте гармонию, мир и спокойствие в семье, откроете для себя новые грани семейное жизни, обретёте взаимопонимание в случае его отсутствия, то есть Ваша семейная жизнь заиграет новыми красками. Это период, когда Вы прислушаетесь к своей женской природе и не пойдёте против неё, откроете для себя счастье материнства или хранительницы очага, создадите неповторимый уют и тепло в доме, станете первоклассной хозяйкой, понимающей и заботливой матерью, любящей и заботливой женой. Поймёте и примите всю себя такой, какая Вы есть. Начнёте вдохновлять и станете музой для противоположного пола. Станете спокойной, сбалансированный и гармоничной. Станете Женщиной во всех её проявлениях. Сумеете грамотно сочетать работу и дом. Возможно, повышение на работе, открытие своего бизнеса, увеличение дохода, расширение сфер своего влияния. `;
yearsPanelItem.appendChild(paragraph);
break;
}
case 4: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(4) Благоприятный во всех смыслах период. Здесь может произойти квантовый скачок в развитии - будет достигнуто всё, к чему мужчина долго и упорно шёл, откроются новые горизонты, увеличатся многократно доходы, произойдёт расширение и укрепление бизнеса, быстрое продвижение по карьерной лестнице. Здесь же мужчина может стать главой семьи, отцом. Одним словом, в этот период мужчина себя полностью реализует во всех аспектах жизни.`;
yearsPanelItem.appendChild(paragraph);
break;
}
case 5: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(5) Период приятной бумажной волокиты - оформление каких-то важных документов, которые до этого долго не было возможности оформить, официальное оформление отношений, рождение детей и получение на них всех необходимых документов (свидетельство о рождении, полис, СНИЛС, оформление выплат и пособий, материнского капитала), разрешение споров в суде. Часто бывает, что всё перечисленное идёт вместе или быстро друг за другом с малыми промежутками во времени. В любом случае это хороший период, когда жизнь упорядочивается, жизнь обретает смысл и систему, всё в ней происходит поэтапно, всё налаживается.
<br>Также в этот период открываются двери для получения нового образования, продвижения на службе, обретения уважения и новых сфер влияния. `;
yearsPanelItem.appendChild(paragraph);
break;
}
case 6: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(6) Прекрасный период влюблённости, любви и проявления любых тёплых чувств. В этот период сердце замирает, наполняясь любовью, и бабочки летают в животе. Время романтики, цветов, подарков, праздничных мероприятий. В такие периоды случаются свадьбы, помолвки, а также любые другие мероприятия, участниками и организаторами которых выступают влюблённые люди, готовые дарить радость всем вокруг.
<br>Также это период активной общественной деятельности, бурного дружеского общения, весёлых вечеринок до утра.
<br>Это отличный период, чтобы начать жить в гармонии с собой, принять и полюбить себя, осознать свою ценность и значимость, заняться любимым делом, окружить себя красотой, создать уют в доме, заняться своей внешностью и обновить гардероб, добавив в него новые красивые и интересные вещи.
<br>В целом, это позитивная энергия дружбы, открытости и любви. Но чтобы обрести эту дружбу и любовь сначала предстоит пройти через предательства и разочарования, невозможно прийти к плюсу, не пройдя через минус. Здесь главное не закрывать глаза на эти предательства, не прятать голову в песок, делая вид, что всё хорошо, принять факт негатива в свою сторону, прожить это и тогда жизнь страну станет уходить в плюс.
`;
yearsPanelItem.appendChild(paragraph);
break;
}
case 7: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(7) Сильный и благоприятный период, во время которого мужчина добьётся успеха, ему будет сопутствовать удача, покорятся все вершины, будут достигнуты многие цели, будут показаны хорошие результаты в любой деятельности. Мужчина поистине проявит себя лидером и победителем. `;
yearsPanelItem.appendChild(paragraph);
break;
}
case 8: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(8) Период стабильности и размерности. Жизнь сложилась, есть почва под ногами, быт налажен. Период, когда воздаётся по заслугам, когда получают награды за свои труды, когда разрешаются давние споры и конфликты, период, когда всё налаживается. Здесь возможно документальное оформление каких-то событий, например, получение гражданства или визы, разрешений на что-то. Возможно приобретение недвижимости или других крупных покупок, требующих оформления. `;
yearsPanelItem.appendChild(paragraph);
break;
}
case 9: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(9) Период развития - интеллектуального и духовного. Период получения качественной информации извне, период изучения культуры и искусства, период определения, осмысливая и осознания происходящих вокруг событий,  период формирования нравственных идеалов и ценностей. Период анализа и познания этого мира. Период наполнения своего внутреннего мира всё новой и новой информацией, общаясь, учась, читая, смотря, слушая. Чем больше человек думает, тем лучше и эффективнее работает его мышление. В этот период надо стараться перерабатывать всю информацию, поступившую к Вам. Всё осмысливать, анализировать, сравнивать, делать выводы. То есть, применять все возможные мыслительные процессы. Этот период прекрасно подходит для развития воображения. Самый эффективный способ - мечтать и фантазировать. То есть, воображать все возможные и невозможные варианты развития событий. Но самый простой способ развития воображения - это чтение. Когда человек читает, он представляет то, о чём прочитал. То есть это период, когда человек наполняет свой внутренний мир и получает новые знания. В этот же период человек может начать делиться своими знаниями с другими, обрести единомышленников, сформировать узкий круг своих последователей.
<br>Для женщин этот период может означать беременность, так как во время неё женщина начинает неосознанно глубже смотреть на многие вещи, закрывается в своём собственном мире, начинает иначе воспринимать этот мир. `;
yearsPanelItem.appendChild(paragraph);
break;
}
case 10: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(10) Период чудесных радостных событий и удачных поворотов судьбы. Период, когда человек будет удачливым во всём, ему будет сопутствовать везение. Он будет легко добиваться в жизни всего, быстро достигнет желаемого, сможет избежать серьёзных опасностей и трудностей, выйдет из любых сложных жизненных ситуаций. И для всего этого ему не нужно будет прилагать больших усилий, всё уже предрешено высшими силами. Так же это период может ознаменоваться интересными путешествиями, новыми знакомствами с приятными людьми, морем положительных эмоций и незабываемых впечатлений. `;
yearsPanelItem.appendChild(paragraph);
break;
}
case 11: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(11) Очень продуктивный и активный период в жизни, когда получаешь несоизмеримо хорошую отдачу на приложенные усилия. Сила и энергия бьют через край, человек чувствует, что может свернуть горы. Всё получается. Любая работа даётся легко, в короткие сроки выполняются большие объёмы. Если речь идёт о бизнесе, то он стремительно развивается и масштабируется. Это могут быть и колоссальные творческие успехи и приличные спортивные результаты.
<br>Для женщины - это может быть и беременность. `;
yearsPanelItem.appendChild(paragraph);
break;
}
case 12: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(12) Период изменений и помощи другим. Этот период характеризуется событиями, которые вполне способны изменить ход жизни человека. И здесь нет никаких ограничений по тому, какими эти события могут быть - это может быть и неожиданная беременность и прорыв в творчестве, когда человек запишет новый трек и взорвёт все чарты и музыкальные каналы. А может, человек захочет освоить новую профессию и приступит к обучению. Так же это период характеризуется активной помощью людям, здесь может быть и участие в волонтёрских движениях, и участие в благотворительных фондах, да и просто разовые пожертвования на восстановление храма или культурных достопримечательностей.`;
yearsPanelItem.appendChild(paragraph);
break;
}
case 13: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(13) Период кардинальных изменений, когда можно и нужно перевернуть жизнь. Человек внутренне готов поменяться(он нарастил решительность, обрёл внутреннюю зрелость и способность использовать обстоятельства), а толчком к переменам станет неожиданный поворот судьбы. Не нужно смотреть на него сквозь призму недовольства, а воспользовавшись обстоятельствами, важно изменить к лучшему собственную жизнь. Здесь может быть и смена места работы, и смена сферы деятельности в целом, смена места жительства, рождение детей, смена образа жизни (например, человек перешёл на ЗОЖ, стал вегетарианцем, начал заниматься спортом и т.п.). Чтобы сделать шаг вперёд, потребуется разрушить общепринятые шаблоны и стереотипы, мешающие правила и устоявшиеся стандарты мышления. Произведя радикальные перемены в жизни, человек совершит внезапный и мощный рывок вперед.`;
yearsPanelItem.appendChild(paragraph);
break;
}
case 14: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(14) Очень позитивный период в жизни, когда на душе светло и счастливо. Состояние полного счастья, человек доволен своей жизнью. При этом совершенно неважно, что является источником такого состояния. Для кого-то это гармония в семье, для другого – интересная работа. Каждый человек в этот период будет счастлив по-своему.
<br>Этот период характеризуется отличным настроением, положительными эмоциями, совершенным спокойствием, умиротворением, оптимизмом, гармонией, уверенностью в себе, достижением поставленных целей. `;
yearsPanelItem.appendChild(paragraph);
break;
}
case 15: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(15) Период материального процветания. В этот период значительно улучшается материальное состояние, получаются сверхприбыли, выигрываются лотереи, отдаются долги, приобретаются новые материальные ценности, то есть деньги нескончаемым потоком идут в руки. Меняется положение в обществе, расширяются сферы влияния, зарабатывается авторитет. Прекрасный период, чтобы научиться не впадать в зависимость от материального, научиться жить умеренно и сдержанно, начать проявлять щедрость, усилить связь с Богом и с его помощью побороть пороки и зависимости.
`;
yearsPanelItem.appendChild(paragraph);
break;
}
case 16: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(16) Период внутренних изменений. В этот период происходит изменение восприятия реальности, меняются привычные взгляды на жизнь. ""Человек способен изменить свою жизнь, меняя всего лишь свою точку зрения"" (с) Дж. Вильямс. Это выражение как нельзя лучше описывает данный период жизни.
<br>В этот период человек не боится бросить вызов самому себе, например, путешествовать в одиночку, переехать в новую страну или избавиться от какой-то зависимости. Он отказывается от старых правил и устанавливает новые, которые устраивают именно его. Меняются приоритеты - то, что было интересно в прошлом году, уже не актуально сейчас. Человек начинает одеваться для комфорта, а не для того, чтобы произвести впечатление. Больше не покупает вещи, которые не нужны, только потому, что они модные.
<br>Жизнь больше не воспринимается, как чёрное и белое. Прекращается осуждение других людей, так как приходит понимание, что это их жизнь и их опыт. Человек понимает, что для него важно и сосредотачивается именно на этом. Не зацикливается и не зависит от соцсетей. Человек приходит к пониманию того, что сам несёт ответственность за свою жизнь и свою судьбу.`;
yearsPanelItem.appendChild(paragraph);
break;
}
case 17: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(17) Период реализации всех способностей человека. Человек становится востребованным, высокооплачиваемым и успешным,  развивается, совершенствуется, обходит всех конкурентов, начинает буквально блистать среди своих коллег. Он достигает небывалых высот, становится эффектным и ярким, его становится невозможно не заметить. Он в центре внимания, о нём говорят, к его мнению прислушиваются, на него хотят быть похожим, он становится примером для многих. Это период подъёма, роста, развития, прогресса. Обретается гармония с окружающим миром и со своим внутренним «Я». `;
yearsPanelItem.appendChild(paragraph);
break;
}
case 18: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(18) Период смены окружения. На смену пессимистам и токсичным людям придут успешные и позитивно настроенные. За счёт энергетического обмена с ними и поддержки с их стороны будет происходить совершенствование и развитие. Общение с ними принесёт неоспоримую пользу в достижении целей и улучшит качество жизни.
<br>В этот период также может произойти и смена мышления - с негативного на позитивное; либо же человек может уйти в творчество, стать ближе к искусству, увлечься модой. `;
yearsPanelItem.appendChild(paragraph);
break;
}
case 19: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(19) Период успеха и благоприятных изменений в жизни. Человек добивается поставленных перед собой целей, доволен всеми своими достижениями, морально удовлетворён своим положением в обществе. Здесь он может получить новую интересную и высокооплачиваемую работу, о которой давно мечтал. Либо же может получить более высокую должность там, где уже работает. В любом случае, это увеличение материального достатка и материальных благ, обретение финансовой свободы, процветание, повышение социального статуса.
<br>Человек становится способным вдохновлять и мотивировать окружающих, становится авторитетным лидером, способным заставить других следовать за ним. `;
yearsPanelItem.appendChild(paragraph);
break;
}
case 20: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(20) Благоприятный период, связанный с приятными хлопотами в семье либо же переездом в другую страну. В семье происходят события, которые сплачивают её членов, приносят радость и счастье. Например, рождение детей. Возможно, приезд родственников, с которыми очень давно не виделись. Либо появляется тот, кого считали пропавшим. Здесь же может случиться и переезд в другую страну, знакомство и брак с иностранцем, работа в другой стране, либо же просто путешествия.
<br>Могут открыться новые возможности в творчестве и работе, которые принесут популярность (работа на телевидении, блог эксперта, начало своего бизнеса).`;
yearsPanelItem.appendChild(paragraph);
break;
}
case 21: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(21) В первую очередь в этот период может произойти переезд. Это может быть переезд из одного жилья в другое, может быть переезд из одного города в другой, а может быть и переезд в другую страну. Но определённо меняется привычное место жительства. Также этот период может быть связан с появлением новых людей в окружении, новые встречи, знакомства, связи, новое общение. Жизнь меняется, выходит на иной уровень. Появляется новая работа, открываются новые возможности. В этот период происходит развитие в человеке уверенности в себе, в своих способностях, в своем потенциале и в важности своих действий и решений, чтобы положительно влиять на свою жизнь.
<br>Это период положительных изменений и движения вперёд. `;
yearsPanelItem.appendChild(paragraph);
break;
}
case 22: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(22) Период начала новой жизни, когда все переживания и проблемы остаются в старой. Человек открывает себя по-новому - у него повышается самооценка, обретается уверенность в себе и желание следить за своим внешним видом и физическим здоровьем, уходит страх перемен и напрасные переживания, у него появляется сильное желание развиваться и двигаться вперёд, проходит зависть к другим, разрываются токсичные отношения, человек начинает жить здесь и сейчас. Появляется новая работа, завязываются новые отношения, появляются новые увлечение. Это период всего нового и интересного. Это так же может быть очень активный и жизнерадостный период путешествий, поездок, встреч с друзьями, участия в больших общественных проектах. Человек в этот момент чувствует себя абсолютно свободным и способным на всё. Это так и есть. `;
yearsPanelItem.appendChild(paragraph);
break;
}}
const text2=document.createElement('p');
text2.innerHTML='В минусе';
text2.style.fontWeight='700';
yearsPanelItem.appendChild(text2);
switch (number2){
case 3: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(3) Тяжёлый период в отношениях и семейной жизни, подразумевающий начало проблем между мужчиной и женщиной. Уходят взаимопонимание и взаимоуважение, а на первый план выходят упрёки и недоверие, обиды и разочарование в партнёре, ссоры и унижения. Женщина может узнать о предательстве со стороны мужчины. В этот период она может остаться одна - отношения прекратятся, а брак рухнет. Женщина может разочароваться в любви, семейной жизни и мужчинах, появятся проблемы с самооценкой и принятием своей внешности, будет казаться, что всё хорошее осталось позади, а впереди лишь одиночество и пустота. У женщины могут возникнуть недопонимания и конфликты не только с мужчиной, но и с детьми, они могут отдалиться от неё, перестать нормально общаться и воспринимать как близкого человека. Здесь же может развиваться и ситуацию, когда женщина взваливает на свои плечи мужские обязанности, начинает выполнять в семье мужские функции, забывает о своём женском начале, становится категоричной, требовательной, агрессивной, грубой  то есть она забывает, что она женщина. `;
yearsPanelItem.appendChild(paragraph);
break;
}
case 4: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(4) Период фатальных ошибок и неудач, период, когда жизнь проверяет мужчину на прочность. Здесь проблемы могут идти одна за другой, а могут обрушиться сразу все - проблемы на работе, потеря источника дохода, предательство со стороны коллег и друзей, проблемы с физическим и психическим здоровьем, распад или кризис в семье. Это период, когда мужчина теряет уверенность в себе, оказывается неспособным обеспечить свою семью, теряет материальные блага(например, попал в аварию и сильно разбил автомобиль), теряет самого себя.В этот период как никогда важно наладить отношения с родителями, потому что эти отношения напрямую влияют на его жизнь. Например, если мужчина держит обиды на мать, то у него отсутствует желание заботиться о любой женщине. В этот период важно собраться, взять всю свою волю в кулак, прочувствовать всю силу своего духа и идти напролом вперёд, не останавливаясь из-за неудач. `;
yearsPanelItem.appendChild(paragraph);
break;
}
case 5: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(5) Период крупных и мелких неудач. Могут возникнуть проблемы с законом, проблемы в семье - с мужем, с детьми, разладятся отношения с родителями или другими родственниками, всплывут какие-то ошибки на работе (например, во время проверки или ревизии). Будет казаться, что всё рушится. Глобально ничего трагического не произойдёт, но череда не совсем приятных инцидентов изрядно попортит нервы. Важно будет не впадать в панику, с холодной головой посмотреть на происходящее и твёрдой рукой навести порядок во всём - дома, на работе, в отношениях с другими людьми. Важно начать жить по правилам и следовать определённому порядку, не бежать впереди паровоза, не поучать других, не брать на себя много, не врать, не жить двойными стандартами. Также большое значение имеет отношение с родителями, а в особенности, с отцом. Важно принять его таким, какой он есть, простить все обиды и открыть своё сердце для любви к нему. `;
yearsPanelItem.appendChild(paragraph);
break;
}
case 6: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(6) Неблагоприятный период, во время которого любимый человек может предать или совершить подлость; может изменить, сильно обидеть, не посчитаться с интересами и желаниями или же применить физическую силу; может ударить в самое больное место, не щадя главных ценностей и важных для человека моральных устоев. Во время этого периода очень часто происходят прекращения отношений и разводы.
<br>Этот период также характеризуется отсутствием положительных эмоций, отсутствием желания любить и ухаживать за собой, потерей гармонии в жизни. В этот период жизненно важно следить за своим здоровьем, особенно за здоровьем сердечно-сосудистой системы.
<br>Здесь же человек может оказаться перед трудным выбором, будет трудно принять решение, сделать шаг в ту или иную сторону.
<br>В целом, это позитивная энергия дружбы, открытости и любви. Но чтобы обрести эту дружбу и любовь сначала предстоит пройти через предательства и разочарования, невозможно прийти к плюсу, не пройдя через минус. Здесь главное не закрывать глаза на эти предательства, не прятать голову в песок, делая вид, что всё хорошо, принять факт негатива в свою сторону, прожить это и тогда жизнь страну станет уходить в плюс.`;
yearsPanelItem.appendChild(paragraph);
break;
}
case 7: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(7) Крайне неблагоприятный период болезней и неудач. Период, когда совершаются ошибки, принимаются неверные решения, теряется работа и уважение людей, преследуют поражения, предательства, появляются долги. Может произойти разрыв отношений с любимым человеком. В этот период можно стать жертвой насмешки, оскорбления и позора. `;
yearsPanelItem.appendChild(paragraph);
break;
}
case 8: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(8) Период несправедливости, обмана и предательства. В этот период так же возможны противозаконные действия в Ваш адрес. Почва уходит из-под ног, нарушается стабильность и привычный образ жизни, друзья предают, любимые люди изменяют, коллеги подставляют. В этот период, главное всё это принять и переждать, а не вступать в борьбу с ветряными мельницами. Если же вы начнёте вступать в противостояние, взывать к справедливости, то только усугубите ситуацию и получите удары пострашнее тех неприятностей, которые уже произошли. Только смирение и холодная голова смогут выравнить ситуацию и обернуть минус в плюс. Воспринимайте все проблемы как испытания. Если испытания пройдены с достоинством, то жизнь возвращается в привычное русло. Если же в этих испытаниях Вы потеряли своё лицо и себя, то они продолжатся и обрушатся на Вас с новой силой. `;
yearsPanelItem.appendChild(paragraph);
break;
}
case 9: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(9) Период болезней и одиночества. Начинаются проблемы с физическим здоровьем и здесь важно не пропустить момент, не запустить болезнь, а предпринять все меры для выздоровления. Также в этот период человек может остаться один на один со своими бедами, может остаться без работы, может лишиться семьи и поддержки родственников, может прекратить общения с друзьями. Главное, в этот период не уйти полностью в себя и не закрыться полностью от этого мира. `;
yearsPanelItem.appendChild(paragraph);
break;
}
case 10: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(10) Отчётливая чёрная полоса в жизни. Всё валится из рук, деньги утекают как вода, предают близкие люди, не везёт ни в чем. Даже в самых незначительных бытовых мелочах происходят всякие катаклизмы и неурядицы. Создаётся ощущение, что в один день кто-то пришёл и забрал удачу. Появляется разочарование в окружающем мире и себе, агрессивность к другим людям, неуверенность в своих силах, обида на весь мир, чувство опустошенности. Также в этот период может появиться плохое окружение, которое будет оказывать значительное негативное влияние, что, в свою очередь, ещё более затянет в вопреки неудач. `;
yearsPanelItem.appendChild(paragraph);
break;
}
case 11: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(11) Период работы на износ, физическое и моральное истощение, сильное эмоциональное выгорание, упадок сил, потеря мотивации, опустошение. Сильное разочарования в себе и своих силах, поскольку работа не приносит того результата, который хотелось бы. Работаешь и всё в пустую. На этой почве начинаются проблемы в семье, ссоры, обиды, непонимание, взаимные упрёки, проявляются негативные эмоции. Либо наоборот работа приносит результат, но всё время хочется больше - больше денег, больше недвижимости, больше власти. Человек всё больше и больше рвётся, именно уже рвётся, а не работает. Без отдыха, без расслабления. И загоняет себя в такую ситуацию, когда все заработанные блага не приносят удовольствия , так как усталость перекрывает  все остальные эмоции. При этом тоже начинаются проблемы в семье, поскольку семья его просто не видит. Нужно остановиться, вдохнуть-выдохнуть, понять, что есть вещи важнее материальных благ и что все деньги заработать невозможно. `;
yearsPanelItem.appendChild(paragraph);
break;
}
case 12: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(12) Очень несчастливый период, в который с человеком могут происходить различные несчастные случаи, наносящие существенный вред здоровью. Это могут быть и ДТП, и разного рода травмы - переломы, ожоги, отравления. Может даже случиться замершая беременность.
<br>Здесь же могут быть и ситуации, которые негативно влияют на эмоциональное состояние. Например, несправедливое отношение, оскорбления, предательства, обман. В этот период человек может попасть в отношения, в которых он будет выступать в роли жертвы, будет страдать морально, теперь унижения и манипуляции со стороны другого человека. Это могут быть и личные отношения, когда человек попадает в зависимость от своего избранника. Это могут быть и рабочие ситуации, при которых человек выполняет роль бесплатной рабочей силы для своего начальника.
<br>Также этот период может быть периодом застоя, когда человек закрывается от всего нового, боится перемен и отказывается двигаться вперёд. `;
yearsPanelItem.appendChild(paragraph);
break;
}
case 13: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(13) Достаточно тяжёлый период в жизни. Могут случиться болезненные потери и изменения, которые оставят далеко в прошлом привычную налаженную жизнь. Здесь можно столкнуться со смертью кого-то из близких людей и с этим человеком уйдёт и часть души, и часть жизни. Либо же могут произойти изменения, которые оставят лишь в воспоминаниях какие-то тёплые и душевные моменты в жизни. Например, продажа родительского дома и как следствие невозможно будет приехать туда, где прошло счастливое детство и где родители были молоды и здоровы.
<br>В этот период может настигнуть и внутренний кризис, когда приходит осознание, что нет особых достижений и жизнь могла бы сложиться намного лучше, кажется, что уже достигнут ""потолок"" и больше не будет изменений к лучшему. Человек сталкивается с апатией, упадком сил, нежеланием вообще что-либо делать. Нет сил принять те изменения, которые преподносит жизнь. Резко падает самооценка, появляется огромное количество комплексов, ощущение беспомощности. Кажется, что никто не понимает, навязчивое чувство одиночества приводит к депрессии. Происходит переоценка взглядов и все, что раньше было важно, теряет ценность. Происходит эмоциональное выгорание и нарушается психическое здоровье. Важно понимать, что всё, что происходит, это не конец жизни, а переход на другой, более качественный уровень, не нужно замыкаться в себе и следует начать смотреть на действительность под другим углом.`;
yearsPanelItem.appendChild(paragraph);
break;
}
case 14: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(14) Период, когда душа болит, а сердце плачет. В этот период человек может испытывать глубокие внутренние страдания, на душе катастрофически плохо. Часто это бывает вызвано развитием малоприятных событий, которые нарушают не только привычный уклад жизни, но и меняют взгляды на жизнь, опустошая при этом внутренний ресурс. В этот период ничего не мило, злят привычные вещи, нет желания ни с кем общаться.  Зачастую душевные переживания настигают человека, когда его личные представления не совпадают с тем, что происходит в реальной жизни и тогда человек попросту испытывает разочарование в этой жизни. Здесь может быть предательство любимого человека, или его смерть, когда душа разрывается от боли. Человек может начать глушить эту боль посредством алкоголя или запрещённых веществ, тем самым наносит ещё бОльший вред своей душе. `;
yearsPanelItem.appendChild(paragraph);
break;
}
case 15: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(15) Неблагоприятный период, когда тёмная сторона души человека может дать о себе знать. Проявляются такие качества как гнев, зависть, лживость, ревность, тщеславие, эмоциональная зависимость и так далее. Человек может начать нарушать закон, занимаясь мошенничеством и воровством, ведь им движет непреодолимая тяга к деньгам. Здесь же могут появиться и различного рода зависимости - алкогольная, наркотическая, игровая. Человек может находиться в состоянии какой-то нездоровой эйфории и не может отказать себе ни в чем, так теряются большие суммы денег, начинаются долги. Чтобы покрыть долги человек впутывается в новые и новые аферы, получает деньги, снова их прогуливает, снова аферы и так по кругу. `;
yearsPanelItem.appendChild(paragraph);
break;
}
case 16: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(16) Период регресса в жизни. Может произойти моральная деградация - человек откажется от тех моральных ценностей, которыми жил раньше, в угоду сомнительных удовольствий; его захватят негативные эмоции и качества(злость, зависть, агрессия, лицемерие, подлость). Этот период разрушения души и тела, отношений и карьеры, вся жизнь идёт под откос. Человек может остаться ни с чем. В этот период самое главное, не углубляться в темноту, суметь остановиться, достойно пройти испытания и тогда судьба сжалится. Если же человек полностью погрузится в темноту, то выйти из неё будет очень сложно, а иногда и невозможно.`;
yearsPanelItem.appendChild(paragraph);
break;
}
case 17: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(17) Это период спада, который характеризуется состоянием подавленности и опустошения, мрачными настроениями,  унынием и тоской. У человека снижаются общительность и активность, повышается ипохондричность (преувеличение проблем со здоровьем) и мнительность, возникают неудовлетворенность текущими событиями и собой, пессимизм и скептическое отношение ко всему. Человек не может себя реализовать, сидит и сожалеет об упущенных возможностях, вспоминает прежние переломные моменты в жизни, «пережевывает» собственные неудачи. Накрывает состояние безысходности и бесполезности. `;
yearsPanelItem.appendChild(paragraph);
break;
}
case 18: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(18) Период нахождения под влиянием плохого окружения. Это могут быть люди, которые постоянно генерируют негатив, независимо от внешних обстоятельств. Они всегда всем недовольны, им всегда все должны и все вокруг во всем виноваты. Это могут быть и обычные пессимисты, которые не могут справляться с событиями в своей жизни и сеют панику вокруг себя. Это могут быть и по-настоящему озлобленные люди, которые искренне ненавидят весь мир. А могут быть алкоголики и наркоманы. В любом случае, они излучают негативную энергетику, которая влияет на тех, кто находится с ними рядом. Начинаются проблемы со здоровьем, время тратится впустую, не получается радоваться жизни, нет движения вперёд, превращается развитие, снижается качество жизни.
<br>Также в этот период человек подвластен сглазам и порчам, потому как подобное притягивает подобное. Человек окружён негативной энергетикой и ей притягивает всё нехорошее. `;
yearsPanelItem.appendChild(paragraph);
break;
}
case 19: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(19) Неблагоприятный период, характеризующийся наплывом разного рода проблем: на работе, в семье, со здоровьем. Могут возникнуть большие денежные трудности, долги, большие непредвиденные расходы. Человек теряет своё прежнее положение в обществе, теряет авторитет и уважение, становится уязвимым для мнения окружающих, закрывается от людей, уходит в одиночеству. Если человек не впадает в панику, не начинает жить страхами(страх бедности, одиночества, непонимания), то этот период быстро проходит. Но если же страхи начинают есть его изнутри, то период может затянуться и закончиться непредсказуемо. `;
yearsPanelItem.appendChild(paragraph);
break;
}
case 20: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(20) Очень тяжёлый период, во время которого испытания суждено пройти не только человеку, но и его семье. Это может быть и тяжёлая болезнь кого-то из родственников, а может быть и смерть. Либо же могут возникать серьёзные конфликты и ссоры внутри семьи, непонимание, упрёки, обиды, оскорбления. В этот период семья по каким-то причинам может отвернуться, отказаться, лишить поддержки и человек останется один, его исключат из рода. В этот период и сам человек может оказаться между жизнью и смертью (болезнь, ДТП, тяжёлая травма). В этот период вся плохая карма рода проявляется и человеку предстоит её проработать. В этот день период человек не может реализовать свои планы, случаются неприятности, которые не дают ему идти вперёд. `;
yearsPanelItem.appendChild(paragraph);
break;
}
case 21: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(21) Этот период характеризуется трудными и болезненными для человека изменениями, которые он не хочет или не может принять, но вынужден это делать, так как именно так складываются обстоятельства, приходится переступать через себя, преодолевать, смириться. Человек выходит из зоны комфорта, где чувствовал себя относительно уверенно и спокойно. Это может быть понижение на работе, сокращение, потеря работы, вынужденный переезд в другой город, разрыв отношений и т.п.
<br>Если человек в душе примет все эти изменения, то жизнь быстро наладится. Если же он начнёт сопротивляться, воевать, ругать эту жизнь, то период может значительно затянуться. Нужно бороться с недовольством, быть благодарным за всё, что имеешь, быть открытым для этого мира и Бога, открытым для любви. `;
yearsPanelItem.appendChild(paragraph);
break;
}
case 22: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(22) Период ограничений и рамок. Ярко проявляются все негативные установки и представления о себе, которые препятствуют развитию и движению вперёд. ""Я не умею ладить с людьми"", ""У меня совсем нет способностей к бизнесу/пению/иностранным языкам"", ""Мне не дано…"", ""У меня ничего не получится"" и так далее. И исходя из этих убеждений строится жизнь. В этот же период человек может стать заложником каких-то обстоятельств, попасть в ситуацию, из которые кажется, что нет выхода, у человека может отсутствовать право выбора. То есть человек оказывается несвободным и неспособным действовать так, как ему хотелось бы.
<br>Может быть и совершенно негативная ситуация, когда человек попадает в места лишения свободы или на лечение(когда эта энергия в минусе, может открыться шизофрения или иные психические расстройства, требующие помещение человека в специальные учреждения). `;
yearsPanelItem.appendChild(paragraph);
break;
}}
}
if(gender==='Ж'){
const text=document.createElement('p');
text.innerHTML='В плюсе';
text.style.fontWeight='700';
yearsPanelItem.appendChild(text);
switch (number2){
case 3: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(3) Раскрытие женского предназначения и женского потенциала. Если Вы одиноки, то Вам предстоит встреча со своей второй половинкой, начнутся отношения. Если Вы уже в отношениях, то Вас ожидает развитие отношений, вступление в брак, красивая свадьба. Если Вы уже в браке, то обретёте гармонию, мир и спокойствие в семье, откроете для себя новые грани семейное жизни, обретёте взаимопонимание в случае его отсутствия, то есть Ваша семейная жизнь заиграет новыми красками. Это период, когда Вы прислушаетесь к своей женской природе и не пойдёте против неё, откроете для себя счастье материнства или хранительницы очага, создадите неповторимый уют и тепло в доме, станете первоклассной хозяйкой, понимающей и заботливой матерью, любящей и заботливой женой. Поймёте и примите всю себя такой, какая Вы есть. Начнёте вдохновлять и станете музой для противоположного пола. Станете спокойной, сбалансированный и гармоничной. Станете Женщиной во всех её проявлениях. Сумеете грамотно сочетать работу и дом. Возможно, повышение на работе, открытие своего бизнеса, увеличение дохода, расширение сфер своего влияния. `;
yearsPanelItem.appendChild(paragraph);
break;
}
case 4: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(4) Неплохой период, в который женщина может обрести крепкое мужское плечо. Если женщина ещё не в отношениях, то встретит мужчину. Если же она в отношениях, то вполне вероятна смена партнёра. В обоих случаях женщине необходимо принять патриархальный тип отношений, при котором он - добытчик, а она - хранительница очага; стать для него музой, вдохновляющей его на подвиги, а он в ответ будет боготворить её. При таком типе отношений нет сомнений в силе, авторитете и последнем слове мужчины, нет места не уважительному отношению к нему, упрёкам, требованиям, контролю. Это отличный период для замужества. Также в этот период возможно продвижение на работе, благодаря протекции мужчины. Либо же женщина встретит свой идеал в лице мужчины-начальника и обретёт его покровительство, которое поможет ей исполнить давние желания и достичь целей, которые она не могла достичь в одиночку.`;
yearsPanelItem.appendChild(paragraph);
break;
}
case 5: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(5) Период приятной бумажной волокиты - оформление каких-то важных документов, которые до этого долго не было возможности оформить, официальное оформление отношений, рождение детей и получение на них всех необходимых документов (свидетельство о рождении, полис, СНИЛС, оформление выплат и пособий, материнского капитала), разрешение споров в суде. Часто бывает, что всё перечисленное идёт вместе или быстро друг за другом с малыми промежутками во времени. В любом случае это хороший период, когда жизнь упорядочивается, жизнь обретает смысл и систему, всё в ней происходит поэтапно, всё налаживается.
<br>Также в этот период открываются двери для получения нового образования, продвижения на службе, обретения уважения и новых сфер влияния. `;
yearsPanelItem.appendChild(paragraph);
break;
}
case 6: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(6) Прекрасный период влюблённости, любви и проявления любых тёплых чувств. В этот период сердце замирает, наполняясь любовью, и бабочки летают в животе. Время романтики, цветов, подарков, праздничных мероприятий. В такие периоды случаются свадьбы, помолвки, а также любые другие мероприятия, участниками и организаторами которых выступают влюблённые люди, готовые дарить радость всем вокруг.
<br>Также это период активной общественной деятельности, бурного дружеского общения, весёлых вечеринок до утра.
<br>Это отличный период, чтобы начать жить в гармонии с собой, принять и полюбить себя, осознать свою ценность и значимость, заняться любимым делом, окружить себя красотой, создать уют в доме, заняться своей внешностью и обновить гардероб, добавив в него новые красивые и интересные вещи.
<br>В целом, это позитивная энергия дружбы, открытости и любви. Но чтобы обрести эту дружбу и любовь сначала предстоит пройти через предательства и разочарования, невозможно прийти к плюсу, не пройдя через минус. Здесь главное не закрывать глаза на эти предательства, не прятать голову в песок, делая вид, что всё хорошо, принять факт негатива в свою сторону, прожить это и тогда жизнь страну станет уходить в плюс.`;
yearsPanelItem.appendChild(paragraph);
break;
}
case 7: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(7) Благоприятный период маленьких и больших побед, успехов и достижений. Женщина может выйти замуж, и непременно очень удачно. Может пойти вверх по карьерной лестнице. Может исполнить любые давно загаданные желания. `;
yearsPanelItem.appendChild(paragraph);
break;
}
case 8: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(8) Период стабильности и размерности. Жизнь сложилась, есть почва под ногами, быт налажен. Период, когда воздаётся по заслугам, когда получают награды за свои труды, когда разрешаются давние споры и конфликты, период, когда всё налаживается. Здесь возможно документальное оформление каких-то событий, например, получение гражданства или визы, разрешений на что-то. Возможно приобретение недвижимости или других крупных покупок, требующих оформления. `;
yearsPanelItem.appendChild(paragraph);
break;
}
case 9: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(9) Период развития - интеллектуального и духовного. Период получения качественной информации извне, период изучения культуры и искусства, период определения, осмысливая и осознания происходящих вокруг событий,  период формирования нравственных идеалов и ценностей. Период анализа и познания этого мира. Период наполнения своего внутреннего мира всё новой и новой информацией, общаясь, учась, читая, смотря, слушая. Чем больше человек думает, тем лучше и эффективнее работает его мышление. В этот период надо стараться перерабатывать всю информацию, поступившую к Вам. Всё осмысливать, анализировать, сравнивать, делать выводы. То есть, применять все возможные мыслительные процессы. Этот период прекрасно подходит для развития воображения. Самый эффективный способ - мечтать и фантазировать. То есть, воображать все возможные и невозможные варианты развития событий. Но самый простой способ развития воображения - это чтение. Когда человек читает, он представляет то, о чём прочитал. То есть это период, когда человек наполняет свой внутренний мир и получает новые знания. В этот же период человек может начать делиться своими знаниями с другими, обрести единомышленников, сформировать узкий круг своих последователей.
<br>Для женщин этот период может означать беременность, так как во время неё женщина начинает неосознанно глубже смотреть на многие вещи, закрывается в своём собственном мире, начинает иначе воспринимать этот мир. `;
yearsPanelItem.appendChild(paragraph);
break;
}
case 10: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(10) Период чудесных радостных событий и удачных поворотов судьбы. Период, когда человек будет удачливым во всём, ему будет сопутствовать везение. Он будет легко добиваться в жизни всего, быстро достигнет желаемого, сможет избежать серьёзных опасностей и трудностей, выйдет из любых сложных жизненных ситуаций. И для всего этого ему не нужно будет прилагать больших усилий, всё уже предрешено высшими силами. Так же это период может ознаменоваться интересными путешествиями, новыми знакомствами с приятными людьми, морем положительных эмоций и незабываемых впечатлений. `;
yearsPanelItem.appendChild(paragraph);
break;
}
case 11: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(11) Очень продуктивный и активный период в жизни, когда получаешь несоизмеримо хорошую отдачу на приложенные усилия. Сила и энергия бьют через край, человек чувствует, что может свернуть горы. Всё получается. Любая работа даётся легко, в короткие сроки выполняются большие объёмы. Если речь идёт о бизнесе, то он стремительно развивается и масштабируется. Это могут быть и колоссальные творческие успехи и приличные спортивные результаты.
<br>Для женщины - это может быть и беременность. `;
yearsPanelItem.appendChild(paragraph);
break;
}
case 12: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(12) Период изменений и помощи другим. Этот период характеризуется событиями, которые вполне способны изменить ход жизни человека. И здесь нет никаких ограничений по тому, какими эти события могут быть - это может быть и неожиданная беременность и прорыв в творчестве, когда человек запишет новый трек и взорвёт все чарты и музыкальные каналы. А может, человек захочет освоить новую профессию и приступит к обучению. Так же это период характеризуется активной помощью людям, здесь может быть и участие в волонтёрских движениях, и участие в благотворительных фондах, да и просто разовые пожертвования на восстановление храма или культурных достопримечательностей.`;
yearsPanelItem.appendChild(paragraph);
break;
}
case 13: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(13) Период кардинальных изменений, когда можно и нужно перевернуть жизнь. Человек внутренне готов поменяться(он нарастил решительность, обрёл внутреннюю зрелость и способность использовать обстоятельства), а толчком к переменам станет неожиданный поворот судьбы. Не нужно смотреть на него сквозь призму недовольства, а воспользовавшись обстоятельствами, важно изменить к лучшему собственную жизнь. Здесь может быть и смена места работы, и смена сферы деятельности в целом, смена места жительства, рождение детей, смена образа жизни (например, человек перешёл на ЗОЖ, стал вегетарианцем, начал заниматься спортом и т.п.). Чтобы сделать шаг вперёд, потребуется разрушить общепринятые шаблоны и стереотипы, мешающие правила и устоявшиеся стандарты мышления. Произведя радикальные перемены в жизни, человек совершит внезапный и мощный рывок вперед.`;
yearsPanelItem.appendChild(paragraph);
break;
}
case 14: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(14) Очень позитивный период в жизни, когда на душе светло и счастливо. Состояние полного счастья, человек доволен своей жизнью. При этом совершенно неважно, что является источником такого состояния. Для кого-то это гармония в семье, для другого – интересная работа. Каждый человек в этот период будет счастлив по-своему.
<br>Этот период характеризуется отличным настроением, положительными эмоциями, совершенным спокойствием, умиротворением, оптимизмом, гармонией, уверенностью в себе, достижением поставленных целей. `;
yearsPanelItem.appendChild(paragraph);
break;
}
case 15: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(15) Период материального процветания. В этот период значительно улучшается материальное состояние, получаются сверхприбыли, выигрываются лотереи, отдаются долги, приобретаются новые материальные ценности, то есть деньги нескончаемым потоком идут в руки. Меняется положение в обществе, расширяются сферы влияния, зарабатывается авторитет. Прекрасный период, чтобы научиться не впадать в зависимость от материального, научиться жить умеренно и сдержанно, начать проявлять щедрость, усилить связь с Богом и с его помощью побороть пороки и зависимости.
`;
yearsPanelItem.appendChild(paragraph);
break;
}
case 16: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(16) Период внутренних изменений. В этот период происходит изменение восприятия реальности, меняются привычные взгляды на жизнь. ""Человек способен изменить свою жизнь, меняя всего лишь свою точку зрения"" (с) Дж. Вильямс. Это выражение как нельзя лучше описывает данный период жизни.
<br>В этот период человек не боится бросить вызов самому себе, например, путешествовать в одиночку, переехать в новую страну или избавиться от какой-то зависимости. Он отказывается от старых правил и устанавливает новые, которые устраивают именно его. Меняются приоритеты - то, что было интересно в прошлом году, уже не актуально сейчас. Человек начинает одеваться для комфорта, а не для того, чтобы произвести впечатление. Больше не покупает вещи, которые не нужны, только потому, что они модные.
<br>Жизнь больше не воспринимается, как чёрное и белое. Прекращается осуждение других людей, так как приходит понимание, что это их жизнь и их опыт. Человек понимает, что для него важно и сосредотачивается именно на этом. Не зацикливается и не зависит от соцсетей. Человек приходит к пониманию того, что сам несёт ответственность за свою жизнь и свою судьбу.`;
yearsPanelItem.appendChild(paragraph);
break;
}
case 17: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(17) Период реализации всех способностей человека. Человек становится востребованным, высокооплачиваемым и успешным,  развивается, совершенствуется, обходит всех конкурентов, начинает буквально блистать среди своих коллег. Он достигает небывалых высот, становится эффектным и ярким, его становится невозможно не заметить. Он в центре внимания, о нём говорят, к его мнению прислушиваются, на него хотят быть похожим, он становится примером для многих. Это период подъёма, роста, развития, прогресса. Обретается гармония с окружающим миром и со своим внутренним «Я». `;
yearsPanelItem.appendChild(paragraph);
break;
}
case 18: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(18) Период смены окружения. На смену пессимистам и токсичным людям придут успешные и позитивно настроенные. За счёт энергетического обмена с ними и поддержки с их стороны будет происходить совершенствование и развитие. Общение с ними принесёт неоспоримую пользу в достижении целей и улучшит качество жизни.
<br>В этот период также может произойти и смена мышления - с негативного на позитивное; либо же человек может уйти в творчество, стать ближе к искусству, увлечься модой. `;
yearsPanelItem.appendChild(paragraph);
break;
}
case 19: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(19) Период успеха и благоприятных изменений в жизни. Человек добивается поставленных перед собой целей, доволен всеми своими достижениями, морально удовлетворён своим положением в обществе. Здесь он может получить новую интересную и высокооплачиваемую работу, о которой давно мечтал. Либо же может получить более высокую должность там, где уже работает. В любом случае, это увеличение материального достатка и материальных благ, обретение финансовой свободы, процветание, повышение социального статуса.
<br>Человек становится способным вдохновлять и мотивировать окружающих, становится авторитетным лидером, способным заставить других следовать за ним. `;
yearsPanelItem.appendChild(paragraph);
break;
}
case 20: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(20) Благоприятный период, связанный с приятными хлопотами в семье либо же переездом в другую страну. В семье происходят события, которые сплачивают её членов, приносят радость и счастье. Например, рождение детей. Возможно, приезд родственников, с которыми очень давно не виделись. Либо появляется тот, кого считали пропавшим. Здесь же может случиться и переезд в другую страну, знакомство и брак с иностранцем, работа в другой стране, либо же просто путешествия.
<br>Могут открыться новые возможности в творчестве и работе, которые принесут популярность (работа на телевидении, блог эксперта, начало своего бизнеса).`;
yearsPanelItem.appendChild(paragraph);
break;
}
case 21: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(21) В первую очередь в этот период может произойти переезд. Это может быть переезд из одного жилья в другое, может быть переезд из одного города в другой, а может быть и переезд в другую страну. Но определённо меняется привычное место жительства. Также этот период может быть связан с появлением новых людей в окружении, новые встречи, знакомства, связи, новое общение. Жизнь меняется, выходит на иной уровень. Появляется новая работа, открываются новые возможности. В этот период происходит развитие в человеке уверенности в себе, в своих способностях, в своем потенциале и в важности своих действий и решений, чтобы положительно влиять на свою жизнь.
<br>Это период положительных изменений и движения вперёд. `;
yearsPanelItem.appendChild(paragraph);
break;
}
case 22: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(22) Период начала новой жизни, когда все переживания и проблемы остаются в старой. Человек открывает себя по-новому - у него повышается самооценка, обретается уверенность в себе и желание следить за своим внешним видом и физическим здоровьем, уходит страх перемен и напрасные переживания, у него появляется сильное желание развиваться и двигаться вперёд, проходит зависть к другим, разрываются токсичные отношения, человек начинает жить здесь и сейчас. Появляется новая работа, завязываются новые отношения, появляются новые увлечение. Это период всего нового и интересного. Это так же может быть очень активный и жизнерадостный период путешествий, поездок, встреч с друзьями, участия в больших общественных проектах. Человек в этот момент чувствует себя абсолютно свободным и способным на всё. Это так и есть. `;
yearsPanelItem.appendChild(paragraph);
break;
}}
const text2=document.createElement('p');
text2.innerHTML='В минусе';
text2.style.fontWeight='700';
yearsPanelItem.appendChild(text2);
switch (number2){
case 3: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(3) Тяжёлый период в отношениях и семейной жизни, подразумевающий начало проблем между мужчиной и женщиной. Уходят взаимопонимание и взаимоуважение, а на первый план выходят упрёки и недоверие, обиды и разочарование в партнёре, ссоры и унижения. Женщина может узнать о предательстве со стороны мужчины. В этот период она может остаться одна - отношения прекратятся, а брак рухнет. Женщина может разочароваться в любви, семейной жизни и мужчинах, появятся проблемы с самооценкой и принятием своей внешности, будет казаться, что всё хорошее осталось позади, а впереди лишь одиночество и пустота. У женщины могут возникнуть недопонимания и конфликты не только с мужчиной, но и с детьми, они могут отдалиться от неё, перестать нормально общаться и воспринимать как близкого человека. Здесь же может развиваться и ситуацию, когда женщина взваливает на свои плечи мужские обязанности, начинает выполнять в семье мужские функции, забывает о своём женском начале, становится категоричной, требовательной, агрессивной, грубой  то есть она забывает, что она женщина. `;
yearsPanelItem.appendChild(paragraph);
break;
}
case 4: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(4) Период, когда женщина остаётся без мужской поддержки. Здесь может быть и то, что мужчина в прямом смысле уходит и оставляет женщину одну. Либо же он начинает вести двойную жизнь, изменяя ей. Либо же мужчина номинально есть, но не может стать опорой для женщины, поскольку является слишком мягкотелым, слабохарактерным, безответственным, у него отсутствуют цели и какие-либо амбиции, он не может материально обеспечить женщину, позаботиться о ней и детях. Либо женщина вступает в отношения с мужчиной, но при этом не может открыто рассказать о нём, поскольку он, к примеру, женат, либо занимает какую-то должность и связь с ней может скомпрометировать его. В этот период женщине важно не терять связь с отцом, при проблемах в общении с ним, постараться их устранить, простить обиды и начать общаться с ним, как с одним из самых близких людей.
<br>Также несмотря на все трудности в отношениях с мужчинами, женщине в этот период важно не потерять уважение и доверие к мужскому полу, не потерять своё женское начало, не исключать возможность счастливых и гармоничных отношений с мужчинами. `;
yearsPanelItem.appendChild(paragraph);
break;
}
case 5: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(5) Период крупных и мелких неудач. Могут возникнуть проблемы с законом, проблемы в семье - с мужем, с детьми, разладятся отношения с родителями или другими родственниками, всплывут какие-то ошибки на работе (например, во время проверки или ревизии). Будет казаться, что всё рушится. Глобально ничего трагического не произойдёт, но череда не совсем приятных инцидентов изрядно попортит нервы. Важно будет не впадать в панику, с холодной головой посмотреть на происходящее и твёрдой рукой навести порядок во всём - дома, на работе, в отношениях с другими людьми. Важно начать жить по правилам и следовать определённому порядку, не бежать впереди паровоза, не поучать других, не брать на себя много, не врать, не жить двойными стандартами. Также большое значение имеет отношение с родителями, а в особенности, с отцом. Важно принять его таким, какой он есть, простить все обиды и открыть своё сердце для любви к нему. `;
yearsPanelItem.appendChild(paragraph);
break;
}
case 6: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(6) Неблагоприятный период, во время которого любимый человек может предать или совершить подлость; может изменить, сильно обидеть, не посчитаться с интересами и желаниями или же применить физическую силу; может ударить в самое больное место, не щадя главных ценностей и важных для человека моральных устоев. Во время этого периода очень часто происходят прекращения отношений и разводы.
<br>Этот период также характеризуется отсутствием положительных эмоций, отсутствием желания любить и ухаживать за собой, потерей гармонии в жизни. В этот период жизненно важно следить за своим здоровьем, особенно за здоровьем сердечно-сосудистой системы.
<br>Здесь же человек может оказаться перед трудным выбором, будет трудно принять решение, сделать шаг в ту или иную сторону.
<br>В целом, это позитивная энергия дружбы, открытости и любви. Но чтобы обрести эту дружбу и любовь сначала предстоит пройти через предательства и разочарования, невозможно прийти к плюсу, не пройдя через минус. Здесь главное не закрывать глаза на эти предательства, не прятать голову в песок, делая вид, что всё хорошо, принять факт негатива в свою сторону, прожить это и тогда жизнь страну станет уходить в плюс.`;
yearsPanelItem.appendChild(paragraph);
break;
}
case 7: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(7) Крайне неблагоприятный период болезней и неудач. Период, когда совершаются ошибки, принимаются неверные решения, теряется работа и уважение людей, преследуют поражения, предательства, появляются долги. Может произойти разрыв отношений с любимым человеком. В этот период можно стать жертвой насмешки, оскорбления и позора. `;
yearsPanelItem.appendChild(paragraph);
break;
}
case 8: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(8) Период несправедливости, обмана и предательства. В этот период так же возможны противозаконные действия в Ваш адрес. Почва уходит из-под ног, нарушается стабильность и привычный образ жизни, друзья предают, любимые люди изменяют, коллеги подставляют. В этот период, главное всё это принять и переждать, а не вступать в борьбу с ветряными мельницами. Если же вы начнёте вступать в противостояние, взывать к справедливости, то только усугубите ситуацию и получите удары пострашнее тех неприятностей, которые уже произошли. Только смирение и холодная голова смогут выравнить ситуацию и обернуть минус в плюс. Воспринимайте все проблемы как испытания. Если испытания пройдены с достоинством, то жизнь возвращается в привычное русло. Если же в этих испытаниях Вы потеряли своё лицо и себя, то они продолжатся и обрушатся на Вас с новой силой. `;
yearsPanelItem.appendChild(paragraph);
break;
}
case 9: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(9) Период болезней и одиночества. Начинаются проблемы с физическим здоровьем и здесь важно не пропустить момент, не запустить болезнь, а предпринять все меры для выздоровления. Также в этот период человек может остаться один на один со своими бедами, может остаться без работы, может лишиться семьи и поддержки родственников, может прекратить общения с друзьями. Главное, в этот период не уйти полностью в себя и не закрыться полностью от этого мира.
`;
yearsPanelItem.appendChild(paragraph);
break;
}
case 10: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(10) Отчётливая чёрная полоса в жизни. Всё валится из рук, деньги утекают как вода, предают близкие люди, не везёт ни в чем. Даже в самых незначительных бытовых мелочах происходят всякие катаклизмы и неурядицы. Создаётся ощущение, что в один день кто-то пришёл и забрал удачу. Появляется разочарование в окружающем мире и себе, агрессивность к другим людям, неуверенность в своих силах, обида на весь мир, чувство опустошенности. Также в этот период может появиться плохое окружение, которое будет оказывать значительное негативное влияние, что, в свою очередь, ещё более затянет в вопреки неудач. `;
yearsPanelItem.appendChild(paragraph);
break;
}
case 11: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(11) Период работы на износ, физическое и моральное истощение, сильное эмоциональное выгорание, упадок сил, потеря мотивации, опустошение. Сильное разочарования в себе и своих силах, поскольку работа не приносит того результата, который хотелось бы. Работаешь и всё в пустую. На этой почве начинаются проблемы в семье, ссоры, обиды, непонимание, взаимные упрёки, проявляются негативные эмоции. Либо наоборот работа приносит результат, но всё время хочется больше - больше денег, больше недвижимости, больше власти. Человек всё больше и больше рвётся, именно уже рвётся, а не работает. Без отдыха, без расслабления. И загоняет себя в такую ситуацию, когда все заработанные блага не приносят удовольствия , так как усталость перекрывает  все остальные эмоции. При этом тоже начинаются проблемы в семье, поскольку семья его просто не видит. Нужно остановиться, вдохнуть-выдохнуть, понять, что есть вещи важнее материальных благ и что все деньги заработать невозможно. `;
yearsPanelItem.appendChild(paragraph);
break;
}
case 12: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(12) Очень несчастливый период, в который с человеком могут происходить различные несчастные случаи, наносящие существенный вред здоровью. Это могут быть и ДТП, и разного рода травмы - переломы, ожоги, отравления. Может даже случиться замершая беременность.
<br>Здесь же могут быть и ситуации, которые негативно влияют на эмоциональное состояние. Например, несправедливое отношение, оскорбления, предательства, обман. В этот период человек может попасть в отношения, в которых он будет выступать в роли жертвы, будет страдать морально, теперь унижения и манипуляции со стороны другого человека. Это могут быть и личные отношения, когда человек попадает в зависимость от своего избранника. Это могут быть и рабочие ситуации, при которых человек выполняет роль бесплатной рабочей силы для своего начальника.
<br>Также этот период может быть периодом застоя, когда человек закрывается от всего нового, боится перемен и отказывается двигаться вперёд. `;
yearsPanelItem.appendChild(paragraph);
break;
}
case 13: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(13) Достаточно тяжёлый период в жизни. Могут случиться болезненные потери и изменения, которые оставят далеко в прошлом привычную налаженную жизнь. Здесь можно столкнуться со смертью кого-то из близких людей и с этим человеком уйдёт и часть души, и часть жизни. Либо же могут произойти изменения, которые оставят лишь в воспоминаниях какие-то тёплые и душевные моменты в жизни. Например, продажа родительского дома и как следствие невозможно будет приехать туда, где прошло счастливое детство и где родители были молоды и здоровы.
<br>В этот период может настигнуть и внутренний кризис, когда приходит осознание, что нет особых достижений и жизнь могла бы сложиться намного лучше, кажется, что уже достигнут ""потолок"" и больше не будет изменений к лучшему. Человек сталкивается с апатией, упадком сил, нежеланием вообще что-либо делать. Нет сил принять те изменения, которые преподносит жизнь. Резко падает самооценка, появляется огромное количество комплексов, ощущение беспомощности. Кажется, что никто не понимает, навязчивое чувство одиночества приводит к депрессии. Происходит переоценка взглядов и все, что раньше было важно, теряет ценность. Происходит эмоциональное выгорание и нарушается психическое здоровье. Важно понимать, что всё, что происходит, это не конец жизни, а переход на другой, более качественный уровень, не нужно замыкаться в себе и следует начать смотреть на действительность под другим углом.`;
yearsPanelItem.appendChild(paragraph);
break;
}
case 14: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(14) Период, когда душа болит, а сердце плачет. В этот период человек может испытывать глубокие внутренние страдания, на душе катастрофически плохо. Часто это бывает вызвано развитием малоприятных событий, которые нарушают не только привычный уклад жизни, но и меняют взгляды на жизнь, опустошая при этом внутренний ресурс. В этот период ничего не мило, злят привычные вещи, нет желания ни с кем общаться.  Зачастую душевные переживания настигают человека, когда его личные представления не совпадают с тем, что происходит в реальной жизни и тогда человек попросту испытывает разочарование в этой жизни. Здесь может быть предательство любимого человека, или его смерть, когда душа разрывается от боли. Человек может начать глушить эту боль посредством алкоголя или запрещённых веществ, тем самым наносит ещё бОльший вред своей душе. `;
yearsPanelItem.appendChild(paragraph);
break;
}
case 15: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(15) Неблагоприятный период, когда тёмная сторона души человека может дать о себе знать. Проявляются такие качества как гнев, зависть, лживость, ревность, тщеславие, эмоциональная зависимость и так далее. Человек может начать нарушать закон, занимаясь мошенничеством и воровством, ведь им движет непреодолимая тяга к деньгам. Здесь же могут появиться и различного рода зависимости - алкогольная, наркотическая, игровая. Человек может находиться в состоянии какой-то нездоровой эйфории и не может отказать себе ни в чем, так теряются большие суммы денег, начинаются долги. Чтобы покрыть долги человек впутывается в новые и новые аферы, получает деньги, снова их прогуливает, снова аферы и так по кругу. `;
yearsPanelItem.appendChild(paragraph);
break;
}
case 16: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(16) Период регресса в жизни. Может произойти моральная деградация - человек откажется от тех моральных ценностей, которыми жил раньше, в угоду сомнительных удовольствий; его захватят негативные эмоции и качества(злость, зависть, агрессия, лицемерие, подлость). Этот период разрушения души и тела, отношений и карьеры, вся жизнь идёт под откос. Человек может остаться ни с чем. В этот период самое главное, не углубляться в темноту, суметь остановиться, достойно пройти испытания и тогда судьба сжалится. Если же человек полностью погрузится в темноту, то выйти из неё будет очень сложно, а иногда и невозможно.`;
yearsPanelItem.appendChild(paragraph);
break;
}
case 17: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(17) Это период спада, который характеризуется состоянием подавленности и опустошения, мрачными настроениями,  унынием и тоской. У человека снижаются общительность и активность, повышается ипохондричность (преувеличение проблем со здоровьем) и мнительность, возникают неудовлетворенность текущими событиями и собой, пессимизм и скептическое отношение ко всему. Человек не может себя реализовать, сидит и сожалеет об упущенных возможностях, вспоминает прежние переломные моменты в жизни, «пережевывает» собственные неудачи. Накрывает состояние безысходности и бесполезности. `;
yearsPanelItem.appendChild(paragraph);
break;
}
case 18: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(18) Период нахождения под влиянием плохого окружения. Это могут быть люди, которые постоянно генерируют негатив, независимо от внешних обстоятельств. Они всегда всем недовольны, им всегда все должны и все вокруг во всем виноваты. Это могут быть и обычные пессимисты, которые не могут справляться с событиями в своей жизни и сеют панику вокруг себя. Это могут быть и по-настоящему озлобленные люди, которые искренне ненавидят весь мир. А могут быть алкоголики и наркоманы. В любом случае, они излучают негативную энергетику, которая влияет на тех, кто находится с ними рядом. Начинаются проблемы со здоровьем, время тратится впустую, не получается радоваться жизни, нет движения вперёд, превращается развитие, снижается качество жизни.
<br>Также в этот период человек подвластен сглазам и порчам, потому как подобное притягивает подобное. Человек окружён негативной энергетикой и ей притягивает всё нехорошее. `;
yearsPanelItem.appendChild(paragraph);
break;
}
case 19: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(19) Неблагоприятный период, характеризующийся наплывом разного рода проблем: на работе, в семье, со здоровьем. Могут возникнуть большие денежные трудности, долги, большие непредвиденные расходы. Человек теряет своё прежнее положение в обществе, теряет авторитет и уважение, становится уязвимым для мнения окружающих, закрывается от людей, уходит в одиночеству. Если человек не впадает в панику, не начинает жить страхами(страх бедности, одиночества, непонимания), то этот период быстро проходит. Но если же страхи начинают есть его изнутри, то период может затянуться и закончиться непредсказуемо. `;
yearsPanelItem.appendChild(paragraph);
break;
}
case 20: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(20) Очень тяжёлый период, во время которого испытания суждено пройти не только человеку, но и его семье. Это может быть и тяжёлая болезнь кого-то из родственников, а может быть и смерть. Либо же могут возникать серьёзные конфликты и ссоры внутри семьи, непонимание, упрёки, обиды, оскорбления. В этот период семья по каким-то причинам может отвернуться, отказаться, лишить поддержки и человек останется один, его исключат из рода. В этот период и сам человек может оказаться между жизнью и смертью (болезнь, ДТП, тяжёлая травма). В этот период вся плохая карма рода проявляется и человеку предстоит её проработать. В этот день период человек не может реализовать свои планы, случаются неприятности, которые не дают ему идти вперёд. `;
yearsPanelItem.appendChild(paragraph);
break;
}
case 21: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(21) Этот период характеризуется трудными и болезненными для человека изменениями, которые он не хочет или не может принять, но вынужден это делать, так как именно так складываются обстоятельства, приходится переступать через себя, преодолевать, смириться. Человек выходит из зоны комфорта, где чувствовал себя относительно уверенно и спокойно. Это может быть понижение на работе, сокращение, потеря работы, вынужденный переезд в другой город, разрыв отношений и т.п.
<br>Если человек в душе примет все эти изменения, то жизнь быстро наладится. Если же он начнёт сопротивляться, воевать, ругать эту жизнь, то период может значительно затянуться. Нужно бороться с недовольством, быть благодарным за всё, что имеешь, быть открытым для этого мира и Бога, открытым для любви. `;
yearsPanelItem.appendChild(paragraph);
break;
}
case 22: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(22) Период ограничений и рамок. Ярко проявляются все негативные установки и представления о себе, которые препятствуют развитию и движению вперёд. ""Я не умею ладить с людьми"", ""У меня совсем нет способностей к бизнесу/пению/иностранным языкам"", ""Мне не дано…"", ""У меня ничего не получится"" и так далее. И исходя из этих убеждений строится жизнь. В этот же период человек может стать заложником каких-то обстоятельств, попасть в ситуацию, из которые кажется, что нет выхода, у человека может отсутствовать право выбора. То есть человек оказывается несвободным и неспособным действовать так, как ему хотелось бы.
<br>Может быть и совершенно негативная ситуация, когда человек попадает в места лишения свободы или на лечение(когда эта энергия в минусе, может открыться шизофрения или иные психические расстройства, требующие помещение человека в специальные учреждения). `;
yearsPanelItem.appendChild(paragraph);
break;
}}
}}
yearsPanelContentCreate();
const moneyPanelItem=document.querySelector('#money_panel');
function moneyPanelContentCreate(M, numbers1, numbers2){
const uniqNumbers1=new Set(numbers1);
const uniqNumbers2=new Set(numbers2);
const text2=document.createElement('p');
text2.innerHTML='Направление деятельности';
text2.style.fontWeight='700';
moneyPanelItem.appendChild(text2);
switch (M){
case 1: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(1) Вам подойдут профессии, связанные с речью, словесным мастерством, умением излагать мысли и убеждать.
<br>Писатель, оратор, блогер, журналист, политик, психолог.
<br>Направления, в которых важную роль играют – коммуникация, торговля, PR и рекламный бизнес.
<br>Все уникальные и необычные профессии: барабанщик, скульптор, дирижер, трейдер, финансовый аналитик, нейрохирург, кузнец, аукционист, коллекционер, пластический хирург, ювелир, конструктор, композитор, бортрадист, иконописец, массажист, мастер хендмейд, иллюзионист.
<br>Очень часто вы выбираете работу над внедрением новых знаний. Можете заниматься нанотехнологиями, компьютерными технологиями, инжинирингом, робототехникой, научными исследованиями.
<br>Кроме того, вы имеете сильную интуицию и можете связать свою жизнь с целительством, магией, биоэнергетикой, стать тренерами в сфере развития личности и духовных практик.`;
moneyPanelItem.appendChild(paragraph);
break;
}
case 2: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(2) Вы склонны выбирать для себя профессии, связанные с животноводством, травничеством, фармакологией, психологией, актерским мастерством, целительством и живописью. Вы также можете пойти во флористы, ветеринары, врачи, аптекари, сиделки, садоводы, косметологи, астрономы, кондитеры, государственные служащие. Склонны выбирать профессии, дающие вам возможность помогать другим людям. Вы успешно сможете реализоваться как музыкант, горничная, ветеринар, доярка, фермер, хлебороб, пасечник, специалист по икебане, пчеловод, кинолог, косметолог, стилист, дизайнер, зоотехник, астроном, сотрудник криминальных и сыскных отделов, руководитель среднего звена, дипломат.`;
moneyPanelItem.appendChild(paragraph);
break;
}
case 3: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(3) Вы реализовываетесь как в собственном бизнесе, так и в управлении и в административных должностях. Вам могут подойти такие профессии: администратор, менеджер, управленец, предприниматель, финансист, меценат, экономист, директор. Также вы можете стать визажистом, стилистом, косметологом и все профессии сферы красоты. Ресторанный бизнес, официанты и идейные вдохновители – тоже все про вас. Вместе с этим вы можете достичь профессионального роста в таких профессиях – строитель, организатор, статистик, химик, ученый, инструктор, геолог, художник, бухгалтер, музыкант, фермер, археолог, садоводческое товарищество. Няни, сиделки, воспитатели, организаторы детских центров, телеведущие, актрисы, балерины, кондитеры, гинекологи – равным образом соответствуют вашим профессиональным способностям. Все красивое, связанное с заботой, организацией, творчеством.
`;
moneyPanelItem.appendChild(paragraph);
break;
}
case 4: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(4) Вы можете проявить себя в деятельности, связанной с властью и положением в социуме, где необходимо ваше умение отвечать не только за себя, но и за многих. Вам подойдут такие профессии – президент, работодатель, владелец земельной собственности. Вы тот, кто обладает властью: организатор, наставник, руководитель, политический лидер.
<br>Любой бизнес, в котором преобладает политическая сфера, сфера финансов, управленческий аппарат. Административно-хозяйственная деятельность. Вы обычно предприниматели, директора в любой сфере деятельности –  министры, мэры, банкиры. В строительстве: прорабы, архитекторы, а также, возделыватели земли – пахари, сеятели, руководители подсобных хозяйств, колхозов, совхозов. Агротехники, агрономы, животноводы. А также чисто мужские профессии – сантехники, станочники, грузчики, крановщики, наладчики станков и оборудования, механики. Также для вас профессии, связанные с недвижимостью, инвестициями, рекламой, образованием, путешествиями, ораторским искусством, авиацией и судоходством.`;
moneyPanelItem.appendChild(paragraph);
break;
}
case 5: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(5) Вам легко подойдут профессии – воспитатель, учитель, советник, адвокат, консультант. Работник научных и учебных заведений – это вы. Также достигните отличной реализации в профессии юриста, адвоката, судьи, экономиста, директора, управленца, предпринимателя, программиста, компьютерщика, брокера, агента по продаже недвижимости. Семейный психолог, работник Загса, социальный работник, торговый работник, кассир – тоже про вас. Можете быть тренером, инструктором, лектором, переводчиком и даже певцом. В вас можно заметить духовного лидера, духовного наставника, гуру.
`;
moneyPanelItem.appendChild(paragraph);
break;
}
case 6: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(6) Вы гармонично вписываетесь в любое общество. Везде будут вам рады. Занимаетесь коллекционированием различных вещей. Создаете красоту во всем, что бросилось вам в глаза. Цените красоту тела, внешнего вида.   Вам подойдут профессии – продюсер, организатор, администратор, менеджер по любым продажам, продавец ювелирных украшений. Все творческие профессии буквально были созданы для вашей личности – дикторы, фотографы, флористы, дирижеры, аниматоры, журналисты, артисты, ведущие концертов и праздников, ди-джей, имиджмейкеры, дизайнеры. Вы можете стать стилистом, визажистом, парикмахером, косметологом, дизайнером, модельером, моделью и гримером. Психолог семейных отношений – также про вас. Художественное искусство, коммуникация,сплочение людей и направление их.`;
moneyPanelItem.appendChild(paragraph);
break;
}
case 7: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(7) У вас всегда имеется духовная цель. Вы всегда стремитесь к лидерской позиции и, как правило, ее заполучаете. Есть предрасположенность к движению на транспорте, что очень может пригодится в профессиональной деятельности. Созданы для кропотливой работы и прикладываете свою руку к созданию эксклюзивных вещей.
<br>Вы прирожденные военные или водители – профессиональный водитель, дальнобойщик, таксист, автомеханик, автослесарь, организатор агентства по грузоперевозкам, курьер по доставке, почтальон, гид, дорожный работник, жокей. Вам нужна работа, связанная большим количеством контактов в день, перемещениями, командировками и рисками. Вы вполне сможете стать хорошим экспедитором, логистом. Выбирайте профессии, связанные с техникой и машиностроением. Также подойдут профессии, где есть необходимость помогать мигрантам. Вы можете себя найти в работе, связанной с профориентацией или трудоустройством других – HR-менеджер, начальник отдела кадров, бизнес-тренер, путешествующий по миру с лекциями. Вы можете стать врачом, каскадером, охранником, инструктором, полицейским, дорожным инспектором.  Любая военная должность.`;
moneyPanelItem.appendChild(paragraph);
break;
}
case 8: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(8) Вы обладаете шармом, который позволяет вам добиваться расположения людей. Зачастую у вас имеется хорошее образование. Педантизм также очень помогает в вашей профессиональной деятельности.
<br>Вы хорошие юристы, адвокаты, судьи, прокуроры. Вы идеально подходите для административной работы. Все должности, требующие работы с документацией и госучреждениями. Незаменимы в компаниях, занимающихся защитой прав животных и людей. Вы можете стать экологом, экономистом, бухгалтером, финансистом, аналитиком, бизнесменом, страховым агентом. Также подходят профессии: основатель благотворительных фондов, редактор, владелец газет, страховой агент, скалолаз, сиделкой, архитектором. Человек, занимающийся наукой или искусством, статистик, работник гостиниц, контролер, эксперт, следователь, издатель журнала, корреспондент, репортер, врач, органист – все про вас. Рекомендуемые места работы: биржа, правительство, издательство, большие организации, инвестиционный фонд, музей.
`;
moneyPanelItem.appendChild(paragraph);
break;
}
case 9: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(9) Вам подойдут такие профессии, как: научный сотрудник, философ, лингвист, историк, географ, геолог. Разработчик новых технологий, научный разработчик, преподаватель – также про вас. Можете быть медиком, врачом, диетологом, психологом, целителем, фармацевтом, литератором, писателем, поэтом, сценаристом, библиотекарем. Капитан дальнего плавания, пастух, лесник, ремесленник, пчеловод, садовод, селекционер, ветеринар, эколог – вы сможете реализоваться в этих профессиях. Можете быть шахматистом, программистом, электронщиком, бизнес аналитиком, тренером, альпинистом и скалолазом.
`;
moneyPanelItem.appendChild(paragraph);
break;
}
case 10: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(10) Вы можете найти себя в «денежных профессиях» - бухгалтер, экономист, кассир, банковский служащий, биржевый брокер и т.д. Также ваша удача способствует вашему развитию в специальностях раскрутки, увеличения продаж. Можете стать игроком или владельцем казино. Вы можете проявить себя в деятельности связанной с поездками, общением с людьми, туризмом, командной работы, менеджерской работой, административной, офисной. Реализуетесь в любой сфере, где есть движение и команда единомышленников. Вам подойдут профессии: проводник, стюардесса\\стюард, дирижер, баскетболист, волейболист, футболист. Можете быть работником музыкальных творческих коллективов, хоровые и плясовые коллективы.
`;
moneyPanelItem.appendChild(paragraph);
break;
}
case 11: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(11) У вас очень много сил и энергии, что позволяет вам выбрать профессии, связанные с физическим трудом, спортом и движением. Это спортсмены, гонщики, спасатели, пожарные, организаторы мероприятий, политики, директора, руководители предприятий, строители, специалисты по ремонтным работам. Вам подойдут все профессии, где нужно много работать, управлять людьми и находиться в постоянном движении. Можете заняться фрилансом, работой с большой ответственностью. Подойдут сферы, в которых возможен пункт путешествий. Вы можете стать горнорабочим, шахтером, мореходом, грузчиком, фермером, альпинистом, металлургом, бетоноукладчиком, строителем, газоэлектросварщиком, плиточником, маляром, штукатуром, бурильщиком, телохранителем, водителем.
`;
moneyPanelItem.appendChild(paragraph);
break;
}
case 12: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(12) Благодаря чувствительности, интуиции, умению заглянуть в души других людей, вы можете стать хорошими психологами, эзотериками, социальными работниками, наркологами, тюремщиками, сторожами, волонтерами. Вы легко можете стать фармацевтом, травником, химиком, педагогом, работником детского сада, школы, детского дома, дома престарелых, волонтером. Можете реализоваться как работник соцзащиты, пенсионного фонда, научный сотрудник, изобретатель, судебный представитель. Также ваши профессиональные способности помогут вам в профессиях – писатель, ноу-хау в бизнесе, музыкант, животновод, биолог, фельдшер, ветеринар. Творческие специальности и ремесленные работы для вас отлично подойдут. `;
moneyPanelItem.appendChild(paragraph);
break;
}
case 13: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(13) Вы всегда готовы к любым переменам, даже если это смена вашей деятельности. Не боитесь заниматься экстремальными видами спорта. Вам подойдут такие профессии – хирург, акушер, гинеколог, патологоанатом, пластический хирург, нарколог, спасатель, пожарный МЧС, военнослужащий (горячие точки), летчик, парашютист, спортсмен экстремальных видов спорта, гонщик, горнолыжник, гинеколог, реформатор, служащий или организатор клирингового агентства. Успешно можете себя реализовать в каком-нибудь бизнесе. Так же для вас подойдет такая деятельность: реставратор, массажист, целитель, специалист по регрессивной терапии, психолог, водитель в экстремальных сложных условиях, исследователь инноваций, мануальный терапевт, травматолог, работник реанимации, работник скорой помощи, работник искусства и творчества, каскадер, скалолаз, монтажник высотник, промышленный альпинист, альпинист, охрано-правовые структуры.
`;
moneyPanelItem.appendChild(paragraph);
break;
}
case 14: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(14) Умеете работать с мелочами, поэтому можете выбрать профессии, как: фармацевт, часовщик, ювелир. Вы можете проявить себя в деятельности связанной с психологией, врачеванием. Все виды искусств, шоу-бизнес, организация выставок, фестивалей, конференций – это также для вас. Можете реализоваться в профессиях, связанных с путешествиями, туризмом, историей и музеями – искусствовед, литератор, поэт, музыкант, танцор, биолог, химик. Вам подойдет быть: гомеопатом, травником, ботаником, работником наркологических служб, артистом театра и кино, певцом, мыловаром, экологом, парфюмером, концертмейстером, гримером, костюмером, банщиком, аквалангистом, работником лабораторий по сбору и проверке анализов.
`;
moneyPanelItem.appendChild(paragraph);
break;
}
case 15: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(15) Вы легко можете стать работником шоу бизнеса, торгового центра, игорного бизнеса, досугового бизнеса, ресторанного и модельного. Можете быть предпринимателем, риелтором по продажам недвижимости, финансистом, банкиром, брокером. Вам подойдут профессии: целитель, психолог, государственный чиновник, психиатр, нарколог, тренер духовных практик, политолог, телеведущий, журналист, публицист, продюсер. Отлично реализуетесь как переговорщик, дипломат, сотрудник службы безопасности, модель, артист, певец, музыкант, специалист по подбору кадров, судья следователь. Можете занять главенствующую должность.`;
moneyPanelItem.appendChild(paragraph);
break;
}
case 16: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(16) Для работы вы склонны рассматривать высокие офисные здания или сами создаете собственную структуру – сайт, сеть магазинов, сеть автосервисов. Из вас получатся отличные программисты, архитекторы, дизайнеры помещений. Вам подойдет работа, связанная с пиротехникой, пожаротушением, спортом и армией. Вам могут подойти такие профессии: строитель, скульптор, дизайнер, массажист, мануальный терапевт, стоматолог, травматолог, спортсмен по борьбе, каскадер, альпинист, верхолаз, тренер духовных практик, работник по уборке и расчистке территории, домоуправ, работник коммунальных хозяйств, крановщик по сносу старых зданий, подрывник, снайпер, минер, атомщик, оружейник, кузнец, станочник, археолог, геодезист.
<br>Вы отлично реализуетесь как менеджер продаж, администратор, индивидуальный предприниматель, следователь уголовного розыска, тюремный служащий, парашютист, акробат цирка, барабанщик, фотограф. Ваше финансовое процветание связано с работой по возрождению духовности у людей. Духовное лидерство, искусство, руководство объединениями и религиозными течениями - ваш путь. Вы предпочитаете фиксировать знания и достижения, а потом длиться ими со всеми. Для этого полезно писать книги, записывать аудиофайлы и создавать фильмы (режиссерская или писательская работа).`;
moneyPanelItem.appendChild(paragraph);
break;
}
case 17: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(17) Склонны связывать свою жизнь с творчеством и искусством. Однако из вас также получатся отличные механики, ремонтники машин – станете лучшими в своем городе. Став бизнесменом, сможете реализовать свои самые смелые идеи, построить целую империю, не имея при этом всем стартового капитала. Вы можете стать отличными математиками и философами. Вам легко даются работы в сфере информационных технологий. Вы человек творчества. Вы прекрасно могли бы реализоваться в теме астрологии.
<br>Вам подойдут такие профессии: астролог, астроном, исследователь НЛО, метеоролог, научный работник, обслуживающий персонал космонавтики, художник, фотограф, писатель, журналист, певец, цирковой артист, модель, актер, модельер, дизайнер, ландшафтный дизайнер, художник оформитель, компьютерный дизайнер, сценарист, работник салона красоты, бизнесмен, работник печатно-рекламного бизнеса, животновод, колхозник, лесник, рыболов, моряк, полярник, альпинист, верхолаз, портной, кондитер, повар, целитель, тренер духовных практик, экстрасенс. Можете реализоваться как организатор праздников и торжеств, ведущий и телеведущий. Работа, связанная с изучением паранормальных явлений также будет для вас в радость.`;
moneyPanelItem.appendChild(paragraph);
break;
}
case 18: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(18) Вы можете проявить себя в деятельности, связанной с индустрией развлечений – кино, телевидение, фотография, реклама, искусство, творчество, литература, кинорежиссура, дизайн, мода, индустрия красоты, актерское мастерство, шоу-бизнес, целительство, экстрасенсорика, ясновидение, прорицательство. Можете стать путешественником, поэтом, мультипликатором, кукловодом (театр кукол), океанографом, ветеринаром, флористом, психотерапевтом, психологом, наркологом, окультистом, магом, востоковедом, лингвистом, музыковедом. Можете заиметь собственный бизнес либо работать с криминальными структурами. Вам также подойдет такие профессии – моряк дальнего плавания, космонавт, туроператор, туристический гид, экскурсовод, ди-джей, официант, бармен, организатор, администратор, программист.
`;
moneyPanelItem.appendChild(paragraph);
break;
}
case 19: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(19) Часто выбираете себе профессии промоутера, PR-специалиста, рекламиста, актера. Работаете на симпозиумах и выставках, делаете политическую карьеру. Вы можете проявить себя в деятельности, связанной с обществом, политикой, искусством, шоу-бизнесом, духовностью, благотворительностью, целительством. Смело беретесь за любые проекты в этом направлении. У вас энергия лидера и поэтому ведет за собой людей, вдохновляясь высокими, духовными целями.
<br>Вам могут подойти такие профессии: оратор, учитель, артист, музыкант, певец, политик, высший военный руководитель, командующий, главнокомандующий, духовный лидер, менеджер по продажам, рекламный агент, сетевой бизнесмен, юрист, адвокат, электрик, служащий электросетей, пожарный, конструктор, ядерщик, научный разработчик, директор учебного заведения, здравоохранения, лагеря, заведения строгого режима, военно-оборонного предприятия, создатель акционерного общества, работник ценных бумаг и валютного рынка.
`;
moneyPanelItem.appendChild(paragraph);
break;
}
case 20: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(20) Чаще всего вы выбираете родовые профессии, продолжаете семейный бизнес. Можете выбрать работу в юриспруденции или в тех отраслях, где большое место отведено этике, морали, системе ценностей – преподавание. Сможете найти себя в профессиях, связанных с вопросами философии жизни и смерти – онкоцентры, реанимация. Вы можете проявить себя в деятельности, связанной с духовным развитием. Вам подойдет работа с природными ресурсами и в добывающей промышленности. Из вас получатся хорошие археологи, этнографы, историки, врачи, хирурги, наркологи, психотерапевты, психиатры, стоматологи, бизнесмены, политики, религиозные деятели.
<br>Можете стать организатором в шоу-бизнесе, финансовым аналитиком, финансистом, банкиром, экономистом, менеджером по персоналу, семейным психологом, педагогом (работа с трудными подростками), тренером по самосовершенствованию, ведущим духовных практик или йоги. Вам подойдет профессия: поэт, музыкант, композитор, ювелир, журналист, связист, телефонист, диспетчер, экстрасенс, медиум, предсказатель, криминалист, патологоанатом, судья, юрист, работник строго режима (тюрьмы, изолятора, исправительной колонии и колонии строгого режима), стратег, командующий и главнокомандующий (высший военный состав), руководитель общественных организаций, IT-специалист, веб-разработчик. Можете попробовать себя в профессии работника, обслуживающего процесс рождения и процесс смерти – похоронное бюро, кладбище.`;
moneyPanelItem.appendChild(paragraph);
break;
}
case 21: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(21) Вы обладаете способностями для изучения иностранных языков и тягой к новым технологиям. Можете с легкостью стать географом, переводчиком, стюардом, чтобы иметь как можно больше возможностей для путешествий. Вы найдете себя в отраслях, связанных с самолетами, космосом, нано технологиями, компьютерами, мобильными телефонами, интернетом. Вам подойдет работа в туризме и деятельность, связанная с налаживанием межнациональных контактов.
<br>Вам подойдут такие профессии: гид, экскурсовод, дипломат, владелец туристической компании и тур бизнес, путешественник, курьер доставки грузов по миру, грузоперевозчик по миру, авиатор, пилот, политический деятель, экономист, государственный деятель, организатор международных фестивалей (выставок, конференций), международный инвестор, кредитор, финансист, работник рынка валют и ценных бумаг, брокер, ведущий духовных практик, шаман, миссионер, газовщик, нефтяник, геолог, журналист, телеведущий. Можете реализоваться в военно-оборонной промышленности или вступить в общественные миротворческие организации.`;
moneyPanelItem.appendChild(paragraph);
break;
}
case 22: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(22) Вы отлично сможете проявить себя в деятельности, связанной с туризмом, путешествиями, общественными организациями, с организациями демонстраций за свободу и независимость. Сможете реализоваться как научный деятель, изучающий процессы Вселенной и космоса. Вам подойдут таким профессии: бродячий артист, циркач, клоун, жонглер, аниматор, руководитель творческих коллективов, музыкант, фокусник, иллюзионист, ведущий шоу программ, фотограф, художник, актер юмористического жанра, создатель шоу, поэт, контактная импровизация, ведущий тренингов по саморазвитию, геолог, организатор экспедиций по миру, журналист, писатель, дипломат, политик, водитель дальних перевозок, пилот, летчик, космонавт, организатор фестивалей (выставок, конференций), психиатр, нарколог, работник психиатрических больниц, педагог детей со слабым умственным развитием, целитель, путешественник, парашютист, дельтапланерист, альпинист, скалолаз. Можете попробовать хождение по канату и глотание огня.
`;
moneyPanelItem.appendChild(paragraph);
break;
}}
const text=document.createElement('p');
text.innerHTML='Для достижения успеха важно';
text.style.fontWeight='700';
moneyPanelItem.appendChild(text);
Array.from(uniqNumbers1).map((item)=> {
switch (item){
case 1: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(1) Очень важно реализоваться в социуме, найти применение своим лидерским способностям, повести за собой людей. Главное не быть одиночкой, научиться работать в команде, делегировать. Надо преодолеть свою агрессию и эгоизм, научиться считаться с интересами других людей, не зацикливаться на своей персоне. Стараться больше уступать, искать компромиссы с окружающими, вырабатывать гибкость в характере, учиться бескорыстно отдавать.
<br>Инновационные стартапы, не стандартные товары, сервисы, услуги,  дизайн, социальные программы - все это ваш ключ к финансовому успеху. Ключом к повышению доходов, так же становится все, что для вас в новинку – будь то идеи и методы воплощения или просто люди. То, что другие посчитают безумством и пустой тратой времени и – для вас крутая идея для воплощения в жизнь. Постоянно быть активным, искать новые пути и возможности. Нельзя говорить о какой-либо стабильности, вы творите на постоянной основе. Финансовые качели всегда с вами.
`;
moneyPanelItem.appendChild(paragraph);
break;
}
case 2: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(2) Вы сможете реализовать свою материальную часть жизни, когда гармонизируете духовную и материальную сферы. Каждый день нужно выделять время для себя. Медитировать, ухаживать за собой, слушать себя. Жить настоящим, здесь и сейчас. Необходимо научиться находиться в контакте со своими эмоциями и чувствами и контролировать их. Зарабатывать деньги только через отдачу пользы(через благо) максимальному количеству людей.
<br><br>
Нужно развивать интуицию,
<br>Научиться доверять людям, работать в команде
<br>Не очаровываться друзьями (особенно друзьями по бизнесу)
<br>Сохранять дружеские отношения, но подходить к делам рационально
<br>Создавать и стремиться увидеть плоды своей деятельности.
<br><br>
Что блокирует денежную энергию:
<br>Противоречивость и двойственность натуры. Эгоизм. Сомнения, нерешительность, пассивность, инертность и лень.`;
moneyPanelItem.appendChild(paragraph);
break;
}
case 3: {
let paragraph=document.createElement('p');
if(gender==='М'){
paragraph.innerHTML=`(3) Необходимо нарабатывать в себе мужские качества, повышая мужскую энергию. Стать хозяином в доме. Проявлять щедрость. Может проявляться как мягкость, безответственность, ранимость, женщины могут вить веревки из такого мужчины или же такой мужчина очень хорошо разбирается в женской психологии, руководит женским коллективом — все зависит от того, в плюсе энергия или в минусе.
`
}else{
paragraph.innerHTML=`(3) Склонна к хорошей денежной карме. Люди в плюсе становятся богатыми. Обязательная реализация в бизнесе и/или на руководящих постах.
<br>Ваша задача - хорошо ориентироваться в деньгах и бизнесе. Научиться делегировать свои полномочия и не тянуть на себе всю работу. Очень важно привлечь в свой бизнес женщин. Такой ход не только разгрузит вас, но и увеличит денежный поток. Проживая свою базовую энергию в плюсе, вы хорошо знаете, как распределить задания и спросить с других. Вы - хорошая хозяйка, у которой  всегда все на своих местах.  Вы умеете зарабатывать и помогаете зарабатывать другим.
`
}
paragraph.innerHTML=`(3) Что блокирует финансовую энергию:
<br>Давление на людей, жесткость, агрессивность, вспыльчивость, неумение идти на компромиссы и договариваться. Плохие отношения с женщинами в коллективе."`;
moneyPanelItem.appendChild(paragraph);
break;
}
case 4: {
let paragraph=document.createElement('p');
if(gender==='М'){
paragraph.innerHTML=`(3) Выбирайте род деятельности, где в полной мере можете проявить свою власть. Создавайте структуру порядка и контроля. Скорее всего это будет мужской коллектив.
`
}else{
paragraph.innerHTML=`(3) Нужно задуматься над тем, насколько вы умеете принимать мужчин такими, какие они есть; Уважать и считать их значимыми в своей жизни.<br>
Не продавливать, не требовать. Принимать от них подарки и деньги просто так, не чувствуя вины или долга; Доверять и сотрудничать с ними.<br>
Вы должны работать над своим женским началом. Получать удовольствие от своей красоты, своей деятельности. Наслаждаться и купаться в мужской заботе.<br>
Возможно деньги вы будете получать через мужчину. Вам не нужно будет ничего делать — вас будет обеспечивать муж или влиятельный покровитель.<br>
`
}
paragraph.innerHTML=`(4) Что блокирует денежную энергию:<br>
Давление на людей, жесткость, агрессивность, вспыльчивость, неумение идти на компромиссы и
договариваться. Неумение строить<br> взаимоотношения с мужчинами.
"`;
moneyPanelItem.appendChild(paragraph);
break;
}
case 5: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(5) Ваш доход напрямую зависит от отношений в семье - через приоритет семьи, знания, соблюдение законов. Если есть конфликты или недопонимания, нужно наладить отношения с семьей.<br>Налаживайте родственные контакты, собирайте родных за столом, помогайте близким. Развивайте<br> семейные традиции и учите этому других, уважайте старших.
Важно посмотреть, что было с отношениями к деньгам в роду, проработать семейные установки и блоки. Вам приходят деньги, когда вы получаете новые знания и передаете их. Важно постоянно быть в информационном поле, развиваться, получать новую информация, анализировать и передавать ее. Материализуйте свои знания: напишите книгу или снимите обучающий курс, станьте преподавателем, наставником в своей области или в самом широком понимании. Важно начинать учить безвозмездно, не навязывая знания, а легко и доступно на своем примере. Тогда успех придет обязательно.<br>
Деньги могут идти через политику, создание новых законов и методик, духовное учительство.
<br><br>
Что блокирует энергию:<br>
Блокируется энергия, если вы не делитесь своими знаниями. Если остановились в развитии, при лени и апатии. Когда не учите, а поучаете. Если у вас плохие
взаимоотношения с родом.`;
moneyPanelItem.appendChild(paragraph);
break;
}
case 6: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(6) Деньги к вам будут приходить, при взаимодействии с другими людьми, при партнерстве, например, совместный бизнес. Через создание красоты, ощущения любви и гармонии. Очень важно воспитывать в себе эти чувства, заботиться о себе, баловать себя красивыми вещами, создавать вокруг гармоничную и комфортную обстановку. Мощный денежный поток открывается с рождением детей. Дарите свою любовь бескорыстно. Вам нужно любить свою профессию больше, чем деньги. Не заставлять себя.
Важно не использовать свою красоту с меркантильным интересом, не торговать собой и своей любовью. Делитесь рецептами своей красоты, гармонии и успеха. Удачным выбором будет род деятельности, где вы будете помогать другим становиться красивыми, уверенными и стильными. Так же хорошо подойдет психология, поддержка соцсетей, агентства знакомств. Деньги приходят через красоту и коммуникацию с людьми.<br>
<br><br>
Что блокирует энергию:<br>
Нелюбовь к себе (когда человек считает, что он не достоин чего-то лучшего. Проблемы с принятием статуса, денег и подарков)<br>
Идеализация других (разочарование, если человек не соответствует вашим ожиданиям(и иллюзиям)`;
moneyPanelItem.appendChild(paragraph);
break;
}
case 7: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(7) У вашего денежного канала огромнейший потенциал. Такой человек вряд ли может
работать на другого. Явно выраженное лидерство. Умеюте ставить перед собой цели и вовремя достигать их. Необходимо стремиться
расширить свой денежный поток. Постоянное масштабирование. Четко видете, какие суммы вы хотите иметь. Ставьте перед собой
цели и достигайте их. Проверки судьбы будут на умение вести людей за собой. Вы должны стать лидером, вдохновлять людей на постоянный рост, при комфортном для них взаимодействии.
<br><br>
Что блокирует энергию:<br>
Воинственный настрой, желание жестко отстаивать свою точку зрения. Идти по головам.<br>
Давление на сотрудников, коллег, конкурентов
`;
moneyPanelItem.appendChild(paragraph);
break;
}
case 8: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(8) Старайтесь проявлять справедливость в обращении с деньгами. Все, что вы делаете моментально возвращается кармой, поэтому сбалансируйте свою деятельность. Направьте ее в полезное для людей, русло.<br> Помогайте своей деятельностью, отдавайте - благо вернется быстро в форме денег.
Необходимо развить творческую сферу для раскрытия денежного канала.<br>
Если эта энергия в минусе — человек попадает в долги и кредиты, ему кажется, что вокруг воры и мошенники, ему кажется, что все кто зарабатывает много- находятся совсем в другом мире. Что все очень дорогое и он постоянно живет в подавленном состоянии.
<br><br>
Что блокирует энергию:<br>
Непонимание причинно-следственных связей.<br>
Нельзя заниматься плохим бизнесом (шубы, мясо, загрязнение окружающей среды).
`;
moneyPanelItem.appendChild(paragraph);
break;
}
case 9: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(9) Максимальная реализация денежного канала через лидерство. Ведение за собой людей, организация деятельность в том месте, в котором еще никто подобного не делал. Также деньги приходят через мудрость, аналитические способности. Вам следует заниматься исследованиями и отдавать знания в мир.
Когда эта энергия минусе — это замкнутость, боязнь быть осмеянным, интеллектуальная и духовная гордыня.<br>
Вы склонны экономить на себе — это так же минус энергии. Вы выбираете самое дешевое, закрывая глаза на действительно желаемое. Нужно повышать свой уровень нормы, отказаться от экономии. Тратив деньги на себя с любовью, вы наоборот усилите денежный поток.
<br><br>
Что блокирует энергию:<br>
Интеллектуальная гордыня (человек считает себя умным, а других «недалекими» и презирает их за это)<br>
Если человек с презрением относится к материальному миру.<br>
Неуверенность в себе и ценности своих знаний. Недоверие к людям. Экономия на себе.`;
moneyPanelItem.appendChild(paragraph);
break;
}
case 10: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(10) Деньги приходят легко. Другим может показаться, что<br> вы для этого вообще ничего не делали.
Для того, чтобы деньги приходили — вам нужно расслабиться и получать удовольствие. Доверие потоку и следование за ним туда, куда тянет, приведет к новому уровню финансовых возможностей. Однако зачастую, люди этой энергией не могут расслабиться.
Вы скорее всего не лидер, но серый кардинал. Вы хорошо работаете с людьми в любых коллективах, способны организовывать, оказывать поддержку лидерам. Вы хорошие заместители и помощники руководства, исполнители.<br> Все начинает крутиться вокруг вас, как только вы беретесь за любой проект. Находятся связи, ресурсы, возможности.
Вам присуща энергия мягкости и легкость на подъем. Вы с радостью выбираете все, что связанно с движением и общением, с большими коллективами.
<br><br>
Что блокирует энергию:<br>
Лень способна полностью перекрыть финансовый поток.<br>
Постоянное напряжение, тревога`;
moneyPanelItem.appendChild(paragraph);
break;
}
case 11: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(11) У вашего денежного канала огромнейший потенциал.<br> Очень много сил и энергии, способны много работать на износ. Вы можете хорошо зарабатывать в деятельности, связанной с физическим трудом, спортом и движением. А так же верой в свои силы. Реализуетесь там, где нужно проявляться лидером, много работать, применить силу, управлять людьми. Вы вряд ли можете работать на другого.<br> Трудоголизм — главный минус. Такой человек, если идет к цели, то идет напролом. Для успеха важно реализовывать свои сексуальные желания, не стесняться и получать удовольствие от секса. Учитесь не применять силу в спорах, уступать, не ждите похвалы и одобрения от близких (особенно в области финансов). Используйте для восстановления энергию природных стихий. Заряжайтесь на природе (полезно поехать к водным источникам).<br>
<br><br>
Что блокирует энергию:<br>
Когда человек уже не способен быть трудоголиком —перекрывается финансовый поток. Блокировка, зачастую, приходит через болезнь.<br>
Давление на себя. Нужно уметь отдыхать.<br>Усмирять в себе разрушительные порывы агрессии`;
moneyPanelItem.appendChild(paragraph);
break;
}
case 12: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(12) Важно заботиться о других и оказывать помощь другим людям. Найдите такую профессию, которая бы способствовала этому.<br>Через творчество вы так же сможете увеличить денежный поток. Следует посмотреть на существующие вещи другими глазами и попробовать представить их в своем уникальном видении, тогда это будет пользоваться спросом и денежный канал раскроется. По закону Вселенной работа должна быть оплачиваемой, так как должен происходить обмен энергий. Если по какой-то причине вы боитесь брать деньги за свою работу, обязательно проработайте эту установку. Человек, с этой энергией,<br> готов работать бесплатно или за копейки, а потом обижается что его не оценили и не поблагодарили за труд.<br>
<br>Это восприятие себя как жертвы. Такое случается, также, когда вы занимаетесь служением другим, но на каком-то этапе не получаете обратной связи или вознаграждения. Из-за этого вы можете впадать в состояние жертвы. Вам следует научиться говорить нет, когда не хочется нагружать себя чужой работой.
<br><br>
Что блокирует энергию:<br>
Состояние жертвы. Неумение говорить нет.`;
moneyPanelItem.appendChild(paragraph);
break;
}
case 13: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(13) Чтобы раскрыть максимально денежный потенциал, необходимо отказаться от страха идти во что-то новое, перестать цепляться за старую работу, которая не устраивает.
<br>Если вы сейчас чувствуете, что денег не хватает, то важно кардинально изменить сферу деятельности. Перед вами постоянно ставится задача — научиться отпускать все старое и отжившее, привлекая новое в жизнь. Эта энергия перемен и трансформации, поэтому не нужно боятся идти в новое. Там вы обретете рост и новый уровень дохода.
<br><br>
Что блокирует энергию:<br>
Застой в профессии, апатия, лень`;
moneyPanelItem.appendChild(paragraph);
break;
}
case 14: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(14) Особенно важно для данной энергии прислушиваться к голосу Души . Также подойдет реализация в сферах, связанных с творчеством, искусством и целительством.
<br>Вы понимаете мир посредством своей интуиции и тянитесь к прекрасному. Деньги будут приходить через творчество и самовыражение: художник. искусствовед…
<br>Вам постоянно будут идти проверки и испытания: действительно ли вы занимаетесь тем, что желает душа. Поэтому ваша основная задача — идти за своим сердцем, слушать только себя. Важно всей душой любить работу<br> — это открывает финансовый поток.
<br><br>
Что блокирует энергию:<br>
Чёрствость, зависимости, душевная неуравновешенность, отсутствие меры во всём`;
moneyPanelItem.appendChild(paragraph);
break;
}
case 15: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(15) Постоянные искушения легкими деньгами. Важно не идти в какие-то краткосрочные проекты, не идти в желание быстро и легко заработать, не играть в азартные игры, а напротив важно найти то дело, в котором сможете полноценно развиваться. Быть полезным людям.
<br>В вашу жизнь могут приходить достаточно большие деньги, но важно отслеживать каким они путем они идут: честным через ваш труд и пользу людям, или же они будут получены через мошенничество, через преступление законов.
Необходимо преодолевать в себе все привязанности, но принимать деньги за свой труд.<br>
У вас будут идти постоянные проверки на гордыню, на искушение, на зависимости. <br>
<br>
Что блокирует энергию:<br>
Азартные игры, мошенничество, краткосрочные проекты с целью получить быстрее прибыль.`;
moneyPanelItem.appendChild(paragraph);
break;
}
case 16: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(16) В человеке есть энергия поменять все, полностью разрушить старое и отжившее и выстроить на руинах новое, лучшее. Не бояться идти в какую-то новую деятельность, абсолютно может быть противоположную тому, чем занимаетесь сейчас. Чем кардинальнее вы сможете поменять эту сферу, тем лучше для вас будет это отражаться на денежном канале. Зачастую можете сильно зависать на своей старой работе или сфере деятельности и очень бояться ее поменять.<br> Необходимо сделать этот шаг и пойти во что-то новое.
<br><br>
Если у вас постоянные проблемы с деньгами — значит, вы зациклились на мире материи.<br>
Необходимо подняться над лабиринтом и посмотреть на ситуацию сверху. Работайте над внутренней гармонией. Прислушаться к своей душе<br> и идите в эту сторону.<br>
Ищите себя в деятельности, связанной<br> с полной трансформацией.<br>
<br>
Что блокирует энергию:<br>
Разрушительные эмоции. Нежелание духовно развиваться. Узость мышления. Безбашенность, чрезмерный риск. Хаос в жизни.<br>`;
moneyPanelItem.appendChild(paragraph);
break;
}
case 17: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(17) Энергия звезды. Быть ярким, быть примером, заряжать и вдохновлять людей. Вы заработаете деньги своим творчеством и творчество вносите в свой бизнес. Необходимо реализоваться в социуме, финансово и творчески. Есть возможность стать лучше других в определенной сфере, стать звездой. Однако, если загордитесь(поставите себя выше других), жизнь сразу выдаст уроки - упадут доходы, вас забудут, случится творческий кризис.
<br><br>
Что блокирует энергию:<br>
Звездная болезнь, гордыня. Внутренняя агрессия
`;
moneyPanelItem.appendChild(paragraph);
break;
}
case 18: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(18) Для максимального раскрытия денежного канала, необходимо идти в эзотерическое, мистическое, в работу с психологией. Вам так же нужно развивать творческий потенциал и монетизировать его. Вы умеете воплощать свои образы, визуализации в жизни. Все, что связанно с визуализацией и магией (как в прямом, так и переносном смысле слова) увеличит денежный поток.
Представляйте себя богатым человеком, конечный результат. Повторяйте положительные аффирмации о деньгах. Это приумножит ваш достаток.
<br><br>
Что блокирует энергию:<br>
Дар визуализации работает и в негативную сторону (если есть боязнь безденежья — это так же материализуется).<br>
Все отрицательные мыслеформы будут воплощаться в жизнь.
`;
moneyPanelItem.appendChild(paragraph);
break;
}
case 19: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(19) Деньги приходят через понимание высших законов бытия. Для развития денежного канала важен свой бизнес, ораторские выступления и глобальные проекты с большим количеством людей. Создавайте новые рабочие места, дайте им возможность расти и зарабатывать вместе с вами.<br>
Учитесь выступать на широкую публику, для вас это откроет большой денежный потенциал.<br>
Вы умеете обогревать своим светом большое количество людей. Хорошие организаторы, спикеры, прирожденные лидеры. Люди к вам тянуться.<br>
Делитесь, не только пользой, но и деньгами. Благотворительность приумножит ваш финансовый поток.<br>
Для процветания важно работать с детьми и наладить отношения с ближайшими родственниками (братьями или сестрами). Нельзя с ними вести имущественные споры. Откройте свое внутреннее солнце через принятие в себе непосредственного ребенка. Учитесь радоваться простым вещам, жить сдержанно, без излишеств и запросов.<br>
<br><br>
Что блокирует энергию:<br>
Чувство вины. Гордыня.<br>
Гиперконтроль.<br>`;
moneyPanelItem.appendChild(paragraph);
break;
}
case 20: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(20) Необходимо посмотреть, проработать родовые отношения, установки<br> и программы, так как отношения с родом и родителями сильнее всего влияет на раскрытие денежного канала.<br>
В основном, это то, что деньги достаются только тяжелым трудом, что деньги - зло и тд.<br>
<br>Проанализируйте, как ваши родители относились к деньгам. Были ли в семьях одинаковые финансовые программы. Отследите, наличие таких установок в себе и выпишите их. Поработайте с психологом или коучем. Такая работа обязательно<br> приведет в финансовому росту. Простите родителей и не осуждайте их.<br>
<br>Возможно, поток денег через семейный бизнес.
<br><br>
Что блокирует энергию:<br>
Чем больше осуждаете родителей — тем больше блокируете денежный поток.
`;
moneyPanelItem.appendChild(paragraph);
break;
}
case 21: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(21) Масштабироваться, не бояться расширять круг интересов, возможно путешествовать, изучать иностранные языки, выходить в интернет и вести за собой большое количество людей. Необходимо ставить перед собой большие финансовые цели. Вы можете зарабатывать в любой точке мира, путешествовать и не иметь ограничений.
<br>Заниматься миротворческой деятельностью, объединять и мирить людей. Ставить глобальные цели и вдохновлять на них людей.
<br><br>
Ограничивать свою деятельность, вести неэкологичный бизнес
`;
moneyPanelItem.appendChild(paragraph);
break;
}
case 22: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(22) Максимальная денежная реализация происходит, когда вы организуете себе пассивный доход, позволяя себе свободу таким образом и приток денег. Поэтому ваша основная задача — создать финансовую независимость в жизни.<br>
<br>Вам постоянно будут идти проверки на зацепку за деньги, насколько легко вы их впускаете в свою жизнь и отпускаете их. Вам не рекомендуется работать на работе, где фиксированный график.
<br>Лучше выбрать деятельность, с оплатой за результат, где вы сами решаете сколько хотите работать и зарабатывать. При этом свободно тратите деньги, с легкостью впуская их в свою жизнь. Для вас важна не профессия, а чувство свободы в ней.<br>
<br><br>
Что блокирует энергию денег:<br>
Зацепки, ограничение свободы, зависимости, жадность до денег, до власти.
`;
moneyPanelItem.appendChild(paragraph);
break;
}}
})
const text3=document.createElement('p');
text3.innerHTML='Как раскрыть денежный поток';
text3.style.fontWeight='700';
moneyPanelItem.appendChild(text3);
Array.from(uniqNumbers2).map((item)=> {
switch (item){
case 2: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(2) - Убрать эгоизм
<br>- Научиться доверять людям
<br>- Не очаровываться друзьями (особенно друзьями по бизнесу)
<br>- Уметь сохранять дружеские отношения, но подходить к делам рационально
<br>- Развивать интуицию
<br>- Создавать плоды своей деятельности.
<br>Не только тусоваться, но стремиться увидеть плоды деятельности..`;
moneyPanelItem.appendChild(paragraph);
break;
}
case 3: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(3) - Создавать вокруг красоту. Это очень влияет на ваш финансовый поток. Ваш внешний вид - не мелочь!
<br>- Вы должны быть окружены красотой и уметь эту красоту создавать.
<br>- Заниматься творчеством и благотворительностью
<br>- Наладить отношения с матерью. Это очень важно !!!
<br>- Построить добрые отношения с женщинами
<br>- Заботиться о продолжении рода.
<br>Часто рождение детей и забота о детях изменяет финансовое состояние в лучшую сторону.
<br>- Принять свою судьбу, перестать жаловаться на судьбу. Если в этой точке 3, то может быть такое искушение.`;
moneyPanelItem.appendChild(paragraph);
break;
}
case 4: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(4) - Проявление силы и власти в соединении с милосердием.
<br>- Уважать потребности других
<br>- Наладить отношения с отцом. Относиться к нему с уважением, но при этом проявлять
самостоятельность.
<br>- Заботиться о силе рода.
<br>- Научиться отвечать за свои поступки и признавать, а также исправлять свои ошибки. Для тех у кого в этой точке 4 признавать ошибки бывает трудно, но надо уметь это делать.`;
moneyPanelItem.appendChild(paragraph);
break;
}
case 5: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(5) - Соединять духовное с материальным, через поток знаний.
<br>- Уметь от сложных знаний брать часть и делать ее доступной окружающим людям. Сделать это
знание более земным, материальным.
<br>- Важно договариваться о правилах игры ещё"" на берегу"".
Не начинать работу, пока не заключен договор, не оговорены условия. Не вовлекаться в
кажущийся интересным проект, пока не договорились о условиях работы.
<br>- Если решили создать семью, то все должно быть четко оговорено заранее. Лучше официальный брак. Это влияет и на финансовое положение тоже.
<br>- Передача знаний. Даже если не работаешь учителем, можно поделиться знанием или навыками с детьми, друзьями
<br>- Укреплять семью. От отношений в семье зависит денежный поток.`;
moneyPanelItem.appendChild(paragraph);
break;
}
case 6: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(6) Романтичная энергия и, казалось бы, совсем не про деньги и тем не менее это все влияет на
финансовые потоки.
<br>- Учиться любить бескорыстно. Нет отношениям по расчету
<br>- Уметь делать выбор и не жалеть о последствиях выбора.
Выбрав одно не возвращаться мысленно к другому варианту.
Дать себе возможность увидеть плоды своего выбора, жить в своем выборе.
Если метаться, то результата не будет ни там, ни там.
<br>- Не манипулировать людьми
<br>- Доверять окружению.
<br>- Создавать красоту. Как и у 3 здесь важна красота вокруг.
<br>Даже если работаешь дома, то стол, заставка на компьютере, чашка из которой пьешь кофе и
домашние тапочки должны быть красивыми. Внешний вид тоже важен.`;
moneyPanelItem.appendChild(paragraph);
break;
}
case 7: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(7) - Не бояться озвучивать и записывать свои мысли. Заявите о себе!
<br>- Важно выбрать какую-то глобальную, высокую цель и двигаться к ней.
<br>Главное, чтобы она была такой, к которой будет хотеться идти. Это не что-то мелкое, бытовое.
<br>Нужно что-то более амбициозное. За вами к этой цели пойдут и другие люди.
<br>- В реализации цели опираться на коллектив. Не тянуть все на себе.
<br>- Примирить враждебные стороны конфликта, если такие есть в коллективе.
<br>- Не лениться и не проявлять агрессию`;
moneyPanelItem.appendChild(paragraph);
break;
}
case 8: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(8) - Изучать законы причинно - следственных связей.
<br>- Пересмотреть родительские установки, возможно изменить их. Стать взрослым.
<br>- Сохранять эмоциональный баланс
<br>- Не тянуться выяснять отношения через суд, а довериться Высшему закону справедливости.
<br>- Быть честным
<br>- Создавать систему во всем.`;
moneyPanelItem.appendChild(paragraph);
break;
}
case 9: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(9) - Постигать скрытые знания.
<br>- Собрать круг единомышленников и передавать им эти знания.
<br>- Учиться создавать отношения с людьми, но не бояться своего одиночества.
Помнить что люди вам нужны.
<br>- Делать ревизию прошлого
<br>- Постараться сократить расходы.`;
moneyPanelItem.appendChild(paragraph);
break;
}
case 10: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(10) - Научиться доверять высшим силам и делать выбор интуитивно
<br>- Благодарно принимать дары и предложения от социума
<br>- Пользоваться подсказками
<br>- Быть щедрыми на волне успеха
<br>- Расслабиться, не напрягаться и ждать
<br>Вселенная всегда предложит свой вариант
<br>Для 10 это сложно, потому что они не могут расслабиться и суетятся.
<br>В этом состоянии они не могут поймать свою волну.`;
moneyPanelItem.appendChild(paragraph);
break;
}
case 11: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(11) - Не добиваться желаемого силой
<br>- Перестать зависеть от мамы.
<br>- Раскрыть свою сексуальность.
<br>- Созидать благодаря качеству, а не кол-ву.
<br>- Научиться уступать в спорах и конфликтах.
<br>- Использовать силу природы и стихии для движения вперёд .`;
moneyPanelItem.appendChild(paragraph);
break;
}
case 12: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(12) - Перестать жаловаться на мир.
<br>- Научиться говорить ""нет""
<br>- Брать достойную оплату за свой труд
<br>- Выровнять самооценку. Каждый день делать что-то для себя.
<br>- Научиться отпускать то, что созрело и браться за новый проект.
<br>- Найти свой путь служения людям.`;
moneyPanelItem.appendChild(paragraph);
break;
}
case 13: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(13) - Принимать перемены в жизни, как должное.
<br>- Доводить дела до завершения
<br>- Полезны поездки, смена окружения
<br>- Фиксировать знания. Если скопились знания - написать книгу, записать альбом.`;
moneyPanelItem.appendChild(paragraph);
break;
}
case 14: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(14) - Открыть творческий канал
<br>- Научиться умеренности и терпению
<br>- Научиться принимать неопределенность
<br>- Преодолеть плохие привычки и зависимости (хоть одну для начала)
<br>- Обращаться за помощью к высшим силам.`;
moneyPanelItem.appendChild(paragraph);
break;
}
case 15: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(15) - Принять свою теневую сторону
<br>- Научиться говорить людям о их недостатках мягко и корректно
<br>"" Правду следует подавать так, как подают пальто, а не швырять в лицо, как мокрое
полотенце.""
<br>Марк Твен
<br>- Освободиться от зависимости и вредной привычки (хоть от одной суметь избавиться)
<br>- Не манипулировать людьми
<br>- Достойно пройти испытание большими деньгами, не польститься на нечестные деньги (есть
вероятность, что такие соблазны могут появиться)`;
moneyPanelItem.appendChild(paragraph);
break;
}
case 16: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(16) Человек может получать яркие и неожиданные уроки жизни. Энергия может встряхивать человека с такой силой, что освобождает его от любых материальных радостей. Все это для того, чтобы он задумался о духовном. Ему ничего не остаётся, кроме как искать чего-то большего. Энергия требует стать духовным лидером для других людей.
<br>- Здесь нужно с благодарностью принимать перемены
<br>- Духовно развиваться и открыть духовные знания для других людей. Не обязательно быть
проповедником.
<br>Можно и подбадривать людей, находящимся рядом, но для этого нужно найти в себе свой
внутренний стержень.
<br>- Соблюдать духовные законы и аскезы для дальнейшего роста
<br>Здесь важна и энергоподпитка эгрегора. Например родового, религиозного и т.д. Нужно изучать
законы этого эгрегора`;
moneyPanelItem.appendChild(paragraph);
break;
}
case 17: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(17) - Раскрыть потенциал. Выйти на сцену, показать себя.
<br>- Пережить крушение идеалов и остаться верным своему таланту.
<br>- Раскрываться в творчестве искренне, на примерах из собственной жизни. Максимум
самовыражения.
<br>- Исцелить гордыню
<br>- Выровнять самооценку и выйти из состояния ""серой мышки"".
<br>Вам важно быть ярким и заметным. И про рекламу не забывать!`;
moneyPanelItem.appendChild(paragraph);
break;
}
case 18: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(18) - Перестать сомневаться в своих возможностях.
<br>Человек с 18 энергией, буквально наполнен страхами и они могут сковывать его.
<br>- Создавать успешные образы в своем воображении. Применить силу визуализации.
<br>- Исцелять страхи
<br>- Принять силу своей сексуальной природы.
<br>18 энергия наполнена сексуальностью, но это скрытая мягкая сексуальность. Важно изучать и принимать
ее. Это помогает и в проработке страхов.
<br>Не должно быть активности с перебором, но и не должно быть аскезы
<br>- Изучать науки, влияющие на психическую природу человека. Это тоже может быть ключом к
финансовым потокам.
<br>- Найти свой особенный путь.
<br>Ни за кем вам идти не придется. Ваша дорога может идти через бурелом. У вас своя личная
дорога.`;
moneyPanelItem.appendChild(paragraph);
break;
}
case 19: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(19) Люди с 19 энергией в этой точке, уже получают карт-бланш.
<br>- Очень важно исцелить внутренне чувство вины и агрессии на себя. Это все вам очень вредит
<br>- Научиться радоваться простым вещам, как ребенок.
<br>- Найти соц. реализацию по душе.
<br>Если финансовые потоки не открыты, то нужно найти дело для души, для радости. Пусть это
будет ваше хобби вначале.
<br>Даже если сразу вы за это не получаете за это денег, то Вселенная пойдет вам навстречу.
<br>Вам надо помнить, что есть люди, которые заворожены вашей радостью.
<br>Когда вы делаете что-то в таком состоянии, то становитесь как Солнышко - это притягивает к вам и новые возможности.
<br>Надо уметь развлекаться))
<br>А люди с 19 энергией в этой точке могут быть наоборот очень серьезными и не давать себе расслабиться.
<br>Когда попадаете на волну успеха, то важно уметь быть лидером для других.
<br>За вами идут люди.`;
moneyPanelItem.appendChild(paragraph);
break;
}
case 20: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(20) - Развить свою интуицию. Обострить ее максимально. Интуиция проявляется, как следствие объединения материального и духовного мира. Это становится возможным для тех, кто достиг определенного уровня развития. Если у вас в этой точке 20 энергия, то у вас есть ресурс открыть эту интуицию в себе
<br>- Узнать историю своего рода. Максимально! Тщательно покопаться в этой истории. Погрузиться в нее настолько глубоко, чтобы суметь понять, что чувствовал твой родной человек в тот или иной момент.
<br>Принять тот факт, что любой человек в родовой системе будет твоим родным человеком. Понять и принять свой род. Принять и отпустить. Это становится возможным, когда погружается в историю
рода достаточно глубоко. Приходит глубина понимания.
<br>- Помогать своему роду. Проще говоря, оказать кому-то из родственников помощь, поддержать его. Особенно если это касается того, о чем мечтаешь сам.
<br>- Отказаться от отживших привычек и связей, осознать и пересмотреть родовые сценарии и
принять себя нового.`;
moneyPanelItem.appendChild(paragraph);
break;
}
case 21: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(21) Энергия связывает множество элементов и покрывает весь земной шар.
<br>- Если 21 энергия в этой точке, то важно расширить рамки своего мышления, выйти из колеи, снять шоры с глаз.
<br>- Путешествовать по миру. Ваш дом может ездить за вами. Общаться с людьми. Узнавать разные культуры.
<br>- Не брать и не давать денег в долг.
<br>- Избавиться от страхов повторить родительские сценариии
<br>- Следить за физическим здоровьем, вовремя делать диагностику, правильно питаться.
<br>- Помнить, что возможно ваши деньги где-то за рубежом. Скорее всего, там они и будут.`;
moneyPanelItem.appendChild(paragraph);
break;
}
case 22: {
let paragraph=document.createElement('p');
paragraph.innerHTML=`(22) - Возможность начинать все с чистого листа.
<br>- Не цепляться за материальные ценности. Парадокс, но это надо принять. Это может быть очень сложно сделать.
<br>- Скорее всего в суде вы проиграете, если будете отстаивать свои финансовые интересы.
<br>- Не ограничивать свободу других людей. Это очень важно!
<br>- Если в этой точке стоит 22, то, на первый взгляд, рекомендации могут выглядеть как призыв к финансовой безответственности, но для самого человека это будет шаг вперед.
<br>- Радоваться жизни и нести веселье людям (почти бременские музыканты)
<br>- Путешествовать по миру.
<br>- Избавляться от зависимостей. Не допускать алкогольной зависимости.`;
moneyPanelItem.appendChild(paragraph);
break;
}}
})
}
let M=calculation(G4+C2);
moneyPanelContentCreate(M, [G4,C2], [C, C1]);
const B1Diagram=document.querySelector('#B1_diagram');
const B2Diagram=document.querySelector('#B2_diagram');
const B3Diagram=document.querySelector('#B3_diagram');
const E1Diagram=document.querySelector('#E1_diagram');
const E2Diagram=document.querySelector('#E2_diagram');
const F1Diagram=document.querySelector('#F1_diagram');
const F2Diagram=document.querySelector('#F2_diagram');
const A1Diagram=document.querySelector('#A1_diagram');
const A2Diagram=document.querySelector('#A2_diagram');
const A3Diagram=document.querySelector('#A3_diagram');
const C1Diagram=document.querySelector('#C1_diagram');
const C2Diagram=document.querySelector('#C2_diagram');
const YDiagram=document.querySelector('#Y_diagram');
const XDiagram=document.querySelector('#X_diagram');
const H1Diagram=document.querySelector('#H1_diagram');
const H2Diagram=document.querySelector('#H2_diagram');
const G1Diagram=document.querySelector('#G1_diagram');
const G2Diagram=document.querySelector('#G2_diagram');
const G4Diagram=document.querySelector('#G4_diagram');
const LDiagram=document.querySelector('#L_diagram');
const MDiagram=document.querySelector('#M_diagram');
const D1Diagram=document.querySelector('#D1_diagram');
const D2Diagram=document.querySelector('#D2_diagram');
B1Diagram.innerHTML=B1;
B2Diagram.innerHTML=B2;
B3Diagram.innerHTML=B3;
E1Diagram.innerHTML=E1;
E2Diagram.innerHTML=E2;
F1Diagram.innerHTML=F1;
F2Diagram.innerHTML=F2;
A1Diagram.innerHTML=A1;
A2Diagram.innerHTML=A2;
A3Diagram.innerHTML=A3;
C1Diagram.innerHTML=C1;
C2Diagram.innerHTML=C2;
XDiagram.innerHTML=X;
YDiagram.innerHTML=Y;
H1Diagram.innerHTML=H1;
H2Diagram.innerHTML=H2;
G1Diagram.innerHTML=G1;
G2Diagram.innerHTML=G2;
G4Diagram.innerHTML=G4;
LDiagram.innerHTML=L;
MDiagram.innerHTML=M;
D1Diagram.innerHTML=D1;
D2Diagram.innerHTML=D2;