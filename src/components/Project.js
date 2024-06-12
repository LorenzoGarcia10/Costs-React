import styles from './Project.module.css'

import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

import Loader from './layout/Loader';
import Container from './layout/Container';
function Project() {

    const { id } = useParams()

    const [project, setProject] = useState('')

    useEffect(() => {

        fetch(`http://localhost:5000/projects/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(resp => resp.json())
            .then((data) => {
                setProject(data)
            })
            .catch((err) => console.log(err))
    }, [id])

    return (
        <>
            {project.name ? 
            <div>
                <Container costumClass='column'>
                    <div>
                        <h1>Projeto: {project.name}</h1>
                        <button>Editar projeto</button>
                    </div>
                </Container>
            </div>
            : (
                <Loader />
            )}
        </>
    )
}

export default Project;