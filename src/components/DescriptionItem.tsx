interface DescriptionItemProps {
  label: string;
  text: string;
  sku?: string;
  isPeso?: boolean;
}

export default function DescriptionItem({
  label,
  text,
  sku,
  isPeso,
}: DescriptionItemProps) {
  return (
    <div className="relative w-1/2 md:w-1/3 max-w-[50%] md:max-w-[33.333%] p-[10px] grow">
      <div className="w-full h-full relative border border-stroke-gray rounded-md flex p-5 flex-col gap-1 justify-start items-center">
        <h2 className="text-md font-semibold text-center text-blue-one">
          {label}
        </h2>
        <p className="text-center">
          {text}
          {isPeso && 'Kg.'}
        </p>
        {sku && (
          <small className="text-center font-normal">
            <strong>Sku: {sku}</strong>
          </small>
        )}
      </div>
    </div>
  );
}
