import React from 'react';
import {ProEditor} from "./ProEditor";
import {ProForm, ProFormItem} from "../ProForm";
import Button from "@mui/material/Button";

export default {
    title: 'ProEditor',
    component: ProEditor,
}

function Template() {
    return <ProEditor apiKey={'axhtqrj8j26uon609azst3p14c2a0wuyukqmjmfcjjo6pjmx'}/>
}

export const Default = Template.bind({})

export const WithTinyMce = () => {

    const onSubmit = (data) => {
        console.log(data);
        alert(JSON.stringify(data));
    };

    return (
        <ProForm defaultValues={{ content: 'ffff' }} onSubmit={onSubmit}>
            <ProFormItem
                prop={'content'}
                render={({ name, field }) => {
                    return (
                        <ProEditor
                            name={name}
                            apiKey={'axhtqrj8j26uon609azst3p14c2a0wuyukqmjmfcjjo6pjmx'}
                            {...field}
                        />
                    )
                }}
            />
            <Button type={'submit'}>submit</Button>
        </ProForm>
    )
}
