import React from 'react'
import './DashboardCard.css'

export default function DashboardCard({ header, data }) {
  return (
    <>
      <div className="col-md-3 grid-margin stretch-card mb-2">
        <div className="card">
          <div className="card-body">
            <p className="card-title text-md-center text-xl-left">{header}</p>
            <div className="d-flex flex-wrap justify-content-between justify-content-md-center justify-content-xl-between align-items-center">
              <h3 className="mb-0 mb-md-2 mb-xl-0 order-md-1 order-xl-0 text-center">{data}</h3>
              <i className="ti-calendar icon-md text-muted mb-0 mb-md-3 mb-xl-0"></i>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
