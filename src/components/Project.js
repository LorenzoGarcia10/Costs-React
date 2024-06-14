import { parse, v4 as uuidv4 } from 'uuid'

import styles from './Project.module.css'

import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

import Loader from './layout/Loader';
import Container from './layout/Container';
import ProjectForm from './Project/ProjectForm';
import Message from './layout/Message';
import ServiceForm from './services/ServiceForm';


function Project() {

    let { id } = useParams()

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

    function createService(project) {

        setMessage('')

        const lastService = project.service[project.service.length - 1]

        lastService.id = uuidv4()

        const lastServiceCost = lastService.cost

        const newCost = parseFloat(project.cost) + parseFloat(lastService)

        if (newCost > parseFloat(project.budget)) {
            setMessage('Orçamento ultrapassado')
            setType('error')
            project.service.pop()
            return false
        }

        project.cost = newCost

        fetch(`http://localhost:5000/projects/${project.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(project)
        })
            .then((resp) => resp.json())
            .then((data) => {

            })
            .catch(err => console.log(err))

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
                                    {showService && (
                                        <ServiceForm
                                            handleSubmit={createService}
                                            btnText='Adicionar serviço'
                                            projectData={project}
                                        />
                                    )}
                                </div>
                            </div>
                            <h2>Serviços</h2>
                            <Container customClass='start'>
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
}
export default Project;