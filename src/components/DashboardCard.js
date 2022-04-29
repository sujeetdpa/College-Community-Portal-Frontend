import React from 'react'
import './DashboardCard.css'

export default function DashboardCard({header,data}) {
    return (
        <span className="card border-success  cardWidth mb-4">
            <div className="card-header">{header}</div>
            <div className="card-body text-success">
                <h5 className="card-title">{data}</h5>
            </div>
        </span>
    )
}
