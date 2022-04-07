//Récupération liste d'écriture
var myHeaders = new Headers();
myHeaders.append("DOLAPIKEY", "ad13baa28f476a97a7f15d05fce727c3049ba5a1");

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

fetch("http://10.0.52.44/dolibarr/api/index.php/bankaccounts/1/lines", requestOptions)
  .then(response => response.json())
  .then((result) => {
      console.log(result);
      let Ref = '<ul>';
      for (let list of result){
          Ref += `<p>${list.ref}</p>`
      }
      Ref += '</ul>';
      document.querySelector("#ref").innerHTML = Ref;

      let Desc= '<ul>';
      for (let list of result){
          Desc += `<p>${list.label}</p>`
      }
      Desc += '</ul>';
      document.querySelector("#description").innerHTML = Desc;

      let DateO= '<ul>';
      for (let list of result){
          DateO += `<p>${list.dateo}</p>`
      }
      DateO += '</ul>';
      document.querySelector("#date_operation").innerHTML = DateO;

      let DateV= '<ul>';
      for (let list of result){
          DateV += `<p>${list.datev}</p>`
      }
      DateV += '</ul>';
      document.querySelector("#date_valeur").innerHTML = DateV;

      let Type= '<ul>';
      for (let list of result){
        Type += `<p>${list.fk_type}</p>`
      }
      Type += '</ul>';
      document.querySelector("#type").innerHTML = Type;

      let Num= '<ul>';
      for (let list of result){
        Num += `<p>${list.num_chq}</p>`
      }
      Num += '</ul>';
      document.querySelector("#numero").innerHTML = Num;

      let compteB= '<ul>';
      for (let list of result){
        compteB += `<p>${list.bank_account_ref}</p>`
      }
      compteB += '</ul>';
      document.querySelector("#compte_bancaire").innerHTML = compteB;

      let DC= '<ul>';
      for (let list of result){
        DC += `<p>${list.amount}</p>`
      }
      DC += '</ul>';
      document.querySelector("#debit_credit").innerHTML = DC;
    })
  .catch(error => console.log('error', error))

