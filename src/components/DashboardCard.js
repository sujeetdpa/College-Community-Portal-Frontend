import React from 'react'
import './DashboardCard.css'

export default function DashboardCard({header,data}) {
    return (
        <>
        {/* <span className="card border-success  cardWidth mb-4">
            <div className="card-header">{header}</div>
            <div className="card-body text-success">
                <h5 className="card-title">{data}</h5>
            </div>
        </span> */}
        <div class="col-md-3 grid-margin stretch-card mb-2">
              <div class="card">
                <div class="card-body">
                  <p class="card-title text-md-center text-xl-left">{header}</p>
                  <div class="d-flex flex-wrap justify-content-between justify-content-md-center justify-content-xl-between align-items-center">
                    <h3 class="mb-0 mb-md-2 mb-xl-0 order-md-1 order-xl-0 text-center">{data}</h3>
                    <i class="ti-calendar icon-md text-muted mb-0 mb-md-3 mb-xl-0"></i>
                  </div>  
                  {/* <p class="mb-0 mt-2 text-danger">0.12% <span class="text-black ms-1"><small>(30 days)</small></span></p> */}
                </div>
              </div>
            </div>
        </>
    )
}
