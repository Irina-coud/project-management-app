import { ControlPoint } from '@mui/icons-material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from 'store/hooks';
import { deleteColumn } from 'store/reducers/boards/boardsSlice';
import { BoardColumnsType } from 'store/reducers/boards/types';
import {
  AddPanel,
  FakeTask,
  StyledCloseIcon,
  StyledColumn,
  TaskList,
  TaskListWrapper,
  Title,
} from './Column.styled';
import { ModalAddTask } from './ModalAddTask/ModalAddTask';

type ColumnProps = BoardColumnsType & { provided: any };

export const Column = ({ tasks, title, provided, id }: ColumnProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const boardId = useAppSelector((state) => state.boardsReducer.currentBoard?.id);
  const [openModal, setOpenModal] = useState(false);

  const onDeleteColumn = () => {
    if (!boardId) {
      navigate('/');
    } else {
      dispatch(deleteColumn({ boardId, columnId: id }));
    }
  };

  const handlerClick = () => {
    setOpenModal(true);
  };

  return (
    <StyledColumn
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
    >
      <Title>
        <h4>{title}</h4>
        <StyledCloseIcon onClick={onDeleteColumn} style={{ cursor: 'pointer' }} />
      </Title>

      <TaskListWrapper>
        <TaskList>
          {tasks?.map((task) => (
            <FakeTask key={task.id}>{JSON.stringify(task.description)}</FakeTask>
          ))}
        </TaskList>
      </TaskListWrapper>

      <AddPanel onClick={handlerClick}>
        <ControlPoint />
        Add new task
      </AddPanel>
      <ModalAddTask openModal={openModal} setOpenModal={setOpenModal} />
    </StyledColumn>
  );
};
