import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

type HeadingProps = {
  title: string;
  description: string;
  icon: LucideIcon;
  iconColor?: string;
  bgColor?: string;
};

const Heading: React.FC<HeadingProps> = ({
  title,
  description,
  icon: Icon,
  iconColor,
  bgColor,
}: HeadingProps) => {
  return (
    <>
    <div className="px-4 lg:px-8 flex items-center gap-x-3 ">
      <div className={cn("p-2 w-fit rounded-md ", bgColor)}>
        <Icon className={cn("w-8 h-8 sm:w-10 sm:h-10", iconColor)} />
      </div>
      <div className="sm:max-w-[60%] md:max-w-[64%] lg:max-w-[75%] flex  flex-col space-y-1 justify-center">
        <h2 className="text-xl sm:text-3xl font-bold text-white">{title}</h2>
        <p className=" text-xs sm:text-sm  text-gray-100 ">
          {description}
        </p>
      </div>
    </div>
  </>
  );
};
export default Heading;
