import ProjectPreview from './ProjectPreview.jsx'
import React from 'react'



export default function ProjectList(props) {

    return (
        <div>
            {props.projects.map((project, index) => {
                return (
                    <div key={project.id}>

                        <ProjectPreview project={project} index={index}/>
                    </div>
                )
            }
            )}
        </div>
    )

}
