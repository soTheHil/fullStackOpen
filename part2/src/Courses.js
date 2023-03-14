const Courses = ({courses}) => {
    return (
        <div>
            <h1>Web development curriculum</h1>
            {courses.map(course =>
                <div key={course.id}>
                    <h2>{course.name}</h2>
                    {
                      course.parts.map(part =>
                        <p key={part.id}>
                            {part.name} {part.exercises}
                        </p>
                      )
                    }
                    <p>
                        
                    Total of  {
                          course.parts.reduce((p, c) => {
                            return p + c.exercises 
                          }, 0)
                        } Exercises
                    </p>
                </div>
            )}
        </div>
    )
}
export default Courses