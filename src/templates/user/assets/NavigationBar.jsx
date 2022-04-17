import { Menubar } from 'primereact/menubar';
import { useSelector } from "react-redux";
import { connect } from "react-redux";
import { logout } from "../../../stores/accounts/actions/AuthActions";
const NavigationBar = ({logout}) => {
    const isAuthenticated = useSelector(
        (state) => state.auth.isAuthenticated
      );
      const userEmail = useSelector(
        (state) => state.auth.user!==null?state.auth.user.email:null
      );
      console.log('isAuthenticated...',isAuthenticated)
      console.log('userEmail...', userEmail)

      const logoutUser = ()=>{
          logout()
      }
  const items = [
    {
        label: 'Manage Booking',
        icon: 'pi pi-fw pi-ticket',
        items: [
            {
                label: 'Bus Ticket',
                icon: 'pi pi-fw pi-align-left',
                command: () => {
                  window.location.href='/'
                }},
            {
                label: 'Manage Booking',
                icon: 'pi pi-fw pi-align-right',
                command: () => {
                    window.location.href='/manageBooking'
                  },
            },
            {
                label: 'Change Travel date',
                icon: 'pi pi-fw pi-align-center'
            },
            {
                label: 'Show My Ticket',
                icon: 'pi pi-fw pi-align-justify',
                command: () => {
                  window.location.href='/manageBooking'
                }
            },

        ]
    }
  
];

if(isAuthenticated && userEmail !== null){
    const authItems = {
        label: 'Logout',
        icon: 'pi pi-fw pi-power-off',
        command: () => {
            logoutUser();
          }
    }
    const email = {
        label: userEmail,
        icon: 'pi pi-fw pi-user'
    }
items.push(authItems)
items.push(email)
}
else{
    const usersRegistration =   {
        label: 'Users',
        icon: 'pi pi-fw pi-user',
        items: [
            {
                label: 'Login',
                icon: 'pi pi-fw pi-user-plus',
                command: () => {
                  window.location.href='/login'
                }

            },
            {
                label: 'Register',
                icon: 'pi pi-fw pi-user-minus',
                command: () => {
                  window.location.href='/signup'
                }
            },
        ]
    }
items.push(usersRegistration)
}
const start = <img alt="logo" src="showcase/images/logo.png" onError={(e) => e.target.src='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} height="40" className="mr-2"></img>;
    const end = null
    return (
        <>
<Menubar model={items} start={start} end={end} />
        </>
    );
  }

  export default connect(null, { logout })(NavigationBar);