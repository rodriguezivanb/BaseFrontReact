import React, { Component } from 'react';

import CrudGen from "./CrudGen.jsx";

const data = [
        {
            id: 1,
            name:"Carlos Morales",
            image:"https://heatherchristenaschmidt.files.wordpress.com/2011/09/facebook_no_profile_pic2-jpg.gif",
            state: "DISABLE",
            age: 23,
            color: "#cccccc",
            document: ""
        }
];

const config = {
    name: "Usuario",
    fields : [
        {name:"id", type:"number", text:"ID", update:false, create: false},
        {name:"name", type:"text", text:"Nombre", update:true, create: true},
        {name:"age", type:"number", text:"Edad", update:true, create: true},
        {name:"image", type:"image", text:"Foto De Perfil", update:true, create: true},
        {name:"color", type:"color", text:"Color de auto", update:true, create: true},
        {name:"document", type:"file", text:"Pasaporte", update:true, create: true},
        {name:"state", type:"select",text:"¿Usuario Activo?", update:true, create: true, options:[
            {value:"ACTIVE",text:"Activo"},
            {value:"DISABLE",text:"Inactivo"},
        ]},
    ],
    update: {
        enable: true,
        action: (prev,next) => {
            alert(JSON.stringify(prev));
            alert(JSON.stringify(next));
        }
    },
    delete: {
        enable: true,
        action: (data) => {
            alert(JSON.stringify(data));
        }
    },
    create: {
        enable: true,
        action: (data) => {
            alert(JSON.stringify(data));
        }
    },
    // Empty array if not additional actions in row
    actions:[
        {text:"Saludar",action:(data)=>{alert("Hola Querido "+data.name)}},
    ]
}

class Example extends Component {
    constructor(props){
        super(props);
        this.state = {
            data: [],
            config: {}
        }
    }
    componentDidMount() {
        this.setState({
            data: data,
            config: config
        });
    }
    
    render() {
        return (
            <div>
                <CrudGen config={this.state.config} data={this.state.data}/>
            </div>
        );
    }
}

export default Example;