import { useState } from 'react';

import Input from '../form/Input';
import Submit from '../form/Submit';
import styles from '../Project/ProjectForm.module.css';  // Ensure this path is correct

function ServiceForm({ handleSubmit, btnText, projectData }) {
    const [service, setService] = useState({});

    function submit(e) {
        e.preventDefault(); 
        projectData.services.push(service);
        handleSubmit(projectData);
    }

    function handleChange(e) {
        setService({ ...service, [e.target.name]: e.target.value });
    }

    return (
        <form onSubmit={submit} className={styles.form}>
            <Input
                type='text'
                text='Nome do Serviço'
                name='name'
                placeholder='Insira o nome do Serviço'
                handleOnChange={handleChange}
            />
            <Input
                type='number'
                text='Custo do Serviço'
                name='cost'
                placeholder='Insira o valor total'
                handleOnChange={handleChange}
            />
            <Input
                type='text'
                text='Descrição do Serviço'
                name='description'
                placeholder='Descreva o Serviço'
                handleOnChange={handleChange}
            />
            <Submit text={btnText} />
        </form>
    );
}

export default ServiceForm;
