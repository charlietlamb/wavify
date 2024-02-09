import { Button } from "../ui/button";

export default function ButtonLoader({
  isLoading,
  onClick,
  text,
}: {
  isLoading: boolean;
  onClick: () => void;
  text: string;
}) {
  return (
    <Button onClick={onClick}>
      {!isLoading ? (
        `${text}`
      ) : (
        <svg
          width="24"
          height="24"
          stroke="#0f0f0f"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          className="spinner"
        >
          <g>
            <circle
              cx="12"
              cy="12"
              r="9.5"
              fill="none"
              strokeWidth="3"
            ></circle>
          </g>
        </svg>
      )}
    </Button>
  );
}
