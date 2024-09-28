// API endpoint with your API key
const apiEndpoint = 'https://v6.exchangerate-api.com/v6/ed5eb32b408ba48a0ba32440/latest/USD';
const fromCurrency = document.getElementById('from-currency');
const toCurrency = document.getElementById('to-currency');
const amount = document.getElementById('amount');
const convertBtn = document.getElementById('convert-btn');
const result = document.getElementById('converted-amount');

// Fetch currency data and populate the dropdowns
async function populateCurrencyOptions() {
    const response = await fetch(apiEndpoint);
    const data = await response.json();
    const currencies = Object.keys(data.conversion_rates);

    currencies.forEach(currency => {
        const option1 = document.createElement('option');
        const option2 = document.createElement('option');
        option1.value = currency;
        option2.value = currency;
        option1.text = currency;
        option2.text = currency;
        fromCurrency.appendChild(option1);
        toCurrency.appendChild(option2);
    });

    // Set default values
    fromCurrency.value = 'USD';
    toCurrency.value = 'EUR';
}

// Convert currency
async function convertCurrency() {
    const amountValue = amount.value;
    if (amountValue === '' || amountValue <= 0) {
        alert('Please enter a valid amount.');
        return;
    }

    const from = fromCurrency.value;
    const to = toCurrency.value;

    // Fetch conversion rate
    const response = await fetch(`https://v6.exchangerate-api.com/v6/ed5eb32b408ba48a0ba32440/latest/${from}`);
    const data = await response.json();

    const rate = data.conversion_rates[to];
    const convertedAmount = (amountValue * rate).toFixed(2);
    result.textContent = `${amountValue} ${from} = ${convertedAmount} ${to}`;
}

// Event listeners
convertBtn.addEventListener('click', convertCurrency);
window.addEventListener('load', populateCurrencyOptions);
