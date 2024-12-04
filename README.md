# E-wallet Budget Management App

A front-end application for tracking your incomes and expenses, which allows you to effectively manage your household budget by adding, removing and editing incomes and transactions.

## Link

I host the application online using Netlify. [<ins>See E-wallet's current full version here</ins>](https://ewalletapp.netlify.app).

## App Features

Currently, the application allows you to do the following:

- **Add a new transaction** (its name, amount and category) - click the "Add transaction" button to open a panel where you can enter the details of your new transaction. You must put a minus sign (-) right before the amount number and select a category that starts with "[ - ]" to qualify the transaction as an expense. Otherwise the application will show an error.

- **Delete the selected transaction** - click a cross icon (&#x2716;) next to the selected transaction's details to delete it. The application will automatically recalculate the balance every time you delete a transaction.

- **Edit the selected transaction** - click a pencil icon (&#x1F589;) to open a panel where you can change the details (either the name, amount and category) of your selected transaction. here you also must put a minus sign (-) right before the amount number and select a category that starts with "[ - ]" to change the transaction into an expense. Otherwise the application will show an error, or remove the minus sign to change the transaction into an income. The application will automatically recalculate the balance every time you change the amount of a transaction.

- **Delete all transactions** - click the "Delete all" button to delete all transactions from the list of transactions. A modal will pop up that will ask you to confirm the operation. The application will reset the balance once you delete all transactions.

- **Change visual appearance of the application** - you can choose a white or dark theme depending on your preferences.

## Tools & Technologies

The application was created using the following tools and technologies:

- **HTML5**
- **SCSS**
- **JavaScript ES6+**
- **Web Storage API** to save data as a key-value directly in the user's browser and only in the domain in which the data was saved
- **Gulp.js** to automate repetitive development tasks, like code minification, ES module bundling and autoprefixing CSS code
- **Webpack-stream** to conviniently intergate Webpack with Gulp.js

## Installation

**1.** Clone the repository

```
git clone git@github.com:wojtekpirog/E-wallet_App_Sass_JavaScript_Responsive.git
```

**2.** Go to the project's root directory

```
cd E-wallet_App
```

**3.** While in the project's root directory, install dependencies

```
npm install
```

**4.** Run application

```
gulp
```
## Contact the Author

You can find me at:

- &#x1F517; LinkedIn - [wojciech-pirog](https://www.linkedin.com/in/wojciech-pirog/)

- &#x1F517; GitHub - [wojtekpirog](https://github.com/wojtekpirog)