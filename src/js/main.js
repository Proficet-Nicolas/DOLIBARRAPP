/** API Token de l'utilisateur. */
let userToken = String();

/** Adresse IP du serveur Dolibarr. */
let serverIp = String();

/** Sous dossiers de l'URL de l'API. */
let serverFolders = String();

/** Obtenir la liste des comptes banquaires. */
function getBanksAccounts() {
  const headers = new Headers();
  headers.append('DOLAPIKEY', userToken);

  const fetchUrl = `http://${serverIp}${serverFolders}/api/index.php/bankaccounts?sortfield=t.rowid&sortorder=ASC&limit=100`;

  const requestOptions = {
    method: 'GET',
    headers,
    redirect: 'follow',
  };

  fetch(fetchUrl, requestOptions)
    .then((response) => response.text())
    .then((res) => {
      for (const element of JSON.parse(res)) {
        const bankAccount = {
          name: element.label,
          ref: element.ref,
        };

        const bankSelect = document.getElementById('bank');
        const code = `<option value="${bankAccount.ref}">${bankAccount.name}</option>`;
        bankSelect.innerHTML += code;
      }
    })
    .catch((err) => console.error(err));
}

/**
 * Cacher un élement de la vue.
 * @param { string } id ID de la balise HTML.
 */
function hideElement(id) {
  const element = document.getElementById(id);
  element.style.display = 'none';
}

/**
 * Afficher un élement de la vue.
 * @param { string } id ID de la balise HTML.
 */
function showElement(id) {
  const element = document.getElementById(id);
  element.style.display = 'block';
}

// Evènement à chaque fois que le formulaire d'identification est envoyé.
const authenticationForm = document.getElementById('authenticationForm');
authenticationForm.addEventListener('submit', (e) => {
  const dataLog = document.getElementById('login').value;
  const dataPass = document.getElementById('pwd').value;

  const dataIpd = document.getElementById('ipd').value;
  serverIp = dataIpd;

  const dataSod = document.getElementById('sod').value;
  serverFolders = dataSod;

  const url = `http://${dataIpd}${dataSod}/api/index.php/login?login=${dataLog}&password=${dataPass}`;

  const requestOptions = {
    method: 'GET',
    redirect: 'follow',
  };

  fetch(url, requestOptions)
    .then((response) => response.text())
    .then((result) => {
      const answerToken = JSON.parse(result);
      if (!answerToken.success) throw alert('Erreur: Veuillez vérifier les informations renseignées.');

      hideElement('authenticationSection');
      showElement('paymentSection');

      userToken = answerToken.success.token;
      getBanksAccounts(serverIp, serverFolders, userToken);
    })
    .catch((error) => {
      alert('Erreur: Veuillez vérifier les informations renseignées.');
      console.error(error);
    });

  e.preventDefault();
});

// Evènement à chaque fois que le formulaire de paiement est envoyé.
const dataPaymentForm = document.getElementById('paymentForm');
dataPaymentForm.addEventListener('submit', (e) => {
  const body = JSON.stringify({
    label: document.getElementById('label').value,
    type: document.getElementById('mode_reglement').value,
    cheque_number: document.getElementById('number').value,
    bank_account_ref: document.getElementById('bank').value,
    amount: document.getElementById('somme').value,
    date: (Math.round(Date.now() / 1000)).toString(),
  });

  const headers = new Headers();
  headers.append('DOLAPIKEY', userToken);
  headers.append('Content-Type', 'application/json');

  const requestOptions = {
    method: 'POST',
    headers,
    body,
    redirect: 'follow',
  };

  const url = `http://${serverIp}${serverFolders}/api/index.php/bankaccounts/1/lines`;

  fetch(url, requestOptions)
    .then((response) => response.text())
    .then((result) => alert(`Le paiement a été validé. (#${result})`))
    .catch((error) => alert(`Erreur: ${error.toString()}`));

  e.preventDefault();
});

// Évènement lorsque l'utilisateur rentre un fichier à envoyer.
const fileInput = document.getElementById('fileInput');
fileInput.addEventListener('change', (input) => {
  if (input.files && input.files[0]) {
    const reader = new FileReader();
    reader.onload = (e) => {
      // eslint-disable-next-line no-undef
      $('#showSelectedImage')
        .attr('src', e.target.result)
        .showElement();
    };
    reader.readAsDataURL(input.files[0]);
  }
});


hideElement('paymentSection');
