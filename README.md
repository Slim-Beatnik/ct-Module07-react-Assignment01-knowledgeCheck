<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
<a id="readme-top"></a>
<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->



<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![project_license][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]



<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/Slim-Beatnik/ct-Module07-react-Assignment01-knowledgeCheck">
    <img src="images/logo.png" alt="Logo" width="80" height="80">
  </a>

<h3 align="center">Open Trivia Database Quiz</h3>

  <p align="center">
    A react quiz part of Coding Temple's knowledge check
    <br />
    <a href="https://github.com/Slim-Beatnik/ct-Module07-react-Assignment01-knowledgeCheck"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/Slim-Beatnik/ct-Module07-react-Assignment01-knowledgeCheck">View Demo</a>
    &middot;
    <a href="https://github.com/Slim-Beatnik/ct-Module07-react-Assignment01-knowledgeCheck/issues/new?labels=bug&template=bug-report---.md">Report Bug</a>
    &middot;
    <a href="https://github.com/Slim-Beatnik/ct-Module07-react-Assignment01-knowledgeCheck/issues/new?labels=enhancement&template=feature-request---.md">Request Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

[![Product Name Screen Shot][product-screenshot]](https://example.com)

A react quiz part of Coding Temple's knowledge check

The story:
I've got a buddy who loves to do nerdy trivia events. He enjoys going to them and, more over, enjoys putting them on - but alas with hand-selected quiz questions, he MUST play the quiz host.
Once I got the assignement I thought wouldn't it be nice if there were such a way that he could run the trivia and participate in it? I think so.
That's my goal here.

My plan:
App - parent passes props by mapProps and holds the main useState values for maximum performance and readability.
renders Components dynamically
Always displays a footer which has control buttons. The submit button changes its function based on the value of currPage.

Footer - buttons in order(left to right):
  -Restart button: pulls up prompt to reset all states (including api token) to default values which are empty strings, arrays, objects, or no-op functions,
    or goes back to selection page (keeps api token),
    or cancels prompt
  -back button: should go to previous page for whatever reason, data will be overwritten if altered.
  -previous question button, (hidden until quiz) so that submit will be between prevQ and nextQ buttons.
  -submit button: will be multipurpose depending on currPage and existing inputs.
    -welcome: first set Quiz Master, which is an object with name and apiToken key, then next page.
    -quiz selection form: first takes all input values from form and formats them for creating queries, then next page.
    -team creation form: first takes all input values to format them for team objects, then next page (query timer must reach 0 before button will be enabled for next page - play button svg).
    -quiz: first confirm answers, next page after last question - mostly for quiz master if they need to go back for whatever reason (as to avoid limitations of gameplay)
    -quiz results: Congratulates winner, then restarts at selection.
  -next question buttons: goes to the next question - disabled until all teams have answered question.

Page order is as follows:
Welcome:
  -get quiz master name and apiToken - read tutorial, (tentative plan is to run through each page with dummy values to highlight divs and describe walkthrough steps.)
QuizSelectionForm:
  -props from app: quizMaster(for token), quiz related setState functions, error and setError
  -new props for input fields:
      categories: display manual category id => name table if fetch fails or is created by fetch data
      categoryFetchError: if category fetch has error - distinction from
        error status for ease of use.
    formInputDisplay: distinct from quizInput data for ease of clearing display only
    quizFormData: for collecting input data converted to queries for  looping over to fetch questions.
    quizInputData: object collects queryPriority radio inputs (slightly alters way query is formatted - used to bypass category difficulty vs amount issues), category, difficulty, and amount.
  -has 1 child, SelectionInput which displays inputs and handles pre-submit validation
  -timer begins 5 seconds between each fetch based on separate categories, and amounts > 50.
    SelectionInput:
      -new props:
        --maximumAmount: sets input type=number max= , to show invalid input values (api requests with amounts that are too high result in empty returns.)
*Team Creation Form:
  -prop from app: teamInfo(input) and teams(output / collection array)
  -no children
  -only validation is teams don't have the same avatar and color combination - also team names cannot be changed later.
  -busy work if waiting for fetch for a grip.
Quiz:
  Once fetch is complete the prop it will be ready to recieve is an array questions.
  -props recieved: quizResults and setQuizResults(may allow answer changes?)
  -child for question display? - may also handle showing correct answer.
*Quiz Results:
  -props recieved: quizResults
  show team percentages and Overall winner.
  -submit will return to selection page (maybe keep teams?)

* Maybe later, or never. --This entire project has left me displeased.


<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

<!-- vite --template react README.md -->
## React

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript and enable type-aware lint rules. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

<!-- end of template README.md -->

* [![React][React.js]][React-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.
* npm
  ```sh
  npm install npm@latest -g
  ```

### Installation


1. Clone the repo
   ```sh
   git clone https://github.com/Slim-Beatnik/ct-Module07-react-Assignment01-knowledgeCheck.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Change git remote url to avoid accidental pushes to base project
   ```sh
   git remote set-url origin Slim-Beatnik/ct-Module07-react-Assignment01-knowledgeCheck
   git remote -v # confirm the changes
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

Use this space to show useful examples of how a project can be used. Additional screenshots, code examples and demos work well in this space. You may also link to more resources.

_For more examples, please refer to the [Documentation](https://example.com)_

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ROADMAP -->
## Roadmap

- [ ] Feature 1
- [ ] Feature 2
- [ ] Feature 3
    - [ ] Nested Feature

See the [open issues](https://github.com/Slim-Beatnik/ct-Module07-react-Assignment01-knowledgeCheck/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Top contributors:

<a href="https://github.com/Slim-Beatnik/ct-Module07-react-Assignment01-knowledgeCheck/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=Slim-Beatnik/ct-Module07-react-Assignment01-knowledgeCheck" alt="contrib.rocks image" />
</a>



<!-- LICENSE -->
## License

Distributed under the project_license. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

Your Name - [@](https://twitter.com/) - totem64@gmail.com.com

Project Link: [https://github.com/Slim-Beatnik/ct-Module07-react-Assignment01-knowledgeCheck](https://github.com/Slim-Beatnik/ct-Module07-react-Assignment01-knowledgeCheck)

<p align="right">(<a href="#readme-top">back to top</a>)</p>




<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/Slim-Beatnik/ct-Module07-react-Assignment01-knowledgeCheck.svg?style=for-the-badge
[contributors-url]: https://github.com/Slim-Beatnik/ct-Module07-react-Assignment01-knowledgeCheck/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/Slim-Beatnik/ct-Module07-react-Assignment01-knowledgeCheck.svg?style=for-the-badge
[forks-url]: https://github.com/Slim-Beatnik/ct-Module07-react-Assignment01-knowledgeCheck/network/members
[stars-shield]: https://img.shields.io/github/stars/Slim-Beatnik/ct-Module07-react-Assignment01-knowledgeCheck.svg?style=for-the-badge
[stars-url]: https://github.com/Slim-Beatnik/ct-Module07-react-Assignment01-knowledgeCheck/stargazers
[issues-shield]: https://img.shields.io/github/issues/Slim-Beatnik/ct-Module07-react-Assignment01-knowledgeCheck.svg?style=for-the-badge
[issues-url]: https://github.com/Slim-Beatnik/ct-Module07-react-Assignment01-knowledgeCheck/issues
[license-shield]: https://img.shields.io/github/license/Slim-Beatnik/ct-Module07-react-Assignment01-knowledgeCheck.svg?style=for-the-badge
[license-url]: https://github.com/Slim-Beatnik/ct-Module07-react-Assignment01-knowledgeCheck/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/3dkylehill
[product-screenshot]: images/screenshot.png
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
