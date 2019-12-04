import React from 'react';
import styled from 'styled-components';
import { Popover, Icon } from 'antd'
import { Container, TitleContainer, Title, Description, CardContent } from './styles'

export const ChangeContainer = styled.div`
    display: flex;
    padding: 20px;
`

export const ChangeColumn = styled.div`
    border-top: 1px solid #f2f2f2;
    display:flex;
    flex-direction: column;
`

const Card = ({ title, description, status, date, id, onDelete, onEditClick, onChangeCardColumn }) => {
    const content = (
        <CardContent>
            <a onClick={() => onEditClick(id, status)}>Editar</a>
            <a onClick={() => onDelete(id, status)}>Deletar</a>
            <ChangeContainer>
                <ChangeColumn>
                    {(status !== 'toDo') && <a onClick={() => onChangeCardColumn(id, status, "toDo")}>Change to To Do</a>}
                    {(status !== 'doing') && <a onClick={() => onChangeCardColumn(id, status, "doing")}>Change to Doing</a>}
                    {(status !== 'done') && <a onClick={() => onChangeCardColumn(id, status, "done")}>Change to Done</a>}
                    {(status !== 'late') && <a onClick={() => onChangeCardColumn(id, status, "late")}>Change to Late</a>}
                </ChangeColumn>
            </ChangeContainer>
        </CardContent>
    );

    return (
        <Container>
            <TitleContainer>
                <Title>{title}</Title>
                <Popover placement="right" title={"Opções"} content={content} trigger="click">
                    <Icon type="more" style={{ fontSize: "20px" }} width="2em" height="2em" />
                </Popover>
            </TitleContainer>
            <Description>
                {description}
            </Description>
            <Description>
                {date}
            </Description>
        </Container>
    )
}

export default Card;
