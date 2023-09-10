import "./dashboard.css";
import DefaultSidebar from "../../components/sidebar/SideBar";
// import InventoryForm from "../../components/forms/InventoryForm";
import MyRoutes from "../../routes";


function Dashboard() {
  return (
    <div className="main_container">
      <div className="sidebar_container h-[100vh]">
        <DefaultSidebar/>
      </div>
      <div className="body_container overflow-y-auto">
        <MyRoutes/>
      </div>
    </div>
  );
}

export default Dashboard;
