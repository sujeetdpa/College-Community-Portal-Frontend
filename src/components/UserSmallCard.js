import React from 'react'

export default function UserSmallCard({ userData }) {
    return (
        <tr>
            <td>Id</td>
            <td>Profile Image</td>
            <td>First Name</td>
            <td>Last Name</td>
            <td>Username</td>
            <td>Active</td>
            <td>Locked</td>
            <td><button> Lock Account</button></td>
            <td><button>View</button></td>
        </tr>
    )
}
