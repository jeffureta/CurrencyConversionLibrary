/**
 * Converts a given amount from USD or GBP to PHP.
 * The base currency can be specified as either 'USD' or 'GBP', defaulting to 'USD'.
 *
 * @param {number} amount - The amount in the base currency to convert.
 * @param {string} [baseCurrency='USD'] - The base currency code ('USD' or 'GBP'). If not specified, 'USD' is used.
 * @return {number} The converted amount in PHP.
 * @customfunction
 */
function convertToPHP(amount, baseCurrency = 'USD') {
 
  const scriptProperties = PropertiesService.getScriptProperties();
  const apiKey = scriptProperties.getProperty("API_KEY");
  const url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${baseCurrency.toUpperCase()}`;

  try {
    const response = UrlFetchApp.fetch(url); // Make a GET request in Google AppScript.
    const data = JSON.parse(response.getContentText()); 

    if (data.result === "success") {
      /** 
       This is how the JSON is written. 
       {
          "result": "success",
          "documentation": "https://www.exchangerate-api.com/docs",
          "terms_of_use": "https://www.exchangerate-api.com/terms",
          "time_last_update_unix": 1707868801,
          "time_last_update_utc": "Wed, 14 Feb 2024 00:00:01 +0000",
          "time_next_update_unix": 1707955201,
          "time_next_update_utc": "Thu, 15 Feb 2024 00:00:01 +0000",
          "base_code": "USD",
          "conversion_rates": { 
            "PHP": 56.0737,
            },
        }
      */
      const rate = data.conversion_rates.PHP;
      const convertedAmount = amount * rate;
      Logger.log(`Converted Amount: ${convertedAmount} PHP`);
      return convertedAmount;
    } else {
      Logger.log('Error fetching conversion rate:', data['error-type']);
      return "Error: Unable to fetch conversion rate";
    }
  } catch (error) {
    Logger.log('Error fetching conversion:', error.toString());
    return "Error: Exception during API request";
  }
}

function helloWorld() {
  return 'Hello, world';
}

function testFunction() {
  return convertToPHP(100, 'GBP')
}