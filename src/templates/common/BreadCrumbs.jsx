import { BreadCrumb } from 'primereact/breadcrumb';
export const BreadCrumbs = (props) =>{
    const home = { icon: 'pi pi-home' }
    return (
        <BreadCrumb model={props.items} home={home}/>
    )
}