import React, { useEffect, useState } from 'react';
import axios from "axios";
import { GridView } from '../../../common/grid_view/GridView';
import { backendUrl } from '../../../../environment/development';
import { SideBar } from '../../assets/SideBar'

export const BusStatus = () =>{
    return(
        <>
         <div className='grid'>
                <div className='col-3'>
                    <SideBar />
                </div>
                <div className='col-9'>
                   <h1>Bus Status</h1>
                </div>
            </div>
        </>
    )
}