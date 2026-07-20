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
        "http://localhost:3000/api/projects/reorder",
        { orders: orderPayload },
        "PUT"
      );
    } catch (error) {
      alert("Failed to update project order")
      console.error(error);
      setProjects(projects)
    }
  }

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="projects-list">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="grid gap-6">
            {projects.map((project, index) => (
              <Draggable
                key={project.project_id}
                draggableId={String(project.project_id)}
                index={index}>
                {(draggableProvided, snapshot) => (
                  <div
                    ref={draggableProvided.innerRef}
                    {...draggableProvided.draggableProps}
                    {...draggableProvided.dragHandleProps}
                    className={`bg-slate-800/40 border hover:border-slate-700 rounded-2xl p-6 flex flex-col justify-between shadow-xl transition-all group cursor-grab active:cursor-grabbing ${
                      snapshot.isDragging
                        ? "border-cyan-500/50 ring-2 ring-cyan-500/20 shadow-cyan-950/50"
                        : "border-slate-800"
                    }`}>
                    <div className="space-y-3">
                      <ProjectTitle project={project} />
                      <ProjectDescription project={project} />
                    </div>

                    <ProjectSkills project={project} />
                    <ProjectLinks project={project} />
                    <div className="inline-flex mt-6 border-t border-slate-800/60 pt-5">
                      <ShowOnCVToggle project={project} />
                      <DeleteProject project={project} />
                    </div>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
            <AddProjectForm />
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
