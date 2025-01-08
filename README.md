## Apple Inc. Financial Data Analyzer

### Project Description

This React application fetches and displays annual income statements for Apple Inc.

### Features

- Fetches and displays Apple Inc.'s annual income statements
- Interactive table with the following columns:
  - Date
  - Revenue
  - Net Income
  - Gross Profit
  - EPS (Earnings Per Share)
  - Operating Income
- Filtering capabilities:
  - Date Range: Filter results between specific years
  - Revenue: Filter rows within a user-specified range
  - Net Income: Filter rows within a user-specified range
- Sorting functionality:
  - Sort by Date (ascending/descending)
  - Sort by Revenue (ascending/descending)
  - Sort by Net Income (ascending/descending)
- Responsive design for both desktop and mobile devices
- Pagination for handling large datasets
- Dark mode toggle 

### Technologies Used

- React
- TailwindCSS
- Heroicons
- Financial Modeling Prep API

## Installation and Setup

1. Clone the repository: 
```
git clone https://github.com/0-yohan/Financial-Data-Filtering-App.git
cd Financial-Data-Filtering-App
```
2. Install dependencies:
```
npm install
```
3. Create a `.env.local` file in the root directory and add your Financial Modeling Prep API key:
```
REACT_APP_API_KEY=<your api key>
(visit https://financialmodelingprep.com/developer/docs/ and sign up to get a free key)
```
4. Start the application:
```
npm start
```
5. Open your browser and navigate to `http://localhost:3000`


#### Usage
1. Upon loading, the app displays Apple Inc.'s financial data in a table format
2. Use the filter inputs at the top of the page to narrow down the data based on year range, revenue, or net income
3. Click on the column headers to sort the data in ascending or descending order
4. Use the pagination controls at the bottom of the table to navigate through the dataset
5. Toggle between light and dark mode using the button in the top right corner