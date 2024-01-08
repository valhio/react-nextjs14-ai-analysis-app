import Skeleton from "react-loading-skeleton";

const LoadingFiles = () => {
  return (
    <div className="mt-8 grid gtid-cols-1 gap-6 divide-zinc-200 md:grid-cols-2 lg:grid-cols-3">
      <Skeleton height={125} className="my-2 rounded-lg" count={2} />
      <Skeleton height={125} className="my-2 rounded-lg" count={2} />
      <Skeleton height={125} className="my-2 rounded-lg" count={2} />
    </div>
  );
};

export default LoadingFiles;
