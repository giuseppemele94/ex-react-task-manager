import { memo } from 'react';
import { Link } from 'react-router-dom';

const  TaskRow  = memo((props) =>  {

    const statusColors = {
    "To do": "red",
    "Doing": "yellow",
    "Done": "green",
  };

    const {id,title,status,createdAt} = props.task; 

    return (
        <tr>
            <td><Link to={`/task/${id}`}>{title}</Link></td>
            <td style={{backgroundColor: statusColors[status]}}>{status}</td>
            <td>{new Date(createdAt).toLocaleDateString()}</td>
        </tr>
    )

});

export default TaskRow; 