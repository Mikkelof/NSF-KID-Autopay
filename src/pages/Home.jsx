import { useState } from 'react';

const HomePage = () => {
    const [kidInput, setKidInput] = useState('');
    const [configValues, setConfigValues] = useState([
      { title: 'Beløp', value: '600' },
      { title: 'Mottaker kontonummer', value: '78740670025' },
      { title: 'Ventetid mellom betalinger i ms', value: '2000' },
      { title: 'Url', value: 'https://district.danskebank.no/#/app?app=payments&path=%2FBN%2FBetaling-BENyInit-GenericNS%2FGenericNS%3Fq%3D1569587951868' },
      { title: 'Betalingsmelding', value: 'NSF Lisens' }
    ]);
  
    const handleKidInputChange = (event) => {
      setKidInput(event.target.value);
    };
  
    const handleConfigChange = (event, index) => {
      const newConfigValues = [...configValues];
      newConfigValues[index].value = event.target.value;
      setConfigValues(newConfigValues);
    };

    const createCommand = (command, target = "", value = "") => ({
        Command: command,
        Target: target,
        Value: value,
    });

    const generateNavigator = () => [
        createCommand("open", configValues[3].value),
        createCommand("selectFrame", "id=payments"),
        createCommand("selectFrame", "id=indhold"),
    ];

    const generateCIN = (cin) => [
        createCommand("click", "name=txiFraTxt"),
        createCommand("type", "name=txiFraTxt", configValues[4].value),
        createCommand("type", "name=txiTilKto", configValues[1].value),
        createCommand("type", "name=txiOCRRef", "" + cin),
        createCommand("type", "name=txiBetBel", "" + configValues[0].value),
        createCommand("clickAndWait", "id=lblBTSaveID"),
        createCommand("pause", configValues[2].value),
    ];
  
    const handleCopyScript = () => {
      const now = new Date();
      const obj = {
        Name: "NTNUISvommingAutopayer",
        CreationDate: now.getFullYear() + "-" + now.getMonth() + "-" + now.getDate(),
        Commands: [],
      };
      obj.Commands.push(...generateNavigator());

      kidInput.split("\n").forEach((cin) => {
        if (isNaN(cin) || cin.length < 1) return;
        obj.Commands.push(...generateCIN(cin));
      });
      const output = JSON.stringify(obj);
      navigator.clipboard.writeText(output);
    };
  
    return (
      <div className="flex flex-col items-center">
        <h1 className="text-2xl font-bold mb-4">NSF KID AutoPay</h1>
        <div className="mb-4">
          <label htmlFor="kid-input" className="block font-semibold mb-1">KID nummere (ett på hver linje)</label>
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
            <li>2. Kopier alle KID nummere fra Google Docs dokumentet fra styredriven</li>
            <li>3. Lim inn alle KID-nr fra den filen i boksen på toppen. Her er det viktig å dobbeltsjekke at ALLE KID-nr er på sin egen linje og det kun er KID-nr som er lagt inn</li>
            <li>4. Sjekk at alle alternativene (Beløp, Kontonummer) stemmer</li>
            <li>5. Trykk på Kopier Script</li>
            <li>6. Lim inn scriptet i UI.Vision RPA</li>
            <li>7. SE OVER SCRIPTET OG SØRG FOR AT DET SER RIKTIG UT</li>
            <li>8. Kjør scriptet hvis det ser greit ut</li>
            <li>9. ETTER at alle betalinger er gjennomført må du slette alle KID-nr du har betalt til fra Google Docs dokumentet fra styredriven</li>
        </ul>
      </div>
    );
};

export default HomePage;