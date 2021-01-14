
import React from 'react';
import HomeIcon from '@material-ui/icons/Home';
import StorageIcon from '@material-ui/icons/Storage';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import CameraRearIcon from '@material-ui/icons/CameraRear';
import SettingsInputAntennaIcon from '@material-ui/icons/SettingsInputAntenna';

const appMenus = [
    {pageName: 'financialAdvisor', icon: 'HomeIcon', name: 'Home', selected: false},
];

const myIcons = function (iconName) {
    switch(iconName) {
      case 'HomeIcon':
        return (<HomeIcon/>)
     
      default: 
        return (<HomeIcon />)
    }
  }


const NODE_TYPE_DATABASE_TYPE = 'databasetype'
const NODE_TYPE_DATABASE = 'databases'
const NODE_TYPE_SUBJECT = 'subjects'
const NODE_TYPE_CLUSTER = 'clusters'
const NODE_TYPE_ELEMENT_CLUSTER = 'elementclusters'
const NODE_TYPE_ELEMENT_SUB_CLUSTER = 'elementsubclusters'

export {appMenus, myIcons, NODE_TYPE_DATABASE_TYPE, NODE_TYPE_DATABASE, NODE_TYPE_SUBJECT, NODE_TYPE_CLUSTER, NODE_TYPE_ELEMENT_CLUSTER, NODE_TYPE_ELEMENT_SUB_CLUSTER}