import React, { useState, useEffect, Fragment } from 'react';
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/20/solid';
import { Popover, Transition } from '@headlessui/react';
import { useDarkMode } from '../contexts/DarkModeContext';

// tooltip for EPS
const DelayedTooltip = ({ children, content, delay = 100 }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [timer, setTimer] = useState(null);

  const handleMouseEnter = () => {
    const newTimer = setTimeout(() => setIsOpen(true), delay);
    setTimer(newTimer);
  };

  const handleMouseLeave = () => {
    clearTimeout(timer);
    setIsOpen(false);
  };

  return (
    <Popover className="relative">
      {({ open }) => (
        <>
          <Popover.Button
            as="span"
            className="cursor-pointer"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {children}
          </Popover.Button>
          <Transition
            show={isOpen}
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="absolute z-10 w-max px-2 py-1 mt-1 text-sm font-medium text-white bg-gray-900 rounded-md shadow-sm dark:bg-gray-700">
              {content}
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
};

const Table = ({ data }) => {
  const { darkMode } = useDarkMode();
  const [filteredData, setFilteredData] = useState(data);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortColumn, setSortColumn] = useState('date');
  const [sortDirection, setSortDirection] = useState('desc');
  const [filters, setFilters] = useState({
    startYear: '',
    endYear: '',
    minRevenue: '',
    maxRevenue: '',
    minNetIncome: '',
    maxNetIncome: '',
  });

  useEffect(() => {
    filterAndSortData();
  }, [data, filters, sortColumn, sortDirection]);

  const filterAndSortData = () => {
    let result = [...data];

    // if (filters.startYear && filters.endYear) {
    //   result = result.filter((item) => {
    //     const itemYear = parseInt(item.date.split('-')[0]);
    //     return itemYear >= parseInt(filters.startYear) && itemYear <= parseInt(filters.endYear);
    //   });
    // }

    if (filters.startYear) {
      result = result.filter((item) => {
        const itemYear = parseInt(item.date.split('-')[0]);
        return itemYear >= parseInt(filters.startYear);
    });
    }

    if (filters.endYear) {
      result = result.filter((item) => {
        const itemYear = parseInt(item.date.split('-')[0]);
        return itemYear <= parseInt(filters.endYear);
        });
    }

    if (filters.minRevenue) {
      result = result.filter((item) => item.revenue >= Number(filters.minRevenue));
    }

    if (filters.maxRevenue) {
      result = result.filter((item) => item.revenue <= Number(filters.maxRevenue));
    }

    if (filters.minNetIncome) {
      result = result.filter((item) => item.netIncome >= Number(filters.minNetIncome));
    }

    if (filters.maxNetIncome) {
      result = result.filter((item) => item.netIncome <= Number(filters.maxNetIncome));
    }

    result.sort((a, b) => {
      if (a[sortColumn] < b[sortColumn]) return sortDirection === 'asc' ? -1 : 1;
      if (a[sortColumn] > b[sortColumn]) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    setFilteredData(result);
    setCurrentPage(1);
  };

  const handleSort = (column) => {
    if (column === sortColumn) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const itemsPerPage = 5;

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = filteredData.slice(startIndex, endIndex);

  const formatNumber = (num) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(num);
  };

  return (
    <div className={`overflow-x-auto h-full ${darkMode ? 'dark' : ''}`}>
      
      {/* filters */}
      <div className="my-4 mx-1 grid grid-cols-3 gap-4">
        <div className="flex flex-col gap-2">
          <input
            type="number"
            name="startYear"
            placeholder="Start Year"
            value={filters.startYear}
            onChange={handleFilterChange}
            className="border rounded p-2 dark:bg-gray-700 dark:text-white w-full"
          />
          <input
            type="number"
            name="endYear"
            placeholder="End Year"
            value={filters.endYear}
            onChange={handleFilterChange}
            className="border rounded p-2 dark:bg-gray-700 dark:text-white w-full"
          />
        </div>
        <div className="flex flex-col gap-2">
          <input
            type="number"
            name="minRevenue"
            placeholder="Min Revenue"
            value={filters.minRevenue}
            onChange={handleFilterChange}
            className="border rounded p-2 dark:bg-gray-700 dark:text-white w-full"
          />
          <input
            type="number"
            name="maxRevenue"
            placeholder="Max Revenue"
            value={filters.maxRevenue}
            onChange={handleFilterChange}
            className="border rounded p-2 dark:bg-gray-700 dark:text-white w-full"
          />
        </div>
        <div className="flex flex-col gap-2">
          <input
            type="number"
            name="minNetIncome"
            placeholder="Min Net Income"
            value={filters.minNetIncome}
            onChange={handleFilterChange}
            className="border rounded p-2 dark:bg-gray-700 dark:text-white w-full"
          />
          <input
            type="number"
            name="maxNetIncome"
            placeholder="Max Net Income"
            value={filters.maxNetIncome}
            onChange={handleFilterChange}
            className="border rounded p-2 dark:bg-gray-700 dark:text-white w-full"
          />
        </div>
      </div>

      {/* table head */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-700 dark:text-white">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-800">
              <th className="px-4 py-2 border-b dark:border-gray-600 cursor-pointer" onClick={() => handleSort('date')}>
                Date
                {sortColumn === 'date' && (
                  <span className="ml-1">
                    {sortDirection === 'asc' ? <ChevronUpIcon className="w-4 h-4 inline" /> : <ChevronDownIcon className="w-4 h-4 inline" />}
                  </span>
                )}
              </th>
              <th className="px-4 py-2 border-b dark:border-gray-600 cursor-pointer" onClick={() => handleSort('revenue')}>
                Revenue
                {sortColumn === 'revenue' && (
                  <span className="ml-1">
                    {sortDirection === 'asc' ? <ChevronUpIcon className="w-4 h-4 inline" /> : <ChevronDownIcon className="w-4 h-4 inline" />}
                  </span>
                )}
              </th>
              <th className="px-4 py-2 border-b dark:border-gray-600 cursor-pointer" onClick={() => handleSort('netIncome')}>
                Net Income
                {sortColumn === 'netIncome' && (
                  <span className="ml-1">
                    {sortDirection === 'asc' ? <ChevronUpIcon className="w-4 h-4 inline" /> : <ChevronDownIcon className="w-4 h-4 inline" />}
                  </span>
                )}
              </th>
              <th className="px-4 py-2 border-b dark:border-gray-600">Gross Profit</th>
              <th className="px-4 py-2 border-b dark:border-gray-600">
                <DelayedTooltip content="Earnings per Share">
                  EPS
                </DelayedTooltip>
              </th>
              <th className="px-4 py-2 border-b dark:border-gray-600">Operating Income</th>
            </tr>
          </thead>

          {/* data */}
          <tbody>
            {currentData.map((item, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-gray-50 dark:bg-gray-900' : 'bg-white dark:bg-gray-800'}>
                <td className="px-4 py-2 border-b dark:border-gray-700">{item.date}</td>
                <td className="px-4 py-2 border-b dark:border-gray-700">{formatNumber(item.revenue)}</td>
                <td className="px-4 py-2 border-b dark:border-gray-700">{formatNumber(item.netIncome)}</td>
                <td className="px-4 py-2 border-b dark:border-gray-700">{formatNumber(item.grossProfit)}</td>
                <td className="px-4 py-2 border-b dark:border-gray-700">{item.eps.toFixed(2)}</td>
                <td className="px-4 py-2 border-b dark:border-gray-700">{formatNumber(item.operatingIncome)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* pagination */}
      {filteredData.length > itemsPerPage && (
        <div className="my-4 flex justify-between items-center">
          <span className="text-sm dark:text-gray-300">
            Showing rows {startIndex + 1}-{Math.min(endIndex, filteredData.length)} of {filteredData.length}
          </span>
          <div>
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-2 py-1 border rounded mr-2 disabled:opacity-50 dark:bg-gray-700 dark:text-white dark:border-gray-600"
            >
              Prev
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-2 py-1 border rounded mr-2 ${
                  currentPage === page ? 'bg-blue-500 text-white' : 'dark:bg-gray-700 dark:text-white dark:border-gray-600'
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-2 py-1 border rounded disabled:opacity-50 dark:bg-gray-700 dark:text-white dark:border-gray-600"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Table;

