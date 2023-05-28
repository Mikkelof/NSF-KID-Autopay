## NSF-KID-AUTOPAY

This is a simple static website made for use by the cashier of NTNUI Svømming. It takes a list of KID-numbers (CIN-numbers) and returns a script for automating the payment process to Norsk Svømmeforbund (The Norwegian Swimming Fedeation). This script can be ran using the [UI.Vision RPA](https://chrome.google.com/webstore/detail/uivision-rpa/gcbalfbdmfieckjlnblleoemohcganoc?hl=en) Chrome plugin.

The cashier of the swimming group can paste a list of KID-numbers in, verify that the configuration options (Amount, Account Number, etc.) are correct and generate a script. This script will automaticly pay the correct amount to the correct account number with a message etc. using the Chrome plugin mentioned above to each of the provided KID-numbers. More detailed instructions for the cashier can be found in Norwegian on the site itself.

The site is deployed using GitHub Pages and can be found [here.](https://mikkelof.github.io/NSF-KID-Autopay/)