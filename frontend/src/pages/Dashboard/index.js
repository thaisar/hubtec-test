import React, { useEffect, useState } from 'react';
import { useSelector, connect } from 'react-redux';
import { navigate } from '@reach/router'
import Column from '../../components/Column/index'
import { Modal, Input, message, DatePicker, Icon } from 'antd';
import {
    Container,
    ModalFormContainer,
    InputContainer,
    Title,
    AddButton,
    TitleContainer,
    FloatButton,
    Background
} from './styles'
import Card from '../../components/Card/index';
import { logout } from '../../redux/actions/user'
import { get as getTasks, getTask, deleteTask, create, edit, changeStatus } from '../../redux/actions/tasks'

const bindConnection = Component => {
    return connect(null, {
        getTasks,
        deleteTask,
        create,
        edit,
        changeStatus,
        getTask,
        logout
    })(Component);
}

const columns = [
    { title: 'To do', name: 'toDo' },
    { title: 'Doing', name: 'doing' },
    { title: 'Done', name: 'done' },
    { title: 'Late', name: 'late' }
];

const Dashboard = (props) => {
    const [visible, setVisible] = useState(false)
    const [columnAction, setColumnAction] = useState("")
    const cards = useSelector(state => state.task.all)
    const task = useSelector(state => state.task.data)

    const { creating, editing } = useSelector(state => state.task)

    const [state, setState] = useState({
        title: '',
        description: '',
        date: '',
        editedId: "",
        isEditing: false
    })

    useEffect(() => {
        props.getTasks();
    }, [])

    const handleOpenModal = (action) => {
        setState({ ...task[0], editedId: "", isEditing: false });
        setVisible(true)
        setColumnAction(action)
    }

    const handleDeleteTask = (id, status) => {
        props.deleteTask(id, status)
    }

    const handleChange = (event) => {
        setState({
            ...state,
            [event.target.name]: event.target.value
        })
    }

    const validateFieldsPresence = () => {
        if (!state.title)
            return "title field is required"

        if (!state.description)
            return "description field is required"

        if (!state.date)
            return "date field is required"

        return false
    }

    const handleSubmit = (id = "") => {
        const hasError = validateFieldsPresence()
        if(hasError)
            return message.error(hasError)
            
        if (id) {
            props.edit({ ...state }, id)
        } else {
            props.create({ ...state, status: columnAction })
        }
        setVisible(false)
    }

    const handleEditClick = (id, status) => {
        const task = cards[status].filter(card => card._id === id)

        setState({ ...task[0], editedId: id, isEditing: true });
        setVisible(true)
    }

    const handleChangeCardColumn = (id, currentStatus, newStatus) => {
        const editedTask = cards[currentStatus].filter(card => card.id === id)

        props.changeStatus(editedTask[0], id, currentStatus, newStatus)

    }

    const handleLogout = () => {
        props.logout()
        navigate("/")
    }

    document.body.className = 'dashboard';

    return (
        <>
            <FloatButton onClick={handleLogout} icon="logout" type="danger">
                Logout
            </FloatButton>
            <Container>
                <Modal width={400}
                    title={(state.isEditing) ? "Edit Task" : "Create Task"}
                    visible={visible}
                    onOk={() => (state.isEditing) ? handleSubmit(state.editedId) : handleSubmit()}
                    confirmLoading={creating || editing}
                    onCancel={() => setVisible(!visible)}
                >
                    <ModalFormContainer>
                        <InputContainer>
                            <Input
                                name='title'
                                placeholder='Title'
                                onChange={handleChange}
                                value={state.title}
                            />
                        </InputContainer>

                        <InputContainer>
                            <Input.TextArea
                                rows={4}
                                name='description'
                                placeholder='Description'
                                onChange={handleChange}
                                value={state.description}
                            />
                        </InputContainer>

                        <InputContainer>
                            <Input
                                name='date'
                                placeholder='date'
                                type="date"
                                onChange={handleChange}
                                value={state.date}
                            />
                        </InputContainer>

                        <InputContainer>
                            <>
                                {/* <DatePicker
                            onChange={handleChange}
                        /> */}
                            </>
                        </InputContainer>
                    </ModalFormContainer>
                </Modal>
                {(columns || []).map((column, index) => (
                    <Column key={index}>
                        <TitleContainer>
                            <Title>{column.title}</Title>
                            <AddButton onClick={() => handleOpenModal(column.name)}>
                                <Icon type='plus' />
                            </AddButton>

                        </TitleContainer>
                        {(cards[column.name] || []).map((card, indexCard) => (
                            <Card
                                key={indexCard}
                                {...card}
                                id={card._id}
                                onEditClick={handleEditClick}
                                onChangeCardColumn={handleChangeCardColumn}
                                onDelete={handleDeleteTask}
                            />
                        ))}
                    </Column>
                ))}
            </Container>
        </>
    )
}

export default bindConnection(Dashboard);