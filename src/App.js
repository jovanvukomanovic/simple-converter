// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`
import { useState, useEffect } from "react";

export default function App() {
  const [amount, setAmount] = useState(0);
  const [firstCurrency, setFirstCurrency] = useState("EUR");
  const [secondCurrency, setSecondCurrency] = useState("USD");
  const [output, setOutput] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  async function getCurrencies() {
    setIsLoading(true);
    const res = await fetch(
      `https://api.frankfurter.app/latest?amount=${amount}&from=${firstCurrency}&to=${secondCurrency}`
    );
    const data = await res.json();
    // setOutput(data.rates[secondCurrency]);
    setOutput(Object.values(data.rates)[0]);
    setIsLoading(false);
  }

  console.log(output);

  useEffect(() => {
    if (firstCurrency === secondCurrency) return setOutput(amount);
    getCurrencies();
  }, [amount, firstCurrency, secondCurrency]);

  console.log(output);
  return (
    <div>
      <input
        type="text"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        // disabled={isLoading}
      />

      <select
        onChange={(e) => setFirstCurrency(e.target.value)}
        disabled={isLoading}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>

      <select
        onChange={(e) => setSecondCurrency(e.target.value)}
        disabled={isLoading}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <p>
        {output} {secondCurrency}
      </p>
    </div>
  );
}
