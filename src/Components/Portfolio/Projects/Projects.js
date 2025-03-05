import { useState, Fragment } from "react";
import { Link } from "react-router-dom";

// Import Custome Hooks
import useThrottle from "./../../../CustomeHooks/useThrottle/useThrottle";
import usePreventRouterLinks from "./../../../CustomeHooks/usePreventRouterLinks/usePreventRouterLinks";

// Main Portfolio Projects Sass File
import "./Projects.scss";

// Portfolio Projects Component
const PortfolioProjects = ({ projects, type, projectsContainer }) => {
  // Custome Hooks
  const { throttle } = useThrottle();
  const { preventRouterLinks, isPathMatched } = usePreventRouterLinks(
    `${process.env.PUBLIC_URL}/portfolio`
  );

  // Default Number Of Projects
  const defaultNumber = 3;

  // Number Of Projects State
  const [numberOfProjects, setNumberOfProjects] = useState(defaultNumber);

  const throttleViewAllProjects = throttle(() => {
    if (numberOfProjects !== projects.length) {
      setNumberOfProjects(projects.length);
    } else {
      setNumberOfProjects(defaultNumber);
    }
  }, 500);

  const viewAllProjects = (e) => {
    preventRouterLinks(e);
    throttleViewAllProjects();
  };

  // Get Projects List
  const projectsList = projects.map((project, index) => {
    return index < numberOfProjects ? (
      <div
        key={project.id}
        className={`${
          project.type === type || type === "All Work"
            ? "project"
            : "project hidden"
        }`}
      >
        <Link
          to={`${process.env.PUBLIC_URL}/portfolio`}
          onClick={preventRouterLinks}
          className="project-link"
          aria-label="Project Link"
        ></Link>

        <figure>
          <div className="project-image">
            <img src={project.image} alt={project.caption} />
            <span className="type">{project.type}</span>
            <div className="case-study-desc">
              <div className="case-study-challenge">
                <div className="challenge">
                  <strong>Challenge: </strong>
                  <span className="case-study-desc-title">
                    {project.challenge}
                  </span>
                </div>
                <div className="solution">
                  <strong>Solution: </strong>
                  <span className="case-study-desc-title">
                    {project.solution}
                  </span>
                </div>
                <div className="outcome">
                  <strong>Outcome: </strong>
                  <span className="case-study-desc-title">
                    {project.outcome}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <figcaption>{project.caption}</figcaption>
        </figure>
      </div>
    ) : null;
  });

  return (
    <Fragment>
      <div className="projects" ref={projectsContainer}>
        {projectsList}
      </div>
      <div className="portfolio-link">
        <Link
          to={`${process.env.PUBLIC_URL}/portfolio`}
          onClick={isPathMatched ? viewAllProjects : null}
        >
          {numberOfProjects >= projects.length ? "View Less" : "View All"}
        </Link>
      </div>
    </Fragment>
  );
};

export default PortfolioProjects;
