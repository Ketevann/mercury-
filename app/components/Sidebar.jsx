import React from 'react';
import { Link } from 'react-router';

export default function Sidebar(props) {
    
    return (
        <sidebar>
            <section>
                <h1>
                    My Money:
                 </h1>
                     <h5>${this.props.monthlyBudget}</h5>
            </section>
            <hr />
            <section>
                <h1>
                    My Debt:
                 </h1>
            </section>
            <hr />
            <section>
                <h4 className="menu-item">
                    Student Loans:
                 </h4>
            </section>
            <section>
                <h4 className="menu-item">
                    Mortgage:
        </h4>
            </section>
            <section>
                <h4 className="menu-item">
                    Credit Card:
        </h4>
            </section>


        </sidebar>

    );
}