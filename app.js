
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
  let urlCapitaisTable = `https://api.weatherbit.io/v2.0/forecast/3hourly?&lang=pt&key=${apikey}&cities=3390760,3451190,3448439,3470127`
  console.log(url)

// TRECHO DE TESTE SEM REQUISIÇÃO http
/*
values = {"data":[{"rh":51,"pod":"d","pres":1008,"timezone":"America\/Fortaleza","weather":{"icon":"c02d","code":"700","description":"Poucas nuvens"},"country_code":"BR","clouds":25,"ts":1506513600,"wind_spd":2.6,"wind_cdir_full":"Sudeste","app_temp":31.43,"lon":-42.71,"state_code":"20","vis":10,"slp":1014,"h_angle":-30,"dewpt":18.93,"precip":null,"uv":4,"sunset":"20:46","elev_angle":49,"station":"SBTE","dhi":678.6,"city_name":"Joao Pessoa","lat":-3.89333,"sunrise":"08:37","datetime":"2017-09-27:12","temp":30.18,"ob_time":"2017-09-27 12:00","wind_dir":140,"wind_cdir":"SL"}],"count":1}
*/
//FIM TRECHO TESTE

  fetch(url)
  .then(values => values.json())
  .then(function(values){

    values = values.data[0]
    console.log(values.city_name)

    result.innerHTML = '' //SOCORRO GAMBIARRA!!!
    result.appendChild(geraRESHTML(values))
    alteraBg(values)
    form.reset()
    inputfield.blur()
  }) //FIM DO FETCH
})

let geraRESHTML = function(info)
{
  let result = document.createElement('div')
  result.classList.add("cidade_result")
  let resultChilds = []

  resultChilds.push(geraInfosCidade(`${info.city_name}, ${info.state_code} - ${info.country_code}`, "text_result_city"))

  let img = document.createElement('img')
  img.src = `icons/${info.weather.icon}.png`
  img.classList.add('clima_icon')
  resultChilds.push(img)

  resultChilds.push(geraInfosCidade(`${Math.trunc(info.temp)}ºC ${info.weather.description}`, "text_result_temp"))
  resultChilds.push(geraInfosCidade(`<em>MIN:</em> 16º  <em>MAX:</em> 25º`, "text_result_info"))
  resultChilds.push(geraInfosCidade(` Sensação <em>${info.app_temp}ºC</em>`, "text_result_info"))
  resultChilds.push(geraInfosCidade(`Vento <em>${info.wind_spd}m/s</em>`, "text_result_info"))
  resultChilds.push(geraInfosCidade(`Humidade <em>${info.rh}%</em>`, "text_result_info"))

  resultChilds.forEach(child => result.appendChild(child))
  console.log(result)
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
