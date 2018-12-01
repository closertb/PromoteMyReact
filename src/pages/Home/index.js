import React from 'react';
import HomeDesc from '../../components/HomeDesc';
import { SiteName } from '../../configs/constants';

export default class Root extends React.Component {
  render() {
    return (
      <div>
        <h1>this is a home page</h1>
        <HomeDesc name={SiteName} />
      </div>

    );
  }
}