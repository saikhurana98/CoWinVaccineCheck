## Installation

To Get Started.
- Install The [Notify Me Skill](https://www.amazon.in/Thomptronics-Notify-Me/dp/B07BB2FYFS) and follow the [Instructions](https://www.thomptronics.com/about/notify-me)
- Set Your Notify Me's Access Code as an Environment Variable
- Clone this Repository and run the code

### Setting up an Enviornment Variable

#### Windows Powershell
```
setx ALEXA_NOTIFY_ME_ACCESS_TOKEN "REPLACE_WITH_ACCESS_CODE"
```

#### MacOS/Linux Bash
```
export ALEXA_NOTIFY_ME_ACCESS_TOKEN = "REPLACE_WITH_ACCESS_CODE" 
```




### Clone and Run the Code
```code
git clone https://github.com/saikhurana98/CoWinVaccineCheck.git
yarn
yarn start
```