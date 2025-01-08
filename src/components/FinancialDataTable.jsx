import React, { useState, useEffect } from 'react';
import Table from './Table';

const API_URL = `https://financialmodelingprep.com/api/v3/income-statement/AAPL?period=annual&apikey=${process.env.REACT_APP_API_KEY}`;


// Github raw json api for testing
// const GITHUB_JSON_URL = 'https://raw.githubusercontent.com/0-yohan/data-repo/refs/heads/main/apple%20income%20statement.json';

const FinancialDataTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response;
        // testing using github api and chainging to actual API for production
        // if (process.env.NODE_ENV === 'production') {
        //   response = await fetch(API_URL);
        // } else {
        //   response = await fetch(GITHUB_JSON_URL);
        // }
        response = await fetch(API_URL);
        console.log(API_URL)

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        
        const jsonData = await response.json();
        setData(jsonData);
      } catch (err) {
        setError('Error fetching data. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="text-center mt-8 dark:text-white">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-8 text-red-500 dark:text-red-400">{error}</div>;
  }

  return (
    <div className="container mx-auto lg:px-24 px-4 pt-12 dark:bg-gray-900">
      <h1 className="text-xl font-bold mb-4 dark:text-white">Apple Inc. Income Statement</h1>
      <Table data={data} />
    </div>
  );
};

export default FinancialDataTable;

