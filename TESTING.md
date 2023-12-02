# **Mystic Hazel's Memory Magic - Testing** <!-- omit in toc -->

<img src="documentation/logo.png" alt="The logo image for Mystic Hazel's Memory Game" style="display: block; margin: 0 auto; width: 500px; height: auto;">

[Click here to play Mystic Hazel's Memory Magic](https://andywright360.github.io/Mystic-Hazels-Memory-Magic/)

**By [Andrew Wright](https://github.com/AndyWright360)**

---

## **Contents** <!-- omit in toc -->

- [**Automated Testing**](#automated-testing)
  - [**W3C HTML Validation**](#w3c-html-validation)
  - [**W3C CSS Validation**](#w3c-css-validation)
    - [**Second Validation Test**](#second-validation-test)
  - [**JSHint JavaScript Validation**](#jshint-javascript-validation)
  - [**WCAG Colour Contrast Checker**](#wcag-colour-contrast-checker)
    - [**Page Content**](#page-content)
    - [**Score Display**](#score-display)
    - [**Buttons**](#buttons)
    - [**Footer Content**](#footer-content)
  - [**Lighthouse Testing**](#lighthouse-testing)
    - [**Desktop Results**](#desktop-results)
    - [**Mobile Results**](#mobile-results)
- [**Manual Testing**](#manual-testing)
  - [**Testing User Stories**](#testing-user-stories)
    - [**First Time Visitor Goals**](#first-time-visitor-goals)
    - [**Returning Visitor Goals**](#returning-visitor-goals)
    - [**Frequent User Goals**](#frequent-user-goals)
  - [**Full Testing**](#full-testing)

---

## **Automated Testing**

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

The warnings referred to the use of ES6 features throughout the file. These features include:

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

When the `li` element is clicked, the details of the clicked player's corresponding object are passed as an argument to the `showPlayerScore` function. This allows the `showPlayerScore` function to display the score information of the player who triggered the event.

This was the only method I could think of that would allow me to pass the specific players information as an argument to another function.

### **WCAG Colour Contrast Checker**

I paid close attention to achieving a strong contrast while choosing the color scheme for the website. The outcomes of each background and foreground combination employed in this project are detailed below.

#### **Page Content**

![Colour contrast results](documentation/testing/book-contrast.jpg)

With the text colour close to black and the book pages being light, the contrast ratio was very high. The only potential issue that could arise is from the fact that the container for the text content is an image. If this fails to load, then the text would be overlaid onto the background image for the body, which is considerably darker.

With the image having transparent edges, I was reluctant to add a background color to the container as this would be visible. However, this is something I would look to rectify in future iterations to avoid any potential issues with legibility.

#### **Score Display**

![Colour contrast results](documentation/testing/score-contrast.jpg)

This is the contrast results for the timer countdown and player turn count.

#### **Buttons**

![Colour contrast results](documentation/testing/button-contrast.jpg)

*Buttons - Default*

![Colour contrast results](documentation/testing/button-hover-contrast.jpg)

*Buttons - Hover*

These are the contrast results for the buttons and the hover effect applied to them.

#### **Footer Content**

![Colour contrast results](documentation/testing/footer-contrast.jpg)

This is the contrast for the social media links and copyright information displayed on the footer.

### **Lighthouse Testing**

Lighthouse within Chrome Developer Tools was used to assess the website's performance, accessibility, adherence to best practices, and SEO.

#### **Desktop Results**

![Lighthouse results for desktop](documentation/testing/lighthouse-desktop.jpg)

#### **Mobile Results**

![Lighthouse results for mobile](documentation/testing/lighthouse-mobile.jpg)

---

## **Manual Testing**

### **Testing User Stories**

#### **First Time Visitor Goals**

| Goals | How are they achieved? |
| :--- | :--- |
| I want to understand the rules of the game so I can play without confusion. | The `How To Play` navigation button directs users to a comprehensive tutorial explaining the game mechanics, winning strategies, and valuable tips. |
| I want the page to be responsive so I can play it on the device of my choosing. | The page was designed with responsiveness in mind, employing a mobile-first approach. This ensures a consistent user experience across various devices. |
| I want to be introduced to the character and story of the game. | The home page features a prominent image introducing the main character, Hazel. The story unfolds on the image of an open book, inviting users to explore the game's backstory. |

#### **Returning Visitor Goals**

| Goals | How are they achieved? |
| :--- | :--- |
| I want to keep track of my previous scores so I can monitor my improvement. | Upon submitting a player's score, the data is stored using local storage. This functionality enables users to revisit the page at any time, with their score data retained, as long as the same device is used. |

#### **Frequent User Goals**

| Goals | How are they achieved? |
| :--- | :--- |
| I want to challenge myself to achieve the highest score possible. | The scoring system implemented challenges users to complete the game within a specified time to achieve the highest score. This can be further improved by reducing the number of turns used. This combination allows frequent users to compete against their best scores. |
| I want to follow the games social media accounts. | Links to the game's social media accounts are displayed within the footer. Each link redirects the user to the specified page, enabling easy access to follow the requested account. |

### **Full Testing**

Full testing was performed on the following devices:

- Laptop:
  - MSI Thin GF63 15 inch screen
- Mobile Device:
  - iPhone XR

The following browsers were tested using each device:

- Laptop:
  - Google Chrome
  - Microsoft Edge
  - Mozilla Firefox
- Mobile:
  - Safari

Friends and family also tested the website using a variety of devices. No issues were reported.

Feature | Expected Outcome | Testing Performed | Result | Pass/Fail |
| --- | --- | --- | --- | --- |
| `Heading` |
| Page Title | Redirect to the home page | Click page title | Redirected to home page | Pass |
| `Home Page` |
| How To Play button | Redirect to the how to play page | Click button | Redirected to how to play page | Pass |
| New Game button | Redirect to the game page | Click button | Redirected to game page | Pass |
| High Scores button | Redirect to the high scores page | Click button | Redirected to high scores page | Pass |
| Button hover effect | Button colour changes on mouse hover | Hover mouse over button | Button colour changes | Pass |
| `How To Play Page` |
| Home button | Redirect to the home page | Click button | Redirected to home page | Pass |
| New Game button | Redirect to the game page | Click button | Redirected to game page | Pass |
| High Scores button | Redirect to the high scores page | Click button | Redirected to high scores page | Pass |
| Button hover effect | Button colour changes on mouse hover | Hover mouse over button | Button colour changes | Pass |
| `Game Page` |
| Cards populated | All 18 cards are displayed on screen | Load game page | All 18 cards are displayed on screen | Pass |
| Countdown begins | Time countsdown from 120 seconds | Load game page | Time countsdown from 120 seconds | Pass |
| Turn counter incriments | Incriment turn counter each time two cards are selected | Click two cards | Turn counter incrimented by one | Pass |
| Score display populated | The score display shows three stars | Load game page | The score display shows three stars | Pass |
| Score display modifies | At 59 seconds score display shows two stars | Countdown falls below 60 seconds | The score display shows two stars | Pass |
| Score display modifies | At 29 seconds score display shows one star | Countdown falls below 30 seconds | The score display shows one star | Pass |
| Cards float effect | On mouse over the card size will increase and a box shadow will display | Hover mouse over cards | The cards increase in size and the box shadow is displayed | Pass |
| Cards float removed | On mouse leave the cards reduce in size and the box shadow is removed | Remove mouse pointer from cards | The cards decrease in size and the box shadow is removed | Pass |
| Cards flip effect | The cards rotate 180 degrees horizontally when clicked | Click cards | The cards are flipped | Pass |
| First card remains flaoting | The first selected card will maintain the float class | Click first card | The card remains floating | Pass |
| Cards flip on non-match | Two selected cards that don't have matching images are flipped back | Click two non-matching cards | Both cards are flipped back over | Pass |
| Cards stay flipped on match | Two selected cards with matching images remain flipped and float is removed | Click two matching cards | The matching cards remain flipped and float is removed | Pass |
| Pointer removed from matching cards | Matching pairs will no longer trigger the cursor to display a pointer | Hover mouse over matching pair | The cursor maintains the default display | Pass |
| Cards can't be clicked while pair is checked | While a pair of cards is currently being checked for a match additional cards are unable to be clicked | Click cards while pair is being checked | The cards don't respond to the mouse click | Pass |
| Lose modal triggers | When the timer reaches zero the lose modal is triggered | Countdown falls to zero | The lose modal is triggered | Pass |
| Win modal triggers | When nine matching pairs of cards are found the win modal is triggered | Find nine pairs of cards | The win modal is triggered | Pass |
| `High Scores Page` |
| Home button | Redirect to the home page | Click button | Redirected to home page | Pass |
| New Game button | Redirect to the game page | Click button | Redirected to game page | Pass |
| Button hover effect | Button colour changes on mouse hover | Hover mouse over button | Button colour changes | Pass |
| No scores by default | While no scores have been submitted the display scrren is unpopulated  | Visit page without submitting a score | The score display screen is unpopulated | Pass |
| Display submitted player score | Upon submission the players score details are displayed on the page | Submit a score and load the page | The score display is populated | Pass |
| Highest score displayed by default | When multiple scores have been submitted the highest scoring player stats will be displayed by default | Sumnit multiple scores and load page | The highest scoring players details are displayed | Pass |
| Selected player has bold text | The currently selected player displays bold text | Select player names | The currently selected player has bold text | Pass |
| Player name hover effect | On mouse hover the players name will be underlined | Hover mouse over player names | The players name displays an underline | Pass |
| Selecting new player removes bold text from previous layer name | When a new player name is selected the previous player name removes bold text | Select new player name | The previously selected player removes bold text | Pass |
| `Win Modal` |
| Player score displays | When the modal loads the players score is displayed | Trigger win modal | The players score is displayed | Pass |
| Name input rejects no character entry | When attempting to enter a name with zero characters the label will display a rejection message | Enter name with zero chacters | The input label displays the rejection message | Pass |
| Name input rejects entries exceeding ten characters | When attempting to enter a name exceeding ten characters the label will display a rejection message | Enter name greater than ten characters in length | The label displays a rejection message | Pass |
| Successfull submission message | Upon entering a valid name the label will display a successful submission message | Enter valid name input | The label displays a successfull submission message | Pass |
| Input field disabled on submission | Upon successfull submission of a player name the input field will be disabled | Enter valid name input | The input field is disabled | Pass |
| New Game button | Close modal and load new game | Click button | Modal closed and new game loaded | Pass |
| High Scores button | Close modal and redirect to the high scores page | Click button | Modal closed and redirected to high scores page | Pass |
| Button hover effect | Button colour changes on mouse hover | Hover mouse over button | Button colour changes | Pass |
| Can't close modal by clicking outside | The modal can't be closed by the user clicking outside the modal display | Click outide modal display | Modal doesn't close | Pass |
| Can't close modal by presssing 'esc' button | The modal can't be closed by the user pressing the 'esc' button | Press 'esc' key | Modal doesn't close | Pass |
| `Lose Modal` |
| New Game button | Close modal and load new game | Click button | Modal closed and new game loaded | Pass |
| High Scores button | Close modal and redirect to the high scores page | Click button | Modal closed and redirected to high scores page | Pass |
| Button hover effect | Button colour changes on mouse hover | Hover mouse over button | Button colour changes | Pass |
| Can't close modal by clicking outside | The modal can't be closed by the user clicking outside the modal display | Click outide modal display | Modal doesn't close | Pass |
| Can't close modal by presssing 'esc' button | The modal can't be closed by the user pressing the 'esc' button | Press 'esc' key | Modal doesn't close | Pass |
| `Footer` |
| Social Media Link (Facebook) | Opens Facebook link in a new tab | Clicked Facebook icon | New tabs opened to Facebook | Pass |
| Social Media Link (YouTube) | Opens YouTube link in a new tab | Clicked YouTube icon | New tabs opened to YouTube | Pass |
| Social Media Link (Twitter) | Opens Twitter link in a new tab | Clicked Twitter icon | New tabs opened to Twitter | Pass |
| Social Media Link (Instagram) | Opens Instagram link in a new tab | Clicked Instagram icon | New tabs opened to Instagram | Pass |
| Icon hover effect | Icon size increases on mouse hover | Hover mouse over icon | Icon size increases | Pass |
