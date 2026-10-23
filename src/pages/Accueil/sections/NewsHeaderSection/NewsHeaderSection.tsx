export const NewsHeaderSection = (): JSX.Element => {
  return (
    <header className="crse-news-header min-h-[141px] w-full bg-alabaster">
      <div className="mx-auto flex min-h-[45px] w-full max-w-[960px] items-start px-6 pt-24 lg:px-0">
        <h2 className="m-0 flex h-[37px] items-center whitespace-nowrap font-bold text-[42.7px] leading-[37px] tracking-[0] text-chathams-blue [font-family:'Inter',Helvetica]">
          L&apos;actu CRSE
        </h2>
        <div className="ml-auto flex h-[45px] w-[249px] items-center">
          <span className="flex h-6 w-[142px] shrink-0 items-center whitespace-nowrap font-normal text-[21.9px] leading-6 tracking-[0] text-chathams-blue [font-family:'Inter',Helvetica]">
            Suivez-nous :
          </span>
          <img
            className="h-[23px] w-[107px] shrink-0 -translate-x-[75px]"
            alt="List"
            src="https://c.animaapp.com/Cq4P7PgEpKkTCbopMcj5Xg/img/list.svg"
          />
        </div>
      </div>
    </header>
  );
};
