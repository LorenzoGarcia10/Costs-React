import { parse, v4 as uuidv4 } from 'uuid'
import styles from './Project.module.css'
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Loader from './layout/Loader';
import Container from './layout/Container';
import ProjectForm from './Project/ProjectForm';
import Message from './layout/Message';
import ServiceForm from './services/ServiceForm';
import ServiceCard from './services/ServiceCard';


function Project() {

    const { id } = useParams()

    const [project, setProject] = useState([])
    const [services, setServices] = useState([])
    const [showProjectForm, setShowProjectForm] = useState(false)
    const [showServiceForm, setShowServiceForm] = useState(false)
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
                setServices(data.services)
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
                setShowProjectForm(false)
                setMessage('Projeto atualizado com sucesso')
                setType('success')
            })
            .catch(err => console.log(err))
    }

    function createService(projectResult) {
        setMessage('')
        const lastService = projectResult.services.length > 0 ? projectResult.services[projectResult.services.length - 1] : projectResult.services[0]

        lastService.id = uuidv4()

        const lastServiceCost = lastService.cost
        const newCost = parseFloat(projectResult.cost) + parseFloat(lastServiceCost)

        if (newCost > parseFloat(projectResult.budget)) {
            setMessage('Orçamento ultrapassado')
            setType('error')
            projectResult.services.pop()
            return false
        }

        projectResult.cost = newCost

        fetch(`http://localhost:5000/projects/${projectResult.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(projectResult)
        })
            .then((resp) => resp.json())
            .then((data) => {
                setProject(data)
                setShowServiceForm(false)
                setMessage('Serviço adicionado com sucesso')
                setType('success')
            })
            .catch(err => console.log(err))
    }

    function removeService(id, cost) {

        const servicesUptaded = project.services.filter(
            (service) => service.id !== id
        )

        const projectUptaded = project

        projectUptaded.services = servicesUptaded
        projectUptaded.cost = parseFloat(projectUptaded.cost) - parseFloat(cost)

        fetch(`http://localhost:5000/projects/${projectUptaded.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(projectUptaded)
        })
        .then((resp) => resp.json())
        .then((data) => {
            setProject(projectUptaded)
            setServices(servicesUptaded)
            setMessage('Serviço removido com sucesso')
        })
        .catch(err => console.log(err))
    }

    function toggleProjectForm() {
        setShowProjectForm(!showProjectForm)
    }

    function toggleServiceForm() {
        setShowServiceForm(!showServiceForm)
    }

    return (
        <>
            {project.name ? (
                <div className={styles.project_details}>
                    <Container customClass='column'>
                        {message && <Message type={type} msg={message} />}
                        <div className={styles.details_container}>
                            <h1>Projeto: {project.name}</h1>
                            <button className={styles.btn} onClick={toggleProjectForm}>
                                {!showProjectForm ? 'Editar projeto' : 'Fechar'}
                            </button>
                            {!showProjectForm ? (
                                <div className={styles.project_info}>
                                    <p>
                                        <span>Categoria:</span> {project.category.name}
                                    </p>
                                    <p>
                                        <span>Orçamento:</span> R${project.budget}
                                    </p>
                                    <p>
                                        <span>Total utilizado:</span> R${project.cost}
                                    </p>
                                </div>
                            ) : (
                                <div className={styles.project_info}>
                                    <ProjectForm handleSubmit={editPost} btnText='Finalizar edição' projectData={project} />
                                </div>
                            )}
                        </div>
                        <div className={styles.service_form_container}>
                            <h2>Adicione um serviço:</h2>
                            <button className={styles.btn} onClick={toggleServiceForm}>
                                {!showServiceForm ? 'Adicionar serviço' : 'Fechar'}
                            </button>
                            <div className={styles.project_info}>
                                {showServiceForm && (
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
                            {services.length > 0 &&
                                services.map((service) => (
                                    <ServiceCard
                                        id={service.id}
                                        name={service.name}
                                        cost={service.cost}
                                        description={service.description}
                                        key={service.id}
                                        handleRemove={removeService}
                                    />
                                ))
                            }
                            {services.length === 0 &&
                                <p>Não há serviços cadastrados.</p>
                            }
                        </Container>
                    </Container>
                </div>
            ) : (
                <Loader />
            )}
        </>
    )
}

export default Project
