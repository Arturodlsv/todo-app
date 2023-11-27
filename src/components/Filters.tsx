import React from 'react'
import { FILTER_BUTTONS } from '../consts'
import { type FilterValues } from '../types'

interface Props {
  onFilterChange: (filter: FilterValues) => void
  filterSelected: FilterValues
}

const Filters: React.FC<Props> = ({ filterSelected, onFilterChange }) => {
  return (
    <ul className="filters">
      {Object.entries(FILTER_BUTTONS).map(([key, { literal }]) => {
        const isSelected = key === filterSelected
        const className = isSelected ? 'selected' : ''
        return (
          <li key={key}>
            <a
              className={className}
              onClick={(event) => {
                event.preventDefault()
                onFilterChange(key as FilterValues)
              }}
            >
              {literal}
            </a>
          </li>
        )
      })}
    </ul>
  )
}

export default Filters
