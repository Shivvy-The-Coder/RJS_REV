import { useState } from "react";

function Users()
{
   
const [usersList, setUsersList] = useState([]);
const [pending , setPending] = useState(false);

async function fetchAllUsers() {
        try
        {
            setPending(true);
            const apiResponse = await fetch ('https://dummyjson.com/users');
            const result  = await apiResponse.json();

            if(result?.users)
            {
                setUsersList(result?.users);
                setPending(false);
            }
            else
            {
                setUsersList([])
                setPending(false);
            }
        }
        catch(err)
        {
            console.log(err);
        }

}

// useEffect(()=>{
//     fetchAllUsers();
// },[])

console.log(usersList);
if(pending) return <h1>Loading...</h1>
    return (
        <>
        <h1>All Users List</h1>
        <button onClick={fetchAllUsers}>Fetch User List</button>
        <ul>
            {
                usersList&&usersList.length > 0 ?
                usersList.map(data=>
                    <li key={data?.id}> 
                            {data?.firstName} {data?.lastName}
                    </li>
                ):''
            }
        </ul>
        </>
    )
}

export default Users;