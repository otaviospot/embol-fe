export default function MainProductList({ children }: any) {
  return (
    <div className="mainContainer flex flex-row flex-wrap gap-0 justify-start items-stretch p-5 pb-14 flex-auto min-h-100v-h">
      {children}
    </div>
  );
}
