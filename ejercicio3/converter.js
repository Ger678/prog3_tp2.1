class Currency {
    constructor(code, name) {
        this.code = code;
        this.name = name;
    }
}

class CurrencyConverter {
    apiUrl;
    currencies;

    constructor() {
        this.apiUrl = "https://cdn.dinero.today/api/latest.json"; 
        Source: https://dinero.today/pages/api;
        this.currencies = [];
        this.currenciesName = [];
    }

    async getCurrencies() {
        try {
            const response = await fetch(`${this.apiUrl}/`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            this.currencies = data;

        } catch (error) {
            console.error('There has been a problem with your fetch operation:', error);
        }
    }

    async getCurrenciesName(){
        try {
            const response = await fetch(`https://cdn.dinero.today/api/currency.json`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            this.currenciesName = data;

            // console.log(data);
        } catch (error) {
            console.error('There has been a problem with your fetch operation:', error);
        }
    }
    

    convertCurrency(amount, fromCurrency, toCurrency) {
        console.log(amount, fromCurrency, toCurrency);

        const fromCurrencyValue = Othis.currencies.rates[fromCurrency];
        const toCurrencyValue = Othis.currencies.rates[toCurrency];

        debugger;
            // this.currencies.find(toCurrency)
    }
}

document.addEventListener("DOMContentLoaded", async () => {
    const form = document.getElementById("conversion-form");
    const resultDiv = document.getElementById("result");
    const fromCurrencySelect = document.getElementById("from-currency");
    const toCurrencySelect = document.getElementById("to-currency");

    const converter = new CurrencyConverter();

    await converter.getCurrencies();
    await converter.getCurrenciesName();
    populateCurrencies(fromCurrencySelect, converter.currencies, converter.currenciesName);
    populateCurrencies(toCurrencySelect, converter.currencies, converter.currenciesName);

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const amount = document.getElementById("amount").value;
        const fromCurrency = document.getElementById('from-currency').value;
        const toCurrency = document.getElementById('to-currency').value;

        const convertedAmount = await converter.convertCurrency(
            amount,
            fromCurrency,
            toCurrency
        );

        if (convertedAmount !== null && !isNaN(convertedAmount)) {
            resultDiv.textContent = `${amount} ${
                fromCurrency.code
            } son ${convertedAmount.toFixed(2)} ${toCurrency.code}`;
        } else {
            resultDiv.textContent = "Error al realizar la conversión.";
        }
    });

    function populateCurrencies(selectElement, currencyValues, currencyNames) {

        const currencyNameMap = {};
            currencyNames.data[0].items.forEach(item => {
                currencyNameMap[item.c] = item.n;
            });

            const rates = Object.keys(currencyValues.rates);
            for (let index = 0; index < rates.length; index++) {
                const code = rates[index];
                if (currencyNameMap[code]) {
                    const option = document.createElement("option");
                    option.value = code;
                    option.textContent = `${currencyNameMap[code]} (${code}) - ${currencyValues.rates[code]}`;
                    selectElement.appendChild(option);
                }
            }
        }

});
