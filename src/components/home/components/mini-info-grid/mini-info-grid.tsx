import InfoCard from "components/common/info-card/info-card";
import useMiniInfoGrid from "./hooks/useMiniInfoGrid";

const MiniInfoGrid = () => {
  const { miniInfo } = useMiniInfoGrid();

  return (
    <article className="grid w-full grid-cols-2 gap-4">
      {miniInfo.map((item, index) => (
        <InfoCard
          key={item.name}
          index={index + 1}
          useContrastCards
          {...item}
        />
      ))}
    </article>
  );
};

export default MiniInfoGrid;
