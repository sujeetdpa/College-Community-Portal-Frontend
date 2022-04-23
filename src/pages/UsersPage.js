import React, { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component';
import Navbar from '../components/Navbar'
import UserSmallCard from '../components/UserSmallCard';


export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [userPageNo, setUserPageNo] = useState({
    pageNo: 0
  })
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const authHeader = "Bearer " + localStorage.getItem("access_token");
    const userRequest = {
      pageNo: userPageNo.pageNo,
      sortBy: "",
      maxItem: 10
    }
    const options = {
      method: 'POST',
      headers: {
        'Authorization': authHeader,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userRequest)
    }
    fetch("http://localhost:8080/api/admin/users", options)
      .then(res => {
        if (res.ok) {
          throw res.json();
        }
        res.json().then(data => {
          console.log(data);
          setTotalPages(data.totalPages);
          setUsers([...users, ...data.userResponseViews]);
        })
      }).catch(err => {
        err.then(data => {
          console.log(data);
          alert(data.message);
        })
      })
  }, [userPageNo])
  return (
    <div>
      <Navbar />
      <div className='container'>
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Profile Image</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Username</th>
              <th>Active</th>
              <th>Locked</th>
              <th>Operation</th>
            </tr>
          </thead>
          <tbody>
            {/* <InfiniteScroll
              dataLength={users.length} //This is important field to render the next data
              next={() => setUserPageNo({ pageNo: userPageNo.pageNo + 1 })}
              hasMore={(users.length !== 0) && (totalPages - 1) !== userPageNo.pageNo}
              loader={<h4>Loading...</h4>}
              endMessage={
                <p style={{ textAlign: 'center' }}>
                  <b>Yay! You have seen it all</b>
                </p>
              }
            > */}
              {users.map(user => <UserSmallCard userData={user} key={user.id} />)}
            {/* </InfiniteScroll> */}
          </tbody>
        </table>
      </div>
    </div>
  )
}
