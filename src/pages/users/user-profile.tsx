import ProfileComponent from "@/modules/users/profile"

const UserProfile = () => {
  return (
    <div>
         <div className="pt-28 lg:pt-36 bg-layout-gradient"></div>
         <div className="section">
            <div className="box">
                <ProfileComponent/>
            </div>
         </div>
    </div>
  )
}

export default UserProfile