import {
  DragDropContext,
  Droppable,
  Draggable,
} from "@hello-pangea/dnd";
import type {DropResult} from "@hello-pangea/dnd"
import { updateBackendData } from "../../helperFunctions/upDateBackendData";
import { useMyGlobalState } from "../../Context/portfolioContext";

export function ProjectList() {
    const {projects, setProjects} = useMyGlobalState()

  async function handleOnDragEnd(result: DropResult) {
    // Dropped outside the container list
    if (!result.destination) return;

    // Reorder the local projects array based on drag indices
    const items = Array.from(projects);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    // 1. Instantly update React state so the UI snaps into place
    setProjects(items);

    // 2. Prepare payload for backend (mapping each projectId to its new index)
    const orderPayload = items.map((project, i) => ({
      projectId: project.project_id, // adjust key to match your DB primary key
      displayOrder: i + 1
    }));

    // 3. Persist new order to backend
    try {
      await updateBackendData(
        "http://localhost:3000/api/profile/1/projects/reorder",
        { orders: orderPayload },
        "PUT"
      );
    } catch (err) {
      console.error("Failed to save reordered positions:", err);
      // Optional: Refetch original projects list if save fails
    }
  }

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="projects-list">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="space-y-3">
            {projects.map((project, index) => (
              <Draggable
                key={project.project_id}
                draggableId={String(project.project_id)}
                index={index}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={`p-4 rounded-lg border bg-slate-900 transition-shadow ${
                      snapshot.isDragging
                        ? "border-cyan-400 shadow-lg shadow-cyan-500/10"
                        : "border-slate-800"
                    }`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {/* Drag Handle Icon Indicator */}
                        <span className="text-slate-500 cursor-grab active:cursor-grabbing">
                          :::
                        </span>
                        <h3 className="font-semibold text-slate-100">
                          {project.title}
                        </h3>
                      </div>
                      <span className="text-xs text-slate-500">
                        Position: {index + 1}
                      </span>
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
  );
}