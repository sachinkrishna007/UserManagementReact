import UsersDataTable from "../../components/adminComponents/userDataTable";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { useGetUsersDataMutation } from "../../slices/adminApiSlice";

import Loader from  '../../components/loader'

const AdminHomeScreen = () => {
  const [usersData, setUsersData] = useState([]);

  const [usersDataFromAPI, { isLoading }] = useGetUsersDataMutation();

  useEffect(() => {
    try {
      const fetchData = async () => {
        const responseFromApiCall = await usersDataFromAPI();
        console.log(responseFromApiCall);

        const usersArray = responseFromApiCall.data.userData;

        setUsersData(usersArray);
      };

      fetchData();
    } catch (error) {
      toast.error(error);

      console.error("Error fetching users:", error);
    }
  }, []);

  return (
    <div>
      <h1>Users List</h1>
      {isLoading ? <Loader /> : <UsersDataTable users={usersData} />}
    </div>
  );
};

export default AdminHomeScreen;
