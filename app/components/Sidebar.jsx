import React from 'react';
import { Link } from 'react-router';

export default function Sidebar(props) {


    return (
        <sidebar>
            <section>
                <h1>
                    My Budget:
                 </h1>
            </section>
            <hr />
            <section>
                <h4 className="menu-item">
                    Rent
                 </h4>
            </section>
            <section>
                <h4 className="menu-item">
                    Food
        </h4>
            </section>


        </sidebar>
        /*<div id="wrapper">
               <div id="sidebar-wrapper">
                   <ul className="sidebar-nav">
                       <li className="sidebar-brand">
                           <a href="#">
                               Start Bootstrap
                           </a>
                       </li>
                       <li>
                           <a href="#">Dashboard</a>
                       </li>
                       <li>
                           <a href="#">Shortcuts</a>
                       </li>
                       <li>
                           <a href="#">Overview</a>
                       </li>
                       <li>
                           <a href="#">Events</a>
                       </li>
                       <li>
                           <a href="#">About</a>
                       </li>
                       <li>
                           <a href="#">Services</a>
                       </li>
                       <li>
                           <a href="#">Contact</a>
                       </li>
                   </ul>
               </div>
               <div id="page-content-wrapper">
                   <div className="container-fluid">
                       <div className="row">
                           <div className="col-lg-12">
                               <h1>Simple Sidebar</h1>
                               <p>This template has a responsive menu toggling system. The menu will appear collapsed on smaller screens, and will appear non-collapsed on larger screens. When toggled using the button below, the menu will appear/disappear. On small screens, the page content will be pushed off canvas.</p>
                               <p>Make sure to keep all page content within the <code>#page-content-wrapper</code>.</p>
                               <a href="#menu-toggle" className="btn btn-default" id="menu-toggle">Toggle Menu</a>
                           </div>
                       </div>
                   </div>
               </div>
       
           </div>*/
    );
}