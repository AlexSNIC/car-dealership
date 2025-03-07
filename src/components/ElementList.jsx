import { ElementListItem } from "./ElementListItem";

export default function ElementList({
  data,
  ...props
}) {

  return (
    <ul>
      {data.map((innerElement) => {
        return (
          <ElementListItem
            key={innerElement.id}
            innerElement={innerElement}
            {...props}
          />
        );
      })}
    </ul>
  );
}
