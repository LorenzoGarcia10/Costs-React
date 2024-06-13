import styles from './Project.module.css'

import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

import Loader from './layout/Loader';
import Container from './layout/Container';
import ProjectForm from './Project/ProjectForm';
import Message from './layout/Message';

function Project() {

    const { id } = useParams()

    const [project, setProject] = useState('')
    const [showProject, setShowProject] = useState(false)
    const [showService, setShowService] = useState(false)
    const [message, setMessage] = useState()
    const [type, setType] = useState()


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

    function editPost(project) {

        setMessage('')

        if (project.budget < project.cost) {
            setMessage('O orçamento deve ser maior que o custo do projeto')
            setType('error')
            return false
        }

        fetch(`http://localhost:5000/projects/${project.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(project),
        })
            .then(resp => resp.json())
            .then((data) => {
                setProject(data)
                setShowProject(false)
                setMessage('Projeto atualizado com sucesso')
                setType('success')
            })
            .catch(err => console.log(err))
    }

    function toggleProjectForm() {
        setShowProject(!showProject)
    }

    function toogleServiceForm() {
        setShowService(!showService)
    }

    return (
        <>
            {project.name ? (
                <div className={styles.project_details}>
                    <Container costumClass='column'>
                        {message && <Message type={type} msg={message} />}
                        <div className={styles.details_container}>
                            <h1>Projeto: {project.name}</h1>
                            <button className={styles.btn} onClick={toggleProjectForm}>
                                {!showProject ? 'Editar projeto' : 'Fechar'}
                            </button>
                            {!showProject ? (
                                <div className={styles.project_info}>
                                    <p>
                                        <span>Categoria:</span> {project.category.name}
                                    </p>
                                    <p>
                                        <span>Orçamento:</span> R${project.budget}
                                    </p>
                                    <p>
                                        <span>Total utilizado:</span> {project.cost}
                                    </p>
                                </div>
                            ) : (
                                <div className={styles.project_info}>
                                    <ProjectForm handleSubmit={editPost} btnText='Finalizar edição' projectData={project} />
                                </div>
                            )}
                        </div>
                        <div className={styles.servive_form_container}>
                            <h2>Adicione um serviço:</h2>
                            <button className={styles.btn} onClick={toogleServiceForm}>
                                {!showService ? 'Adicionar serviço' : 'Fechar'}
                            </button>
                            <div className={styles.project_info}>
                                {showService && <div>Formulário pra add serviço</div>

                                }
                            </div>
                        </div>
                        <h2>Serviços</h2>
                        <Container customClass= 'start'>
                                <p>Itens de serviço</p>
                        </Container>
                    </Container>
                </div>
            ) : (
                <Loader />
            )}
        </>
    )
}

export default Project;