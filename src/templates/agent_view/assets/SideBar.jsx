import React, { useState } from 'react';
import { Sidebar } from 'primereact/sidebar';
import { Button } from 'primereact/button';
export const SideBar = ()=>{
    const [visibleLeft, setVisibleLeft] = useState(false);

    return(
<>
<Sidebar visible={visibleLeft} onHide={() => setVisibleLeft(false)}>
                    <h3>Left Sidebar</h3>
                    <li>UserName</li>
                    <li>Logout</li>
                    <li>Dashboard</li>
                    <li>Bus</li>
                    <li>Trip Schedule</li>
                    <li>Boarding Point and Dropping Point</li>
                    <li>Bus status</li>
                    <li>Reports</li>
                </Sidebar>
                <Button icon="pi pi-arrow-right" onClick={() => setVisibleLeft(true)} className="mr-2" />
</>
    )

}