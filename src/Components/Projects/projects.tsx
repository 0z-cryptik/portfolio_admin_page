import { useMyGlobalState } from "../../Context/portfolioContext";
import { ProjectLinks } from "./projectLinks/projectLinks";
import { ProjectSkills } from "./projectSkills";
import { ProjectTitle } from "./title";
import { ProjectDescription } from "./description";
import { ShowOnCVToggle } from "./show_on_CV";
import { AddProjectForm } from "./addProjects/addProjectForm";
import { DeleteProject } from "./deleteProject";
import { updateBackendData } from "../../helperFunctions/upDateBackendData";
import type { DropResult } from "@hello-pangea/dnd";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

export function Projects() {
  const { projects, setProjects } = useMyGlobalState();

  async function handleOnDragEnd(result: DropResult) {
    if (!result.destination) return;

    // Reorder array locally for instant UI update
    const items = Array.from(projects);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setProjects(items);

    // Prepare payload for backend bulk order update
    const orderPayload = items.map((project, index) => ({
      projectId: project.project_id,
      displayOrder: index + 1
    }));

    try {
      await updateBackendData(
        `${import.meta.env.VITE_SERVER_URL}/api/projects/reorder`,
        { orders: orderPayload },
        "PUT"
      );
    } catch (error) {
      alert("Failed to update project order");
      console.error(error);
      setProjects(projects);
    }
  }

  return (
    <div className="grid gap-6 w-full">
      <AddProjectForm />
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="projects-list">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="grid gap-6 w-full">
              {projects.map((project, index) => (
                <Draggable
                  key={project.project_id}
                  draggableId={String(project.project_id)}
                  index={index}>
                  {(draggableProvided, snapshot) => (
                    <div
                      ref={draggableProvided.innerRef}
                      {...draggableProvided.draggableProps}
                      className={`relative bg-slate-800/40 border hover:border-slate-700 rounded-2xl p-4 sm:p-6 flex flex-col md:justify-between shadow-xl transition-all group w-full min-w-0 ${
                        snapshot.isDragging
                          ? "border-cyan-500/50 ring-2 ring-cyan-500/20 shadow-cyan-950/50"
                          : "border-slate-800"
                      }`}>
                      
                      <button
                        type="button"
                        {...draggableProvided.dragHandleProps}
                        aria-label="Reorder project"
                        className="absolute top-4 right-4 p-2 text-slate-500 hover:text-slate-300 hover:bg-slate-700/50 rounded-lg cursor-grab active:cursor-grabbing transition-colors focus:outline-none focus:ring-1 focus:ring-cyan-500/50">
                        <svg
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 16 16">
                          <path d="M7 2a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 5a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-3 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-3 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                        </svg>
                      </button>

                      <div className="md:space-y-3 space-y-2 w-full min-w-0">
                        <ProjectTitle project={project} />
                        <ProjectDescription project={project} />
                      </div>

                      <ProjectSkills project={project} />
                      <ProjectLinks project={project} />
                      <div className="inline-flex mt-3 border-t border-slate-800/60 pt-5">
                        <ShowOnCVToggle project={project} />
                        <DeleteProject project={project} />
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}