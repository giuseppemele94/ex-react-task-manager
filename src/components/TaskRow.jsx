import { memo } from 'react';

const  TaskRow  = memo((props) =>  {

    const statusColors = {
    "To do": "red",
    "Doing": "yellow",
    "Done": "green",
  };

    const {title,status,createdAt} = props.task; 

    return (
        <tr>
            <td>{title}</td>
            <td style={{backgroundColor: statusColors[status]}}>{status}</td>
            <td>{new Date(createdAt).toLocaleDateString()}</td>
        </tr>
    )

});

export default TaskRow; 