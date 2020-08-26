import ProjectPreview from './ProjectPreview.jsx'
import React from 'react'



export default function ProjectList(props) {

    return (
        <div>
            {props.projects.map(project => {
                return (
                    <div key={project.id}>

                        <ProjectPreview project={project} />
                        <button onClick={() => props.onDelete(project.id)}>remove</button>
                        <button onClick={() => props.onRename(project.id)}>rename</button>
                    </div>
                )
            }
            )}
        </div>
    )

}
