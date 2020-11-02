# CE LMS and Player Automation

Automated testing of features in LMS and Course Player
  - Authentication of User/Learner
  - Player features
  - Reports
### Tech
This project uses a number of open source projects to work properly:

* [cucumber] - Behavior-Driven Development and testing
* [node.js] - evented I/O for the backend
* [selenium] - Selenium is a browser automation library. 

### Prerequisites
- Node.js (with npm and node installed).
- A package manager for handling open source JavaScript projects.
- Any code editor (Sublime Text, Visual Studio Code).
-  Any internet browser (Chrome/Forefox/IE)

### Installation 
- Setting Up Node.js :
- Install Node.js & NPM from browser: 
- Click on the link https://nodejs.org/en/download/ to download the version according to the required system you are using.
- Installing Package manager and adding a path variable:
- Install webdrivers for different browsers. At present we are using chromedriver. Click on the link https://chromedriver.chromium.org/ and download the latest stable version. Now we need to set up path variable for our web driver.
- Unzip the chromedriver file in desired directory
- Copy the path to your clipboard
- Go to Search -> type “Environment variables”
- Select the option “Edit the system environment variables”
- Under System properties window, select “Advanced” -> click on “Environment Variables”
- Under System Variable, select the variable “Path” -> click on “Edit”
- Click on “New” -> Paste the path you recently copied -> click “OK”
- Installing Selenium webDriver:
Open the terminal and run the command “npm init”
```sh
$ npm install -save selenium-webdrive
```
 
### Todos

License
----

MIT

**  !**

   [selenium]: <https://www.selenium.dev/selenium/docs/api/javascript/index.html>
   [cucumber]: <https://cucumber.io/>
   [node.js]: <http://nodejs.org>
   
 