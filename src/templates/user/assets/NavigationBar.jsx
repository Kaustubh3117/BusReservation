import { Menubar } from 'primereact/menubar';
const NavigationBar = () => {
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
                label: 'Cancel',
                icon: 'pi pi-fw pi-align-right'
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
    },
    {
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
    },
  
    {
        label: 'Logout',
        icon: 'pi pi-fw pi-power-off'
    }
];
const start = <img alt="logo" src="showcase/images/logo.png" onError={(e) => e.target.src='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} height="40" className="mr-2"></img>;
    const end = null;
    return (
        <>
<Menubar model={items} start={start} end={end} />
        </>
    );
  }

  export default NavigationBar;