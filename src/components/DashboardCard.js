import React from 'react'

export default function DashboardCard({header,data}) {
    return (
        <div class="card border-success mb-3" style="max-width: 18rem;">
            <div class="card-header">{header}</div>
            <div class="card-body text-success">
                <h5 class="card-title">{data}</h5>
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            </div>
        </div>
    )
}
