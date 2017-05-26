import React, { Component } from 'react';

import $ from 'jquery';

class CrudGenerator extends Component {
    toggleModal(id){
        $("#"+id).toggle();
    }
    submitUpdate(prev,id,e){
        e.preventDefault();
        let data = {}
        for(var i=0;i<e.target.length;i++){
            if(e.target[i].name !== ""){
                if(e.target[i].type === "file"){
                    if(e.target[i].files[0] === undefined){
                        data[e.target[i].name] = ""
                    }else{
                        data[e.target[i].name] = e.target[i].files[0] 
                    }
                }else[
                    data[e.target[i].name] = e.target[i].value
                ]
            }
        }
        this.toggleModal(id);
        this.props.config.update.action(prev,data);
    }
    submitDelete(data,id,e){
        this.toggleModal(id);
        this.props.config.delete.action(data);        
    }
    submitCreate(id,e){
        e.preventDefault();
        let data = {}
        for(var i=0;i<e.target.length;i++){
            if(e.target[i].name !== ""){
                if(e.target[i].type === "file"){
                    if(e.target[i].files[0] === undefined){
                        data[e.target[i].name] = ""
                    }else{
                        data[e.target[i].name] = e.target[i].files[0] 
                    }
                }else[
                    data[e.target[i].name] = e.target[i].value
                ]
            }
        }
        this.toggleModal(id);
        this.props.config.create.action(data);        
    }
    render() {
        try{
            return (
                <div id="CrudGen"style={styles.div}>
                    <link href="https://fonts.googleapis.com/css?family=Quicksand" rel="stylesheet" /> 
                    <style>
                        {'#CrudGen label{font-size:14px;font-weight:bold}'}
                        {'#CrudGenTab{border-collapse: collapse;text-align:center}'}
                        {'#CrudGenTab thead tr td{border:1px solid gray;background:#CCC;height:30px}'}
                        {'#CrudGenTab tbody tr td{padding:10px 0 10px 0; white-space: nowrap;overflow: hidden;text-overflow: ellipsis;}'}
                        {'#CrudGenTab tbody tr:nth-child(even){background:#EEE}'}
                    </style>
                    <h2>{this.props.config.name}</h2>
                    {this.props.config.create.enable ?
                        <div>
                            <button
                                style={styles.form_modal_ok}
                                onClick={this.toggleModal.bind(this,this.props.config.name+"Create")}>
                                    {"Crear "+ this.props.config.name}
                            </button>
                            <div id={this.props.config.name+"Create"} style={styles.modal}>
                                <div style={styles.modal_box}>
                                    <h4 style={{textAlign:"center"}}>{"Crear "+this.props.config.name}</h4>
                                    <hr/>
                                    <span
                                        onClick={this.toggleModal.bind(this,this.props.config.name+"Create")}
                                        style={styles.modal_close}
                                    >
                                        X [Cerrar]
                                    </span>
                                    <form
                                        style={styles.form_modal}
                                        onSubmit={this.submitCreate.bind(this,this.props.config.name+"Create")}>
                                            {this.props.config.fields.map((j,key2)=>{
                                                let input = null;
                                                if(j.create){
                                                    switch(j.type){
                                                        case "text":
                                                            input = <div key={key2}>
                                                                <label>{j.text}</label><br/>
                                                                <div style={styles.form_modal_input}>
                                                                    <i className="fa fa-font" style={styles.icon_input} />
                                                                    <input
                                                                        style={styles.form_modal_input_text}
                                                                        type="text"
                                                                        placeholder={j.text}
                                                                        name={j.name} />
                                                                    <br/><br/>
                                                                </div>
                                                            </div>
                                                            return input
                                                        case "number":
                                                            input = <div key={key2}>
                                                                <label>{j.text}</label><br/>
                                                                <div style={styles.form_modal_input}>
                                                                    <i className="fa fa-sort-numeric-asc" style={styles.icon_input} />
                                                                    <input
                                                                        style={styles.form_modal_input_text}
                                                                        type="number"
                                                                        placeholder={j.text}
                                                                        name={j.name} />
                                                                </div>
                                                                <br/><br/>
                                                            </div>
                                                            return input
                                                        case "color":
                                                            input = <div key={key2}>
                                                                <label>{j.text}</label><br/>
                                                                <div style={styles.form_modal_input}>
                                                                    <i className="fa fa-paint-brush" style={styles.icon_input_color} />
                                                                    <input
                                                                        style={styles.form_modal_input_color}
                                                                        type="color"
                                                                        name={j.name} />
                                                                </div>
                                                                <br/><br/>
                                                            </div>
                                                            return input
                                                        case "select":
                                                            input = <div key={key2}>
                                                                <label>{j.text}</label><br/>
                                                                <div style={styles.form_modal_input}>
                                                                    <i className="fa fa-list" style={styles.icon_input} />
                                                                    <select
                                                                        style={styles.form_modal_input_text}
                                                                        name={j.name}
                                                                        required>
                                                                        {j.options.map((k,key3)=>{
                                                                            return <option key={key3} value={k.value}>{k.text}</option>
                                                                        })}
                                                                    </select>
                                                                </div>
                                                                <br/><br/>
                                                            </div>
                                                            return input
                                                        case "image":
                                                            input = <div key={key2}>
                                                                <label>{j.text}</label><br/>
                                                                <img
                                                                    id={j.name+"ImageCreate"+key2}
                                                                    style={styles.image_modal} />
                                                                <br/>
                                                                <input type="file" name={j.name} onChange={(e)=>{
                                                                    let reader = new FileReader();
                                                                    reader.onload = function (e2) {
                                                                        $("#"+j.name+"ImageCreate"+key2)
                                                                            .attr("src",e2.target.result);
                                                                    }
                                                                    reader.readAsDataURL(e.target.files[0]);
                                                                }}/>
                                                                <br/><br/>
                                                            </div>
                                                            return input
                                                        case "file":
                                                            input = <div key={key2}>
                                                                <label>{j.text}</label><br/>
                                                                <input type="file" name={j.name} />
                                                                <br/><br/>
                                                            </div>
                                                            return input
                                                    }
                                                }
                                            })} 
                                            <hr/>
                                            <button type="submit" style={styles.form_modal_ok}>Crear</button>
                                            <span>&nbsp;&nbsp;</span>
                                            <span
                                                style={styles.form_modal_cancel}
                                                onClick={this.toggleModal.bind(this,this.props.config.name+"Create")} >
                                                Cancelar
                                            </span>
                                    </form>
                                </div>
                            </div>
                        </div> : null
                    }
                    <br/><br/>
                    <table id="CrudGenTab" style={styles.table}>
                        <thead >
                            <tr>
                                {this.props.config.fields.map((i,key)=>{
                                    return <td key={key}>{i.text}</td>
                                })}
                                {this.props.config.update.enable ?
                                    <td>-</td> : null
                                }
                                {this.props.config.delete.enable ?
                                    <td>-</td> : null
                                }
                                {this.props.config.actions.map((i,key)=>{
                                    return <td key={key}>-</td>
                                })}
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.data.map((i,key)=>{
                                return <tr key={key}>
                                    {this.props.config.fields.map((j,key2)=>{
                                        switch(j.type){
                                            case "text":
                                            case "number":
                                                return <td key={key2}>
                                                    {i[j.name]}
                                                </td>
                                            case "image":
                                                return <td key={key2}>
                                                    <img src={i[j.name]} style={styles.image}/> 
                                                </td>
                                            case "file":
                                                return <td key={key2}>
                                                    {i[j.name] === "" || i[j.name] === undefined ?
                                                        <p>No hay archivo</p>:
                                                        <a href={i[j.name]} target="_blank">{"Ver "+j.text}</a> 
                                                    }
                                                </td>
                                            case "select":
                                                return <td key={key2}>
                                                    {j.options.map((k)=>{
                                                        if( i[j.name] === k.value ){
                                                            return k.text
                                                        }
                                                    })}
                                                </td>
                                            case "color":
                                                return <td key={key2}>
                                                    <div style={{
                                                        background:i[j.name],
                                                        width:"40px",
                                                        height:"20px",
                                                        margin: "0 auto 0 auto"
                                                    }}></div>
                                                </td>
                                        }
                                    })}
                                    {this.props.config.update.enable ?
                                        <td>
                                            <span
                                                style={styles.table_edit}
                                                onClick={this.toggleModal.bind(this,this.props.config.name+"Edit"+key)}>
                                                Editar
                                            </span>
                                            <div id={this.props.config.name+"Edit"+key} style={styles.modal}>
                                                <div style={styles.modal_box}>
                                                    <h4>{"Editar "+this.props.config.name}</h4>
                                                    <hr/>
                                                    <span
                                                        onClick={this.toggleModal.bind(this,this.props.config.name+"Edit"+key)}
                                                        style={styles.modal_close}
                                                    >
                                                        X [Cerrar]
                                                    </span>
                                                    <form
                                                        style={styles.form_modal}
                                                        onSubmit={this.submitUpdate.bind(this,i,this.props.config.name+"Edit"+key)}>
                                                            {this.props.config.fields.map((j,key2)=>{
                                                                let input = null;
                                                                if(j.update){
                                                                    switch(j.type){
                                                                        case "text":
                                                                            input = <div key={key2}>
                                                                                <label>{j.text}</label><br/>
                                                                                <div style={styles.form_modal_input}>
                                                                                    <i className="fa fa-font" style={styles.icon_input}></i>
                                                                                    <input
                                                                                        style={styles.form_modal_input_text}
                                                                                        type="text"
                                                                                        placeholder={j.text}
                                                                                        defaultValue={i[j.name]}
                                                                                        name={j.name} 
                                                                                        required/>
                                                                                </div>
                                                                                <br/><br/>
                                                                            </div>
                                                                            return input
                                                                        case "number":
                                                                            input = <div key={key2}>
                                                                                <label>{j.text}</label><br/>
                                                                                <div style={styles.form_modal_input}>
                                                                                    <i className="fa fa-sort-numeric-asc" style={styles.icon_input}></i>
                                                                                    <input
                                                                                        style={styles.form_modal_input_text}
                                                                                        type="number"
                                                                                        placeholder={j.text}
                                                                                        defaultValue={i[j.name]}
                                                                                        name={j.name} 
                                                                                        required/>
                                                                                </div>
                                                                                <br/><br/>
                                                                            </div>
                                                                            return input
                                                                        case "color":
                                                                            input = <div key={key2}>
                                                                                <label>{j.text}</label><br/>
                                                                                <div style={styles.form_modal_input}>
                                                                                    <i className="fa fa-paint-brush" style={styles.icon_input_color}></i>
                                                                                    <input
                                                                                        style={styles.form_modal_input_color}
                                                                                        type="color"
                                                                                        defaultValue={i[j.name]}
                                                                                        name={j.name} 
                                                                                        required/>
                                                                                </div>
                                                                                <br/><br/>
                                                                            </div>
                                                                            return input
                                                                        case "select":
                                                                            input = <div key={key2}>
                                                                                <label>{j.text}</label><br/>
                                                                                <div style={styles.form_modal_input}>
                                                                                    <i className="fa fa-list" style={styles.icon_input}></i>
                                                                                    <select
                                                                                        style={styles.form_modal_input_text}
                                                                                        defaultValue={i[j.name]}
                                                                                        name={j.name}
                                                                                        required>
                                                                                        {j.options.map((k,key3)=>{
                                                                                            return <option key={key3} value={k.value}>{k.text}</option>
                                                                                        })}
                                                                                    </select>
                                                                                </div>
                                                                                <br/><br/>
                                                                            </div>
                                                                            return input
                                                                        case "image":
                                                                            input = <div key={key2}>
                                                                                <label>{j.text}</label><br/>
                                                                                <img
                                                                                    id={j.name+"ImageUpdate"+key+key2}
                                                                                    style={styles.image_modal}
                                                                                    src={i[j.name]} />
                                                                                <br/>
                                                                                <input type="file" name={j.name} onChange={(e)=>{
                                                                                    let reader = new FileReader();
                                                                                    reader.onload = function (e2) {
                                                                                        $("#"+j.name+"ImageUpdate"+key+key2)
                                                                                            .attr("src",e2.target.result);
                                                                                    }
                                                                                    reader.readAsDataURL(e.target.files[0]);
                                                                                }}/>
                                                                                <br/><br/>
                                                                            </div>
                                                                            return input
                                                                        case "file":
                                                                            input = <div key={key2}>
                                                                                <label>{j.text}</label><br/>
                                                                                &nbsp;&nbsp;
                                                                                {i[j.name] === "" || i[j.name] === undefined ?
                                                                                    <span>No hay archivo</span>:
                                                                                    <a
                                                                                        href={i[j.name]}
                                                                                        target="_blank">
                                                                                            {"Ver "+ j.text}
                                                                                    </a>
                                                                                }
                                                                                <br/><br/>
                                                                                <input type="file" name={j.name} />
                                                                                <br/><br/>
                                                                            </div>
                                                                            return input
                                                                    }
                                                                }
                                                            })} 
                                                            <hr/>
                                                            <button type="submit" style={styles.form_modal_ok}>Actualizar</button>
                                                            <span>&nbsp;&nbsp;</span>
                                                            <span
                                                                style={styles.form_modal_cancel}
                                                                onClick={this.toggleModal.bind(this,this.props.config.name+"Edit"+key)} >
                                                                Cancelar
                                                            </span>
                                                    </form>
                                                </div>
                                            </div>
                                        </td> : null
                                    }
                                    {this.props.config.delete.enable ?
                                        <td>
                                            <span
                                                style={styles.table_delete}
                                                onClick={this.toggleModal.bind(this,this.props.config.name+"Delete"+key)}>
                                                Eliminar
                                            </span>
                                            <div
                                                id={this.props.config.name+"Delete"+key}
                                                style={styles.modal}>
                                                <div style={styles.modal_box_delete}>
                                                    <h4>{"Eliminar "+this.props.config.name}</h4>                                                
                                                    <hr/>
                                                    <p>{"¿ Desea eliminar este "+this.props.config.name+"?"}</p>
                                                    <hr/>
                                                    <button
                                                        style={styles.form_modal_ok}
                                                        onClick={this.submitDelete.bind(this,i,this.props.config.name+"Delete"+key)} >
                                                        Eliminar
                                                    </button>
                                                    <span>&nbsp;&nbsp;</span>
                                                    <span
                                                        style={styles.form_modal_cancel}
                                                        onClick={this.toggleModal.bind(this,this.props.config.name+"Delete"+key)} >
                                                        Cancelar
                                                    </span>
                                                </div>
                                            </div>
                                        </td> : null
                                    }                                
                                    {this.props.config.actions.map((j,key2)=>{
                                        return <td key={key2}>
                                            <button
                                                style={styles.form_modal_primary}
                                                onClick={j.action.bind(this,i)}>
                                                    {j.text}
                                            </button>
                                        </td>
                                    })}
                                </tr>
                            })}
                        </tbody>
                    </table>
                </div>
            );
        }
        catch(e){
            return <div style={styles.div}>
                <p style={{color:"red"}}>Cargando configuracion..</p>
                <p style={{fontSize:"10px"}}>{e.message}</p>
            </div>
        }
    }
}

