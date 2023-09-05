import React, { useState } from 'react'

function SqlQueryInput({ onSubmit }) {
  const [query, setQuery] = useState('')

  const handleQueryChange = (e) => {
    setQuery(e.target.value)
  }

  const handleSubmit = () => {
    // Check if the user's query contains keywords and load corresponding data
    if (query.toLowerCase().includes('customers')) {
      onSubmit('/data/customers.csv')
    } else if (query.toLowerCase().includes('orders')) {
      onSubmit('/data/orders.csv')
    } else if (query.toLowerCase().includes('details')) {
      onSubmit('/data/details.csv')
    } else if (query.toLowerCase().includes('products')) {
      onSubmit('/data/products.csv')
    } else {
      alert('No matching keyword found in the query. Please enter valid query')
    }
  }

  return (
    <div>
      <textarea
        rows='5'
        cols='50'
        value={query}
        onChange={handleQueryChange}
        placeholder='Enter your SQL query here'
      ></textarea>
      <button onClick={handleSubmit}>Run Query</button>
    </div>
  )
}

export default SqlQueryInput
