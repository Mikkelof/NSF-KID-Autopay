import { useState } from 'react';

const HomePage = () => {
    const [kidInput, setKidInput] = useState('');
    const [configValues, setConfigValues] = useState([
      { title: 'Beløp', value: '600' },
      { title: 'Mottaker kontonummer', value: '78740670025' },
      { title: 'Ventetid mellom betalinger i ms', value: '2000' },
      { title: 'Url', value: 'https://district.danskebank.no/#/app?app=payments&path=%2FBN%2FBetaling-BENyInit-GenericNS%2FGenericNS%3Fq%3D1569587951868' },
      { title: 'Betalingsmelding', value: 'Lisens NSF' }
    ]);
  
    const handleKidInputChange = (event) => {
      setKidInput(event.target.value);
    };
  
    const handleConfigChange = (event, index) => {
      const newConfigValues = [...configValues];
      newConfigValues[index].value = event.target.value;
      setConfigValues(newConfigValues);
    };
  
    const handleCopyScript = () => {
      // Implement your logic to copy the script
      console.log(configValues[2].value);
      // You can use the 'script' variable to copy it to the clipboard or perform any other action
    };
  
    return (
      <div className="flex flex-col items-center">
        <h1 className="text-2xl font-bold mb-4">NSF KID AutoPay</h1>
        <div className="mb-4">
          <label htmlFor="kid-input" className="block font-semibold mb-1">KID nummere separert med komma</label>
          <textarea
            id="kid-input"
            type="text"
            value={kidInput}
            onChange={handleKidInputChange}
            className="w-64 h-32 px-4 py-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4 flex">
          {configValues.map((input, index) => (
            <div key={index} className="mr-8">
              <label htmlFor={`config-${index}`} className="block font-semibold mb-1">
                {input.title}
              </label>
              <input
                id={`config-${index}`}
                type="text"
                value={input.value}
                onChange={(event) => handleConfigChange(event, index)}
                className="w-32 px-2 py-1 border border-gray-300 rounded"
              />
            </div>
          ))}
        </div>
        <button
          onClick={handleCopyScript}
          className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 mb-6 rounded"
        >
          Kopier Script
        </button>
        <h2 className='text-xl font-bold mb-4'>Instrukser: </h2>
        <ul>
            <li>1. Installer Chrome extension fra følgende link: <a href="https://chrome.google.com/webstore/detail/uivision-rpa/gcbalfbdmfieckjlnblleoemohcganoc?hl=en">UI.Vision RPA</a></li>
            <li>2. Kopier alle KOMMASEPARERTE KID nummere fra google docs dokumentet fra styredriven. Her er det viktig å dobbeltsjekke at ALLE KID-nr er kommaseparerte</li>
            <li>3. Lim inn alle KID-nr fra den filen i den store boksen på toppen</li>
            <li>4. Sjekk at alle alternativene (Beløp, Kontonummer) stemmer</li>
            <li>5. Trykk på Kopier Script</li>
            <li>6. Lim inn scriptet i UI.Vision RPA</li>
            <li>7. SE OVER SCRIPTET OG SØRG FOR AT DET SER RIKTIG UT</li>
            <li>8. Kjør scriptet hvis det ser greit ut</li>
            <li>9. ETTER at alle betalinger er gjennomført må du slette alle KID-nr fra det google-docs dokumentet fra styredriven</li>
        </ul>
      </div>
    );
};

export default HomePage;