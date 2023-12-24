export default function MainProductList({ children }: any) {
  return (
    <div className="mainContainer w-full flex flex-row flex-wrap gap-0 gap-y-0 justify-start items-stretch flex-auto">
      {children}
    </div>
  );
}
