import { Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';

import { StyledControlBox, TaskItem, TaskList, TaskListWrapper } from './Task.styled';
import { ConfirmationModal } from 'components/ConfirmationModal/ConfirmationModal';
import { BoardTasksType } from 'store/reducers/boards/types';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { deleteTask } from 'store/reducers/boards/boardsSlice';

interface ITaskProps {
  tasks: BoardTasksType[] | undefined;
  columnId: string;
}

export function Task({ tasks, columnId }: ITaskProps) {
  const [openConfirmationModal, setOpenConfirmationModal] = useState(false);
  const [currentTaskId, setCurrentTaskId] = useState('');

  const boardId = useAppSelector((state) => state.boardsReducer.currentBoard?.id);
  const dispatch = useAppDispatch();

  const onCancel = () => {
    setOpenConfirmationModal(false);
  };

  const onConfirm = () => {
    if (boardId) {
      dispatch(deleteTask({ boardId, columnId, taskId: currentTaskId }));
    }
    setOpenConfirmationModal(false);
  };

  return (
    <TaskListWrapper>
      <TaskList>
        {tasks?.map((task) => (
          <TaskItem key={task.id}>
            <Typography>{task.description}</Typography>
            <StyledControlBox>
              <EditIcon onClick={() => {}} style={{ cursor: 'pointer' }} />
              <CloseIcon
                onClick={() => {
                  setCurrentTaskId(task.id);
                  setOpenConfirmationModal(true);
                }}
                style={{ cursor: 'pointer' }}
              />
            </StyledControlBox>
          </TaskItem>
        ))}
        {openConfirmationModal && (
          <ConfirmationModal
            openConfirmationModal={openConfirmationModal}
            onCancel={onCancel}
            onConfirm={onConfirm}
          />
        )}
      </TaskList>
    </TaskListWrapper>
  );
}
