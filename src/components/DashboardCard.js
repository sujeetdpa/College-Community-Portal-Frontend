import React from 'react'
import './DashboardCard.css'

export default function DashboardCard({header,data}) {
    return (
        <div className="card border-success mb-3 cardWidth">
            <div className="card-header">{header}</div>
            <div className="card-body text-success">
                <h5 className="card-title">{data}</h5>
            </div>
        </div>
    )
}
