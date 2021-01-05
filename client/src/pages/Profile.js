import React from 'react';
import Nav from '../components/Nav';

const Profile = (props) => {
   return (
       <div>
           <Nav
                {...props}
                authenticated={props.authenticated}
                currentUser={props.currentUser}
            />
       </div>
   )
}

export default Profile