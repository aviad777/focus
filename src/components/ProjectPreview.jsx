
import React from 'react'
export default function ProjectPreview(props) {
    return (
        <div className="project-item">
            <h2>task: {props.project.name}.</h2>
        </div>
    )

}
