import { useState, useEffect } from 'react';
import FormDialog from './FormDialog';
export default function TestingForm(){
    const [info, setInfo] = useState("hello")
    const form = {
        buttonLabel:"New Ingredient", 
        title:"New Ingredient Input", 
        text:"Add a new ingredient to table",
        inputs: [
            {id:"name", label:"Name", type:"text", key:"name", hook: setInfo}
        ]
    }
    const onAdd = () => {
        alert(info);
    }
    // this will be a page like /ingredients 
    return (
        <FormDialog 
            buttonLabel={form.buttonLabel}
            title={form.title}
            text={form.text}
            submitAction={onAdd}
            inputs={form.inputs}
        />
    )
}