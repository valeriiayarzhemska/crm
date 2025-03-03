import { TabBar } from '../../components/ui/TabBar';

export const Container = ({ children }) => {
  return (
    <div className="pt-[4.4rem] pb-6 pl-2 pr-2 w-full h-full bg-white md:pt-6 md:pr-5 md:pl-[11.5rem] lg:pl-[12.25rem]">
      {children}
    </div>
  );
};
