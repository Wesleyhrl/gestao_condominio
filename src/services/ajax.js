import { View, Text } from 'react-native'
import React, { Component } from 'react'
import axios from 'axios'

class Ajax extends Component {

    constructor() {
        super();
    }

    async get (url, params)  {
        let result = {};
        await axios.post(url, params).then(response => {
            console.log(response.data);
            
            result = response.data;
            
        })
        .catch(error => {
            console.error("Error sending data: ", error);
        });

        return result;
    }

    async post (url, params) {
        let result = {};
        await axios.post(url, params).then(response => {
            console.log(response.data);
            
            result = response.data;
            
        })
        .catch(error => {
            console.error("Error sending data: ", error);
        });

        return result;
    }
}