const styles = {
    div:{
        fontFamily: "'Quicksand', sans-serif"
    },
    table:{
        width: "100%",
        tableLayout: "fixed"
    },
    table_edit:{
        color: "blue",
        cursor: "pointer",
        textDecoration: "underline"
    },
    table_delete:{
        color: "red",
        cursor: "pointer",
        textDecoration: "underline"
    },
    image:{
        width: "60px"
    },
    image_modal:{
        width: "200px"
    },
    modal: {
        width: "100%",
        height: "100%",
        position: "fixed",
        zIndex:"1000",
        display : "none",
        top: "0",
        left:"0",
        background: "rgba(0,0,0,0.5)"
    },
    modal_box:{
        background: "white",
        width: "50%",
        margin: "auto",
        transform: "translateY(-50%)",
        top: "50%",
        height: "80%",
        overflow: "auto",
        position: "relative"
    },
    modal_box_delete:{
        background: "white",
        width: "70%",
        margin: "auto",
        transform: "translateY(-50%)",
        top: "50%",
        overflow: "auto",
        position: "relative",
        padding: "0 0 20px 0"
    },
    modal_close:{
        position: "fixed",
        top: "10px",
        right: "10px",
        cursor: "pointer",
        color: "red",
        fontSize: "20px"
    },
    form_modal:{
        padding: "20px",
        textAlign: "left"
    },
    form_modal_input:{
        background: "white",
        border: "1px solid gray",
        height: "30px",
        padding: "0 10px 0 10px",
        color: "black",
        display:"inline-block",
    },
    form_modal_input_text:{
        background: "white",
        border: "none",
        color: "black",
        display:"inline-block",
        padding:"0 0 0 10px"
    },
    form_modal_input_color:{
        background: "none",
        border: "none",
        margin:"auto",
        display: "inline-block",
        height: "20px"
    },
    form_modal_ok:{
        background:"#1d8348",
        color: "white",
        height: "30px",
        padding:"0 20px 0 20px",
        border: "none",
        cursor: "pointer",
        fontSize: "15px",
        fontFamily: "'Quicksand', sans-serif",
    },
    form_modal_primary:{
        background:"#618793",
        color: "white",
        height: "30px",
        padding:"0 20px 0 20px",
        border: "none",
        cursor: "pointer",
        fontSize: "15px",
        fontFamily: "'Quicksand', sans-serif",        
    },
    form_modal_cancel:{
        background:"#c0392b",
        fontFamily: "'Quicksand', sans-serif",        
        color: "white",
        height: "30px",
        lineHeight: "30px",
        textAlign:"center",
        padding:"0 20px 0 20px",
        border: "none",
        cursor: "pointer",
        display: "inline-block",
        fontSize: "15px",
    },
    icon_input:{
        height: "30px",
        lineHeight: "30px",
        color:"gray",
        borderRight: "1px solid gray",
        padding: "0 10px 0 0"
    },
    icon_input_color:{
        height: "30px",
        lineHeight: "30px",
        color:"gray",
        borderRight: "1px solid gray",
        padding: "0 10px 0 0"
    }
}

export default CrudGenerator;
