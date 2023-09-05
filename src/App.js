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
    { label: 'Customers', value: '/data/customers.csv' },
    { label: 'Products', value: '/data/products.csv' },
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
      <h1>CSV Data Viewer</h1>
      <div>
        <label htmlFor='csvFileSelect'>Select CSV File:</label>
        <select id='csvFileSelect' onChange={handleFileChange}>
          <option value=''>Select a CSV file</option>
          {csvFileOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <SqlQueryInput onSubmit={handleQuerySubmit} />
      </div>
      {queryResult.length > 0 && <QueryResult result={queryResult} />}
    </div>
  )
}

export default App
