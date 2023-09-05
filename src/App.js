import React, { useState } from 'react'
import SqlQueryInput from './components/SqlQueryInput'
import QueryResult from './components/QueryResult'
import './App.css'
import Papa from 'papaparse'

function App() {
  const [queryResult, setQueryResult] = useState([])
  const [selectedFile, setSelectedFile] = useState(null)

  // Define the CSV file options
  const csvFileOptions = [
    { label: 'Orders', value: '/data/orders.csv' },
    { label: 'Details', value: '/data/details.csv' },
    { label: 'Products', value: '/data/products.csv' },
    { label: 'Customers', value: '/data/customers.csv' },
  ]

  const handleFileChange = (event) => {
    const fileValue = event.target.value
    const selectedOption = csvFileOptions.find(
      (option) => option.value === fileValue
    )

    if (selectedOption) {
      setSelectedFile(selectedOption.value)
    }
  }

  const handleQuerySubmit = async (fileToLoad) => {
    try {
      const response = await fetch(fileToLoad)
      const text = await response.text()
      const result = Papa.parse(text, { header: true }).data
      setQueryResult(result)
    } catch (error) {
      console.error('Error loading or parsing CSV data:', error)
    }
  }

  return (
    <div className='App'>
      <h1>SQL Data Viewer</h1>
      <div className='container'>
        <div className='left-section'>
          <h2>Tables</h2>
          <ul>
            {csvFileOptions.map((option) => (
              <li
                key={option.label}
                onClick={() => handleQuerySubmit(option.value)}
              >
                {option.label}
              </li>
            ))}
          </ul>
        </div>
        <div className='right-section'>
          <h2>Query Data</h2>
          <SqlQueryInput onSubmit={handleQuerySubmit} />
        </div>
      </div>
      {queryResult.length > 0 && (
        <div className='query-result'>
          <h2>Query Result</h2>
          <QueryResult result={queryResult} />
        </div>
      )}
    </div>
  )
}

export default App
