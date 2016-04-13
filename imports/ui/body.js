import { Template } from 'meteor/templating';

import { PyData } from '../api/pydata';

import './body.html';

Template.body.helpers({
   pydata() {
       return PyData.find({});
   }
});
