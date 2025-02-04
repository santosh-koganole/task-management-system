import clsx from "clsx";

interface ITitleProps {
  title: string;
}

const Title: React.FC<ITitleProps> = ({ title }) => {
  return <h2 className={clsx("text-2xl font-semibold capitalize")}>{title}</h2>;
};

export default Title;
