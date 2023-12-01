# **Mystic Hazel's Memory Magic - Testing** <!-- omit in toc -->

<img src="documentation/logo.png" alt="The logo image for Mystic Hazel's Memory Game" style="display: block; margin: 0 auto; width: 500px; height: auto;">

[Click here to play Mystic Hazel's Memory Magic](https://andywright360.github.io/Mystic-Hazels-Memory-Magic/)

**By [Andrew Wright](https://github.com/AndyWright360)**

---

## **Contents** <!-- omit in toc -->

- [**Testing**](#testing)
  - [**W3C HTML Validation**](#w3c-html-validation)
  - [**W3C CSS Validation**](#w3c-css-validation)
    - [**Second Validation Test**](#second-validation-test)
  - [**JSHint JavaScript Validation**](#jshint-javascript-validation)
  - [**WCAG Colour Contrast Checker**](#wcag-colour-contrast-checker)
    - [**Page Content**](#page-content)
    - [**Score Display**](#score-display)
    - [**Buttons**](#buttons)
    - [**Footer Content**](#footer-content)
  - [**Testing User Stories**](#testing-user-stories)
    - [**First Time Visitor Goals**](#first-time-visitor-goals)
    - [**Returning Visitor Goals**](#returning-visitor-goals)
    - [**Frequent User Goals**](#frequent-user-goals)
  - [**Lighthouse Testing**](#lighthouse-testing)
  - [**Manual Testing**](#manual-testing)

---

## **Testing**

### **W3C HTML Validation**

[W3C](https://validator.w3.org/) was used to validate the HTML code.

- index.html - Passed

![W3C HTML validation results](documentation/testing/html-validation.jpg)

### **W3C CSS Validation**

[W3C](https://jigsaw.w3.org/css-validator/) was used to validate the CSS code.

- style.css - (1) Error and (10) Warnings

![W3C CSS validation errors](documentation/testing/css-error.jpg)

*Error*

![W3C CSS validation warnings](documentation/testing/css-warnings.jpg)

*Warnings*

The error detected refers to the use of an incorrect CSS property `text-stroke` which was applied to the `.title` class. This property must be pre-fixed with `-webkit-` in order to be valid as this is a non-standard CSS property.

#### **Second Validation Test**

In order to correct this error, I removed the property from the `.title` class. The results from the second validation were a pass.

![W3C CSS validation pass](documentation/testing/css-validation.jpg)

*Pass*

### **JSHint JavaScript Validation**

[JSHint](https://jshint.com/) was used to validate the JavaScript code.

- script.js - (107) Warnings

![JSHint JavaScript validation results](documentation/testing/javascript-validation.jpg)

*Results*

The warnings pertained to use of ES6 features used throught my file. These included:

 - The 'let' keyword
 - The 'const' keyword
 - Arrow functions
 - The spread operator

The other warning that I received, outlined the use of a function declared within a loop that references an outer scoped variable.

```
// Display top player names on the High Scores page
const displayHighScores = () => {
  // Get the current top scores
  retrieveStoredScores();

  // Clear the existing topPlayers list
  topPlayers.innerHTML = "";

  // Add the top player names to the list
  for (let m = 0; m < topScores.length; m++) {
    let player = document.createElement("li");
    player.textContent = topScores[m].name;

    // Add interactive elements to the list items
    player.addEventListener("mouseenter", underline);
    player.addEventListener("mouseleave", removeUnderline);
    player.addEventListener("click", () => {
      showPlayerScore(topScores[m]);

      // Remove bold font class from previously selected player
      const previousSelectedPlayer = document.querySelector(".selected-player");
      if (previousSelectedPlayer) {
        previousSelectedPlayer.classList.remove("selected-player");
      }

      // Add bold font class to the clicked player
      player.classList.add("selected-player");
    });
    topPlayers.appendChild(player);

    // Display the top player's score by default
    if (m === 0) {
      showPlayerScore(topScores[0]);
      player.classList.add("selected-player");
    }
  }
};
```

The warning pertains to the `displayHighScores` function, which iterates through an array of recorded top players. For each item in the top players array, an `li` element is created. Within this loop, a `click` event listener is attached to the created element.

When the `li` element is clicked, the details of the clicked player's corresponding object is passed as an argument to the `showPlayerScore` function. This allows the `showPlayerScore` function to display the score information of the player who triggered the event.

This was the only method I could think of that would allow me to pass the specific players information as an argument to another function.

### **WCAG Colour Contrast Checker**

I paid close attention to achieving a strong contrast while choosing the color scheme for the website. The outcomes of each background and foreground combination employed in this project are detailed below.

#### **Page Content**

![Colour contrast results](documentation/testing/book-contrast.jpg)

With the text colour close to black and the book pages being light, the contrast ratio was very high. The only potential issue that could arise is from the fact that the container for the text content is an image. If this fails to load, then the text would be overlaid onto the background image for the body, which is considerably darker.

With the image having transparent edges, I was reluctant to add a background color to the container as this would be visible. However, this is something I would look to rectify in future iterations to avoid any potential issues with legibility.

#### **Score Display**

![Colour contrast results](documentation/testing/score-contrast.jpg)

This is the contract results for the timer countdown and player turn count.

#### **Buttons**

![Colour contrast results](documentation/testing/button-contrast.jpg)

*Buttons - Default*

![Colour contrast results](documentation/testing/button-hover-contrast.jpg)

*Buttons - Hover*

These are the contrast results for the buttons and the hover effect applied to them.

#### **Footer Content**

![Colour contrast results](documentation/testing/footer-contrast.jpg)

This is the contrast for the social media links and copyright information displayed on the footer.

### **Testing User Stories**

#### **First Time Visitor Goals**

#### **Returning Visitor Goals**

#### **Frequent User Goals**

### **Lighthouse Testing**

### **Manual Testing**
