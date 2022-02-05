import { BreadCrumb } from 'primereact/breadcrumb';
export const BreadCrumbs = () =>{
    const items = [
        {label: 'Computer'},
        {label: 'Notebook'},
        {label: 'Accessories'},
        {label: 'Backpacks'},
        {label: 'Item'}
    ];

    const home = { icon: 'pi pi-home', url: 'https://www.primefaces.org/primereact/showcase' }

    return (
        <BreadCrumb model={items} home={home}/>
    )
}