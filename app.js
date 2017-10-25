
let apikey = '064a62f7c81041e0a7476bf51f76d403'
let inputCidade = ''

let inputfield = document.querySelector('#citysearch')
let botaoPesquisar = document.querySelector('#citysubmit')
let result = document.querySelector('#pesquisa_result')
let form = document.querySelector('form')

botaoPesquisar.addEventListener("click", function(event){
  console.log('click')
  event.preventDefault()
  inputCidade = inputfield.value
  inputCidade = inputCidade.replace(/\s/g,'+')
  let url = `https://api.weatherbit.io/v2.0/current?city=${inputCidade}&lang=pt&key=${apikey}`
  let urlForecast = `https://api.weatherbit.io/v2.0/forecast/3hourly?city=${inputCidade}&lang=pt&key=${apikey}`

  fetch(urlForecast)
  .then(values => values.json())
  .then(function(values){

    //values = values.data[0]
    console.log(values.city_name)

    result.innerHTML = '' //SOCORRO GAMBIARRA!!!
    result.appendChild(geraRESHTML(values))
    alteraBg(values.data[0])
    form.reset()
    inputfield.blur()
  }) //FIM DO FETCH
})

let geraRESHTML = function(values)
{

  let info = values.data[0]
  let result = document.createElement('div')
  result.classList.add("cidade_result")
  let resultChilds = []

  resultChilds.push(geraInfosCidade(`${values.city_name}, ${values.state_code} - ${values.country_code}`, "text_result_city"))

  let img = document.createElement('img')
  img.src = `icons/${info.weather.icon}.png`
  img.classList.add('clima_icon')
  resultChilds.push(img)

  resultChilds.push(geraInfosCidade(`${Math.trunc(info.temp)}ºC ${info.weather.description}`, "text_result_temp"))
  resultChilds.push(geraInfosCidade(`<em>MIN:</em> 16º  <em>MAX:</em> 25º`, "text_result_info"))
  resultChilds.push(geraInfosCidade(` Sensação <em>${info.app_temp}ºC</em>`, "text_result_info"))
  resultChilds.push(geraInfosCidade(`Vento <em>${info.wind_spd}m/s</em>`, "text_result_info"))
  resultChilds.push(geraInfosCidade(`Humidade <em>${info.rh}%</em>`, "text_result_info"))

  resultChilds.push(geraTableForecast(values))

  resultChilds.forEach(child => result.appendChild(child))

  return result
}


function geraInfosCidade(dado, classe)
{
  let elemento = document.createElement('p')
  elemento.innerHTML = dado
  elemento.classList.add(classe)
  return elemento
}

function alteraBg(info)
{
  document.body.classList.value = ''
  if(info.weather.code < 800)
    document.body.classList.add('clima_fechado')
  else if(info.weather.code > 800)
      document.body.classList.add('clima_nublado')
  else {
        document.body.classList.add('clima_aberto')
  }

}


function geraTableForecast(values)
{
  let hoje = new Date().getDay()
  let table = document.createElement('table')
  let thead = document.createElement('thead')
  let tbody = document.createElement('tbody')
  let thead_tr = document.createElement('tr')
  let tbody_tr = document.createElement('tr')

  console.log(values.data[1])
  console.log("Data de hoje:" + hoje)
  for(let i = 1; i <= 5; i++)
  {
    let Hcel = document.createElement('th')
    let Bcel = document.createElement('td')
    Hcel.textContent = getDiaSemana( (hoje + i) > 6 ? (hoje + i)%6 - 1 : (hoje + i) )
    thead_tr.appendChild(Hcel)
    Bcel.innerHTML =  ` <img class="clima_icon" src= icons/${values.data[i].weather.icon}.png> </img> `
    tbody_tr.appendChild(Bcel)
  }

  thead.appendChild(thead_tr)
  tbody.appendChild(tbody_tr)
  table.appendChild(thead)
  table.appendChild(tbody)

  return table
}

function getDiaSemana(num)
{
  switch(num)
  {
    case 0:
      return "Dom"
    case 1:
      return "Seg"
    case 2:
      return "Ter"
    case 3:
      return "Qua"
    case 4:
      return "Quin"
    case 5:
      return "Sex"
    case 6:
      return "sab"
  }

}
