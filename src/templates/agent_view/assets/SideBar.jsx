import React, { useState } from 'react';
import { ProSidebar, SidebarHeader, SidebarFooter, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import 'react-pro-sidebar/dist/css/styles.css';
export const SideBar = () => {
  return (
    <>
      <ProSidebar>
        <Menu iconShape="square">
          <MenuItem>Dashboard  <Link to="/agentView" /></MenuItem>
          <MenuItem>Bus<Link to="/busView" /></MenuItem>
          <MenuItem>Trip Schedule <Link to="/tripScheduleView" /></MenuItem>
          <MenuItem>Boarding Point and Dropping Point</MenuItem>
          <MenuItem>Bus status</MenuItem>
          <MenuItem>Reports</MenuItem>
          <SubMenu title="Components">
            <MenuItem>Add Nested Components</MenuItem>
          </SubMenu>
        </Menu>
        <SidebarFooter className='mb-0'>
          All rights reserved Giobus 2022
        </SidebarFooter>
      </ProSidebar>
    </>
  )

}