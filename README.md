# Frontend Mentor - Multi-step form solution

This is a solution to the [Multi-step form challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/multistep-form-YVAnSdqQBJ). Frontend Mentor challenges help you improve your coding skills by building realistic projects. 

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
  - [AI Collaboration](#ai-collaboration)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

## Overview

### The challenge

Users should be able to:

- Complete each step of the sequence
- Go back to a previous step to update their selections
- See a summary of their selections on the final step and confirm their order
- View the optimal layout for the interface depending on their device's screen size
- See hover and focus states for all interactive elements on the page
- Receive form validation messages if:
  - A field has been missed
  - The email address is not formatted correctly
  - A step is submitted, but no selection has been made

### Screenshot
To view screenshots please go to the provided link file.

![](./screenshots)

### Links

- Solution URL: [Github](https://github.com/Star-Mdakane/multi-step-form-e2e.git)
- Live Site URL: [Vercel](https://multi-step-form-e2e.vercel.app/)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- Mobile-first workflow
- [React](https://reactjs.org/) - JS library
- [React-Icons](https://react-icons.github.io/react-icons/) - Icons
- [React-Hook-Form](https://react-hook-form.com/) - Forms
- [Next.js](https://nextjs.org/) - React framework
- [TailwindCss](https://tailwindcss.com/) - For styles
- [Playwright](https://playwright.dev/) - Testing (e2e)



### What I learned

This was more complex than expected because state has to survive 4 steps. I kept all state (personalInfo, selected plan, add-ons, billing toggle) in `app/page.js` and passed it down as props — so Summary and SelectPlan always stay in sync.

Hardest part was the button logic. The Next button is disabled until name/email/phone are valid, and Previous has to work from any step without losing data. Using `ButtonContainer.jsx` to centralize navigation helped.

For tests, I learned to use `getByRole` with accessible names instead of `getByText` — it's more reliable and tests accessibility at the same time.

### Continued development
- Add form persistence with localStorage so refresh doesn't lose progress
- Replace prop drilling with Context for cleaner code

### Useful resources

- [Bekzat Kali](https://youtu.be/fNNsuIL6WdU?si=hvRZ_AJlmikx-pJ9) - How a multi-step form works
- [Cosden Solutions](https://youtu.be/3NW0Mz943_E?si=sztktPqmJl_BOoVJ) - How to do e2e tests
- [Playwright](https://playwright.dev/docs) - Gave me direction

### AI Collaboration

Describe how you used AI tools (if any) during this project. This helps demonstrate your ability to work effectively with AI assistants.

- What tools did you use (ChatGPT)
- How did you use them (debugging)

- What tools did you use (Meta AI)
- How did you use them (brainstorming solutions)

## Author

- Frontend Mentor - [@Star-Mdakane](https://www.frontendmentor.io/profile/Star-Mdakane)
- Twitter - [@KidStarMadrad](https://www.twitter.com/KidStarMadrad)

