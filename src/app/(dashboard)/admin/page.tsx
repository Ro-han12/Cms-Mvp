import UserCard from "@/components/UserCard";
import CountChart from "@/components/CountChart";
import Announcements from "@/components/Announcements";

const AdminPage = () => {
  return (
    <div className="p-4 flex gap-4 flex-col md:flex-row">
      {/* LEFT */}
      <div className="w-full lg:w-2/3 flex flex-col gap-8">
        {/* USER CARDS */}
        <div className="flex gap-4 justify-between flex-wrap">
          <UserCard type="admin" />
          <UserCard type="teacher" />
          <UserCard type="student" />
        </div>
        
        <div className="w-full lg:w-1/3 h-[450px]">
            <CountChart />
          </div>
        
        
      </div>
      {/* RIGHT */}
      <div className="w-full lg:w-1/3 flex flex-col gap-8">
        <Announcements/>
      </div>
      
    </div>
  );
};

export default AdminPage;
