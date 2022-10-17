
const myCep = document.getElementById('enviar_cep')
const btnOk = document.querySelectorAll('button')
const queryResult = document.getElementById('info')


btnOk[0].onclick = () => {
  let inputValue = myCep.value
  if (inputValue === "") {
    alert("Informe os números do CEP para efeutar a consulta.")
  }
  else if (inputValue < 8 || inputValue > 8) {
    alert("O CEP precisa conter 8 números.")
  }
  else {
    showInfo(inputValue)
  }  
  
}


const getCEP = (cep) => {
  return fetch(`https://viacep.com.br/ws/${cep}/json/`)
          .then(data => data.json())
          .catch(err => console.log(err))
}

const showInfo = async (cep) => {

  try {
    let data = await getCEP(cep)
    if (data.complemento === "") {
      data.complemento = "sem complemento"
    }
    queryResult.innerHTML = `
      <li><strong>Logradouro:</strong> ${data.logradouro}</li>
      <li><strong>Complemento:</strong> ${data.complemento}</li>
      <li><strong>Bairro:</strong> ${data.bairro}</li>
      <li><strong>Localidade:</strong> ${data.localidade}</li>
      <li><strong>Uf:</strong> ${data.uf}</li>
    `

  } catch (error) {
    console.log(error)
    alert("ATENÇÃO:\nNão foi possivel encontrar informações com base no CEP informado. Tente novamente!")
  }

}


/*
https://viacep.com.br/ws/${input}/json/
{
  "cep": "04428-040",
  "logradouro": "Rua Cleofonte Campanini",
  "complemento": "",
  "bairro": "Americanópolis",
  "localidade": "São Paulo",
  "uf": "SP",
  "ibge": "3550308",
  "gia": "1004",
  "ddd": "11",
  "siafi": "7107"
}
http://ip-api.com/json/208.80.152.201
*/
