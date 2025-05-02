
import React, { useEffect, useState } from 'react';


export const Courses = () => {
    const [content, setContent] = useState(<AllCourse showForm={showForm}/>);

    function showAll() {
        setContent(<AllCourse showForm={showForm} />);
    }

    function showForm(course) {
        setContent(<CourseForm course={course}  showAll={showAll} />);
    }

    return <div className='container my-5'>
        
        {content}
    </div>;
};

function AllCourse(props) {
    const [courses, setCourses] = useState([]);
    function fetchCourses() {
        fetch('https://aouasow1.github.io/course')
        .then((response) => {
            if(!response.ok) {
                throw new Error('Unexpected Server Response');
            }
            return response.json()
        })
        .then((data) => {
            //console.log(data);
            setCourses(data);
        })
        .catch((error) => console.log("Errror: ", error));
    }

    //fetchCourses()
    useEffect(() => fetchCourses(), []);

    function deleteCourse(id) {
        fetch('https://aouasow1.github.io/course/' + id, {
            method: "DELETE"
        })
        .then((response) => response.json())
        .then((data) => fetchCourses())
    }
    return (
        <>
        <h3 className='text-center mb-3'>All Courses</h3>
        <button onClick={() => props.showForm({})} type='button' className='btn btn-primary me-2'>Add Course</button>
        <button onClick={() => fetchCourses()} type='button' className='btn btn-outline-primary me-2'>Refresh</button>
        <table className='table'>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>SubjectArea</th>
                    <th>Credit</th>
                </tr>
            </thead>
            <tbody>
                {
                    courses.map((course, index) => {
                        return (
                            <tr key={index}>
                                <td>{course.id}</td>
                                <td>{course.name}</td>
                                <td>{course.description}</td>
                                <td>{course.subjectArea}</td>
                                <td>{course.credit}</td>
                                <td style={{width: '10px', whiteSpace: 'nowrap'}}>
                                    <button onClick={() => props.showForm(course)} type='button' className='btn btn-primary btn-sm me-2'>Edit</button>
                                    <button onClick={() => deleteCourse(course.id)} type='button' className='btn btn-danger btn-sm'>Delete</button>

                                </td>
                            </tr>
                        )
                    })
                }
            </tbody>

        </table>
        </>
    )
}

function CourseForm(props) {
    const [errorMessage, setErrorMessage] = useState("");

    function handleSubmit(event) {
        event.preventDefault();
        //read data
        const formData = new FormData(event.target);
        //convert data
        const course = Object.fromEntries(formData.entries());
        //validate data
        if(!course.name || !course.description || !course.subjectArea || !course.credit) {
            console.log('please provide all fields')
            setErrorMessage (
                <div className="alert alert-warning" role="alert" >
                    please provide all fields
                </div>
            )
            return;
        }

        if(props.course.id) {
            //update course
            fetch('https://aouasow1.github.io/course/' + props.course.id, {
                method : 'PATCH',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify(course)
            })
                .then((response) => {
                    if(!response.ok) {
                        throw new Error('Network response not ok');
                    }
                    
                    return response.json()
                })
                .then((data) => props.showAll())
                .catch((error) => {
                    console.error('error:', error);
                });

        }
        else{
        //create new course
        course.createdAt = new Date().toISOString().slice(0,10);
        fetch('https://aouasow1.github.io/course', {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(course)
        })
            .then((response) => {
                if(!response.ok) {
                    throw new Error('Network response not ok');
                }
                
                return response.json()
            })
            .then((data) => props.showAll())
            .catch((error) => {
                console.error('error:', error);
            });
        }
    }
    return (
        <>
        <h3 className='text-center mb-3'> {props.course.id ? "Edit Course" : "Add New Course"}</h3>

        <div className="row">
            <div className="col-lg-6 mx-auto">
                {errorMessage}
                <form onSubmit={(event) => handleSubmit(event)}>
                    { props.course.id && <div className="row-mb-3">
                        <label className="col-sm-4 col-form-label">ID</label>
                        <div className="col-sm-8">
                            <input readOnly name="id" className="form-control-plainText"  defaultValue={props.course.id} />
                        </div>
                    </div>

                    }
                    <div className="row-mb-3">
                        <label className="col-sm-4 col-form-label">Name</label>
                        <div className="col-sm-8">
                            <input name="name" className="form-control"  defaultValue={props.course.name} />
                        </div>
                    </div>
                    <div className="row-mb-3">
                        <label className="col-sm-4 col-form-label">Description</label>
                        <div className="col-sm-8">
                            <textarea name="description" className="form-control"  defaultValue={props.course.description} />
                        </div>
                    </div>
                    <div className="row-mb-3">
                        <label className="col-sm-4 col-form-label">SubjectArea</label>
                        <div className="col-sm-8">
                            <input name="subjectArea" className="form-control"  defaultValue={props.course.subjectArea} />
                        </div>
                    </div>
                    <div className="row-mb-3">
                        <label className="col-sm-4 col-form-label">Credit</label>
                        <div className="col-sm-8">
                            <input name="credit" className="form-control"  defaultValue={props.course.credit} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="offset-sm-4 col-sm-4 d-grid">
                            <button type='submit' className='btn btn-primary btn-sm me-3 '>Save</button>
                        </div>
                        <div className="col-sm-4 d-grid">
                            <button onClick={() => props.showAll()} type='button' className='btn btn-secondary me-2'>Cancel</button>
                        </div>
                    </div>
                </form>

            </div>
        </div>
        </>
    )
}