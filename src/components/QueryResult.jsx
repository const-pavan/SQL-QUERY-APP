import React, { useState } from 'react'

function QueryResult({ result }) {
  // Define state variables for pagination
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(5) // Default to 5 rows per page

  // Calculate the index range for the current page
  const indexOfLastRow = currentPage * rowsPerPage
  const indexOfFirstRow = indexOfLastRow - rowsPerPage
  const currentRows = result.slice(indexOfFirstRow, indexOfLastRow)

  // Calculate the total number of pages
  const totalPages = Math.ceil(result.length / rowsPerPage)

  // Function to change the current page
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  // Function to change the number of rows per page
  const handleRowsPerPageChange = (e) => {
    setRowsPerPage(parseInt(e.target.value))
    setCurrentPage(1) // Reset to the first page when changing rows per page
  }

  if (result.length === 0) {
    return null
  }

  const headers = Object.keys(currentRows[0])

  return (
    <div>
      <h2>CSV Data</h2>
      <div>
        <label htmlFor='rowsPerPageSelect'>Rows per page:</label>
        <select
          id='rowsPerPageSelect'
          onChange={handleRowsPerPageChange}
          value={rowsPerPage}
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={25}>25</option>
        </select>
      </div>
      <table className='query-table'>
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={header}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {currentRows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {headers.map((header) => (
                <td key={header}>{row[header]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className='pagination'>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
        <div className='pagination-text'>
          Page {currentPage} of {totalPages}
        </div>
      </div>
    </div>
  )
}

export default QueryResult
