import { DragSourceMonitor, useDrag, useDrop } from "react-dnd";

const DraggableImage = ({ index }: { index: number }) => {
  const [collected, drag, dragPreview] = useDrag({
    type: "number",
    item: index,
    collect: (monitor: DragSourceMonitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div className="bg-neutral-600">
      {collected.isDragging && <div ref={dragPreview} />}
      <img src={`https://picsum.photos/960/540?random=${index}`} ref={drag} />
    </div>
  );
};

const DroppableContainer = () => {
  const [{ canDrop, isOver, dropType }, drop] = useDrop({
    accept: ["number"],
    drop: (item: number, monitor) => {
      console.log(monitor.getItemType());
      console.log(item);
    },
    collect: (monitor) => {
      console.log(monitor);
      return {
        type: monitor.getItemType(),
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
        dropType: monitor.getItemType(),
      };
    },
  });

  return (
    <div ref={drop} className="grow bg-neutral-500">
      <div
        style={{
          zIndex: 1000,
          position: "relative",
          top: 0,
          right: 0,
          display: "flex",
          wordWrap: "break-word",
          justifyContent: "center",
          backgroundColor: "white",
          border: "3px solid black",
          margin: "10px",
          padding: "10px",
        }}
      >
        {JSON.stringify({ isOver, canDrop, dropType })}
      </div>
    </div>
  );
};

function App() {
  return (
    <>
      <div className="w-screen h-screen bg-neutral-700 flex">
        <div className="w-[300px] p-4 flex gap-2 flex-col">
          <div className="text-white text-lg font-bold text-center">Drag</div>
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="bg-neutral-600">
              <DraggableImage index={i} key={i} />
            </div>
          ))}
        </div>
        <div className="grow bg-neutral-600 p-4 flex gap-2 flex-col">
          <div className="text-white text-lg font-bold text-center">Drop</div>
          <DroppableContainer></DroppableContainer>
        </div>
      </div>
    </>
  );
}

export default App;
