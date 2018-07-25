import React from 'react';
import { Table } from 'reactstrap';
import '../../App.css';

export default class Orders extends React.Component {
  render() {
    return (
      <div className="body-content">

        <Table hover>
          <thead>
          <tr>
              <th>Meal</th>
              <th>Price (UGX)</th>
              <th>Date</th>
              <th>Owner</th>
          </tr>
          </thead>
          <tbody>
          <tr>
              <td>Beef stew with local Dishes</td>
              <td>20000</td>
              <td>2018-07-10</td>
              <td>Wasswa Derick</td>
          </tr>
          <tr>
              <td>Chicken Luwombo with Macroon Chicken Luwombo with Macroon</td>
              <td>12000</td>
              <td>2018-07-11</td>
              <td>Iradukunda Becky</td>
          </tr>
          <tr>
              <td>Chips and Chicken</td>
              <td>32000</td>
              <td>2018-07-13</td>
              <td>Innocent Edwin</td>
          </tr>
          </tbody>
        </Table>


      </div>
    );
  }
}
