type BuffTooltipProps = {
  name: string;
  dur?: string;
  description: string;
  explanation: string;
  short?: boolean;
  stacks?: number;
};

const PLACEHOLDER = "placeholder";

/**
 * The custom tooltip shown when hovering Buff components
 * - Show name only in short mode, or if `stacks` or `dur` are defined
 * */
export function BuffTooltip({
  name,
  description,
  dur,
  explanation,
  short,
  stacks,
}: BuffTooltipProps) {
  return (
    <div className="tooltip">
      {(short || stacks || dur) && (
        <div className="buff-name">
          {name && <>{name || PLACEHOLDER}</>}
          {(stacks || dur) && (
            <span className="buff-params">
              {" "}
              (
              {stacks && (
                <>
                  {stacks} stack{stacks != 1 && "s"}
                </>
              )}
              {dur && (
                <>
                  {stacks && " "}for {dur}
                </>
              )}
              )
            </span>
          )}
        </div>
      )}
      {description && (
        <>
          <div className="buff-description"> {description || PLACEHOLDER} </div>
          {explanation && <hr />}
        </>
      )}
      {explanation && (
        <div className="buff-explanation">{explanation || PLACEHOLDER}</div>
      )}
    </div>
  );
}
